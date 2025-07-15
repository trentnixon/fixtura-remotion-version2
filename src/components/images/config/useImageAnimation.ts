import { useCurrentFrame, useVideoConfig } from "remotion";
import { ImageAnimationConfig } from "../../easing/types";
import React from "react";

// Import all animations
import {
  fadeIn,
  fadeOut,
  zoomIn,
  zoomOut,
  slideInLeft,
  slideInRight,
  slideInTop,
  slideInBottom,
  slideOutLeft,
  slideOutRight,
  slideOutTop,
  slideOutBottom,
  kenBurns,
  pulse,
  rotate,
  rotateIn,
  rotateOut,
  springScale,
  // Camera-inspired animations
  focusIn,
  focusOut,
  exposureIn,
  exposureOut,
  // Cinematic transitions
  wipeLeft,
  wipeRight,
  wipeUp,
  wipeDown,
  splitHorizontal,
  splitVertical,
  // Visual effects
  desaturate,
  saturate,
  tint,
  glitch,
  ripple,
  // 3D animations
  flipX,
  flipY,
  swing,
  zoomPerspective,
  depthOfField,
  // Broadcast-style animations
  lowerThirdIn,
  lowerThirdOut,
  scoreboardIn,
  statReveal,
  // Advanced composite animations
  popAndSpin,
  bounceAndFade,
} from "./animations";

/**
 * Hook to get image animation styles based on current frame
 */
export const useImageAnimation = (
  config: ImageAnimationConfig,
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
    // Original animations
    case "fadeIn":
      return fadeIn(frame, startFrame, endFrame, config);

    case "fadeOut":
      return fadeOut(frame, startFrame, endFrame, config);

    case "zoomIn":
      return zoomIn(frame, startFrame, endFrame, config);

    case "zoomOut":
      return zoomOut(frame, startFrame, endFrame, config);

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

    case "kenBurns":
      return kenBurns(frame, startFrame, endFrame, config);

    case "pulse":
      return pulse(frame, startFrame, endFrame, config);

    case "rotate":
      return rotate(frame, startFrame, endFrame, config);

    case "rotateIn":
      return rotateIn(frame, startFrame, endFrame, config);

    case "rotateOut":
      return rotateOut(frame, startFrame, endFrame, config);

    case "springScale":
      return springScale(frame, startFrame, endFrame, config, fps);

    // Camera-inspired animations
    case "focusIn":
      return focusIn(frame, startFrame, endFrame, config);

    case "focusOut":
      return focusOut(frame, startFrame, endFrame, config);

    case "exposureIn":
      return exposureIn(frame, startFrame, endFrame, config);

    case "exposureOut":
      return exposureOut(frame, startFrame, endFrame, config);

    // Cinematic transitions
    case "wipeLeft":
      return wipeLeft(frame, startFrame, endFrame, config);

    case "wipeRight":
      return wipeRight(frame, startFrame, endFrame, config);

    case "wipeUp":
      return wipeUp(frame, startFrame, endFrame, config);

    case "wipeDown":
      return wipeDown(frame, startFrame, endFrame, config);

    case "splitHorizontal":
      return splitHorizontal(frame, startFrame, endFrame, config);

    case "splitVertical":
      return splitVertical(frame, startFrame, endFrame, config);

    // Visual effects
    case "desaturate":
      return desaturate(frame, startFrame, endFrame, config);

    case "saturate":
      return saturate(frame, startFrame, endFrame, config);

    case "tint":
      return tint(frame, startFrame, endFrame, config);

    case "glitch":
      return glitch(frame, startFrame, endFrame, config);

    case "ripple":
      return ripple(frame, startFrame, endFrame, config);

    // 3D animations
    case "flipX":
      return flipX(frame, startFrame, endFrame, config);

    case "flipY":
      return flipY(frame, startFrame, endFrame, config);

    case "swing":
      return swing(frame, startFrame, endFrame, config);

    case "zoomPerspective":
      return zoomPerspective(frame, startFrame, endFrame, config);

    case "depthOfField":
      return depthOfField(frame, startFrame, endFrame, config);

    // Broadcast-style animations
    case "lowerThirdIn":
      return lowerThirdIn(frame, startFrame, endFrame, config);

    case "lowerThirdOut":
      return lowerThirdOut(frame, startFrame, endFrame, config);

    case "scoreboardIn":
      return scoreboardIn(frame, startFrame, endFrame, config);

    case "statReveal":
      return statReveal(frame, startFrame, endFrame, config);

    // Advanced composite animations
    case "popAndSpin":
      return popAndSpin(frame, startFrame, endFrame, config);

    case "bounceAndFade":
      return bounceAndFade(frame, startFrame, endFrame, config);

    default:
      return defaultStyle;
  }
};

export const getImageAnimationStyles = (
  config: ImageAnimationConfig,
  frame: number,
): React.CSSProperties => {
  // Default style (no animation)
  const defaultStyle: React.CSSProperties = {};

  if (!config || config.type === "none") {
    return defaultStyle;
  }

  const delay = config.delay || 0;
  const duration = config.duration || 30;
  const startFrame = delay;
  const endFrame = delay + duration;

  switch (config.type) {
    case "fadeIn":
      return fadeIn(frame, startFrame, endFrame, config);
    case "fadeOut":
      return fadeOut(frame, startFrame, endFrame, config);
    case "zoomIn":
      return zoomIn(frame, startFrame, endFrame, config);
    case "zoomOut":
      return zoomOut(frame, startFrame, endFrame, config);
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
    case "kenBurns":
      return kenBurns(frame, startFrame, endFrame, config);
    case "pulse":
      return pulse(frame, startFrame, endFrame, config);
    case "rotate":
      return rotate(frame, startFrame, endFrame, config);
    // Add more cases as needed
    default:
      return defaultStyle;
  }
};

/**
 * Hook to handle both entry and exit animations
 * This implements the Remotion approach for combining animations
 */
export const useDualImageAnimation = (
  entryConfig: ImageAnimationConfig,
  exitConfig: ImageAnimationConfig,
  exitFrame: number = 0,
): React.CSSProperties => {
  const frame = useCurrentFrame();
  // fps is no longer needed

  const entryAnimStyles = useImageAnimation(entryConfig);
  const actualExitConfig: ImageAnimationConfig =
    exitConfig && exitConfig.type !== "none"
      ? exitConfig
      : {
          type: "fadeOut",
          duration: 30,
          easing: { type: "inOut", base: "ease" },
        };
  const exitAnimStyles = getImageAnimationStyles(
    actualExitConfig,
    frame - exitFrame,
  );

  if (!exitConfig || exitConfig.type === "none" || exitFrame <= 0) {
    return entryAnimStyles;
  }
  if (frame < exitFrame) {
    return entryAnimStyles;
  }
  return exitAnimStyles;
};
