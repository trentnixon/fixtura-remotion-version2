import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { GameData } from "../../types";

import GroundTime from "../Meta/GroundTime";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LogosOnly } from "../Logos/variations";
import TeamName from "../Meta/TeamName";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

interface GameCardProps {
  game: GameData;
  index: number;
}

export const GameCardBasic: React.FC<GameCardProps> = ({ game, index }) => {
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
        <div className="rounded-lg w-full overflow-hidden">
          {/* Grade/Competition Section - Top */}
          <TeamName
            teamName={game.teamHome}
            delay={delay}
            style={{
              background:
                selectedPalette.container.backgroundTransparent.strong,
              textAlign: "center",
              borderRadius: "10px 10px 0 0px",
            }}
          />

          {/* Teams Section - Middle */}
          <LogosOnly
            teamHome={game.teamHome}
            teamAway={game.teamAway}
            teamHomeLogo={game.teamHomeLogo}
            teamAwayLogo={game.teamAwayLogo}
            delay={delay}
            vsAdditionalInfo={game.date}
            backgroundColor={
              selectedPalette.container.backgroundTransparent.low
            }
          />
          <TeamName
            teamName={game.teamAway}
            delay={delay}
            style={{
              background:
                selectedPalette.container.backgroundTransparent.strong,
              textAlign: "center",
              borderRadius: "0 0 10px 10px",
            }}
          />
          {/* Date/Ground Section - Bottom */}
          <GroundTime
            time={game.time}
            ground={game.ground}
            delay={delay}
            backgroundColor={"transparent"}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardBasic;
