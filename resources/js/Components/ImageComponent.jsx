export default function ImageComponent() {
    return <></>;
}

export function createImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
    });
}

export async function getCroppedImg(imageSrc, pixelCrop, ratioImage = 1) {
    const image = await createImage(imageSrc);
    pixelCrop.width = pixelCrop?.width || image.width;
    pixelCrop.height = pixelCrop?.height || image.width / ratioImage;
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // As Base64 string
    return canvas.toDataURL("image/jpeg");

    // As a blob
    // return new Promise((resolve, reject) => {
    //     canvas.toBlob(file => {
    //         resolve(URL.createObjectURL(file));
    //     }, 'image/jpeg');
    // });
}
