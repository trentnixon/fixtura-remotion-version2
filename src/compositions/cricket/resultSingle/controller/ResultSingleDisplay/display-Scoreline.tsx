import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { ScorelineCreaseMarkup } from "../../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";
import MatchCardScoreline from "../../layout/MatchCard/card-Scoreline";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const ResultSingleDisplayScoreline: React.FC<ResultSingleDisplayProps> = ({
  match,
}) => {
  const { layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const { heights } = layout;
  const containerAnimation = animations.container.main.itemContainer;
  const mainContentHeight = getMainContentSectionHeight(heights);

  return (
    <div
      className="flex h-full w-full flex-col"
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <AnimatedContainer
        type="full"
        className="min-h-0 flex-1 overflow-hidden rounded-none"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
      >
        <main
          className="results-ledger results-ledger--single"
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <MatchCardScoreline match={match} contentHeight={mainContentHeight} />
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
          <SponsorFooter
            assignSponsors={match.assignSponsors}
            primaryForScreen={match.primaryForScreen}
          />
        </div>
      </footer>
    </div>
  );
};

export default ResultSingleDisplayScoreline;
