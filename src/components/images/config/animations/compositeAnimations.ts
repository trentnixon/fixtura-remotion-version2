import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
import { AnimationFunction } from "../../../easing/types";
import React from "react";

/**
 * PopAndSpin animation - pops in with scale and then spins
 */
export const popAndSpin: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
): React.CSSProperties => {
  // Calculate the midpoint of the animation for transitioning between effects
  const midPoint = startFrame + (endFrame - startFrame) * 0.5;

  // First half: pop in with elastic effect
  if (frame < midPoint) {
    const scale = interpolate(frame, [startFrame, midPoint], [0.5, 1.2], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: getImageEasingFunction({ type: "inOut", base: "ease" }),
    });

    const opacity = interpolate(
      frame,
      [startFrame, startFrame + (midPoint - startFrame) * 0.3],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    return {
      transform: `scale(${scale})`,
      opacity,
    };
  }
  // Second half: spin and settle
  else {
    const scale = interpolate(frame, [midPoint, endFrame], [1.2, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: getImageEasingFunction({ type: "inOut", base: "ease" }),
    });

    const rotation = interpolate(frame, [midPoint, endFrame], [0, 360], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: getImageEasingFunction({ type: "inOut", base: "ease" }),
    });

    return {
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      opacity: 1,
    };
  }
};

/**
 * BounceAndFade animation - bounces in and then fades to normal opacity
 */
export const bounceAndFade: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  // Calculate the midpoint of the animation for transitioning between effects
  const midPoint = startFrame + (endFrame - startFrame) * 0.6;

  // First part: bounce in
  const translateY = interpolate(frame, [startFrame, midPoint], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: getImageEasingFunction({ type: "inOut", base: "ease" }),
  });

  // Second part: fade from high opacity to normal
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (midPoint - startFrame) * 0.5, endFrame],
    [0, 1.2, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: getImageEasingFunction({ type: "inOut", base: "ease" }),
    },
  );

  // Optional scale effect
  const scale = config.custom?.scale
    ? interpolate(frame, [startFrame, midPoint, endFrame], [0.8, 1.1, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: getImageEasingFunction({ type: "inOut", base: "ease" }),
      })
    : 1;

  return {
    transform: `translateY(${translateY}%) scale(${scale})`,
    opacity: Math.min(opacity, 1), // Ensure opacity doesn't exceed 1
  };
};
