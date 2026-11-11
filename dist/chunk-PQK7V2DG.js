"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var _chunkKCYXYBVSjs = require("./chunk-KCYXYBVS.js");

var _chunk2LHBQOJAjs = require("./chunk-2LHBQOJA.js");

var _chunkTQMZUA5Ijs = require("./chunk-TQMZUA5I.js");

// src/templates/variants/nightSession/theme/componentStyles.shared.ts
var nightSessionComponentStylesShared = {
  nightSessionCanvasShell: {
    className: "flex h-full w-full flex-col overflow-hidden",
  },
  nightSessionAnimatedShell: {
    className: "min-h-0 flex-1 overflow-hidden rounded-none",
  },
  nightSessionDisplayColumn: {
    className: "flex h-full w-full flex-col",
  },
  nightSessionResultsLedger: {
    className: "min-h-0 flex-1 overflow-hidden",
  },
  nightSessionSponsorStrip: {
    className:
      "relative flex min-h-0 w-full flex-1 items-center justify-evenly gap-4 px-6 py-2",
  },
  nightSessionAnimatedItem: {
    className: "rounded-none",
  },
};

// src/templates/variants/nightSession/theme/composition/results.ts
var nightSessionCompositionComponentStylesResults = {
  nightSessionResultsLedger:
    nightSessionComponentStylesShared.nightSessionResultsLedger,
  nightSessionResultsSponsorStrip:
    nightSessionComponentStylesShared.nightSessionSponsorStrip,
};

// src/templates/variants/nightSession/theme/composition/resultSingle.ts
var nightSessionCompositionComponentStylesResultSingle = {
  nightSessionResultsLedger:
    nightSessionComponentStylesShared.nightSessionResultsLedger,
  nightSessionResultsSponsorStrip:
    nightSessionComponentStylesShared.nightSessionSponsorStrip,
};

// src/templates/variants/nightSession/theme/composition/upcoming.ts
var nightSessionCompositionComponentStylesUpcoming = {
  nightSessionUpcomingLedger:
    nightSessionComponentStylesShared.nightSessionResultsLedger,
  nightSessionUpcomingSponsorStrip:
    nightSessionComponentStylesShared.nightSessionSponsorStrip,
};

// src/templates/variants/nightSession/theme/composition/ladder.ts
var nightSessionCompositionComponentStylesLadder = {
  nightSessionLadderLedger:
    nightSessionComponentStylesShared.nightSessionResultsLedger,
  nightSessionLadderSponsorStrip:
    nightSessionComponentStylesShared.nightSessionSponsorStrip,
};

// src/templates/variants/nightSession/theme/composition/top5.ts
var nightSessionCompositionComponentStylesTop5 = {
  nightSessionTop5Ledger:
    nightSessionComponentStylesShared.nightSessionResultsLedger,
  nightSessionTop5SponsorStrip:
    nightSessionComponentStylesShared.nightSessionSponsorStrip,
};

// src/templates/variants/nightSession/theme/composition/roster.ts
var nightSessionCompositionComponentStylesRoster = {
  nightSessionRosterLedger: {
    className: "flex h-full w-full min-h-0 flex-col overflow-hidden",
  },
  nightSessionRosterSponsorStrip:
    nightSessionComponentStylesShared.nightSessionSponsorStrip,
};

// src/templates/variants/nightSession/theme/composition/teamOfTheWeek.ts
var nightSessionCompositionComponentStylesTeamOfTheWeek = {
  nightSessionTotwLedger: {
    className: "flex h-full w-full min-h-0 flex-col overflow-hidden",
  },
  nightSessionTotwSponsorStrip:
    nightSessionComponentStylesShared.nightSessionSponsorStrip,
};

// src/templates/variants/nightSession/theme/composition/performances.ts
var nightSessionCompositionComponentStylesPerformances = {
  nightSessionPerformancesLedger:
    nightSessionCompositionComponentStylesTop5.nightSessionTop5Ledger,
  nightSessionPerformancesSponsorStrip:
    nightSessionCompositionComponentStylesTop5.nightSessionTop5SponsorStrip,
};

// src/templates/variants/nightSession/theme/composition/index.ts
var nightSessionCompositionComponentStyles = {
  ...nightSessionCompositionComponentStylesResults,
  ...nightSessionCompositionComponentStylesResultSingle,
  ...nightSessionCompositionComponentStylesUpcoming,
  ...nightSessionCompositionComponentStylesLadder,
  ...nightSessionCompositionComponentStylesTop5,
  ...nightSessionCompositionComponentStylesRoster,
  ...nightSessionCompositionComponentStylesTeamOfTheWeek,
  ...nightSessionCompositionComponentStylesPerformances,
};

