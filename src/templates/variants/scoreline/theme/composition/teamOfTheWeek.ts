import { scorelineComponentStylesShared } from "../componentStyles.shared";

export const scorelineCompositionComponentStylesTeamOfTheWeek = {
  scorelineTotwLedger: {
    className: "flex min-h-0 flex-1 flex-col overflow-hidden px-7 py-0",
  },
  scorelineTotwRow: {
    className:
      "grid min-h-0 flex-1 items-center gap-3 px-4 py-2 bg-white",
  },
  scorelineTotwSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineFigure: scorelineComponentStylesShared.scorelineFigure,
  scorelineBodyPlayer: scorelineComponentStylesShared.scorelineBodyPlayer,
};
