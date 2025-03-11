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

  // If we have a relative frame from exit animation calculation, use it
  // Otherwise use the current frame
  const effectiveFrame =
    config.custom?._relativeFrame !== undefined
      ? config.custom._relativeFrame
      : frame;

  const startFrame = delay;
  const endFrame = delay + duration;

  // Apply different animations based on type
  switch (config.type) {
    // Fade animations
    case "fadeIn":
      return fadeIn(effectiveFrame, startFrame, endFrame, config);
    case "fadeOut":
      return fadeOut(effectiveFrame, startFrame, endFrame, config);

    // Slide animations
    case "slideInLeft":
      return slideInLeft(effectiveFrame, startFrame, endFrame, config);
    case "slideInRight":
      return slideInRight(effectiveFrame, startFrame, endFrame, config);
    case "slideInTop":
      return slideInTop(effectiveFrame, startFrame, endFrame, config);
    case "slideInBottom":
      return slideInBottom(effectiveFrame, startFrame, endFrame, config);
    case "slideOutLeft":
      return slideOutLeft(effectiveFrame, startFrame, endFrame, config);
    case "slideOutRight":
      return slideOutRight(effectiveFrame, startFrame, endFrame, config);
    case "slideOutTop":
      return slideOutTop(effectiveFrame, startFrame, endFrame, config);
    case "slideOutBottom":
      return slideOutBottom(effectiveFrame, startFrame, endFrame, config);

    // Scale animations
    case "scaleIn":
      return scaleIn(effectiveFrame, startFrame, endFrame, config);
    case "scaleOut":
      return scaleOut(effectiveFrame, startFrame, endFrame, config);
    case "scaleInX":
      return scaleInX(effectiveFrame, startFrame, endFrame, config);
    case "scaleInY":
      return scaleInY(effectiveFrame, startFrame, endFrame, config);
    case "scaleOutX":
      return scaleOutX(effectiveFrame, startFrame, endFrame, config);
    case "scaleOutY":
      return scaleOutY(effectiveFrame, startFrame, endFrame, config);

    // Special animations
    case "revealLeft":
      return revealLeft(effectiveFrame, startFrame, endFrame, config);
    case "revealRight":
      return revealRight(effectiveFrame, startFrame, endFrame, config);
    case "revealTop":
      return revealTop(effectiveFrame, startFrame, endFrame, config);
    case "revealBottom":
      return revealBottom(effectiveFrame, startFrame, endFrame, config);
    case "collapseLeft":
      return collapseLeft(effectiveFrame, startFrame, endFrame, config);
    case "collapseRight":
      return collapseRight(effectiveFrame, startFrame, endFrame, config);
    case "collapseTop":
      return collapseTop(effectiveFrame, startFrame, endFrame, config);
    case "collapseBottom":
      return collapseBottom(effectiveFrame, startFrame, endFrame, config);

    // Spring animations
    case "springIn":
      return springIn(effectiveFrame, startFrame, endFrame, config, fps);
    case "springOut":
      return springOut(effectiveFrame, startFrame, endFrame, config, fps);
    case "springScale":
      return springScale(effectiveFrame, startFrame, endFrame, config, fps);
    case "springTranslateX":
      return springTranslateX(
        effectiveFrame,
        startFrame,
        endFrame,
        config,
        fps,
      );
    case "springTranslateY":
      return springTranslateY(
        effectiveFrame,
        startFrame,
        endFrame,
        config,
        fps,
      );
    case "springRotate":
      return springRotate(effectiveFrame, startFrame, endFrame, config, fps);

    // 3D animations
    case "flipX":
      return flipX(effectiveFrame, startFrame, endFrame, config);
    case "flipY":
      return flipY(effectiveFrame, startFrame, endFrame, config);
    case "rotate3D":
      return rotate3D(effectiveFrame, startFrame, endFrame, config);
    case "swing":
      return swing(effectiveFrame, startFrame, endFrame, config);
    case "zoomPerspective":
      return zoomPerspective(effectiveFrame, startFrame, endFrame, config);

    // Video-focused animations
    case "glitch":
      return glitch(effectiveFrame, startFrame, endFrame, config);
    case "blur":
      return blur(effectiveFrame, startFrame, endFrame, config);

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
  if (frame >= exitFrame) {
    // Create a modified exit config with the delay adjusted to start at exitFrame
    const adjustedExitConfig: ContainerAnimationConfig = {
      ...exitConfig,
      delay: 0, // Reset any delay since we'll calculate it relative to exitFrame
    };

    // Calculate the adjusted frame relative to the exit frame
    // This makes the animation start from 0 at the exit frame
    const relativeFrame = frame - exitFrame;

    // Apply the exit animation with the adjusted frame
    return useContainerAnimation({
      ...adjustedExitConfig,
      // We need to pass the original frame to the animation function
      // but make sure it knows to start at the exitFrame
      delay: 0, // We've already adjusted the frame, so no delay needed
      custom: {
        ...adjustedExitConfig.custom,
        _relativeFrame: relativeFrame, // Store the relative frame for debugging
      },
    });
  }

  // Otherwise, use the entry animation
  return useContainerAnimation(entryConfig);
};
