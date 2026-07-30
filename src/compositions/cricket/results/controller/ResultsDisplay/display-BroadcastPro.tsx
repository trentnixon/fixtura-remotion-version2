import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import MatchRowBroadcastPro from "../MatchRow/row-BroadcastPro";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import {
  calculateDisplayedResults,
  calculateRowHeight,
  mergeAssignSponsors,
} from "./_utils/calculations";
import {
  getCompositionSectionHeight,
  getMainContentSectionHeight,
} from "../../../../../core/utils/layoutHeights";

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
        className="flex flex-col overflow-hidden rounded-none"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
        style={{ height: mainContentHeight }}
      >
        <div
          className="flex w-full flex-col gap-0"
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
        <SponsorFooter assignSponsors={mergedAssignSponsors} />
      </div>
    </div>
  );
};

export default ResultsDisplayBroadcastPro;
