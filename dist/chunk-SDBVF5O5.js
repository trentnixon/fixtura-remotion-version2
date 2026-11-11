"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var _chunkKCYXYBVSjs = require("./chunk-KCYXYBVS.js");

var _chunk2LHBQOJAjs = require("./chunk-2LHBQOJA.js");

var _chunkTQMZUA5Ijs = require("./chunk-TQMZUA5I.js");

// src/templates/variants/scoreline/theme/componentStyles.shared.ts
var scorelineComponentStylesShared = {
  scorelineCanvasShell: {
    className: "flex h-full w-full flex-col overflow-hidden",
  },
  scorelineAnimatedShell: {
    className: "min-h-0 flex-1 overflow-hidden rounded-none",
  },
  scorelineAnimatedItem: {
    className: "rounded-none",
  },
  scorelineDisplayColumn: {
    className: "flex h-full w-full flex-col",
  },
  scorelineDisplayScore: {
    className:
      "font-barlow-condensed text-[72px] font-extrabold leading-none tracking-tight tabular-nums",
  },
  scorelineDisplayTeam: {
    className:
      "font-barlow-condensed text-[30px] font-bold uppercase leading-[0.95] tracking-wide",
  },
  scorelineBodyMeta: {
    className:
      "font-source-sans text-[21px] font-semibold uppercase tracking-[0.06em]",
  },
  scorelineBodyPlayer: {
    className: "font-source-sans text-[26px] font-medium leading-tight",
  },
  scorelineFigure: {
    className:
      "font-barlow-condensed text-[30px] font-bold leading-none tabular-nums",
  },
  scorelineSponsorStrip: {
    className:
      "relative flex min-h-0 w-full items-center justify-evenly gap-4 px-6 py-2",
  },
};

// src/templates/variants/scoreline/theme/composition/results.ts
var scorelineCompositionComponentStylesResults = {
  scorelineResultsLedger: {
    className: "min-h-0 flex-1 overflow-hidden",
  },
  scorelineResultsMatchModule: {
    className: "flex min-h-0 flex-1 flex-col overflow-hidden",
  },
  scorelineResultsSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineDisplayScore: scorelineComponentStylesShared.scorelineDisplayScore,
  scorelineDisplayTeam: scorelineComponentStylesShared.scorelineDisplayTeam,
  scorelineBodyMeta: scorelineComponentStylesShared.scorelineBodyMeta,
  scorelineBodyPlayer: scorelineComponentStylesShared.scorelineBodyPlayer,
  scorelineFigure: scorelineComponentStylesShared.scorelineFigure,
};

// src/templates/variants/scoreline/theme/composition/upcoming.ts
var scorelineCompositionComponentStylesUpcoming = {
  scorelineUpcomingLedger: {
    className: "min-h-0 flex-1 overflow-hidden",
  },
  scorelineUpcomingSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineBodyMeta: scorelineComponentStylesShared.scorelineBodyMeta,
};

// src/templates/variants/scoreline/theme/composition/ladder.ts
var scorelineCompositionComponentStylesLadder = {
  scorelineLadderLedger: {
    className: "min-h-0 flex-1 overflow-hidden",
  },
  scorelineLadderRow: {
    className: "grid min-h-0 flex-1 items-center gap-2 px-3 py-1.5",
  },
  scorelineLadderSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineBodyMeta: scorelineComponentStylesShared.scorelineBodyMeta,
};

// src/templates/variants/scoreline/theme/composition/top5.ts
var scorelineCompositionComponentStylesTop5 = {
  scorelineTop5Ledger: {
    className: "min-h-0 flex-1 overflow-hidden",
  },
  scorelineLeaderRow: {
    className: "grid min-h-0 flex-1 items-center gap-3 px-4 py-2",
  },
  scorelineTop5SponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineFigure: scorelineComponentStylesShared.scorelineFigure,
  scorelineBodyPlayer: scorelineComponentStylesShared.scorelineBodyPlayer,
};

// src/templates/variants/scoreline/theme/composition/roster.ts
var scorelineCompositionComponentStylesRoster = {
  scorelineRosterLedger: {
    className: "flex min-h-0 flex-col overflow-hidden",
  },
  scorelineRosterLineupRow: {
    className: "grid grid-cols-[36px_minmax(0,1fr)] items-center gap-3 px-2",
  },
  scorelineRosterSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineBodyMeta: scorelineComponentStylesShared.scorelineBodyMeta,
};

