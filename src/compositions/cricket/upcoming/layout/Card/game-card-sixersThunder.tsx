import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import TeamName from "../Meta/TeamName";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import Ground from "../Meta/Ground";
import { GameCardProps } from "./_types/GameCardProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
} from "./_utils/calculations";
import TeamLogo from "../../../utils/primitives/TeamLogo";
import { MetadataSmall } from "../../../utils/primitives/metadataSmall";
import { LOGO_SIZES } from "../Logos/variations/_utils/helpers";

export const GameCardSixersThunder: React.FC<GameCardProps> = ({
  game,
  index,
}) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();

  const ContainerAnimations = animations.container;

  // Animation delay based on card index
  const delay = calculateAnimationDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  return (
    <div className="overflow-hidden my-2">
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
          {/* Grade Section - Top */}
          <Ground
            ground={game.gradeName}
            delay={delay}
            backgroundColor="transparent"
          />
          {/* Team Names Section */}
          <TeamName
            teamName={game.teamHome}
            delay={delay + 10}
            delayName={delay + 20}
            className="text-center font-semibold text-2xl"
            style={{
              background:
                selectedPalette.container.backgroundTransparent.strong,
              textAlign: "center",
            }}
          />

          {/* Teams Section - Middle */}
          <AnimatedContainer
            type="full"
            className={`flex items-center justify-center w-full bg-black/20 p-0 ${layout.borderRadius.container}`}
            animation={ContainerAnimations.main.itemContainerSecondary.containerIn}
            animationDelay={delay}
            style={{
              background: selectedPalette.container.backgroundTransparent.medium,
            }}
          >
            {/* Home Team Logo */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1`}
              >
                <TeamLogo
                  logo={game.teamHomeLogo}
                  teamName={game.teamHome}
                  delay={delay + 15}
                  size={LOGO_SIZES.large.size}
                />
              </div>
            </div>

            {/* Middle Section: Ground, Date, Time */}
            <div className="mx-6 flex flex-col items-center">
              {/* Ground */}
              <MetadataSmall
                value={game.ground}
                animation={{
                  ...animations.text.main.copyIn,
                  delay: delay + 20,
                }}
                className="text-center mb-1"
                variant="onContainerCopy"
              />
              {/* Date and Time */}
              <div className="flex items-center gap-2 mt-1">
                <MetadataSmall
                  value={game.date}
                  animation={{
                    ...animations.text.main.copyIn,
                    delay: delay + 20,
                  }}
                  className="text-center"
                  variant="onContainerCopy"
                />
                <MetadataSmall
                  value={game.time}
                  animation={{
                    ...animations.text.main.copyIn,
                    delay: delay + 20,
                  }}
                  className="text-center"
                  variant="onContainerCopy"
                />
              </div>
            </div>

            {/* Away Team Logo */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1`}
              >
                <TeamLogo
                  logo={game.teamAwayLogo}
                  teamName={game.teamAway}
                  delay={delay + 20}
                  size={LOGO_SIZES.large.size}
                />
              </div>
            </div>
          </AnimatedContainer>
          <TeamName
            teamName={game.teamAway}
            delay={delay + 10}
            delayName={delay + 20}
            style={{
              background:
                selectedPalette.container.backgroundTransparent.strong,
              textAlign: "center",
            }}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardSixersThunder;
