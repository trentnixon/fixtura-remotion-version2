import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import TeamName from "../Meta/TeamName";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SingleDataPointHeader } from "../Meta/SingleDataPointHeader";
import { GameCardProps } from "./_types/GameCardProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
} from "./_utils/calculations";
import { ResultMetaData } from "../../../utils/primitives/ResultMetaData";

export const GameCardCNSW: React.FC<GameCardProps> = ({ game, index }) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();

  const ContainerAnimations = animations.container;

  // Animation delay based on card index
  const delay = calculateAnimationDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(timings);

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
          {/* Grade Section - Top */}
          <AnimatedContainer
            type="full"
            className={`w-full flex items-center justify-end px-4 py-0 ${layout.borderRadius.container}`}
            backgroundColor="none"
            style={{
              background: "transparent",
              height: `100px`,
            }}
            animation={ContainerAnimations.main.itemContainer.containerIn}
            animationDelay={delay}
          >
            <ResultMetaData
              value={game.gradeName}
              animation={{ ...animations.text.main.copyIn, delay: delay + 1 }}
              className="text-right"
              variant="onContainerCopyNoBg"
            />
          </AnimatedContainer>
          {/* Team Names Section */}
          <TeamName
            teamName={game.teamHome}
            delay={delay + 10}
            delayName={delay + 20}
            style={{
              background:
                selectedPalette.container.backgroundTransparent.strong,
            }}
            className="text-left"
          />
          {/* Date, Time Section */}
          <AnimatedContainer
            type="full"
            className={`w-full flex items-center px-4 py-1 ${layout.borderRadius.container}`}
            backgroundColor="none"
            style={{
              background: "transparent",
              height: `100px`,
            }}
            animation={ContainerAnimations.main.itemContainer.containerIn}
            animationDelay={delay}
          >
            <ResultMetaData
              value={game.date}
              animation={{ ...animations.text.main.copyIn, delay: delay + 1 }}
              className="text-left mr-4"
              variant="onContainerCopyNoBg"
            />
            <ResultMetaData
              value={game.time}
              animation={{ ...animations.text.main.copyIn, delay: delay + 1 }}
              className="text-left"
              variant="onContainerCopyNoBg"
            />
          </AnimatedContainer>
          <TeamName
            teamName={game.teamAway}
            delay={delay + 10}
            delayName={delay + 20}
            style={{
              background:
                selectedPalette.container.backgroundTransparent.strong,
            }}
            className="text-left"
          />
          <SingleDataPointHeader
            value={game.ground}
            height={100}
            delay={delay}
            backgroundColor={"transparent"}
            align="right"
            variant="onContainerCopyNoBg"
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardCNSW;
