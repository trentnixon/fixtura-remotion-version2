import { scorelineComponentStylesShared } from "../componentStyles.shared";

export const scorelineCompositionComponentStylesLadder = {
  scorelineLadderLedger: {
    className: "flex min-h-0 flex-1 flex-col overflow-hidden px-7 py-0",
  },
  scorelineLadderRow: {
    className:
      "grid min-h-0 flex-1 items-center gap-2 px-3 py-1.5 bg-white",
  },
  scorelineLadderSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineBodyMeta: scorelineComponentStylesShared.scorelineBodyMeta,
};
