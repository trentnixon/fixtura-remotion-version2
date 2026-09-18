import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { NightSessionAnimatedCopy } from "./NightSessionAnimatedCopy";
import { NIGHT_SESSION_LEDGER_COPY_DELAY } from "./nightSessionAnimationTiming";

export const NightSessionAnimatedShell: React.FC<{
  children: React.ReactNode;
  className?: string;
  exitFrame?: number;
  /** When false, the ledger shell stays fixed (no panel reveal / copy drop on the wrapper). */
  animateShell?: boolean;
}> = ({ children, className, exitFrame = 0, animateShell = true }) => {
  const { animations } = useAnimationContext();
  const panelAnimation = animations.container.main.itemContainerOuter;

  if (!animateShell) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatedContainer
      type="full"
      className={className}
      backgroundColor="none"
      animation={panelAnimation.containerIn}
      exitAnimation={panelAnimation.containerOut}
      exitFrame={exitFrame}
    >
      <NightSessionAnimatedCopy
        animationDelay={NIGHT_SESSION_LEDGER_COPY_DELAY}
        exitFrame={exitFrame}
      >
        {children}
      </NightSessionAnimatedCopy>
    </AnimatedContainer>
  );
};