// src/templates/variants/nightSession/theme/tokens.ts
var nightSessionTokens = {
  fonts: {
    title: {
      family: "Teko",
    },
    subtitle: {
      family: "Source Sans 3",
    },
    copy: {
      family: "Source Sans 3",
    },
  },
  fontClasses: {
    heading: { family: "Teko" },
    subheading: { family: "Source Sans 3" },
    body: { family: "Source Sans 3" },
  },
};

// src/templates/variants/nightSession/theme/index.ts
var nightSessionTheme = {
  ..._chunkTQMZUA5Ijs.baseTheme,
  ...nightSessionTokens,
  layout: _chunkKCYXYBVSjs.scorelineLayout,
  mode: _chunkKCYXYBVSjs.scorelineMode,
  componentStyles: {
    ..._chunkTQMZUA5Ijs.baseTheme.componentStyles,
    ...nightSessionComponentStylesShared,
    ...nightSessionCompositionComponentStyles,
  },
};

// src/templates/variants/nightSession/components/NightSessionIntro.tsx
var _remotion = require("remotion");

// src/compositions/cricket/utils/nightSession/nightSessionCanvasStyle.ts
var _react = require("react");

// src/compositions/cricket/utils/nightSession/resolveNightSessionOverlayTokens.ts
var resolveNightSessionBandTokens = (selectedPalette) => {
  const containerCopy =
    _chunkKCYXYBVSjs.resolveScorelineContainerCopyTokens.call(
      void 0,
      selectedPalette,
    );
  const isDark = _chunkKCYXYBVSjs.isScorelineDarkContainerMode.call(
    void 0,
    selectedPalette,
  );
  const accent =
    selectedPalette.text.onContainer.accent ||
    selectedPalette.text.onContainer.title;
  const rankBoxSolid = "#ffffff";
  const rosterIndexPanelSolid = containerCopy.surfaceSolid;
  const teamScoreContainerBg = isDark
    ? "linear-gradient(180deg, rgb(22 25 29) 0%, rgb(10 12 14) 100%)"
    : "linear-gradient(180deg, rgb(243 240 234) 0%, rgb(255 255 255) 100%)";
  return {
    "--ns-team-score-container-bg": teamScoreContainerBg,
    "--ns-team-score-container-opacity": "0.85",
    "--ns-band-bg": teamScoreContainerBg,
    "--ns-band-border": isDark ? "rgb(255 255 255 / 7%)" : "rgb(8 11 13 / 10%)",
    "--ns-band-score": isDark ? "#ffffff" : containerCopy.text,
    "--ns-band-team": isDark ? "rgb(255 255 255 / 92%)" : containerCopy.text,
    "--ns-band-meta": isDark
      ? "rgb(244 243 241 / 58%)"
      : containerCopy.textMuted,
    "--ns-outcome-bg": isDark
      ? "rgb(10 12 14 / 92%)"
      : `color-mix(in srgb, ${containerCopy.surfaceSolid} 92%, transparent)`,
    "--ns-outcome-text": containerCopy.text,
    "--ns-schedule-lockup-bg": isDark
      ? "rgb(10 12 14 / 95%)"
      : "rgb(255 255 255 / 95%)",
    "--ns-performance-row-bg": isDark
      ? "rgb(10 12 14 / 65%)"
      : "rgb(243 240 234 / 35%)",
    "--ns-performance-border": isDark
      ? "rgb(255 255 255 / 10%)"
      : "rgb(8 11 13 / 12%)",
    "--ns-performance-row-rule": isDark
      ? "rgb(255 255 255 / 7%)"
      : "rgb(8 11 13 / 8%)",
    "--ns-performance-player": containerCopy.text,
    "--ns-performance-figure": containerCopy.text,
    "--ns-leader-rank-bg": "rgb(255 255 255 / 95%)",
    "--ns-leader-rank-text": _chunkTQMZUA5Ijs.ensureContrast.call(
      void 0,
      rankBoxSolid,
      accent,
    ),
    "--ns-roster-index-text": _chunkTQMZUA5Ijs.ensureContrast.call(
      void 0,
      rosterIndexPanelSolid,
      accent,
    ),
    "--ns-grade-rail-gradient-mid": `color-mix(in srgb, ${accent} 10%, transparent)`,
    "--ns-grade-rail-gradient-end": `color-mix(in srgb, ${accent} 32%, transparent)`,
  };
};

