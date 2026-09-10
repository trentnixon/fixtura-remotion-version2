import { scorelineComponentStylesShared } from "../componentStyles.shared";

export const scorelineCompositionComponentStylesUpcoming = {
  scorelineUpcomingLedger: {
    className: "flex min-h-0 flex-1 flex-col gap-0 overflow-hidden px-7 py-0",
  },
  scorelineUpcomingFixtureCard: {
    className: "flex min-h-0 flex-col justify-center bg-white px-1 py-2",
  },
  scorelineUpcomingSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineBodyMeta: scorelineComponentStylesShared.scorelineBodyMeta,
};
