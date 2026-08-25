import React, { type CSSProperties } from "react";
import { useVideoConfig } from "remotion";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { cellBlur } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import { useBroadcastProTheme } from "../../../../../compositions/cricket/utils/broadcastPro";
import LadderTeamName from "../../../../../compositions/cricket/utils/primitives/ladderTeamName";
import { useFittedTextBoxFontSize } from "../../../../../components/typography/utils/useFittedTextBoxFontSize";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import type { BroadcastProFixtureDensity } from "../../../../types/broadcast-pro/fixture-density";
import {
  BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY,
  type BroadcastProMatchupSideInput,
  type BroadcastProMatchupTier,
} from "../../../../../templates/types/broadcast-pro/matchup";
import { getBroadcastProRosterSidebarWidth } from "../../../../../templates/types/broadcast-pro/roster-list-sizing";
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
  /** Fixture tier selected from the number of fixtures on screen. */
  fixtureDensity?: BroadcastProFixtureDensity;
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
  animateContent?: boolean;
}

export const BroadcastProMatchup: React.FC<BroadcastProMatchupProps> = ({
  tier,
  home,
  away,
  glass,
  delay = 0,
  compact = false,
  fixtureDensity = "standard",
  containerHeight,
  className = "",
  style,
  fontFamily,
  renderResultBlock,
  animateContent = true,
}) => {
  const { componentStyles } = useThemeContext();
  const { textOnGlass, headingFont } = useBroadcastProTheme();
  const { width: compositionWidth } = useVideoConfig();
  const resolvedFont = fontFamily ?? headingFont;

  const rosterSidebarWidth =
    getBroadcastProRosterSidebarWidth(compositionWidth);
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
        <BroadcastProMatchupSide
          side="home"
          input={home}
          delay={delay}
          glass={glass}
          containerHeight={containerHeight}
          compact={compact}
          fixtureDensity={fixtureDensity}
          animateContent={animateContent}
          fontFamily={resolvedFont}
        />
        <BroadcastProMatchupDivider
          variant="vs"
          delay={delay}
          compact={compact}
          fontFamily={resolvedFont}
          animateContent={animateContent}
        />
        <BroadcastProMatchupSide
          side="away"
          input={away}
          delay={delay}
          glass={glass}
          containerHeight={containerHeight}
          compact={compact}
          fixtureDensity={fixtureDensity}
          animateContent={animateContent}
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
