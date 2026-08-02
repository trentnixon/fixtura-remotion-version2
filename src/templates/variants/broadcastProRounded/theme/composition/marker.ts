import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";

/**
 * Graphic notch and marker language (ticket 17).
 */
export const broadcastProRoundedCompositionComponentStylesMarker = {
  broadcastProRoundedMarkerChipQualification: {
    className:
      "inline-flex shrink-0 items-center px-4 py-1 text-3xl font-normal uppercase tracking-widest leading-none",
  },
  broadcastProRoundedMarkerChipRank: {
    className:
      "inline-flex shrink-0 items-center px-3 py-1 text-2xl font-bold italic uppercase leading-none",
  },
  broadcastProRoundedMarkerZoneNotchFinals: {
    className: "flex w-full shrink-0 items-center py-1",
  },
  broadcastProRoundedMarkerQualificationFooter: {
    className: "flex shrink-0 justify-end border-t border-white/10 pt-4",
  },
} satisfies Pick<
  ThemeComponentStyles,
  | "broadcastProRoundedMarkerChipQualification"
  | "broadcastProRoundedMarkerChipRank"
  | "broadcastProRoundedMarkerZoneNotchFinals"
  | "broadcastProRoundedMarkerQualificationFooter"
>;
