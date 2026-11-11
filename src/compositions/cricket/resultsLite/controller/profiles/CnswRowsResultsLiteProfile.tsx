import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import {
  calculateCNSWLiteRowHeight,
  calculateCNSWLiteTeamsBlockHeight,
} from "../_utils/cnswLiteLayout";
import { LiteMatchRowCNSW } from "../../layout/LiteMatchRow-CNSW";
import { getResultsLiteGradeState } from "./resultsLiteGrade";
import { ResultsLiteSequenceFooter } from "./ResultsLiteSequenceFooter";
import type { ResultsLiteProfileProps } from "./resultsLiteProfileTypes";

export const CnswRowsResultsLiteProfile: React.FC<ResultsLiteProfileProps> = ({
  sequence,
  config,
}) => {
  const { layout } = useThemeContext();
  const { isAccountClub } = useVideoDataContext();
  const assetHeight = layout.heights.asset;
  const teamsBlockHeight = calculateCNSWLiteTeamsBlockHeight(assetHeight);
  const { gradeName, showGrade } = getResultsLiteGradeState(sequence, config);
  const { GradeHeader } = config.components;

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className="flex w-full flex-col justify-center"
        style={{ height: `${assetHeight}px` }}
      >
        {showGrade && GradeHeader ? (
          <GradeHeader gradeName={gradeName} />
        ) : null}
        {sequence.fixtures.map((match, index) => (
          <div
            key={match.gameID}
            className="w-full"
            style={{
              height: `${calculateCNSWLiteRowHeight(assetHeight, match, isAccountClub)}px`,
              marginBottom: index < sequence.fixtures.length - 1 ? 10 : 0,
            }}
          >
            <LiteMatchRowCNSW
              match={match}
              index={index}
              teamsBlockHeight={teamsBlockHeight}
            />
          </div>
        ))}
      </div>
      <ResultsLiteSequenceFooter sequence={sequence} config={config} />
    </div>
  );
};
