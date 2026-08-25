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
  calculateBroadcastProResultsLayout,
  BROADCAST_PRO_RESULTS_GAP_PX,
  buildResultsFooterSponsors,
} from "./_utils/calculations";
import { calculateAnimationOutFrame } from "../MatchRow/_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
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
  const { listHeight, rowHeight } = calculateBroadcastProResultsLayout(
    mainContentHeight,
    displayedResults.length,
  );
  const footerSponsors = buildResultsFooterSponsors(displayedResults);

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className="flex min-h-0 flex-shrink-0 flex-col justify-center overflow-hidden"
        style={{
          height: `${mainContentHeight}px`,
          maxHeight: `${mainContentHeight}px`,
        }}
      >
        <AnimatedContainer
          type="full"
          className="flex w-full flex-shrink-0 flex-col overflow-hidden"
          backgroundColor="none"
          animation={panelAnimation.containerIn}
          animationDelay={RESULT_PANEL_CONTAINER_DELAY}
          exitAnimation={panelAnimation.containerOut}
          exitFrame={panelExitFrame}
        >
          <div
            className="flex w-full flex-col"
            style={{
              height: `${listHeight}px`,
              gap: `${BROADCAST_PRO_RESULTS_GAP_PX}px`,
            }}
          >
            {displayedResults.map((match, index) => (
              <div
                key={match.gameID}
                className="min-h-0 w-full flex-none"
                style={{
                  height: `${rowHeight}px`,
                  maxHeight: `${rowHeight}px`,
                  flexBasis: `${rowHeight}px`,
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
      </div>
      <div className="flex-shrink-0" style={{ height: `${heights.footer}px` }}>
        <SponsorFooter sponsors={footerSponsors} />
      </div>
    </div>
  );
};

export default ResultsDisplayBroadcastProRounded;
