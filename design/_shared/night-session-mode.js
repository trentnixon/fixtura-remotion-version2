import scorelineModes from "./scoreline-modes.json" with { type: "json" };

/** @typedef {"light" | "lightAlt" | "dark" | "darkAlt"} NightSessionModeId */
/** @typedef {"light" | "dark" | "club"} NightSessionBackdropId */

const PANEL_MIN_OPACITY = 0.4;
const PANEL_LIGHT = `rgba(243, 240, 234, ${PANEL_MIN_OPACITY})`;
const PANEL_DARK = `rgba(8, 11, 13, ${PANEL_MIN_OPACITY})`;
const PERFORMANCE_AREA_PANEL_LIGHT = "rgba(243, 240, 234, 0.5)";
const PERFORMANCE_AREA_PANEL_DARK = "rgba(8, 11, 13, 0.5)";
const DEFAULT_INK = "#080b0d";
const STORAGE_KEY = "fixtura-night-session-preview-mode";
const BACKDROP_STORAGE_KEY = "fixtura-night-session-preview-backdrop";

/**
 * @param {NightSessionModeId} modeId
 */
export function getNightSessionModeDefinition(modeId) {
  const mode = scorelineModes[modeId];
  if (!mode) {
    return scorelineModes.dark;
  }

  return mode;
}

/**
 * @param {NightSessionModeId} modeId
 * @param {string} [accent]
 */
export function resolveNightSessionMatchContextTokens(
  modeId,
  accent = DEFAULT_INK,
) {
  const mode = getNightSessionModeDefinition(modeId);
  const isDark =
    Boolean(mode.container.background) &&
    mode.container.background !== "transparent";
  const surface = isDark ? PANEL_DARK : PANEL_LIGHT;

  const openCopy = mode.text.title;

  return {
    surface,
    inset: isDark
      ? "inset 0 1px 0 rgb(255 255 255 / 12%)"
      : "inset 0 1px 0 rgb(255 255 255 / 55%)",
    textMuted: `color-mix(in srgb, ${openCopy} 68%, transparent)`,
    text: `color-mix(in srgb, ${openCopy} 92%, transparent)`,
    accent,
  };
}

/**
 * @param {ReturnType<typeof getNightSessionModeDefinition>} mode
 * @param {string} accent
 */
function resolveNightSessionContainerCopyTokens(mode, accent) {
  const isDark =
    Boolean(mode.container.background) &&
    mode.container.background !== "transparent";

  return {
    surface: isDark ? PANEL_DARK : PANEL_LIGHT,
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
    isDark,
  };
}

/**
 * @param {URLSearchParams} [params]
 * @returns {NightSessionModeId}
 */
export function readNightSessionMode(
  params = new URLSearchParams(window.location.search),
) {
  const fromQuery = params.get("mode");
  if (fromQuery && fromQuery in scorelineModes) {
    return /** @type {NightSessionModeId} */ (fromQuery);
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && stored in scorelineModes) {
    return /** @type {NightSessionModeId} */ (stored);
  }

  return "dark";
}

/**
 * @param {URLSearchParams} [params]
 * @returns {NightSessionBackdropId}
 */
export function readNightSessionBackdrop(
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

  return "dark";
}

/**
 * @param {ReturnType<typeof getNightSessionModeDefinition>} mode
 */
