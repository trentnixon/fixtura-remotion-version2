import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { AnimatedText } from "../../../../../../components/typography/AnimatedText";
import { ResultStatementShortProps } from "./_types/ResultStatementProps";
import { ColorVariant } from "../../../../../../components/typography/AnimatedText";

export const ResultStatementShort: React.FC<ResultStatementShortProps> = ({
  resultShort,
  delay,
  outerContainer,
  variant = "onContainerCopyNoBg",
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const defaultClasses = "w-full flex text-center flex-col items-center justify-center";
  return (
    <AnimatedContainer
      type="full"
      className={defaultClasses}
      backgroundColor="none"
      style={outerContainer}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <AnimatedText
        type="ResultStatementShort"
        animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
        variant={variant as ColorVariant}
        letterAnimation="word"

      >
        {resultShort}
      </AnimatedText>
    </AnimatedContainer>
  );
};

export default ResultStatementShort;
