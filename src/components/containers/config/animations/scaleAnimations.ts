import { interpolate } from "remotion";
import { ContainerAnimationFunction } from "../types";
import { getContainerEasingFunction } from "../easingFunctions";
import React from "react";

/**
 * Scale in animation for containers
 */
export const scaleIn: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Default start scale is 0
  const startScale =
    config.custom?.startScale !== undefined ? config.custom.startScale : 0;

  const scale = interpolate(frame, [startFrame, endFrame], [startScale, 1], {
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

  return {
    transform: `scale(${scale})`,
    opacity,
  };
};

/**
 * Scale out animation for containers
 */
export const scaleOut: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Default end scale is 0
  const endScale =
    config.custom?.endScale !== undefined ? config.custom.endScale : 0;

  const scale = interpolate(frame, [startFrame, endFrame], [1, endScale], {
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

  return {
    transform: `scale(${scale})`,
    opacity,
  };
};

/**
 * Scale in X animation for containers
 */
export const scaleInX: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Default start scale is 0
  const startScale =
    config.custom?.startScale !== undefined ? config.custom.startScale : 0;

  const scaleX = interpolate(frame, [startFrame, endFrame], [startScale, 1], {
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

  return {
    transform: `scaleX(${scaleX})`,
    opacity,
  };
};

/**
 * Scale in Y animation for containers
 */
export const scaleInY: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Default start scale is 0
  const startScale =
    config.custom?.startScale !== undefined ? config.custom.startScale : 0;

  const scaleY = interpolate(frame, [startFrame, endFrame], [startScale, 1], {
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

  return {
    transform: `scaleY(${scaleY})`,
    opacity,
  };
};

/**
 * Scale out X animation for containers
 */
export const scaleOutX: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Default end scale is 0
  const endScale =
    config.custom?.endScale !== undefined ? config.custom.endScale : 0;

  const scaleX = interpolate(frame, [startFrame, endFrame], [1, endScale], {
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

  return {
    transform: `scaleX(${scaleX})`,
    opacity,
  };
};

/**
 * Scale out Y animation for containers
 */
export const scaleOutY: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getContainerEasingFunction(config.easing);

  // Default end scale is 0
  const endScale =
    config.custom?.endScale !== undefined ? config.custom.endScale : 0;

  const scaleY = interpolate(frame, [startFrame, endFrame], [1, endScale], {
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

  return {
    transform: `scaleY(${scaleY})`,
    opacity,
  };
};
