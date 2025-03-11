import { useCurrentFrame, useVideoConfig } from "remotion";
import { AnimationConfig } from "./types";
import {
  fadeIn,
  fadeOut,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
} from "./fadeAnimations";
import { scaleIn, typewriter } from "./scaleAnimations";
import { springFadeIn, springScale } from "./springAnimations";
import { bounce, elastic } from "./specialAnimations";
import React from "react";

/**
 * Hook to get animation styles based on current frame
 */
export const useAnimation = (config: AnimationConfig): React.CSSProperties => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Default style (no animation)
  const defaultStyle: React.CSSProperties = {};

  // If no animation or type is none, return empty styles
  if (!config || config.type === "none") {
    return defaultStyle;
  }

  const delay = config.delay || 0;
  const duration = config.duration || 30;
  const startFrame = delay;
  const endFrame = delay + duration;

  // Apply different animations based on type
  switch (config.type) {
    case "fadeIn":
      return fadeIn(frame, startFrame, endFrame, config);

    case "fadeOut":
      return fadeOut(frame, startFrame, endFrame, config);

    case "fadeInUp":
      return fadeInUp(frame, startFrame, endFrame, config);

    case "fadeInDown":
      return fadeInDown(frame, startFrame, endFrame, config);

    case "fadeInLeft":
      return fadeInLeft(frame, startFrame, endFrame, config);

    case "fadeInRight":
      return fadeInRight(frame, startFrame, endFrame, config);

    case "scaleIn":
      return scaleIn(frame, startFrame, endFrame, config);

    case "typewriter":
      return typewriter(frame, startFrame, endFrame, config);

    case "springFadeIn":
      return springFadeIn(frame, startFrame, endFrame, config, fps);

    case "springScale":
      return springScale(frame, startFrame, endFrame, config, fps);

    case "bounce":
      return bounce(frame, startFrame, endFrame, config);

    case "elastic":
      return elastic(frame, startFrame, endFrame, config);

    default:
      return defaultStyle;
  }
};
