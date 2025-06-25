import React, { ReactNode } from "react";
import { AnimatedContainer } from "../AnimatedContainer";
import { ContainerProps } from "../types";
import { SPRING_CONFIGS, ContainerAnimationConfig } from "../animations";

// Default animation configurations
export const DEFAULT_SCALE_IN: ContainerAnimationConfig = {
  type: "scaleIn",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SCALE_OUT: ContainerAnimationConfig = {
  type: "scaleOut",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SCALE_IN_X: ContainerAnimationConfig = {
  type: "scaleInX",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SCALE_IN_Y: ContainerAnimationConfig = {
  type: "scaleInY",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SPRING_SCALE: ContainerAnimationConfig = {
  type: "springScale",
  duration: 45,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_FADE_OUT: ContainerAnimationConfig = {
  type: "fadeOut",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

/**
 * Props for scale animation components
 */
interface ScaleProps
  extends Omit<ContainerProps, "animation" | "exitAnimation"> {
  children: ReactNode;
  animation?: Partial<ContainerAnimationConfig>;
  exitAnimation?: Partial<ContainerAnimationConfig>;
  exitFrame?: number;
  springType?: keyof typeof SPRING_CONFIGS;
}

/**
 * ScaleIn - Container that scales in
 */
export const ScaleIn: React.FC<ScaleProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_SCALE_IN, ...animation };

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
 * ScaleOut - Container that scales out
 */
export const ScaleOut: React.FC<ScaleProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_SCALE_OUT, ...animation };

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
 * ScaleInX - Container that scales in horizontally
 */
export const ScaleInX: React.FC<ScaleProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_SCALE_IN_X, ...animation };

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
 * ScaleInY - Container that scales in vertically
 */
export const ScaleInY: React.FC<ScaleProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_SCALE_IN_Y, ...animation };

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
 * ScaleInOut - Container that scales in and out
 */
export const ScaleInOut: React.FC<ScaleProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 60,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_SCALE_IN, ...animation };

  // Always use scaleOut for exit animation, but allow customization
  const mergedExitAnimation = { ...DEFAULT_SCALE_OUT, ...exitAnimation };

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
 * ScaleSpring - Container that scales with spring animation
 */
export const ScaleSpring: React.FC<ScaleProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  springType = "DEFAULT",
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = {
    ...DEFAULT_SPRING_SCALE,
    ...animation,
    springConfig: SPRING_CONFIGS[springType],
  };

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
