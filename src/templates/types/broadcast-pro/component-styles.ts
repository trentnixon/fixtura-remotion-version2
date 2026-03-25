import type { ComponentStyle } from "../global/component-style";

/**
 * Broadcast Pro–specific `componentStyles` keys (optional on the merged theme).
 * Pair with {@link GlobalThemeComponentStyles} for full `ThemeComponentStyles`.
 */
export interface BroadcastProThemeComponentStyles {
  /** Upcoming fixtures: date/time/ground strip (optional). */
  upcomingFixtureHeader?: ComponentStyle;
  /** Upcoming: team name on glass panel (optional). */
  upcomingTeamName?: ComponentStyle;
  /** Upcoming: VS label (optional). */
  upcomingVs?: ComponentStyle;
  /** Team roster: root wrapper (margin + flex shell). */
  broadcastProRosterRoot?: ComponentStyle;
  /** Roster: numbered index cell (Teko; font-size may be set inline for row scaling). */
  broadcastProRosterPlayerNumber?: ComponentStyle;
  /** Roster: main grid (12-col + gap). */
  broadcastProRosterGrid?: ComponentStyle;
  /** Roster: left column (line-up list). */
  broadcastProRosterLineupColumn?: ComponentStyle;
  /** Roster: right column (teams + meta). */
  broadcastProRosterSidebar?: ComponentStyle;
  /** Roster: height shell (padding + gap under animated container). */
  broadcastProRosterContentShell?: ComponentStyle;
  /** Roster: AnimatedContainer outer (before `layout.borderRadius.container`). */
  broadcastProRosterAnimatedContainer?: ComponentStyle;
  /** Roster: scrollable player list column. */
  broadcastProRosterPlayerList?: ComponentStyle;
  /** Roster: one player row. */
  broadcastProRosterRow?: ComponentStyle;
  /** Roster: player name glass cell. */
  broadcastProRosterNameCell?: ComponentStyle;
  /** Roster: LOCATION / GRADE / DATE stack. */
  broadcastProRosterMetaStack?: ComponentStyle;
  /** Roster: home / account team glass card. */
  broadcastProRosterTeamCardHome?: ComponentStyle;
  /** Roster: away / opponent team glass card. */
  broadcastProRosterTeamCardAway?: ComponentStyle;
  /** Roster: team logo well (home). */
  broadcastProRosterTeamLogoWellHome?: ComponentStyle;
  /** Roster: team logo well (away). */
  broadcastProRosterTeamLogoWellAway?: ComponentStyle;
  /** Roster: home team name (LadderTeamName className). */
  broadcastProRosterTeamTitleHome?: ComponentStyle;
  /** Roster: away team name (smaller). */
  broadcastProRosterTeamTitleAway?: ComponentStyle;
  /** Roster: HOME TEAM / AWAY TEAM label under account team. */
  broadcastProRosterTeamLabelHome?: ComponentStyle;
  /** Roster: opponent role label (smaller). */
  broadcastProRosterTeamLabelAway?: ComponentStyle;
  /** Roster: “VERSUS” line. */
  broadcastProRosterVersus?: ComponentStyle;
  /** Roster: meta row container. */
  broadcastProRosterMetaRow?: ComponentStyle;
  broadcastProRosterMetaLabel?: ComponentStyle;
  broadcastProRosterMetaValue?: ComponentStyle;
  /** Roster: vertical accent strip beside the player list. */
  broadcastProRosterAccentStrip?: ComponentStyle;
}
