// designPalettes/primaryPalette.ts
import {
  DesignPalette,
  ensureContrast,
  TextColors,
  ShadowOptions,
  ColorVariations,
} from "./types";
import tinycolor from "tinycolor2";
import { createGradientOptions } from "./paletteHelpers";

export const createPrimaryPalette = (
  primary: string,
  secondary: string,
  colorVariations: ColorVariations,
  textColors: TextColors,
  shadows: ShadowOptions,
): DesignPalette => {
  const primaryVariations = colorVariations.primary;

  return {
    name: "Primary",
    background: {
      main: primary,
      light: primaryVariations.light || primary,
      dark: primaryVariations.dark || primary,
      contrast: primaryVariations.contrastText || "#FFFFFF",
      accent: secondary,
      gradient: {
        primary: createGradientOptions(
          primary,
          primaryVariations.dark || primary,
        ),
        secondary: createGradientOptions(
          primaryVariations.light || primary,
          primary,
        ),
        primaryToSecondary: createGradientOptions(
          primary,
          primaryVariations.light || primary,
        ),
        secondaryToPrimary: createGradientOptions(
          primaryVariations.light || primary,
          primary,
        ),
        radial: `radial-gradient(circle, ${primary}, ${primaryVariations.dark || primary})`,
        conicGradient: createGradientOptions(
          primary,
          primaryVariations.dark || primary,
          "linear",
          "conic",
        ),
        hardStopGradient: createGradientOptions(
          primary,
          primaryVariations.dark || primary,
        ),
        meshGradient: createGradientOptions(
          primary,
          primaryVariations.dark || primary,
        ),
        primaryAdvanced: createGradientOptions(
          primary,
          primaryVariations.dark || primary,
        ),
        primaryRadial: createGradientOptions(
          primary,
          primaryVariations.dark || primary,
          "radial",
        ),
        secondaryAdvanced: createGradientOptions(
          primaryVariations.light || primary,
          primary,
        ),
        secondaryRadial: createGradientOptions(
          primaryVariations.light || primary,
          primary,
          "radial",
        ),
      },
    },
    container: {
      main: tinycolor(primary).lighten(10).toString(),
      light: tinycolor(primary).lighten(20).toString(),
      dark: tinycolor(primary).lighten(5).toString(),
      primary: primaryVariations.light || primary,
      secondary:
        primaryVariations.lighter || primaryVariations.light || primary,
      accent: secondary,
      highlight:
        primaryVariations.lighter || primaryVariations.light || primary,
      transparent: tinycolor(primary).setAlpha(0.8).toRgbString(),
      gradientPrimaryToSecondaryHorizontal: `linear-gradient(to right, ${primary}, ${secondary})`,
      gradientPrimaryToSecondaryVertical: `linear-gradient(to bottom, ${primary}, ${secondary})`,
      gradientSecondaryToPrimaryHorizontal: `linear-gradient(to right, ${secondary}, ${primary})`,
      gradientSecondaryToPrimaryVertical: `linear-gradient(to bottom, ${secondary}, ${primary})`,
      saturated: tinycolor(primary).saturate(20).toString(),
      transparentAccent: tinycolor(secondary).setAlpha(0.7).toRgbString(),
      transparentMain: tinycolor(primary).setAlpha(0.7).toRgbString(),
      transparentPrimary: tinycolor(primary).toRgbString(),
      transparentSecondary: tinycolor(
        primaryVariations.lighter || primaryVariations.light || primary,
      )
        .setAlpha(0.7)
        .toRgbString(),
      muted: tinycolor(primary).setAlpha(0.5).toRgbString(),
      background: tinycolor(primary).lighten(15).toString(),
      backgroundAlt: tinycolor(primary).lighten(25).toString(),
      backgroundTransparent: {
        subtle: tinycolor(primary).setAlpha(0.1).toRgbString(),
        low: tinycolor(primary).setAlpha(0.2).toRgbString(),
        medium: tinycolor(primary).setAlpha(0.4).toRgbString(),
        high: tinycolor(primary).setAlpha(0.6).toRgbString(),
        strong: tinycolor(primary).setAlpha(0.8).toRgbString(),
      },
    },
    text: {
      onBackground: {
        main: ensureContrast(primary, textColors.onPrimary || "#FFFFFF"),
        light: ensureContrast(
          primaryVariations.light || primary,
          textColors.onPrimary || "#FFFFFF",
        ),
        dark: ensureContrast(
          primaryVariations.dark || primary,
          textColors.onPrimary || "#FFFFFF",
        ),
        muted: tinycolor(
          ensureContrast(primary, textColors.onPrimary || "#FFFFFF"),
        )
          .setAlpha(0.7)
          .toRgbString(),
        accent: secondary,
      },
      onContainer: {
        primary: ensureContrast(
          primaryVariations.light || primary,
          textColors.onPrimary || "#FFFFFF",
        ),
        secondary: ensureContrast(
          primaryVariations.lighter || primaryVariations.light || primary,
          textColors.onSecondary || "#FFFFFF",
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(
          primaryVariations.darker || primary,
          textColors.onPrimary || "#FFFFFF",
        ),
        muted: tinycolor(
          ensureContrast(primary, textColors.onPrimary || "#FFFFFF"),
        )
          .setAlpha(0.7)
          .toRgbString(),
        accent: secondary,
        title: ensureContrast(primary, textColors.onPrimary || "#FFFFFF"),
        copy: ensureContrast(primary, textColors.onPrimary || "#FFFFFF"),
        copyNoBg: ensureContrast(primary, textColors.onPrimary || "#FFFFFF"),
      },
      title: ensureContrast(primary, textColors.onPrimary || "#FFFFFF"),
      body: ensureContrast(primary, textColors.onPrimary || "#FFFFFF"),
      primary: primaryVariations.base || primary,
      secondary: primaryVariations.light || primary,
      accent: secondary,
      contrast: textColors.onPrimary || "#FFFFFF",
      safePrimary: textColors.safePrimary || "#FFFFFF",
      safeSecondary: textColors.safeSecondary || "#FFFFFF",
      highlight: textColors.highlight || "#00FF00",
    },

    shadow: {
      small: shadows.small,
      medium: shadows.medium,
      large: shadows.large,
      glow:
        shadows.glow ||
        `0 0 15px ${tinycolor(primary).setAlpha(0.5).toRgbString()}`,
    },
  };
};
