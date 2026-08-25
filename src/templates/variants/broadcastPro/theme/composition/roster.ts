import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";

/**
 * Team roster (Broadcast Pro): grid, glass cells, meta — Teko/Rajdhani via classes.
 * `RosterPlayerName` / index `fontSize` often set inline from layout metrics.
 */
export const broadcastProCompositionComponentStylesRoster = {
  RosterPlayerName: {
    /** `block` + relaxed leading: Teko caps need room inside fixed row cells. */
    className:
      "font-teko block min-w-0 whitespace-nowrap font-normal uppercase leading-tight tracking-wide",
  },

  broadcastProRosterRoot: {
    className: "flex h-full min-h-0 w-full flex-col p-0 pt-6",
  },
  broadcastProRosterPlayerNumber: {
    className:
      "flex min-h-0 min-w-0 flex-shrink-0 items-stretch justify-center self-stretch p-0",
  },
  broadcastProRosterGrid: {
    className: "grid min-h-0 flex-1 grid-cols-12 gap-6 overflow-hidden",
  },
  broadcastProRosterLineupColumn: {
    className:
      "col-span-12 flex min-h-0 flex-col overflow-hidden lg:col-span-7",
  },
  broadcastProRosterSidebar: {
    className:
      "col-span-12 flex min-h-0 flex-col gap-3 overflow-hidden lg:col-span-5",
  },
  broadcastProRosterContentShell: {
    className: "flex min-h-0 flex-col gap-4 px-2",
  },
  broadcastProRosterAnimatedContainer: {
    className: "mx-6 flex flex-1 flex-col overflow-hidden",
  },
  broadcastProRosterPlayerList: {
    className:
      "flex min-h-0 min-w-0 flex-1 flex-col justify-start overflow-hidden pr-1",
  },
  broadcastProRosterRow: {
    className: "flex min-h-0 min-w-0 shrink-0 grow-0 items-stretch gap-2",
  },
  broadcastProRosterNameCell: {
    className:
      "flex h-full min-h-0 min-w-0 flex-1 items-stretch justify-start self-stretch",
  },
  broadcastProRosterMetaStack: {
    className: "flex min-h-0 flex-1 flex-col gap-2",
  },
  broadcastProRosterTeamCardHome: {
    className: "flex flex-shrink-0 flex-col items-center p-3 text-center",
  },
  broadcastProRosterTeamCardAway: {
    className: "flex flex-col items-center p-3 text-center",
  },
  broadcastProRosterTeamLogoWellHome: {
    className: "mb-2 flex h-16 w-16 items-center justify-center",
  },
  broadcastProRosterTeamLogoWellAway: {
    className: "mb-2 flex h-14 w-14 items-center justify-center",
  },
  broadcastProCrestWellRosterHome: {
    className: "mb-2 flex h-16 w-16 items-center justify-center",
  },
  broadcastProCrestWellRosterAway: {
    className: "mb-2 flex h-14 w-14 items-center justify-center",
  },
  broadcastProRosterTeamTitleHome: {
    className:
      "font-teko line-clamp-2 w-full text-4xl uppercase leading-tight sm:text-5xl",
  },
  broadcastProRosterTeamTitleAway: {
    className:
      "font-teko line-clamp-2 w-full text-3xl uppercase leading-tight sm:text-4xl",
  },
  broadcastProRosterTeamLabelHome: {
    className: "font-rajdhani mt-1 text-sm font-bold uppercase tracking-widest",
  },
  broadcastProRosterTeamLabelAway: {
    className:
      "font-rajdhani mt-0.5 text-xs font-bold uppercase tracking-widest",
  },
  broadcastProRosterVersus: {
    className: "font-teko mb-1 text-2xl italic leading-none",
  },
  broadcastProMatchupDividerVersus: {
    className: "font-teko mb-1 text-2xl italic leading-none",
  },
  broadcastProMatchupRosterSidebar: {
    className: "flex flex-col gap-3",
  },
  broadcastProRosterMetaRow: {
    className: "p-3",
  },
  broadcastProRosterMetaLabel: {
    className:
      "font-rajdhani block text-xs font-bold uppercase tracking-widest",
  },
  broadcastProRosterMetaValue: {
    className:
      "font-teko line-clamp-2 text-2xl uppercase leading-tight sm:text-[28px]",
  },
  broadcastProRosterAccentStrip: {
    className: "w-1.5 shrink-0 self-stretch rounded-sm",
  },
} satisfies Pick<
  ThemeComponentStyles,
  | "RosterPlayerName"
  | "broadcastProRosterRoot"
  | "broadcastProRosterPlayerNumber"
  | "broadcastProRosterGrid"
  | "broadcastProRosterLineupColumn"
  | "broadcastProRosterSidebar"
  | "broadcastProRosterContentShell"
  | "broadcastProRosterAnimatedContainer"
  | "broadcastProRosterPlayerList"
  | "broadcastProRosterRow"
  | "broadcastProRosterNameCell"
  | "broadcastProRosterMetaStack"
  | "broadcastProRosterTeamCardHome"
  | "broadcastProRosterTeamCardAway"
  | "broadcastProRosterTeamLogoWellHome"
  | "broadcastProRosterTeamLogoWellAway"
  | "broadcastProCrestWellRosterHome"
  | "broadcastProCrestWellRosterAway"
  | "broadcastProRosterTeamTitleHome"
  | "broadcastProRosterTeamTitleAway"
  | "broadcastProRosterTeamLabelHome"
  | "broadcastProRosterTeamLabelAway"
  | "broadcastProRosterVersus"
  | "broadcastProMatchupDividerVersus"
  | "broadcastProMatchupRosterSidebar"
  | "broadcastProRosterMetaRow"
  | "broadcastProRosterMetaLabel"
  | "broadcastProRosterMetaValue"
  | "broadcastProRosterAccentStrip"
>;
