import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import MatchRowBroadcastPro from "../MatchRow/row-BroadcastPro";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import {
  calculateDisplayedResults,
  calculateBroadcastProResultsLayout,
  BROADCAST_PRO_RESULTS_GAP_PX,
  buildResultsFooterSponsors,
} from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const ResultsDisplayBroadcastPro: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const { heights } = layout;
  const panelAnimation = animations.container.main.itemContainerOuter;

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
          className="flex w-full flex-shrink-0 flex-col overflow-hidden rounded-none"
          backgroundColor="none"
          animation={panelAnimation.containerIn}
          exitAnimation={panelAnimation.containerOut}
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
                <MatchRowBroadcastPro
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

export default ResultsDisplayBroadcastPro;
