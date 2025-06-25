// designPalettes/triadicPalette.ts
import {
  DesignPalette,
  ensureContrast,
  GradientOptions,
  CSSGradientOptions,
  TextColors,
  ShadowOptions,
  UtilityColors,
  ContrastOptions,
} from "./types";
import tinycolor from "tinycolor2";

// Create a CSS gradient options object
const createCSSGradientOptions = (
  color1: string,
  color2: string,
): CSSGradientOptions => ({
  DEFAULT: `linear-gradient(to right, ${color1}, ${color2})`,
  DIAGONAL: `linear-gradient(45deg, ${color1}, ${color2})`,
  DIAGONAL_REVERSE: `linear-gradient(135deg, ${color1}, ${color2})`,
  HORIZONTAL: `linear-gradient(90deg, ${color1}, ${color2})`,
  HORIZONTAL_REVERSE: `linear-gradient(270deg, ${color1}, ${color2})`,
  VERTICAL: `linear-gradient(180deg, ${color1}, ${color2})`,
  VERTICAL_REVERSE: `linear-gradient(0deg, ${color1}, ${color2})`,
  CONIC: `conic-gradient(${color1}, ${color2}, ${color1})`,
});

// Create a gradient options object
const createGradientOptions = (
  color1: string,
  color2: string,
  type: "linear" | "radial" = "linear",
  direction: string = "to right",
): GradientOptions => ({
  direction,
  type,
  stops: [color1, color2],
  css: createCSSGradientOptions(color1, color2),
});

export const createTriadicPalette = (
  primary: string,
  textColors: TextColors,
  shadows: ShadowOptions,
  utility: UtilityColors,
  contrast: ContrastOptions,
): DesignPalette => {
  const triadicColor1 = tinycolor(primary).spin(120).toHexString();
  const triadicColor2 = tinycolor(primary).spin(240).toHexString();
  const lightTriadic = tinycolor(primary).spin(120).lighten(10).toHexString();
  const darkTriadic = tinycolor(primary).spin(120).darken(10).toHexString();

  return {
    name: "Triadic",
    background: {
      main: triadicColor1,
      light: lightTriadic,
      dark: darkTriadic,
      contrast: ensureContrast(triadicColor1, "#FFFFFF"),
      accent: primary,
      gradient: {
        primary: createGradientOptions(triadicColor1, primary),
        secondary: createGradientOptions(triadicColor2, primary),
        primaryToSecondary: createGradientOptions(triadicColor1, triadicColor2),
        secondaryToPrimary: createGradientOptions(triadicColor2, triadicColor1),
        radial: `radial-gradient(circle, ${triadicColor1}, ${triadicColor2})`,
        conicGradient: createGradientOptions(
          triadicColor1,
          triadicColor2,
          "linear",
          "conic",
        ),
        hardStopGradient: createGradientOptions(triadicColor1, triadicColor2),
        meshGradient: createGradientOptions(triadicColor1, triadicColor2),
        primaryAdvanced: createGradientOptions(triadicColor1, primary),
        primaryRadial: createGradientOptions(triadicColor1, primary, "radial"),
        secondaryAdvanced: createGradientOptions(triadicColor2, primary),
        secondaryRadial: createGradientOptions(
          triadicColor2,
          primary,
          "radial",
        ),
      },
    },
    container: {
      primary: lightTriadic,
      secondary: tinycolor(primary).spin(240).lighten(10).toHexString(),
      main: lightTriadic,
      light: "#FFFFFF",
      dark: tinycolor(primary).spin(120).darken(15).toHexString(),
      transparent: tinycolor(primary).spin(120).setAlpha(0.8).toRgbString(),
      accent: primary,
      highlight: triadicColor2,
      gradientPrimaryToSecondaryHorizontal: `linear-gradient(to right, ${lightTriadic}, ${triadicColor2})`,
      gradientPrimaryToSecondaryVertical: `linear-gradient(to bottom, ${lightTriadic}, ${triadicColor2})`,
      gradientSecondaryToPrimaryHorizontal: `linear-gradient(to right, ${triadicColor2}, ${lightTriadic})`,
      gradientSecondaryToPrimaryVertical: `linear-gradient(to bottom, ${triadicColor2}, ${lightTriadic})`,
      saturated: tinycolor(lightTriadic).saturate(20).toString(),
      transparentAccent: tinycolor(triadicColor2).setAlpha(0.7).toRgbString(),
      transparentMain: tinycolor(lightTriadic).setAlpha(0.7).toRgbString(),
      transparentPrimary: tinycolor(lightTriadic).toRgbString(),
      transparentSecondary: tinycolor(triadicColor2)
        .setAlpha(0.7)
        .toRgbString(),
      muted: tinycolor(lightTriadic).setAlpha(0.5).toRgbString(),
    },
    text: {
      onBackground: {
        main: ensureContrast(triadicColor1, "#FFFFFF"),
        light: ensureContrast(lightTriadic, "#FFFFFF"),
        dark: ensureContrast(darkTriadic, "#FFFFFF"),
        muted: tinycolor(ensureContrast(triadicColor1, "#FFFFFF"))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
      },
      onContainer: {
        primary: ensureContrast(lightTriadic, "#FFFFFF"),
        secondary: ensureContrast(
          tinycolor(primary).spin(240).lighten(10).toHexString(),
          "#FFFFFF",
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(
          tinycolor(primary).spin(120).darken(15).toHexString(),
          "#FFFFFF",
        ),
        muted: tinycolor(ensureContrast(lightTriadic, "#FFFFFF"))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
      },
      title: ensureContrast(triadicColor1, "#FFFFFF"),
      body: ensureContrast(triadicColor1, "#FFFFFF"),
      muted: tinycolor(ensureContrast(triadicColor1, "#FFFFFF"))
        .setAlpha(0.7)
        .toRgbString(),
      primary: primary,
      secondary: triadicColor2,
      accent: triadicColor1,
      contrast: ensureContrast(triadicColor1, "#FFFFFF"),
      safePrimary: contrast.primary.safeColor,
      safeSecondary: contrast.secondary.safeColor,
      highlight: utility.success,
    },

    shadow: {
      small: shadows.small,
      medium: shadows.medium,
      large: shadows.large,
      glow:
        shadows.glow ||
        `0 0 15px ${tinycolor(triadicColor1).setAlpha(0.5).toRgbString()}`,
    },
  };
};
