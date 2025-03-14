import { interpolate } from "remotion";
import { ContainerAnimationFunction, ContainerAnimationConfig } from "../types";
import { getContainerEasingFunction } from "../easingFunctions";
import React from "react";

/**
 * FlipX animation - 3D flip around X axis
 * This animation creates a 3D flip effect around the horizontal axis
 */
export const flipX: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Default rotation range (-90 to 0 degrees)
  const startRotation = config.custom?.startRotation || -90;
  const endRotation = config.custom?.endRotation || 0;

  const rotation = interpolate(
    frame,
    [startFrame, endFrame],
    [startRotation, endRotation],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Fade in as the flip progresses
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    transform: `perspective(1000px) rotateX(${rotation}deg)`,
    transformOrigin: config.custom?.origin || "center bottom",
    opacity,
    backfaceVisibility: "hidden",
  };
};

/**
 * FlipY animation - 3D flip around Y axis
 * This animation creates a 3D flip effect around the vertical axis
 */
export const flipY: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Default rotation range (-90 to 0 degrees)
  const startRotation = config.custom?.startRotation || -90;
  const endRotation = config.custom?.endRotation || 0;

  const rotation = interpolate(
    frame,
    [startFrame, endFrame],
    [startRotation, endRotation],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Fade in as the flip progresses
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    transform: `perspective(1000px) rotateY(${rotation}deg)`,
    transformOrigin: config.custom?.origin || "center left",
    opacity,
    backfaceVisibility: "hidden",
  };
};

/**
 * Rotate3D animation - 3D rotation with custom axis
 * This animation allows for rotation around any arbitrary 3D axis
 */
export const rotate3D: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Default rotation values
  const startAngle = config.custom?.startAngle || -45;
  const endAngle = config.custom?.endAngle || 0;

  // Default rotation axis (x, y, z)
  const xAxis = config.custom?.xAxis !== undefined ? config.custom.xAxis : 1;
  const yAxis = config.custom?.yAxis !== undefined ? config.custom.yAxis : 1;
  const zAxis = config.custom?.zAxis !== undefined ? config.custom.zAxis : 0;

  const angle = interpolate(
    frame,
    [startFrame, endFrame],
    [startAngle, endAngle],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Fade in as the rotation progresses
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    transform: `perspective(1000px) rotate3d(${xAxis}, ${yAxis}, ${zAxis}, ${angle}deg)`,
    transformOrigin: config.custom?.origin || "center center",
    opacity,
    backfaceVisibility: "hidden",
  };
};

/**
 * Swing animation - pendulum-like swinging motion
 * This animation creates a swinging effect, like a pendulum
 */
export const swing: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Calculate progress (0 to 1)
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Amplitude of the swing (degrees)
  const amplitude = config.custom?.amplitude || 30;

  // Create a damped oscillation
  const swingAngle =
    Math.sin(progress * Math.PI * 2) * amplitude * Math.exp(-progress * 3);

  // Fade in at the start
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.2],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    transform: `rotate(${swingAngle}deg)`,
    transformOrigin: config.custom?.origin || "top center",
    opacity,
  };
};

/**
 * ZoomPerspective animation - combines zoom with perspective change
 * This animation creates a dynamic zoom effect with changing perspective
 */
export const zoomPerspective: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Scale range (0.5 to 1)
  const startScale = config.custom?.startScale || 0.5;
  const endScale = config.custom?.endScale || 1;

  const scale = interpolate(
    frame,
    [startFrame, endFrame],
    [startScale, endScale],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Perspective range (500 to 1000)
  const startPerspective = config.custom?.startPerspective || 500;
  const endPerspective = config.custom?.endPerspective || 1000;

  const perspective = interpolate(
    frame,
    [startFrame, endFrame],
    [startPerspective, endPerspective],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Z translation range (depends on scale)
  const zTranslation = interpolate(
    frame,
    [startFrame, endFrame],
    [(1 - startScale) * -100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Fade in as the zoom progresses
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.3],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    transform: `perspective(${perspective}px) translateZ(${zTranslation}px) scale(${scale})`,
    opacity,
  };
};

/**
 * Glitch animation - creates a digital glitch effect
 * This animation simulates a digital glitch with random displacements
 */
export const glitch: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Calculate progress (0 to 1)
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  // Intensity of the glitch effect
  const intensity = config.custom?.intensity || 10;

  // Create random displacements based on the current frame
  // We use Math.sin with different frequencies to create pseudo-random values
  const xOffset = Math.sin(frame * 0.1) * intensity * (1 - progress);
  const yOffset = Math.sin(frame * 0.2) * intensity * (1 - progress);
  const skewX = Math.sin(frame * 0.3) * 5 * (1 - progress);

  // Fade in as the glitch settles
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.3],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    transform: `translate(${xOffset}px, ${yOffset}px) skewX(${skewX}deg)`,
    opacity,
    // Add a subtle color shift using filters
    filter: `hue-rotate(${Math.sin(frame * 0.4) * 30 * (1 - progress)}deg)`,
  };
};

/**
 * Blur animation - creates a blur effect that gradually sharpens
 * This animation simulates a camera focusing effect
 */
export const blur: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Blur range (20 to 0)
  const startBlur = config.custom?.startBlur || 20;
  const endBlur = config.custom?.endBlur || 0;

  const blurAmount = interpolate(
    frame,
    [startFrame, endFrame],
    [startBlur, endBlur],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Scale range (1.05 to 1)
  const startScale = config.custom?.startScale || 1.05;
  const endScale = config.custom?.endScale || 1;

  const scale = interpolate(
    frame,
    [startFrame, endFrame],
    [startScale, endScale],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Fade in as the blur clears
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    filter: `blur(${blurAmount}px)`,
    transform: `scale(${scale})`,
    opacity,
  };
};
