import { scorelineComponentStylesShared } from "../componentStyles.shared";

export const scorelineCompositionComponentStylesRoster = {
  scorelineRosterLedger: {
    className: "flex min-h-0 flex-col overflow-hidden",
  },
  scorelineRosterLineupRow: {
    className: "grid grid-cols-[36px_minmax(0,1fr)] items-center gap-3 px-2",
  },
  scorelineRosterSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineBodyMeta: scorelineComponentStylesShared.scorelineBodyMeta,
};
