import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { ScorelineCreaseMarkup } from "../../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";
import MatchRowScoreline from "../MatchRow/row-Scoreline";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import {
  calculateDisplayedResults,
  buildResultsFooterSponsors,
} from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import { ScorelineMatchSeparator } from "../../../utils/scoreline/results/ScorelineResultMatchContent";

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
  const footerSponsors = buildResultsFooterSponsors(displayedResults);

  return (
    <div
      className="flex h-full w-full flex-col"
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <AnimatedContainer
        type="full"
        className="min-h-0 flex-1 overflow-hidden rounded-none"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <main
          className="results-ledger"
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          {displayedResults.map((match, index) => (
            <React.Fragment key={match.gameID}>
              {index > 0 ? <ScorelineMatchSeparator /> : null}
              <MatchRowScoreline match={match} index={index} rowHeight={0} />
            </React.Fragment>
          ))}
        </main>
      </AnimatedContainer>

      <footer
        className="asset-footer"
        style={{ height: `${heights.footer}px`, maxHeight: `${heights.footer}px` }}
      >
        <div className="footer-crease" aria-hidden>
          <ScorelineCreaseMarkup />
        </div>
        <div className="sponsor-strip">
          <SponsorFooter sponsors={footerSponsors} />
        </div>
      </footer>
    </div>
  );
};

export default ResultsDisplayScoreline;
