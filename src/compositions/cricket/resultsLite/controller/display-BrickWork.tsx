import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../sponsorFooter";
import { buildResultsFooterSponsors } from "../../results/controller/ResultsDisplay/_utils/calculations";
import { LiteGradeHeaderBrickWork } from "../layout/LiteGradeHeader-BrickWork";
import { LiteMatchCardBrickWork } from "../layout/LiteMatchCard-BrickWork";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";

/** Same fixture count as Basic — four lite rows per sequence screen. */
export { RESULTS_LITE_PER_SCREEN } from "./display-Basic";

const ResultsLiteDisplayBrickWork: React.FC<{
  sequence: ResultsLiteSequence;
}> = ({ sequence }) => {
  const { layout } = useThemeContext();
  const showGrade =
    sequence.showGradeHeader && sequence.gradeName.trim().length > 0;

  return (
    <div className="flex flex-col h-full w-full">
      <div
        className="w-full flex flex-col items-stretch justify-center gap-[30px] px-8"
        style={{ height: `${layout.heights.asset}px` }}
      >
        {showGrade ? (
          <LiteGradeHeaderBrickWork gradeName={sequence.gradeName} />
        ) : null}
        {sequence.fixtures.map((match, fixtureIndex) => (
          <div key={match.gameID} className="w-full">
            <LiteMatchCardBrickWork match={match} index={fixtureIndex} />
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

export default ResultsLiteDisplayBrickWork;
