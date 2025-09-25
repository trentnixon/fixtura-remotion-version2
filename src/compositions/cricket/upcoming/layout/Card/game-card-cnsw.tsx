import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { GameData } from "../../types";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import TeamName from "../Meta/TeamName";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SingleDataPointHeader } from "../Meta/SingleDataPointHeader";

interface GameCardProps {
  game: GameData;
  index: number;
}

export const GameCardCNSW: React.FC<GameCardProps> = ({ game, index }) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();

  const ContainerAnimations = animations.container;

  // Animation delay based on card index
  const delay = index * 15;
  const animationOutFrame = (timings?.FPS_SCORECARD || 270) - 20;

  return (
    <div className="overflow-hidden my-4">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={ContainerAnimations.main.itemContainer.containerIn}
        animationDelay={delay}
        exitAnimation={ContainerAnimations.main.itemContainer.containerOut}
        exitFrame={animationOutFrame}
      >
        <div
          className={`${layout.borderRadius.container} w-full overflow-hidden`}
        >
          <SingleDataPointHeader
            value={game.time}
            height={100}
            delay={delay}
            backgroundColor={"transparent"}
            align="right"
            variant="onBackgroundMain"
          />
          {/* Grade/Competition Section - Top */}
          <TeamName
            teamName={game.teamHome}
            delay={delay + 10}
            delayName={delay + 20}
            style={{
              background: selectedPalette.background.userSecondary,
            }}
            className="text-left"
            variant="onBackgroundMain"
          />
          <SingleDataPointHeader
            value={"vs"}
            height={100}
            delay={delay}
            backgroundColor={"transparent"}
            align="left"
            variant="onBackgroundMain"
          />
          <TeamName
            teamName={game.teamAway}
            delay={delay + 10}
            delayName={delay + 20}
            style={{
              background: selectedPalette.background.userSecondary,
            }}
            className="text-left"
            variant="onBackgroundMain"
          />
          <SingleDataPointHeader
            value={game.ground}
            height={100}
            delay={delay}
            backgroundColor={"transparent"}
            align="right"
            variant="onBackgroundMain"
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardCNSW;
