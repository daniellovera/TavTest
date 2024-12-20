<script lang="ts">

import * as LibAV from "@libav.js/variant-webcodecs";
import * as Tav from '../../transavormer/dist/transavormer'
import Button from './button.svelte'

let file: File | undefined

async function convert(file: File, outputFormat: string, tctest: boolean) {
    const la = await LibAV.LibAV({
        noworker: true,
        base: '/_libav',
    })

    // Run ffprobe before conversion
    // try {
    // 	const metadata = await ffprobe(la, file)
    // 	console.log('File analysis complete', metadata)
    // } catch (err) {
    // 	console.error('Error analyzing file:', err)
    // }

    // // Create a ReadableStream from the file
    // const fileStream = file.stream()
    // const trans = new TransformStream({
    // 	transform: async (chunk, controller) => {
    // 		controller.enqueue(new Uint8Array(chunk))
    // 	},
    // })
    let formatOutput: string = 'mp4'
    let typeOutput: string = 'video/mp4'
    let accessRandom: boolean = false
    let extension: string = '.mp4'
    let input: any = file

    if (tctest) {
        input = {
            type: 'encoder',
            videoConfig: { codec: 'avc1.640028' },
            audioConfig: { codec: 'opus' },
            input: file,
        }
    }

    // fileStream.pipeThrough(trans)
    if (outputFormat === 'mkv') {
        formatOutput = 'matroska'
        typeOutput = 'video/x-matroska'
        accessRandom = false
        extension = '.mkv'
    } else {
        formatOutput = 'mp4'
        accessRandom = true
        typeOutput = 'video/mp4'
        extension = '.mp4'
    }

    const out = await Tav.build(la, {
        type: 'muxer',
        randomAccess: accessRandom,
        format: formatOutput,
        input: input,
    })

    // Handle output - Instead of writing to filesystem, create a download
    const chunks: Uint8Array[] = []
    const rdr = out.stream.getReader()

    while (true) {
        const { done, value } = await rdr.read()
        if (done) break
        chunks.push(value.data)
    }

    la.terminate()

    // Create blob and download
    const blob = new Blob(chunks, { type: typeOutput })
    const url = URL.createObjectURL(blob)

    // Create download link
    const a = document.createElement('a')
    a.href = url
    a.download = `converted-file${extension}`
    document.body.appendChild(a)
    a.click()

    // Cleanup
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

async function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement
    file = target.files?.[0]
    if (file) {
        try {
            //	await main(file)
        } catch (err) {
            console.error('Error processing file:', err)
        }
    }
}

function handleDragOver(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
}

function handleDrop(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer?.files[0]
    // if (file) {
    // 	main(file).catch((err) => console.error('Error processing file:', err))
    // }
}
</script>



<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="dropZone" on:dragover={handleDragOver} on:drop={handleDrop}>
Drag and drop a video file here or click to select
<input
    type="file"
    id="fileInput"
    on:change={handleFileChange}
    accept="video/*, .mkv"
/>
</div>
<Button
onClick={() => {
    if (file) convert(file, 'mkv', false)
}}
disabled={!file}
>
Click me for MKV
</Button>

<Button
onClick={() => {
    if (file) convert(file, 'mp4', false)
}}
disabled={!file}
>
Click me for MP4
</Button>

<Button
onClick={() => {
    if (file) convert(file, 'mkv', true)
}}
disabled={!file}
>
Click me for MKV transcode
</Button>

<Button
onClick={() => {
    file = undefined
    const input = document.getElementById('fileInput')
    if (input instanceof HTMLInputElement) {
        input.value = ''
    }
}}
disabled={!file}
>
Clear File
</Button>

<style>
#dropZone {
    border: 2px dashed #ccc;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
}
</style>