// src/templates/variants/scoreline/theme/composition/teamOfTheWeek.ts
var scorelineCompositionComponentStylesTeamOfTheWeek = {
  scorelineTotwLedger: {
    className: "min-h-0 flex-1 overflow-hidden",
  },
  scorelineTotwRow: {
    className: "grid min-h-0 flex-1 items-center gap-3 px-4 py-2",
  },
  scorelineTotwSponsorStrip:
    scorelineComponentStylesShared.scorelineSponsorStrip,
  scorelineFigure: scorelineComponentStylesShared.scorelineFigure,
  scorelineBodyPlayer: scorelineComponentStylesShared.scorelineBodyPlayer,
};

// src/templates/variants/scoreline/theme/composition/performances.ts
var scorelineCompositionComponentStylesPerformances = {
  scorelinePerformancesLedger:
    scorelineCompositionComponentStylesTop5.scorelineTop5Ledger,
  scorelinePerformancesSponsorStrip:
    scorelineCompositionComponentStylesTop5.scorelineTop5SponsorStrip,
};

// src/templates/variants/scoreline/theme/composition/index.ts
var scorelineCompositionComponentStyles = {
  ...scorelineCompositionComponentStylesResults,
  ...scorelineCompositionComponentStylesResults,
  ...scorelineCompositionComponentStylesUpcoming,
  ...scorelineCompositionComponentStylesLadder,
  ...scorelineCompositionComponentStylesTop5,
  ...scorelineCompositionComponentStylesRoster,
  ...scorelineCompositionComponentStylesTeamOfTheWeek,
  ...scorelineCompositionComponentStylesPerformances,
};

// src/templates/variants/scoreline/theme/tokens.ts
var scorelineTokens = {
  fonts: {
    title: {
      family: "Geist",
    },
    subtitle: {
      family: "Geist",
    },
    copy: {
      family: "Geist",
    },
  },
  fontClasses: {
    heading: { family: "Geist" },
    subheading: { family: "Geist" },
    body: { family: "Geist" },
  },
};

// src/templates/variants/scoreline/theme/index.ts
var scorelineTheme = {
  ..._chunkTQMZUA5Ijs.baseTheme,
  ...scorelineTokens,
  layout: _chunkKCYXYBVSjs.scorelineLayout,
  mode: _chunkKCYXYBVSjs.scorelineMode,
  componentStyles: {
    ..._chunkTQMZUA5Ijs.baseTheme.componentStyles,
    ...scorelineComponentStylesShared,
    ...scorelineCompositionComponentStyles,
  },
};

