import React from "react";
import { PlayerData } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import PlayerRowNameCNSWPrivate from "../../layout/PlayerRowNameCNSW-private";

interface PlayerRowProps {
  player: PlayerData;
  index: number;
  rowHeight: number;
}

const PlayerRowCNSWPrivate: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { layout } = useThemeContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = index * 5; // Stagger the animation of each row
  const animationOutFrame = (timings?.FPS_MAIN || 30) - 30;

  return (
    <div className="overflow-hidden mb-2">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container} ${index !== 0 ? "px-8" : ""} `}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <PlayerRowNameCNSWPrivate
          player={player}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
        />
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowCNSWPrivate;
