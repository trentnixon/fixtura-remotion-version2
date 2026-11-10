import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../sponsorFooter";
import { buildResultsFooterSponsors } from "../../results/controller/ResultsDisplay/_utils/calculations";
import { LiteMatchCard } from "../layout/LiteMatchCard";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";

export { RESULTS_LITE_PER_SCREEN as RESULTS_LITE_SIXERS_PER_SCREEN } from "./display-Basic";

/** Baseline layout — Sixers-specific styling to follow (see full CricketResults Sixers). */
const ResultsLiteDisplaySixersThunder: React.FC<{
  sequence: ResultsLiteSequence;
}> = ({ sequence }) => {
  const { layout } = useThemeContext();

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className="flex w-full flex-col items-stretch justify-center gap-[30px] px-8"
        style={{
          height: `${layout.heights.asset}px`,
        }}
      >
        {sequence.fixtures.map((match, fixtureIndex) => (
          <div key={match.gameID} className="w-full">
            <LiteMatchCard
              match={match}
              index={fixtureIndex}
              gradeHeader={
                sequence.showGradeHeader && fixtureIndex === 0
                  ? sequence.gradeName
                  : undefined
              }
            />
          </div>
        ))}
      </div>
      <div style={{ height: `${layout.heights.footer}px` }}>
        <SponsorFooter
          sponsors={buildResultsFooterSponsors(sequence.fixtures)}
        />
      </div>
    </div>
  );
};

export default ResultsLiteDisplaySixersThunder;
