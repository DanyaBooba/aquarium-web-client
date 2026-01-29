import heic2any from 'heic2any'

export async function convertHeicToJpg(file, quality = 0.8) {
    const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality
    })

    return new File(
        [convertedBlob],
        file.name.replace(/\.(heic|heif)$/i, '.jpg'),
        { type: 'image/jpeg' }
    )
}
