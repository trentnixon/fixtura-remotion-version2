import { useMemo } from "react";
import { useVideoConfig } from "remotion";
import { fitText, measureText } from "@remotion/layout-utils";
import { useFontContext } from "../../../core/context/FontContext";

const DEFAULT_LINE_HEIGHT_RATIO = 1.05;
const DEFAULT_MAX_LINES = 2;

/** Default root font size used by Tailwind `em` units in composition layouts. */
export const TITLE_SCREEN_BASE_FONT_PX = 16;

/** Horizontal inset: VerticalStack `px-12` (96px) + title/name `px-4` (32px). */
export const TITLE_SCREEN_HORIZONTAL_PADDING_PX = 128;

export type UseFittedFontSizeOptions = {
  text: string;
  fontFamily: string;
  fontWeight?: string | number;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  letterSpacing?: string;
  /** Cap in px; defaults to Mudgeeraba `text-[10em]` at 16px root (= 160px). */
  maxFontSize?: number;
  /** Optional floor in px after fitting. */
  minFontSize?: number;
  horizontalPadding?: number;
  /** When set, used instead of `compositionWidth - horizontalPadding`. */
  withinWidth?: number;
  /** When set, caps font size so wrapped lines fit vertically. */
  withinHeight?: number;
  /** Line-height multiplier used with `withinHeight` (default 1.05). */
  lineHeightRatio?: number;
  /** Max wrapped lines to account for when using `withinHeight` (default 2). */
  maxLines?: number;
};

type ComputeFittedFontSizeOptions = UseFittedFontSizeOptions & {
  fitWidth: number;
};

const getFitMeasureOptions = (
  options: Pick<
    ComputeFittedFontSizeOptions,
    "fontFamily" | "fontWeight" | "textTransform" | "letterSpacing"
  >,
) => ({
  fontFamily: options.fontFamily,
  fontWeight: options.fontWeight ?? 900,
  textTransform: options.textTransform ?? "uppercase",
  letterSpacing: options.letterSpacing ?? "-0.025em",
  validateFontIsLoaded: true as const,
});

/** Pure fitting logic — shared by the hook and tests. */
export const computeFittedFontSize = ({
  text,
  fontFamily,
  fontWeight = 900,
  textTransform = "uppercase",
  letterSpacing = "-0.025em",
  maxFontSize = 10 * TITLE_SCREEN_BASE_FONT_PX,
  minFontSize = 0,
  fitWidth,
  withinHeight,
  lineHeightRatio = DEFAULT_LINE_HEIGHT_RATIO,
  maxLines = DEFAULT_MAX_LINES,
}: ComputeFittedFontSizeOptions): number => {
  const trimmed = text.trim();
  if (!trimmed || fitWidth <= 0) {
    return maxFontSize;
  }

  const measureOpts = getFitMeasureOptions({
    fontFamily,
    fontWeight,
    textTransform,
    letterSpacing,
  });

  const words = trimmed.split(/\s+/).filter(Boolean);
  const fitSizeFor = (value: string) =>
    fitText({
      text: value,
      withinWidth: fitWidth,
      ...measureOpts,
    }).fontSize;

  const widthCandidates = [
    fitSizeFor(trimmed),
    ...words.map((word) => fitSizeFor(word)),
  ];

  let fontSize = Math.min(maxFontSize, ...widthCandidates);

  if (withinHeight && withinHeight > 0) {
    const { width: singleLineWidth } = measureText({
      text: trimmed,
      fontSize,
      ...measureOpts,
    });

    const estimatedLines = Math.min(
      maxLines,
      Math.max(1, Math.ceil(singleLineWidth / fitWidth)),
    );

    const heightCap = withinHeight / (estimatedLines * lineHeightRatio);
    fontSize = Math.min(fontSize, heightCap);
  }

  return minFontSize > 0 ? Math.max(minFontSize, fontSize) : fontSize;
};

export const getTitleScreenContentWidth = (
  compositionWidth: number,
  horizontalPadding = TITLE_SCREEN_HORIZONTAL_PADDING_PX,
): number => Math.max(0, compositionWidth - horizontalPadding);

/**
 * Calculates a font size that fits `text` within the composition width.
 * Waits for theme fonts to load before measuring with `@remotion/layout-utils`.
 */
export const useFittedFontSize = ({
  text,
  fontFamily,
  fontWeight = 900,
  textTransform = "uppercase",
  letterSpacing = "-0.025em",
  maxFontSize = 10 * TITLE_SCREEN_BASE_FONT_PX,
  minFontSize = 0,
  horizontalPadding = TITLE_SCREEN_HORIZONTAL_PADDING_PX,
  withinWidth,
  withinHeight,
  lineHeightRatio = DEFAULT_LINE_HEIGHT_RATIO,
  maxLines = DEFAULT_MAX_LINES,
}: UseFittedFontSizeOptions): number | undefined => {
  const { width } = useVideoConfig();
  const { fontsLoaded } = useFontContext();

  return useMemo(() => {
    if (!fontsLoaded || !text.trim() || !fontFamily) {
      return undefined;
    }

    const fitWidth =
      withinWidth ?? getTitleScreenContentWidth(width, horizontalPadding);

    try {
      return computeFittedFontSize({
        text,
        fontFamily,
        fontWeight,
        textTransform,
        letterSpacing,
        maxFontSize,
        minFontSize,
        fitWidth,
        withinHeight,
        lineHeightRatio,
        maxLines,
      });
    } catch (error) {
      console.warn(
        "useFittedFontSize: measurement failed, using max cap",
        error,
      );
      return maxFontSize;
    }
  }, [
    fontsLoaded,
    text,
    fontFamily,
    fontWeight,
    textTransform,
    letterSpacing,
    maxFontSize,
    minFontSize,
    horizontalPadding,
    withinWidth,
    withinHeight,
    lineHeightRatio,
    maxLines,
    width,
  ]);
};
