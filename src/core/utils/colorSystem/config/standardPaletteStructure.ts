import {
  ColorVariations,
  TextColors,
  Shadows,
  GradientOptions,
} from "../core/types";
import tinycolor from "tinycolor2";

/**
 * Creates a standardized palette structure using provided colors and utilities
 * This defines the common structure that all palette types will follow
 */
export const createStandardPaletteStructure = (
  name: string,
  mainColor: string,
  secondaryColor: string,
  colorVariations: ColorVariations,
  textColors: TextColors,
  shadows: Shadows,
  gradients: {
    primary: GradientOptions;
    secondary: GradientOptions;
    primaryToSecondary: GradientOptions;
    secondaryToPrimary: GradientOptions;
    [key: string]: GradientOptions;
  },
  options: {
    includeGradients?: boolean;
    includeShadows?: boolean;
    highContrast?: boolean;
    [key: string]: any;
  } = {},
) => {
  // Helper function to ensure contrast for text on a background
  const ensureContrast = (bgColor: string, textColor: string): string => {
    const minContrast = options.highContrast ? 7 : 4.5;
    const contrast = tinycolor.readability(bgColor, textColor);

    if (contrast >= minContrast) {
      return textColor;
    }

    // Try white and black to see which has better contrast
    const whiteContrast = tinycolor.readability(bgColor, "#FFFFFF");
    const blackContrast = tinycolor.readability(bgColor, "#000000");

    return whiteContrast > blackContrast ? "#FFFFFF" : "#000000";
  };

  //console.log("[gradients]", gradients);
  // Return the standard palette structure
  return {
    name,
    background: {
      main: mainColor,
      light: colorVariations.light,
      dark: colorVariations.dark,
      contrast: colorVariations.contrastText,
      accent: secondaryColor,
      gradient: gradients,
    },
    container: {
      main: mainColor,
      light: tinycolor(mainColor).lighten(20).toString(),
      dark: tinycolor(mainColor).lighten(5).toString(),
      primary: colorVariations.light,
      secondary: secondaryColor,
      accent: colorVariations.accent,
      muted: colorVariations.muted,
      saturated: colorVariations.saturated,
      highlight: colorVariations.lighter,
      transparentMain: tinycolor(mainColor).setAlpha(0.4).toRgbString(),
      transparentSecondary: tinycolor(secondaryColor)
        .setAlpha(0.4)
        .toRgbString(),
      transparentAccent: tinycolor(secondaryColor).setAlpha(0.4).toRgbString(),
      gradientPrimaryToSecondaryVertical:
        gradients.primaryToSecondary.css.VERTICAL,
      gradientSecondaryToPrimaryVertical:
        gradients.secondaryToPrimary.css.VERTICAL,
      gradientPrimaryToSecondaryHorizontal:
        gradients.primaryToSecondary.css.HORIZONTAL,
      gradientSecondaryToPrimaryHorizontal:
        gradients.secondaryToPrimary.css.HORIZONTAL,
    },
    text: {
      onBackground: {
        main: ensureContrast(mainColor, textColors.onPrimary),
        light: ensureContrast(colorVariations.light, textColors.onPrimary),
        dark: ensureContrast(colorVariations.dark, textColors.onPrimary),
        muted: tinycolor(ensureContrast(mainColor, textColors.onPrimary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: secondaryColor,
      },
      onContainer: {
        primary: ensureContrast(colorVariations.light, textColors.onPrimary),
        secondary: ensureContrast(
          colorVariations.lighter,
          textColors.onPrimary,
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(colorVariations.darker, textColors.onPrimary),
        muted: tinycolor(ensureContrast(mainColor, textColors.onPrimary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: secondaryColor,
      },
    },
    shadow: {
      small: options.includeShadows ? shadows.small : "",
      medium: options.includeShadows ? shadows.medium : "",
      large: options.includeShadows ? shadows.large : "",
      glow: options.includeShadows
        ? shadows.glow ||
          `0 0 15px ${tinycolor(mainColor).setAlpha(0.5).toRgbString()}`
        : "",
    },
  };
};
