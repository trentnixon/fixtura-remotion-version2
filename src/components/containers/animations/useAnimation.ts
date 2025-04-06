import { useCurrentFrame, useVideoConfig } from "remotion";
import { ContainerAnimationConfig } from "./animationTypes";
import React from "react";
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
} from "./utils";

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

  // Calculate animation end frame
  const endFrame = startFrame + (config.duration || 30);

  // Get the appropriate animation function based on the animation type
  // and call it with the current frame and configuration
  switch (config.type) {
    case "fadeIn":
      return fadeIn(frame, startFrame, endFrame, config, fps);
    case "fadeOut":
      return fadeOut(frame, startFrame, endFrame, config, fps);
    case "slideInLeft":
      return slideInLeft(frame, startFrame, endFrame, config, fps);
    case "slideInRight":
      return slideInRight(frame, startFrame, endFrame, config, fps);
    case "slideInTop":
      return slideInTop(frame, startFrame, endFrame, config, fps);
    case "slideInBottom":
      return slideInBottom(frame, startFrame, endFrame, config, fps);
    case "slideOutLeft":
      return slideOutLeft(frame, startFrame, endFrame, config, fps);
    case "slideOutRight":
      return slideOutRight(frame, startFrame, endFrame, config, fps);
    case "slideOutTop":
      return slideOutTop(frame, startFrame, endFrame, config, fps);
    case "slideOutBottom":
      return slideOutBottom(frame, startFrame, endFrame, config, fps);
    case "scaleIn":
      return scaleIn(frame, startFrame, endFrame, config, fps);
    case "scaleOut":
      return scaleOut(frame, startFrame, endFrame, config, fps);
    case "scaleInX":
      return scaleInX(frame, startFrame, endFrame, config, fps);
    case "scaleInY":
      return scaleInY(frame, startFrame, endFrame, config, fps);
    case "scaleOutX":
      return scaleOutX(frame, startFrame, endFrame, config, fps);
    case "scaleOutY":
      return scaleOutY(frame, startFrame, endFrame, config, fps);
    case "revealLeft":
      return revealLeft(frame, startFrame, endFrame, config, fps);
    case "revealRight":
      return revealRight(frame, startFrame, endFrame, config, fps);
    case "revealTop":
      return revealTop(frame, startFrame, endFrame, config, fps);
    case "revealBottom":
      return revealBottom(frame, startFrame, endFrame, config, fps);
    case "collapseLeft":
      return collapseLeft(frame, startFrame, endFrame, config, fps);
    case "collapseRight":
      return collapseRight(frame, startFrame, endFrame, config, fps);
    case "collapseTop":
      return collapseTop(frame, startFrame, endFrame, config, fps);
    case "collapseBottom":
      return collapseBottom(frame, startFrame, endFrame, config, fps);
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
    case "flipX":
      return flipX(frame, startFrame, endFrame, config, fps);
    case "flipY":
      return flipY(frame, startFrame, endFrame, config, fps);
    case "rotate3D":
      return rotate3D(frame, startFrame, endFrame, config, fps);
    case "swing":
      return swing(frame, startFrame, endFrame, config, fps);
    case "zoomPerspective":
      return zoomPerspective(frame, startFrame, endFrame, config, fps);
    case "glitch":
      return glitch(frame, startFrame, endFrame, config, fps);
    case "blur":
      return blur(frame, startFrame, endFrame, config, fps);
    default:
      // For unsupported animations, return empty styles
      return defaultStyle;
  }
};
