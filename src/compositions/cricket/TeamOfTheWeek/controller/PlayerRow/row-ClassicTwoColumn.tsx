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
import {
  ClassicStatWell,
  ClassicTexturedSurface,
  getClassicSurfaceRoles,
} from "../../../../../templates/variants/classic/design";

const PlayerRowClassicTwoColumn: React.FC<PlayerRowProps> = ({
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
    <AnimatedContainer
      type="full"
      className="overflow-hidden"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
    >
      <ClassicTexturedSurface
        className={`${layout.borderRadius.container}`}
        backgroundColor={surfaceRoles.content.surface}
        style={{ height: `${rowHeight}px` }}
      >
        <div className="grid h-full grid-cols-12 items-center">
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

          <ClassicStatWell
            variant="contrast"
            width="compact"
            className="col-span-1"
          >
            {PositionIcon && (
              <PositionIcon
                className="h-20 w-20 flex-shrink-0"
                style={{ color: iconColor }}
              />
            )}
          </ClassicStatWell>

          <div
            className={`ml-4 flex h-full flex-col justify-center px-2 ${
              isAccountClub ? "col-span-10" : "col-span-9"
            }`}
          >
            <TeamOfTheWeekPlayerName
              value={cleanPlayerName(player.player).toUpperCase()}
              animation={{
                ...largeTextAnimation,
                delay: delay + PLAYER_NAME_DELAY_OFFSET,
              }}
              className=""
            />

            {isAllRounder && hasBoth && player.batting && player.bowling ? (
              <div className="mt-1 flex flex-row gap-4">
                <BattingStatDisplay
                  batting={player.batting}
                  delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                />
                &amp;
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
        </div>
      </ClassicTexturedSurface>
    </AnimatedContainer>
  );
};

export default PlayerRowClassicTwoColumn;
