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
  // Site production plates (public/luminance/plates)
  "plates/brush-halftone-corners.png",
  "plates/brush-slash-halftone.png",
  "plates/brush-sweep-gray.png",
  "plates/dark-circle-mesh.png",
  "plates/diagonal-halftone.png",
  "plates/diagonal-paint-strokes.png",
  "plates/fingerprint-grunge.png",
  "plates/geometric-halftone.png",
  "plates/grunge-diagonal-panels.png",
  "plates/halftone-fade.png",
  "plates/jagged-radial-burst.png",
  "plates/light-motion-streaks.png",
  "plates/light-well-geometry.png",
  "plates/radial-speed-lines.png",
]);

export const isKnownLuminanceAsset = (asset?: string) =>
  Boolean(asset && KNOWN_LUMINANCE_ASSETS.has(asset));
