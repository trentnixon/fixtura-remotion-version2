import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
import { AnimationFunction } from "../../../easing/types";
import React from "react";

/**
 * Zoom in animation for images
 */
export const zoomIn: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const initialScale =
    typeof config.custom?.initialScale === "number"
      ? config.custom.initialScale
      : 0.8;

  const scale = interpolate(frame, [startFrame, endFrame], [initialScale, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    opacity,
    transform: `scale(${scale})`,
  };
};

/**
 * Zoom out animation for images
 */
export const zoomOut: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const initialScale =
    typeof config.custom?.initialScale === "number"
      ? config.custom.initialScale
      : 1.2;

  const scale = interpolate(frame, [startFrame, endFrame], [initialScale, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    opacity,
    transform: `scale(${scale})`,
  };
};
