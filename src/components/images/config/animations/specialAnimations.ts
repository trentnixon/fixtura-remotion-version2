import { interpolate } from "remotion";
import { getImageEasingFunction } from "../../../easing/easingFunctions";
import { AnimationFunction } from "../../../easing/types";
import React from "react";

/**
 * Ken Burns effect for images
 */
export const kenBurns: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  // Scale range (default: 1.0 to 1.1)
  const startScale =
    typeof config.custom?.startScale === "number"
      ? config.custom.startScale
      : 1.0;
  const endScale =
    typeof config.custom?.endScale === "number" ? config.custom.endScale : 1.1;

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

  // Optional pan effect
  const panX = typeof config.custom?.panX === "number" ? config.custom.panX : 0;
  const panY = typeof config.custom?.panY === "number" ? config.custom.panY : 0;

  const translateX = interpolate(frame, [startFrame, endFrame], [0, panX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const translateY = interpolate(frame, [startFrame, endFrame], [0, panY], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const origin =
    typeof config.custom?.origin === "string"
      ? config.custom.origin
      : "center center";

  return {
    opacity,
    transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
    transformOrigin: origin,
  };
};

/**
 * Pulse animation for images
 */
export const pulse: AnimationFunction = (
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

  // Calculate the total duration in frames
  //const totalDuration = endFrame - startFrame;

  // Get custom parameters or use defaults
  const pulseCount =
    typeof config.custom?.pulseCount === "number"
      ? config.custom.pulseCount
      : 2; // How many pulse cycles to complete
  const minScale =
    typeof config.custom?.minScale === "number" ? config.custom.minScale : 1.0;
  const maxScale =
    typeof config.custom?.maxScale === "number" ? config.custom.maxScale : 1.1;

  // Calculate the current pulse cycle (0 to pulseCount)
  const currentCycle = progress * pulseCount;

  // Calculate the position within the current pulse cycle (0 to 1)
  const cycleProgress = currentCycle % 1;

  // Use a sine wave to create a smooth pulse effect
  const pulseProgress = Math.sin(cycleProgress * Math.PI);

  // Interpolate the scale based on the pulse progress
  const scale = minScale + (maxScale - minScale) * pulseProgress;

  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const origin =
    typeof config.custom?.origin === "string"
      ? config.custom.origin
      : "center center";

  return {
    opacity,
    transform: `scale(${scale})`,
    transformOrigin: origin,
  };
};

/**
 * Rotate animation for images
 */
export const rotate: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const maxRotation =
    typeof config.custom?.maxRotation === "number"
      ? config.custom.maxRotation
      : 360;

  const rotation = interpolate(
    frame,
    [startFrame, endFrame],
    [0, maxRotation],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return {
    opacity,
    transform: `rotate(${rotation}deg)`,
  };
};

/**
 * Rotate in animation for images
 */
export const rotateIn: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const initialRotation =
    typeof config.custom?.initialRotation === "number"
      ? config.custom.initialRotation
      : -90;

  const rotation = interpolate(
    frame,
    [startFrame, endFrame],
    [initialRotation, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    opacity,
    transform: `rotate(${rotation}deg)`,
  };
};

/**
 * Rotate out animation for images
 */
export const rotateOut: AnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
): React.CSSProperties => {
  const easingFn = getImageEasingFunction(config.easing);

  const finalRotation =
    typeof config.custom?.finalRotation === "number"
      ? config.custom.finalRotation
      : 90;

  const rotation = interpolate(
    frame,
    [startFrame, endFrame],
    [0, finalRotation],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFn,
    },
  );

  const opacity = interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  return {
    opacity,
    transform: `rotate(${rotation}deg)`,
  };
};
