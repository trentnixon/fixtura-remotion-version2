import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { AnimatedText } from "../../../../../../components/typography/AnimatedText";
import { ResultStatementTextProps } from "./_types/ResultStatementProps";
import { buildResultStatementText } from "./_utils/helpers";

export const ResultStatementText: React.FC<ResultStatementTextProps> = ({
  resultSummary,
  delay,
  outerContainer,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Build the result statement text
  const statementText = buildResultStatementText(resultSummary);
  const defaultClasses = "w-full flex flex-col text-center items-center justify-center";
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
        type="ResultStatementText"
        animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
        variant="onContainerCopyNoBg"
        letterAnimation="word"

      >
        {statementText}
      </AnimatedText>
    </AnimatedContainer>
  );
};

export default ResultStatementText;
