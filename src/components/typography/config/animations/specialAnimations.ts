import { interpolate, Easing } from "remotion";
// import { AnimationConfig } from "./types"; // Removed unused import
import React from "react";

/**
 * Bounce animation
 */
export const bounce = (
  frame: number,
  startFrame: number,
  endFrame: number,
): React.CSSProperties => {
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bounce,
  });

  const translateY = interpolate(progress, [0, 1], [50, 0]);

  return {
    transform: `translateY(${translateY}px)`,
    opacity: progress < 0.1 ? interpolate(progress, [0, 0.1], [0, 1]) : 1,
  };
};

/**
 * Elastic animation
 */
export const elastic = (
  frame: number,
  startFrame: number,
  endFrame: number,
): React.CSSProperties => {
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.elastic(1),
  });

  const scale = progress;

  return {
    transform: `scale(${scale})`,
    opacity: progress < 0.1 ? interpolate(progress, [0, 0.1], [0, 1]) : 1,
  };
};
