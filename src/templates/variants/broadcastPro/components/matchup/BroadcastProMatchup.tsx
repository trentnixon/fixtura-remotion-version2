import React, { type CSSProperties } from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { cellBlur } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import { useBroadcastProTheme } from "../../../../../compositions/cricket/utils/broadcastPro";
import LadderTeamName from "../../../../../compositions/cricket/utils/primitives/ladderTeamName";
import { truncateText } from "../../../../../compositions/cricket/utils/utils-text";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import {
  BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY,
  type BroadcastProMatchupSideInput,
  type BroadcastProMatchupTier,
} from "../../../../../templates/types/broadcast-pro/matchup";
import { BroadcastProCrestWell } from "../crest/BroadcastProCrestWell";
import { BroadcastProMatchupDivider } from "./BroadcastProMatchupDivider";
import { BroadcastProMatchupSide } from "./BroadcastProMatchupSide";

export interface BroadcastProMatchupProps {
  tier: BroadcastProMatchupTier;
  home: BroadcastProMatchupSideInput;
  away: BroadcastProMatchupSideInput;
  glass: BroadcastProGlassStyle;
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
    input: BroadcastProMatchupSideInput,
  ) => React.ReactNode;
}

export const BroadcastProMatchup: React.FC<BroadcastProMatchupProps> = ({
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
  const { componentStyles } = useThemeContext();
  const { textOnGlass, headingFont } = useBroadcastProTheme();
  const resolvedFont = fontFamily ?? headingFont;

  const layoutKey = BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY[tier];
  const layoutClass = csClass(componentStyles, layoutKey);

  if (tier === "fixture") {
    return (
      <div className={`${layoutClass} ${className}`.trim()} style={style}>
        <BroadcastProMatchupSide
          side="home"
          input={home}
          delay={delay}
          glass={glass}
          containerHeight={containerHeight}
          compact={compact}
          fontFamily={resolvedFont}
        />
        <BroadcastProMatchupDivider
          variant="vs"
          delay={delay}
          compact={compact}
          fontFamily={resolvedFont}
        />
        <BroadcastProMatchupSide
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
    "broadcastProRosterTeamCardHome",
  );
  const awayCardClass = csClass(
    componentStyles,
    "broadcastProRosterTeamCardAway",
  );
  const homeTitleClass = csClass(
    componentStyles,
    "broadcastProRosterTeamTitleHome",
  );
  const awayTitleClass = csClass(
    componentStyles,
    "broadcastProRosterTeamTitleAway",
  );
  const homeLabelClass = csClass(
    componentStyles,
    "broadcastProRosterTeamLabelHome",
  );
  const awayLabelClass = csClass(
    componentStyles,
    "broadcastProRosterTeamLabelAway",
  );

  const panelStyle: CSSProperties = {
    ...cellBlur,
    backgroundColor: glass.panel,
    border: glass.border,
  };

  return (
    <div className={`${layoutClass} ${className}`.trim()} style={style}>
      <div className={homeCardClass} style={panelStyle}>
        <BroadcastProCrestWell
          tier="rosterHome"
          logo={home.logo}
          teamName={home.teamName}
          delay={delay}
          glass={glass}
        />
        <LadderTeamName
          value={truncateText(home.teamName, 42).toUpperCase()}
          variant="onContainerTitle"
          fontFamily={resolvedFont}
          letterAnimation="none"
          delay={delay}
          textAlign="center"
          className={homeTitleClass}
          style={{ color: textOnGlass.copy }}
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

      <div className={awayCardClass} style={panelStyle}>
        <BroadcastProMatchupDivider variant="versus" delay={delay} />
        <BroadcastProCrestWell
          tier="rosterAway"
          logo={away.logo}
          teamName={away.teamName}
          delay={delay}
          glass={glass}
        />
        <LadderTeamName
          value={truncateText(away.teamName, 36).toUpperCase()}
          variant="onContainerTitle"
          fontFamily={resolvedFont}
          letterAnimation="none"
          delay={delay}
          textAlign="center"
          className={awayTitleClass}
          style={{ color: textOnGlass.copy }}
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
