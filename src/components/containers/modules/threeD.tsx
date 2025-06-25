import React, { ReactNode } from "react";
import { AnimatedContainer } from "../AnimatedContainer";
import { ContainerProps } from "../types";
import { ContainerAnimationConfig } from "../animations";

// Default animation configurations
export const DEFAULT_FLIP_X: ContainerAnimationConfig = {
  type: "flipX",
  duration: 40,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_FLIP_Y: ContainerAnimationConfig = {
  type: "flipY",
  duration: 40,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_ROTATE_3D: ContainerAnimationConfig = {
  type: "rotate3D",
  duration: 40,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SWING: ContainerAnimationConfig = {
  type: "swing",
  duration: 40,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_ZOOM_PERSPECTIVE: ContainerAnimationConfig = {
  type: "zoomPerspective",
  duration: 40,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_GLITCH: ContainerAnimationConfig = {
  type: "glitch",
  duration: 40,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_BLUR: ContainerAnimationConfig = {
  type: "blur",
  duration: 40,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_FADE_OUT: ContainerAnimationConfig = {
  type: "fadeOut",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

/**
 * Props for 3D animation components
 */
interface ThreeDProps
  extends Omit<ContainerProps, "animation" | "exitAnimation"> {
  children: ReactNode;
  animation?: Partial<ContainerAnimationConfig>;
  exitAnimation?: Partial<ContainerAnimationConfig>;
  exitFrame?: number;
}

/**
 * FlipX - Container that flips around the X axis
 */
export const FlipX: React.FC<ThreeDProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_FLIP_X, ...animation };

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
 * FlipY - Container that flips around the Y axis
 */
export const FlipY: React.FC<ThreeDProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_FLIP_Y, ...animation };

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
 * Rotate3D - Container that rotates in 3D space
 */
export const Rotate3D: React.FC<ThreeDProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_ROTATE_3D, ...animation };

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
 * Swing - Container with swing effect
 */
export const Swing: React.FC<ThreeDProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_SWING, ...animation };

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
 * ZoomPerspective - Container with zoom perspective effect
 */
export const ZoomPerspective: React.FC<ThreeDProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_ZOOM_PERSPECTIVE, ...animation };

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
 * Glitch - Container with glitch effect
 */
export const Glitch: React.FC<ThreeDProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_GLITCH, ...animation };

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
 * Blur - Container with blur effect
 */
export const Blur: React.FC<ThreeDProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_BLUR, ...animation };

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
 * FlipInOut - Container that flips in and out
 */
export const FlipInOut: React.FC<
  ThreeDProps & {
    axis?: "x" | "y";
  }
> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 60,
  axis = "x",
  ...props
}) => {
  // Get the appropriate default animation based on axis
  const defaultAnimation = axis === "x" ? DEFAULT_FLIP_X : DEFAULT_FLIP_Y;

  // Merge default animation with provided animation props
  const mergedAnimation = { ...defaultAnimation, ...animation };

  // If exitAnimation is provided, merge with default flip animation, otherwise use the same flip animation
  const mergedExitAnimation = exitAnimation
    ? { ...defaultAnimation, ...exitAnimation }
    : defaultAnimation;

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
