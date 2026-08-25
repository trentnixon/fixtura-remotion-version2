import { useMemo } from "react";
import { fillTextBox } from "@remotion/layout-utils";
import { useFontContext } from "../../../core/context/FontContext";

export type UseFittedTextBoxFontSizeOptions = {
  text: string;
  fontFamily: string;
  withinWidth: number;
  maxLines: number;
  minFontSize: number;
  maxFontSize: number;
  fontWeight?: string | number;
  letterSpacing?: string;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
};

/** Finds the largest whole-pixel font size whose words fit inside a text box. */
export const computeFittedTextBoxFontSize = ({
  text,
  fontFamily,
  withinWidth,
  maxLines,
  minFontSize,
  maxFontSize,
  fontWeight = 400,
  letterSpacing = "normal",
  textTransform = "uppercase",
}: UseFittedTextBoxFontSizeOptions): number => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0 || withinWidth <= 0 || maxLines <= 0) {
    return maxFontSize;
  }

  const fitsAt = (fontSize: number): boolean => {
    const textBox = fillTextBox({ maxBoxWidth: withinWidth, maxLines });

    return words.every((word, index) => {
      const { exceedsBox } = textBox.add({
        text: `${index === 0 ? "" : " "}${word}`,
        fontFamily,
        fontWeight,
        fontSize,
        letterSpacing,
        textTransform,
        validateFontIsLoaded: true,
      });

      return !exceedsBox;
    });
  };

  for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize -= 1) {
    if (fitsAt(fontSize)) {
      return fontSize;
    }
  }

  return minFontSize;
};

/** Waits for theme fonts, then fits text to a measured multi-line box. */
export const useFittedTextBoxFontSize = (
  options: UseFittedTextBoxFontSizeOptions,
): number | undefined => {
  const { fontsLoaded } = useFontContext();
  const {
    text,
    fontFamily,
    withinWidth,
    maxLines,
    minFontSize,
    maxFontSize,
    fontWeight,
    letterSpacing,
    textTransform,
  } = options;

  return useMemo(() => {
    if (!fontsLoaded || !text.trim() || !fontFamily) {
      return undefined;
    }

    try {
      return computeFittedTextBoxFontSize({
        text,
        fontFamily,
        withinWidth,
        maxLines,
        minFontSize,
        maxFontSize,
        fontWeight,
        letterSpacing,
        textTransform,
      });
    } catch (error) {
      console.warn(
        "useFittedTextBoxFontSize: measurement failed, using max cap",
        error,
      );
      return maxFontSize;
    }
  }, [
    fontsLoaded,
    text,
    fontFamily,
    withinWidth,
    maxLines,
    minFontSize,
    maxFontSize,
    fontWeight,
    letterSpacing,
    textTransform,
  ]);
};
