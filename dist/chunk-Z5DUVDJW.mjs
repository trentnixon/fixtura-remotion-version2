import {
  isScorelineDarkContainerMode,
  resolveScorelineCanvasDataset,
  resolveScorelineContainerCopyTokens,
  resolveScorelineHeaderDefaults,
  scorelineLayout,
  scorelineMode,
  useScorelineCanvasStyle
} from "./chunk-IWU7RYVX.mjs";
import {
  BroadcastProOutro,
  broadcastSnapAnimations
} from "./chunk-3TAW7LTF.mjs";
import {
  AnimatedImage,
  AnimatedText,
  BaseTemplate,
  IntroPrimarySponsors,
  NIGHT_SESSION_HEADER_COPY_DELAY,
  NightSessionAnimatedCopy,
  NightSessionAnimatedShell,
  ProgressTimer,
  RouteToComposition,
  SelectTemplateBackground,
  baseTheme,
  csClass,
  ensureContrast,
  getCompositionSectionHeight,
  useAnimationContext,
  useThemeContext,
  useVideoDataContext
} from "./chunk-JVWY6G7L.mjs";

// src/templates/variants/nightSession/theme/componentStyles.shared.ts
var nightSessionComponentStylesShared = {
  nightSessionCanvasShell: {
    className: "flex h-full w-full flex-col overflow-hidden"
  },
  nightSessionAnimatedShell: {
    className: "min-h-0 flex-1 overflow-hidden rounded-none"
  },
  nightSessionDisplayColumn: {
    className: "flex h-full w-full flex-col"
  },
  nightSessionResultsLedger: {
    className: "min-h-0 flex-1 overflow-hidden"
  },
  nightSessionSponsorStrip: {
    className: "relative flex min-h-0 w-full flex-1 items-center justify-evenly gap-4 px-6 py-2"
  },
  nightSessionAnimatedItem: {
    className: "rounded-none"
  }
};

// src/templates/variants/nightSession/theme/composition/results.ts
var nightSessionCompositionComponentStylesResults = {
  nightSessionResultsLedger: nightSessionComponentStylesShared.nightSessionResultsLedger,
  nightSessionResultsSponsorStrip: nightSessionComponentStylesShared.nightSessionSponsorStrip
};

// src/templates/variants/nightSession/theme/composition/resultSingle.ts
var nightSessionCompositionComponentStylesResultSingle = {
  nightSessionResultsLedger: nightSessionComponentStylesShared.nightSessionResultsLedger,
  nightSessionResultsSponsorStrip: nightSessionComponentStylesShared.nightSessionSponsorStrip
};

// src/templates/variants/nightSession/theme/composition/upcoming.ts
var nightSessionCompositionComponentStylesUpcoming = {
  nightSessionUpcomingLedger: nightSessionComponentStylesShared.nightSessionResultsLedger,
  nightSessionUpcomingSponsorStrip: nightSessionComponentStylesShared.nightSessionSponsorStrip
};

// src/templates/variants/nightSession/theme/composition/ladder.ts
var nightSessionCompositionComponentStylesLadder = {
  nightSessionLadderLedger: nightSessionComponentStylesShared.nightSessionResultsLedger,
  nightSessionLadderSponsorStrip: nightSessionComponentStylesShared.nightSessionSponsorStrip
};

// src/templates/variants/nightSession/theme/composition/top5.ts
var nightSessionCompositionComponentStylesTop5 = {
  nightSessionTop5Ledger: nightSessionComponentStylesShared.nightSessionResultsLedger,
  nightSessionTop5SponsorStrip: nightSessionComponentStylesShared.nightSessionSponsorStrip
};

// src/templates/variants/nightSession/theme/composition/roster.ts
var nightSessionCompositionComponentStylesRoster = {
  nightSessionRosterLedger: {
    className: "flex h-full w-full min-h-0 flex-col overflow-hidden"
  },
  nightSessionRosterSponsorStrip: nightSessionComponentStylesShared.nightSessionSponsorStrip
};

