import React from "react";
import { PLAYER_STAGGER_DELAY, PlayerRowProps } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimation } from "../../../../../components/containers/animations/useAnimation";
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
import {
  ClassicForegroundShell,
  ClassicStatWell,
  getClassicSurfaceRoles,
} from "../../../../../templates/variants/classic/design";

const PlayerRowClassic: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette, layout, colors } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { club } = useVideoDataContext();
  const isAccountClub = club.IsAccountClub || false;
  const delay = index * PLAYER_STAGGER_DELAY;

  const largeTextAnimation = animations.text.main.copyIn;
  const iconAnimation = animations.container.main.itemContainer;
  const iconAnimationStyles = useAnimation(
    { ...iconAnimation, delay: delay },
    delay,
  );

  const surfaceRoles = getClassicSurfaceRoles(selectedPalette, {
    primary: colors.primary,
    secondary: colors.secondary,
  });
  const iconColor = surfaceRoles.text.onStat;

  const isAllRounder = isAllRounderPosition(player.categoryDetail.position);
  const hasBoth = hasBothStats(player);

  const PositionIcon = getPositionIcon(
    player.categoryDetail.position,
    DEFAULT_ICON_PACK,
  );

  return (
    <div className="overflow-visible w-full">
      <AnimatedContainer
        type="full"
        className="overflow-visible"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
      >
        <ClassicForegroundShell
          height={rowHeight}
          delay={delay}
          depth="compact"
        >
          <div
            className={`grid grid-cols-12 items-center h-full overflow-hidden ${layout.borderRadius.container}`}
          >
            <ClassicStatWell
              variant="contrast"
              width="compact"
              className="col-span-2 px-4"
              style={iconAnimationStyles}
            >
              {PositionIcon && (
                <PositionIcon
                  className="w-20 h-20 flex-shrink-0"
                  style={{ color: iconColor }}
                />
              )}
            </ClassicStatWell>

            <div
              className={`relative z-10 flex flex-col justify-center px-4 h-full ${isAccountClub ? "col-span-10" : "col-span-8"}`}
            >
              <div className="mt-1">
                {isAllRounder && hasBoth && player.batting && player.bowling ? (
                  <div className="flex flex-row gap-4 items-baseline">
                    <BattingStatDisplay
                      batting={player.batting}
                      delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                    />
                    <span>&amp;</span>
                    <BowlingStatDisplay
                      bowling={player.bowling}
                      delay={delay + BOWLING_STAT_DELAY_OFFSET}
                    />
                  </div>
                ) : (
                  <>
                    {(player.categoryDetail.position === "topscorer" ||
                      player.categoryDetail.position === "higheststrikerate") &&
                      player.batting && (
                        <BattingStatDisplay
                          batting={player.batting}
                          delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                        />
                      )}

                    {(player.categoryDetail.position === "mostwickets" ||
                      player.categoryDetail.position === "besteconomy") &&
                      player.bowling && (
                        <BowlingStatDisplay
                          bowling={player.bowling}
                          delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                        />
                      )}

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
              <TeamOfTheWeekPlayerName
                value={cleanPlayerName(player.player).toUpperCase()}
                animation={{
                  ...largeTextAnimation,
                  delay: delay + PLAYER_NAME_DELAY_OFFSET,
                }}
                className=""
              />
            </div>

            {!isAccountClub && (
              <div className="col-span-2 flex h-full w-full items-center justify-center overflow-hidden p-2">
                <Img
                  src={player.club.logo.url}
                  alt={player.club.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </div>
        </ClassicForegroundShell>
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowClassic;
