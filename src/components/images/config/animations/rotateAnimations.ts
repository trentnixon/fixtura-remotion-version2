import { interpolate } from "remotion";
import { getImageEasingFunction } from "../easingFunctions";
import { AnimationFunction } from "../types";
import React from "react";

/**
 * Rotate animation for images
 */
export const rotate: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default rotation is 360 degrees (full rotation)
  const degrees = config.custom?.degrees || 360;

  // Direction of rotation (1 for clockwise, -1 for counter-clockwise)
  const direction = config.custom?.direction === "counterclockwise" ? -1 : 1;

  const rotation = interpolate(
    frame,
    [startFrame, endFrame],
    [0, degrees * direction],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  const opacity = interpolate(frame, [startFrame, startFrame + 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return {
    opacity,
    transform: `rotate(${rotation}deg)`,
    transformOrigin: config.custom?.origin || "center center",
  };
};

/**
 * Rotate in animation for images
 */
export const rotateIn: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default rotation is 90 degrees
  const degrees = config.custom?.degrees || 90;

  // Direction of rotation (1 for clockwise, -1 for counter-clockwise)
  const direction = config.custom?.direction === "counterclockwise" ? -1 : 1;

  const rotation = interpolate(
    frame,
    [startFrame, endFrame],
    [degrees * direction, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    opacity,
    transform: `rotate(${rotation}deg)`,
    transformOrigin: config.custom?.origin || "center center",
  };
};

/**
 * Rotate out animation for images
 */
export const rotateOut: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const degrees = config.custom?.degrees || 90;

  // Direction of rotation (1 for clockwise, -1 for counter-clockwise)
  const direction = config.custom?.direction === "counterclockwise" ? -1 : 1;

  const rotation = interpolate(
    frame,
    [startFrame, endFrame],
    [0, degrees * direction],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Keep opacity at 1 until 70% through the animation, then fade out
  const midFrame = startFrame + (endFrame - startFrame) * 0.7;

  const opacity = interpolate(
    frame,
    [startFrame, midFrame, endFrame],
    [1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  return {
    opacity,
    transform: `rotate(${rotation}deg)`,
    transformOrigin: config.custom?.origin || "center center",
  };
};
