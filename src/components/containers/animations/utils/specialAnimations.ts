import { interpolate } from "remotion";

import { getImageEasingFunction } from "../../../easing/easingFunctions";
import React from "react";
import { ContainerAnimationFunction } from "../animationTypes";

/**
 * Reveal from left animation for containers
 * This animation reveals the container by expanding its width from left to right
 */
export const revealLeft: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const scaleX = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    transform: `scaleX(${scaleX})`,
    transformOrigin: "left center",
    opacity: 1,
  };
};

/**
 * Reveal from right animation for containers
 * This animation reveals the container by expanding its width from right to left
 */
export const revealRight: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const scaleX = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    transform: `scaleX(${scaleX})`,
    transformOrigin: "right center",
    opacity: 1,
  };
};

/**
 * Reveal from top animation for containers
 * This animation reveals the container by expanding its height from top to bottom
 */
export const revealTop: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const scaleY = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    transform: `scaleY(${scaleY})`,
    transformOrigin: "center top",
    opacity: 1,
  };
};

/**
 * Reveal from bottom animation for containers
 * This animation reveals the container by expanding its height from bottom to top
 */
export const revealBottom: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const scaleY = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    transform: `scaleY(${scaleY})`,
    transformOrigin: "center bottom",
    opacity: 1,
  };
};

/**
 * Collapse to left animation for containers
 * This animation collapses the container by reducing its width from right to left
 */
export const collapseLeft: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const scaleX = interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    transform: `scaleX(${scaleX})`,
    transformOrigin: "left center",
    opacity: scaleX < 0.1 ? 0 : 1, // Fade out at the very end
  };
};

/**
 * Collapse to right animation for containers
 * This animation collapses the container by reducing its width from left to right
 */
export const collapseRight: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const scaleX = interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    transform: `scaleX(${scaleX})`,
    transformOrigin: "right center",
    opacity: scaleX < 0.1 ? 0 : 1, // Fade out at the very end
  };
};

/**
 * Collapse to top animation for containers
 * This animation collapses the container by reducing its height from bottom to top
 */
export const collapseTop: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const scaleY = interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    transform: `scaleY(${scaleY})`,
    transformOrigin: "center top",
    opacity: scaleY < 0.1 ? 0 : 1, // Fade out at the very end
  };
};

/**
 * Collapse to bottom animation for containers
 * This animation collapses the container by reducing its height from top to bottom
 */
export const collapseBottom: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const scaleY = interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    transform: `scaleY(${scaleY})`,
    transformOrigin: "center bottom",
    opacity: scaleY < 0.1 ? 0 : 1, // Fade out at the very end
  };
};
