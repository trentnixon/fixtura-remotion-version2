import React, { useMemo } from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import type { ContainerAnimationConfig } from "../../../../components/containers/animations";
import { withNightSessionFixtureInnerDistance } from "./nightSessionFixtureAnimation";

export const NightSessionInnerEnterAnim: React.FC<{
  animationIn: ContainerAnimationConfig;
  animationOut: ContainerAnimationConfig;
  animationDelay: number;
  exitFrame: number;
  className?: string;
  children: React.ReactNode;
}> = ({
  animationIn,
  animationOut,
  animationDelay,
  exitFrame,
  className = "w-full min-w-0",
  children,
}) => {
  const enter = useMemo(
    () => withNightSessionFixtureInnerDistance(animationIn),
    [animationIn],
  );
  const exit = useMemo(
    () => withNightSessionFixtureInnerDistance(animationOut),
    [animationOut],
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
      exitFrame={exitFrame}
    >
      {children}
    </AnimatedContainer>
  );
};
