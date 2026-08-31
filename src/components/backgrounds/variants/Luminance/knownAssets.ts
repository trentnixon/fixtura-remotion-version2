export const KNOWN_LUMINANCE_ASSETS = new Set([
  "smooth-ramp.png",
  "high-contrast.png",
  "fine-noise.png",
  "linework-protected.png",
  "_verify/smooth-ramp.png",
  "_verify/test001.png",
  "_verify/test002.png",
  "_verify/test003.png",
  "_verify/test004.png",
  "_verify/test005.png",
  "_verify/test006.png",
  "_verify/test007.png",
]);

export const isKnownLuminanceAsset = (asset?: string) =>
  Boolean(asset && KNOWN_LUMINANCE_ASSETS.has(asset));
