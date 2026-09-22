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

/** Full-height crest column on the right (matches Top 5 grid cards). */
const CREST_WIDTH_PX = 96;
const CREST_CONTENT_GAP_PX = 12;
const CREST_MIN_HEIGHT_PX = 140;
const TWELFTH_CREST_WIDTH_PX = 88;
const TWELFTH_CREST_MIN_HEIGHT_PX = 72;

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
  const copyClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekCardCopy",
  );
  const statsClass = csClass(
    componentStyles,
    "broadcastProRoundedTeamOfTheWeekCardStats",
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

  const showCrest = !isAccountClub;

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
        className={`${cardClass} relative overflow-hidden`.trim()}
        style={{
          background: glass.panel,
          border: glass.border,
          minHeight: CREST_MIN_HEIGHT_PX,
          ...cellBlur,
        }}
      >
        <div
          className={bodyClass}
          style={{
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 16,
            paddingRight: showCrest
              ? CREST_WIDTH_PX + CREST_CONTENT_GAP_PX
              : 16,
          }}
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

            <div className={nameRowClass}>
              <TeamOfTheWeekPlayerName
                value={playerName}
                animation={{ ...copyAnimation, delay: nameDelay }}
                variant="onContainerTitle"
                className={nameCellClass}
                style={{ color: text.copy }}
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
        </div>

        {showCrest ? (
          <BroadcastProRoundedCrestWell
            tier="grid"
            logo={player.club.logo}
            teamName={player.club.name}
            delay={delay + 2}
            glass={glass}
            containerHeight={CREST_MIN_HEIGHT_PX}
            showBorder
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: CREST_WIDTH_PX,
              minWidth: CREST_WIDTH_PX,
              height: "100%",
              minHeight: "100%",
            }}
          />
        ) : null}
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
  const showCrest = !isAccountClub;

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
        className={`${bandClass} relative overflow-hidden`.trim()}
        style={{
          background: glass.muted,
          border: glass.border,
          minHeight: TWELFTH_CREST_MIN_HEIGHT_PX,
          paddingRight: showCrest
            ? TWELFTH_CREST_WIDTH_PX + CREST_CONTENT_GAP_PX
            : undefined,
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

        <div className="flex flex-shrink-0 items-center">
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
        </div>

        {showCrest ? (
          <BroadcastProRoundedCrestWell
            tier="grid"
            logo={player.club.logo}
            teamName={player.club.name}
            delay={delay + 3}
            glass={glass}
            containerHeight={TWELFTH_CREST_MIN_HEIGHT_PX}
            showBorder
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: TWELFTH_CREST_WIDTH_PX,
              minWidth: TWELFTH_CREST_WIDTH_PX,
              height: "100%",
              minHeight: "100%",
            }}
          />
        ) : null}
      </div>
    </AnimatedContainer>
  );
};