// src/templates/variants/nightSession/theme/composition/teamOfTheWeek.ts
var nightSessionCompositionComponentStylesTeamOfTheWeek = {
  nightSessionTotwLedger: {
    className: "flex h-full w-full min-h-0 flex-col overflow-hidden"
  },
  nightSessionTotwSponsorStrip: nightSessionComponentStylesShared.nightSessionSponsorStrip
};

// src/templates/variants/nightSession/theme/composition/performances.ts
var nightSessionCompositionComponentStylesPerformances = {
  nightSessionPerformancesLedger: nightSessionCompositionComponentStylesTop5.nightSessionTop5Ledger,
  nightSessionPerformancesSponsorStrip: nightSessionCompositionComponentStylesTop5.nightSessionTop5SponsorStrip
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
  ...nightSessionCompositionComponentStylesPerformances
};

// src/templates/variants/nightSession/theme/tokens.ts
var nightSessionTokens = {
  fonts: {
    title: {
      family: "Teko"
    },
    subtitle: {
      family: "Source Sans 3"
    },
    copy: {
      family: "Source Sans 3"
    }
  },
  fontClasses: {
    heading: { family: "Teko" },
    subheading: { family: "Source Sans 3" },
    body: { family: "Source Sans 3" }
  }
};

// src/templates/variants/nightSession/theme/index.ts
var nightSessionTheme = {
  ...baseTheme,
  ...nightSessionTokens,
  layout: scorelineLayout,
  mode: scorelineMode,
  componentStyles: {
    ...baseTheme.componentStyles,
    ...nightSessionComponentStylesShared,
    ...nightSessionCompositionComponentStyles
  }
};

// src/templates/variants/nightSession/components/NightSessionIntro.tsx
import { AbsoluteFill } from "remotion";

// src/compositions/cricket/utils/nightSession/nightSessionCanvasStyle.ts
import { useMemo } from "react";

// src/compositions/cricket/utils/nightSession/resolveNightSessionOverlayTokens.ts
var resolveNightSessionBandTokens = (selectedPalette) => {
  const containerCopy = resolveScorelineContainerCopyTokens(selectedPalette);
  const isDark = isScorelineDarkContainerMode(selectedPalette);
  const accent = selectedPalette.text.onContainer.accent || selectedPalette.text.onContainer.title;
  const rankBoxSolid = "#ffffff";
  const rosterIndexPanelSolid = containerCopy.surfaceSolid;
  const teamScoreContainerBg = isDark ? "linear-gradient(180deg, rgb(22 25 29) 0%, rgb(10 12 14) 100%)" : "linear-gradient(180deg, rgb(243 240 234) 0%, rgb(255 255 255) 100%)";
  return {
    "--ns-team-score-container-bg": teamScoreContainerBg,
    "--ns-team-score-container-opacity": "0.85",
    "--ns-band-bg": teamScoreContainerBg,
    "--ns-band-border": isDark ? "rgb(255 255 255 / 7%)" : "rgb(8 11 13 / 10%)",
    "--ns-band-score": isDark ? "#ffffff" : containerCopy.text,
    "--ns-band-team": isDark ? "rgb(255 255 255 / 92%)" : containerCopy.text,
    "--ns-band-meta": isDark ? "rgb(244 243 241 / 58%)" : containerCopy.textMuted,
    "--ns-outcome-bg": isDark ? "rgb(10 12 14 / 92%)" : `color-mix(in srgb, ${containerCopy.surfaceSolid} 92%, transparent)`,
    "--ns-outcome-text": containerCopy.text,
    "--ns-schedule-lockup-bg": isDark ? "rgb(10 12 14 / 95%)" : "rgb(255 255 255 / 95%)",
    "--ns-performance-row-bg": isDark ? "rgb(10 12 14 / 65%)" : "rgb(243 240 234 / 35%)",
    "--ns-performance-border": isDark ? "rgb(255 255 255 / 10%)" : "rgb(8 11 13 / 12%)",
    "--ns-performance-row-rule": isDark ? "rgb(255 255 255 / 7%)" : "rgb(8 11 13 / 8%)",
    "--ns-performance-player": containerCopy.text,
    "--ns-performance-figure": containerCopy.text,
    "--ns-leader-rank-bg": "rgb(255 255 255 / 95%)",
    "--ns-leader-rank-text": ensureContrast(rankBoxSolid, accent),
    "--ns-roster-index-text": ensureContrast(rosterIndexPanelSolid, accent),
    "--ns-grade-rail-gradient-mid": `color-mix(in srgb, ${accent} 10%, transparent)`,
    "--ns-grade-rail-gradient-end": `color-mix(in srgb, ${accent} 32%, transparent)`
  };
};

