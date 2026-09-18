import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import type { ContainerAnimationConfig } from "../../../../components/containers/animations";

export const NightSessionAnimatedCopy: React.FC<{
  children: React.ReactNode;
  className?: string;
  animationDelay?: number;
  exitFrame?: number;
  animationIn?: ContainerAnimationConfig;
  animationOut?: ContainerAnimationConfig;
}> = ({
  children,
  className = "w-full min-w-0",
  animationDelay = 0,
  exitFrame = 0,
  animationIn,
  animationOut,
}) => {
  const { animations } = useAnimationContext();
  const copyAnimation = animations.container.main.itemContainerInner;

  const inAnim = animationIn ?? copyAnimation.containerIn;
  const outAnim = animationOut ?? copyAnimation.containerOut;

  return (
    <AnimatedContainer
      type="full"
      size="auto"
      className={className}
      backgroundColor="none"
      animation={inAnim}
      animationDelay={animationDelay}
      exitAnimation={outAnim}
      exitFrame={exitFrame}
    >
      {children}
    </AnimatedContainer>
  );
};
