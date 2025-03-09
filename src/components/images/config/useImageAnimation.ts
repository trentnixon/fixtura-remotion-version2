import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ImageAnimationConfig } from "./types";
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

  // If no exit animation is specified or exitFrame is 0, just use the entry animation
  if (exitConfig.type === "none" || exitFrame <= 0) {
    return useImageAnimation(entryConfig);
  }

  // Calculate entry animation parameters
  const entryDelay = entryConfig.delay || 0;
  const entryDuration = entryConfig.duration || 30;
  const entryStartFrame = entryDelay;
  const entryEndFrame = entryDelay + entryDuration;

  // Calculate exit animation parameters
  const exitDelay = exitConfig.delay || 0;
  const exitStartFrame = exitFrame + exitDelay;
  const exitDuration = exitConfig.duration || 30;
  const exitEndFrame = exitStartFrame + exitDuration;

  // Debug information
  console.log(
    `Frame: ${frame}, Exit Start: ${exitStartFrame}, Exit End: ${exitEndFrame}`,
  );
  console.log(`Entry Type: ${entryConfig.type}, Exit Type: ${exitConfig.type}`);

  // For fade in/out animations, use the Remotion approach
  if (entryConfig.type === "fadeIn" && exitConfig.type === "fadeOut") {
    // Fade In animation from frame 0 to entryEndFrame
    const fadeInOpacity = interpolate(
      frame,
      [entryStartFrame, entryEndFrame],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Fade Out animation from exitStartFrame to exitEndFrame
    const fadeOutOpacity = interpolate(
      frame,
      [exitStartFrame, exitEndFrame],
      [1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Final opacity is a product of the two animations
    const opacity = fadeInOpacity * fadeOutOpacity;

    return { opacity };
  }

  // For zoom in/out animations, use a similar approach
  if (entryConfig.type === "zoomIn" && exitConfig.type === "zoomOut") {
    // Fade In animation from frame 0 to entryEndFrame
    const fadeInOpacity = interpolate(
      frame,
      [entryStartFrame, entryEndFrame],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Fade Out animation from exitStartFrame to exitEndFrame
    const fadeOutOpacity = interpolate(
      frame,
      [exitStartFrame, exitEndFrame],
      [1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Calculate scale for zoom in
    const zoomInScale = interpolate(
      frame,
      [entryStartFrame, entryEndFrame],
      [0.5, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Calculate scale for zoom out
    const zoomOutScale = interpolate(
      frame,
      [exitStartFrame, exitEndFrame],
      [1, 0.5],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Determine which scale to use based on current frame
    const scale = frame < exitStartFrame ? zoomInScale : zoomOutScale;

    // Final opacity is a product of the two animations
    const opacity = fadeInOpacity * fadeOutOpacity;

    return {
      opacity,
      transform: `scale(${scale})`,
    };
  }

  // For rotate in/out animations
  if (entryConfig.type === "rotateIn" && exitConfig.type === "rotateOut") {
    // Fade In animation from frame 0 to entryEndFrame
    const fadeInOpacity = interpolate(
      frame,
      [entryStartFrame, entryEndFrame],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Fade Out animation from exitStartFrame to exitEndFrame
    const fadeOutOpacity = interpolate(
      frame,
      [exitStartFrame, exitEndFrame],
      [1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Calculate rotation for rotate in
    const rotateInDegrees = interpolate(
      frame,
      [entryStartFrame, entryEndFrame],
      [90, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Calculate rotation for rotate out
    const rotateOutDegrees = interpolate(
      frame,
      [exitStartFrame, exitEndFrame],
      [0, -90],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Determine which rotation to use based on current frame
    const rotation =
      frame < exitStartFrame ? rotateInDegrees : rotateOutDegrees;

    // Final opacity is a product of the two animations
    const opacity = fadeInOpacity * fadeOutOpacity;

    return {
      opacity,
      transform: `rotate(${rotation}deg)`,
    };
  }

  // For slide in/out animations
  if (
    (entryConfig.type === "slideInLeft" &&
      exitConfig.type === "slideOutRight") ||
    (entryConfig.type === "slideInRight" &&
      exitConfig.type === "slideOutLeft") ||
    (entryConfig.type === "slideInTop" &&
      exitConfig.type === "slideOutBottom") ||
    (entryConfig.type === "slideInBottom" && exitConfig.type === "slideOutTop")
  ) {
    // Default distance
    const distance = 100;

    // Determine the axis and direction based on the animation types
    let axis: "X" | "Y";
    let entryStartValue: number;
    let entryEndValue: number;
    let exitStartValue: number;
    let exitEndValue: number;

    if (
      entryConfig.type === "slideInLeft" &&
      exitConfig.type === "slideOutRight"
    ) {
      axis = "X";
      entryStartValue = -distance;
      entryEndValue = 0;
      exitStartValue = 0;
      exitEndValue = distance;
    } else if (
      entryConfig.type === "slideInRight" &&
      exitConfig.type === "slideOutLeft"
    ) {
      axis = "X";
      entryStartValue = distance;
      entryEndValue = 0;
      exitStartValue = 0;
      exitEndValue = -distance;
    } else if (
      entryConfig.type === "slideInTop" &&
      exitConfig.type === "slideOutBottom"
    ) {
      axis = "Y";
      entryStartValue = -distance;
      entryEndValue = 0;
      exitStartValue = 0;
      exitEndValue = distance;
    } else {
      // slideInBottom and slideOutTop
      axis = "Y";
      entryStartValue = distance;
      entryEndValue = 0;
      exitStartValue = 0;
      exitEndValue = -distance;
    }

    // Calculate entry position
    const entryPosition = interpolate(
      frame,
      [entryStartFrame, entryEndFrame],
      [entryStartValue, entryEndValue],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Calculate exit position
    const exitPosition = interpolate(
      frame,
      [exitStartFrame, exitEndFrame],
      [exitStartValue, exitEndValue],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Determine which position to use based on current frame
    const position = frame < exitStartFrame ? entryPosition : exitPosition;

    // Fade In animation from frame 0 to entryEndFrame
    const fadeInOpacity = interpolate(
      frame,
      [entryStartFrame, entryEndFrame],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Fade Out animation from exitStartFrame to exitEndFrame
    const fadeOutOpacity = interpolate(
      frame,
      [exitStartFrame, exitEndFrame],
      [1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Final opacity is a product of the two animations
    const opacity = fadeInOpacity * fadeOutOpacity;

    return {
      opacity,
      transform: `translate${axis}(${position}px)`,
    };
  }

  // For mixed animation types (any entry animation with fadeOut exit)
  if (exitConfig.type === "fadeOut") {
    // Get the entry animation styles
    const entryStyles = useImageAnimation(entryConfig);

    // Fade In animation from frame 0 to entryEndFrame
    const fadeInOpacity = interpolate(
      frame,
      [entryStartFrame, entryEndFrame],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Fade Out animation from exitStartFrame to exitEndFrame
    const fadeOutOpacity = interpolate(
      frame,
      [exitStartFrame, exitEndFrame],
      [1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    // Final opacity is a product of the two animations
    const opacity = fadeInOpacity * fadeOutOpacity;

    // If we're in the entry phase, use the entry animation styles with the combined opacity
    if (frame < exitStartFrame) {
      return {
        ...entryStyles,
        opacity:
          typeof entryStyles.opacity === "number"
            ? entryStyles.opacity * fadeOutOpacity
            : opacity,
      };
    }

    // If we're in the exit phase, just fade out
    return { opacity: fadeOutOpacity };
  }

  // For mixed animation types (any entry animation with slide out exit)
  if (exitConfig.type.startsWith("slideOut")) {
    // Get the entry animation styles
    const entryStyles = useImageAnimation(entryConfig);

    // Get the exit animation styles
    const exitStyles = useImageAnimation(exitConfig);

    // If we're in the entry phase, use the entry animation styles
    if (frame < exitStartFrame) {
      return entryStyles;
    }

    // If we're in the exit phase, use the exit animation styles
    return exitStyles;
  }

  // For mixed animation types (any entry animation with rotate out exit)
  if (exitConfig.type === "rotateOut") {
    // Get the entry animation styles
    const entryStyles = useImageAnimation(entryConfig);

    // Get the exit animation styles
    const exitStyles = useImageAnimation(exitConfig);

    // If we're in the entry phase, use the entry animation styles
    if (frame < exitStartFrame) {
      return entryStyles;
    }

    // If we're in the exit phase, use the exit animation styles
    return exitStyles;
  }

  // For all other animation types, switch between entry and exit animations
  if (frame < exitStartFrame) {
    return useImageAnimation(entryConfig);
  } else {
    return useImageAnimation(exitConfig);
  }
};
