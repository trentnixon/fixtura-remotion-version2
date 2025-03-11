// designPalettes/triadicPalette.ts
import { DesignPalette, ensureContrast } from "./types";
import tinycolor from "tinycolor2";

export const createTriadicPalette = (
  primary: string,
  textColors: any,
  shadows: any,
  utility: any,
  contrast: any,
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
        primary: triadicColor1,
        secondary: triadicColor2,
        css: `linear-gradient(to right, ${triadicColor1}, ${triadicColor2})`,
        primaryToSecondary: `linear-gradient(to right, ${triadicColor1}, ${triadicColor2})`,
        secondaryToPrimary: `linear-gradient(to left, ${triadicColor1}, ${triadicColor2})`,
        radial: `radial-gradient(circle, ${triadicColor1}, ${triadicColor2})`,
      },
    },
    container: {
      primary: lightTriadic,
      secondary: tinycolor(primary).spin(240).lighten(10).toHexString(),
      light: "#FFFFFF",
      dark: tinycolor(primary).spin(120).darken(15).toHexString(),
      transparent: tinycolor(primary).spin(120).setAlpha(0.8).toRgbString(),
      accent: primary,
      highlight: triadicColor2,
      onBackground: {
        main: tinycolor(triadicColor1).lighten(10).toString(),
        light: tinycolor(triadicColor1).lighten(20).toString(),
        dark: tinycolor(triadicColor1).darken(10).toString(),
      },
    },
    text: {
      onBackground: {
        main: ensureContrast(triadicColor1, "#FFFFFF"),
        light: ensureContrast(lightTriadic, "#FFFFFF"),
        dark: ensureContrast(darkTriadic, "#FFFFFF"),
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
