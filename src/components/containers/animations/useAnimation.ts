import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  ContainerAnimationConfig,
  ContainerAnimationType,
} from "./animationTypes";
import {
  calculateAnimationProgress,
  createSpringAnimation,
} from "./animationUtils";
import React from "react";

/**
 * Hook to manage container animations using Remotion's patterns
 *
 * @param config Animation configuration
 * @param startFrame Frame to start the animation
 * @returns CSS styles for the animation
 */
export const useAnimation = (
  config: ContainerAnimationConfig,
  startFrame: number = 0,
): React.CSSProperties => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Default style (no animation)
  const defaultStyle: React.CSSProperties = {};

  // If no animation or type is none, return empty styles
  if (!config || config.type === "none") {
    return defaultStyle;
  }

  // Calculate animation progress
  let progress: number;

  // For spring animations, use Remotion's spring function
  if (config.type.startsWith("spring")) {
    progress = createSpringAnimation(
      frame,
      startFrame,
      config.springConfig,
      config.duration,
    );
  } else {
    // For regular animations, use interpolate with easing
    progress = calculateAnimationProgress(
      frame,
      startFrame,
      config.duration || 30,
      config.easing,
    );
  }

  // Apply animation styles based on type and progress
  return applyAnimationStyles(config.type, progress);
};

/**
 * Apply animation styles based on animation type and progress
 */
const applyAnimationStyles = (
  animationType: ContainerAnimationType,
  progress: number,
): React.CSSProperties => {
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
        styles.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
      } else if (progress < 0.66) {
        styles.transform = `translate(${Math.random() * 3 - 1.5}px, ${Math.random() * 3 - 1.5}px)`;
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
