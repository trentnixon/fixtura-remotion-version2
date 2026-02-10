import React from "react";
import { PLAYER_STAGGER_DELAY, PlayerRowProps } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimation } from "../../../../../components/containers/animations/useAnimation";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { TeamOfTheWeekPlayerName } from "../../../utils/primitives/TeamOfTheWeekPlayerName";
import { TeamOfTheWeekStat } from "../../../utils/primitives/TeamOfTheWeekStat";
import { TeamLogo } from "../../../utils/primitives/TeamLogo";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import {
  cleanPlayerName,
  getScoreValues,
  getPositionIcon,
} from "../../utils/config";
import { BattingStats } from "../../types";
import { DEFAULT_ICON_PACK } from "./_utils/constants";
import {
  STAT_DISPLAY_DELAY_OFFSET,
  BOWLING_STAT_DELAY_OFFSET,
  STAT_SUFFIX_DELAY_OFFSET,
} from "./_utils/constants";
import { isAllRounderPosition, hasBothStats } from "./_utils/helpers";
import { BowlingStatDisplay } from "./_utils/components";

// Component to display formatted batting stats (SixersThunder variant uses TeamOfTheWeekStat)
const BattingStatDisplay: React.FC<{
  batting: BattingStats;
  delay: number;
}> = ({ batting, delay }) => {
  const { animations } = useAnimationContext();
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const scoreDisplay = `${batting.runs}${batting.notOut ? "*" : ""}`;
  const ballsDisplay = `(${batting.balls})`;

  return (
    <div className="flex items-baseline gap-1">
      <TeamOfTheWeekStat
        value={scoreDisplay}
        animation={{ ...largeTextAnimation, delay: delay }}
        variant="onContainerCopy"
        className=""
      />
      <TeamOfTheWeekStat
        value={ballsDisplay}
        animation={{
          ...smallTextAnimation,
          delay: delay + STAT_SUFFIX_DELAY_OFFSET,
        }}
        variant="onContainerCopy"
        className="text-md"
      />
    </div>
  );
};

const PlayerRowSixersThunder: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { club } = useVideoDataContext();
  const isAccountClub = club.IsAccountClub || false;
  const delay = index * PLAYER_STAGGER_DELAY;

  // Text animations
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  // Icon animation (using container animation)
  const iconAnimation = animations.container.main.itemContainer;
  const iconAnimationStyles = useAnimation(
    { ...iconAnimation, delay: delay },
    delay,
  );

  // Background colors like Top5 Sixers/Thunder
  const bgColor = selectedPalette.container.backgroundTransparent.strong;
  //const logoBG = selectedPalette.container.primary;
  const contrastBG = selectedPalette.container.backgroundTransparent.strong;
  const iconBG = selectedPalette.container.primary;

  // Get the color for onContainerTitle variant to match the text
  const iconColor = selectedPalette.text.onContainer.title;

  // Get cleaned player name
  const playerName = cleanPlayerName(player.player).toUpperCase();

  // All-rounders check
  const isAllRounder = isAllRounderPosition(
    player.categoryDetail.position,
  );
  const hasBoth = hasBothStats(player);

  // Get score display values (only used for non-all-rounder positions)
  const { mainValue, suffix } = getScoreValues(player);

  // Get the appropriate SVG icon component for the position
  const PositionIcon = getPositionIcon(
    player.categoryDetail.position,
    DEFAULT_ICON_PACK,
  );

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
      >
        <div
          className={`grid grid-cols-12 p-0 items-center h-full overflow-hidden ${layout.borderRadius.container}`}
          style={{
            height: `${rowHeight}px`,
            background: bgColor,
          }}
        >
          {/* Icon Section */}
          <div
            className="col-span-1 flex whitespace-nowrap leading-none px-4 h-full items-center justify-center"
            style={{ background: iconBG, ...iconAnimationStyles }}
          >
            {/* Position Icon */}
            {PositionIcon && (
              <PositionIcon
                className="w-20 h-20 flex-shrink-0"
                style={{ color: iconColor }}
              />
            )}
          </div>

          {/* Player Info */}
          <div className={`flex flex-row justify-start items-center px-2 h-full overflow-hidden gap-0 ${isAccountClub ? "col-span-11" : "col-span-10"}`}>
            {/* Player Name */}
            <TeamOfTheWeekPlayerName
              value={playerName}
              animation={{ ...largeTextAnimation, delay: delay + 2 }}
              className="leading-none"
            />
            {/* Stats Display */}
            <div className="flex items-center gap-1 ml-4">
              {isAllRounder && hasBoth && player.batting && player.bowling ? (
                <div className="flex flex-row gap-4 items-baseline">
                  {/* Batting Stats */}
                  <BattingStatDisplay
                    batting={player.batting}
                    delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                  />
                  <span>&amp;</span>
                  {/* Bowling Stats */}
                  <BowlingStatDisplay
                    bowling={player.bowling}
                    delay={delay + BOWLING_STAT_DELAY_OFFSET}
                  />
                </div>
              ) : (
                <>
                  <TeamOfTheWeekStat
                    value={mainValue}
                    animation={{
                      ...largeTextAnimation,
                      delay: delay + STAT_DISPLAY_DELAY_OFFSET,
                    }}
                    className=""
                    variant="onContainerCopy"
                  />
                  {suffix && (
                    <TeamOfTheWeekStat
                      value={suffix}
                      animation={{
                        ...smallTextAnimation,
                        delay: delay + BOWLING_STAT_DELAY_OFFSET,
                      }}
                      className="text-md"
                      variant="onContainerCopy"
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Logo (col-span-2) - conditional */}
          {!isAccountClub && (
            <div
              className="col-span-1 flex items-center justify-center h-full overflow-hidden"
              style={{ background: contrastBG }}
            >
              <div className="w-20 h-20 overflow-hidden flex items-center justify-center">
                <TeamLogo
                  logo={player.club.logo}
                  teamName={player.club.name}
                  delay={delay + 20}
                  size={20}
                />
              </div>
            </div>
          )}
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowSixersThunder;
