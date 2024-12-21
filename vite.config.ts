import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, searchForWorkspaceRoot } from 'vite'

export default defineConfig(() => {

	return {

		plugins: [
			sveltekit(),
		],
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}'].map((p) =>
				p.replace(/\\/g, '/'),
			),
		},
		server: {
			port: 8888,
			fs: {
				allow: [searchForWorkspaceRoot(process.cwd())],
			},
		},
		
		optimizeDeps: {
			exclude: ['@libav.js/variant-webcodecs'],
		},
	}
})
