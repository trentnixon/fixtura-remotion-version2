import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../sponsorFooter";
import { buildResultsFooterSponsors } from "../../results/controller/ResultsDisplay/_utils/calculations";
import { LiteMatchCard } from "../layout/LiteMatchCard";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";

/** Four score strips fit the Basic main area once player lines and match meta are gone. */
export const RESULTS_LITE_PER_SCREEN = 4;

const ResultsLiteDisplayBasic: React.FC<{
  sequence: ResultsLiteSequence;
}> = ({ sequence }) => {
  const { layout } = useThemeContext();

  return (
    <div className="flex flex-col h-full w-full">
      <div
        className="w-full flex flex-col items-stretch justify-center gap-[30px] px-8"
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

export default ResultsLiteDisplayBasic;
