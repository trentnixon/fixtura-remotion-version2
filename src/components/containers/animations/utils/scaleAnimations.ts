import { interpolate } from "remotion";

import { getImageEasingFunction } from "../../../easing/easingFunctions";
import React from "react";
import { ContainerAnimationFunction } from "../animationTypes";

/**
 * Scale in animation for containers
 */
export const scaleIn: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default start scale is 0
  const startScale =
    typeof config.custom?.startScale === "number"
      ? config.custom.startScale
      : 0;

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
  const easingFn = getImageEasingFunction(config.easing);

  // Default end scale is 0
  const endScale =
    typeof config.custom?.endScale === "number" ? config.custom.endScale : 0;

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
  const easingFn = getImageEasingFunction(config.easing);

  // Default start scale is 0
  const startScale =
    typeof config.custom?.startScale === "number"
      ? config.custom.startScale
      : 0;

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
  const easingFn = getImageEasingFunction(config.easing);

  // Default start scale is 0
  const startScale =
    typeof config.custom?.startScale === "number"
      ? config.custom.startScale
      : 0;

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
  const easingFn = getImageEasingFunction(config.easing);

  // Default end scale is 0
  const endScale =
    typeof config.custom?.endScale === "number" ? config.custom.endScale : 0;

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
  const easingFn = getImageEasingFunction(config.easing);

  // Default end scale is 0
  const endScale =
    typeof config.custom?.endScale === "number" ? config.custom.endScale : 0;

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