// src/compositions/cricket/utils/nightSession/nightSessionCanvasStyle.ts
var useNightSessionCanvasStyle = () => {
  const scorelineStyle = _chunkKCYXYBVSjs.useScorelineCanvasStyle.call(void 0);
  const { selectedPalette } = _chunkTQMZUA5Ijs.useThemeContext.call(void 0);
  const bandTokens = _react.useMemo.call(
    void 0,
    () => resolveNightSessionBandTokens(selectedPalette),
    [selectedPalette],
  );
  return _react.useMemo.call(
    void 0,
    () => ({
      ...scorelineStyle,
      ...bandTokens,
      "--font-display": "Teko, sans-serif",
      "--font-body": '"Source Sans 3", Arial, sans-serif',
    }),
    [bandTokens, scorelineStyle],
  );
};

// src/templates/variants/nightSession/components/NightSessionIntro.tsx
var _jsxruntime = require("react/jsx-runtime");
var NightSessionIntro = () => {
  var _a, _b, _c;
  const { club, metadata, templateVariation } =
    _chunkTQMZUA5Ijs.useVideoDataContext.call(void 0);
  const { animations } = _chunkTQMZUA5Ijs.useAnimationContext.call(void 0);
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const introExitFrame = TextAnimations.introExitFrame;
  const { selectedPalette, fontClasses, componentStyles } =
    _chunkTQMZUA5Ijs.useThemeContext.call(void 0);
  const canvasStyle = useNightSessionCanvasStyle();
  const headerTextColor = selectedPalette.text.onContainer.title;
  const headerDefaults = _chunkKCYXYBVSjs.resolveScorelineHeaderDefaults.call(
    void 0,
    metadata.compositionId,
  );
  const title = metadata.videoTitle || metadata.title || headerDefaults.title;
  const logoUrl =
    (_b = (_a = club.logo) == null ? void 0 : _a.url) != null ? _b : "";
  const hasCrest = Boolean(logoUrl);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _remotion.AbsoluteFill, {
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
      className: `night-session-canvas night-session-intro ${_chunkTQMZUA5Ijs.csClass.call(void 0, componentStyles, "nightSessionCanvasShell")}`,
      style: canvasStyle,
      "data-night-session-mode": templateVariation.mode || "light",
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
        className: "night-session-intro__frame",
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
            className: "night-session-intro__main",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
              className: `night-session-intro__animated ${_chunkTQMZUA5Ijs.csClass.call(void 0, componentStyles, "nightSessionAnimatedItem")}`,
              children: /* @__PURE__ */ _jsxruntime.jsxs.call(
                void 0,
                "header",
                {
                  className: "ns-header",
                  children: [
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                      className: "ns-header__accent",
                      "aria-hidden": true,
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(
                        void 0,
                        "span",
                        { className: "ns-accent-lines" },
                      ),
                    }),
                    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
                      className: "ns-header__row",
                      children: [
                        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
                          className: "organisation-mark ns-header__mark",
                          "data-has-crest": hasCrest ? "true" : "false",
                          children: [
                            /* @__PURE__ */ _jsxruntime.jsx.call(
                              void 0,
                              "span",
                              {
                                className: "mark-fallback",
                                "aria-hidden": true,
                              },
                            ),
                            hasCrest
                              ? /* @__PURE__ */ _jsxruntime.jsx.call(
                                  void 0,
                                  _chunkTQMZUA5Ijs.AnimatedImage,
                                  {
                                    src: logoUrl,
                                    alt: "",
                                    width: "auto",
                                    height: "auto",
                                    fit: "contain",
                                    animation: LogoAnimations.introIn,
                                    exitAnimation: LogoAnimations.introOut,
                                    exitFrame: LogoAnimations.introExitFrame,
                                  },
                                )
                              : null,
                          ],
                        }),
                        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                          className: "ns-header__lockup",
                          children: /* @__PURE__ */ _jsxruntime.jsx.call(
                            void 0,
                            _chunkTQMZUA5Ijs.AnimatedText,
                            {
                              textAlign: "center",
                              type: "title",
                              variant: "onContainerCopy",
                              letterAnimation: "word",
                              animation: TextAnimations.mainTitle,
                              animationDelay:
                                _chunkTQMZUA5Ijs.NIGHT_SESSION_HEADER_COPY_DELAY,
                              exitAnimation: TextAnimations.introOut,
                              exitFrame: introExitFrame,
                              fontFamily:
                                (_c = fontClasses.heading) == null
                                  ? void 0
                                  : _c.family,
                              className: "header-title",
                              style: {
                                color: headerTextColor,
                                fontSize: "var(--type-intro-title, 71px)",
                                fontWeight: 600,
                                lineHeight: 0.92,
                                letterSpacing: "0.06em",
                              },
                              children: title,
                            },
                          ),
                        }),
                      ],
                    }),
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                      className: "ns-header__wedge",
                      "aria-hidden": true,
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(
                        void 0,
                        "span",
                        { className: "ns-accent-wedge" },
                      ),
                    }),
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", {
                      className: "sr-only",
                      children: club.name,
                    }),
                  ],
                },
              ),
            }),
          }),
          /* @__PURE__ */ _jsxruntime.jsx.call(
            void 0,
            _chunkTQMZUA5Ijs.IntroPrimarySponsors,
            {
              introIn: LogoAnimations.introIn,
              introOut: LogoAnimations.introOut,
              introExitFrame: LogoAnimations.introExitFrame,
              className: "night-session-intro__sponsors",
              itemClassName: "night-session-intro__sponsor-slot",
            },
          ),
        ],
      }),
    }),
  });
};

