import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
import { AnimationFunction } from "../../../easing/types";
import React from "react";

/**
 * FlipX animation - 3D flip around X axis
 */
export const flipX: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default rotation range (-90 to 0 degrees)
  const startRotation =
    typeof config.custom?.startRotation === "number"
      ? config.custom.startRotation
      : -90;
  const endRotation =
    typeof config.custom?.endRotation === "number"
      ? config.custom.endRotation
      : 0;

  const rotation = interpolate(
    frame,
    [startFrame, endFrame],
    [startRotation, endRotation],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Fade in as the flip progresses
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    transform: `perspective(1000px) rotateX(${rotation}deg)`,
    transformOrigin:
      typeof config.custom?.origin === "string"
        ? config.custom.origin
        : "center bottom",
    opacity,
    backfaceVisibility: "hidden",
  };
};

/**
 * FlipY animation - 3D flip around Y axis
 */
export const flipY: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Default rotation range (-90 to 0 degrees)
  const startRotation =
    typeof config.custom?.startRotation === "number"
      ? config.custom.startRotation
      : -90;
  const endRotation =
    typeof config.custom?.endRotation === "number"
      ? config.custom.endRotation
      : 0;

  const rotation = interpolate(
    frame,
    [startFrame, endFrame],
    [startRotation, endRotation],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Fade in as the flip progresses
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    transform: `perspective(1000px) rotateY(${rotation}deg)`,
    transformOrigin:
      typeof config.custom?.origin === "string"
        ? config.custom.origin
        : "center left",
    opacity,
    backfaceVisibility: "hidden",
  };
};

/**
 * Swing animation - pendulum-like swinging motion
 */
export const swing: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  // Calculate progress (0 to 1)
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Amplitude of the swing (degrees)
  const amplitude =
    typeof config.custom?.amplitude === "number" ? config.custom.amplitude : 30;

  // Create a damped oscillation
  const swingAngle =
    Math.sin(progress * Math.PI * 2) * amplitude * Math.exp(-progress * 3);

  // Fade in at the start
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.2],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    transform: `rotate(${swingAngle}deg)`,
    transformOrigin:
      typeof config.custom?.origin === "string"
        ? config.custom.origin
        : "top center",
    opacity,
  };
};

/**
 * ZoomPerspective animation - combines zoom with perspective change
 */
export const zoomPerspective: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Scale range (0.5 to 1)
  const startScale =
    typeof config.custom?.startScale === "number"
      ? config.custom.startScale
      : 0.5;
  const endScale =
    typeof config.custom?.endScale === "number" ? config.custom.endScale : 1;

  const scale = interpolate(
    frame,
    [startFrame, endFrame],
    [startScale, endScale],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Perspective range (500 to 1000)
  const startPerspective =
    typeof config.custom?.startPerspective === "number"
      ? config.custom.startPerspective
      : 500;
  const endPerspective =
    typeof config.custom?.endPerspective === "number"
      ? config.custom.endPerspective
      : 1000;

  const perspective = interpolate(
    frame,
    [startFrame, endFrame],
    [startPerspective, endPerspective],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Z translation range (depends on scale)
  const zTranslation = interpolate(
    frame,
    [startFrame, endFrame],
    [(1 - startScale) * -100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Fade in as the zoom progresses
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.3],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    transform: `perspective(${perspective}px) translateZ(${zTranslation}px) scale(${scale})`,
    opacity,
  };
};

/**
 * DepthOfField animation - simulates camera depth of field changes
 */
export const depthOfField: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Blur range (10 to 0)
  const startBlur =
    typeof config.custom?.startBlur === "number" ? config.custom.startBlur : 10;
  const endBlur =
    typeof config.custom?.endBlur === "number" ? config.custom.endBlur : 0;

  const blurAmount = interpolate(
    frame,
    [startFrame, endFrame],
    [startBlur, endBlur],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Scale range (0.9 to 1)
  const startScale =
    typeof config.custom?.startScale === "number"
      ? config.custom.startScale
      : 0.9;
  const endScale =
    typeof config.custom?.endScale === "number" ? config.custom.endScale : 1;

  const scale = interpolate(
    frame,
    [startFrame, endFrame],
    [startScale, endScale],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  // Fade in as the focus sharpens
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + (endFrame - startFrame) * 0.3],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    filter: `blur(${blurAmount}px)`,
    transform: `scale(${scale})`,
    opacity,
  };
};
