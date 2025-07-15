import React from "react";
import { MatchResult } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import MatchCardBrickWork from "../../layout/MatchCard/card-BrickWork";

interface MatchRowProps {
  match: MatchResult;
  index: number;
  rowHeight: number;
}

const MatchRowBrickWork: React.FC<MatchRowProps> = ({
  match,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = index * 5; // Base delay for animation
  const animationOutFrame = timings?.FPS_SCORECARD
    ? timings.FPS_SCORECARD - 20
    : 280;

  return (
    <div className="h-full w-full">
      <AnimatedContainer
        type="full"
        className="rounded-md h-full w-full"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <MatchCardBrickWork
          match={match}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
        />
      </AnimatedContainer>
    </div>
  );
};

export default MatchRowBrickWork;
