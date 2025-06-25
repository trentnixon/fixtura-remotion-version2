import { interpolate } from "remotion";

import { getImageEasingFunction } from "../../../easing/easingFunctions";
import React from "react";
import { ContainerAnimationFunction } from "../animationTypes";

/**
 * Slide in from left animation for containers
 */
export const slideInLeft: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default distance is 100% of container width
  const distance = config.custom?.distance || "100%";

  // For numeric interpolation, we need to use numbers
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Apply the transform based on the progress and distance type
  const transform =
    typeof distance === "number"
      ? `translateX(${-distance * (1 - progress)}px)`
      : `translateX(calc(-${distance} * ${1 - progress}))`;

  return {
    transform,
    opacity,
  };
};

/**
 * Slide in from right animation for containers
 */
export const slideInRight: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default distance is 100% of container width
  const distance = config.custom?.distance || "100%";

  // For numeric interpolation, we need to use numbers
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Apply the transform based on the progress and distance type
  const transform =
    typeof distance === "number"
      ? `translateX(${distance * (1 - progress)}px)`
      : `translateX(calc(${distance} * ${1 - progress}))`;

  return {
    transform,
    opacity,
  };
};

/**
 * Slide in from top animation for containers
 */
export const slideInTop: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default distance is 100% of container height
  const distance = config.custom?.distance || "100%";

  // For numeric interpolation, we need to use numbers
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Apply the transform based on the progress and distance type
  const transform =
    typeof distance === "number"
      ? `translateY(${-distance * (1 - progress)}px)`
      : `translateY(calc(-${distance} * ${1 - progress}))`;

  return {
    transform,
    opacity,
  };
};

/**
 * Slide in from bottom animation for containers
 */
export const slideInBottom: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default distance is 100% of container height

  const distance = config.custom?.distance || "100%";

  // For numeric interpolation, we need to use numbers
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Apply the transform based on the progress and distance type
  const transform =
    typeof distance === "number"
      ? `translateY(${distance * (1 - progress)}px)`
      : `translateY(calc(${distance} * ${1 - progress}))`;

  return {
    transform,
    opacity,
  };
};

/**
 * Slide out to left animation for containers
 */
export const slideOutLeft: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default distance is 100% of container width
  const distance = config.custom?.distance || "100%";

  // For numeric interpolation, we need to use numbers
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(
    frame,
    [startFrame + (endFrame - startFrame) * 0.5, endFrame],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Apply the transform based on the progress and distance type
  const transform =
    typeof distance === "number"
      ? `translateX(${-distance * progress}px)`
      : `translateX(calc(-${distance} * ${progress}))`;

  return {
    transform,
    opacity,
  };
};

/**
 * Slide out to right animation for containers
 */
export const slideOutRight: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default distance is 100% of container width
  const distance = config.custom?.distance || "100%";

  // For numeric interpolation, we need to use numbers
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(
    frame,
    [startFrame + (endFrame - startFrame) * 0.5, endFrame],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Apply the transform based on the progress and distance type
  const transform =
    typeof distance === "number"
      ? `translateX(${distance * progress}px)`
      : `translateX(calc(${distance} * ${progress}))`;

  return {
    transform,
    opacity,
  };
};

/**
 * Slide out to top animation for containers
 */
export const slideOutTop: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default distance is 100% of container height
  const distance = config.custom?.distance || "100%";

  // For numeric interpolation, we need to use numbers
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(
    frame,
    [startFrame + (endFrame - startFrame) * 0.5, endFrame],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Apply the transform based on the progress and distance type
  const transform =
    typeof distance === "number"
      ? `translateY(${-distance * progress}px)`
      : `translateY(calc(-${distance} * ${progress}))`;

  return {
    transform,
    opacity,
  };
};

/**
 * Slide out to bottom animation for containers
 */
export const slideOutBottom: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default distance is 100% of container height
  const distance = config.custom?.distance || "100%";

  // For numeric interpolation, we need to use numbers
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(
    frame,
    [startFrame + (endFrame - startFrame) * 0.5, endFrame],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Apply the transform based on the progress and distance type
  const transform =
    typeof distance === "number"
      ? `translateY(${distance * progress}px)`
      : `translateY(calc(${distance} * ${progress}))`;

  return {
    transform,
    opacity,
  };
};
