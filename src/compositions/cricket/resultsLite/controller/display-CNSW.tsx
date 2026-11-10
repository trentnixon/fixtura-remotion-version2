import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../sponsorFooter";
import { buildResultsFooterSponsors } from "../../results/controller/ResultsDisplay/_utils/calculations";
import { LiteGradeHeaderCNSW } from "../layout/LiteGradeHeader-CNSW";
import { LiteMatchRowCNSW } from "../layout/LiteMatchRow-CNSW";
import {
  calculateCNSWLiteRowHeight,
  calculateCNSWLiteTeamsBlockHeight,
} from "./_utils/cnswLiteLayout";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";

export { RESULTS_LITE_PER_SCREEN as RESULTS_LITE_CNSW_PER_SCREEN } from "./display-Basic";

const ResultsLiteDisplayCNSW: React.FC<{
  sequence: ResultsLiteSequence;
}> = ({ sequence }) => {
  const { layout } = useThemeContext();
  const { isAccountClub } = useVideoDataContext();
  const { heights } = layout;
  const availableHeight = heights.asset;
  const teamsBlockHeight = calculateCNSWLiteTeamsBlockHeight(availableHeight);
  const showGrade =
    sequence.showGradeHeader && sequence.gradeName.trim().length > 0;

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className="flex w-full flex-col justify-center"
        style={{ height: `${availableHeight}px` }}
      >
        {showGrade ? (
          <LiteGradeHeaderCNSW gradeName={sequence.gradeName} />
        ) : null}
        {sequence.fixtures.map((match, index) => (
          <div
            key={match.gameID}
            className="w-full"
            style={{
              height: `${calculateCNSWLiteRowHeight(availableHeight, match, isAccountClub)}px`,
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
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter
          sponsors={buildResultsFooterSponsors(sequence.fixtures)}
        />
      </div>
    </div>
  );
};

export default ResultsLiteDisplayCNSW;
