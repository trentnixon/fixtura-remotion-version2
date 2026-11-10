import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../sponsorFooter";
import {
  BROADCAST_PRO_RESULTS_GAP_PX,
  buildResultsFooterSponsors,
} from "../../results/controller/ResultsDisplay/_utils/calculations";
import { LiteGradeHeaderBroadcastPro } from "../layout/LiteGradeHeader-BroadcastPro";
import { LiteMatchCardBroadcastPro } from "../layout/LiteMatchCard-BroadcastPro";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";

export { RESULTS_LITE_PER_SCREEN as RESULTS_LITE_BROADCAST_PRO_PER_SCREEN } from "./display-Basic";

const ResultsLiteDisplayBroadcastPro: React.FC<{
  sequence: ResultsLiteSequence;
}> = ({ sequence }) => {
  const { layout } = useThemeContext();
  const showGrade =
    sequence.showGradeHeader && sequence.gradeName.trim().length > 0;

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className="flex w-full flex-col justify-center overflow-hidden"
        style={{ height: `${layout.heights.asset}px` }}
      >
        {showGrade ? (
          <LiteGradeHeaderBroadcastPro gradeName={sequence.gradeName} />
        ) : null}
        <div
          className="flex w-full flex-col"
          style={{ gap: `${BROADCAST_PRO_RESULTS_GAP_PX}px` }}
        >
          {sequence.fixtures.map((match, fixtureIndex) => (
            <LiteMatchCardBroadcastPro
              key={match.gameID}
              match={match}
              index={fixtureIndex}
            />
          ))}
        </div>
      </div>
      <div style={{ height: `${layout.heights.footer}px` }}>
        <SponsorFooter
          sponsors={buildResultsFooterSponsors(sequence.fixtures)}
        />
      </div>
    </div>
  );
};

export default ResultsLiteDisplayBroadcastPro;
