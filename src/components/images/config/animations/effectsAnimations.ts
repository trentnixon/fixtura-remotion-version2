import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
import { AnimationFunction } from "../../../easing/types";
import React from "react";

/**
 * Desaturate animation - gradually removes color from the image
 */
export const desaturate: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const saturation = interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    filter: `saturate(${saturation})`,
    opacity: 1,
  };
};

/**
 * Saturate animation - gradually adds color to the image
 */
export const saturate: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default saturation range (0 to 1.5)
  const maxSaturation =
    typeof config.custom?.maxSaturation === "number"
      ? config.custom.maxSaturation
      : 1.5;

  const saturation = interpolate(
    frame,
    [startFrame, endFrame],
    [0, maxSaturation],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

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
    filter: `saturate(${saturation})`,
    opacity,
  };
};

/**
 * Tint animation - applies a color overlay that fades in
 */
export const tint: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default tint color (blue)
  //const color = config.custom?.color || "rgba(0, 100, 255, 0.5)";

  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  // Use standard CSS filters instead of CSS variables
  return {
    filter: `sepia(${opacity * 0.5}) hue-rotate(190deg) brightness(1.1)`,
    opacity: 1,
  };
};

/**
 * Glitch animation - creates a digital glitch effect
 */
export const glitch: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  // Intensity of the glitch effect (0-10)
  const intensity =
    typeof config.custom?.intensity === "number" ? config.custom.intensity : 5;

  // Create random offsets based on the current frame
  // Using sine functions with different frequencies to create a pseudo-random pattern
  const xOffset = Math.sin(Number(frame) * 0.5) * (Number(intensity) * 0.5);
  const yOffset = Math.cos(Number(frame) * 0.3) * (Number(intensity) * 0.2);

  // Color channel splitting
  //const redOffset = Math.sin(frame * 0.4) * (intensity * 0.3);
  //const blueOffset = Math.cos(frame * 0.6) * (intensity * 0.3);

  // Opacity that ramps up at the start
  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Create a complex filter for the glitch effect
  const hueRotate = (Number(frame) % 360) * (Number(intensity) * 0.05);

  return {
    opacity,
    transform: `translate(${xOffset}px, ${yOffset}px)`,
    filter: `hue-rotate(${hueRotate}deg) contrast(1.1)`,
    // In a real implementation, you might use multiple layered elements with different offsets
    // to create the RGB splitting effect
  };
};

/**
 * Ripple animation - creates a ripple/wave effect
 */
export const ripple: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  // Amplitude of the wave (0-10)
  const amplitude =
    typeof config.custom?.amplitude === "number" ? config.custom.amplitude : 5;

  // Frequency of the wave
  const frequency =
    typeof config.custom?.frequency === "number"
      ? config.custom.frequency
      : 0.2;

  // Calculate progress through the animation (0-1)
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Opacity that ramps up at the start
  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Create a wave effect using sine functions
  // This is a simplified version - in practice, you'd use a more complex approach
  // with CSS filters or WebGL for a true ripple effect
  const distortionX =
    Math.sin(Number(progress) * Math.PI * Number(frequency) * 10) *
    Number(amplitude);
  const distortionY =
    Math.cos(Number(progress) * Math.PI * Number(frequency) * 10) *
    Number(amplitude);

  return {
    opacity,
    transform: `perspective(500px) rotateX(${distortionY}deg) rotateY(${distortionX}deg)`,
  };
};
