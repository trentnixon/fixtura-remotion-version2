import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import MatchCardScoreline from "../../layout/MatchCard/card-Scoreline";
import { MatchRowProps } from "./_types/MatchRowProps";
import {
  calculateDelay,
  calculateAnimationOutFrame,
} from "./_utils/calculations";

const MatchRowScoreline: React.FC<MatchRowProps> = ({ match, index }) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(timings?.FPS_SCORECARD);

  return (
    <div className="min-h-0 flex-1">
      <AnimatedContainer
        type="full"
        size="full"
        className="h-full min-h-0 w-full rounded-none"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <MatchCardScoreline match={match} index={index} rowHeight={0} delay={delay} />
      </AnimatedContainer>
    </div>
  );
};

export default MatchRowScoreline;
