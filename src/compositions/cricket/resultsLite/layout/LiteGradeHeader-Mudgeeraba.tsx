import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";

/** Grade label on the Mudgeeraba container stripe (matches team row surfaces). */
export const LiteGradeHeaderMudgeeraba: React.FC<{
  gradeName: string;
  delay?: number;
}> = ({ gradeName, delay = 0 }) => {
  const { animations } = useAnimationContext();
  const { fontClasses, selectedPalette } = useThemeContext();
  const copyIn = animations.text.main.copyIn;
  const containerIn = animations.container.main.itemContainer.containerIn;
  const stripeBackground =
    selectedPalette.container.backgroundTransparent.strong;

  return (
    <AnimatedContainer
      type="full"
      className="mb-2 flex w-full items-center justify-center px-6 py-3"
      backgroundColor="none"
      style={{ backgroundColor: stripeBackground }}
      animation={containerIn}
      animationDelay={delay}
    >
      <AnimatedText
        type="metadataMedium"
        animation={{ ...copyIn, delay: delay + 5 }}
        variant="onContainerCopy"
        className="text-center truncate w-full"
        style={{ fontFamily: fontClasses.copy?.family }}
      >
        {gradeName}
      </AnimatedText>
    </AnimatedContainer>
  );
};
