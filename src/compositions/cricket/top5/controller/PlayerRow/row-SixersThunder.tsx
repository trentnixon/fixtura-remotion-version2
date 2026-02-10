import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { PlayerRowNameSixersThunder } from "../../layout/PlayerRowNameSixersThunder";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { PlayerRowProps } from "./_types/PlayerRowProps";
import {
  calculatePlayerDelay,
  calculateExitFrame,
} from "./_utils/calculations";

const PlayerRowSixersThunder: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { layout } = useThemeContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculatePlayerDelay(index);
  const animationOutFrame = calculateExitFrame(timings);

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <PlayerRowNameSixersThunder
          player={player}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
        />
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowSixersThunder;
