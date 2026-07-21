import { useMemo } from "react";
import { useVideoConfig } from "remotion";
import { fitText } from "@remotion/layout-utils";
import { useFontContext } from "../../../core/context/FontContext";

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
      const { fontSize } = fitText({
        text,
        withinWidth: fitWidth,
        fontFamily,
        fontWeight,
        textTransform,
        letterSpacing,
        validateFontIsLoaded: true,
      });

      const capped = Math.min(maxFontSize, fontSize);
      return minFontSize > 0 ? Math.max(minFontSize, capped) : capped;
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
    width,
  ]);
};
