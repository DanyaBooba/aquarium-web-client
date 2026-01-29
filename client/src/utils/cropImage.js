export const getCroppedImg = (imageSrc, cropArea, rotation = 0) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            canvas.width = cropArea.width;
            canvas.height = cropArea.height;

            ctx.drawImage(
                image,
                cropArea.x * scaleX,
                cropArea.y * scaleY,
                cropArea.width * scaleX,
                cropArea.height * scaleY,
                0,
                0,
                cropArea.width,
                cropArea.height
            );

            canvas.toBlob((blob) => {
                if (!blob) return reject(new Error('Blob creation failed'));
                resolve(blob);
            }, 'image/png');
        };

        image.onerror = (err) => reject(err);
    });
};
