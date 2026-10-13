// CMS uploads are already-optimized WebP: skip the Next image optimizer for them.
export function isCmsUpload(src) {
  return typeof src === "string" && src.includes("/storage/v1/object/public/site-media/");
}
