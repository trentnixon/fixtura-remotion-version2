import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import PlayerRowNameLogoWrapperValue from "../../layout/PlayerRowNameLogoWrapperValue";
import { PlayerRowProps } from "./_types/PlayerRowProps";
import {
  calculatePlayerDelay,
  calculateExitFrame,
} from "./_utils/calculations";
import { getDefaultRestrictions } from "./_utils/helpers";

const PlayerRowBrickWork: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculatePlayerDelay(index);
  const animationOutFrame = calculateExitFrame(timings);

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
        <PlayerRowNameLogoWrapperValue
          player={player}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
          restrictions={getDefaultRestrictions()}
        />
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowBrickWork;
