import React from "react";
import { MatchResult } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import MatchCardSixersThunder from "../../layout/MatchCard/card-Sixers-thunder";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

interface MatchRowProps {
  match: MatchResult;
  index: number;
  rowHeight: number;
}

const MatchRowSixersThunder: React.FC<MatchRowProps> = ({
  match,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { layout } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = index * 5; // Base delay for animation
  const animationOutFrame = timings?.FPS_SCORECARD
    ? timings.FPS_SCORECARD - 20
    : 280;

  return (
    <div className="h-full w-full">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container} h-full w-full`}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <MatchCardSixersThunder
          match={match}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
        />
      </AnimatedContainer>
    </div>
  );
};

export default MatchRowSixersThunder;
