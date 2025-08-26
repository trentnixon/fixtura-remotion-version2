import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
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
 * Scale out on Y axis animation
 */
export const scaleOutY = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: AnimationConfig,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const initialScaleY =
    typeof config.custom?.initialScaleY === "number"
      ? (config.custom.initialScaleY as number)
      : 1;

  const finalScaleY =
    typeof config.custom?.finalScaleY === "number"
      ? (config.custom.finalScaleY as number)
      : 0;

  const scaleY = interpolate(
    frame,
    [startFrame, endFrame],
    [initialScaleY, finalScaleY],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  const opacity = interpolate(frame, [startFrame, endFrame], [1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    opacity,
    transform: `scaleY(${scaleY})`,
    transformOrigin: "center",
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
  const easingFn = getImageEasingFunction(config.easing);

  const textLength =
    typeof config.custom?.textLength === "number"
      ? config.custom.textLength
      : 1;
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
    clipPath: `inset(0 ${100 - (textLength ? (visibleChars / textLength) * 100 : 100)}% 0 0)`,
    display: "inline-block",
  };
};
