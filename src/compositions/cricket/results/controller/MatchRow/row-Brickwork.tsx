import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import MatchCardBrickWork from "../../layout/MatchCard/card-BrickWork";
import MatchCardBrickWorkClubOnly from "../../layout/MatchCard/card-BrickWork-clubOnly";
import { MatchRowProps } from "./_types/MatchRowProps";
import { calculateDelay, calculateAnimationOutFrame } from "./_utils/calculations";

const MatchRowBrickWork: React.FC<MatchRowProps> = ({
  match,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data, isAccountClub } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(timings?.FPS_SCORECARD);

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
        {
          isAccountClub ? (
            <MatchCardBrickWorkClubOnly
              match={match}
              index={index}
              rowHeight={rowHeight}
              delay={delay}
            />
          ) : (
            <MatchCardBrickWork
              match={match}
              index={index}
              rowHeight={rowHeight}
              delay={delay}
            />
          )
        }
      </AnimatedContainer>
    </div>
  );
};

export default MatchRowBrickWork;
