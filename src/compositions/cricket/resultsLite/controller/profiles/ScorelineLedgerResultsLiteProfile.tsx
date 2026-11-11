import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { CricketSponsorFooter } from "../../../sponsorFooter/CricketSponsorFooter";
import { buildResultsFooterSponsors } from "../../../results/controller/ResultsDisplay/_utils/calculations";
import {
  csClass,
  planResultsLedgerLayout,
  resolveResultsLedgerThemeKeys,
} from "../../../utils/overlayFamily";
import { getResultsLiteGradeState } from "./resultsLiteGrade";
import type { ResultsLiteProfileProps } from "./resultsLiteProfileTypes";

export const ScorelineLedgerResultsLiteProfile: React.FC<
  ResultsLiteProfileProps
> = ({ sequence, config }) => {
  const { layout, componentStyles } = useThemeContext();
  const { animations } = useAnimationContext();
  const themeKeys = resolveResultsLedgerThemeKeys("scoreline");
  const layoutPlan = planResultsLedgerLayout(layout.heights);
  const { gradeName, showGrade } = getResultsLiteGradeState(sequence, config);
  const { MatchCard, GradeHeader } = config.components;
  const panelAnimation = animations.container.main.itemContainerOuter;
  const footerSponsors = buildResultsFooterSponsors(sequence.fixtures);

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
          className={`results-ledger results-lite-scoreline-ledger ${csClass(componentStyles, themeKeys.resultsLedger)}`}
          style={{
            height: `${layoutPlan.mainContentHeight}px`,
            maxHeight: `${layoutPlan.mainContentHeight}px`,
          }}
        >
          {showGrade && GradeHeader ? (
            <GradeHeader gradeName={gradeName} />
          ) : null}
          {sequence.fixtures.map((match, fixtureIndex) => (
            <MatchCard
              key={match.gameID}
              match={match}
              index={fixtureIndex}
            />
          ))}
        </main>
      </AnimatedContainer>
      <CricketSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey={
          config.sponsorStripKey ?? themeKeys.sponsorStrip
        }
      />
    </div>
  );
};
