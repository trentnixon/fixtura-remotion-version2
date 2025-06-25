import { interpolate, spring } from "remotion";
import { AnimationConfig } from "./types";
import React from "react";

/**
 * Spring-based fade in animation
 */
export const springFadeIn = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: AnimationConfig,
  fps: number,
): React.CSSProperties => {
  const springCfg = config.springConfig || {
    mass: 1,
    damping: 10,
    stiffness: 100,
  };

  const springValue = spring({
    frame: frame - startFrame,
    fps,
    config: {
      mass: springCfg.mass || 1,
      damping: springCfg.damping || 10,
      stiffness: springCfg.stiffness || 100,
      overshootClamping: springCfg.overshootClamping,
    },
    durationInFrames: config.duration || 30,
  });

  return {
    opacity: springValue,
  };
};

/**
 * Spring-based scale animation
 */
export const springScale = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: AnimationConfig,
  fps: number,
): React.CSSProperties => {
  const springCfg = config.springConfig || {
    mass: 1,
    damping: 10,
    stiffness: 100,
  };

  // Type guard for initialScale
  const initialScale =
    typeof config.custom?.initialScale === "number"
      ? config.custom.initialScale
      : 0;

  const springValue = spring({
    frame: frame - startFrame,
    fps,
    config: {
      mass: springCfg.mass || 1,
      damping: springCfg.damping || 10,
      stiffness: springCfg.stiffness || 100,
      overshootClamping: springCfg.overshootClamping,
    },
    durationInFrames: config.duration || 30,
  });

  const scale = interpolate(springValue, [0, 1], [initialScale, 1]);

  return {
    transform: `scale(${scale})`,
    opacity: springValue,
  };
};
