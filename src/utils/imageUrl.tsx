export function buildImageSrc(imageUrl: string | null) {
    if (!imageUrl) return "";
    return "http://localhost:3000" + imageUrl;
}