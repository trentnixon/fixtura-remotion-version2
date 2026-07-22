import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import {
  DiagonalEnergyAccent,
  isFeaturedRow,
  MasonryRow,
} from "../../../../../templates/variants/brickwork/design";
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
    <MasonryRow index={index} className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className="relative rounded-lg"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        {isFeaturedRow(index) && (
          <DiagonalEnergyAccent edge="trailing" shape="diagonalBand" />
        )}
        <div className="relative z-10">
          <PlayerRowNameLogoWrapperValue
          player={player}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
          restrictions={getDefaultRestrictions()}
        />
        </div>
      </AnimatedContainer>
    </MasonryRow>
  );
};

export default PlayerRowBrickWork;