function resolveNightSessionModeSurfaceVars(mode) {
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
 * @param {NightSessionModeId} modeId
 * @param {{ accent?: string }} [options]
 */
export function applyNightSessionMode(canvas, modeId, options = {}) {
  if (!(canvas instanceof HTMLElement)) {
    return;
  }

  const mode = getNightSessionModeDefinition(modeId);
  const accent =
    (options.accent ??
      getComputedStyle(canvas).getPropertyValue("--club-primary").trim()) ||
    DEFAULT_INK;
  const matchContext = resolveNightSessionMatchContextTokens(modeId, accent);
  const modeSurfaces = resolveNightSessionModeSurfaceVars(mode);
  const containerCopy = resolveNightSessionContainerCopyTokens(mode, accent);

  canvas.dataset.nightSessionMode = modeId;
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
  canvas.style.setProperty("--on-container-copy-no-bg", mode.text.title);
  canvas.style.setProperty(
    "--on-container-copy-no-bg-muted",
    `color-mix(in srgb, ${mode.text.title} 68%, transparent)`,
  );

  const isDarkContainer = containerCopy.isDark;
  canvas.style.setProperty(
    "--performance-area-surface",
    isDarkContainer
      ? PERFORMANCE_AREA_PANEL_DARK
      : PERFORMANCE_AREA_PANEL_LIGHT,
  );

  const teamScoreContainerBg = isDarkContainer
    ? "linear-gradient(180deg, rgb(22 25 29) 0%, rgb(10 12 14) 100%)"
    : "linear-gradient(180deg, rgb(243 240 234) 0%, rgb(255 255 255) 100%)";

  canvas.style.setProperty("--ns-team-score-container-bg", teamScoreContainerBg);
  canvas.style.setProperty("--ns-team-score-container-opacity", "0.85");
  canvas.style.setProperty("--ns-band-bg", teamScoreContainerBg);
  canvas.style.setProperty(
    "--ns-band-border",
    isDarkContainer ? "rgb(255 255 255 / 7%)" : "rgb(8 11 13 / 10%)",
  );
  canvas.style.setProperty(
    "--ns-band-score",
    isDarkContainer ? "#ffffff" : containerCopy.text,
  );
  canvas.style.setProperty(
    "--ns-band-team",
    isDarkContainer ? "rgb(255 255 255 / 92%)" : containerCopy.text,
  );
  canvas.style.setProperty(
    "--ns-band-meta",
    isDarkContainer ? "rgb(244 243 241 / 58%)" : containerCopy.textMuted,
  );
  canvas.style.setProperty(
    "--ns-outcome-bg",
    isDarkContainer
      ? "rgb(10 12 14 / 92%)"
      : "color-mix(in srgb, var(--container-surface-solid, #ffffff) 92%, transparent)",
  );
  canvas.style.setProperty("--ns-outcome-text", containerCopy.text);
  canvas.style.setProperty(
    "--ns-schedule-lockup-bg",
    isDarkContainer ? "rgb(10 12 14 / 95%)" : "rgb(255 255 255 / 95%)",
  );
  canvas.style.setProperty(
    "--ns-performance-row-bg",
    isDarkContainer ? "rgb(10 12 14 / 65%)" : "rgb(243 240 234 / 35%)",
  );
  canvas.style.setProperty(
    "--ns-performance-border",
    isDarkContainer ? "rgb(255 255 255 / 10%)" : "rgb(8 11 13 / 12%)",
  );
  canvas.style.setProperty(
    "--ns-performance-row-rule",
    isDarkContainer ? "rgb(255 255 255 / 7%)" : "rgb(8 11 13 / 8%)",
  );
  canvas.style.setProperty("--ns-performance-player", containerCopy.text);
  canvas.style.setProperty("--ns-performance-figure", containerCopy.text);
  canvas.style.setProperty("--ns-leader-rank-bg", "rgb(255 255 255 / 95%)");
  canvas.style.setProperty("--ns-leader-rank-text", containerCopy.accent);
  canvas.style.setProperty("--ns-roster-index-text", containerCopy.accent);
  canvas.style.setProperty(
    "--ns-grade-rail-gradient-mid",
    `color-mix(in srgb, ${containerCopy.accent} 10%, transparent)`,
  );
  canvas.style.setProperty(
    "--ns-grade-rail-gradient-end",
    `color-mix(in srgb, ${containerCopy.accent} 32%, transparent)`,
  );

  canvas
    .querySelectorAll(
      ".header-eyebrow, .header-shared-round, .organisation-name",
    )
    .forEach((node) => {
      if (node instanceof HTMLElement) {
        node.style.color = mode.text.title;
      }
    });

  const title = canvas.querySelector(".ns-header__lockup .header-title");
  if (title instanceof HTMLElement) {
    title.style.color = mode.text.title;
  }
}

/**
 * @param {ParentNode} root
 * @param {NightSessionBackdropId} backdropId
 */
export function applyNightSessionBackdrop(root, backdropId) {
  const wrap = root.querySelector(".design-canvas-wrap");
  if (!(wrap instanceof HTMLElement)) {
    return;
  }

  wrap.dataset.nightSessionBackdrop = backdropId;
}

/**
 * @param {NightSessionModeId} modeId
 */
export function persistNightSessionMode(modeId) {
  window.localStorage.setItem(STORAGE_KEY, modeId);
}

/**
 * @param {NightSessionBackdropId} backdropId
 */
export function persistNightSessionBackdrop(backdropId) {
  window.localStorage.setItem(BACKDROP_STORAGE_KEY, backdropId);
}

export { scorelineModes as nightSessionModes };
