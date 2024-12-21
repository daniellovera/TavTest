<script lang="ts">

import * as LibAV from "@libav.js/variant-webcodecs";
import * as tav from '../../transavormer/dist/transavormer'


let la: LibAV.LibAV

(async () => {
    la = await LibAV.LibAV({})
})();

let file: File | undefined

async function convert(file: File) {
    
    const out = await tav.build(la, {
                    type: "muxer",
                    format: "matroska",
                    input: {
                        type: "encoder",
                        videoConfig: {
                            codec: "vp8"
                        },
                        audioConfig: {
                            codec: "opus"
                        },
                        input: file
                    }
                });

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
    const blob = new Blob(chunks,  {type: "video/x-matroska"})
    const url = URL.createObjectURL(blob)

    // Create download link
    const a = document.createElement('a')
    a.href = url
    a.download = `converted-file.mkv`
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
            await convert(file)
        } catch (err) {
            console.error('Error processing file:', err)
        }
    }
}

</script>


<input type="file" id="file"  on:change={handleFileChange}
accept="video/*, .mkv"/>