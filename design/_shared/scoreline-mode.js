import scorelineModes from "./scoreline-modes.json" with { type: "json" };

const MATCH_CONTEXT_PANEL_LIGHT = "rgba(243, 240, 234, 0.72)";
const MATCH_CONTEXT_PANEL_DARK = "rgba(8, 11, 13, 0.35)";
const DEFAULT_INK = "#080b0d";
const STORAGE_KEY = "fixtura-scoreline-preview-mode";
const BACKDROP_STORAGE_KEY = "fixtura-scoreline-preview-backdrop";

/** @typedef {"light" | "lightAlt" | "dark" | "darkAlt"} ScorelineModeId */
/** @typedef {"light" | "dark" | "club"} ScorelineBackdropId */

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

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * @param {string} color
 */
function isLightColor(color) {
  const rgb = parseHex(color);
  if (!rgb) {
    return false;
  }

  return relativeLuminance(rgb) > 0.45;
}

/**
 * @param {ScorelineModeId} modeId
 */
export function getScorelineModeDefinition(modeId) {
  const mode = scorelineModes[modeId];
  if (!mode) {
    return scorelineModes.light;
  }

  return mode;
}

/**
 * Mirrors Remotion resolveScorelineMatchContextTokens for design preview.
 *
 * @param {ScorelineModeId} modeId
 * @param {string} [accent]
 */
export function resolveScorelineMatchContextTokens(modeId, accent = DEFAULT_INK) {
  const mode = getScorelineModeDefinition(modeId);
  const lightTitle = isLightColor(mode.text.title);
  const surface = lightTitle ? MATCH_CONTEXT_PANEL_DARK : MATCH_CONTEXT_PANEL_LIGHT;
  const onDarkPanel = lightTitle;

  return {
    surface,
    inset: lightTitle
      ? "inset 0 1px 0 rgb(255 255 255 / 12%)"
      : "inset 0 1px 0 rgb(255 255 255 / 55%)",
    textMuted: onDarkPanel ? "rgb(255 255 255 / 68%)" : "rgb(8 11 13 / 68%)",
    text: onDarkPanel ? "rgb(255 255 255 / 92%)" : "rgb(8 11 13 / 88%)",
    accent,
  };
}

/**
 * @param {URLSearchParams} [params]
 * @returns {ScorelineModeId}
 */
export function readScorelineMode(params = new URLSearchParams(window.location.search)) {
  const fromQuery = params.get("mode");
  if (fromQuery && fromQuery in scorelineModes) {
    return /** @type {ScorelineModeId} */ (fromQuery);
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && stored in scorelineModes) {
    return /** @type {ScorelineModeId} */ (stored);
  }

  return "light";
}

/**
 * @param {URLSearchParams} [params]
 * @returns {ScorelineBackdropId}
 */
export function readScorelineBackdrop(
  params = new URLSearchParams(window.location.search),
) {
  const fromQuery = params.get("backdrop");
  if (fromQuery === "light" || fromQuery === "dark" || fromQuery === "club") {
    return fromQuery;
  }

  const stored = window.localStorage.getItem(BACKDROP_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "club") {
    return stored;
  }

  return "light";
}

/**
 * @param {HTMLElement} canvas
 * @param {ScorelineModeId} modeId
 * @param {{ accent?: string }} [options]
 */
export function applyScorelineMode(canvas, modeId, options = {}) {
  if (!(canvas instanceof HTMLElement)) {
    return;
  }

  const mode = getScorelineModeDefinition(modeId);
  const accent =
    (options.accent ??
      getComputedStyle(canvas).getPropertyValue("--club-primary").trim()) ||
    DEFAULT_INK;
  const matchContext = resolveScorelineMatchContextTokens(modeId, accent);

  canvas.dataset.scorelineMode = modeId;
  canvas.style.background = mode.container.background;
  canvas.style.color = mode.text.copy;

  canvas.style.setProperty("--header-text", mode.text.title);
  canvas.style.setProperty("--header-accent", accent);
  canvas.style.setProperty("--match-context-surface", matchContext.surface);
  canvas.style.setProperty("--match-context-inset", matchContext.inset);
  canvas.style.setProperty("--match-context-text-muted", matchContext.textMuted);
  canvas.style.setProperty("--match-context-text", matchContext.text);
  canvas.style.setProperty("--match-context-accent", matchContext.accent);

  canvas.querySelectorAll(".header-eyebrow, .organisation-name").forEach((node) => {
    if (node instanceof HTMLElement) {
      node.style.color = mode.text.title;
    }
  });

  const title = canvas.querySelector(".header-title-stack h1");
  if (title instanceof HTMLElement) {
    title.style.color = mode.text.title;
  }
}

/**
 * @param {ParentNode} root
 * @param {ScorelineBackdropId} backdropId
 */
export function applyScorelineBackdrop(root, backdropId) {
  const wrap = root.querySelector(".design-canvas-wrap");
  if (!(wrap instanceof HTMLElement)) {
    return;
  }

  wrap.dataset.scorelineBackdrop = backdropId;
}

/**
 * @param {ScorelineModeId} modeId
 */
export function persistScorelineMode(modeId) {
  window.localStorage.setItem(STORAGE_KEY, modeId);
}

/**
 * @param {ScorelineBackdropId} backdropId
 */
export function persistScorelineBackdrop(backdropId) {
  window.localStorage.setItem(BACKDROP_STORAGE_KEY, backdropId);
}

export { scorelineModes };
