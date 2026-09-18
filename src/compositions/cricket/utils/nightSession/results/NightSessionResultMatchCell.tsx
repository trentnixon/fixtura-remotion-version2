import React, { useMemo } from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import type { ContainerAnimationConfig } from "../../../../../components/containers/animations";
import type { ScorelineInnerTier } from "../../scoreline/scorelineInnerAnimationDelays";
import { useNightSessionRowEnterTiming } from "../NightSessionEnterTimingContext";
import { NIGHT_SESSION_FIXTURE_INNER_ENTER_DISTANCE_PX } from "../nightSessionAnimationTiming";

const INNER_ANIMATION_TIERS = new Set<ScorelineInnerTier>([
  "grade",
  "columns",
  "rank",
  "mark",
  "home",
  "centre",
]);

const resolveAnimationSlot = (
  tier: ScorelineInnerTier,
  innerIn: ContainerAnimationConfig,
  innerOut: ContainerAnimationConfig,
  secondaryIn: ContainerAnimationConfig,
  secondaryOut: ContainerAnimationConfig,
) =>
  INNER_ANIMATION_TIERS.has(tier)
    ? { containerIn: innerIn, containerOut: innerOut }
    : { containerIn: secondaryIn, containerOut: secondaryOut };

const withResultsInnerDistance = (
  config: ContainerAnimationConfig,
): ContainerAnimationConfig => ({
  ...config,
  custom: { distance: NIGHT_SESSION_FIXTURE_INNER_ENTER_DISTANCE_PX },
});

export const NightSessionResultMatchCell: React.FC<{
  tier: ScorelineInnerTier;
  rowDelay: number;
  exitFrame: number;
  className?: string;
  children: React.ReactNode;
}> = ({
  tier,
  rowDelay,
  exitFrame,
  className = "w-full min-w-0",
  children,
}) => {
  const { animations } = useAnimationContext();
  const enterTiming = useNightSessionRowEnterTiming();
  const innerAnimation = animations.container.main.itemContainerInner;
  const secondaryAnimation = animations.container.main.itemContainerSecondary;
  const slot = resolveAnimationSlot(
    tier,
    innerAnimation.containerIn,
    innerAnimation.containerOut,
    secondaryAnimation.containerIn,
    secondaryAnimation.containerOut,
  );

  const fixtureEnter = useMemo(
    () => withResultsInnerDistance(slot.containerIn),
    [slot.containerIn],
  );
  const fixtureExit = useMemo(
    () => withResultsInnerDistance(slot.containerOut),
    [slot.containerOut],
  );

  return (
    <AnimatedContainer
      type="full"
      size="auto"
      className={className}
      backgroundColor="none"
      animation={fixtureEnter}
      animationDelay={enterTiming.innerDelay(rowDelay, tier)}
      exitAnimation={fixtureExit}
      exitFrame={exitFrame}
    >
      {children}
    </AnimatedContainer>
  );
};
