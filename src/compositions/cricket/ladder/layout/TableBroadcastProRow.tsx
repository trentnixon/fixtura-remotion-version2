import React from "react";
import tinycolor from "tinycolor2";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { BroadcastProScoreText } from "../../../../templates/variants/broadcastPro/components/score";
import { BroadcastProCrestWell } from "../../../../templates/variants/broadcastPro/components/crest";
import LadderTeamName from "../../utils/primitives/ladderTeamName";
import { TeamData } from "../types";
import type { ColorVariant } from "../../../../components/typography/AnimatedText";
import { cellBlur, useBroadcastProTheme } from "../../utils/broadcastPro";
import { resolveBroadcastProLadderZone } from "../../utils/broadcastPro/ladder";
import { resolveBroadcastProEdgeMarkerStyle } from "../../utils/broadcastPro/marker";
import { resolveBroadcastProLadderRowTypography } from "../../utils/broadcastPro/ladder/resolveBroadcastProLadderRowTypography";
import { BROADCAST_PRO_LADDER_ZONE_RANK_THEME_KEY } from "../../../../templates/types/broadcast-pro/ladder-zone";
import { csClass } from "../../utils/broadcastPro/componentStyles";

export interface BroadcastProRowLayoutProps {
  team: TeamData;
  delay: number;
  place: number;
  index: number;
  totalTeams: number;
  LadderRowHeight: number;
  isBiasTeam: boolean;
  compact?: boolean;
}

const GAP = "gap-2";

/** Teko sits high in the em box; nudge copy toward optical vertical center beside the crest. */
const TEKO_LADDER_NAME_NUDGE_EM = 0.06;

const ladderCellTextStyle = (
  fontSizePx: number,
  fontWeight?: number,
): React.CSSProperties => ({
  fontSize: fontSizePx,
  lineHeight: 1,
  ...(fontWeight != null ? { fontWeight } : {}),
});

/** Team cell horizontal inset + crest/name gap (no Y padding — crest fills row height). */
const resolveLadderTeamCellSpacing = (rowHeight: number) => {
  if (rowHeight >= 80) {
    return { paddingX: 24, gap: 24 };
  }
  if (rowHeight >= 56) {
    return { paddingX: 16, gap: 16 };
  }
  return { paddingX: 12, gap: 8 };
};

/**
 * Broadcast Pro ladder row — glass panels, zone rank accent, P/W/L/Pts (no BYE).
 */
