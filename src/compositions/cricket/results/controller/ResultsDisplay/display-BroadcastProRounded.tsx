import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { SponsorFooter } from "../../../sponsorFooter";
import MatchRowBroadcastProRounded from "../MatchRow/row-BroadcastProRounded";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import {
  calculateDisplayedResults,
  calculateRowHeight,
  mergeAssignSponsors,
} from "./_utils/calculations";
import { calculateAnimationOutFrame } from "../MatchRow/_utils/calculations";
import {
  getCompositionSectionHeight,
  getMainContentSectionHeight,
} from "../../../../../core/utils/layoutHeights";
import { RESULT_PANEL_CONTAINER_DELAY } from "../../../utils/broadcastProRounded/results/matchContentHelpers";

const ResultsDisplayBroadcastProRounded: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { heights } = layout;
  const panelAnimation = animations.container.main.itemContainerOuter;
  const panelExitFrame = calculateAnimationOutFrame(
    data.timings?.FPS_SCORECARD,
  );

  const { displayedResults } = calculateDisplayedResults(
    results,
    resultsPerScreen,
    screenIndex,
  );
  const mainContentHeight = getMainContentSectionHeight(heights);
  const compositionHeight = getCompositionSectionHeight(heights);
  const rowHeight = calculateRowHeight(mainContentHeight);
  const mergedAssignSponsors = mergeAssignSponsors(displayedResults);

  return (
    <div
      className="flex w-full flex-col"
      style={{ height: `${compositionHeight}px` }}
    >
      <AnimatedContainer
        type="full"
        className="flex flex-col overflow-hidden"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        animationDelay={RESULT_PANEL_CONTAINER_DELAY}
        exitAnimation={panelAnimation.containerOut}
        exitFrame={panelExitFrame}
        style={{ height: mainContentHeight }}
      >
        <div
          className={`flex w-full flex-col ${layout.spacing?.stack ?? "gap-1"}`}
          style={{ height: `${mainContentHeight}px` }}
        >
          {displayedResults.map((match, index) => (
            <div
              key={match.gameID}
              className="w-full min-h-0 flex-1"
              style={{
                height: `${rowHeight}px`,
                maxHeight: `${rowHeight}px`,
              }}
            >
              <MatchRowBroadcastProRounded
                match={match}
                index={index}
                rowHeight={rowHeight}
              />
            </div>
          ))}
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={mergedAssignSponsors} />
      </div>
    </div>
  );
};

export default ResultsDisplayBroadcastProRounded;
