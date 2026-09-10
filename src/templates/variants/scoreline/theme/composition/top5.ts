import { scorelineComponentStylesShared } from "../componentStyles.shared";

export const scorelineCompositionComponentStylesTop5 = {
  scorelineTop5Ledger: {
    className: "flex min-h-0 flex-1 flex-col overflow-hidden px-7 py-0",
  },
  scorelineLeaderRow: {
    className:
      "grid min-h-0 flex-1 items-center gap-3 px-4 py-2 bg-white",
  },
  scorelineTop5SponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineFigure: scorelineComponentStylesShared.scorelineFigure,
  scorelineBodyPlayer: scorelineComponentStylesShared.scorelineBodyPlayer,
};
