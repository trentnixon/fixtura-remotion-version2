import scorelineModes from "./scoreline-modes.json" with { type: "json" };

const MATCH_CONTEXT_PANEL_LIGHT = "rgba(243, 240, 234, 0.2)";
const MATCH_CONTEXT_PANEL_DARK = "rgba(8, 11, 13, 0.2)";
const DEFAULT_INK = "#080b0d";
const STORAGE_KEY = "fixtura-scoreline-preview-mode";
const BACKDROP_STORAGE_KEY = "fixtura-scoreline-preview-backdrop";

/** @typedef {"light" | "lightAlt" | "dark" | "darkAlt"} ScorelineModeId */
/** @typedef {"light" | "dark" | "club"} ScorelineBackdropId */

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
 * Container copy panels follow mode family (light/lightAlt vs dark/darkAlt).
 * Alt modes flip header title only — not container hue or in-container copy.
 *
 * @param {ScorelineModeId} modeId
 * @param {string} [accent]
 */
export function resolveScorelineMatchContextTokens(
  modeId,
  accent = DEFAULT_INK,
) {
  const mode = getScorelineModeDefinition(modeId);
  const isDark =
    Boolean(mode.container.background) &&
    mode.container.background !== "transparent";
  const surface = isDark ? MATCH_CONTEXT_PANEL_DARK : MATCH_CONTEXT_PANEL_LIGHT;

  return {
    surface,
    inset: isDark
      ? "inset 0 1px 0 rgb(255 255 255 / 12%)"
      : "inset 0 1px 0 rgb(255 255 255 / 55%)",
    textMuted: isDark ? "rgb(255 255 255 / 68%)" : "rgb(8 11 13 / 68%)",
    text: isDark ? "rgb(255 255 255 / 92%)" : "rgb(8 11 13 / 88%)",
    accent,
  };
}

/**
 * @param {ReturnType<typeof getScorelineModeDefinition>} mode
 * @param {string} accent
 */
function resolveScorelineContainerCopyTokens(mode, accent) {
  const isDark =
    Boolean(mode.container.background) &&
    mode.container.background !== "transparent";

  return {
    surface: isDark ? MATCH_CONTEXT_PANEL_DARK : MATCH_CONTEXT_PANEL_LIGHT,
    surfaceSolid: isDark
      ? mode.container.background
      : mode.container.backgroundAlt,
    inset: isDark
      ? "inset 0 1px 0 rgb(255 255 255 / 12%)"
      : "inset 0 1px 0 rgb(255 255 255 / 55%)",
    text: mode.text.copy,
    textMuted: isDark ? "rgb(255 255 255 / 68%)" : "rgb(8 11 13 / 68%)",
    textSupport: isDark ? "rgb(255 255 255 / 74%)" : "rgb(8 11 13 / 74%)",
    accent,
  };
}

/**
 * @param {URLSearchParams} [params]
 * @returns {ScorelineModeId}
 */
export function readScorelineMode(
  params = new URLSearchParams(window.location.search),
) {
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
 * Container tokens for copy panels (footer, context strips, roster rows).
 * The overlay canvas itself stays transparent in Remotion and design preview.
 *
 * @param {ReturnType<typeof getScorelineModeDefinition>} mode
 */
function resolveScorelineModeSurfaceVars(mode) {
  const containerBackground = mode.container.background;
  const containerBackgroundAlt = mode.container.backgroundAlt;
  const isTransparent =
    !containerBackground || containerBackground === "transparent";

  return {
    containerBackground,
    containerBackgroundAlt,
    surfaceMuted: containerBackgroundAlt,
    surface: isTransparent ? "#ffffff" : containerBackground,
  };
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
  const modeSurfaces = resolveScorelineModeSurfaceVars(mode);
  const containerCopy = resolveScorelineContainerCopyTokens(mode, accent);

  canvas.dataset.scorelineMode = modeId;
  canvas.style.removeProperty("background");
  canvas.style.removeProperty("color");
  canvas.style.setProperty(
    "--container-background",
    modeSurfaces.containerBackground,
  );
  canvas.style.setProperty(
    "--container-background-alt",
    modeSurfaces.containerBackgroundAlt,
  );
  canvas.style.setProperty("--container-surface", containerCopy.surface);
  canvas.style.setProperty(
    "--container-surface-solid",
    containerCopy.surfaceSolid,
  );
  canvas.style.setProperty("--container-inset", containerCopy.inset);
  canvas.style.setProperty("--container-text", containerCopy.text);
  canvas.style.setProperty("--container-text-muted", containerCopy.textMuted);
  canvas.style.setProperty(
    "--container-text-support",
    containerCopy.textSupport,
  );
  canvas.style.setProperty("--container-text-accent", containerCopy.accent);
  canvas.style.setProperty("--surface-muted", modeSurfaces.surfaceMuted);
  canvas.style.setProperty("--surface", modeSurfaces.surface);

  canvas.style.setProperty("--header-text", mode.text.title);
  canvas.style.setProperty("--header-accent", accent);
  canvas.style.setProperty("--match-context-surface", matchContext.surface);
  canvas.style.setProperty("--match-context-inset", matchContext.inset);
  canvas.style.setProperty(
    "--match-context-text-muted",
    matchContext.textMuted,
  );
  canvas.style.setProperty("--match-context-text", matchContext.text);
  canvas.style.setProperty("--match-context-accent", matchContext.accent);

  canvas
    .querySelectorAll(".header-eyebrow, .organisation-name")
    .forEach((node) => {
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
