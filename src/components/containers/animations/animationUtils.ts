import {
  ContainerAnimationType,
  ContainerAnimationConfig,
  AnimationEasing,
  ContainerSpringConfig,
} from "./animationTypes";
import { interpolate, spring, random } from "remotion";
import { getImageEasingFunction } from "../../easing/easingFunctions";

/**
 * Normalizes animation configuration
 * Converts string animation type to full animation config object
 */
export const normalizeContainerAnimation = (
  animation: ContainerAnimationType | ContainerAnimationConfig,
  delay = 0,
  duration = 30,
  easing: AnimationEasing = { type: "inOut", base: "ease" },
): ContainerAnimationConfig => {
  if (typeof animation === "string") {
    return {
      type: animation,
      delay,
      duration,
      easing,
    };
  }
  return {
    ...animation,
    delay: animation.delay ?? delay,
    duration: animation.duration ?? duration,
    easing: animation.easing ?? easing,
  };
};

/**
 * Calculates animation progress using Remotion's interpolate function
 * This provides a more accurate animation with proper easing
 */
export const calculateAnimationProgress = (
  frame: number,
  startFrame: number,
  duration: number,
  easing: AnimationEasing = { type: "inOut", base: "ease" },
): number => {
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: getImageEasingFunction(easing),
  });
};

/**
 * Creates a spring animation using Remotion's spring function
 */
export const createSpringAnimation = (
  frame: number,
  startFrame: number,
  fps: number,
  config?: ContainerSpringConfig,
  durationInFrames?: number,
) => {
  return spring({
    frame: frame - startFrame,
    fps,
    config: {
      mass: config?.mass ?? 1,
      damping: config?.damping ?? 10,
      stiffness: config?.stiffness ?? 100,
      overshootClamping: config?.overshootClamping ?? false,
    },
    durationInFrames,
  });
};

/**
 * Calculates animation styles based on animation type and progress
 * This function uses the new animation system with Remotion's patterns
 */
export const calculateAnimationStyles = (
  animationType: ContainerAnimationType,
  progress: number,
): React.CSSProperties => {
  if (animationType === "none") {
    return {};
  }

  // Basic animation styles based on progress
  const styles: React.CSSProperties = {};

  // Apply different animations based on type
  switch (animationType) {
    case "fadeIn":
      styles.opacity = progress;
      break;
    case "fadeOut":
      styles.opacity = 1 - progress;
      break;
    case "slideInLeft":
      styles.transform = `translateX(${(1 - progress) * -100}%)`;
      break;
    case "slideInRight":
      styles.transform = `translateX(${(1 - progress) * 100}%)`;
      break;
    case "slideInTop":
      styles.transform = `translateY(${(1 - progress) * -100}%)`;
      break;
    case "slideInBottom":
      styles.transform = `translateY(${(1 - progress) * 100}%)`;
      break;
    case "slideOutLeft":
      styles.transform = `translateX(${progress * -100}%)`;
      break;
    case "slideOutRight":
      styles.transform = `translateX(${progress * 100}%)`;
      break;
    case "slideOutTop":
      styles.transform = `translateY(${progress * -100}%)`;
      break;
    case "slideOutBottom":
      styles.transform = `translateY(${progress * 100}%)`;
      break;
    case "scaleIn":
      styles.transform = `scale(${0.5 + progress * 0.5})`;
      break;
    case "scaleOut":
      styles.transform = `scale(${1 - progress * 0.5})`;
      break;
    case "scaleInX":
      styles.transform = `scaleX(${progress})`;
      break;
    case "scaleInY":
      styles.transform = `scaleY(${progress})`;
      break;
    case "scaleOutX":
      styles.transform = `scaleX(${1 - progress})`;
      break;
    case "scaleOutY":
      styles.transform = `scaleY(${1 - progress})`;
      break;
    case "revealLeft":
      styles.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;
      break;
    case "revealRight":
      styles.clipPath = `inset(0 0 0 ${(1 - progress) * 100}%)`;
      break;
    case "revealTop":
      styles.clipPath = `inset(${(1 - progress) * 100}% 0 0 0)`;
      break;
    case "revealBottom":
      styles.clipPath = `inset(0 0 ${(1 - progress) * 100}% 0)`;
      break;
    case "collapseLeft":
      styles.clipPath = `inset(0 ${progress * 100}% 0 0)`;
      break;
    case "collapseRight":
      styles.clipPath = `inset(0 0 0 ${progress * 100}%)`;
      break;
    case "collapseTop":
      styles.clipPath = `inset(${progress * 100}% 0 0 0)`;
      break;
    case "collapseBottom":
      styles.clipPath = `inset(0 0 ${progress * 100}% 0)`;
      break;
    // Spring animations are now handled by createSpringAnimation function
    // These are kept for backward compatibility
    case "springIn":
      styles.transform = `scale(${Math.min(1, progress * 1.1 - Math.sin(progress * Math.PI) * 0.1)})`;
      styles.opacity = Math.min(1, progress * 1.5);
      break;
    case "springOut":
      styles.transform = `scale(${Math.max(0, 1 - progress * 0.9 + Math.sin(progress * Math.PI) * 0.1)})`;
      styles.opacity = Math.max(0, 1 - progress * 1.5);
      break;
    case "springScale":
      styles.transform = `scale(${1 + Math.sin(progress * Math.PI * 2) * 0.1})`;
      break;
    case "springTranslateX":
      styles.transform = `translateX(${Math.sin(progress * Math.PI * 2) * 10}px)`;
      break;
    case "springTranslateY":
      styles.transform = `translateY(${Math.sin(progress * Math.PI * 2) * 10}px)`;
      break;
    case "springRotate":
      styles.transform = `rotate(${Math.sin(progress * Math.PI * 2) * 5}deg)`;
      break;
    case "flipX":
      styles.transform = `perspective(800px) rotateX(${(0.5 - progress) * 180}deg)`;
      styles.backfaceVisibility = "hidden";
      break;
    case "flipY":
      styles.transform = `perspective(800px) rotateY(${(0.5 - progress) * 180}deg)`;
      styles.backfaceVisibility = "hidden";
      break;
    case "rotate3D":
      styles.transform = `perspective(800px) rotate3d(1, 1, 0, ${progress * 360}deg)`;
      break;
    case "swing":
      styles.transform = `rotate(${Math.sin(progress * Math.PI * 2) * 10}deg)`;
      styles.transformOrigin = "top center";
      break;
    case "zoomPerspective":
      styles.transform = `perspective(800px) translateZ(${(1 - progress) * 200}px)`;
      break;
    case "glitch":
      if (progress < 0.33) {
        styles.transform = `translate(${random("glitch-x1") * 5 - 2.5}px, ${random("glitch-y1") * 5 - 2.5}px)`;
      } else if (progress < 0.66) {
        styles.transform = `translate(${random("glitch-x2") * 3 - 1.5}px, ${random("glitch-y2") * 3 - 1.5}px)`;
      }
      break;
    case "blur":
      styles.filter = `blur(${(1 - progress) * 10}px)`;
      break;
    default:
      // For unsupported animations, default to no animation
      break;
  }

  return styles;
};
