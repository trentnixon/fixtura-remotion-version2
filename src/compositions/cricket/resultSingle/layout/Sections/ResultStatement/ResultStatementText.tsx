import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultStatementTextProps } from "./_types/ResultStatementProps";
import { MetadataLarge } from "../../../../utils/primitives/metadataLarge";
import { swapResultWord } from "./_utils/helpers";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";

export const ResultStatementText: React.FC<ResultStatementTextProps> = ({
  resultSummary,
  delay,
  outerContainer,
  CopyVariant = "onContainerCopyNoBg",
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const { selectedPalette } = useThemeContext();
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
      <MetadataLarge
        value={resultSummary.homeTeam}
        animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
        className="text-center text-5xl font-normal"
        variant={CopyVariant}
      />

      <div className="flex items-center justify-center p-4 my-2 shadow-lg"
        style={{
          backgroundColor: selectedPalette.container.background,
          transform: 'rotate(-12.5deg)'
        }}
      >
        <MetadataLarge
          value={swapResultWord(resultSummary.resultWord).toUpperCase()}
          animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          className="text-center text-5xl font-bold "

          variant={'onContainerCopy'}
        />
      </div>
      <MetadataLarge
        value={resultSummary.awayTeam}
        animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
        className="text-center text-5xl font-normal"
        variant={CopyVariant}
      />

    </AnimatedContainer >
  );
};

export default ResultStatementText;
