// designPalettes/triadicPalette.ts
import {
  DesignPalette,
  ensureContrast,
  TextColors,
  ShadowOptions,
  UtilityColors,
  ContrastOptions,
} from "./types";
import tinycolor from "tinycolor2";
import {
  createBackgroundIdentity,
  createContainerSurfaceFields,
  createGradientOptions,
  createOnContainerContentText,
} from "./paletteHelpers";

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
  const preferredText = "#FFFFFF";

  return {
    name: "Triadic",
    background: {
      ...createBackgroundIdentity(primary, triadicColor2),
      main: triadicColor1,
      light: lightTriadic,
      dark: darkTriadic,
      contrast: ensureContrast(triadicColor1, preferredText),
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
      ...createContainerSurfaceFields(triadicColor1),
    },
    text: {
      onBackground: {
        main: ensureContrast(triadicColor1, preferredText),
        light: ensureContrast(lightTriadic, preferredText),
        dark: ensureContrast(darkTriadic, preferredText),
        muted: tinycolor(ensureContrast(triadicColor1, preferredText))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
      },
      onContainer: {
        primary: ensureContrast(lightTriadic, preferredText),
        secondary: ensureContrast(
          tinycolor(primary).spin(240).lighten(10).toHexString(),
          preferredText,
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(
          tinycolor(primary).spin(120).darken(15).toHexString(),
          preferredText,
        ),
        muted: tinycolor(ensureContrast(lightTriadic, preferredText))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
        ...createOnContainerContentText(triadicColor1, preferredText),
      },
      title: ensureContrast(triadicColor1, preferredText),
      body: ensureContrast(triadicColor1, preferredText),
      muted: tinycolor(ensureContrast(triadicColor1, preferredText))
        .setAlpha(0.7)
        .toRgbString(),
      primary: primary,
      secondary: triadicColor2,
      accent: triadicColor1,
      contrast: ensureContrast(triadicColor1, preferredText),
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
