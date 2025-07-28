import React from "react";
import { PlayerData } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import PlayerRowNameSixers from "../../layout/PlayerRowNameSixers";

interface PlayerRowProps {
  player: PlayerData;
  index: number;
  rowHeight: number;
}

const PlayerRowSixers: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = index * 5; // Stagger the animation of each row
  const animationOutFrame = (timings?.FPS_MAIN || 30) - 30;

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className="rounded-lg"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <PlayerRowNameSixers
          player={player}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
        />
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowSixers;
