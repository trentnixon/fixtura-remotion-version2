import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
import { AnimationFunction } from "../../../easing/types";
import React from "react";

/**
 * Focus in animation - transitions from blurry to sharp
 */
export const focusIn: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default blur range (10px to 0px)
  const maxBlur =
    typeof config.custom?.maxBlur === "number" ? config.custom.maxBlur : 10;

  const blurAmount = interpolate(frame, [startFrame, endFrame], [maxBlur, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

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
    filter: `blur(${blurAmount}px)`,
    opacity,
  };
};

/**
 * Focus out animation - transitions from sharp to blurry
 */
export const focusOut: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default blur range (0px to 10px)
  const maxBlur =
    typeof config.custom?.maxBlur === "number" ? config.custom.maxBlur : 10;

  const blurAmount = interpolate(frame, [startFrame, endFrame], [0, maxBlur], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return {
    filter: `blur(${blurAmount}px)`,
    opacity,
  };
};

/**
 * Exposure in animation - simulates camera exposure adjustment from overexposed to normal
 */
export const exposureIn: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default brightness range (2 to 1)
  const maxBrightness =
    typeof config.custom?.maxBrightness === "number"
      ? config.custom.maxBrightness
      : 2;

  const brightness = interpolate(
    frame,
    [startFrame, endFrame],
    [maxBrightness, 1],
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
    filter: `brightness(${brightness})`,
    opacity,
  };
};

/**
 * Exposure out animation - simulates camera exposure adjustment from normal to overexposed
 */
export const exposureOut: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default brightness range (1 to 2)
  const maxBrightness =
    typeof config.custom?.maxBrightness === "number"
      ? config.custom.maxBrightness
      : 2;

  const brightness = interpolate(
    frame,
    [startFrame, endFrame],
    [1, maxBrightness],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  const opacity = interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return {
    filter: `brightness(${brightness})`,
    opacity,
  };
};
