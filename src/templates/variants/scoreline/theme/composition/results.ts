import { scorelineComponentStylesShared } from "../componentStyles.shared";

export const scorelineCompositionComponentStylesResults = {
  scorelineResultsLedger: {
    className: "flex min-h-0 flex-1 flex-col gap-0 overflow-hidden px-7 py-0",
  },
  scorelineResultsMatchModule: {
    className: "flex min-h-0 flex-1 flex-col overflow-hidden",
  },
  scorelineResultsSponsorStrip: {
    className:
      "relative isolate flex min-h-[88px] w-full items-center justify-evenly gap-6 overflow-hidden px-6 py-4",
  },
  scorelineDisplayScore: scorelineComponentStylesShared.scorelineDisplayScore,
  scorelineDisplayTeam: scorelineComponentStylesShared.scorelineDisplayTeam,
  scorelineBodyMeta: scorelineComponentStylesShared.scorelineBodyMeta,
  scorelineBodyPlayer: scorelineComponentStylesShared.scorelineBodyPlayer,
  scorelineFigure: scorelineComponentStylesShared.scorelineFigure,
};
