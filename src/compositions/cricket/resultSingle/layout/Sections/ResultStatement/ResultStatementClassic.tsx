import React from "react";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
//import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { ResultMetaData } from "../../../../utils/primitives/ResultMetaData";
import { ResultStatementShort } from "./ResultStatementShort";
import { swapResultWord } from "./_utils/helpers";
import { ResultStatementClassicProps } from "./_types/ResultStatementProps";

export const ResultStatementClassic: React.FC<ResultStatementClassicProps> = ({
  resultShort,
  resultSummary,
  height,
  delay,
}) => {
  const { animations } = useAnimationContext();
  //const { selectedPalette } = useThemeContext();
  const TextAnimations = animations.text.main;

  // Get background color from theme (same as stats)
  //const backgroundColor = selectedPalette.container.backgroundTransparent.strong;

  // Priority: resultSummary > resultShort
  if (resultSummary) {
    return (
      <div
        className="w-full flex flex-col items-center px-16 py-0 mb-16 justify-center gap-2"

      >
        {/* Home Team */}
        <ResultMetaData
          value={resultSummary.homeTeam}
          animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          variant="onContainerCopyNoBg"
          className="text-center text-5xl font-bold"
        />

        {/* Result Word */}
        <ResultMetaData
          value={swapResultWord(resultSummary.resultWord).toUpperCase()}
          animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          variant="onContainerCopyNoBg"
          className="text-center text-4xl font-bold"
        />

        {/* Away Team */}
        <ResultMetaData
          value={resultSummary.awayTeam}
          animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          variant="onContainerCopyNoBg"
          className="text-center text-5xl font-bold"
        />
      </div>
    );
  }

  if (resultShort) {
    return (
      <div className="w-full flex justify-center items-center mb-8">
        <ResultStatementShort
          resultShort={resultShort}
          delay={delay}
          outerContainer={{
            height: height,
          }}
        />
      </div>
    );
  }

  return null;
};

export default ResultStatementClassic;
