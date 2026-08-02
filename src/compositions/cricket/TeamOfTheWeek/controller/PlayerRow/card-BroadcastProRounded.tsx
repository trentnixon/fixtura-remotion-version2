import React from "react";
import tinycolor from "tinycolor2";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  cellBlur,
  csClass,
  BroadcastProRoundedStatMatrixCompactGroup,
  resolveBroadcastProRoundedEdgeMarkerStyle,
  type BroadcastProRoundedGlassStyle,
  type BroadcastProRoundedTextOnContainer,
} from "../../../utils/broadcastProRounded";
import { BroadcastProRoundedCrestWell } from "../../../../../templates/variants/broadcastProRounded/components/crest";
import { TeamOfTheWeekPlayerName } from "../../../utils/primitives/TeamOfTheWeekPlayerName";
import { TeamOfTheWeekTeam } from "../../../utils/primitives/TeamOfTheWeekTeam";
import { truncatePlayerName, truncateText } from "../../../utils/utils-text";
import { PLAYER_STAGGER_DELAY, TeamOfTheWeekPlayer } from "../../types";
import { cleanPlayerName } from "../../utils/config";
import {
  PLAYER_NAME_DELAY_OFFSET,
  STAT_DISPLAY_DELAY_OFFSET,
} from "../PlayerRow/_utils/constants";

/** Character watch — over this length, first name becomes initial (see `truncatePlayerName`). */
const MAX_NAME_LENGTH = 19;
const MAX_TEAM_LENGTH = 36;

const formatTotwPlayerName = (rawName: string, maxLength: number): string =>
  truncatePlayerName(cleanPlayerName(rawName), maxLength).toUpperCase();

export interface CardBroadcastProRoundedProps {
  player: TeamOfTheWeekPlayer;
  staggerIndex: number;
  isAccountClub: boolean;
  glass: BroadcastProRoundedGlassStyle;
  text: BroadcastProRoundedTextOnContainer;
  compact?: boolean;
}

export const CardBroadcastProRounded: React.FC<
  CardBroadcastProRoundedProps
> = ({ player, staggerIndex, isAccountClub, glass, text, compact = false }) => {
  const { animations } = useAnimationContext();
  const { componentStyles, layout } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = staggerIndex * PLAYER_STAGGER_DELAY;
  const nameDelay = delay + PLAYER_NAME_DELAY_OFFSET;
  const statDelay = delay + STAT_DISPLAY_DELAY_OFFSET;
  const copyAnimation = animations.text.main.copyIn;

  const cardClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekCard",
  );
  const bodyClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekCardBody",
  );
  const topRowClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekCardUpper",
  );
  const copyClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekCardCopy",
  );
  const statsClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekCardStats",
  );
  const logoColClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekCardLogoCol",
  );
  const logoWellClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekCardLogoWell",
  );
  const nameRowClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekCardNameRow",
  );
  const nameCellClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekCardNameCell",
  );
  const statClass = csClass(componentStyles, "TeamOfTheWeekStat");
  const statSuffixClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekStatSuffix",
  );
  const teamClass = csClass(componentStyles, "TeamOfTheWeekTeam");

  const playerName = formatTotwPlayerName(
    player.player,
    compact ? MAX_NAME_LENGTH - 4 : MAX_NAME_LENGTH,
  );
  const teamName = truncateText(
    player.primaryTeam,
    compact ? MAX_TEAM_LENGTH - 6 : MAX_TEAM_LENGTH,
  ).toUpperCase();

  return (
    <AnimatedContainer
      type="full"
      className={`h-full overflow-hidden ${layout.borderRadius.container}`}
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
                <BroadcastProRoundedStatMatrixCompactGroup
                  player={player}
                  delay={statDelay}
                  statClassName={statClass}
                  statSuffixClassName={statSuffixClass}
                  text={text}
                />
              </div>

              <TeamOfTheWeekTeam
                value={teamName}
                animation={{ ...copyAnimation, delay: nameDelay + 2 }}
                variant="onContainerCopy"
                className={teamClass}
                style={{ color: text.secondary }}
              />
            </div>

            {!isAccountClub ? (
              <div className={logoColClass}>
                <div className={logoWellClass}>
                  <BroadcastProRoundedCrestWell
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
              className={nameCellClass}
              style={{ color: text.copy }}
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export interface TwelfthManBandBroadcastProRoundedProps {
  player: TeamOfTheWeekPlayer;
  staggerIndex: number;
  isAccountClub: boolean;
  glass: BroadcastProRoundedGlassStyle;
  text: BroadcastProRoundedTextOnContainer;
  accent: string;
}

export const TwelfthManBandBroadcastProRounded: React.FC<
  TwelfthManBandBroadcastProRoundedProps
> = ({ player, staggerIndex, isAccountClub, glass, text, accent }) => {
  const { animations } = useAnimationContext();
  const { componentStyles, layout } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = staggerIndex * PLAYER_STAGGER_DELAY;
  const copyAnimation = animations.text.main.copyIn;

  const bandClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekTwelfthBand",
  );
  const labelClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekTwelfthLabel",
  );
  const nameClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekTwelfthName",
  );
  const teamClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekTwelfthTeam",
  );
  const roleClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekTwelfthRole",
  );

  const playerName = formatTotwPlayerName(player.player, MAX_NAME_LENGTH + 6);
  const teamName = truncateText(
    player.primaryTeam,
    MAX_TEAM_LENGTH,
  ).toUpperCase();

  return (
    <AnimatedContainer
      type="full"
      className={`overflow-hidden ${layout.borderRadius.container}`}
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
          ...resolveBroadcastProRoundedEdgeMarkerStyle("standard", "muted", {
            accentColor: accent,
            mutedColor: tinycolor(accent).setAlpha(0.4).toRgbString(),
          }),
          ...cellBlur,
        }}
      >
        <div className="flex min-w-0 flex-col gap-1">
          <span className={labelClass} style={{ color: text.muted }}>
            12th Man
          </span>
          <TeamOfTheWeekPlayerName
            value={playerName}
            animation={{ ...copyAnimation, delay: delay + 2 }}
            variant="onContainerTitle"
            className={nameClass}
            style={{ color: text.copy }}
          />
        </div>

        <div className="flex flex-shrink-0 items-center gap-4">
          <div className="text-right">
            <TeamOfTheWeekTeam
              value={teamName}
              animation={{ ...copyAnimation, delay: delay + 4 }}
              variant="onContainerCopy"
              className={teamClass}
              style={{ color: text.secondary }}
            />
            <p className={roleClass} style={{ color: text.muted }}>
              Stand-by Player
            </p>
          </div>
          {!isAccountClub && (
            <BroadcastProRoundedCrestWell
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
