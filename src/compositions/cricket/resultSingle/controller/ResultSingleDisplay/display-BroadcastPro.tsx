import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import MatchCardBroadcastPro from "../../layout/MatchCard/card-BroadcastPro";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";

const ResultSingleDisplayBroadcastPro: React.FC<ResultSingleDisplayProps> = ({
  match,
}) => {
  const { layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const { heights } = layout;
  const containerAnimation = animations.container.main.itemContainer;

  return (
    <div className="flex h-full w-full flex-col">
      <AnimatedContainer
        type="full"
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-none"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
      >
        <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
          <MatchCardBroadcastPro match={match} />
        </div>
      </AnimatedContainer>
      <div
        className="flex-shrink-0"
        style={{ height: `${heights.footer}px` }}
      >
        <SponsorFooter assignSponsors={match.assignSponsors} />
      </div>
    </div>
  );
};

export default ResultSingleDisplayBroadcastPro;