// src/templates/variants/nightSession/components/NightSessionBackground.tsx

var NightSessionBackground = () => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkTQMZUA5Ijs.SelectTemplateBackground,
    {},
  );
};

// src/templates/variants/nightSession/components/NightSessionMain.tsx

// src/templates/variants/nightSession/components/NightSessionMainHeader.tsx

var NightSessionMainHeader = () => {
  var _a, _b;
  const { selectedPalette } = _chunkTQMZUA5Ijs.useThemeContext.call(void 0);
  const { club, metadata } = _chunkTQMZUA5Ijs.useVideoDataContext.call(void 0);
  const headerTextColor = selectedPalette.text.onContainer.title;
  const logoUrl =
    (_b = (_a = club.logo) == null ? void 0 : _a.url) != null ? _b : "";
  const hasCrest = Boolean(logoUrl);
  const headerDefaults = _chunkKCYXYBVSjs.resolveScorelineHeaderDefaults.call(
    void 0,
    metadata.compositionId,
  );
  const title = metadata.videoTitle || metadata.title || headerDefaults.title;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "header", {
    className: "ns-header",
    children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
        className: "ns-header__accent",
        "aria-hidden": true,
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", {
          className: "ns-accent-lines",
        }),
      }),
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
        className: "ns-header__row gap-8",
        children: [
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
            className: "organisation-mark ns-header__mark",
            "data-has-crest": hasCrest ? "true" : "false",
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", {
                className: "mark-fallback",
                "aria-hidden": true,
              }),
              hasCrest
                ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _remotion.Img, {
                    src: logoUrl,
                    alt: "",
                  })
                : null,
            ],
          }),
          /* @__PURE__ */ _jsxruntime.jsx.call(
            void 0,
            _chunkTQMZUA5Ijs.NightSessionAnimatedCopy,
            {
              className: "ns-header__lockup",
              animationDelay: _chunkTQMZUA5Ijs.NIGHT_SESSION_HEADER_COPY_DELAY,
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h1", {
                className: "header-title",
                style: { color: headerTextColor },
                children: title,
              }),
            },
          ),
        ],
      }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
        className: "ns-header__wedge",
        "aria-hidden": true,
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", {
          className: "ns-accent-wedge",
        }),
      }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", {
        className: "sr-only",
        children: club.name,
      }),
    ],
  });
};

// src/templates/variants/nightSession/components/NightSessionMain.tsx

