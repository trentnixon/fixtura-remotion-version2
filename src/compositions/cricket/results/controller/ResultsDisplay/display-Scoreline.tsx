import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { CricketSponsorFooter } from "../../../sponsorFooter/CricketSponsorFooter";
import MatchRowScoreline from "../MatchRow/row-Scoreline";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import { ScorelineMatchSeparator } from "../../../utils/scoreline/results/ScorelineResultMatchContent";
import { csClass, planResultsLedgerScreen } from "../../../utils/overlayFamily";

const ResultsDisplayScoreline: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { layout, componentStyles } = useThemeContext();
  const { animations } = useAnimationContext();
  const { heights } = layout;
  const panelAnimation = animations.container.main.itemContainerOuter;

  const plan = planResultsLedgerScreen({
    family: "scoreline",
    results,
    resultsPerScreen,
    screenIndex,
    heights,
  });
  const {
    themeKeys,
    layout: layoutPlan,
    displayedResults,
    footerSponsors,
  } = plan;

  return (
    <div
      className={csClass(componentStyles, themeKeys.displayColumn)}
      style={{ height: `${layoutPlan.columnHeight}px` }}
    >
      <AnimatedContainer
        type="full"
        className={csClass(componentStyles, themeKeys.animatedShell)}
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <main
          className={`results-ledger ${csClass(componentStyles, themeKeys.resultsLedger)}`}
          style={{
            height: `${layoutPlan.mainContentHeight}px`,
            maxHeight: `${layoutPlan.mainContentHeight}px`,
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

      <CricketSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey={themeKeys.sponsorStrip}
      />
    </div>
  );
};

export default ResultsDisplayScoreline;
