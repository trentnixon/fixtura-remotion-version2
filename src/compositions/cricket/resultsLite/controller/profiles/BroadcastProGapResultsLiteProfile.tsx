import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BROADCAST_PRO_RESULTS_GAP_PX } from "../../../results/controller/ResultsDisplay/_utils/calculations";
import { getResultsLiteGradeState } from "./resultsLiteGrade";
import { ResultsLiteSequenceFooter } from "./ResultsLiteSequenceFooter";
import type { ResultsLiteProfileProps } from "./resultsLiteProfileTypes";

export const BroadcastProGapResultsLiteProfile: React.FC<
  ResultsLiteProfileProps
> = ({ sequence, config }) => {
  const { layout } = useThemeContext();
  const assetHeight = layout.heights.asset;
  const { gradeName, showGrade } = getResultsLiteGradeState(sequence, config);
  const { MatchCard, GradeHeader } = config.components;

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className="flex w-full flex-col justify-center overflow-hidden"
        style={{ height: `${assetHeight}px` }}
      >
        {showGrade && GradeHeader ? (
          <GradeHeader gradeName={gradeName} />
        ) : null}
        <div
          className="flex w-full flex-col"
          style={{ gap: `${BROADCAST_PRO_RESULTS_GAP_PX}px` }}
        >
          {sequence.fixtures.map((match, fixtureIndex) => (
            <MatchCard
              key={match.gameID}
              match={match}
              index={fixtureIndex}
            />
          ))}
        </div>
      </div>
      <ResultsLiteSequenceFooter sequence={sequence} config={config} />
    </div>
  );
};
