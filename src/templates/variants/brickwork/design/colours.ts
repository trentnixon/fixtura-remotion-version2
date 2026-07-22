import tinycolor from "tinycolor2";
import {
  DesignPalette,
  ensureContrast,
} from "../../../../core/utils/designPalettes/types";

/**
 * Brickwork semantic colour roles (60/30/10 neutral / primary / secondary).
 * Status ladder colours are fixed sport semantics — not club brand colours.
 */

/** Ladder top position — was bg-green-500/80 */
export const BRICKWORK_STATUS_LADDER_TOP = tinycolor("#22c55e")
  .setAlpha(0.8)
  .toRgbString();

/** Ladder bottom / relegation zone — was bg-red-500/80 */
export const BRICKWORK_STATUS_LADDER_BOTTOM = tinycolor("#ef4444")
  .setAlpha(0.8)
  .toRgbString();

/** Account / bias club highlight — was bg-blue-900/70 */
export const BRICKWORK_STATUS_ACCOUNT_BIAS = tinycolor("#1e3a8a")
  .setAlpha(0.7)
  .toRgbString();

export interface BrickworkColourRoles {
  neutral: {
    /** Standard row / panel surface (~60%). */
    surface: string;
    /** Featured row / stronger neutral (index 0). */
    surfaceFeatured: string;
    /** Logo wells and contrast blocks. */
    surfaceContrast: string;
    /** Subtle card backgrounds (results). */
    surfaceSubtle: string;
  };
  primary: {
    /** Featured stat / icon block fills. */
    block: string;
    /** Rules, borders, mortar precursors. */
    rule: string;
  };
  secondary: {
    /** Small accents (~10%). */
    accent: string;
  };
  status: {
    ladderTop: string;
    ladderBottom: string;
    accountBias: string;
  };
  text: {
    onNeutral: string;
    onPrimary: string;
    onStatus: string;
  };
}

export const getBrickworkColourRoles = (
  palette: DesignPalette,
): BrickworkColourRoles => {
  const transparent = palette.container.backgroundTransparent;
  const neutralSurface = transparent.medium;
  const neutralFeatured = transparent.strong;
  const primaryBlock = palette.container.primary;

  return {
    neutral: {
      surface: neutralSurface,
      surfaceFeatured: neutralFeatured,
      surfaceContrast: transparent.strong,
      surfaceSubtle: transparent.low,
    },
    primary: {
      block: primaryBlock,
      rule: primaryBlock,
    },
    secondary: {
      accent: palette.container.secondary,
    },
    status: {
      ladderTop: BRICKWORK_STATUS_LADDER_TOP,
      ladderBottom: BRICKWORK_STATUS_LADDER_BOTTOM,
      accountBias: BRICKWORK_STATUS_ACCOUNT_BIAS,
    },
    text: {
      onNeutral: ensureContrast(
        neutralSurface,
        palette.text.onContainer.copy,
      ),
      onPrimary: ensureContrast(primaryBlock, palette.text.onContainer.copy),
      onStatus: ensureContrast(
        BRICKWORK_STATUS_LADDER_TOP,
        palette.text.onContainer.copy,
      ),
    },
  };
};
