"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }






var _chunk67CZOIHNjs = require('./chunk-67CZOIHN.js');

// src/templates/variants/scoreline/theme/layout.ts
var scorelineLayout = {
  heights: {
    asset: 1088,
    header: 140,
    footer: 112
  },
  spacing: {
    section: "space-y-0",
    item: "space-y-0"
  },
  padding: {
    container: "p-0",
    section: "py-0",
    item: "py-0"
  },
  borderRadius: {
    container: "rounded-none"
  }
};

// src/templates/variants/scoreline/theme/mode.ts
var scorelineMode = {
  light: {
    container: {
      background: "transparent",
      backgroundAlt: "#f3f0ea",
      backgroundTransparent: "rgba(255, 255, 255, 0.5)"
    },
    text: {
      title: "#080b0d",
      copy: "#080b0d"
    }
  },
  lightAlt: {
    container: {
      background: "transparent",
      backgroundAlt: "#f3f0ea",
      backgroundTransparent: "rgba(255, 255, 255, 0.5)"
    },
    text: {
      title: "#ffffff",
      copy: "#080b0d"
    }
  },
  dark: {
    container: {
      background: "#080b0d",
      backgroundAlt: "#1a1a1a",
      backgroundTransparent: "rgba(0, 0, 0, 0.5)"
    },
    text: {
      title: "#ffffff",
      copy: "#ffffff"
    }
  },
  darkAlt: {
    container: {
      background: "#080b0d",
      backgroundAlt: "#1a1a1a",
      backgroundTransparent: "rgba(0, 0, 0, 0.5)"
    },
    text: {
      title: "#080b0d",
      copy: "#ffffff"
    }
  }
};

// src/compositions/cricket/utils/scoreline/scorelineCanvasStyle.ts
var _react = require('react');
var _tinycolor2 = require('tinycolor2'); var _tinycolor22 = _interopRequireDefault(_tinycolor2);
var _remotion = require('remotion');

// src/compositions/cricket/utils/scoreline/applyScorelineTheme.ts
var SCORELINE_DEFAULT_INK = "#080b0d";
var SCORELINE_DEFAULT_PAPER = "#ffffff";
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
    b: Number.parseInt(hex.slice(5, 7), 16)
  };
}
function relativeLuminance({ r, g, b }) {
  const channel = (value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}
function mixRgb(a, b, weightA) {
  const w = Math.min(1, Math.max(0, weightA));
  return {
    r: Math.round(a.r * w + b.r * (1 - w)),
    g: Math.round(a.g * w + b.g * (1 - w)),
    b: Math.round(a.b * w + b.b * (1 - w))
  };
}
function toRgbString(rgb) {
  return `rgb(${rgb.r} ${rgb.g} ${rgb.b})`;
}
function accentOnLight(brand, ink) {
  return mixRgb(brand, ink, 0.78);
}
function ensureSurfaceColor(rgb, ink) {
  const lum = relativeLuminance(rgb);
  if (lum > 0.62) {
    const amount = Math.min(1, (lum - 0.62) / 0.3);
    return mixRgb(rgb, ink, 1 - amount * 0.55);
  }
  if (lum < 0.08) {
    const paper = parseHex(SCORELINE_DEFAULT_PAPER);
    return mixRgb(rgb, paper, 0.85);
  }
  return rgb;
}
function pickOnSurface(surface, ink, paper) {
  return relativeLuminance(surface) > 0.45 ? ink : paper;
}
function separateSimilarColors(primary, secondary, ink) {
  if (Math.abs(relativeLuminance(primary) - relativeLuminance(secondary)) < 0.12) {
    return [primary, mixRgb(secondary, ink, 0.35)];
  }
  return [primary, secondary];
}
function deriveScorelineThemeVars(theme = {}) {
  var _a, _b, _c, _d, _e, _f;
  const ink = (_b = parseHex((_a = theme.ink) != null ? _a : SCORELINE_DEFAULT_INK)) != null ? _b : parseHex(SCORELINE_DEFAULT_INK);
  const paper = (_d = parseHex((_c = theme.paper) != null ? _c : SCORELINE_DEFAULT_PAPER)) != null ? _d : parseHex(SCORELINE_DEFAULT_PAPER);
  let primary = (_e = parseHex(theme.primary)) != null ? _e : parseHex("#ff0000");
  let secondary = (_f = parseHex(theme.secondary)) != null ? _f : parseHex("#004de2");
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
    contrastMetaOnSurface: onDark ? "rgb(255 255 255 / 58%)" : "rgb(8 11 13 / 58%)",
    onSurfaceMuted: onDark ? "rgb(255 255 255 / 72%)" : "rgb(8 11 13 / 72%)",
    onSurfaceLabel: onDark ? "rgb(255 255 255 / 68%)" : "rgb(8 11 13 / 68%)",
    accentOnLightPrimary: toRgbString(accentOnLight(primary, ink)),
    accentOnLightSecondary: toRgbString(accentOnLight(secondary, ink)),
    onDark
  };
}

