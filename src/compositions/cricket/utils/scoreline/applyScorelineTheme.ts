export const SCORELINE_DEFAULT_INK = "#080b0d";
export const SCORELINE_DEFAULT_PAPER = "#ffffff";

export type Rgb = { r: number; g: number; b: number };

export type ScorelineThemeInput = {
  primary?: string;
  secondary?: string;
  ink?: string;
  paper?: string;
};

export type ScorelineThemeVars = {
  clubPrimary: string;
  clubSecondary: string;
  surfaceStrongPrimary: string;
  surfaceStrongSecondary: string;
  teamSurfacePrimary: string;
  teamSurfaceSecondary: string;
  onSurface: string;
  contrastScore: string;
  contrastTeam: string;
  contrastMetaOnSurface: string;
  onSurfaceMuted: string;
  onSurfaceLabel: string;
  accentOnLightPrimary: string;
  accentOnLightSecondary: string;
  onDark: boolean;
};

export function parseHex(input?: string | null): Rgb | null {
  if (!input) {
    return null;
  }

  let hex = String(input).trim();
  if (!hex.startsWith("#")) {
    hex = `#${hex}`;
  }

  if (!/^#[0-9a-f]{3,8}$/i.test(hex)) {
    return null;
  }

  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  };
}

export function relativeLuminance({ r, g, b }: Rgb): number {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function mixRgb(a: Rgb, b: Rgb, weightA: number): Rgb {
  const w = Math.min(1, Math.max(0, weightA));
  return {
    r: Math.round(a.r * w + b.r * (1 - w)),
    g: Math.round(a.g * w + b.g * (1 - w)),
    b: Math.round(a.b * w + b.b * (1 - w)),
  };
}

export function toRgbString(rgb: Rgb): string {
  return `rgb(${rgb.r} ${rgb.g} ${rgb.b})`;
}

function accentOnLight(brand: Rgb, ink: Rgb): Rgb {
  return mixRgb(brand, ink, 0.78);
}

function ensureSurfaceColor(rgb: Rgb, ink: Rgb): Rgb {
  const lum = relativeLuminance(rgb);

  if (lum > 0.62) {
    const amount = Math.min(1, (lum - 0.62) / 0.3);
    return mixRgb(rgb, ink, 1 - amount * 0.55);
  }

  if (lum < 0.08) {
    const paper = parseHex(SCORELINE_DEFAULT_PAPER)!;
    return mixRgb(rgb, paper, 0.85);
  }

  return rgb;
}

function pickOnSurface(surface: Rgb, ink: Rgb, paper: Rgb): Rgb {
  return relativeLuminance(surface) > 0.45 ? ink : paper;
}

function separateSimilarColors(
  primary: Rgb,
  secondary: Rgb,
  ink: Rgb,
): [Rgb, Rgb] {
  if (
    Math.abs(relativeLuminance(primary) - relativeLuminance(secondary)) < 0.12
  ) {
    return [primary, mixRgb(secondary, ink, 0.35)];
  }

  return [primary, secondary];
}

/**
 * Derive Scoreline surface/contrast tokens from raw club colours.
 * Port of `design/_shared/scoreline-theme.js`.
 */
export function deriveScorelineThemeVars(
  theme: ScorelineThemeInput = {},
): ScorelineThemeVars {
  const ink =
    parseHex(theme.ink ?? SCORELINE_DEFAULT_INK) ??
    parseHex(SCORELINE_DEFAULT_INK)!;
  const paper =
    parseHex(theme.paper ?? SCORELINE_DEFAULT_PAPER) ??
    parseHex(SCORELINE_DEFAULT_PAPER)!;
  let primary = parseHex(theme.primary) ?? parseHex("#ff0000")!;
  let secondary = parseHex(theme.secondary) ?? parseHex("#004de2")!;

  [primary, secondary] = separateSimilarColors(primary, secondary, ink);

  const surfacePrimary = ensureSurfaceColor(primary, ink);
  const surfaceSecondary = ensureSurfaceColor(secondary, ink);
  const bandPrimary = mixRgb(surfacePrimary, ink, 0.88);
  const bandSecondary = mixRgb(surfaceSecondary, ink, 0.88);
  const onSurface = pickOnSurface(bandPrimary, ink, paper);
  const onDark = relativeLuminance(onSurface) < 0.45;

  return {
    clubPrimary: toRgbString(primary),
    clubSecondary: toRgbString(secondary),
    surfaceStrongPrimary: toRgbString(surfacePrimary),
    surfaceStrongSecondary: toRgbString(surfaceSecondary),
    teamSurfacePrimary: toRgbString(bandPrimary),
    teamSurfaceSecondary: toRgbString(bandSecondary),
    onSurface: toRgbString(onSurface),
    contrastScore: toRgbString(onSurface),
    contrastTeam: onDark ? "rgb(255 255 255 / 92%)" : "rgb(8 11 13 / 92%)",
    contrastMetaOnSurface: onDark
      ? "rgb(255 255 255 / 58%)"
      : "rgb(8 11 13 / 58%)",
    onSurfaceMuted: onDark ? "rgb(255 255 255 / 72%)" : "rgb(8 11 13 / 72%)",
    onSurfaceLabel: onDark ? "rgb(255 255 255 / 68%)" : "rgb(8 11 13 / 68%)",
    accentOnLightPrimary: toRgbString(accentOnLight(primary, ink)),
    accentOnLightSecondary: toRgbString(accentOnLight(secondary, ink)),
    onDark,
  };
}