var NightSessionMain = () => {
  var _a;
  const { layout, componentStyles } =
    _chunkTQMZUA5Ijs.useThemeContext.call(void 0);
  const { heights } = layout;
  const { data, metadata, templateVariation } =
    _chunkTQMZUA5Ijs.useVideoDataContext.call(void 0);
  const { timings } = data;
  const canvasStyle = useNightSessionCanvasStyle();
  const canvasDataset = _chunkKCYXYBVSjs.resolveScorelineCanvasDataset.call(
    void 0,
    metadata.compositionId,
  );
  const compositionRouteHeight =
    _chunkTQMZUA5Ijs.getCompositionSectionHeight.call(void 0, heights);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _remotion.AbsoluteFill, {
    children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
      className: `night-session-canvas template-canvas ${_chunkTQMZUA5Ijs.csClass.call(void 0, componentStyles, "nightSessionCanvasShell")}`,
      style: canvasStyle,
      "data-night-session-mode": templateVariation.mode || "light",
      ...canvasDataset,
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(
          void 0,
          NightSessionMainHeader,
          {},
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
          className: "relative min-h-0",
          style: {
            height: `${compositionRouteHeight}px`,
            maxHeight: `${compositionRouteHeight}px`,
          },
          children: _chunkTQMZUA5Ijs.RouteToComposition.call(void 0),
        }),
        /* @__PURE__ */ _jsxruntime.jsx.call(
          void 0,
          _chunkTQMZUA5Ijs.ProgressTimer,
          {
            FRAMES:
              (_a = timings == null ? void 0 : timings.FPS_MAIN) != null
                ? _a
                : 0,
          },
        ),
      ],
    }),
  });
};

// src/templates/variants/nightSession/animations.ts
var nightSessionPanelIn = {
  type: "revealTop",
  easing: { type: "inOut", base: "ease" },
  duration: 14,
};
var nightSessionPanelOut = {
  type: "collapseBottom",
  easing: { type: "out", base: "ease" },
  duration: 12,
};
var nightSessionRowIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 12,
  custom: { distance: "55%" },
};
var nightSessionRowOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 10,
  custom: { distance: "55%" },
};
var nightSessionCopyIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 13,
  custom: { distance: "30%" },
};
var nightSessionCopyOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 9,
  custom: { distance: "30%" },
};
var nightSessionStatsCopyIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 13,
  custom: { distance: "24%" },
};
var nightSessionStatsCopyOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 9,
  custom: { distance: "24%" },
};
var nightSessionIntroCopyIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 14,
  delay: 8,
  custom: { distance: 40 },
};
var nightSessionIntroCopyOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 10,
  custom: { distance: 36 },
};
var nightSessionIntroPanelIn = nightSessionPanelIn;
var nightSessionIntroPanelOut = nightSessionPanelOut;
var templateAnimations = {
  ..._chunk2LHBQOJAjs.broadcastSnapAnimations,
  text: {
    ..._chunk2LHBQOJAjs.broadcastSnapAnimations.text,
    intro: {
      ..._chunk2LHBQOJAjs.broadcastSnapAnimations.text.intro,
      mainTitle: nightSessionIntroCopyIn,
      clubName: {
        ...nightSessionIntroCopyIn,
        delay: 5,
      },
      introOut: nightSessionIntroCopyOut,
    },
  },
  container: {
    intro: {
      panel: {
        containerIn: nightSessionIntroPanelIn,
        containerOut: nightSessionIntroPanelOut,
      },
    },
    main: {
      parent: {
        containerIn: { type: "none" },
        containerOut: { type: "none" },
      },
      itemContainer: {
        containerIn: nightSessionRowIn,
        containerOut: nightSessionRowOut,
      },
      itemContainerOuter: {
        containerIn: nightSessionPanelIn,
        containerOut: nightSessionPanelOut,
      },
      itemContainerInner: {
        containerIn: nightSessionCopyIn,
        containerOut: nightSessionCopyOut,
      },
      itemContainerSecondary: {
        containerIn: nightSessionStatsCopyIn,
        containerOut: nightSessionStatsCopyOut,
      },
    },
  },
  transition: {
    Main: {
      type: "slide",
      direction: "from-top",
      durationInFrames: 15,
    },
  },
};
var nightSessionAnimations = templateAnimations;

// src/templates/variants/nightSession/index.tsx

var NightSession = ({ data }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkTQMZUA5Ijs.BaseTemplate,
    {
      data,
      settings: nightSessionTheme,
      introComponent: NightSessionIntro,
      outroComponent: _chunk2LHBQOJAjs.BroadcastProOutro,
      backgroundComponent: NightSessionBackground,
      mainComponentLayout: NightSessionMain,
      animations: nightSessionAnimations,
    },
  );
};

exports.NightSession = NightSession;
//# sourceMappingURL=chunk-PQK7V2DG.js.map