// src/compositions/cricket/utils/scoreline/resolveScorelineOverlayTokens.ts
var resolveScorelinePerformanceAreaSurface = _chunk67CZOIHNjs.resolveOverlayPerformanceAreaSurface;
var resolveScorelineLadderRowSurface = (selectedPalette) => _chunk67CZOIHNjs.resolveOverlayPerformanceAreaSurface.call(void 0, selectedPalette);
var resolveScorelineLeaderboardHeroRowSurface = _chunk67CZOIHNjs.resolveOverlayHeroRowSurface;
var resolveScorelineRosterRowSurface = _chunk67CZOIHNjs.resolveOverlayHeroRowSurface;

// src/compositions/cricket/utils/scoreline/scorelineCanvasStyle.ts
var getScorelineCanvasStyle = (primary, secondary) => {
  const theme = deriveScorelineThemeVars({ primary, secondary });
  return {
    "--club-primary": theme.clubPrimary,
    "--club-secondary": theme.clubSecondary,
    "--surface-strong-primary": theme.surfaceStrongPrimary,
    "--surface-strong-secondary": theme.surfaceStrongSecondary,
    "--on-surface": theme.onSurface,
    "--contrast-score": theme.contrastScore,
    "--contrast-team": theme.contrastTeam,
    "--contrast-meta-on-surface": theme.contrastMetaOnSurface,
    "--on-surface-muted": theme.onSurfaceMuted,
    "--on-surface-label": theme.onSurfaceLabel,
    "--accent-on-light-primary": theme.accentOnLightPrimary,
    "--accent-on-light-secondary": theme.accentOnLightSecondary,
    "--texture-noise-url": `url("${_remotion.staticFile.call(void 0, "textures/fine-noise.svg")}")`
  };
};
var useScorelineCanvasStyle = () => {
  const { colors, selectedPalette } = _chunk67CZOIHNjs.useThemeContext.call(void 0, );
  const headerText = selectedPalette.text.onContainer.title;
  const headerAccent = selectedPalette.text.onContainer.accent;
  const copyNoBg = selectedPalette.text.onContainer.copyNoBg;
  const matchContext = _react.useMemo.call(void 0, 
    () => _chunk67CZOIHNjs.resolveOverlayMatchContextTokens.call(void 0, selectedPalette),
    [selectedPalette]
  );
  const modeSurfaces = _react.useMemo.call(void 0, 
    () => _chunk67CZOIHNjs.resolveOverlayModeSurfaceVars.call(void 0, selectedPalette),
    [selectedPalette]
  );
  const containerCopy = _react.useMemo.call(void 0, 
    () => _chunk67CZOIHNjs.resolveOverlayContainerCopyTokens.call(void 0, selectedPalette),
    [selectedPalette]
  );
  const performanceAreaSurface = _react.useMemo.call(void 0, 
    () => resolveScorelinePerformanceAreaSurface(selectedPalette),
    [selectedPalette]
  );
  const ladderRowSurface = _react.useMemo.call(void 0, 
    () => resolveScorelineLadderRowSurface(selectedPalette),
    [selectedPalette]
  );
  const leaderboardHeroRowSurface = _react.useMemo.call(void 0, 
    () => resolveScorelineLeaderboardHeroRowSurface(selectedPalette),
    [selectedPalette]
  );
  const rosterRowSurface = _react.useMemo.call(void 0, 
    () => resolveScorelineRosterRowSurface(selectedPalette),
    [selectedPalette]
  );
  return _react.useMemo.call(void 0, 
    () => ({
      ...getScorelineCanvasStyle(colors == null ? void 0 : colors.primary, colors == null ? void 0 : colors.secondary),
      background: "transparent",
      "--container-background": modeSurfaces.containerBackground,
      "--container-background-alt": modeSurfaces.containerBackgroundAlt,
      "--container-surface": containerCopy.surface,
      "--container-surface-solid": containerCopy.surfaceSolid,
      "--container-inset": containerCopy.inset,
      "--container-text": containerCopy.text,
      "--container-text-muted": containerCopy.textMuted,
      "--container-text-support": containerCopy.textSupport,
      "--container-text-accent": containerCopy.accent,
      "--surface-muted": modeSurfaces.surfaceMuted,
      "--surface": modeSurfaces.surface,
      "--header-text": headerText,
      "--header-accent": headerAccent,
      "--match-context-surface": matchContext.surface,
      "--match-context-inset": matchContext.inset,
      "--match-context-text-muted": matchContext.textMuted,
      "--match-context-text": matchContext.text,
      "--match-context-accent": matchContext.accent,
      "--on-container-copy-no-bg": copyNoBg,
      "--on-container-copy-no-bg-muted": _tinycolor22.default.call(void 0, copyNoBg).setAlpha(0.68).toRgbString(),
      "--performance-area-surface": performanceAreaSurface,
      "--ladder-row-surface": ladderRowSurface,
      "--leaderboard-hero-row-surface": leaderboardHeroRowSurface,
      "--roster-row-surface": rosterRowSurface
    }),
    [
      colors == null ? void 0 : colors.primary,
      colors == null ? void 0 : colors.secondary,
      containerCopy,
      copyNoBg,
      headerAccent,
      headerText,
      ladderRowSurface,
      leaderboardHeroRowSurface,
      rosterRowSurface,
      matchContext,
      modeSurfaces,
      performanceAreaSurface
    ]
  );
};

