import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, searchForWorkspaceRoot, type PluginOption } from 'vite'
import { glob } from 'glob'
import { join, basename } from 'node:path'
import mime from 'mime'
import { cp, readdir, mkdir, readFile, writeFile } from 'node:fs/promises'
import { createReadStream } from 'node:fs'

function isEmscriptenFile(code: string): boolean {
	return (
		/var\s+Module\s*=|WebAssembly\.instantiate/.test(code) &&
		/var\s+workerOptions\s*=/.test(code)
	)
}

function transformEmscriptenCode(code: string): string {
	const workerOptionsMatch = code.match(/var\s+workerOptions\s*=\s*({[^}]+})/)
	if (!workerOptionsMatch) return code

	const optionsObjectStr = workerOptionsMatch[1]
	const optionsDeclarationStr = workerOptionsMatch[0]

	return code
		.replace(optionsDeclarationStr, '')
		.replace(new RegExp('workerOptions(?![\\w$])', 'g'), optionsObjectStr)
}

const exposeLibAV: PluginOption = (() => {
	const LIBAV_MODULE_DIR = join(__dirname, 'node_modules', '@libav.js')

	return {
		name: 'vite-libav.js',
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				if (!req.url?.startsWith('/_libav/')) return next()

				const filename = basename(req.url).split('?')[0]
				if (!filename) return next()

				const [file] = await glob(
					join(LIBAV_MODULE_DIR, '**/dist', filename).replace(/\\/g, '/'),
				)
				if (!file) return next()

				const fileType = mime.getType(filename)
				if (!fileType) return next()

				// Transform .thr files before serving
				if (filename.match(/\.thr\.(m)?js$/)) {
					const content = await readFile(file, 'utf-8')
					if (isEmscriptenFile(content)) {
						const transformedCode = transformEmscriptenCode(content)
						res.setHeader('Content-Type', fileType)
						return res.end(transformedCode)
					}
				}

				res.setHeader('Content-Type', fileType)
				return createReadStream(file).pipe(res)
			})
		},
		generateBundle: async (options) => {
			if (!options.dir) {
				return
			}

			const assets = join(options.dir, '_libav')
			await mkdir(assets, { recursive: true })

			const modules = await readdir(LIBAV_MODULE_DIR).then((modules) =>
				modules.filter((m) => m.startsWith('libav.js')),
			)

			for (const module of modules) {
				const distFolder = join(LIBAV_MODULE_DIR, module, 'dist')
				await cp(distFolder, assets, { recursive: true })
				// Transform .thr files after copying
				const thrFiles = await glob(join(assets, '*.thr.{js,mjs}'))
				for (const thrFile of thrFiles) {
					const content = await readFile(thrFile, 'utf-8')
					if (isEmscriptenFile(content)) {
						const transformedCode = transformEmscriptenCode(content)
						await writeFile(thrFile, transformedCode, 'utf-8')
					}
				}
			}
		},
	}
})()

const enableCOEP: PluginOption = {
	name: 'isolation',
	configureServer(server) {
		server.middlewares.use((_req, res, next) => {
			res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
			res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
			next()
		})
	},
}

export default defineConfig(({ command, mode }) => {
	const isDevelopment = mode === 'development'

	return {
		worker: {
			format: 'es',
		},
		plugins: [
			sveltekit(),
			enableCOEP,
			exposeLibAV,
			//emscriptenStaticWorkerOptions(),
		],
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}'].map((p) =>
				p.replace(/\\/g, '/'),
			),
		},
		server: {
			port: 8888,
			headers: {
				'Cross-Origin-Embedder-Policy': 'require-corp',
				'Cross-Origin-Opener-Policy': 'same-origin',
			},
			fs: {
				allow: [searchForWorkspaceRoot(process.cwd())],
			},
		},
		build: {
			// No source maps in production
			target: 'es2023', // Target ES2023 for production build
			sourcemap: isDevelopment,
			rollupOptions: {
				output: {
					// In development, include source content in source maps
					sourcemapExcludeSources: !isDevelopment,
				},
			},
		},
		// Development-specific settings
		...(isDevelopment && {
			css: {
				devSourcemap: true, // Enable source maps for CSS in development
			},
		}),
		esbuild: {
			target: 'es2023', // Target ES2023 for development
			supported: {
				'top-level-await': true, // Enable top-level await
			},
		},
		optimizeDeps: {
			exclude: ['@libav.js/variant-webcodecs'],
			esbuildOptions: {
				target: 'es2023', // Also target ES2023 for dependency pre-bundling
			},
		},
	}
})
