import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import type { ContainerAnimationConfig } from "../../../../components/containers/animations";

export const ScorelineLadderRowCell: React.FC<{
  className?: string;
  animationIn: ContainerAnimationConfig;
  animationOut: ContainerAnimationConfig;
  animationDelay: number;
  animationOutFrame: number;
  children: React.ReactNode;
}> = ({
  className = "",
  animationIn,
  animationOut,
  animationDelay,
  animationOutFrame,
  children,
}) => (
  <div className={`ladder-row__cell ${className}`.trim()}>
    <AnimatedContainer
      type="full"
      size="full"
      className="ladder-row__anim"
      backgroundColor="none"
      animation={animationIn}
      animationDelay={animationDelay}
      exitAnimation={animationOut}
      exitFrame={animationOutFrame}
    >
      {children}
    </AnimatedContainer>
  </div>
);
