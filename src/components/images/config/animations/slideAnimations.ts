import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
import { AnimationFunction } from "../../../easing/types";
import React from "react";

/**
 * Slide in from left animation for images
 */
export const slideInLeft: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 100;

  const translateX = interpolate(
    frame,
    [startFrame, endFrame],
    [-distance, 0],
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
    transform: `translateX(${translateX}px)`,
  };
};

/**
 * Slide in from right animation for images
 */
export const slideInRight: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 100;

  const translateX = interpolate(frame, [startFrame, endFrame], [distance, 0], {
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
    transform: `translateX(${translateX}px)`,
  };
};

/**
 * Slide in from top animation for images
 */
export const slideInTop: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 100;

  const translateY = interpolate(
    frame,
    [startFrame, endFrame],
    [-distance, 0],
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
    transform: `translateY(${translateY}px)`,
  };
};

/**
 * Slide in from bottom animation for images
 */
export const slideInBottom: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 100;

  const translateY = interpolate(frame, [startFrame, endFrame], [distance, 0], {
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
    transform: `translateY(${translateY}px)`,
  };
};

/**
 * Slide out to left animation for images
 */
export const slideOutLeft: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 100;

  // Calculate the duration of the animation
  const duration = endFrame - startFrame;

  // Calculate the midpoint of the animation
  const midFrame = startFrame + duration * 0.7;

  const translateX = interpolate(
    frame,
    [startFrame, endFrame],
    [0, -distance],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Keep opacity at 1 until 70% through the animation, then fade out
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
    transform: `translateX(${translateX}px)`,
    // Ensure the element is visible until opacity reaches 0
    visibility: opacity > 0 ? "visible" : "hidden",
  };
};

/**
 * Slide out to right animation for images
 */
export const slideOutRight: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 100;

  // Calculate the duration of the animation
  const duration = endFrame - startFrame;

  // Calculate the midpoint of the animation
  const midFrame = startFrame + duration * 0.7;

  const translateX = interpolate(frame, [startFrame, endFrame], [0, distance], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  // Keep opacity at 1 until 70% through the animation, then fade out
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
    transform: `translateX(${translateX}px)`,
    // Ensure the element is visible until opacity reaches 0
    visibility: opacity > 0 ? "visible" : "hidden",
  };
};

/**
 * Slide out to top animation for images
 */
export const slideOutTop: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 100;

  // Calculate the duration of the animation
  const duration = endFrame - startFrame;

  // Calculate the midpoint of the animation
  const midFrame = startFrame + duration * 0.7;

  const translateY = interpolate(
    frame,
    [startFrame, endFrame],
    [0, -distance],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Keep opacity at 1 until 70% through the animation, then fade out
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
    transform: `translateY(${translateY}px)`,
    // Ensure the element is visible until opacity reaches 0
    visibility: opacity > 0 ? "visible" : "hidden",
  };
};

/**
 * Slide out to bottom animation for images
 */
export const slideOutBottom: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 100;

  // Calculate the duration of the animation
  const duration = endFrame - startFrame;

  // Calculate the midpoint of the animation
  const midFrame = startFrame + duration * 0.7;

  const translateY = interpolate(frame, [startFrame, endFrame], [0, distance], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  // Keep opacity at 1 until 70% through the animation, then fade out
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
    transform: `translateY(${translateY}px)`,
    // Ensure the element is visible until opacity reaches 0
    visibility: opacity > 0 ? "visible" : "hidden",
  };
};
