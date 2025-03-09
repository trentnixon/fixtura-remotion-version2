import {
  AnimationType,
  AnimationConfig,
  EasingType,
  SpringConfig,
} from "./types";
import { SPRING_CONFIGS } from "./springConfigs";

/**
 * Helper to normalize animation config
 */
export const normalizeAnimation = (
  animation?: AnimationType | AnimationConfig,
  delay?: number,
  duration?: number,
  easing?: EasingType,
  springConfig?: SpringConfig,
): AnimationConfig => {
  if (!animation) {
    return { type: "none" };
  }

  if (typeof animation === "string") {
    return {
      type: animation,
      delay: delay || 0,
      duration: duration || 30,
      easing: easing || "easeInOut",
      springConfig: springConfig || SPRING_CONFIGS.DEFAULT,
    };
  }

  return {
    ...animation,
    delay: animation.delay || delay || 0,
    duration: animation.duration || duration || 30,
    easing: animation.easing || easing || "easeInOut",
    springConfig:
      animation.springConfig || springConfig || SPRING_CONFIGS.DEFAULT,
  };
};
