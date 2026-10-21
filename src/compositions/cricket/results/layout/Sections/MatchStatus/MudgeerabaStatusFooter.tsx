import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { AnimatedText } from "../../../../../../components/typography/AnimatedText";
import { MudgeerabaStatusFooterProps } from "./_types/MudgeerabaStatusFooterProps";
import { truncateText } from "./_utils/helpers";

export const MudgeerabaStatusFooter: React.FC<MudgeerabaStatusFooterProps> = ({
  result,
  delay,
  outerContainer,
}) => {
  const { animations } = useAnimationContext();
  const { fontClasses, colors } = useThemeContext();
  const primaryColor = colors.primary;
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container.main.itemContainer;

  // Show result only (no status)
  const resultText = truncateText(result || "", 50).trim() || "Match Status";

  return (
    <AnimatedContainer
      type="full"
      className="flex w-full items-center justify-center px-4"
      backgroundColor="none"
      style={outerContainer}
      animation={ContainerAnimations.containerIn}
      animationDelay={delay}
    >
      <div
        className="relative flex w-full items-center justify-center px-4 py-2 font-bold"
        style={{ backgroundColor: primaryColor }}
      >
        <AnimatedText
          type="metadataLarge"
          animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
          variant="onContainerCopyNoBg"
          className="text-2xl font-bold text-center break-words"
          style={{ fontFamily: fontClasses.title?.family }}
        >
          {resultText}
        </AnimatedText>
      </div>
    </AnimatedContainer>
  );
};

export default MudgeerabaStatusFooter;
