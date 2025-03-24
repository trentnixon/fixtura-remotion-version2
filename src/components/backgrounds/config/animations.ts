import { interpolate } from "remotion";
import { BackgroundAnimationType } from "./types";

/**
 * Apply fade animation to background
 */
export const fadeAnimation = (
  frame: number,
  startFrame: number,
  endFrame: number,
  fadeIn: boolean = true,
) => {
  const opacity = interpolate(
    frame,
    [startFrame, endFrame],
    fadeIn ? [0, 1] : [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return { opacity };
};

/**
 * Apply zoom animation to background
 */
export const zoomAnimation = (
  frame: number,
  startFrame: number,
  endFrame: number,
  zoomIn: boolean = true,
) => {
  const scale = interpolate(
    frame,
    [startFrame, endFrame],
    zoomIn ? [1.2, 1] : [1, 1.2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return { transform: `scale(${scale})` };
};

/**
 * Apply pan animation to background
 */
export const panAnimation = (
  frame: number,
  startFrame: number,
  endFrame: number,
  direction: "left" | "right" | "up" | "down" = "left",
) => {
  let x = 0;
  let y = 0;

  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (direction === "left") {
    x = interpolate(progress, [0, 1], [0, -5]);
  } else if (direction === "right") {
    x = interpolate(progress, [0, 1], [0, 5]);
  } else if (direction === "up") {
    y = interpolate(progress, [0, 1], [0, -5]);
  } else if (direction === "down") {
    y = interpolate(progress, [0, 1], [0, 5]);
  }

  return { transform: `translate(${x}%, ${y}%)` };
};

/**
 * Apply Ken Burns effect to background
 */
export const kenBurnsAnimation = (
  frame: number,
  startFrame: number,
  endFrame: number,
) => {
  const scale = interpolate(frame, [startFrame, endFrame], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const x = interpolate(frame, [startFrame, endFrame], [0, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const y = interpolate(frame, [startFrame, endFrame], [0, -1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return { transform: `scale(${scale}) translate(${x}%, ${y}%)` };
};

/**
 * Apply parallax effect to background
 */
export const parallaxAnimation = (
  frame: number,
  startFrame: number,
  endFrame: number,
  depth: number = 0.2,
) => {
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(progress, [0, 1], [0, -depth * 100]);

  return { transform: `translateY(${translateY}%)` };
};

/**
 * Apply slide in animation to background
 */
export const slideInAnimation = (
  frame: number,
  startFrame: number,
  endFrame: number,
  direction: "left" | "right" | "top" | "bottom" = "left",
) => {
  let x = 0;
  let y = 0;

  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (direction === "left") {
    x = interpolate(progress, [0, 1], [-100, 0]);
  } else if (direction === "right") {
    x = interpolate(progress, [0, 1], [100, 0]);
  } else if (direction === "top") {
    y = interpolate(progress, [0, 1], [-100, 0]);
  } else if (direction === "bottom") {
    y = interpolate(progress, [0, 1], [100, 0]);
  }

  return { transform: `translate(${x}%, ${y}%)` };
};

/**
 * Apply slide out animation to background
 */
export const slideOutAnimation = (
  frame: number,
  startFrame: number,
  endFrame: number,
  direction: "left" | "right" | "top" | "bottom" = "right",
) => {
  let x = 0;
  let y = 0;

  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (direction === "left") {
    x = interpolate(progress, [0, 1], [0, -100]);
  } else if (direction === "right") {
    x = interpolate(progress, [0, 1], [0, 100]);
  } else if (direction === "top") {
    y = interpolate(progress, [0, 1], [0, -100]);
  } else if (direction === "bottom") {
    y = interpolate(progress, [0, 1], [0, 100]);
  }

  return { transform: `translate(${x}%, ${y}%)` };
};

/**
 * Get animation function based on animation type
 */
export const getBackgroundAnimation = (
  type: BackgroundAnimationType,
  frame: number,
  startFrame: number,
  endFrame: number,
  isExit: boolean = false,
): React.CSSProperties => {
  switch (type) {
    case "fade":
      return fadeAnimation(frame, startFrame, endFrame, !isExit);
    case "zoom":
      return zoomAnimation(frame, startFrame, endFrame, !isExit);
    case "pan":
      return panAnimation(
        frame,
        startFrame,
        endFrame,
        isExit ? "right" : "left",
      );
    case "kenBurns":
      return kenBurnsAnimation(frame, startFrame, endFrame);
    case "parallax":
      return parallaxAnimation(frame, startFrame, endFrame);
    case "slideIn":
      return slideInAnimation(frame, startFrame, endFrame, "left");
    case "slideOut":
      return slideOutAnimation(frame, startFrame, endFrame, "right");
    case "none":
    default:
      return {};
  }
};
