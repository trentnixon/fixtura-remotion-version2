import React from "react";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
  TransitionPresentation,
} from "@remotion/transitions";
import {
  TransitionType,
  TransitionDirection,
  TimingType,
} from "./TransitionWrapper";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { flip } from "@remotion/transitions/flip";
import { none } from "@remotion/transitions/none";
import { Easing } from "remotion";

interface Sequence {
  content: React.ReactNode;
  durationInFrames: number;
}

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

interface TransitionSeriesWrapperProps {
  sequences: Sequence[];
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

export const TransitionSeriesWrapper: React.FC<
  TransitionSeriesWrapperProps
> = ({
  sequences,
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
      {sequences.map((sequence, index) => (
        <React.Fragment key={index}>
          <TransitionSeries.Sequence
            durationInFrames={sequence.durationInFrames}
          >
            {sequence.content}
          </TransitionSeries.Sequence>
          {index < sequences.length - 1 && (
            <TransitionSeries.Transition
              presentation={presentation}
              timing={timingFn}
            />
          )}
        </React.Fragment>
      ))}
    </TransitionSeries>
  );
};

// Example usage:
/*
<TransitionSeriesWrapper
  sequences={[
    {
      content: <FirstContent />,
      durationInFrames: 60
    },
    {
      content: <SecondContent />,
      durationInFrames: 90
    }
  ]}
  transitionType="slide"
  direction="from-right"
  transitionDuration={30}
/>
*/
