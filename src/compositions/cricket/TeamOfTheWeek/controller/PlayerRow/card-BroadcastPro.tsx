import React from "react";
import tinycolor from "tinycolor2";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  cellBlur,
  csClass,
  BroadcastProStatMatrixCompactGroup,
  resolveBroadcastProEdgeMarkerStyle,
  type BroadcastProGlassStyle,
} from "../../../utils/broadcastPro";
import { BroadcastProCrestWell } from "../../../../../templates/variants/broadcastPro/components/crest";
import { TeamOfTheWeekPlayerName } from "../../../utils/primitives/TeamOfTheWeekPlayerName";
import { TeamOfTheWeekTeam } from "../../../utils/primitives/TeamOfTheWeekTeam";
import { truncateText } from "../../../utils/utils-text";
import { PLAYER_STAGGER_DELAY, TeamOfTheWeekPlayer } from "../../types";
import { cleanPlayerName } from "../../utils/config";
import {
  PLAYER_NAME_DELAY_OFFSET,
  STAT_DISPLAY_DELAY_OFFSET,
} from "../PlayerRow/_utils/constants";

const MAX_NAME_LENGTH = 28;
const MAX_TEAM_LENGTH = 36;

export interface CardBroadcastProProps {
  player: TeamOfTheWeekPlayer;
  staggerIndex: number;
  isAccountClub: boolean;
  glass: BroadcastProGlassStyle;
  accent: string;
  compact?: boolean;
}

export const CardBroadcastPro: React.FC<CardBroadcastProProps> = ({
  player,
  staggerIndex,
  isAccountClub,
  glass,
  accent,
  compact = false,
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = staggerIndex * PLAYER_STAGGER_DELAY;
  const nameDelay = delay + PLAYER_NAME_DELAY_OFFSET;
  const statDelay = delay + STAT_DISPLAY_DELAY_OFFSET;
  const copyAnimation = animations.text.main.copyIn;

  const cardClass = csClass(componentStyles, "broadcastProTeamOfTheWeekCard");
  const bodyClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekCardBody",
  );
  const topRowClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekCardUpper",
  );
  const copyClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekCardCopy",
  );
  const statsClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekCardStats",
  );
  const logoColClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekCardLogoCol",
  );
  const logoWellClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekCardLogoWell",
  );
  const nameRowClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekCardNameRow",
  );
  const nameCellClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekCardNameCell",
  );
  const statClass = csClass(componentStyles, "TeamOfTheWeekStat");
  const statSuffixClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekStatSuffix",
  );
  const playerNameClass = csClass(componentStyles, "TeamOfTheWeekPlayerName");
  const teamClass = csClass(componentStyles, "TeamOfTheWeekTeam");

  const playerName = truncateText(
    cleanPlayerName(player.player),
    compact ? MAX_NAME_LENGTH - 4 : MAX_NAME_LENGTH,
  ).toUpperCase();
  const teamName = truncateText(
    player.primaryTeam,
    compact ? MAX_TEAM_LENGTH - 6 : MAX_TEAM_LENGTH,
  ).toUpperCase();

  return (
    <AnimatedContainer
      type="full"
      className="h-full overflow-hidden rounded-none"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
    >
      <div
        className={cardClass}
        style={{
          background: glass.panel,
          border: glass.border,
          ...cellBlur,
        }}
      >
        <div className={bodyClass}>
          <div
            className={`${topRowClass}${isAccountClub ? " grid-cols-1" : ""}`.trim()}
          >
            <div className={copyClass}>
              <div className={statsClass}>
                <BroadcastProStatMatrixCompactGroup
                  player={player}
                  delay={statDelay}
                  statClassName={statClass}
                  statSuffixClassName={statSuffixClass}
                />
              </div>

              <div style={{ color: accent }}>
                <TeamOfTheWeekTeam
                  value={teamName}
                  animation={{ ...copyAnimation, delay: nameDelay + 2 }}
                  variant="onContainerCopy"
                  className={teamClass}
                />
              </div>
            </div>

            {!isAccountClub ? (
              <div className={logoColClass}>
                <div className={logoWellClass}>
                  <BroadcastProCrestWell
                    tier="compact"
                    logo={player.club.logo}
                    teamName={player.club.name}
                    delay={delay + 2}
                    glass={glass}
                    className="h-full w-full"
                    style={{
                      width: "100%",
                      height: "100%",
                      minWidth: "100%",
                      minHeight: "100%",
                    }}
                    showBorder
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className={nameRowClass}>
            <TeamOfTheWeekPlayerName
              value={playerName}
              animation={{ ...copyAnimation, delay: nameDelay }}
              variant="onContainerTitle"
              className={`${playerNameClass} ${nameCellClass}`.trim()}
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export interface TwelfthManBandBroadcastProProps {
  player: TeamOfTheWeekPlayer;
  staggerIndex: number;
  isAccountClub: boolean;
  glass: BroadcastProGlassStyle;
}

export const TwelfthManBandBroadcastPro: React.FC<
  TwelfthManBandBroadcastProProps
> = ({ player, staggerIndex, isAccountClub, glass }) => {
  const { animations } = useAnimationContext();
  const { componentStyles, colors, selectedPalette } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = staggerIndex * PLAYER_STAGGER_DELAY;
  const copyAnimation = animations.text.main.copyIn;
  const accent = colors?.primary ?? selectedPalette.container.accent;

  const bandClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekTwelfthBand",
  );
  const labelClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekTwelfthLabel",
  );
  const nameClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekTwelfthName",
  );
  const teamClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekTwelfthTeam",
  );
  const roleClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekTwelfthRole",
  );

  const playerName = truncateText(
    cleanPlayerName(player.player),
    MAX_NAME_LENGTH + 6,
  ).toUpperCase();
  const teamName = truncateText(
    player.primaryTeam,
    MAX_TEAM_LENGTH,
  ).toUpperCase();

  return (
    <AnimatedContainer
      type="full"
      className="overflow-hidden rounded-none"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
    >
      <div
        className={bandClass}
        style={{
          background: glass.muted,
          border: glass.border,
          ...resolveBroadcastProEdgeMarkerStyle("standard", "muted", {
            accentColor: accent,
            mutedColor: tinycolor(accent).setAlpha(0.4).toRgbString(),
          }),
          ...cellBlur,
        }}
      >
        <div className="flex min-w-0 flex-col gap-1">
          <span className={labelClass}>12th Man</span>
          <TeamOfTheWeekPlayerName
            value={playerName}
            animation={{ ...copyAnimation, delay: delay + 2 }}
            variant="onContainerTitle"
            className={nameClass}
          />
        </div>

        <div className="flex flex-shrink-0 items-center gap-4">
          <div className="text-right">
            <TeamOfTheWeekTeam
              value={teamName}
              animation={{ ...copyAnimation, delay: delay + 4 }}
              variant="onContainerCopy"
              className={teamClass}
            />
            <p className={roleClass}>Stand-by Player</p>
          </div>
          {!isAccountClub && (
            <BroadcastProCrestWell
              tier="compact"
              logo={player.club.logo}
              teamName={player.club.name}
              delay={delay + 3}
              glass={glass}
              showBorder
            />
          )}
        </div>
      </div>
    </AnimatedContainer>
  );
};
