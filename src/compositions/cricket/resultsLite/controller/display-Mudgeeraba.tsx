import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../sponsorFooter";
import { buildResultsFooterSponsors } from "../../results/controller/ResultsDisplay/_utils/calculations";
import { LiteFixtureSeparatorMudgeeraba } from "../layout/LiteFixtureSeparator-Mudgeeraba";
import { LiteGradeHeaderMudgeeraba } from "../layout/LiteGradeHeader-Mudgeeraba";
import { LiteMatchCardMudgeeraba } from "../layout/LiteMatchCard-Mudgeeraba";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";

export { RESULTS_LITE_PER_SCREEN as RESULTS_LITE_MUDGEERABA_PER_SCREEN } from "./display-Basic";

/** Layout aligned with full Mudgeeraba Results — stacked team stripes + primary result bar. */
const ResultsLiteDisplayMudgeeraba: React.FC<{
  sequence: ResultsLiteSequence;
}> = ({ sequence }) => {
  const { layout } = useThemeContext();
  const showGrade =
    sequence.showGradeHeader && sequence.gradeName.trim().length > 0;

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className="flex w-full flex-col justify-center"
        style={{ height: `${layout.heights.asset}px` }}
      >
        {showGrade ? (
          <LiteGradeHeaderMudgeeraba gradeName={sequence.gradeName} />
        ) : null}
        {sequence.fixtures.map((match, fixtureIndex) => (
          <React.Fragment key={match.gameID}>
            {fixtureIndex > 0 ? <LiteFixtureSeparatorMudgeeraba /> : null}
            <LiteMatchCardMudgeeraba match={match} index={fixtureIndex} />
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

export default ResultsLiteDisplayMudgeeraba;
