import { interpolate } from "remotion";
import { getEasingFunction } from "./easingFunctions";
import { AnimationConfig } from "./types";
import React from "react";

/**
 * Scale in animation
 */
export const scaleIn = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: AnimationConfig,
): React.CSSProperties => {
  const easingFn = getEasingFunction(config.easing);

  const initialScale = config.custom?.initialScale || 0.8;

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
 * Typewriter effect animation
 */
export const typewriter = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: AnimationConfig,
): React.CSSProperties => {
  const easingFn = getEasingFunction(config.easing);

  const textLength = config.custom?.textLength || 1;
  const visibleChars = interpolate(
    frame,
    [startFrame, endFrame],
    [0, textLength],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  return {
    clipPath: `inset(0 ${100 - (visibleChars / textLength) * 100}% 0 0)`,
    display: "inline-block",
  };
};