// src/templates/variants/scoreline/components/ScorelineIntro.tsx
var _remotion = require("remotion");
var _jsxruntime = require("react/jsx-runtime");
var ScorelineIntro = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { club, metadata, templateVariation } =
    _chunkTQMZUA5Ijs.useVideoDataContext.call(void 0);
  const { animations } = _chunkTQMZUA5Ijs.useAnimationContext.call(void 0);
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const introPanelAnimation =
    (_b = (_a = animations.container.intro) == null ? void 0 : _a.panel) != null
      ? _b
      : animations.container.main.itemContainerOuter;
  const introExitFrame = TextAnimations.introExitFrame;
  const { fontClasses, componentStyles, selectedPalette } =
    _chunkTQMZUA5Ijs.useThemeContext.call(void 0);
  const canvasStyle = _chunkKCYXYBVSjs.useScorelineCanvasStyle.call(void 0);
  const headerTextColor = selectedPalette.text.onContainer.title;
  const headerDefaults = _chunkKCYXYBVSjs.resolveScorelineHeaderDefaults.call(
    void 0,
    metadata.compositionId,
  );
  const eyebrow =
    metadata.title ||
    ((_c = metadata.titleSplit) == null ? void 0 : _c.join(" \xB7 ")) ||
    headerDefaults.eyebrow;
  const title = metadata.videoTitle || metadata.title || headerDefaults.title;
  const logoUrl =
    (_e = (_d = club.logo) == null ? void 0 : _d.url) != null ? _e : "";
  const hasCrest = Boolean(logoUrl);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _remotion.AbsoluteFill, {
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
      className: `scoreline-canvas scoreline-intro ${_chunkTQMZUA5Ijs.csClass.call(void 0, componentStyles, "scorelineCanvasShell")}`,
      style: canvasStyle,
      "data-scoreline-mode": templateVariation.mode || "light",
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
        className: "scoreline-intro__frame",
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(
            void 0,
            _chunkTQMZUA5Ijs.AnimatedContainer,
            {
              type: "full",
              size: "auto",
              className: `scoreline-intro__animated ${_chunkTQMZUA5Ijs.csClass.call(void 0, componentStyles, "scorelineAnimatedItem")}`,
              backgroundColor: "none",
              animation: introPanelAnimation.containerIn,
              exitAnimation: introPanelAnimation.containerOut,
              exitFrame: introExitFrame,
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                className: "scoreline-intro__panel",
                children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
                  className: "scoreline-intro__shell",
                  children: [
                    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
                      className: "scoreline-intro__main",
                      children: [
                        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
                          className: "header-identity-lockup",
                          children: [
                            /* @__PURE__ */ _jsxruntime.jsxs.call(
                              void 0,
                              "div",
                              {
                                className: "organisation-mark",
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
                                          exitAnimation:
                                            LogoAnimations.introOut,
                                          exitFrame:
                                            LogoAnimations.introExitFrame,
                                        },
                                      )
                                    : null,
                                ],
                              },
                            ),
                            /* @__PURE__ */ _jsxruntime.jsx.call(
                              void 0,
                              "div",
                              {
                                className: "header-identity",
                                children: /* @__PURE__ */ _jsxruntime.jsx.call(
                                  void 0,
                                  _chunkTQMZUA5Ijs.AnimatedText,
                                  {
                                    textAlign: "left",
                                    type: "copy",
                                    variant: "onContainerCopy",
                                    letterAnimation: "word",
                                    animation: TextAnimations.clubName,
                                    exitAnimation: TextAnimations.introOut,
                                    exitFrame: TextAnimations.introExitFrame,
                                    fontFamily:
                                      (_f = fontClasses.body) == null
                                        ? void 0
                                        : _f.family,
                                    className: "organisation-name",
                                    style: { color: headerTextColor },
                                    children: club.name,
                                  },
                                ),
                              },
                            ),
                          ],
                        }),
                        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
                          className: "header-title-stack",
                          children: [
                            /* @__PURE__ */ _jsxruntime.jsx.call(
                              void 0,
                              _chunkTQMZUA5Ijs.AnimatedText,
                              {
                                textAlign: "right",
                                type: "label",
                                variant: "onContainerTitle",
                                letterAnimation: "word",
                                animation: TextAnimations.mainTitle,
                                exitAnimation: TextAnimations.introOut,
                                exitFrame: TextAnimations.introExitFrame,
                                fontFamily:
                                  (_g = fontClasses.heading) == null
                                    ? void 0
                                    : _g.family,
                                className: "header-eyebrow",
                                style: { color: headerTextColor },
                                children: eyebrow,
                              },
                            ),
                            /* @__PURE__ */ _jsxruntime.jsx.call(
                              void 0,
                              _chunkTQMZUA5Ijs.AnimatedText,
                              {
                                textAlign: "right",
                                type: "title",
                                variant: "onContainerTitle",
                                letterAnimation: "word",
                                animation: TextAnimations.mainTitle,
                                animationDelay: 4,
                                exitAnimation: TextAnimations.introOut,
                                exitFrame: TextAnimations.introExitFrame,
                                fontFamily:
                                  (_h = fontClasses.heading) == null
                                    ? void 0
                                    : _h.family,
                                className:
                                  "header-title scoreline-intro__headline",
                                style: { color: headerTextColor },
                                children: title,
                              },
                            ),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                      className: "scoreline-intro__crease",
                      "aria-hidden": true,
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(
                        void 0,
                        _chunkTQMZUA5Ijs.ScorelineCreaseMarkup,
                        {},
                      ),
                    }),
                  ],
                }),
              }),
            },
          ),
          /* @__PURE__ */ _jsxruntime.jsx.call(
            void 0,
            _chunkTQMZUA5Ijs.IntroPrimarySponsors,
            {
              introIn: LogoAnimations.introIn,
              introOut: LogoAnimations.introOut,
              introExitFrame: LogoAnimations.introExitFrame,
              className: "scoreline-intro__sponsors",
              itemClassName: "scoreline-intro__sponsor-slot",
            },
          ),
        ],
      }),
    }),
  });
};

// src/templates/variants/scoreline/components/ScorelineBackground.tsx

var ScorelineBackground = () => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkTQMZUA5Ijs.SelectTemplateBackground,
    {},
  );
};

// src/templates/variants/scoreline/components/ScorelineMain.tsx

// src/templates/variants/scoreline/components/ScorelineMainHeader.tsx

