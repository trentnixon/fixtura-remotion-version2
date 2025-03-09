/**
 * Export all image animations
 */

// Fade animations
export { fadeIn, fadeOut } from "./fadeAnimations";

// Zoom animations
export { zoomIn, zoomOut } from "./zoomAnimations";

// Slide animations
export {
  slideInLeft,
  slideInRight,
  slideInTop,
  slideInBottom,
  slideOutLeft,
  slideOutRight,
  slideOutTop,
  slideOutBottom,
} from "./slideAnimations";

// Special animations
export { kenBurns, pulse } from "./specialAnimations";

// Rotate animations
export { rotate, rotateIn, rotateOut } from "./rotateAnimations";

// Spring animations
export { springScale } from "./springAnimations";

// Camera-inspired animations
export { focusIn, focusOut, exposureIn, exposureOut } from "./cameraAnimations";

// Cinematic transitions
export {
  wipeLeft,
  wipeRight,
  wipeUp,
  wipeDown,
  splitHorizontal,
  splitVertical,
} from "./cinematicAnimations";

// Visual effects
export {
  desaturate,
  saturate,
  tint,
  glitch,
  ripple,
} from "./effectsAnimations";

// 3D animations
export {
  flipX,
  flipY,
  swing,
  zoomPerspective,
  depthOfField,
} from "./perspectiveAnimations";

// Broadcast-style animations
export {
  lowerThirdIn,
  lowerThirdOut,
  scoreboardIn,
  statReveal,
} from "./broadcastAnimations";

// Advanced composite animations
export { popAndSpin, bounceAndFade } from "./compositeAnimations";
