import { scorelineComponentStylesShared } from "../componentStyles.shared";

export const scorelineCompositionComponentStylesTeamOfTheWeek = {
  scorelineTotwLedger: {
    className: "min-h-0 flex-1 overflow-hidden",
  },
  scorelineTotwRow: {
    className: "grid min-h-0 flex-1 items-center gap-3 px-4 py-2",
  },
  scorelineTotwSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineFigure: scorelineComponentStylesShared.scorelineFigure,
  scorelineBodyPlayer: scorelineComponentStylesShared.scorelineBodyPlayer,
};
