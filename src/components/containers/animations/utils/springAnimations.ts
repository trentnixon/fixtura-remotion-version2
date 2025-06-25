import { interpolate, spring } from "remotion";

import React from "react";
import { ContainerAnimationFunction } from "../animationTypes";

/**
 * Spring in animation for containers
 * This animation uses spring physics for a more natural entrance
 */
export const springIn: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
  fps = 30,
): React.CSSProperties => {
  // Use provided spring config or default values
  const springConfig = config.springConfig || {
    mass: 1,
    damping: 10,
    stiffness: 100,
    overshootClamping: false,
  };

  // Get custom properties
  const startScale =
    typeof config.custom?.startScale === "number"
      ? config.custom.startScale
      : 0.5;
  const from = typeof config.custom?.from === "number" ? config.custom.from : 0;
  const to = typeof config.custom?.to === "number" ? config.custom.to : 1;
  const transformProperty =
    typeof config.custom?.transformProperty === "string"
      ? config.custom.transformProperty
      : "scale";
  const transformOrigin =
    typeof config.custom?.transformOrigin === "string"
      ? config.custom.transformOrigin
      : "center";
  const includeOpacity =
    typeof config.custom?.includeOpacity === "boolean"
      ? config.custom.includeOpacity
      : true;

  // Precompute all possible custom values for use in the switch
  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 100;
  const startAngle =
    typeof config.custom?.startAngle === "number"
      ? config.custom.startAngle
      : -45;

  // Calculate the spring value
  const springValue = spring({
    frame: frame - startFrame,
    fps,
    from,
    to,
    config: {
      mass: typeof springConfig.mass === "number" ? springConfig.mass : 1,
      damping:
        typeof springConfig.damping === "number" ? springConfig.damping : 10,
      stiffness:
        typeof springConfig.stiffness === "number"
          ? springConfig.stiffness
          : 100,
      overshootClamping:
        typeof springConfig.overshootClamping === "boolean"
          ? springConfig.overshootClamping
          : false,
    },
    durationInFrames:
      typeof config.duration === "number" ? config.duration : 30,
    durationRestThreshold:
      typeof config.custom?.durationRestThreshold === "number"
        ? config.custom.durationRestThreshold
        : undefined,
  });

  // Determine the transform based on the transform property
  let transform = "";
  let scale, scaleX, scaleY, translateX, translateY, rotate, defaultScale;
  switch (transformProperty) {
    case "scale":
      scale = interpolate(springValue, [from, to], [startScale, 1]);
      transform = `scale(${scale})`;
      break;
    case "scaleX":
      scaleX = interpolate(springValue, [from, to], [startScale, 1]);
      transform = `scaleX(${scaleX})`;
      break;
    case "scaleY":
      scaleY = interpolate(springValue, [from, to], [startScale, 1]);
      transform = `scaleY(${scaleY})`;
      break;
    case "translateX":
      translateX = interpolate(springValue, [from, to], [distance, 0]);
      transform = `translateX(${translateX}px)`;
      break;
    case "translateY":
      translateY = interpolate(springValue, [from, to], [distance, 0]);
      transform = `translateY(${translateY}px)`;
      break;
    case "rotate":
      rotate = interpolate(springValue, [from, to], [startAngle, 0]);
      transform = `rotate(${rotate}deg)`;
      break;
    default:
      defaultScale = interpolate(springValue, [from, to], [startScale, 1]);
      transform = `scale(${defaultScale})`;
  }

  // Create the style object
  const style: React.CSSProperties = {
    transform,
    transformOrigin,
  };

  // Add opacity if needed
  if (includeOpacity) {
    style.opacity = springValue;
  }

  return style;
};

/**
 * Spring out animation for containers
 * This animation uses spring physics for a more natural exit
 */
