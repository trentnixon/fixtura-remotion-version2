import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { getResultsLiteGradeState } from "./resultsLiteGrade";
import { ResultsLiteSequenceFooter } from "./ResultsLiteSequenceFooter";
import type { ResultsLiteProfileProps } from "./resultsLiteProfileTypes";

export const ClassicTwoColumnResultsLiteProfile: React.FC<
  ResultsLiteProfileProps
> = ({ sequence, config }) => {
  const { layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const assetHeight = layout.heights.asset;
  const { gradeName, showGrade } = getResultsLiteGradeState(sequence, config);
  const { MatchCard, GradeHeader, FixtureSeparator } = config.components;
  const containerAnimations = animations.container;

  return (
    <div className="flex h-full w-full flex-col">
      <AnimatedContainer
        type="full"
        className="mx-2 flex flex-1 flex-col overflow-hidden p-4"
        style={{
          minHeight: `${assetHeight}px`,
        }}
        backgroundColor="none"
        animation={containerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={containerAnimations.main.parent.containerOut}
      >
        <div className="flex h-full w-full flex-1 flex-col justify-center">
          {showGrade && GradeHeader ? (
            <GradeHeader gradeName={gradeName} />
          ) : null}
          {sequence.fixtures.map((match, fixtureIndex) => (
            <React.Fragment key={match.gameID}>
              {fixtureIndex > 0 && FixtureSeparator ? (
                <FixtureSeparator fixtureIndex={fixtureIndex} />
              ) : null}
              <MatchCard match={match} index={fixtureIndex} />
            </React.Fragment>
          ))}
        </div>
      </AnimatedContainer>
      <ResultsLiteSequenceFooter sequence={sequence} config={config} />
    </div>
  );
};
