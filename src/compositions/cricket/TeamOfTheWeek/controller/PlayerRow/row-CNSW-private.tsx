import React from "react";
import { TeamOfTheWeekPlayer } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { TeamOfTheWeekPlayerName } from "../../../utils/primitives/TeamOfTheWeekPlayerName";
import { TeamOfTheWeekType } from "../../../utils/primitives/TeamOfTheWeekType";
import { Top5PlayerScore } from "../../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../../utils/primitives/Top5PlayerScoreSuffix";
import { truncateText } from "../../../utils/utils-text";
import {
  getCategoryPositionLabel,
  getScoreValues,
} from "../../utils/config";

interface PlayerRowProps {
  player: TeamOfTheWeekPlayer;
  index: number;
  rowHeight: number;
  delay: number;
}

const PlayerRowCNSWPrivate: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
  delay,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();

  // Text animations
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  // Background colors for CNSW-Private (different from public CNSW)
  const bgColor = selectedPalette.container.secondary;
  const scoreBgColor = selectedPalette.background.main;

  // Get truncated player name
  const playerName = truncateText(player.player, 50).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues(player);

  // Get position label
  const positionLabel = getCategoryPositionLabel(
    player.categoryDetail.position,
  ).toUpperCase();

  return (
    <div className="overflow-hidden mb-1">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container} ${index !== 0 ? "px-8" : ""}`}
        backgroundColor="none"
        animation={animations.container.main.itemContainer.containerIn}
        animationDelay={delay}
        exitAnimation={animations.container.main.itemContainer.containerOut}
      >
        <div
          className={`grid grid-cols-12 items-center h-full overflow-hidden ${layout.borderRadius.container}`}
          style={{
            height: `${rowHeight}px`,
            background: bgColor,
          }}
        >
          {/* Player Info (col-span-9) */}
          <div className="col-span-9 flex flex-col justify-center ml-6 p-0 m-0 h-full">
            {/* Player Name */}
            <TeamOfTheWeekPlayerName
              value={playerName}
              animation={{ ...largeTextAnimation, delay: delay + 2 }}
              className=""
              variant="onContainerMain"
            />
            {/* Position Label */}
            <TeamOfTheWeekType
              value={positionLabel}
              animation={{ ...smallTextAnimation, delay: delay + 2 }}
              variant="onContainerMain"
            />
          </div>

          {/* Stats (col-span-3) */}
          <div
            className="col-span-3 p-1 m-1 mr-2 flex items-center justify-center whitespace-nowrap leading-none px-0 h-auto"
            style={{ background: scoreBgColor }}
          >
            <Top5PlayerScore
              value={mainValue}
              animation={{ ...largeTextAnimation, delay: delay + 20 }}
              className="font-bold"
              variant="onContainerMain"
            />
            {suffix && (
              <Top5PlayerScoreSuffix
                value={suffix}
                animation={{ ...smallTextAnimation, delay: delay + 30 }}
                className="font-bold"
                variant="onContainerMain"
              />
            )}
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowCNSWPrivate;

