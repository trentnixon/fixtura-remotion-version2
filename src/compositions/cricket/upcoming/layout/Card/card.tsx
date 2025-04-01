import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { GameData } from "../../types";

import GradeDate from "../Meta/GradeDate";
import GroundTime from "../Meta/GroundTime";
import { LogoAndName } from "../Logos/TeamLogoLayoutVariations";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

interface GameCardProps {
  game: GameData;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game, index }) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  // Animation delay based on card index
  const delay = index * 5;
  const animationOutFrame = timings?.FPS_GAMES - 20;

  return (
    <div className="overflow-hidden my-6">
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
          <GradeDate
            ageGroup={game.ageGroup}
            gradeName={game.gradeName}
            date={game.date}
            delay={delay}
          />

          {/* Teams Section - Middle */}
          <LogoAndName
            teamHome={game.teamHome}
            teamAway={game.teamAway}
            teamHomeLogo={game.teamHomeLogo}
            teamAwayLogo={game.teamAwayLogo}
            delay={delay}
            vsAdditionalInfo={game.date}
          />

          {/* Date/Ground Section - Bottom */}
          <GroundTime time={game.time} ground={game.ground} delay={delay} />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCard;
