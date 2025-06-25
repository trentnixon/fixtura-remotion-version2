import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
import { AnimationConfig } from "./types";
import React from "react";

/**
 * Fade in animation
 */
export const fadeIn = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: AnimationConfig,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

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
 * Fade in up animation
 */
export const fadeInUp = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: AnimationConfig,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  // Distance can be customized
  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 20;

  const translateY = interpolate(frame, [startFrame, endFrame], [distance, 0], {
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
 * Fade in down animation
 */
export const fadeInDown = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: AnimationConfig,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  // Distance can be customized
  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 20;

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

  return {
    opacity,
    transform: `translateY(${translateY}px)`,
  };
};

/**
 * Fade in from right to left animation
 */
export const fadeInLeft = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: AnimationConfig,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  // Distance can be customized
  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 30;

  const translateX = interpolate(frame, [startFrame, endFrame], [distance, 0], {
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
 * Fade in from left to right animation
 */
export const fadeInRight = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: AnimationConfig,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  // Distance can be customized
  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 30;

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

  return {
    opacity,
    transform: `translateX(${translateX}px)`,
  };
};

/**
 * Fade out animation
 */
export const fadeOut = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: AnimationConfig,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const opacity = interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    opacity,
  };
};
