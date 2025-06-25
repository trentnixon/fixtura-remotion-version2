import React, { ReactNode } from "react";
import { AnimatedContainer } from "../AnimatedContainer";
import { ContainerProps } from "../types";
import { ContainerAnimationConfig } from "../animations";

// Default animation configurations
export const DEFAULT_REVEAL_LEFT: ContainerAnimationConfig = {
  type: "revealLeft",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_REVEAL_RIGHT: ContainerAnimationConfig = {
  type: "revealRight",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_REVEAL_TOP: ContainerAnimationConfig = {
  type: "revealTop",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_REVEAL_BOTTOM: ContainerAnimationConfig = {
  type: "revealBottom",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_COLLAPSE_LEFT: ContainerAnimationConfig = {
  type: "collapseLeft",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_COLLAPSE_RIGHT: ContainerAnimationConfig = {
  type: "collapseRight",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_COLLAPSE_TOP: ContainerAnimationConfig = {
  type: "collapseTop",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_COLLAPSE_BOTTOM: ContainerAnimationConfig = {
  type: "collapseBottom",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_FADE_OUT: ContainerAnimationConfig = {
  type: "fadeOut",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

/**
 * Props for reveal animation components
 */
interface RevealProps
  extends Omit<ContainerProps, "animation" | "exitAnimation"> {
  children: ReactNode;
  animation?: Partial<ContainerAnimationConfig>;
  exitAnimation?: Partial<ContainerAnimationConfig>;
  exitFrame?: number;
}

/**
 * RevealLeft - Container that reveals from left to right
 */
export const RevealLeft: React.FC<RevealProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_REVEAL_LEFT, ...animation };

  // If exitAnimation is provided, merge with DEFAULT_FADE_OUT, otherwise use null
  const mergedExitAnimation = exitAnimation
    ? { ...DEFAULT_FADE_OUT, ...exitAnimation }
    : exitFrame > 0
      ? DEFAULT_FADE_OUT
      : undefined;

  return (
    <AnimatedContainer
      animation={mergedAnimation}
      exitAnimation={mergedExitAnimation}
      exitFrame={exitFrame}
      {...props}
    >
      {children}
    </AnimatedContainer>
  );
};

/**
 * RevealRight - Container that reveals from right to left
 */
export const RevealRight: React.FC<RevealProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_REVEAL_RIGHT, ...animation };

  // If exitAnimation is provided, merge with DEFAULT_FADE_OUT, otherwise use null
  const mergedExitAnimation = exitAnimation
    ? { ...DEFAULT_FADE_OUT, ...exitAnimation }
    : exitFrame > 0
      ? DEFAULT_FADE_OUT
      : undefined;

  return (
    <AnimatedContainer
      animation={mergedAnimation}
      exitAnimation={mergedExitAnimation}
      exitFrame={exitFrame}
      {...props}
    >
      {children}
    </AnimatedContainer>
  );
};

/**
 * RevealTop - Container that reveals from top to bottom
 */
export const RevealTop: React.FC<RevealProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_REVEAL_TOP, ...animation };

  // If exitAnimation is provided, merge with DEFAULT_FADE_OUT, otherwise use null
  const mergedExitAnimation = exitAnimation
    ? { ...DEFAULT_FADE_OUT, ...exitAnimation }
    : exitFrame > 0
      ? DEFAULT_FADE_OUT
      : undefined;

  return (
    <AnimatedContainer
      animation={mergedAnimation}
      exitAnimation={mergedExitAnimation}
      exitFrame={exitFrame}
      {...props}
    >
      {children}
    </AnimatedContainer>
  );
};

/**
 * RevealBottom - Container that reveals from bottom to top
 */
export const RevealBottom: React.FC<RevealProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_REVEAL_BOTTOM, ...animation };

  // If exitAnimation is provided, merge with DEFAULT_FADE_OUT, otherwise use null
  const mergedExitAnimation = exitAnimation
    ? { ...DEFAULT_FADE_OUT, ...exitAnimation }
    : exitFrame > 0
      ? DEFAULT_FADE_OUT
      : undefined;

  return (
    <AnimatedContainer
      animation={mergedAnimation}
      exitAnimation={mergedExitAnimation}
      exitFrame={exitFrame}
      {...props}
    >
      {children}
    </AnimatedContainer>
  );
};

/**
 * RevealCollapse - Container that reveals and then collapses
 */
export const RevealCollapse: React.FC<
  RevealProps & {
    revealDirection?: "left" | "right" | "top" | "bottom";
    collapseDirection?: "left" | "right" | "top" | "bottom";
  }
> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 60,
  revealDirection = "left",
  collapseDirection = "right",
  ...props
}) => {
  // Get the appropriate default animation based on direction
  const getDefaultAnimation = (
    direction: string,
    isCollapse: boolean,
  ): ContainerAnimationConfig => {
    if (isCollapse) {
      switch (direction) {
        case "left":
          return DEFAULT_COLLAPSE_LEFT;
        case "right":
          return DEFAULT_COLLAPSE_RIGHT;
        case "top":
          return DEFAULT_COLLAPSE_TOP;
        case "bottom":
          return DEFAULT_COLLAPSE_BOTTOM;
        default:
          return DEFAULT_COLLAPSE_RIGHT;
      }
    } else {
      switch (direction) {
        case "left":
          return DEFAULT_REVEAL_LEFT;
        case "right":
          return DEFAULT_REVEAL_RIGHT;
        case "top":
          return DEFAULT_REVEAL_TOP;
        case "bottom":
          return DEFAULT_REVEAL_BOTTOM;
        default:
          return DEFAULT_REVEAL_LEFT;
      }
    }
  };

  // Get default animations based on directions
  const defaultInAnimation = getDefaultAnimation(revealDirection, false);
  const defaultOutAnimation = getDefaultAnimation(collapseDirection, true);

  // Merge default animations with provided animation props
  const mergedAnimation = { ...defaultInAnimation, ...animation };
  const mergedExitAnimation = exitAnimation
    ? { ...defaultOutAnimation, ...exitAnimation }
    : defaultOutAnimation;

  return (
    <AnimatedContainer
      animation={mergedAnimation}
      exitAnimation={mergedExitAnimation}
      exitFrame={exitFrame}
      {...props}
    >
      {children}
    </AnimatedContainer>
  );
};