// src/compositions/cricket/utils/nightSession/nightSessionCanvasStyle.ts
var useNightSessionCanvasStyle = () => {
  const scorelineStyle = useScorelineCanvasStyle();
  const { selectedPalette } = useThemeContext();
  const bandTokens = useMemo(
    () => resolveNightSessionBandTokens(selectedPalette),
    [selectedPalette]
  );
  return useMemo(
    () => ({
      ...scorelineStyle,
      ...bandTokens,
      "--font-display": "Teko, sans-serif",
      "--font-body": '"Source Sans 3", Arial, sans-serif'
    }),
    [bandTokens, scorelineStyle]
  );
};

// src/templates/variants/nightSession/components/NightSessionIntro.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var NightSessionIntro = () => {
  var _a, _b, _c, _d, _e;
  const { club, metadata, templateVariation } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const introExitFrame = TextAnimations.introExitFrame;
  const { fontClasses, componentStyles } = useThemeContext();
  const canvasStyle = useNightSessionCanvasStyle();
  const headerDefaults = resolveScorelineHeaderDefaults(metadata.compositionId);
  const eyebrow = metadata.title || ((_a = metadata.titleSplit) == null ? void 0 : _a.join(" \xB7 ")) || headerDefaults.eyebrow;
  const title = metadata.videoTitle || metadata.title || headerDefaults.title;
  const logoUrl = (_c = (_b = club.logo) == null ? void 0 : _b.url) != null ? _c : "";
  const hasCrest = Boolean(logoUrl);
  return /* @__PURE__ */ jsx(AbsoluteFill, { children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `night-session-canvas night-session-intro ${csClass(componentStyles, "nightSessionCanvasShell")}`,
      style: canvasStyle,
      "data-night-session-mode": templateVariation.mode || "light",
      children: /* @__PURE__ */ jsxs("div", { className: "night-session-intro__frame", children: [
        /* @__PURE__ */ jsx("div", { className: "night-session-intro__main", children: /* @__PURE__ */ jsx(
          NightSessionAnimatedShell,
          {
            className: `night-session-intro__animated ${csClass(componentStyles, "nightSessionAnimatedShell")}`,
            exitFrame: introExitFrame,
            children: /* @__PURE__ */ jsx("div", { className: "night-session-intro__panel", children: /* @__PURE__ */ jsxs("header", { className: "ns-header", children: [
              /* @__PURE__ */ jsxs("div", { className: "ns-header__accent", "aria-hidden": true, children: [
                /* @__PURE__ */ jsx("span", { className: "ns-accent-wedge" }),
                /* @__PURE__ */ jsx("span", { className: "ns-accent-lines" })
              ] }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "organisation-mark ns-header__mark",
                  "data-has-crest": hasCrest ? "true" : "false",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "mark-fallback", "aria-hidden": true }),
                    hasCrest ? /* @__PURE__ */ jsx(
                      AnimatedImage,
                      {
                        src: logoUrl,
                        alt: "",
                        width: "auto",
                        height: "auto",
                        fit: "contain",
                        animation: LogoAnimations.introIn,
                        exitAnimation: LogoAnimations.introOut,
                        exitFrame: LogoAnimations.introExitFrame
                      }
                    ) : null
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "ns-header__lockup", children: [
                /* @__PURE__ */ jsx(
                  AnimatedText,
                  {
                    textAlign: "center",
                    type: "label",
                    variant: "onContainerCopy",
                    letterAnimation: "word",
                    animation: TextAnimations.mainTitle,
                    animationDelay: NIGHT_SESSION_HEADER_COPY_DELAY,
                    exitAnimation: TextAnimations.introOut,
                    exitFrame: TextAnimations.introExitFrame,
                    fontFamily: (_d = fontClasses.heading) == null ? void 0 : _d.family,
                    className: "header-eyebrow",
                    children: eyebrow
                  }
                ),
                /* @__PURE__ */ jsx(
                  AnimatedText,
                  {
                    textAlign: "center",
                    type: "title",
                    variant: "onContainerCopy",
                    letterAnimation: "word",
                    animation: TextAnimations.mainTitle,
                    animationDelay: NIGHT_SESSION_HEADER_COPY_DELAY + 4,
                    exitAnimation: TextAnimations.introOut,
                    exitFrame: TextAnimations.introExitFrame,
                    fontFamily: (_e = fontClasses.heading) == null ? void 0 : _e.family,
                    className: "header-title",
                    children: title
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "sr-only", children: club.name })
            ] }) })
          }
        ) }),
        /* @__PURE__ */ jsx(
          IntroPrimarySponsors,
          {
            introIn: LogoAnimations.introIn,
            introOut: LogoAnimations.introOut,
            introExitFrame: LogoAnimations.introExitFrame,
            className: "night-session-intro__sponsors",
            itemClassName: "night-session-intro__sponsor-slot"
          }
        )
      ] })
    }
  ) });
};

