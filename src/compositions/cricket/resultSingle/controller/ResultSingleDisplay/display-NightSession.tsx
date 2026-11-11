import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { CricketSponsorFooter } from "../../../sponsorFooter/CricketSponsorFooter";
import { NightSessionAnimatedShell } from "../../../utils/nightSession/NightSessionAnimatedShell";
import { csClass } from "../../../utils/overlayFamily";
import { NightSessionResultSingleContent } from "../../../utils/nightSession/results/NightSessionResultSingleContent";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const ResultSingleDisplayNightSession: React.FC<ResultSingleDisplayProps> = ({
  match,
}) => {
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const mainContentHeight = getMainContentSectionHeight(heights);

  return (
    <div
      className={csClass(componentStyles, "nightSessionDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <NightSessionAnimatedShell
        className={csClass(componentStyles, "nightSessionAnimatedShell")}
      >
        <main
          className={`results-ledger results-ledger--single ${csClass(componentStyles, "nightSessionResultsLedger")}`}
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <NightSessionResultSingleContent
            match={match}
            style={{ maxHeight: mainContentHeight }}
            bandLogoBackground
          />
        </main>
      </NightSessionAnimatedShell>

      <CricketSponsorFooter
        assignSponsors={match.assignSponsors}
        primaryForScreen={match.primaryForScreen}
        sponsorStripKey="nightSessionResultsSponsorStrip"
      />
    </div>
  );
};

export default ResultSingleDisplayNightSession;
