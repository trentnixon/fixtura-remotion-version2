import React from "react";
import { PLAYER_STAGGER_DELAY, PlayerRowProps } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { Img } from "remotion";
import { TeamOfTheWeekPlayerName } from "../../../utils/primitives/TeamOfTheWeekPlayerName";
import { TeamOfTheWeekStat } from "../../../utils/primitives/TeamOfTheWeekStat";
import { MetadataSmall } from "../../../utils/primitives/metadataSmall";
import { BattingStats, BowlingStats } from "../../types";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { cleanPlayerName, getPositionIcon } from "../../utils/config";

// Icon pack configuration for Basic variant
const ICON_PACK = "icon1"; // Change this to use a different icon pack (e.g., "icon2", "icon3")

const PlayerRowBasic: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { club } = useVideoDataContext();
  const isAccountClub = club.IsAccountClub || false;
  const delay = index * PLAYER_STAGGER_DELAY;

  // Text animations
  const largeTextAnimation = animations.text.main.copyIn;
  //const smallTextAnimation = animations.text.main.copyIn;

  // Determine background color like Top5
  const isTopPlayer = index === 0;
  const bgColor = isTopPlayer
    ? selectedPalette.container.backgroundTransparent.high
    : selectedPalette.container.backgroundTransparent.medium;

  const logoBG = isTopPlayer
    ? selectedPalette.container.transparentSecondary
    : selectedPalette.container.backgroundTransparent.strong;

  // Icon section uses primary color (matching Classic)
  const statsBG = selectedPalette.container.primary;

  // Get the color for onContainerTitle variant to match the text
  const iconColor = selectedPalette.text.onContainer.title;

  // All-rounders use same height as other players
  const isAllRounderPosition =
    player.categoryDetail.position === "topallrounder" ||
    player.categoryDetail.position === "bestoftherest";
  const hasBothStats = player.batting && player.bowling;

  // Get the appropriate SVG icon component for the position
  // Uses the icon pack configured for Basic variant (see ICON_PACK constant above)
  const PositionIcon = getPositionIcon(player.categoryDetail.position, ICON_PACK);

  return (
    <AnimatedContainer
      type="full"
      className="relative h-full"
      style={{ height: rowHeight }}
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
    >
      <div
        className="flex items-center h-full overflow-hidden rounded-lg"
        style={{ height: `${rowHeight}px`, background: bgColor }}
      >
        {/* Icon Section */}
        <div
          className="w-20 h-full shrink-0 flex items-center justify-center"
          style={{ background: statsBG }}
        >
          {/* Position Icon */}
          {PositionIcon && (
            <PositionIcon
              className="w-20 h-20 flex-shrink-0"
              style={{ color: iconColor }}
            />
          )}
        </div>

        {/* Player Info Section: Stats, Player Name */}
        <div className="flex-1 flex flex-col justify-center px-3">
          {/* Stats Display */}
          <div className="mt-1">
            {isAllRounderPosition && hasBothStats && player.batting && player.bowling ? (
              <div className="flex flex-row gap-4 items-baseline">
                {/* Batting Stats */}
                <BattingStatDisplay batting={player.batting} delay={delay + 20} />
                <span>&amp;</span>
                {/* Bowling Stats */}
                <BowlingStatDisplay bowling={player.bowling} delay={delay + 30} />
              </div>
            ) : (
              <>
                {/* Batting positions: topscorer, higheststrikerate */}
                {(player.categoryDetail.position === "topscorer" ||
                  player.categoryDetail.position === "higheststrikerate") &&
                  player.batting && (
                    <BattingStatDisplay
                      batting={player.batting}
                      delay={delay + 20}
                    />
                  )}

                {/* Bowling positions: mostwickets, besteconomy */}
                {(player.categoryDetail.position === "mostwickets" ||
                  player.categoryDetail.position === "besteconomy") &&
                  player.bowling && (
                    <BowlingStatDisplay
                      bowling={player.bowling}
                      delay={delay + 20}
                    />
                  )}

                {/* Best of Rest fallback: show whatever is available if not both stats */}
                {player.categoryDetail.position === "bestoftherest" &&
                  (!player.batting || !player.bowling) && (
                    <>
                      {player.batting && (
                        <BattingStatDisplay
                          batting={player.batting}
                          delay={delay + 20}
                        />
                      )}
                      {player.bowling && (
                        <BowlingStatDisplay
                          bowling={player.bowling}
                          delay={delay + 20}
                        />
                      )}
                      {player.allRounder && (
                        <StatItem
                          label="AR SCORE"
                          value={player.allRounder.score}
                          delay={delay + 20}
                          highlight
                        />
                      )}
                    </>
                  )}
              </>
            )}
          </div>

          {/* Player Name */}
          <TeamOfTheWeekPlayerName
            value={cleanPlayerName(player.player).toUpperCase()}
            animation={{ ...largeTextAnimation, delay: delay + 2 }}
            className=""
          />
        </div>

        {/* Logo Section - conditional */}
        {!isAccountClub && (
          <div
            className="w-20 h-full shrink-0 relative overflow-hidden"
            style={{
              background: logoBG,
            }}
          >
            <Img
              src={player.club.logo.url}
              alt={player.club.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>
    </AnimatedContainer>
  );
};

// Component to display formatted batting stats
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
      <MetadataSmall
        value={scoreDisplay}
        animation={{ ...largeTextAnimation, delay: delay }}
        variant="onContainerCopy"
        className=""
      />
      <MetadataSmall
        value={ballsDisplay}
        animation={{ ...smallTextAnimation, delay: delay + 10 }}
        variant="onContainerCopy"
        className="text-md"
      />
    </div>
  );
};

// Component to display formatted bowling stats
const BowlingStatDisplay: React.FC<{
  bowling: BowlingStats;
  delay: number;
}> = ({ bowling, delay }) => {
  const { animations } = useAnimationContext();
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const wicketsRunsDisplay = `${bowling.wickets}/${bowling.runs}`;
  const oversDisplay = `(${bowling.overs})`;

  return (
    <div className="flex items-baseline gap-1">
      <TeamOfTheWeekStat
        value={wicketsRunsDisplay}
        animation={{ ...largeTextAnimation, delay: delay }}
        variant="onContainerCopy"
        className=""
      />
      <MetadataSmall
        value={oversDisplay}
        animation={{ ...smallTextAnimation, delay: delay + 1 }}
        variant="onContainerCopy"
        className="text-xs"
      />
    </div>
  );
};

// Helper component for stat items (still used for all-rounder score)
const StatItem: React.FC<{
  label: string;
  value: string | number;
  delay: number;
  highlight?: boolean;
}> = ({ label, value, delay }) => {
  const { animations } = useAnimationContext();
  const smallTextAnimation = animations.text.main.copyIn;
  const largeTextAnimation = animations.text.main.copyIn;

  return (
    <div>
      <TeamOfTheWeekStat
        value={label}
        animation={{ ...smallTextAnimation, delay: delay }}
        variant="onContainerTitle"
        className="mb-0.5"
      />
      {" : "}
      <TeamOfTheWeekStat
        value={String(value)}
        animation={{ ...largeTextAnimation, delay: delay + 10 }}
        variant="onContainerTitle"
        className=""
      />
    </div>
  );
};

export default PlayerRowBasic;