// src/templates/variants/nightSession/components/NightSessionBackground.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var NightSessionBackground = () => {
  return /* @__PURE__ */ jsx2(SelectTemplateBackground, {});
};

// src/templates/variants/nightSession/components/NightSessionMain.tsx
import { AbsoluteFill as AbsoluteFill2 } from "remotion";

// src/templates/variants/nightSession/components/NightSessionMainHeader.tsx
import { Img } from "remotion";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var NightSessionMainHeader = () => {
  var _a, _b;
  const { selectedPalette } = useThemeContext();
  const { club, metadata } = useVideoDataContext();
  const headerTextColor = selectedPalette.text.onContainer.title;
  const logoUrl = (_b = (_a = club.logo) == null ? void 0 : _a.url) != null ? _b : "";
  const hasCrest = Boolean(logoUrl);
  const headerDefaults = resolveScorelineHeaderDefaults(metadata.compositionId);
  const title = metadata.videoTitle || metadata.title || headerDefaults.title;
  return /* @__PURE__ */ jsxs2("header", { className: "ns-header", children: [
    /* @__PURE__ */ jsx3("div", { className: "ns-header__accent", "aria-hidden": true, children: /* @__PURE__ */ jsx3("span", { className: "ns-accent-lines" }) }),
    /* @__PURE__ */ jsxs2("div", { className: "ns-header__row gap-8", children: [
      /* @__PURE__ */ jsxs2(
        "div",
        {
          className: "organisation-mark ns-header__mark",
          "data-has-crest": hasCrest ? "true" : "false",
          children: [
            /* @__PURE__ */ jsx3("span", { className: "mark-fallback", "aria-hidden": true }),
            hasCrest ? /* @__PURE__ */ jsx3(Img, { src: logoUrl, alt: "" }) : null
          ]
        }
      ),
      /* @__PURE__ */ jsx3(
        NightSessionAnimatedCopy,
        {
          className: "ns-header__lockup",
          animationDelay: NIGHT_SESSION_HEADER_COPY_DELAY,
          children: /* @__PURE__ */ jsx3("h1", { className: "header-title", style: { color: headerTextColor }, children: title })
        }
      )
    ] }),
    /* @__PURE__ */ jsx3("div", { className: "ns-header__wedge", "aria-hidden": true, children: /* @__PURE__ */ jsx3("span", { className: "ns-accent-wedge" }) }),
    /* @__PURE__ */ jsx3("p", { className: "sr-only", children: club.name })
  ] });
};

