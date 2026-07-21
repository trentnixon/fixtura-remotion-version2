import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";

/**
 * Team roster (Broadcast Pro): grid, glass cells, meta — Teko/Rajdhani via classes.
 * `RosterPlayerName` / index `fontSize` often set inline from layout metrics.
 */
export const broadcastProCompositionComponentStylesRoster = {
  RosterPlayerName: {
    /** `block` + `leading-none`: avoid `flex` on AnimatedText root (extra line-box vs glyphs; breaks vertical center in row cells). */
    className:
      "font-teko block min-w-0 truncate font-normal uppercase leading-none tracking-wide",
  },

  broadcastProRosterRoot: {
    className: "mt-8 flex h-full min-h-0 w-full flex-col p-0",
  },
  broadcastProRosterPlayerNumber: {
    className:
      "font-teko flex min-h-0 min-w-0 flex-shrink-0 items-stretch justify-center self-stretch p-0 font-normal leading-none",
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
      "col-span-12 flex min-h-0 flex-col gap-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:col-span-5",
  },
  broadcastProRosterContentShell: {
    className: "flex min-h-0 flex-col gap-4 px-2",
  },
  broadcastProRosterAnimatedContainer: {
    className: "mx-6 flex flex-1 flex-col overflow-hidden",
  },
  broadcastProRosterPlayerList: {
    className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pr-1",
  },
  broadcastProRosterRow: {
    className:
      "flex min-h-0 min-w-0 flex-[1_1_0] items-stretch gap-2 overflow-hidden",
  },
  broadcastProRosterNameCell: {
    className:
      "flex h-full min-h-0 min-w-0 flex-1 items-stretch justify-start self-stretch",
  },
  broadcastProRosterMetaStack: {
    className: "flex min-h-0 flex-1 flex-col gap-3",
  },
  broadcastProRosterTeamCardHome: {
    className: "flex flex-shrink-0 flex-col items-center p-5 text-center",
  },
  broadcastProRosterTeamCardAway: {
    className: "flex flex-col items-center p-4 text-center",
  },
  broadcastProRosterTeamLogoWellHome: {
    className: "mb-4 flex h-32 w-32 items-center justify-center",
  },
  broadcastProRosterTeamLogoWellAway: {
    className: "mb-3 flex h-24 w-24 items-center justify-center",
  },
  broadcastProRosterTeamTitleHome: {
    className: "font-teko text-4xl uppercase sm:text-5xl",
  },
  broadcastProRosterTeamTitleAway: {
    className: "font-teko text-3xl uppercase sm:text-4xl",
  },
  broadcastProRosterTeamLabelHome: {
    className: "font-rajdhani mt-1 text-sm font-bold uppercase tracking-widest",
  },
  broadcastProRosterTeamLabelAway: {
    className:
      "font-rajdhani mt-0.5 text-xs font-bold uppercase tracking-widest",
  },
  broadcastProRosterVersus: {
    className: "font-teko mb-1.5 text-2xl italic sm:text-3xl",
  },
  broadcastProRosterMetaRow: {
    className: "p-4",
  },
  broadcastProRosterMetaLabel: {
    className:
      "font-rajdhani block text-xs font-bold uppercase tracking-widest",
  },
  broadcastProRosterMetaValue: {
    className: "font-teko block truncate text-2xl uppercase sm:text-3xl",
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
  | "broadcastProRosterTeamTitleHome"
  | "broadcastProRosterTeamTitleAway"
  | "broadcastProRosterTeamLabelHome"
  | "broadcastProRosterTeamLabelAway"
  | "broadcastProRosterVersus"
  | "broadcastProRosterMetaRow"
  | "broadcastProRosterMetaLabel"
  | "broadcastProRosterMetaValue"
  | "broadcastProRosterAccentStrip"
>;
