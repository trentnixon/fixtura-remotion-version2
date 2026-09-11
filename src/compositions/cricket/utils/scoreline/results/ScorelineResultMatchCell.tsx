import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import type { ContainerAnimationConfig } from "../../../../../components/containers/animations";
import {
  calculateScorelineInnerDelay,
  type ScorelineInnerTier,
} from "../scorelineInnerAnimationDelays";

const INNER_ANIMATION_TIERS = new Set<ScorelineInnerTier>([
  "grade",
  "columns",
  "rank",
  "mark",
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

export const ScorelineResultMatchCell: React.FC<{
  tier: ScorelineInnerTier;
  rowDelay: number;
  exitFrame: number;
  className?: string;
  animClassName?: string;
  children: React.ReactNode;
}> = ({
  tier,
  rowDelay,
  exitFrame,
  className = "",
  animClassName = "scoreline-result-cell__anim",
  children,
}) => {
  const { animations } = useAnimationContext();
  const innerAnimation = animations.container.main.itemContainerInner;
  const secondaryAnimation = animations.container.main.itemContainerSecondary;
  const slot = resolveAnimationSlot(
    tier,
    innerAnimation.containerIn,
    innerAnimation.containerOut,
    secondaryAnimation.containerIn,
    secondaryAnimation.containerOut,
  );

  return (
    <div className={`scoreline-result-cell ${className}`.trim()}>
      <AnimatedContainer
        type="full"
        size="full"
        className={animClassName}
        backgroundColor="none"
        animation={slot.containerIn}
        animationDelay={calculateScorelineInnerDelay(rowDelay, tier)}
        exitAnimation={slot.containerOut}
        exitFrame={exitFrame}
      >
        {children}
      </AnimatedContainer>
    </div>
  );
};
