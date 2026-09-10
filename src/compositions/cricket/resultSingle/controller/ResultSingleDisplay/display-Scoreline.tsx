import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { ScorelineSurfaceGrain } from "../../../../../templates/variants/scoreline/components/surface/ScorelineSurfaceGrain";
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
    <div className="flex h-full w-full flex-col bg-white">
      <div
        className="flex min-h-0 flex-col justify-center overflow-hidden px-7"
        style={{
          height: `${mainContentHeight}px`,
          maxHeight: `${mainContentHeight}px`,
        }}
      >
        <AnimatedContainer
          type="full"
          className="flex w-full flex-shrink-0 flex-col overflow-hidden rounded-none"
          backgroundColor="none"
          animation={containerAnimation.containerIn}
        >
          <MatchCardScoreline match={match} contentHeight={mainContentHeight} />
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
            <SponsorFooter
              assignSponsors={match.assignSponsors}
              primaryForScreen={match.primaryForScreen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSingleDisplayScoreline;
