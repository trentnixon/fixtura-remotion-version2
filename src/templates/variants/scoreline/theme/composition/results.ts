import { scorelineComponentStylesShared } from "../componentStyles.shared";

export const scorelineCompositionComponentStylesResults = {
  scorelineResultsLedger: {
    className: "min-h-0 flex-1 overflow-hidden",
  },
  scorelineResultsMatchModule: {
    className: "flex min-h-0 flex-1 flex-col overflow-hidden",
  },
  scorelineResultsSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineDisplayScore: scorelineComponentStylesShared.scorelineDisplayScore,
  scorelineDisplayTeam: scorelineComponentStylesShared.scorelineDisplayTeam,
  scorelineBodyMeta: scorelineComponentStylesShared.scorelineBodyMeta,
  scorelineBodyPlayer: scorelineComponentStylesShared.scorelineBodyPlayer,
  scorelineFigure: scorelineComponentStylesShared.scorelineFigure,
};
