import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ScorelineSponsorFooter } from "../../../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import { csClass } from "../../../utils/scoreline/componentStyles";
import MatchCardScoreline from "../../layout/MatchCard/card-Scoreline";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const ResultSingleDisplayScoreline: React.FC<ResultSingleDisplayProps> = ({
  match,
}) => {
  const { layout, componentStyles } = useThemeContext();
  const { animations } = useAnimationContext();
  const { heights } = layout;
  const containerAnimation = animations.container.main.itemContainer;
  const mainContentHeight = getMainContentSectionHeight(heights);

  return (
    <div
      className={csClass(componentStyles, "scorelineDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <AnimatedContainer
        type="full"
        className={csClass(componentStyles, "scorelineAnimatedShell")}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        exitAnimation={containerAnimation.containerOut}
      >
        <main
          className={`results-ledger results-ledger--single ${csClass(componentStyles, "scorelineResultsLedger")}`}
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <MatchCardScoreline match={match} contentHeight={mainContentHeight} />
        </main>
      </AnimatedContainer>

      <ScorelineSponsorFooter
        assignSponsors={match.assignSponsors}
        primaryForScreen={match.primaryForScreen}
        sponsorStripKey="scorelineResultsSponsorStrip"
      />
    </div>
  );
};

export default ResultSingleDisplayScoreline;
