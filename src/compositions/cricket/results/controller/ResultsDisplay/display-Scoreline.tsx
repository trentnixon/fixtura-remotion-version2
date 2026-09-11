import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ScorelineSponsorFooter } from "../../../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import { csClass } from "../../../utils/scoreline/componentStyles";
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
  const { layout, componentStyles } = useThemeContext();
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
        <main
          className={`results-ledger ${csClass(componentStyles, "scorelineResultsLedger")}`}
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

      <ScorelineSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="scorelineResultsSponsorStrip"
      />
    </div>
  );
};

export default ResultsDisplayScoreline;