export const BroadcastProLadderRow: React.FC<BroadcastProRowLayoutProps> = ({
  team,
  delay,
  place,
  index,
  totalTeams,
  LadderRowHeight,
  isBiasTeam,
}) => {
  const {
    fontClasses,
    selectedPalette,
    colors,
    componentStyles,
    broadcastProLadderZoneSizing,
  } = useThemeContext();
  const { animations } = useAnimationContext();
  const { glass } = useBroadcastProTheme();
  const accent = colors?.primary ?? selectedPalette.container.accent;
  const copyIn = animations.text.main.copyIn;

  const zone = resolveBroadcastProLadderZone({
    position: place,
    index,
    totalTeams,
    sizing: broadcastProLadderZoneSizing,
  });

  const showRankAccent = zone.rankAccent || isBiasTeam;
  const typography = resolveBroadcastProLadderRowTypography(LadderRowHeight);
  const teamCell = resolveLadderTeamCellSpacing(LadderRowHeight);
  const crestContainerHeight = LadderRowHeight;
  const statVariant: ColorVariant = "onContainerCopy";
  const nameVariant: ColorVariant = "onContainerCopy";
  const pointsVariant: ColorVariant = zone.pointsAccent
    ? "onContainerAccent"
    : "onContainerCopy";

  const headingFont = fontClasses.heading?.family;

  const defaultRankBorder = tinycolor(selectedPalette.text.onBackground.main)
    .setAlpha(showRankAccent ? 1 : 0.22)
    .toRgbString();

  const rankBorderStyle = resolveBroadcastProEdgeMarkerStyle(
    "standard",
    showRankAccent ? "primary" : "muted",
    { accentColor: accent, mutedColor: defaultRankBorder },
  );

  const rankThemeKey = showRankAccent
    ? BROADCAST_PRO_LADDER_ZONE_RANK_THEME_KEY.leader
    : BROADCAST_PRO_LADDER_ZONE_RANK_THEME_KEY.default;
  const rankCellClass = csClass(componentStyles, rankThemeKey);

  const rowFixedHeight = {
    height: LadderRowHeight,
    minHeight: LadderRowHeight,
    maxHeight: LadderRowHeight,
  };

  return (
    <div
      className={`flex min-h-0 w-full items-stretch overflow-hidden ${GAP}`}
      style={{ opacity: zone.rowOpacity, ...rowFixedHeight }}
    >
      <div
        className={rankCellClass}
        style={{
          ...rowFixedHeight,
          background: glass.dataCell,
          ...cellBlur,
          ...rankBorderStyle,
          fontFamily: headingFont,
        }}
      >
        <BroadcastProScoreText
          value={String(place)}
          role="tableRank"
          variant={statVariant}
          animation={{ ...copyIn, delay }}
          fontFamily={headingFont}
          compact={typography.scoreCompact}
          style={ladderCellTextStyle(typography.rankFontPx)}
        />
      </div>

      <div
        className="box-border flex min-h-0 min-w-0 flex-1 items-center overflow-hidden"
        style={{
          ...rowFixedHeight,
          background: glass.dataCell,
          ...cellBlur,
          paddingLeft: teamCell.paddingX,
          paddingRight: teamCell.paddingX,
          gap: teamCell.gap,
        }}
      >
        <BroadcastProCrestWell
          tier="row"
          logo={team.clubLogo || team.teamLogo || team.playHQLogo || null}
          teamName={team.teamName}
          delay={delay}
          glass={glass}
          containerHeight={crestContainerHeight}
          className="shrink-0 self-center overflow-hidden"
        />
        <div className="flex min-h-0 min-w-0 flex-1 items-center overflow-hidden">
          <LadderTeamName
            value={team.teamName}
            variant={nameVariant}
            textAlign="left"
            delay={delay}
            letterAnimation="none"
            className="truncate font-normal uppercase tracking-wide leading-none"
            fontFamily={headingFont}
            style={{
              ...ladderCellTextStyle(typography.nameFontPx),
              transform: `translateY(${TEKO_LADDER_NAME_NUDGE_EM}em)`,
            }}
          />
        </div>
      </div>

      {[team.P, team.W, team.L].map((val, i) => (
        <div
          key={i}
          className="flex w-[90px] flex-shrink-0 items-center justify-center"
          style={{
            ...rowFixedHeight,
            background: glass.dataCell,
            ...cellBlur,
            fontFamily: headingFont,
          }}
        >
          <BroadcastProScoreText
            value={String(val ?? 0)}
            role="tableStat"
            variant={statVariant}
            animation={{ ...copyIn, delay }}
            fontFamily={headingFont}
            compact={typography.scoreCompact}
            style={ladderCellTextStyle(typography.statFontPx)}
          />
        </div>
      ))}

      <div
        className="flex w-[100px] flex-shrink-0 items-center justify-center"
        style={{
          ...rowFixedHeight,
          background: glass.dataCellStrong,
          ...cellBlur,
          fontFamily: headingFont,
        }}
      >
        <BroadcastProScoreText
          value={String(team.PTS ?? 0)}
          role="tablePoints"
          variant={pointsVariant}
          animation={{ ...copyIn, delay }}
          fontFamily={headingFont}
          compact={typography.scoreCompact}
          style={ladderCellTextStyle(typography.pointsFontPx, 700)}
        />
      </div>
    </div>
  );
};

export default BroadcastProLadderRow;