export const springOut: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
  fps = 30,
): React.CSSProperties => {
  // Use provided spring config or default values
  const springConfig = config.springConfig || {
    mass: 1,
    damping: 10,
    stiffness: 100,
    overshootClamping: false,
  };

  // Get custom properties
  const endScale =
    typeof config.custom?.endScale === "number" ? config.custom.endScale : 0.5;
  const from = typeof config.custom?.from === "number" ? config.custom.from : 0;
  const to = typeof config.custom?.to === "number" ? config.custom.to : 1;
  const transformProperty =
    typeof config.custom?.transformProperty === "string"
      ? config.custom.transformProperty
      : "scale";
  const transformOrigin =
    typeof config.custom?.transformOrigin === "string"
      ? config.custom.transformOrigin
      : "center";
  const includeOpacity =
    typeof config.custom?.includeOpacity === "boolean"
      ? config.custom.includeOpacity
      : true;
  const reverse =
    typeof config.custom?.reverse === "boolean" ? config.custom.reverse : false;

  // Calculate the spring value
  const springValue = spring({
    frame: frame - startFrame,
    fps,
    from: reverse ? to : from,
    to: reverse ? from : to,
    config: {
      mass: springConfig.mass || 1,
      damping: springConfig.damping || 10,
      stiffness: springConfig.stiffness || 100,
      overshootClamping: springConfig.overshootClamping,
    },
    durationInFrames: config.duration || 30,
    durationRestThreshold:
      typeof config.custom?.durationRestThreshold === "number"
        ? config.custom.durationRestThreshold
        : undefined,
  });

  // For exit animations, we often want to reverse the spring value
  const exitSpringValue = reverse ? springValue : 1 - springValue;

  // Precompute all possible custom values for use in the switch
  const distance =
    typeof config.custom?.distance === "number" ? config.custom.distance : 100;

  // Determine the transform based on the transform property
  let transform = "";
  let scale, scaleX, scaleY, translateX, translateY, rotate, defaultScale;
  switch (transformProperty) {
    case "scale":
      scale = interpolate(exitSpringValue, [0, 1], [1, endScale]);
      transform = `scale(${scale})`;
      break;
    case "scaleX":
      scaleX = interpolate(exitSpringValue, [0, 1], [1, endScale]);
      transform = `scaleX(${scaleX})`;
      break;
    case "scaleY":
      scaleY = interpolate(exitSpringValue, [0, 1], [1, endScale]);
      transform = `scaleY(${scaleY})`;
      break;
    case "translateX":
      translateX = interpolate(exitSpringValue, [0, 1], [0, distance]);
      transform = `translateX(${translateX}px)`;
      break;
    case "translateY":
      translateY = interpolate(exitSpringValue, [0, 1], [0, distance]);
      transform = `translateY(${translateY}px)`;
      break;
    case "rotate":
      rotate = interpolate(
        exitSpringValue,
        [0, 1],
        [
          0,
          typeof config.custom?.endAngle === "number"
            ? config.custom.endAngle
            : 45,
        ],
      );
      transform = `rotate(${rotate}deg)`;
      break;
    default:
      defaultScale = interpolate(exitSpringValue, [0, 1], [1, endScale]);
      transform = `scale(${defaultScale})`;
  }

  // Create the style object
  const style: React.CSSProperties = {
    transform,
    transformOrigin,
  };

  // Add opacity if needed
  if (includeOpacity) {
    style.opacity = reverse ? springValue : 1 - exitSpringValue;
  }

  return style;
};

/**
 * Spring scale animation for containers
 * This animation uses spring physics for a natural scaling effect
 */
export const springScale: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
  fps = 30,
): React.CSSProperties => {
  return springIn(
    frame,
    startFrame,
    endFrame,
    {
      ...config,
      custom: {
        ...config.custom,
        transformProperty: "scale",
      },
    },
    fps,
  );
};

/**
 * Spring translate X animation for containers
 * This animation uses spring physics for a natural horizontal movement
 */
export const springTranslateX: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
  fps = 30,
): React.CSSProperties => {
  return springIn(
    frame,
    startFrame,
    endFrame,
    {
      ...config,
      custom: {
        ...config.custom,
        transformProperty: "translateX",
      },
    },
    fps,
  );
};

/**
 * Spring translate Y animation for containers
 * This animation uses spring physics for a natural vertical movement
 */
export const springTranslateY: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
  fps = 30,
): React.CSSProperties => {
  return springIn(
    frame,
    startFrame,
    endFrame,
    {
      ...config,
      custom: {
        ...config.custom,
        transformProperty: "translateY",
      },
    },
    fps,
  );
};

/**
 * Spring rotate animation for containers
 * This animation uses spring physics for a natural rotation effect
 */
export const springRotate: ContainerAnimationFunction = (
  frame,
  startFrame,
  endFrame,
  config,
  fps = 30,
): React.CSSProperties => {
  return springIn(
    frame,
    startFrame,
    endFrame,
    {
      ...config,
      custom: {
        ...config.custom,
        transformProperty: "rotate",
      },
    },
    fps,
  );
};
