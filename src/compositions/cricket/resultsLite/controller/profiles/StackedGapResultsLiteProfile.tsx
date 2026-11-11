import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { getResultsLiteGradeState } from "./resultsLiteGrade";
import { ResultsLiteSequenceFooter } from "./ResultsLiteSequenceFooter";
import type { ResultsLiteProfileProps } from "./resultsLiteProfileTypes";

export const StackedGapResultsLiteProfile: React.FC<ResultsLiteProfileProps> = ({
  sequence,
  config,
}) => {
  const { layout } = useThemeContext();
  const assetHeight = layout.heights.asset;
  const { gradeName, showGrade, inlineGradeForIndex } = getResultsLiteGradeState(
    sequence,
    config,
  );
  const { MatchCard, GradeHeader } = config.components;

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className={`flex w-full flex-col items-stretch px-8 ${config.assetJustifyCenter ? "justify-center" : ""}`}
        style={{
          height: `${assetHeight}px`,
          gap: `${config.stackedGapPx ?? 30}px`,
        }}
      >
        {config.gradePlacement === "header" && showGrade && GradeHeader ? (
          <GradeHeader gradeName={gradeName} />
        ) : null}
        {sequence.fixtures.map((match, fixtureIndex) => (
          <div key={match.gameID} className="w-full">
            <MatchCard
              match={match}
              index={fixtureIndex}
              gradeHeader={inlineGradeForIndex(fixtureIndex)}
            />
          </div>
        ))}
      </div>
      <ResultsLiteSequenceFooter sequence={sequence} config={config} />
    </div>
  );
};
