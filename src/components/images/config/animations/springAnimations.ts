import { interpolate, spring } from "remotion";
import { AnimationFunction } from "../../../easing/types";
import React from "react";

/**
 * Spring scale animation for images
 */
export const springScale: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
  fps = 30,
): React.CSSProperties => {
  const springCfg = config.springConfig || {
    mass: 1,
    damping: 10,
    stiffness: 100,
  };

  const initialScale =
    typeof config.custom?.initialScale === "number"
      ? config.custom.initialScale
      : 0.8;

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
    opacity: springValue,
    transform: `scale(${scale})`,
  };
};
