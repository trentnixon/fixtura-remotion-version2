import { useCurrentFrame, useVideoConfig } from "remotion";
import { ContainerAnimationConfig } from "../config/types";
import { normalizeContainerAnimation } from "../config/animationUtils";
import React from "react";

// Import all animations
import {
  fadeIn,
  fadeOut,
  slideInLeft,
  slideInRight,
  slideInTop,
  slideInBottom,
  slideOutLeft,
  slideOutRight,
  slideOutTop,
  slideOutBottom,
  scaleIn,
  scaleOut,
  scaleInX,
  scaleInY,
  scaleOutX,
  scaleOutY,
  revealLeft,
  revealRight,
  revealTop,
  revealBottom,
  collapseLeft,
  collapseRight,
  collapseTop,
  collapseBottom,
  springIn,
  springOut,
  springScale,
  springTranslateX,
  springTranslateY,
  springRotate,
  flipX,
  flipY,
  rotate3D,
  swing,
  zoomPerspective,
  glitch,
  blur,
} from "../config/animations";

/**
 * Hook to get container animation styles based on current frame
 */
export const useContainerAnimation = (
  config: ContainerAnimationConfig,
): React.CSSProperties => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Default style (no animation)
  const defaultStyle: React.CSSProperties = {};

  // If no animation or type is none, return empty styles
  if (!config || config.type === "none") {
    return defaultStyle;
  }

  const delay = config.delay || 0;
  const duration = config.duration || 30;
  const startFrame = delay;
  const endFrame = delay + duration;

  // Apply different animations based on type
  switch (config.type) {
    // Fade animations
    case "fadeIn":
      return fadeIn(frame, startFrame, endFrame, config);
    case "fadeOut":
      return fadeOut(frame, startFrame, endFrame, config);

    // Slide animations
    case "slideInLeft":
      return slideInLeft(frame, startFrame, endFrame, config);
    case "slideInRight":
      return slideInRight(frame, startFrame, endFrame, config);
    case "slideInTop":
      return slideInTop(frame, startFrame, endFrame, config);
    case "slideInBottom":
      return slideInBottom(frame, startFrame, endFrame, config);
    case "slideOutLeft":
      return slideOutLeft(frame, startFrame, endFrame, config);
    case "slideOutRight":
      return slideOutRight(frame, startFrame, endFrame, config);
    case "slideOutTop":
      return slideOutTop(frame, startFrame, endFrame, config);
    case "slideOutBottom":
      return slideOutBottom(frame, startFrame, endFrame, config);

    // Scale animations
    case "scaleIn":
      return scaleIn(frame, startFrame, endFrame, config);
    case "scaleOut":
      return scaleOut(frame, startFrame, endFrame, config);
    case "scaleInX":
      return scaleInX(frame, startFrame, endFrame, config);
    case "scaleInY":
      return scaleInY(frame, startFrame, endFrame, config);
    case "scaleOutX":
      return scaleOutX(frame, startFrame, endFrame, config);
    case "scaleOutY":
      return scaleOutY(frame, startFrame, endFrame, config);

    // Special animations
    case "revealLeft":
      return revealLeft(frame, startFrame, endFrame, config);
    case "revealRight":
      return revealRight(frame, startFrame, endFrame, config);
    case "revealTop":
      return revealTop(frame, startFrame, endFrame, config);
    case "revealBottom":
      return revealBottom(frame, startFrame, endFrame, config);
    case "collapseLeft":
      return collapseLeft(frame, startFrame, endFrame, config);
    case "collapseRight":
      return collapseRight(frame, startFrame, endFrame, config);
    case "collapseTop":
      return collapseTop(frame, startFrame, endFrame, config);
    case "collapseBottom":
      return collapseBottom(frame, startFrame, endFrame, config);

    // Spring animations
    case "springIn":
      return springIn(frame, startFrame, endFrame, config, fps);
    case "springOut":
      return springOut(frame, startFrame, endFrame, config, fps);
    case "springScale":
      return springScale(frame, startFrame, endFrame, config, fps);
    case "springTranslateX":
      return springTranslateX(frame, startFrame, endFrame, config, fps);
    case "springTranslateY":
      return springTranslateY(frame, startFrame, endFrame, config, fps);
    case "springRotate":
      return springRotate(frame, startFrame, endFrame, config, fps);

    // 3D animations
    case "flipX":
      return flipX(frame, startFrame, endFrame, config);
    case "flipY":
      return flipY(frame, startFrame, endFrame, config);
    case "rotate3D":
      return rotate3D(frame, startFrame, endFrame, config);
    case "swing":
      return swing(frame, startFrame, endFrame, config);
    case "zoomPerspective":
      return zoomPerspective(frame, startFrame, endFrame, config);

    // Video-focused animations
    case "glitch":
      return glitch(frame, startFrame, endFrame, config);
    case "blur":
      return blur(frame, startFrame, endFrame, config);

    default:
      return defaultStyle;
  }
};

/**
 * Hook to handle both entry and exit animations
 */
export const useDualContainerAnimation = (
  entryConfig: ContainerAnimationConfig,
  exitConfig: ContainerAnimationConfig,
  exitFrame: number = 0,
): React.CSSProperties => {
  const frame = useCurrentFrame();

  // If no exit animation is specified or exitFrame is 0, just use the entry animation
  if (exitConfig.type === "none" || exitFrame <= 0) {
    return useContainerAnimation(entryConfig);
  }

  // If we're past the exit frame, use the exit animation
  // but adjust the startFrame to be the exitFrame
  if (frame >= exitFrame) {
    // Create a modified exit config with the startFrame set to exitFrame
    const adjustedExitConfig: ContainerAnimationConfig = {
      ...exitConfig,
      delay: 0, // Reset any delay
    };

    // Apply the exit animation with the adjusted frame
    const exitStyles = {
      ...useContainerAnimation({
        ...adjustedExitConfig,
        // We need to pass the original frame to the animation function
        // but make sure it knows to start at the exitFrame
        delay: exitFrame,
      }),
    };

    return exitStyles;
  }

  // Otherwise, use the entry animation
  return useContainerAnimation(entryConfig);
};