// src/compositions/cricket/utils/scoreline/resolveScorelineHeaderDefaults.ts
var SCORELINE_HEADER_DEFAULTS = {
  CricketUpcoming: { eyebrow: "Upcoming", title: "Upcoming Fixtures" },
  CricketResults: { eyebrow: "Results", title: "Weekend Results" },
  CricketResultSingle: { eyebrow: "Result", title: "Match Result" },
  CricketLadder: { eyebrow: "Ladder", title: "Ladder" },
  CricketTop5Batting: { eyebrow: "Top 5", title: "Top 5 Batting" },
  CricketTop5Bowling: { eyebrow: "Top 5", title: "Top 5 Bowling" },
  CricketBattingPerformances: {
    eyebrow: "Performances",
    title: "Top Batting"
  },
  CricketBowlingPerformances: {
    eyebrow: "Performances",
    title: "Top Bowling"
  },
  CricketRoster: { eyebrow: "Team", title: "Team Roster" },
  CricketTeamOfTheWeek: {
    eyebrow: "Team of the Week",
    title: "Team of the Week"
  }
};
var resolveScorelineHeaderDefaults = (compositionId) => {
  if (compositionId && SCORELINE_HEADER_DEFAULTS[compositionId]) {
    return SCORELINE_HEADER_DEFAULTS[compositionId];
  }
  return SCORELINE_HEADER_DEFAULTS.CricketResults;
};






exports.scorelineLayout = scorelineLayout; exports.scorelineMode = scorelineMode; exports.useScorelineCanvasStyle = useScorelineCanvasStyle; exports.resolveScorelineHeaderDefaults = resolveScorelineHeaderDefaults;
//# sourceMappingURL=chunk-KDMTXURR.js.map