var ScorelineMainHeader = () => {
  var _a, _b, _c;
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
  const showOrganisationName = metadata.compositionId !== "CricketRoster";
  const eyebrow =
    metadata.title ||
    ((_c = metadata.titleSplit) == null ? void 0 : _c.join(" \xB7 ")) ||
    headerDefaults.eyebrow;
  const title = metadata.videoTitle || metadata.title || headerDefaults.title;
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "header", {
    className: "scoreline-header",
    children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
      className: "header-shell",
      children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
          className: "header-shell__main",
          children: [
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
              className: "header-identity-lockup",
              children: [
                /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
                  className: "organisation-mark",
                  "data-has-crest": hasCrest ? "true" : "false",
                  children: [
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", {
                      className: "mark-fallback",
                      "aria-hidden": true,
                    }),
                    hasCrest
                      ? /* @__PURE__ */ _jsxruntime.jsx.call(
                          void 0,
                          _remotion.Img,
                          { src: logoUrl, alt: "" },
                        )
                      : null,
                  ],
                }),
                showOrganisationName
                  ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                      className: "header-identity",
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(
                        void 0,
                        "p",
                        {
                          className: "organisation-name",
                          style: { color: headerTextColor },
                          children: club.name,
                        },
                      ),
                    })
                  : null,
              ],
            }),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
              className: "header-title-stack",
              children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", {
                  className: "header-eyebrow",
                  style: { color: headerTextColor },
                  children: eyebrow,
                }),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h1", {
                  className: "header-title",
                  style: { color: headerTextColor },
                  children: title,
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
          className: "header-shell__crease",
          "aria-hidden": true,
          children: /* @__PURE__ */ _jsxruntime.jsx.call(
            void 0,
            _chunkTQMZUA5Ijs.ScorelineCreaseMarkup,
            {},
          ),
        }),
      ],
    }),
  });
};

// src/templates/variants/scoreline/components/ScorelineMain.tsx

var ScorelineMain = () => {
  var _a;
  const { layout, componentStyles } =
    _chunkTQMZUA5Ijs.useThemeContext.call(void 0);
  const { heights } = layout;
  const { data, metadata, templateVariation } =
    _chunkTQMZUA5Ijs.useVideoDataContext.call(void 0);
  const { timings } = data;
  const canvasStyle = _chunkKCYXYBVSjs.useScorelineCanvasStyle.call(void 0);
  const canvasDataset = _chunkKCYXYBVSjs.resolveScorelineCanvasDataset.call(
    void 0,
    metadata.compositionId,
  );
  const compositionRouteHeight =
    _chunkTQMZUA5Ijs.getCompositionSectionHeight.call(void 0, heights);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _remotion.AbsoluteFill, {
    children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
      className: `scoreline-canvas ${_chunkTQMZUA5Ijs.csClass.call(void 0, componentStyles, "scorelineCanvasShell")}`,
      style: canvasStyle,
      "data-scoreline-mode": templateVariation.mode || "light",
      ...canvasDataset,
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ScorelineMainHeader, {}),
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

// src/templates/variants/scoreline/animations.ts
var scorelinePanelIn = {
  type: "revealLeft",
  easing: { type: "inOut", base: "ease" },
  duration: 14,
};
var scorelinePanelOut = {
  type: "collapseRight",
  easing: { type: "out", base: "ease" },
  duration: 12,
};
var scorelineRowIn = {
  type: "slideInLeft",
  easing: { type: "inOut", base: "ease" },
  duration: 12,
  custom: { distance: "105%" },
};
var scorelineRowOut = {
  type: "slideOutRight",
  easing: { type: "out", base: "ease" },
  duration: 10,
  custom: { distance: "105%" },
};
var scorelineIntroPanelIn = scorelinePanelIn;
var scorelineIntroPanelOut = scorelinePanelOut;
var templateAnimations = {
  ..._chunk2LHBQOJAjs.broadcastSnapAnimations,
  container: {
    intro: {
      panel: {
        containerIn: scorelineIntroPanelIn,
        containerOut: scorelineIntroPanelOut,
      },
    },
    main: {
      parent: {
        containerIn: { type: "none" },
        containerOut: { type: "none" },
      },
      itemContainer: {
        containerIn: scorelineRowIn,
        containerOut: scorelineRowOut,
      },
      itemContainerOuter: {
        containerIn: scorelinePanelIn,
        containerOut: scorelinePanelOut,
      },
      itemContainerInner: {
        containerIn: scorelineRowIn,
        containerOut: scorelineRowOut,
      },
      itemContainerSecondary: {
        containerIn: scorelineRowIn,
        containerOut: scorelineRowOut,
      },
    },
  },
  transition: {
    Main: {
      type: "slide",
      direction: "from-left",
      durationInFrames: 15,
    },
  },
};

// src/templates/variants/scoreline/index.tsx

var Scoreline = ({ data }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkTQMZUA5Ijs.BaseTemplate,
    {
      data,
      settings: scorelineTheme,
      introComponent: ScorelineIntro,
      outroComponent: _chunk2LHBQOJAjs.BroadcastProOutro,
      backgroundComponent: ScorelineBackground,
      mainComponentLayout: ScorelineMain,
      animations: templateAnimations,
    },
  );
};

exports.Scoreline = Scoreline;
//# sourceMappingURL=chunk-SDBVF5O5.js.map
