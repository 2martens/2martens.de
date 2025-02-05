import { CMS_BASE_URL } from "../content.config";

export function buildImageSrc(imageUrl: string | null) {
    if (!imageUrl) return "";
    return CMS_BASE_URL + imageUrl;
}