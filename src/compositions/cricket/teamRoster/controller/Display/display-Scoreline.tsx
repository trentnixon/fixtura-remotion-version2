import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ScorelineRosterContent } from "../../../utils/scoreline/roster/ScorelineRosterContent";
import { ScorelineSponsorFooter } from "../../../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import { csClass } from "../../../utils/scoreline/componentStyles";
import { RosterDisplayProps } from "./_types/RosterDisplayProps";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import { buildRosterFooterSponsors } from "../../_utils/buildRosterFooterSponsors";

const RosterDisplayScoreline: React.FC<RosterDisplayProps> = ({ roster }) => {
  const { animations } = useAnimationContext();
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const footerSponsors = buildRosterFooterSponsors(roster);

  return (
    <div
      className={csClass(componentStyles, "scorelineDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <AnimatedContainer
        type="full"
        className={csClass(componentStyles, "scorelineAnimatedShell")}
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <ScorelineRosterContent
          roster={roster}
          availableHeight={mainContentHeight}
        />
      </AnimatedContainer>

      <ScorelineSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="scorelineRosterSponsorStrip"
      />
    </div>
  );
};

export default RosterDisplayScoreline;
