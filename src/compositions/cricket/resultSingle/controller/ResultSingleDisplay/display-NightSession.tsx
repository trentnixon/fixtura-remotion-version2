import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { NightSessionSponsorFooter } from "../../../../../templates/variants/nightSession/components/NightSessionSponsorFooter";
import { csClass } from "../../../utils/scoreline/componentStyles";
import { NightSessionResultSingleContent } from "../../../utils/nightSession/results/NightSessionResultSingleContent";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const ResultSingleDisplayNightSession: React.FC<ResultSingleDisplayProps> = ({
  match,
}) => {
  const { layout, componentStyles } = useThemeContext();
  const { animations } = useAnimationContext();
  const { heights } = layout;
  const containerAnimation = animations.container.main.itemContainer;
  const mainContentHeight = getMainContentSectionHeight(heights);

  return (
    <div
      className={csClass(componentStyles, "nightSessionDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <AnimatedContainer
        type="full"
        className={csClass(componentStyles, "nightSessionAnimatedShell")}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        exitAnimation={containerAnimation.containerOut}
      >
        <main
          className={`results-ledger results-ledger--single ${csClass(componentStyles, "nightSessionResultsLedger")}`}
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <NightSessionResultSingleContent
            match={match}
            style={{ maxHeight: mainContentHeight }}
          />
        </main>
      </AnimatedContainer>

      <NightSessionSponsorFooter
        assignSponsors={match.assignSponsors}
        primaryForScreen={match.primaryForScreen}
        sponsorStripKey="nightSessionResultsSponsorStrip"
      />
    </div>
  );
};

export default ResultSingleDisplayNightSession;
