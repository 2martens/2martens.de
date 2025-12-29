import { CMS_BASE_URL } from "../content.config";

export function buildImageSrc(filename: string | null) {
    if (!filename) return "";
    return CMS_BASE_URL + "/api/media/file/" + filename;
}