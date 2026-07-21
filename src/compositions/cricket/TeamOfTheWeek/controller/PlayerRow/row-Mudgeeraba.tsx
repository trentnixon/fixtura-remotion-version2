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
  LayeredAngularPanel,
  LogoWell,
  SHALLOW_ROW_LEFT,
  STEEP_LOGO_WELL_LEFT,
  clipPathStyle,
  getLayeredUnderlayColor,
} from "../../../../../templates/variants/mudgeeraba/design";
/** Width of icon/logo containers as fraction of row height (thinner than square) */
const ICON_LOGO_WIDTH_RATIO = 0.72;

const PlayerRowMudgeeraba: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette, colors } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { club } = useVideoDataContext();
  const isAccountClub = club.IsAccountClub || false;
  const delay = index * PLAYER_STAGGER_DELAY;

  // Text animations
  const largeTextAnimation = animations.text.main.copyIn;

  const isTopPlayer = index === 0;
  const bgColor = isTopPlayer
    ? selectedPalette.container.backgroundTransparent.high
    : selectedPalette.container.backgroundTransparent.medium;

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

  const rowInner = (
    <>
      <div
        className="flex shrink-0 mr-2 overflow-hidden items-center justify-center"
        style={{
          width: `${rowHeight * ICON_LOGO_WIDTH_RATIO}px`,
          height: `${rowHeight}px`,
          background: statsBG,
          ...clipPathStyle(STEEP_LOGO_WELL_LEFT),
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

      <div className="flex-1 flex flex-col justify-center min-w-0 ml-2">
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
        <LogoWell
          variant="steepRight"
          size={Math.round(rowHeight * ICON_LOGO_WIDTH_RATIO)}
          className="ml-2"
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
        </LogoWell>
      )}
    </>
  );

  return (
    <div className="overflow-visible">
      <AnimatedContainer
        type="full"
        className="rounded-none"
        style={{ height: rowHeight }}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
      >
        <LayeredAngularPanel
          clipPath={SHALLOW_ROW_LEFT}
          surfaceColor={bgColor}
          underlayColor={getLayeredUnderlayColor(colors.primary)}
          className="w-full relative"
          style={{ height: `${rowHeight}px` }}
          surfaceClassName="flex items-center w-full overflow-hidden pl-0 pr-0"
        >
          {rowInner}
        </LayeredAngularPanel>
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowMudgeeraba;
