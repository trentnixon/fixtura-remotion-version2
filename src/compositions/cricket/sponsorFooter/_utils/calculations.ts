import { Timings } from "../../../../core/types/data/common";

/** Frames before main end where footer exit starts. */
export const FOOTER_EXIT_OFFSET_FRAMES = 15;

/** Length of the footer logo exit animation. */
export const FOOTER_EXIT_ANIMATION_DURATION_FRAMES = 15;

/** Default gap between footer logo slots (matches Tailwind gap-4). */
export const FOOTER_LOGO_GAP_PX = 16;

/** Counts below this are sized by the footer height. */
export const FOOTER_FULL_HEIGHT_BELOW_COUNT = 4;

/**
 * Widest a height-sized logo may be, as a multiple of the footer height.
 */
export const FOOTER_LOGO_MAX_WIDTH_RATIO = 2.25;

/** Portrait frame width the footer row is laid out in. */
export const FOOTER_FRAME_WIDTH_PX = 1080;

/** Horizontal padding on each side of the footer row (Tailwind px-16). */
export const FOOTER_ROW_PADDING_X_PX = 64;

export type FooterLogoFit = "height" | "width";

export type FooterLogoBox = {
  /** Max width when fit is height. Fixed slot width when fit is width. */
  width: number;
  /** Logo height. The footer boundary for three logos or fewer. */
  height: number;
  /** height: sized by the footer. width: equal slots that keep every logo in view. */
  fit: FooterLogoFit;
};

/** Inner footer width after the row's horizontal padding. */
export const footerLogoContentWidth = (
  frameWidth = FOOTER_FRAME_WIDTH_PX,
): number => Math.max(0, frameWidth - FOOTER_ROW_PADDING_X_PX * 2);

/**
 * Local main-sequence frame where sponsor footer exit starts.
 * Returns 0 when FPS_MAIN is missing/invalid so AnimatedImage skips exit.
 */
export const calculateFooterExitFrame = (
  timings: Timings | undefined,
): number => {
  const mainDuration = timings?.FPS_MAIN;
  if (typeof mainDuration !== "number" || mainDuration <= 0) {
    return 0;
  }
  return Math.max(0, mainDuration - FOOTER_EXIT_OFFSET_FRAMES);
};

const emptyFooterLogoBox = (): FooterLogoBox => ({
  width: 0,
  height: 0,
  fit: "height",
});

/**
 * Logo box from the theme footer height and how many logos are in the strip.
 * Three or fewer are the full footer height, with width following the artwork.
 * More than three share the footer content width so every logo stays in view.
 */
export const calculateFooterLogoBox = ({
  footerHeight,
  count,
  contentWidth = footerLogoContentWidth(),
}: {
  footerHeight: number;
  count: number;
  contentWidth?: number;
}): FooterLogoBox => {
  if (
    !Number.isFinite(footerHeight) ||
    footerHeight <= 0 ||
    !Number.isFinite(count) ||
    count <= 0
  ) {
    return emptyFooterLogoBox();
  }

  if (count < FOOTER_FULL_HEIGHT_BELOW_COUNT) {
    return {
      height: footerHeight,
      width: footerHeight * FOOTER_LOGO_MAX_WIDTH_RATIO,
      fit: "height",
    };
  }

  const safeContent =
    Number.isFinite(contentWidth) && contentWidth > 0
      ? contentWidth
      : footerLogoContentWidth();
  const totalGap = FOOTER_LOGO_GAP_PX * Math.max(0, count - 1);

  return {
    width: Math.max(0, (safeContent - totalGap) / count),
    height: footerHeight,
    fit: "width",
  };
};
