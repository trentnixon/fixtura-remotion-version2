import React, { type CSSProperties } from "react";
import { useVideoConfig } from "remotion";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { cellBlur } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import { useBroadcastProRoundedTheme } from "../../../../../compositions/cricket/utils/broadcastProRounded";
import LadderTeamName from "../../../../../compositions/cricket/utils/primitives/ladderTeamName";
import { useFittedTextBoxFontSize } from "../../../../../components/typography/utils/useFittedTextBoxFontSize";
import type { BroadcastProRoundedGlassStyle } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import {
  BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY,
  type BroadcastProRoundedMatchupSideInput,
  type BroadcastProRoundedMatchupTier,
} from "../../../../../templates/types/broadcast-pro-rounded/matchup";
import { getBroadcastProRoundedRosterSidebarWidth } from "../../../../../templates/types/broadcast-pro-rounded/roster-list-sizing";
import { BroadcastProRoundedCrestWell } from "../crest/BroadcastProRoundedCrestWell";
import { BroadcastProRoundedMatchupDivider } from "./BroadcastProRoundedMatchupDivider";
import { BroadcastProRoundedMatchupSide } from "./BroadcastProRoundedMatchupSide";

export interface BroadcastProRoundedMatchupProps {
  tier: BroadcastProRoundedMatchupTier;
  home: BroadcastProRoundedMatchupSideInput;
  away: BroadcastProRoundedMatchupSideInput;
  glass: BroadcastProRoundedGlassStyle;
  delay?: number;
  /** Fixture tier: smaller VS + team names when glass panel is short. */
  compact?: boolean;
  /** Fixture tier: adaptive crest well sizing. */
  containerHeight?: number;
  className?: string;
  style?: CSSProperties;
  fontFamily?: string;
  /** Result tier: render team row + trailing stats for each side. */
  renderResultBlock?: (
    side: "home" | "away",
    input: BroadcastProRoundedMatchupSideInput,
  ) => React.ReactNode;
}

export const BroadcastProRoundedMatchup: React.FC<
  BroadcastProRoundedMatchupProps
> = ({
  tier,
  home,
  away,
  glass,
  delay = 0,
  compact = false,
  containerHeight,
  className = "",
  style,
  fontFamily,
  renderResultBlock,
}) => {
  const { componentStyles, layout } = useThemeContext();
  const { textOnGlass, headingFont } = useBroadcastProRoundedTheme();
  const { width: compositionWidth } = useVideoConfig();
  const cellRadius = layout.borderRadius.container;
  const resolvedFont = fontFamily ?? headingFont;

  const rosterSidebarWidth =
    getBroadcastProRoundedRosterSidebarWidth(compositionWidth);
  const homeTitleFontSize = useFittedTextBoxFontSize({
    text: tier === "roster" ? home.teamName : "",
    fontFamily: resolvedFont,
    withinWidth: Math.max(0, rosterSidebarWidth - 42),
    maxLines: 2,
    minFontSize: 26,
    maxFontSize: 36,
  });
  const awayTitleFontSize = useFittedTextBoxFontSize({
    text: tier === "roster" ? away.teamName : "",
    fontFamily: resolvedFont,
    withinWidth: Math.max(0, rosterSidebarWidth - 34),
    maxLines: 2,
    minFontSize: 24,
    maxFontSize: 32,
  });

  const layoutKey = BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY[tier];
  const layoutClass = csClass(componentStyles, layoutKey);

  if (tier === "fixture") {
    return (
      <div className={`${layoutClass} ${className}`.trim()} style={style}>
        <BroadcastProRoundedMatchupSide
          side="home"
          input={home}
          delay={delay}
          glass={glass}
          containerHeight={containerHeight}
          compact={compact}
          fontFamily={resolvedFont}
        />
        <BroadcastProRoundedMatchupDivider
          variant="vs"
          delay={delay}
          compact={compact}
          fontFamily={resolvedFont}
        />
        <BroadcastProRoundedMatchupSide
          side="away"
          input={away}
          delay={delay}
          glass={glass}
          containerHeight={containerHeight}
          compact={compact}
          fontFamily={resolvedFont}
        />
      </div>
    );
  }

  if (tier === "result") {
    if (renderResultBlock == null) {
      return null;
    }
    return (
      <div className={`${layoutClass} ${className}`.trim()} style={style}>
        {renderResultBlock("home", home)}
        {renderResultBlock("away", away)}
      </div>
    );
  }

  const homeCardClass = csClass(
    componentStyles,
    "broadcastProRoundedRosterTeamCardHome",
  );
  const awayCardClass = csClass(
    componentStyles,
    "broadcastProRoundedRosterTeamCardAway",
  );
  const homeTitleClass = csClass(
    componentStyles,
    "broadcastProRoundedRosterTeamTitleHome",
  );
  const awayTitleClass = csClass(
    componentStyles,
    "broadcastProRoundedRosterTeamTitleAway",
  );
  const homeLabelClass = csClass(
    componentStyles,
    "broadcastProRoundedRosterTeamLabelHome",
  );
  const awayLabelClass = csClass(
    componentStyles,
    "broadcastProRoundedRosterTeamLabelAway",
  );

  const panelStyle: CSSProperties = {
    ...cellBlur,
    backgroundColor: glass.panel,
    border: glass.border,
  };

  return (
    <div className={`${layoutClass} ${className}`.trim()} style={style}>
      <div
        className={`overflow-hidden ${cellRadius} ${homeCardClass}`.trim()}
        style={panelStyle}
      >
        <BroadcastProRoundedCrestWell
          tier="rosterHome"
          logo={home.logo}
          teamName={home.teamName}
          delay={delay}
          glass={glass}
        />
        <LadderTeamName
          value={home.teamName.toUpperCase()}
          variant="onContainerTitle"
          fontFamily={resolvedFont}
          letterAnimation="none"
          delay={delay}
          textAlign="center"
          className={homeTitleClass}
          style={{
            color: textOnGlass.copy,
            fontSize: homeTitleFontSize,
          }}
        />
        {home.roleLabel != null && home.roleLabel !== "" && (
          <span
            className={homeLabelClass}
            style={{ color: textOnGlass.secondary }}
          >
            {home.roleLabel}
          </span>
        )}
      </div>

      <div
        className={`overflow-hidden ${cellRadius} ${awayCardClass}`.trim()}
        style={panelStyle}
      >
        <BroadcastProRoundedMatchupDivider variant="versus" delay={delay} />
        <BroadcastProRoundedCrestWell
          tier="rosterAway"
          logo={away.logo}
          teamName={away.teamName}
          delay={delay}
          glass={glass}
        />
        <LadderTeamName
          value={away.teamName.toUpperCase()}
          variant="onContainerTitle"
          fontFamily={resolvedFont}
          letterAnimation="none"
          delay={delay}
          textAlign="center"
          className={awayTitleClass}
          style={{
            color: textOnGlass.copy,
            fontSize: awayTitleFontSize,
          }}
        />
        {away.roleLabel != null && away.roleLabel !== "" && (
          <span
            className={awayLabelClass}
            style={{ color: textOnGlass.secondary }}
          >
            {away.roleLabel}
          </span>
        )}
      </div>
    </div>
  );
};
