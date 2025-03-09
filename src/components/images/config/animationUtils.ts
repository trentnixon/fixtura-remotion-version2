import {
  ImageAnimationType,
  ImageAnimationConfig,
  ImageEasingType,
  ImageSpringConfig,
} from "./types";
import { IMAGE_SPRING_CONFIGS } from "./springConfigs";

/**
 * Helper to normalize animation config
 */
export const normalizeImageAnimation = (
  animation?: ImageAnimationType | ImageAnimationConfig,
  delay?: number,
  duration?: number,
  easing?: ImageEasingType,
  springConfig?: ImageSpringConfig,
): ImageAnimationConfig => {
  if (!animation) {
    return { type: "none" };
  }

  if (typeof animation === "string") {
    return {
      type: animation,
      delay: delay || 0,
      duration: duration || 30,
      easing: easing || "easeInOut",
      springConfig: springConfig || IMAGE_SPRING_CONFIGS.DEFAULT,
    };
  }

  return {
    ...animation,
    delay: animation.delay || delay || 0,
    duration: animation.duration || duration || 30,
    easing: animation.easing || easing || "easeInOut",
    springConfig:
      animation.springConfig || springConfig || IMAGE_SPRING_CONFIGS.DEFAULT,
  };
};
