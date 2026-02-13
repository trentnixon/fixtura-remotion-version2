import React from "react";
import { PLAYER_STAGGER_DELAY, PlayerRowProps } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { Img } from "remotion";
import { TeamOfTheWeekPlayerName } from "../../../utils/primitives/TeamOfTheWeekPlayerName";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { cleanPlayerName, getPositionIcon } from "../../utils/config";
import { DEFAULT_ICON_PACK } from "./_utils/constants";
import {
  STAT_DISPLAY_DELAY_OFFSET,
  BOWLING_STAT_DELAY_OFFSET,
  PLAYER_NAME_DELAY_OFFSET,
} from "./_utils/constants";
import { isAllRounderPosition, hasBothStats } from "./_utils/helpers";
import {
  BattingStatDisplay,
  BowlingStatDisplay,
  StatItem,
} from "./_utils/components";

/** Icon block (left): straight left, angled right edge */
const CLIP_ICON = "polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%)";
/** Logo block (right): mirrored – angled left edge, straight right (flush to row edge) */
const CLIP_LOGO = "polygon(30% 0%, 0% 100%, 100% 100%, 100% 0%)";
/** Width of icon/logo containers as fraction of row height (thinner than square) */
const ICON_LOGO_WIDTH_RATIO = 0.72;

const PlayerRowMudgeeraba: React.FC<PlayerRowProps> = ({
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
  const isAllRounder = isAllRounderPosition(
    player.categoryDetail.position,
  );
  const hasBoth = hasBothStats(player);

  // Get the appropriate SVG icon component for the position
  const PositionIcon = getPositionIcon(
    player.categoryDetail.position,
    DEFAULT_ICON_PACK,
  );

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className="rounded-none"
        style={{ height: rowHeight }}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
      >
        <div
          className="flex items-center w-full overflow-hidden pl-0 pr-0"
          style={{
            height: `${rowHeight}px`,
            backgroundColor: bgColor,
          }}
        >
          {/* Icon Section – angled right edge, drop shadow */}
          <div
            className="flex shrink-0 mr-2 overflow-hidden items-center justify-center"
            style={{
              width: `${rowHeight * ICON_LOGO_WIDTH_RATIO}px`,
              height: `${rowHeight}px`,
              background: statsBG,
              clipPath: CLIP_ICON,
              WebkitClipPath: CLIP_ICON,
              filter: "drop-shadow(3px 2px 6px rgba(0, 0, 0, 0.25))",
              WebkitFilter: "drop-shadow(3px 2px 6px rgba(0, 0, 0, 0.25))",
            }}
          >
            {PositionIcon && (
              <PositionIcon
                className="w-20 h-20 flex-shrink-0"
                style={{ color: iconColor }}
              />
            )}
          </div>

          {/* Player Info Section: Stats, Player Name */}
          <div className="flex-1 flex flex-col justify-center min-w-0 ml-2">
          {/* Stats Display */}
          <div className="mt-1">
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
                {/* Batting positions: topscorer, higheststrikerate */}
                {(player.categoryDetail.position === "topscorer" ||
                  player.categoryDetail.position === "higheststrikerate") &&
                  player.batting && (
                    <BattingStatDisplay
                      batting={player.batting}
                      delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                    />
                  )}

                {/* Bowling positions: mostwickets, besteconomy */}
                {(player.categoryDetail.position === "mostwickets" ||
                  player.categoryDetail.position === "besteconomy") &&
                  player.bowling && (
                    <BowlingStatDisplay
                      bowling={player.bowling}
                      delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                    />
                  )}

                {/* Best of Rest fallback: show whatever is available if not both stats */}
                {player.categoryDetail.position === "bestoftherest" &&
                  (!player.batting || !player.bowling) && (
                    <>
                      {player.batting && (
                        <BattingStatDisplay
                          batting={player.batting}
                          delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                        />
                      )}
                      {player.bowling && (
                        <BowlingStatDisplay
                          bowling={player.bowling}
                          delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                        />
                      )}
                      {player.allRounder && (
                        <StatItem
                          label="AR SCORE"
                          value={player.allRounder.score}
                          delay={delay + STAT_DISPLAY_DELAY_OFFSET}
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
            animation={{
              ...largeTextAnimation,
              delay: delay + PLAYER_NAME_DELAY_OFFSET,
            }}
            className=""
          />
        </div>

        {/* Logo Section – flush right, mirrored angle (angled left edge) */}
        {!isAccountClub && (
          <div
            className="flex shrink-0 overflow-hidden items-center justify-center ml-2"
            style={{
              width: `${rowHeight * ICON_LOGO_WIDTH_RATIO}px`,
              height: `${rowHeight}px`,
              background: logoBG,
              clipPath: CLIP_LOGO,
              WebkitClipPath: CLIP_LOGO,
              filter: "drop-shadow(3px 2px 6px rgba(0, 0, 0, 0.25))",
              WebkitFilter: "drop-shadow(3px 2px 6px rgba(0, 0, 0, 0.25))",
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
    </div>
  );
};

export default PlayerRowMudgeeraba;
