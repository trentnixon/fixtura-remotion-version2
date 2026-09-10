import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { ScorelineSurfaceGrain } from "../../../../../templates/variants/scoreline/components/surface/ScorelineSurfaceGrain";
import MatchRowScoreline from "../MatchRow/row-Scoreline";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import {
  calculateDisplayedResults,
  buildResultsFooterSponsors,
} from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const SCORELINE_RESULTS_GAP_PX = 0;

const calculateScorelineResultsLayout = (
  availableHeight: number,
  resultCount: number,
): { listHeight: number; rowHeight: number } => {
  if (resultCount <= 0) {
    return { listHeight: 0, rowHeight: 0 };
  }

  const listHeight = Math.min(availableHeight, resultCount === 1 ? 900 : 980);
  const totalGap = SCORELINE_RESULTS_GAP_PX * (resultCount - 1);

  return {
    listHeight,
    rowHeight: Math.floor((listHeight - totalGap) / resultCount),
  };
};

const ResultsDisplayScoreline: React.FC<ResultsDisplayProps> = ({
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
  const { listHeight, rowHeight } = calculateScorelineResultsLayout(
    mainContentHeight,
    displayedResults.length,
  );
  const footerSponsors = buildResultsFooterSponsors(displayedResults);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div
        className="flex min-h-0 flex-shrink-0 flex-col overflow-hidden px-7"
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
              gap: `${SCORELINE_RESULTS_GAP_PX}px`,
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
                <MatchRowScoreline
                  match={match}
                  index={index}
                  rowHeight={rowHeight}
                />
              </div>
            ))}
          </div>
        </AnimatedContainer>
      </div>
      <div
        className="relative isolate flex-shrink-0 overflow-hidden px-3 pb-3"
        style={{ height: `${heights.footer}px` }}
      >
        <div
          className="relative isolate flex h-full min-h-[88px] w-full items-center justify-evenly gap-6 overflow-hidden px-6 py-4"
          style={{
            background:
              "linear-gradient(180deg, rgb(243 240 234 / 96%) 0%, rgb(243 240 234) 100%)",
            boxShadow: "inset 0 1px 0 rgb(255 255 255 / 55%)",
          }}
        >
          <ScorelineSurfaceGrain opacity={0.028} />
          <div className="relative z-[1] w-full">
            <SponsorFooter sponsors={footerSponsors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplayScoreline;
