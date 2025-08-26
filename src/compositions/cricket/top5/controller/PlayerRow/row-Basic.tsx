import React from "react";
import { PlayerData } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";

import StandardPlayerRow from "../../layout/StandardPlayerRow";

interface PlayerRowProps {
  player: PlayerData;
  index: number;
  rowHeight: number;
}

const PlayerRowBasic: React.FC<PlayerRowProps> = ({
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
        <StandardPlayerRow
          player={player}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
          restrictions={{ nameLength: 20, teamLength: 35 }}
        />
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowBasic;
