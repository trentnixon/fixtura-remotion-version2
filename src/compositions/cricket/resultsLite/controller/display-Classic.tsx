import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../sponsorFooter";
import { buildResultsFooterSponsors } from "../../results/controller/ResultsDisplay/_utils/calculations";
import { LiteFixtureSeparatorClassic } from "../layout/LiteFixtureSeparator-Classic";
import { LiteGradeHeaderClassic } from "../layout/LiteGradeHeader-Classic";
import { LiteMatchCardClassic } from "../layout/LiteMatchCard-Classic";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";

export { RESULTS_LITE_PER_SCREEN as RESULTS_LITE_CLASSIC_PER_SCREEN } from "./display-Basic";

const ResultsLiteDisplayClassic: React.FC<{
  sequence: ResultsLiteSequence;
}> = ({ sequence }) => {
  const { layout } = useThemeContext();
  const showGrade =
    sequence.showGradeHeader && sequence.gradeName.trim().length > 0;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="w-full flex flex-col items-stretch justify-center px-8">
        {showGrade ? (
          <LiteGradeHeaderClassic gradeName={sequence.gradeName} />
        ) : null}
        {sequence.fixtures.map((match, fixtureIndex) => (
          <React.Fragment key={match.gameID}>
            {fixtureIndex > 0 ? (
              <LiteFixtureSeparatorClassic fixtureIndex={fixtureIndex} />
            ) : null}
            <LiteMatchCardClassic match={match} index={fixtureIndex} />
          </React.Fragment>
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

export default ResultsLiteDisplayClassic;
