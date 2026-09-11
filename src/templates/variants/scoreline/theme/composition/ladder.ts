import { scorelineComponentStylesShared } from "../componentStyles.shared";

export const scorelineCompositionComponentStylesLadder = {
  scorelineLadderLedger: {
    className: "min-h-0 flex-1 overflow-hidden",
  },
  scorelineLadderRow: {
    className: "grid min-h-0 flex-1 items-center gap-2 px-3 py-1.5",
  },
  scorelineLadderSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineBodyMeta: scorelineComponentStylesShared.scorelineBodyMeta,
};
