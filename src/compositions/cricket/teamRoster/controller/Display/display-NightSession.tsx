import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { NightSessionSponsorFooter } from "../../../../../templates/variants/nightSession/components/NightSessionSponsorFooter";
import { NightSessionAnimatedShell } from "../../../utils/nightSession/NightSessionAnimatedShell";
import { NightSessionRosterContent } from "../../../utils/nightSession/roster/NightSessionRosterContent";
import { csClass } from "../../../utils/scoreline/componentStyles";
import { RosterDisplayProps } from "./_types/RosterDisplayProps";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import { buildRosterFooterSponsors } from "../../_utils/buildRosterFooterSponsors";

const RosterDisplayNightSession: React.FC<RosterDisplayProps> = ({
  roster,
}) => {
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const footerSponsors = buildRosterFooterSponsors(roster);

  return (
    <div
      className={csClass(componentStyles, "nightSessionDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <NightSessionAnimatedShell
        className={csClass(componentStyles, "nightSessionAnimatedShell")}
      >
        <NightSessionRosterContent
          roster={roster}
          availableHeight={mainContentHeight}
        />
      </NightSessionAnimatedShell>

      <NightSessionSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="nightSessionRosterSponsorStrip"
      />
    </div>
  );
};

export default RosterDisplayNightSession;