// src/templates/variants/nightSession/components/NightSessionMain.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var NightSessionMain = () => {
  var _a;
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const { data, metadata, templateVariation } = useVideoDataContext();
  const { timings } = data;
  const canvasStyle = useNightSessionCanvasStyle();
  const canvasDataset = resolveScorelineCanvasDataset(
    metadata.compositionId
  );
  const compositionRouteHeight = getCompositionSectionHeight(heights);
  return /* @__PURE__ */ jsx4(AbsoluteFill2, { children: /* @__PURE__ */ jsxs3(
    "div",
    {
      className: `night-session-canvas template-canvas ${csClass(componentStyles, "nightSessionCanvasShell")}`,
      style: canvasStyle,
      "data-night-session-mode": templateVariation.mode || "light",
      ...canvasDataset,
      children: [
        /* @__PURE__ */ jsx4(NightSessionMainHeader, {}),
        /* @__PURE__ */ jsx4(
          "div",
          {
            className: "relative min-h-0",
            style: {
              height: `${compositionRouteHeight}px`,
              maxHeight: `${compositionRouteHeight}px`
            },
            children: RouteToComposition()
          }
        ),
        /* @__PURE__ */ jsx4(ProgressTimer, { FRAMES: (_a = timings == null ? void 0 : timings.FPS_MAIN) != null ? _a : 0 })
      ]
    }
  ) });
};

// src/templates/variants/nightSession/animations.ts
var nightSessionPanelIn = {
  type: "revealTop",
  easing: { type: "inOut", base: "ease" },
  duration: 14
};
var nightSessionPanelOut = {
  type: "collapseBottom",
  easing: { type: "out", base: "ease" },
  duration: 12
};
var nightSessionRowIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 12,
  custom: { distance: "55%" }
};
var nightSessionRowOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 10,
  custom: { distance: "55%" }
};
var nightSessionCopyIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 13,
  custom: { distance: "30%" }
};
var nightSessionCopyOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 9,
  custom: { distance: "30%" }
};
var nightSessionStatsCopyIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 13,
  custom: { distance: "24%" }
};
var nightSessionStatsCopyOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 9,
  custom: { distance: "24%" }
};
var nightSessionIntroCopyIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 14,
  delay: 8,
  custom: { distance: 40 }
};
var nightSessionIntroCopyOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 10,
  custom: { distance: 36 }
};
var nightSessionIntroPanelIn = nightSessionPanelIn;
var nightSessionIntroPanelOut = nightSessionPanelOut;
var templateAnimations = {
  ...broadcastSnapAnimations,
  text: {
    ...broadcastSnapAnimations.text,
    intro: {
      ...broadcastSnapAnimations.text.intro,
      mainTitle: nightSessionIntroCopyIn,
      clubName: {
        ...nightSessionIntroCopyIn,
        delay: 5
      },
      introOut: nightSessionIntroCopyOut
    }
  },
  container: {
    intro: {
      panel: {
        containerIn: nightSessionIntroPanelIn,
        containerOut: nightSessionIntroPanelOut
      }
    },
    main: {
      parent: {
        containerIn: { type: "none" },
        containerOut: { type: "none" }
      },
      itemContainer: {
        containerIn: nightSessionRowIn,
        containerOut: nightSessionRowOut
      },
      itemContainerOuter: {
        containerIn: nightSessionPanelIn,
        containerOut: nightSessionPanelOut
      },
      itemContainerInner: {
        containerIn: nightSessionCopyIn,
        containerOut: nightSessionCopyOut
      },
      itemContainerSecondary: {
        containerIn: nightSessionStatsCopyIn,
        containerOut: nightSessionStatsCopyOut
      }
    }
  },
  transition: {
    Main: {
      type: "slide",
      direction: "from-top",
      durationInFrames: 15
    }
  }
};
var nightSessionAnimations = templateAnimations;

// src/templates/variants/nightSession/index.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var NightSession = ({ data }) => {
  return /* @__PURE__ */ jsx5(
    BaseTemplate,
    {
      data,
      settings: nightSessionTheme,
      introComponent: NightSessionIntro,
      outroComponent: BroadcastProOutro,
      backgroundComponent: NightSessionBackground,
      mainComponentLayout: NightSessionMain,
      animations: nightSessionAnimations
    }
  );
};

export {
  NightSession
};
//# sourceMappingURL=chunk-Z5DUVDJW.mjs.map