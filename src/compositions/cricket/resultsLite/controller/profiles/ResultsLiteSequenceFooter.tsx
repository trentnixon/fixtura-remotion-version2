import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { CricketSponsorFooter } from "../../../sponsorFooter/CricketSponsorFooter";
import { SponsorFooter } from "../../../sponsorFooter";
import { buildResultsFooterSponsors } from "../../../results/controller/ResultsDisplay/_utils/calculations";
import type { ResultsLiteSequence } from "../upstreamResultsLiteData";
import type { ResultsLiteVariantConfig } from "../resultsLiteVariantMatrix";

export const ResultsLiteSequenceFooter: React.FC<{
  sequence: ResultsLiteSequence;
  config: ResultsLiteVariantConfig;
}> = ({ sequence, config }) => {
  const { layout } = useThemeContext();
  const sponsors = buildResultsFooterSponsors(sequence.fixtures);

  if (config.footer === "cricketSponsor" && config.sponsorStripKey) {
    return (
      <CricketSponsorFooter
        sponsors={sponsors}
        sponsorStripKey={config.sponsorStripKey}
      />
    );
  }

  return (
    <div style={{ height: `${layout.heights.footer}px` }}>
      <SponsorFooter sponsors={sponsors} />
    </div>
  );
};
