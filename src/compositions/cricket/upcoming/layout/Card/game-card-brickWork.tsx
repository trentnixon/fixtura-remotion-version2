import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { GameData } from "../../types";

import GroundTime from "../Meta/GroundTime";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LogosOnly } from "../Logos/variations";
import { TeamNameWrapped } from "../Meta/TeamName";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

interface GameCardProps {
  game: GameData;
  index: number;
}

export const GameCardBrickWork: React.FC<GameCardProps> = ({ game, index }) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();

  const ContainerAnimations = animations.container;

  // Animation delay based on card index
  const delay = index * 5;
  const animationOutFrame = (timings?.FPS_SCORECARD || 270) - 20;

  return (
    <div className="overflow-hidden my-2">
      <AnimatedContainer
        type="full"
        className="rounded-lg"
        backgroundColor="none"
        animation={ContainerAnimations.main.itemContainer.containerIn}
        animationDelay={delay}
        exitAnimation={ContainerAnimations.main.itemContainer.containerOut}
        exitFrame={animationOutFrame}
      >
        <div className="rounded-none w-full overflow-hidden">
          {/* Date/Ground Section - Bottom */}
          <GroundTime
            time={game.time}
            ground={game.ground}
            delay={delay}
            backgroundColor={"transparent"}
          />
          {/* Grade/Competition Section - Top */}
          <TeamNameWrapped
            teamName={game.teamHome}
            delay={delay}
            outerStyles={{
              background: selectedPalette.container.backgroundTransparent.low,
              borderBottom: `3px solid ${selectedPalette.container.primary}`,
            }}
            innerStyles={{
              background:
                selectedPalette.container.backgroundTransparent.medium,
            }}
          />

          {/* Teams Section - Middle */}
          <LogosOnly
            teamHome={game.teamHome}
            teamAway={game.teamAway}
            teamHomeLogo={game.teamHomeLogo}
            teamAwayLogo={game.teamAwayLogo}
            delay={delay + 10}
            vsAdditionalInfo={game.date}
            backgroundColor={
              selectedPalette.container.backgroundTransparent.subtle
            }
          />
          <TeamNameWrapped
            teamName={game.teamAway}
            delay={delay + 10}
            outerStyles={{
              background: selectedPalette.container.backgroundTransparent.low,
              borderBottom: `3px solid ${selectedPalette.container.secondary}`,
            }}
            innerStyles={{
              background: selectedPalette.container.backgroundTransparent.low,
            }}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardBrickWork;
