import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
import { AnimationFunction } from "../../../easing/types";
import React from "react";

/**
 * LowerThirdIn animation - slides in from bottom with slight bounce, common in news broadcasts
 */
export const lowerThirdIn: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  // Use bounce easing by default for this animation
  const easingFn = getImageEasingFunction(
    config.easing || { type: "inOut", base: "ease" },
  );

  const translateY = interpolate(frame, [startFrame, endFrame], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  // Optional scale effect
  const scale = config.custom?.scale
    ? interpolate(frame, [startFrame, endFrame], [0.9, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easingFn,
      })
    : 1;

  return {
    transform: `translateY(${translateY}%) scale(${scale})`,
    opacity: 1,
    transformOrigin: "bottom center",
  };
};

/**
 * LowerThirdOut animation - slides out to bottom
 */
export const lowerThirdOut: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(
    config.easing || { type: "inOut", base: "ease" },
  );

  const translateY = interpolate(frame, [startFrame, endFrame], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  // Optional scale effect
  const scale = config.custom?.scale
    ? interpolate(frame, [startFrame, endFrame], [1, 0.9], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easingFn,
      })
    : 1;

  return {
    transform: `translateY(${translateY}%) scale(${scale})`,
    opacity: interpolate(frame, [startFrame, endFrame], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    transformOrigin: "bottom center",
  };
};

/**
 * ScoreboardIn animation - slides in with emphasis, like sports scoreboards
 */
export const scoreboardIn: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  // Use elastic easing by default for this animation
  const easingFn = getImageEasingFunction(
    config.easing || { type: "inOut", base: "ease" },
  );

  // Direction of the animation (left, right, top, bottom)
  const direction = config.custom?.direction || "left";

  let transform = "";

  switch (direction) {
    case "right": {
      const rightTranslate = interpolate(
        frame,
        [startFrame, endFrame],
        [100, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easingFn,
        },
      );
      transform = `translateX(${rightTranslate}%)`;
      break;
    }
    case "top": {
      const topTranslate = interpolate(
        frame,
        [startFrame, endFrame],
        [-100, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easingFn,
        },
      );
      transform = `translateY(${topTranslate}%)`;
      break;
    }
    case "bottom": {
      const bottomTranslate = interpolate(
        frame,
        [startFrame, endFrame],
        [100, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easingFn,
        },
      );
      transform = `translateY(${bottomTranslate}%)`;
      break;
    }
    case "left":
    default: {
      const leftTranslate = interpolate(
        frame,
        [startFrame, endFrame],
        [-100, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easingFn,
        },
      );
      transform = `translateX(${leftTranslate}%)`;
      break;
    }
  }

  return {
    transform,
    opacity: 1,
  };
};

/**
 * StatReveal animation - reveals with a quick emphasis, like player stats
 */
export const statReveal: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  // Use elastic easing by default for this animation
  const easingFn = getImageEasingFunction(
    config.easing || { type: "inOut", base: "ease" },
  );

  // Calculate the midpoint of the animation
  const midpoint = startFrame + (endFrame - startFrame) * 0.7;

  // Scale up slightly past 1, then back to 1 for emphasis
  const scale = interpolate(
    frame,
    [startFrame, midpoint, endFrame],
    [0.5, 1.05, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Optional rotation for more emphasis
  const rotation = config.custom?.rotate
    ? interpolate(frame, [startFrame, midpoint], [-5, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easingFn,
      })
    : 0;

  return {
    transform: `scale(${scale}) rotate(${rotation}deg)`,
    opacity: interpolate(
      frame,
      [startFrame, startFrame + (endFrame - startFrame) * 0.3],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    ),
    transformOrigin:
      typeof config.custom?.origin === "string"
        ? config.custom.origin
        : "center center",
  };
};
