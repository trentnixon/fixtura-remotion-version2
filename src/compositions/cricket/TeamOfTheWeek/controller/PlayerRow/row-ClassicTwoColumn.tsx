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

const PlayerRowClassicTwoColumn: React.FC<PlayerRowProps> = ({
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
  // const smallTextAnimation = animations.text.main.copyIn;

  // Background colors matching Top5 ClassicTwoColumn
  const bgColor = selectedPalette.container.backgroundTransparent.strong;
  const logoBG = selectedPalette.container.primary;
  const contrastBG = selectedPalette.container.backgroundTransparent.strong;

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
    <AnimatedContainer
      type="full"
      className="overflow-hidden"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
    >
      <div
        className={`grid grid-cols-12 items-center h-full overflow-hidden ${layout.borderRadius.container}`}
        style={{
          height: `${rowHeight}px`,
          background: bgColor,
        }}
      >
        {/* [img] Logo Section - shown only when account is NOT a club (association) */}
        {!isAccountClub && (
          <div
            className="col-span-2 flex items-center justify-center h-full overflow-hidden"
            style={{ background: contrastBG }}
          >
            <div className="w-20 h-20 overflow-hidden flex items-center justify-center">
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
          </div>
        )}

        {/* [position] Position Label Section */}
        <div
          className="col-span-1 flex whitespace-nowrap leading-none px-0 h-full items-center justify-center gap-2"
          style={{ background: logoBG }}
        >
          {PositionIcon && (
            <PositionIcon
              className="w-20 h-20 flex-shrink-0"
              style={{ color: iconColor }}
            />
          )}

        </div>
        {/* [name and stats] Player Name and Stats Section */}
        <div
          className={`ml-4 flex flex-col justify-center px-2 h-full ${isAccountClub ? "col-span-10" : "col-span-9"
            }`}
        >

          {/* Player Name */}
          <TeamOfTheWeekPlayerName
            value={cleanPlayerName(player.player).toUpperCase()}
            animation={{
              ...largeTextAnimation,
              delay: delay + PLAYER_NAME_DELAY_OFFSET,
            }}
            className=""
          />

          {/* Stats Display */}
          {isAllRounder && hasBoth && player.batting && player.bowling ? (
            <div className="flex flex-row gap-4 mt-1">
              <BattingStatDisplay
                batting={player.batting}
                delay={delay + STAT_DISPLAY_DELAY_OFFSET}
              />{" "}
              &amp;
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

              {/* Best of Rest fallback */}
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

      </div>
    </AnimatedContainer>
  );
};

export default PlayerRowClassicTwoColumn;
