import React, { useMemo } from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useNightSessionRowEnterTiming } from "../NightSessionEnterTimingContext";
import { withNightSessionFixtureRowDistance } from "../nightSessionFixtureAnimation";
import { calculateAnimationOutFrame } from "../../../upcoming/layout/Card/_utils/calculations";

export const NightSessionUpcomingShellAnim: React.FC<{
  enterIndex: number;
  className?: string;
  children: React.ReactNode;
}> = ({ enterIndex, className = "w-full min-w-0", children }) => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const enterTiming = useNightSessionRowEnterTiming();
  const rowAnimation = animations.container.main.itemContainer;

  const animationDelay = enterTiming.rowDelayForIndex(enterIndex);
  const animationOutFrame = calculateAnimationOutFrame(data.timings);

  const enter = useMemo(
    () => withNightSessionFixtureRowDistance(rowAnimation.containerIn),
    [rowAnimation.containerIn],
  );
  const exit = useMemo(
    () => withNightSessionFixtureRowDistance(rowAnimation.containerOut),
    [rowAnimation.containerOut],
  );

  return (
    <AnimatedContainer
      type="full"
      size="auto"
      className={className}
      backgroundColor="none"
      animation={enter}
      animationDelay={animationDelay}
      exitAnimation={exit}
      exitFrame={animationOutFrame}
    >
      {children}
    </AnimatedContainer>
  );
};
