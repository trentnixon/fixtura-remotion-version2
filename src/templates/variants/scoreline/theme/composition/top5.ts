import { scorelineComponentStylesShared } from "../componentStyles.shared";

export const scorelineCompositionComponentStylesTop5 = {
  scorelineTop5Ledger: {
    className: "min-h-0 flex-1 overflow-hidden",
  },
  scorelineLeaderRow: {
    className: "grid min-h-0 flex-1 items-center gap-3 px-4 py-2",
  },
  scorelineTop5SponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineFigure: scorelineComponentStylesShared.scorelineFigure,
  scorelineBodyPlayer: scorelineComponentStylesShared.scorelineBodyPlayer,
};
