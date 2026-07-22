import type { ThemeFonts } from "../../../types/global/theme-shared";

/** Display face — titles, large scores, ranks, short labels. Single Regular weight loaded. */
export const BRICKWORK_FONT_DISPLAY = "Allerta Stencil";

/** Copy face — names, metadata, body. Load explicit weight files via theme fonts.additional. */
export const BRICKWORK_FONT_COPY = "Roboto";

export const BRICKWORK_COPY_FONT_WEIGHTS = [
  "Roboto",
  "Roboto-Medium",
  "Roboto-Bold",
] as const;

export const BRICKWORK_TABULAR_NUMS_STYLE = {
  fontVariantNumeric: "tabular-nums" as const,
};

/** Intro title base size before measured fitting. */
export const BRICKWORK_TITLE_BASE_CLASS = "text-9xl";

/** Main header composition title base size before measured fitting. */
export const BRICKWORK_HEADER_TITLE_BASE_CLASS = "text-7xl";

type BrickworkFontSources = {
  title?: { family?: string };
  copy?: { family?: string };
  subtitle?: { family?: string };
};

export const getBrickworkDisplayFontFamily = (
  fontClasses?: Record<string, { family?: string } | undefined>,
  fonts?: BrickworkFontSources,
): string =>
  fontClasses?.display?.family ??
  fontClasses?.heading?.family ??
  fonts?.title?.family ??
  BRICKWORK_FONT_DISPLAY;

export const getBrickworkCopyFontFamily = (
  fontClasses?: Record<string, { family?: string } | undefined>,
  fonts?: BrickworkFontSources,
): string =>
  fontClasses?.copy?.family ??
  fontClasses?.body?.family ??
  fonts?.copy?.family ??
  BRICKWORK_FONT_COPY;

// ThemeFonts import kept for theme.ts documentation alignment.
export type { ThemeFonts };
