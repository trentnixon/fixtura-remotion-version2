/**
 * Animated Container Modules
 *
 * This file exports reusable components based on the AnimatedContainer
 * organized by animation type.
 */

// Export fade animations
export {
  FadeIn,
  FadeOut,
  FadeInOut,
  FadeInSpring,
  DEFAULT_FADE_IN,
  DEFAULT_FADE_OUT as FADE_DEFAULT_FADE_OUT,
  DEFAULT_SPRING_IN as FADE_DEFAULT_SPRING_IN,
} from "./fade";

// Export slide animations
export {
  SlideInLeft,
  SlideInRight,
  SlideInTop,
  SlideInBottom,
  SlideInOut,
  SlideSpring,
  DEFAULT_SLIDE_IN_LEFT,
  DEFAULT_SLIDE_IN_RIGHT,
  DEFAULT_SLIDE_IN_TOP,
  DEFAULT_SLIDE_IN_BOTTOM,
  DEFAULT_SLIDE_OUT_LEFT,
  DEFAULT_SLIDE_OUT_RIGHT,
  DEFAULT_SLIDE_OUT_TOP,
  DEFAULT_SLIDE_OUT_BOTTOM,
  DEFAULT_SPRING_TRANSLATE_X,
  DEFAULT_SPRING_TRANSLATE_Y,
  DEFAULT_FADE_OUT as SLIDE_DEFAULT_FADE_OUT,
} from "./slide";

// Export scale animations
export {
  ScaleIn,
  ScaleOut,
  ScaleInX,
  ScaleInY,
  ScaleInOut,
  ScaleSpring,
  DEFAULT_SCALE_IN,
  DEFAULT_SCALE_OUT,
  DEFAULT_SCALE_IN_X,
  DEFAULT_SCALE_IN_Y,
  DEFAULT_SPRING_SCALE,
  DEFAULT_FADE_OUT as SCALE_DEFAULT_FADE_OUT,
} from "./scale";

// Export reveal animations
export {
  RevealLeft,
  RevealRight,
  RevealTop,
  RevealBottom,
  RevealCollapse,
  DEFAULT_REVEAL_LEFT,
  DEFAULT_REVEAL_RIGHT,
  DEFAULT_REVEAL_TOP,
  DEFAULT_REVEAL_BOTTOM,
  DEFAULT_COLLAPSE_LEFT,
  DEFAULT_COLLAPSE_RIGHT,
  DEFAULT_COLLAPSE_TOP,
  DEFAULT_COLLAPSE_BOTTOM,
  DEFAULT_FADE_OUT as REVEAL_DEFAULT_FADE_OUT,
} from "./reveal";

// Export spring animations
export {
  SpringIn,
  SpringOut,
  SpringScale,
  SpringTranslateX,
  SpringTranslateY,
  SpringRotate,
  SpringBounce,
  DEFAULT_SPRING_IN,
  DEFAULT_SPRING_OUT,
  DEFAULT_SPRING_SCALE as SPRING_DEFAULT_SPRING_SCALE,
  DEFAULT_SPRING_TRANSLATE_X as SPRING_DEFAULT_SPRING_TRANSLATE_X,
  DEFAULT_SPRING_TRANSLATE_Y as SPRING_DEFAULT_SPRING_TRANSLATE_Y,
  DEFAULT_SPRING_ROTATE,
  DEFAULT_FADE_OUT as SPRING_DEFAULT_FADE_OUT,
} from "./spring";

// Export 3D animations
export {
  FlipX,
  FlipY,
  Rotate3D,
  Swing,
  ZoomPerspective,
  Glitch,
  Blur,
  FlipInOut,
  DEFAULT_FLIP_X,
  DEFAULT_FLIP_Y,
  DEFAULT_ROTATE_3D,
  DEFAULT_SWING,
  DEFAULT_ZOOM_PERSPECTIVE,
  DEFAULT_GLITCH,
  DEFAULT_BLUR,
  DEFAULT_FADE_OUT as THREED_DEFAULT_FADE_OUT,
} from "./threeD";

// Export a common DEFAULT_FADE_OUT for convenience
export { DEFAULT_FADE_OUT } from "./fade";
