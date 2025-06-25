import React, { ReactNode } from "react";
import { AnimatedContainer } from "../AnimatedContainer";
import { ContainerProps } from "../types";
import { ContainerAnimationConfig, SPRING_CONFIGS } from "../animations";

// Default animation configurations
export const DEFAULT_SLIDE_IN_LEFT: ContainerAnimationConfig = {
  type: "slideInLeft",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SLIDE_IN_RIGHT: ContainerAnimationConfig = {
  type: "slideInRight",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SLIDE_IN_TOP: ContainerAnimationConfig = {
  type: "slideInTop",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SLIDE_IN_BOTTOM: ContainerAnimationConfig = {
  type: "slideInBottom",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SLIDE_OUT_LEFT: ContainerAnimationConfig = {
  type: "slideOutLeft",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SLIDE_OUT_RIGHT: ContainerAnimationConfig = {
  type: "slideOutRight",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SLIDE_OUT_TOP: ContainerAnimationConfig = {
  type: "slideOutTop",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

export const DEFAULT_SLIDE_OUT_BOTTOM: ContainerAnimationConfig = {
  type: "slideOutBottom",
  duration: 30,
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

export const DEFAULT_FADE_OUT: ContainerAnimationConfig = {
  type: "fadeOut",
  duration: 30,
  easing: { type: "inOut", base: "ease" },
};

/**
 * Props for slide animation components
 */
interface SlideProps
  extends Omit<ContainerProps, "animation" | "exitAnimation"> {
  children: ReactNode;
  animation?: Partial<ContainerAnimationConfig>;
  exitAnimation?: Partial<ContainerAnimationConfig>;
  exitFrame?: number;
  springType?: keyof typeof SPRING_CONFIGS;
}

/**
 * SlideInLeft - Container that slides in from the left
 */
export const SlideInLeft: React.FC<SlideProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_SLIDE_IN_LEFT, ...animation };

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
 * SlideInRight - Container that slides in from the right
 */
export const SlideInRight: React.FC<SlideProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_SLIDE_IN_RIGHT, ...animation };

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
 * SlideInTop - Container that slides in from the top
 */
export const SlideInTop: React.FC<SlideProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_SLIDE_IN_TOP, ...animation };

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
 * SlideInBottom - Container that slides in from the bottom
 */
export const SlideInBottom: React.FC<SlideProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  ...props
}) => {
  // Merge default animation with provided animation props
  const mergedAnimation = { ...DEFAULT_SLIDE_IN_BOTTOM, ...animation };

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
 * SlideInOut - Container that slides in and out in specified directions
 */
export const SlideInOut: React.FC<
  SlideProps & {
    inDirection?: "left" | "right" | "top" | "bottom";
    outDirection?: "left" | "right" | "top" | "bottom";
  }
> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 60,
  inDirection = "left",
  outDirection = "right",
  ...props
}) => {
  // Get the appropriate default animation based on direction
  const getDefaultAnimation = (
    direction: string,
    isExit: boolean,
  ): ContainerAnimationConfig => {
    if (isExit) {
      switch (direction) {
        case "left":
          return DEFAULT_SLIDE_OUT_LEFT;
        case "right":
          return DEFAULT_SLIDE_OUT_RIGHT;
        case "top":
          return DEFAULT_SLIDE_OUT_TOP;
        case "bottom":
          return DEFAULT_SLIDE_OUT_BOTTOM;
        default:
          return DEFAULT_SLIDE_OUT_RIGHT;
      }
    } else {
      switch (direction) {
        case "left":
          return DEFAULT_SLIDE_IN_LEFT;
        case "right":
          return DEFAULT_SLIDE_IN_RIGHT;
        case "top":
          return DEFAULT_SLIDE_IN_TOP;
        case "bottom":
          return DEFAULT_SLIDE_IN_BOTTOM;
        default:
          return DEFAULT_SLIDE_IN_LEFT;
      }
    }
  };

  // Get default animations based on directions
  const defaultInAnimation = getDefaultAnimation(inDirection, false);
  const defaultOutAnimation = getDefaultAnimation(outDirection, true);

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

/**
 * SlideSpring - Container that slides with spring animation
 */
export const SlideSpring: React.FC<
  SlideProps & {
    direction?: "x" | "y";
  }
> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  direction = "x",
  springType = "DEFAULT",
  ...props
}) => {
  // Determine which spring animation to use based on direction
  const defaultAnimation =
    direction === "x" ? DEFAULT_SPRING_TRANSLATE_X : DEFAULT_SPRING_TRANSLATE_Y;

  // Merge default animation with provided animation props
  const mergedAnimation = {
    ...defaultAnimation,
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
