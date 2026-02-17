import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import Ground from "../Meta/Ground";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { TeamNameWrapped } from "../Meta/TeamName";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { GameCardProps } from "./_types/GameCardProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  FAST_DELAY_MULTIPLIER,
} from "./_utils/calculations";
import TeamLogo from "../../../utils/primitives/TeamLogo";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
export const GameCardBrickWork: React.FC<GameCardProps> = ({ game, index }) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();

  const ContainerAnimations = animations.container;

  const delay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
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
        <div className={`${layout.borderRadius.container} w-full overflow-hidden`}>
          {/* Grade Section - Top */}
          <Ground
            ground={game.gradeName}
            delay={delay}
            backgroundColor="transparent"
          />

          {/* Team Names Section */}
          <TeamNameWrapped
            teamName={game.teamHome}
            delay={delay}
            variant="onContainerCopyNoBg"
            outerStyles={{
              background: selectedPalette.container.backgroundTransparent.medium,
            }}
            innerStyles={{
              background: selectedPalette.container.backgroundTransparent.medium,
            }}
          />

          {/* Teams Section - Logos + Metadata */}
          <AnimatedContainer
            type="full"
            className={`flex items-center justify-center w-full gap-2 p-0 ${layout.borderRadius.container}`}
            animation={ContainerAnimations.main.itemContainerSecondary.containerIn}
            animationDelay={delay + 10}
            style={{
              background: selectedPalette.container.backgroundTransparent.medium,
            }}
          >
            {/* Home Team Logo - 20% */}
            <div
              className="overflow-hidden"
              style={{ flex: "2 0 0", height: 140 }}
            >
              <div className="w-full h-full">
                <TeamLogo
                  logo={game.teamHomeLogo}
                  teamName={game.teamHome}
                  delay={delay + 15}
                  fit="cover"
                  imgStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Middle: Ground, Date, Time - 60% */}
            <div
              className="flex flex-col items-center justify-center gap-1 px-2 min-w-0"
              style={{ flex: "6 0 0" }}
            >
              <MetadataMedium
                value={game.ground}
                animation={{
                  ...animations.text.main.copyIn,
                  delay: delay + 20,
                }}
                className="text-center"
                variant="onContainerCopyNoBg"
              />
              <div className="flex items-center gap-2">
                <MetadataMedium
                  value={game.date}
                  animation={{
                    ...animations.text.main.copyIn,
                    delay: delay + 20,
                  }}
                  className="text-center"
                  variant="onContainerCopyNoBg"
                />
                <MetadataMedium
                  value={game.time}
                  animation={{
                    ...animations.text.main.copyIn,
                    delay: delay + 20,
                  }}
                  className="text-center"
                  variant="onContainerCopyNoBg"
                />
              </div>
            </div>

            {/* Away Team Logo - 20% */}
            <div
              className="overflow-hidden"
              style={{ flex: "2 0 0", height: 140 }}
            >
              <div className="w-full h-full">
                <TeamLogo
                  logo={game.teamAwayLogo}
                  teamName={game.teamAway}
                  delay={delay + 20}
                  fit="cover"
                  imgStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </AnimatedContainer>

          <TeamNameWrapped
            teamName={game.teamAway}
            delay={delay + 10}
            variant="onContainerCopyNoBg"
            outerStyles={{
              background: selectedPalette.container.backgroundTransparent.medium,
            }}
            innerStyles={{
              background: selectedPalette.container.backgroundTransparent.medium,
            }}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardBrickWork;
