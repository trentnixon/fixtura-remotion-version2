const DEFAULT_INK = "#080b0d";
const DEFAULT_PAPER = "#ffffff";

/**
 * @param {string} input
 * @returns {{ r: number; g: number; b: number } | null}
 */
function parseHex(input) {
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

/**
 * @param {{ r: number; g: number; b: number }} rgb
 */
function relativeLuminance({ r, g, b }) {
  const channel = (value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
  );
}

/**
 * @param {{ r: number; g: number; b: number }} a
 * @param {{ r: number; g: number; b: number }} b
 * @param {number} weightA 0–1
 */
function mixRgb(a, b, weightA) {
  const w = Math.min(1, Math.max(0, weightA));
  return {
    r: Math.round(a.r * w + b.r * (1 - w)),
    g: Math.round(a.g * w + b.g * (1 - w)),
    b: Math.round(a.b * w + b.b * (1 - w)),
  };
}

/**
 * @param {{ r: number; g: number; b: number }} rgb
 */
function toRgb(rgb) {
  return `rgb(${rgb.r} ${rgb.g} ${rgb.b})`;
}

/**
 * @param {{ r: number; g: number; b: number }} brand
 * @param {{ r: number; g: number; b: number }} ink
 */
function accentOnLight(brand, ink) {
  return mixRgb(brand, ink, 0.78);
}

/**
 * @param {{ r: number; g: number; b: number }} rgb
 * @param {{ r: number; g: number; b: number }} ink
 */
function ensureSurfaceColor(rgb, ink) {
  const lum = relativeLuminance(rgb);

  if (lum > 0.62) {
    const amount = Math.min(1, (lum - 0.62) / 0.3);
    return mixRgb(rgb, ink, 1 - amount * 0.55);
  }

  if (lum < 0.08) {
    return mixRgb(rgb, parseHex(DEFAULT_PAPER), 0.85);
  }

  return rgb;
}

/**
 * @param {{ r: number; g: number; b: number }} surface
 * @param {{ r: number; g: number; b: number }} ink
 * @param {{ r: number; g: number; b: number }} paper
 */
function pickOnSurface(surface, ink, paper) {
  return relativeLuminance(surface) > 0.45 ? ink : paper;
}

/**
 * @param {{ r: number; g: number; b: number }} primary
 * @param {{ r: number; g: number; b: number }} secondary
 * @param {{ r: number; g: number; b: number }} ink
 */
function separateSimilarColors(primary, secondary, ink) {
  if (Math.abs(relativeLuminance(primary) - relativeLuminance(secondary)) < 0.12) {
    return [primary, mixRgb(secondary, ink, 0.35)];
  }

  return [primary, secondary];
}

/**
 * Derive production-ready theme tokens from raw club colours.
 *
 * @param {HTMLElement} canvas
 * @param {{ primary?: string; secondary?: string; ink?: string; paper?: string }} theme
 */
export function applyScorelineTheme(canvas, theme = {}) {
  if (!(canvas instanceof HTMLElement)) {
    return;
  }

  const ink = parseHex(theme.ink ?? DEFAULT_INK) ?? parseHex(DEFAULT_INK);
  const paper = parseHex(theme.paper ?? DEFAULT_PAPER) ?? parseHex(DEFAULT_PAPER);
  let primary = parseHex(theme.primary) ?? parseHex("#ff0000");
  let secondary = parseHex(theme.secondary) ?? parseHex("#004de2");

  [primary, secondary] = separateSimilarColors(primary, secondary, ink);

  const surfacePrimary = ensureSurfaceColor(primary, ink);
  const surfaceSecondary = ensureSurfaceColor(secondary, ink);
  const bandPrimary = mixRgb(surfacePrimary, ink, 0.88);
  const onSurface = pickOnSurface(bandPrimary, ink, paper);
  const onDark = relativeLuminance(onSurface) < 0.45;

  canvas.style.setProperty("--club-primary", toRgb(primary));
  canvas.style.setProperty("--club-secondary", toRgb(secondary));
  canvas.style.setProperty("--surface-strong-primary", toRgb(surfacePrimary));
  canvas.style.setProperty("--surface-strong-secondary", toRgb(surfaceSecondary));
  canvas.style.setProperty("--on-surface", toRgb(onSurface));
  canvas.style.setProperty("--contrast-score", toRgb(onSurface));
  canvas.style.setProperty(
    "--contrast-team",
    onDark ? "rgb(255 255 255 / 92%)" : "rgb(8 11 13 / 92%)",
  );
  canvas.style.setProperty(
    "--contrast-meta-on-surface",
    onDark ? "rgb(255 255 255 / 58%)" : "rgb(8 11 13 / 58%)",
  );
  canvas.style.setProperty(
    "--on-surface-muted",
    onDark ? "rgb(255 255 255 / 72%)" : "rgb(8 11 13 / 72%)",
  );
  canvas.style.setProperty(
    "--on-surface-label",
    onDark ? "rgb(255 255 255 / 68%)" : "rgb(8 11 13 / 68%)",
  );
  canvas.style.setProperty(
    "--accent-on-light-primary",
    toRgb(accentOnLight(primary, ink)),
  );
  canvas.style.setProperty(
    "--accent-on-light-secondary",
    toRgb(accentOnLight(secondary, ink)),
  );
}
