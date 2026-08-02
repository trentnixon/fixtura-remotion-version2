import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProRoundedComponentStylesShared } from "../componentStyles.shared";

/**
 * Team roster (Broadcast Pro): grid, glass cells, meta — Teko/Rajdhani via classes.
 * `RosterPlayerName` / index `fontSize` often set inline from layout metrics.
 */
export const broadcastProRoundedCompositionComponentStylesRoster = {
  RosterPlayerName: {
    /** `block` + relaxed leading: Teko caps need room inside fixed row cells. */
    className:
      "font-teko block min-w-0 whitespace-nowrap font-normal uppercase leading-tight tracking-wide",
  },

  broadcastProRoundedRosterRoot: {
    className: "flex h-full min-h-0 w-full flex-col p-0 pt-6",
  },
  broadcastProRoundedRosterPlayerNumber: {
    className:
      "flex min-h-0 min-w-0 flex-shrink-0 items-stretch justify-center self-stretch p-0",
  },
  broadcastProRoundedRosterGrid: {
    className: "grid h-full min-h-0 flex-1 grid-cols-12 gap-6 overflow-hidden",
  },
  broadcastProRoundedRosterLineupColumn: {
    className:
      "col-span-12 flex h-full min-h-0 flex-col overflow-hidden lg:col-span-7",
  },
  broadcastProRoundedRosterSidebar: {
    className:
      "col-span-12 flex min-h-0 flex-col justify-start gap-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:col-span-5",
  },
  broadcastProRoundedRosterContentShell: {
    className: "flex min-h-0 flex-1 flex-col gap-4 px-2",
  },
  broadcastProRoundedRosterAnimatedContainer: {
    className: "mx-6 flex min-h-0 flex-1 flex-col overflow-hidden",
  },
  broadcastProRoundedRosterPlayerList: {
    className:
      "flex min-h-0 min-w-0 flex-1 flex-col justify-start overflow-hidden pr-1",
  },
  broadcastProRoundedRosterRow: {
    className: "flex min-h-0 min-w-0 shrink-0 grow-0 items-stretch gap-2",
  },
  broadcastProRoundedRosterNameCell: {
    className:
      "flex h-full min-h-0 min-w-0 flex-1 items-stretch justify-start self-stretch",
  },
  broadcastProRoundedRosterMetaStack: {
    className: "flex flex-col gap-1",
  },
  broadcastProRoundedRosterTeamCardHome: {
    className: "flex flex-shrink-0 flex-col items-center p-5 text-center",
  },
  broadcastProRoundedRosterTeamCardAway: {
    className: "flex flex-shrink-0 flex-col items-center p-4 text-center",
  },
  broadcastProRoundedRosterTeamLogoWellHome:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedCrestWellRosterHome,
  broadcastProRoundedRosterTeamLogoWellAway:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedCrestWellRosterAway,
  broadcastProRoundedRosterTeamTitleHome: {
    className: "font-teko text-4xl uppercase sm:text-5xl",
  },
  broadcastProRoundedRosterTeamTitleAway: {
    className: "font-teko text-3xl uppercase sm:text-4xl",
  },
  broadcastProRoundedRosterTeamLabelHome: {
    className: "font-rajdhani mt-1 text-sm font-bold uppercase tracking-widest",
  },
  broadcastProRoundedRosterTeamLabelAway: {
    className:
      "font-rajdhani mt-0.5 text-xs font-bold uppercase tracking-widest",
  },
  broadcastProRoundedRosterVersus:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedMatchupDividerVersus,
  broadcastProRoundedRosterMetaRow: {
    className: "p-4",
  },
  broadcastProRoundedRosterMetaLabel: {
    className:
      "font-rajdhani block text-xs font-bold uppercase tracking-widest",
  },
  broadcastProRoundedRosterMetaValue: {
    className:
      "font-teko line-clamp-2 text-2xl uppercase leading-tight sm:text-3xl",
  },
  broadcastProRoundedRosterAccentStrip: {
    className: "w-1.5 shrink-0 self-stretch rounded-full",
  },
} satisfies Pick<
  ThemeComponentStyles,
  | "RosterPlayerName"
  | "broadcastProRoundedRosterRoot"
  | "broadcastProRoundedRosterPlayerNumber"
  | "broadcastProRoundedRosterGrid"
  | "broadcastProRoundedRosterLineupColumn"
  | "broadcastProRoundedRosterSidebar"
  | "broadcastProRoundedRosterContentShell"
  | "broadcastProRoundedRosterAnimatedContainer"
  | "broadcastProRoundedRosterPlayerList"
  | "broadcastProRoundedRosterRow"
  | "broadcastProRoundedRosterNameCell"
  | "broadcastProRoundedRosterMetaStack"
  | "broadcastProRoundedRosterTeamCardHome"
  | "broadcastProRoundedRosterTeamCardAway"
  | "broadcastProRoundedRosterTeamLogoWellHome"
  | "broadcastProRoundedRosterTeamLogoWellAway"
  | "broadcastProRoundedRosterTeamTitleHome"
  | "broadcastProRoundedRosterTeamTitleAway"
  | "broadcastProRoundedRosterTeamLabelHome"
  | "broadcastProRoundedRosterTeamLabelAway"
  | "broadcastProRoundedRosterVersus"
  | "broadcastProRoundedRosterMetaRow"
  | "broadcastProRoundedRosterMetaLabel"
  | "broadcastProRoundedRosterMetaValue"
  | "broadcastProRoundedRosterAccentStrip"
>;
