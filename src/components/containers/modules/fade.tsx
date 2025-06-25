import React, { ReactNode } from "react";
import { AnimatedContainer } from "../AnimatedContainer";
import { ContainerProps } from "../types";
import { SPRING_CONFIGS, ContainerAnimationConfig } from "../animations";

// Default animation configurations
export const DEFAULT_FADE_IN: ContainerAnimationConfig = {
  type: "fadeIn",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_FADE_OUT: ContainerAnimationConfig = {
  type: "fadeOut",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SPRING_IN: ContainerAnimationConfig = {
  type: "springIn",
  duration: 45,
  easing: { type: "inOut", base: "ease" },
};

/**
 * Props for fade animation components
 */
interface FadeProps
  extends Omit<ContainerProps, "animation" | "exitAnimation"> {
  children: ReactNode;
  animation?: Partial<ContainerAnimationConfig>;
  exitAnimation?: Partial<ContainerAnimationConfig>;
  exitFrame?: number;
  springType?: keyof typeof SPRING_CONFIGS;
}

/**
 * FadeIn - Container that fades in
 */
export const FadeIn: React.FC<FadeProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_FADE_IN, ...animation };

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
 * FadeOut - Container that fades out
 */
export const FadeOut: React.FC<FadeProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_FADE_IN, ...animation };

  // Always use fadeOut for exit animation, but allow customization
  const mergedExitAnimation = { ...DEFAULT_FADE_OUT, ...exitAnimation };

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
 * FadeInOut - Container that fades in and out
 */
export const FadeInOut: React.FC<FadeProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 60,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_FADE_IN, ...animation };

  // Always use fadeOut for exit animation, but allow customization
  const mergedExitAnimation = { ...DEFAULT_FADE_OUT, ...exitAnimation };

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
 * FadeInSpring - Container that fades in with spring animation
 */
export const FadeInSpring: React.FC<FadeProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  springType = "DEFAULT",
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = {
    ...DEFAULT_SPRING_IN,
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
