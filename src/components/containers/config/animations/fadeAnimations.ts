import { interpolate } from "remotion";
import { ContainerAnimationFunction, ContainerAnimationConfig } from "../types";
import { getContainerEasingFunction } from "../easingFunctions";
import React from "react";

/**
 * Fade in animation for containers
 */
export const fadeIn: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    opacity,
  };
};

/**
 * Fade out animation for containers
 */
export const fadeOut: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  const opacity = interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    opacity,
  };
};
