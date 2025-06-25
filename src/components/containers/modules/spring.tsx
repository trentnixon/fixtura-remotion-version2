import React, { ReactNode } from "react";
import { AnimatedContainer } from "../AnimatedContainer";
import { ContainerProps } from "../types";
import { SPRING_CONFIGS, ContainerAnimationConfig } from "../animations";

// Default animation configurations
export const DEFAULT_SPRING_IN: ContainerAnimationConfig = {
  type: "springIn",
  duration: 45,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SPRING_OUT: ContainerAnimationConfig = {
  type: "springOut",
  duration: 45,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SPRING_SCALE: ContainerAnimationConfig = {
  type: "springScale",
  duration: 45,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SPRING_TRANSLATE_X: ContainerAnimationConfig = {
  type: "springTranslateX",
  duration: 45,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SPRING_TRANSLATE_Y: ContainerAnimationConfig = {
  type: "springTranslateY",
  duration: 45,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SPRING_ROTATE: ContainerAnimationConfig = {
  type: "springRotate",
  duration: 45,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_FADE_OUT: ContainerAnimationConfig = {
  type: "fadeOut",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

/**
 * Props for spring animation components
 */
interface SpringProps
  extends Omit<ContainerProps, "animation" | "exitAnimation"> {
  children: ReactNode;
  animation?: Partial<ContainerAnimationConfig>;
  exitAnimation?: Partial<ContainerAnimationConfig>;
  exitFrame?: number;
  springType?: keyof typeof SPRING_CONFIGS;
}

/**
 * SpringIn - Container that springs in
 */
export const SpringIn: React.FC<SpringProps> = ({
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

/**
 * SpringOut - Container that springs out
 */
export const SpringOut: React.FC<SpringProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  springType = "DEFAULT",
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = {
    ...DEFAULT_SPRING_OUT,
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

/**
 * SpringScale - Container with oscillating scale effect
 */
export const SpringScale: React.FC<SpringProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  springType = "WOBBLY",
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

/**
 * SpringTranslateX - Container with oscillating horizontal movement
 */
export const SpringTranslateX: React.FC<SpringProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  springType = "WOBBLY",
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = {
    ...DEFAULT_SPRING_TRANSLATE_X,
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

/**
 * SpringTranslateY - Container with oscillating vertical movement
 */
export const SpringTranslateY: React.FC<SpringProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  springType = "WOBBLY",
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = {
    ...DEFAULT_SPRING_TRANSLATE_Y,
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

/**
 * SpringRotate - Container with oscillating rotation
 */
export const SpringRotate: React.FC<SpringProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  springType = "WOBBLY",
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = {
    ...DEFAULT_SPRING_ROTATE,
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

/**
 * SpringBounce - Container with bounce effect
 */
export const SpringBounce: React.FC<SpringProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = {
    ...DEFAULT_SPRING_IN,
    ...animation,
    springConfig: SPRING_CONFIGS.BOUNCE,
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
