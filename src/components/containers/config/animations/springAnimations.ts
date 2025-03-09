import { interpolate, spring, measureSpring } from "remotion";
import { ContainerAnimationFunction } from "../types";
import React from "react";

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
  const startScale = config.custom?.startScale || 0.5;
  const from = config.custom?.from || 0;
  const to = config.custom?.to || 1;
  const transformProperty = config.custom?.transformProperty || "scale";
  const transformOrigin = config.custom?.transformOrigin || "center";
  const includeOpacity = config.custom?.includeOpacity !== false;

  // Calculate the spring value
  const springValue = spring({
    frame: frame - startFrame,
    fps,
    from,
    to,
    config: {
      mass: springConfig.mass || 1,
      damping: springConfig.damping || 10,
      stiffness: springConfig.stiffness || 100,
      overshootClamping: springConfig.overshootClamping,
    },
    durationInFrames: config.duration || 30,
    durationRestThreshold: config.custom?.durationRestThreshold,
  });

  // Determine the transform based on the transform property
  let transform = "";
  switch (transformProperty) {
    case "scale":
      const scale = interpolate(springValue, [from, to], [startScale, 1]);
      transform = `scale(${scale})`;
      break;
    case "scaleX":
      const scaleX = interpolate(springValue, [from, to], [startScale, 1]);
      transform = `scaleX(${scaleX})`;
      break;
    case "scaleY":
      const scaleY = interpolate(springValue, [from, to], [startScale, 1]);
      transform = `scaleY(${scaleY})`;
      break;
    case "translateX":
      const translateX = interpolate(
        springValue,
        [from, to],
        [config.custom?.distance || 100, 0],
      );
      transform = `translateX(${translateX}px)`;
      break;
    case "translateY":
      const translateY = interpolate(
        springValue,
        [from, to],
        [config.custom?.distance || 100, 0],
      );
      transform = `translateY(${translateY}px)`;
      break;
    case "rotate":
      const rotate = interpolate(
        springValue,
        [from, to],
        [config.custom?.startAngle || -45, 0],
      );
      transform = `rotate(${rotate}deg)`;
      break;
    default:
      const defaultScale = interpolate(
        springValue,
        [from, to],
        [startScale, 1],
      );
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
  const endScale = config.custom?.endScale || 0.5;
  const from = config.custom?.from || 0;
  const to = config.custom?.to || 1;
  const transformProperty = config.custom?.transformProperty || "scale";
  const transformOrigin = config.custom?.transformOrigin || "center";
  const includeOpacity = config.custom?.includeOpacity !== false;
  const reverse = config.custom?.reverse !== false;

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
    durationRestThreshold: config.custom?.durationRestThreshold,
  });

  // For exit animations, we often want to reverse the spring value
  const exitSpringValue = reverse ? springValue : 1 - springValue;

  // Determine the transform based on the transform property
  let transform = "";
  switch (transformProperty) {
    case "scale":
      const scale = interpolate(exitSpringValue, [0, 1], [1, endScale]);
      transform = `scale(${scale})`;
      break;
    case "scaleX":
      const scaleX = interpolate(exitSpringValue, [0, 1], [1, endScale]);
      transform = `scaleX(${scaleX})`;
      break;
    case "scaleY":
      const scaleY = interpolate(exitSpringValue, [0, 1], [1, endScale]);
      transform = `scaleY(${scaleY})`;
      break;
    case "translateX":
      const translateX = interpolate(
        exitSpringValue,
        [0, 1],
        [0, config.custom?.distance || 100],
      );
      transform = `translateX(${translateX}px)`;
      break;
    case "translateY":
      const translateY = interpolate(
        exitSpringValue,
        [0, 1],
        [0, config.custom?.distance || 100],
      );
      transform = `translateY(${translateY}px)`;
      break;
    case "rotate":
      const rotate = interpolate(
        exitSpringValue,
        [0, 1],
        [0, config.custom?.endAngle || 45],
      );
      transform = `rotate(${rotate}deg)`;
      break;
    default:
      const defaultScale = interpolate(exitSpringValue, [0, 1], [1, endScale]);
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
