import React from "react";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
  TransitionPresentation,
} from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { flip } from "@remotion/transitions/flip";
import { none } from "@remotion/transitions/none";
import { Easing } from "remotion";

export type TransitionType =
  | "slide"
  | "fade"
  | "wipe"
  | "clockWipe"
  | "flip"
  | "none";
export type TransitionDirection =
  | "from-right"
  | "from-left"
  | "from-top"
  | "from-bottom";
export type TimingType = "linear" | "spring";

interface TimingConfig {
  type: TimingType;
  durationInFrames?: number;
  easing?: Easing;
  springConfig?: {
    damping?: number;
    mass?: number;
    stiffness?: number;
    overshootClamping?: boolean;
    restDisplacementThreshold?: number;
    restSpeedThreshold?: number;
  };
}

interface TransitionWrapperProps {
  children: React.ReactNode;
  transitionType?: TransitionType;
  direction?: TransitionDirection;
  timing?: TimingConfig;
  width?: number;
  height?: number;
}

const getTransitionPresentation = (
  type: TransitionType,
  direction: TransitionDirection = "from-right",
  width: number = 1920,
  height: number = 1080,
): TransitionPresentation<any> => {
  switch (type) {
    case "slide":
      return slide({ direction });
    case "fade":
      return fade();
    case "wipe":
      return wipe({ direction });
    case "clockWipe":
      return clockWipe({ width, height });
    case "flip":
      return flip({ direction });
    case "none":
    default:
      return none();
  }
};

const getTiming = (config: TimingConfig) => {
  const { type, durationInFrames = 30, easing, springConfig } = config;

  if (type === "spring") {
    return springTiming({
      config: springConfig || {
        damping: 200,
        mass: 1,
        stiffness: 100,
      },
    });
  }

  return linearTiming({
    durationInFrames,
    easing: (easing as (input: number) => number) || ((t) => t), // Default to linear easing if none provided
  });
};

export const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  transitionType = "none",
  direction = "from-right",
  timing = { type: "linear", durationInFrames: 30 },
  width = 1920,
  height = 1080,
}) => {
  const presentation = getTransitionPresentation(
    transitionType,
    direction,
    width,
    height,
  );
  const timingFn = getTiming(timing);

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence
        durationInFrames={timing.durationInFrames || 30}
      >
        {children}
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timingFn}
      />
    </TransitionSeries>
  );
};

// Example usage:
/*
<TransitionWrapper
  transitionType="slide"
  direction="from-right"
  durationInFrames={30}
>
  <YourContent />
</TransitionWrapper>
*/
