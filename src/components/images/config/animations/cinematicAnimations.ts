import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
import { AnimationFunction } from "../../../easing/types";
import React from "react";

/**
 * Wipe left animation - reveals the image with a left-to-right wipe
 */
export const wipeLeft: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const progress = interpolate(frame, [startFrame, endFrame], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    clipPath: `inset(0 ${100 - progress}% 0 0)`,
    opacity: 1,
  };
};

/**
 * Wipe right animation - reveals the image with a right-to-left wipe
 */
export const wipeRight: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const progress = interpolate(frame, [startFrame, endFrame], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    clipPath: `inset(0 0 0 ${100 - progress}%)`,
    opacity: 1,
  };
};

/**
 * Wipe up animation - reveals the image with a bottom-to-top wipe
 */
export const wipeUp: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const progress = interpolate(frame, [startFrame, endFrame], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    clipPath: `inset(${100 - progress}% 0 0 0)`,
    opacity: 1,
  };
};

/**
 * Wipe down animation - reveals the image with a top-to-bottom wipe
 */
export const wipeDown: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const progress = interpolate(frame, [startFrame, endFrame], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    clipPath: `inset(0 0 ${100 - progress}% 0)`,
    opacity: 1,
  };
};

/**
 * Split horizontal animation - image splits horizontally and reveals from center
 */
export const splitHorizontal: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const progress = interpolate(frame, [startFrame, endFrame], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    clipPath: `inset(${progress}% 0 ${progress}% 0)`,
    opacity: 1,
  };
};

/**
 * Split vertical animation - image splits vertically and reveals from center
 */
export const splitVertical: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const progress = interpolate(frame, [startFrame, endFrame], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    clipPath: `inset(0 ${progress}% 0 ${progress}%)`,
    opacity: 1,
  };
};
