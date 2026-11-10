import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { ScorelineResultMatchContent } from "../../utils/scoreline/results/ScorelineResultMatchContent";
import { MatchResult } from "../../results/_types/types";
import {
  calculateAnimationOutFrame,
  calculateDelay,
} from "../../results/controller/MatchRow/_utils/calculations";

export const LiteMatchCardScoreline: React.FC<{
  match: MatchResult;
  index: number;
}> = ({ match, index }) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(
    data.timings?.FPS_SCORECARD,
  );

  return (
    <AnimatedContainer
      type="full"
      size="full"
      className="flex shrink-0 flex-col rounded-none"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={animationOutFrame}
    >
      <ScorelineResultMatchContent
        match={match}
        rowDelay={delay}
        exitFrame={animationOutFrame}
        showPerformancePanels={false}
        showMatchContext={false}
        showTeamRole={false}
        bandLogoBackground
        className="results-lite-scoreline h-full w-full"
      />
    </AnimatedContainer>
  );
};
