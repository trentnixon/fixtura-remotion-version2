import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ScorelineRosterContent } from "../../../utils/scoreline/roster/ScorelineRosterContent";
import { ScorelineSponsorFooter } from "../../../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import { RosterDisplayProps } from "./_types/RosterDisplayProps";
import {
  DEFAULT_CONTAINER_ANIMATION,
  DEFAULT_CONTAINER_EXIT_ANIMATION,
} from "./_utils/animations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const RosterDisplayScoreline: React.FC<RosterDisplayProps> = ({ roster }) => {
  const { layout } = useThemeContext();
  const mainContentHeight = getMainContentSectionHeight(layout.heights);

  return (
    <>
      <AnimatedContainer
        type="full"
        className="min-h-0 flex-1 overflow-hidden rounded-none"
        backgroundColor="none"
        animation={DEFAULT_CONTAINER_ANIMATION}
        animationDelay={0}
        exitAnimation={DEFAULT_CONTAINER_EXIT_ANIMATION}
      >
        <ScorelineRosterContent
          roster={roster}
          availableHeight={mainContentHeight}
        />
      </AnimatedContainer>
      <ScorelineSponsorFooter
        assignSponsors={roster.assignSponsors}
        primaryForScreen={roster.primaryForScreen}
      />
    </>
  );
};

export default RosterDisplayScoreline;
