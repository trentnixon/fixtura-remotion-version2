import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import MatchCardClassicTwoColumn from "../../layout/MatchCard/card-classic-twocolumn";
import { MatchRowProps } from "./_types/MatchRowProps";
import { calculateDelay, calculateAnimationOutFrame } from "./_utils/calculations";

const MatchRowClassicTwoColumn: React.FC<MatchRowProps> = ({
  match,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { layout } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(timings?.FPS_SCORECARD);

  return (
    <div className="h-full w-full flex p-0 items-center">
      <AnimatedContainer
        size="full"
        className={`${layout.borderRadius.container} h-full`}
        backgroundColor="none"
        style={{ width: "100% !important" }}
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <MatchCardClassicTwoColumn
          match={match}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
        />
      </AnimatedContainer>
    </div>
  );
};

export default MatchRowClassicTwoColumn;
