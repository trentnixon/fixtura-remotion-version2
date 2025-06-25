import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
import { AnimationConfig } from "./types";
import React from "react";

/**
 * Slide in from left animation
 */
export const slideInLeft = (
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
 * Slide in from right animation
 */
export const slideInRight = (
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
 * Slide in from top animation
 */
export const slideInUp = (
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
 * Slide in from bottom animation
 */
export const slideInDown = (
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
 * Slide out to left animation
 */
export const slideOutLeft = (
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
  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 30;
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
  return {
    opacity,
    transform: `translateX(${translateX}px)`,
  };
};

/**
 * Slide out to right animation
 */
export const slideOutRight = (
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
  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 30;
  const translateX = interpolate(frame, [startFrame, endFrame], [0, distance], {
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
 * Slide out to top animation
 */
export const slideOutUp = (
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
  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 20;
  const translateY = interpolate(frame, [startFrame, endFrame], [0, distance], {
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
 * Slide out to bottom animation
 */
export const slideOutDown = (
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
  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 20;
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
  return {
    opacity,
    transform: `translateY(${translateY}px)`,
  };
};
