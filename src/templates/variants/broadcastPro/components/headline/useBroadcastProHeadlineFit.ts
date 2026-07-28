import { useMemo } from "react";
import { useVideoConfig } from "remotion";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  getTitleScreenContentWidth,
  useFittedFontSize,
} from "../../../../../components/typography/utils/useFittedFontSize";
import {
  DEFAULT_BROADCAST_PRO_HEADLINE_SIZING,
  type BroadcastProHeadlineVariant,
} from "../../../../../templates/types/broadcast-pro/headline-lockup";

/** Main header title area: full width minus title `px-4` gutters. */
const MAIN_HEADER_TITLE_PADDING_PX = 32;

export const useBroadcastProHeadlineFit = (
  text: string,
  variant: BroadcastProHeadlineVariant,
): number | undefined => {
  const { width } = useVideoConfig();
  const { fontClasses, fonts, broadcastProHeadlineSizing } = useThemeContext();

  const sizing =
    broadcastProHeadlineSizing ?? DEFAULT_BROADCAST_PRO_HEADLINE_SIZING;
  const fontFamily =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";

  const maxFontSize =
    variant === "intro" ? sizing.introMaxPx : sizing.mainHeaderMaxPx;

  const withinWidth = useMemo(() => {
    const base = getTitleScreenContentWidth(
      width,
      MAIN_HEADER_TITLE_PADDING_PX,
    );
    return variant === "mainHeader" ? Math.floor(base * 0.95) : base;
  }, [width, variant]);

  return useFittedFontSize({
    text,
    fontFamily,
    fontWeight: sizing.fontWeight,
    textTransform: "uppercase",
    letterSpacing: sizing.letterSpacing,
    maxFontSize,
    minFontSize: sizing.minPx,
    withinWidth,
    horizontalPadding: MAIN_HEADER_TITLE_PADDING_PX,
  });
};
