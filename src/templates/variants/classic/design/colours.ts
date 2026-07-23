import tinycolor from "tinycolor2";
import {
  DesignPalette,
  ensureContrast,
} from "../../../../core/utils/designPalettes/types";
import { classicForegroundSurfaces } from "../theme";

export interface ClassicSurfaceRoles {
  foreground: {
    backplane: string;
  };
  content: {
    surface: string;
    surfaceContrast: string;
    edgeHighlight: string;
  };
  stat: {
    recessed: string;
    insetBorder: string;
  };
  text: {
    onContent: string;
    onStat: string;
  };
}

export interface ClassicThemeColours {
  primary: string;
  secondary: string;
}

export const getClassicSurfaceRoles = (
  palette: DesignPalette,
  colours?: ClassicThemeColours,
): ClassicSurfaceRoles => {
  const transparent = palette.container.backgroundTransparent;
  const contentSurface = transparent.strong;
  const statRecessed = palette.container.primary;
  const backplaneBase =
    colours?.secondary ?? palette.container.secondary ?? palette.container.primary;

  const edgeBase = tinycolor(contentSurface);
  const edgeHighlight = edgeBase.isDark()
    ? edgeBase.lighten(12).setAlpha(0.35).toRgbString()
    : edgeBase.darken(8).setAlpha(0.2).toRgbString();

  const insetBorder = tinycolor(statRecessed).isDark()
    ? tinycolor("#ffffff").setAlpha(0.12).toRgbString()
    : tinycolor("#000000").setAlpha(0.1).toRgbString();

  return {
    foreground: {
      backplane: tinycolor(backplaneBase)
        .setAlpha(classicForegroundSurfaces.backplaneOpacity)
        .toRgbString(),
    },
    content: {
      surface: contentSurface,
      /** Distinct band for icons/logos — club primary (not the same as content surface). */
      surfaceContrast: palette.container.primary,
      edgeHighlight,
    },
    stat: {
      recessed: statRecessed,
      insetBorder,
    },
    text: {
      onContent: ensureContrast(
        contentSurface,
        palette.text.onContainer.copy,
      ),
      onStat: ensureContrast(statRecessed, palette.text.onContainer.title),
    },
  };
};
