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
import {
  getCompositionSectionHeight,
  getMainContentSectionHeight,
} from "../../../../../core/utils/layoutHeights";
import { useBroadcastProTheme } from "../../../utils/broadcastPro";

const ResultsDisplayBroadcastPro: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const { glass } = useBroadcastProTheme();
  const { heights } = layout;
  const panelAnimation = animations.container.main.itemContainerOuter;

  const { displayedResults } = calculateDisplayedResults(
    results,
    resultsPerScreen,
    screenIndex,
  );
  const mainContentHeight = getMainContentSectionHeight(heights);
  const compositionHeight = getCompositionSectionHeight(heights);
  const { listHeight, rowHeight } = calculateBroadcastProResultsLayout(
    mainContentHeight,
    displayedResults.length,
  );
  const footerSponsors = buildResultsFooterSponsors(displayedResults);

  return (
    <div
      className="flex w-full flex-col"
      style={{ height: `${compositionHeight}px` }}
    >
      <AnimatedContainer
        type="full"
        className="flex flex-col justify-center overflow-hidden rounded-none"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
        style={{ height: mainContentHeight, background: glass.muted }}
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
              className="w-full min-h-0 flex-none"
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
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter sponsors={footerSponsors} />
      </div>
    </div>
  );
};

export default ResultsDisplayBroadcastPro;
