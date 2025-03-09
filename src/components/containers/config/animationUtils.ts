import {
  ContainerAnimationType,
  ContainerAnimationConfig,
  ContainerEasingType,
  ContainerSpringConfig,
} from "./types";
import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_DELAY,
} from "./constants";

/**
 * Normalize animation configuration
 * This function takes either a string animation type or a complex animation config
 * and returns a standardized animation configuration object
 */
export const normalizeContainerAnimation = (
  animation: ContainerAnimationType | ContainerAnimationConfig,
  delay?: number,
  duration?: number,
  easing?: ContainerEasingType,
  springConfig?: ContainerSpringConfig,
): ContainerAnimationConfig => {
  // If animation is already a config object, use it as a base
  if (typeof animation === "object") {
    return {
      type: animation.type,
      delay: animation.delay ?? delay ?? DEFAULT_ANIMATION_DELAY,
      duration: animation.duration ?? duration ?? DEFAULT_ANIMATION_DURATION,
      easing: animation.easing ?? easing ?? "easeInOut",
      springConfig: animation.springConfig ?? springConfig,
      custom: animation.custom ?? {},
    };
  }

  // If animation is a string type, create a config object
  return {
    type: animation,
    delay: delay ?? DEFAULT_ANIMATION_DELAY,
    duration: duration ?? DEFAULT_ANIMATION_DURATION,
    easing: easing ?? "easeInOut",
    springConfig,
    custom: {},
  };
};
