"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var _chunkO26MLT2Zjs = require("./chunk-O26MLT2Z.js");

var _chunkIFK37YAGjs = require("./chunk-IFK37YAG.js");

var _chunkTQMZUA5Ijs = require("./chunk-TQMZUA5I.js");

var _chunk5OPIAWHPjs = require("./chunk-5OPIAWHP.js");

// src/templates/variants/brickwork/theme.ts
var brickworkTheme = {
  ..._chunkTQMZUA5Ijs.baseTheme,
  // ===== FONT CONFIGURATION =====
  fonts: {
    title: {
      family: _chunkTQMZUA5Ijs.BRICKWORK_FONT_DISPLAY,
    },
    subtitle: {
      family: _chunkTQMZUA5Ijs.BRICKWORK_FONT_COPY,
    },
    copy: {
      family: _chunkTQMZUA5Ijs.BRICKWORK_FONT_COPY,
    },
    additional: [..._chunkTQMZUA5Ijs.BRICKWORK_COPY_FONT_WEIGHTS],
  },
  fontClasses: {
    heading: { family: _chunkTQMZUA5Ijs.BRICKWORK_FONT_DISPLAY },
    subheading: { family: _chunkTQMZUA5Ijs.BRICKWORK_FONT_COPY },
    body: { family: _chunkTQMZUA5Ijs.BRICKWORK_FONT_COPY },
    display: { family: _chunkTQMZUA5Ijs.BRICKWORK_FONT_DISPLAY },
    stat: { family: _chunkTQMZUA5Ijs.BRICKWORK_FONT_DISPLAY },
    copy: { family: _chunkTQMZUA5Ijs.BRICKWORK_FONT_COPY },
    compositionName: { family: _chunkTQMZUA5Ijs.BRICKWORK_FONT_DISPLAY },
  },
  // ===== COMPONENT STYLES =====
  // Ready-to-use style objects for components
  componentStyles: {
    // Title component styles
    title: {
      className:
        "text-9xl font-normal tracking-normal leading-[0.95em] text-center m-0 px-4 uppercase",
    },
    // Subtitle component styles — club / metadata copy
    subtitle: {
      className:
        "text-5xl font-normal tracking-normal leading-[0.98em] text-center m-0 px-4",
    },
    compositionName: {
      className:
        "text-7xl font-normal capitalize tracking-wider leading-[0.98em] uppercase",
    },
    compositionNameSmall: {
      className:
        "text-4xl font-medium capitalize tracking-wider leading-[0.98em]",
    },
    // Body text component styles
    bodyText: {
      className: "text-xl font-normal tracking-normal leading-relaxed",
    },
    // Player name component styles
    playerName: {
      className: "text-3xl font-medium tracking-tight leading-tight",
    },
    // Score component styles
    score: {
      className:
        "text-6xl font-normal tracking-tight leading-tight tabular-nums",
    },
    // Team name component styles
    teamName: {
      className: "text-4xl font-medium tracking-tight leading-tight",
    },
    // Label component styles
    label: {
      className:
        "text-lg font-normal tracking-normal leading-snug uppercase tabular-nums",
    },
    // Ladder label component styles
    ladderGradeLabel: {
      className:
        "text-2xl font-normal tracking-normal leading-snug uppercase tabular-nums",
    },
    ladderTeamName: {
      className: "text-3xl font-normal tracking-normal leading-snug",
    },
    ladderTeamPoints: {
      className:
        "text-3xl font-normal tracking-normal leading-snug tabular-nums",
    },
    Top5PlayerName: {
      className: "text-4xl font-bold tracking-wide leading-snug uppercase",
    },
    Top5PlayerTeam: {
      className: "text-2xl font-normal tracking-wider leading-tight",
    },
    Top5PlayerScore: {
      className:
        "text-6xl font-normal tracking-normal leading-snug mr-1 tabular-nums",
    },
    Top5PlayerScoreSuffix: {
      className: "text-2xl font-normal tracking-wide leading-none",
    },
    ResultScore: {
      className:
        "text-6xl font-normal tracking-normal leading-none tabular-nums",
    },
    ResultScoreFirstInnings: {
      className:
        "text-2xl font-normal tracking-normal leading-none tabular-nums",
    },
    ResultVS: {
      className: "text-3xl font-normal tracking-normal leading-tight ",
    },
    ResultScoreYetToBat: {
      className: "text-3xl font-medium tracking-wider py-6",
    },
    ResultTeamName: {
      className: "text-2xl font-normal tracking-wider leading-snug",
    },
    ResultPlayerName: {
      className: "text-3xl font-normal tracking-normal leading-snug",
    },
    ResultPlayerScore: {
      className:
        "text-2xl font-medium tracking-normal leading-snug tabular-nums",
    },
    ResultSyntax: {
      className: "text-2xl font-medium tracking-wider leading-snug py-4 ml-4",
    },
    ResultFixtureResult: {
      className:
        "text-4xl font-normal text-center tracking-wider leading-snug italic",
    },
    ResultMetaData: {
      className: "text-2xl font-normal tracking-wider leading-snug",
    },
    ResultStatementShort: {
      className: "text-3xl font-medium tracking-wider leading-snug py-2 px-16",
    },
    ResultStatementText: {
      className: "text-3xl font-medium tracking-wider leading-snug ",
    },
    RosterPlayerName: {
      className: "text-3xl font-normal tracking-wider leading-snug",
    },
    metadataSmall: {
      className: "text-2xl font-normal tracking-wider leading-snug",
    },
    metadataMedium: {
      className: "text-2xl font-medium tracking-wider leading-snug",
    },
    metadataLarge: {
      className: "text-2xl font-medium tracking-widest leading-snug",
    },
    titleSmall: {
      className: "text-2xl font-medium tracking-normal leading-snug",
    },
    TeamOfTheWeekPlayerName: {
      className: "text-3xl font-bold tracking-wide leading-snug uppercase",
    },
    TeamOfTheWeekTeam: {
      className: "text-2xl font-normal tracking-wider leading-tight",
    },
    TeamOfTheWeekType: {
      className: "text-md font-normal uppercase tracking-wider leading-none",
    },
    TeamOfTheWeekStat: {
      className:
        "text-5xl font-normal tracking-tight leading-tight tabular-nums",
    },
  },
  // ===== LAYOUT CONFIGURATION =====
  layout: {
    heights: {
      asset: 1010,
      header: 190,
      footer: 150,
    },
    spacing: {
      section: "space-y-8",
      item: "space-y-4",
    },
    padding: {
      container: "p-8",
      section: "py-6",
      item: "py-2",
    },
    borderRadius: {
      container: "rounded-none",
    },
  },
  mode: {
    light: {
      container: {
        background: "#fff",
        backgroundAlt: "#f0f0f0",
        backgroundTransparent: "rgba(255, 255, 255, 0.5)",
      },
      text: {
        title: "#000",
        copy: "#000",
      },
    },
    lightAlt: {
      container: {
        background: "#fff",
        backgroundAlt: "#f0f0f0",
        backgroundTransparent: "rgba(255, 255, 255, 0.5)",
      },
      text: {
        title: "#fff",
        copy: "#000",
      },
    },
    dark: {
      container: {
        background: "#000",
        backgroundAlt: "#1a1a1a",
        backgroundTransparent: "rgba(0, 0, 0, 0.5)",
      },
      text: {
        title: "#fff",
        copy: "#fff",
      },
    },
    darkAlt: {
      container: {
        background: "#000",
        backgroundAlt: "#1a1a1a",
        backgroundTransparent: "rgba(0, 0, 0, 0.5)",
      },
      text: {
        title: "#000",
        copy: "#fff",
      },
    },
  },
};

// src/templates/variants/brickwork/utils/useFitTitleFontSize.ts
var _react = require("react");
var SAFETY_MARGIN = 0.95;
var MIN_FONT_SIZE_PX = 24;
function useFitTitleFontSize(text, enabled = true) {
  const [fontSizeStyle, setFontSizeStyle] = _react.useState.call(void 0, null);
  const containerRef = _react.useRef.call(void 0, null);
  const textRef = _react.useRef.call(void 0, null);
  const setContainerRef = _react.useCallback.call(
    void 0,
    (el) => {
      containerRef.current = el;
    },
    [],
  );
  const setTextRef = _react.useCallback.call(
    void 0,
    (el) => {
      textRef.current = el;
    },
    [],
  );
  _react.useLayoutEffect.call(
    void 0,
    () => {
      if (!enabled || !containerRef.current || !textRef.current || !text)
        return;
      const container = containerRef.current;
      const textEl = textRef.current;
      const containerWidth = container.clientWidth;
      const textWidth = textEl.scrollWidth;
      if (containerWidth <= 0 || textWidth <= 0) return;
      if (textWidth <= containerWidth) return;
      const styledEl = textEl.firstElementChild || textEl;
      const computedStyle = window.getComputedStyle(styledEl);
      const currentFontSize = parseFloat(computedStyle.fontSize);
      if (Number.isNaN(currentFontSize)) return;
      const scale = (containerWidth / textWidth) * SAFETY_MARGIN;
      const newFontSizePx = Math.max(MIN_FONT_SIZE_PX, currentFontSize * scale);
      setFontSizeStyle(`${newFontSizePx}px`);
    },
    [text, enabled],
  );
  return {
    containerRef: setContainerRef,
    textRef: setTextRef,
    fontSizeStyle: fontSizeStyle ? { fontSize: fontSizeStyle } : void 0,
  };
}

// src/templates/variants/brickwork/components/brickworkIntro.tsx
var _jsxruntime = require("react/jsx-runtime");
var BrickworkIntro = () => {
  var _a, _b, _c, _d, _e, _f;
  const { club, metadata } = _chunkTQMZUA5Ijs.useVideoDataContext.call(void 0);
  const { animations } = _chunkTQMZUA5Ijs.useAnimationContext.call(void 0);
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = _chunkTQMZUA5Ijs.useThemeContext.call(void 0);
  const { displayFont, copyFont } =
    _chunkTQMZUA5Ijs.useBrickworkTypography.call(void 0);
  const title = (_a = metadata.title) != null ? _a : "";
  const { containerRef, textRef, fontSizeStyle } = useFitTitleFontSize(title);
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkIFK37YAGjs.VerticalStackLogoTitleName,
    {
      alignment: "end",
      Logo: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
        className:
          "w-full h-full flex justify-center items-center max-h-[300px] max-w-[300px]",
        children: /* @__PURE__ */ _jsxruntime.jsx.call(
          void 0,
          _chunkTQMZUA5Ijs.AnimatedImage,
          {
            src: ((_b = club.logo) == null ? void 0 : _b.url) || "",
            alt: club.name,
            width: "auto",
            height: "auto",
            fit: "contain",
            animation: LogoAnimations.introIn,
            exitAnimation: LogoAnimations.introOut,
            exitFrame: LogoAnimations.introExitFrame,
          },
        ),
      }),
      Title: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
        ref: containerRef,
        className: "overflow-hidden mb-4 w-full",
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
          ref: textRef,
          children: /* @__PURE__ */ _jsxruntime.jsx.call(
            void 0,
            _chunkTQMZUA5Ijs.AnimatedText,
            {
              textAlign: "center",
              type: "title",
              variant: "onContainerTitle",
              letterAnimation: "none",
              animation: TextAnimations.mainTitle,
              exitAnimation: TextAnimations.introOut,
              exitFrame: TextAnimations.introExitFrame,
              fontFamily:
                (_d =
                  (_c = fontClasses.heading) == null ? void 0 : _c.family) !=
                null
                  ? _d
                  : displayFont,
              className: _chunkTQMZUA5Ijs.BRICKWORK_TITLE_BASE_CLASS,
              style: fontSizeStyle,
              children: title,
            },
          ),
        }),
      }),
      Name: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
        className: "overflow-hidden",
        children: /* @__PURE__ */ _jsxruntime.jsx.call(
          void 0,
          _chunkTQMZUA5Ijs.AnimatedText,
          {
            type: "subtitle",
            textAlign: "center",
            variant: "onContainerTitle",
            letterAnimation: "none",
            animation: TextAnimations.clubName,
            exitAnimation: TextAnimations.introOut,
            exitFrame: TextAnimations.introExitFrame,
            fontFamily:
              (_f =
                (_e = fontClasses.subheading) == null ? void 0 : _e.family) !=
              null
                ? _f
                : copyFont,
            children: club.name,
          },
        ),
      }),
      PrimarySponsor: /* @__PURE__ */ _jsxruntime.jsx.call(
        void 0,
        _chunkTQMZUA5Ijs.IntroPrimarySponsors,
        {
          introIn: LogoAnimations.introIn,
          introOut: LogoAnimations.introOut,
          introExitFrame: LogoAnimations.introExitFrame,
        },
      ),
    },
  );
};

// src/templates/variants/brickwork/components/brickworkOutro.tsx
var _remotion = require("remotion");

var GRID_SETTINGS = {
  columns: 2,
  rows: 3,
  gap: "0.25rem",
  containerMaxWidth: 1600,
  containerMaxHeight: 900,
  cellMaxSize: 600,
  cellPadding: 16,
  cellAspectRatio: "1 / 1",
  chunkSize: _chunk5OPIAWHPjs.OUTRO_SPONSOR_PAGE_SIZE,
  sequenceDurationInFrames: _chunk5OPIAWHPjs.OUTRO_PAGE_DURATION_FRAMES,
  logoExitFrame: _chunk5OPIAWHPjs.OUTRO_PAGE_LOGO_EXIT_FRAME,
  logoDelayIncrement: _chunk5OPIAWHPjs.OUTRO_PAGE_LOGO_STAGGER_FRAMES,
};
var SponsorGrid = ({ sponsors, LogoAnimations }) =>
  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
    className: "grid justify-center items-center w-full h-full",
    style: {
      gridTemplateColumns: `repeat(${GRID_SETTINGS.columns}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${GRID_SETTINGS.rows}, minmax(0, 1fr))`,
      gap: GRID_SETTINGS.gap,
      maxWidth: GRID_SETTINGS.containerMaxWidth,
      maxHeight: GRID_SETTINGS.containerMaxHeight,
      gridAutoRows: "1fr",
    },
    children: sponsors
      .filter((sponsor) => sponsor.logo && sponsor.logo.url)
      .map((sponsor, idx) => {
        var _a;
        return /* @__PURE__ */ _jsxruntime.jsx.call(
          void 0,
          "div",
          {
            className: "flex items-center justify-center w-full h-full",
            style: {
              aspectRatio: GRID_SETTINGS.cellAspectRatio,
              maxWidth: GRID_SETTINGS.cellMaxSize,
              maxHeight: GRID_SETTINGS.cellMaxSize,
              padding: GRID_SETTINGS.cellPadding,
            },
            children: /* @__PURE__ */ _jsxruntime.jsx.call(
              void 0,
              _chunkTQMZUA5Ijs.AnimatedImage,
              {
                src: sponsor.logo.url,
                alt: sponsor.name || "",
                width: "100%",
                height: "100%",
                fit: "contain",
                animation: LogoAnimations.introIn,
                exitAnimation:
                  (_a = LogoAnimations.exitAnimation) != null
                    ? _a
                    : LogoAnimations.introOut,
                animationDelay: idx * GRID_SETTINGS.logoDelayIncrement,
                exitFrame: GRID_SETTINGS.logoExitFrame,
              },
            ),
          },
          `${sponsor.id}_${idx}`,
        );
      }),
  });
var BrickworkOutro = ({ doesAccountHaveSponsors }) => {
  var _a, _b;
  const { sponsors } = _chunkTQMZUA5Ijs.useVideoDataContext.call(void 0);
  const { animations } = _chunkTQMZUA5Ijs.useAnimationContext.call(void 0);
  const LogoAnimations = animations.image.sponsor.logo;
  if (!doesAccountHaveSponsors) {
    return null;
  }
  const sponsorsArray = _chunk5OPIAWHPjs.buildOutroSponsorSequence.call(
    void 0,
    {
      primary:
        (_a = sponsors == null ? void 0 : sponsors.primary) != null ? _a : [],
      general:
        (_b = sponsors == null ? void 0 : sponsors.general) != null ? _b : [],
    },
  );
  const groups = _chunk5OPIAWHPjs.chunkSponsors.call(
    void 0,
    sponsorsArray,
    GRID_SETTINGS.chunkSize,
  );
  const sequences = groups.map((group) => ({
    content: /* @__PURE__ */ _jsxruntime.jsx.call(
      void 0,
      _remotion.AbsoluteFill,
      {
        className: "flex flex-col justify-center items-center",
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, SponsorGrid, {
          sponsors: group,
          LogoAnimations,
        }),
      },
    ),
    durationInFrames: GRID_SETTINGS.sequenceDurationInFrames,
  }));
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkTQMZUA5Ijs.TransitionSeriesWrapper,
    {
      sequences,
      transitionType: "none",
      timing: { type: "linear", durationInFrames: 1 },
    },
  );
};

// src/templates/variants/brickwork/components/brickworkBackground.tsx

var BrickworkBackground = () => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkTQMZUA5Ijs.SelectTemplateBackground,
    {},
  );
};

// src/templates/variants/brickwork/components/brickworkMainHeader.tsx

var BrickworkMainHeader = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { layout, fontClasses } = _chunkTQMZUA5Ijs.useThemeContext.call(void 0);
  const { displayFont, copyFont } =
    _chunkTQMZUA5Ijs.useBrickworkTypography.call(void 0);
  const { club, metadata, data } =
    _chunkTQMZUA5Ijs.useVideoDataContext.call(void 0);
  const { animations } = _chunkTQMZUA5Ijs.useAnimationContext.call(void 0);
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;
  const { heights } = layout;
  const { timings } = data;
  const title = (_a = metadata.title) != null ? _a : "";
  const { containerRef, textRef, fontSizeStyle } = useFitTitleFontSize(
    title,
    Boolean(title),
  );
  const exitFrame = _chunkTQMZUA5Ijs.calculateMainHeaderExitFrame.call(
    void 0,
    timings,
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
    className: "w-full p-0 justify-center flex items-center",
    style: { height: `${heights.header}px` },
    children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
      className: "flex justify-center items-center w-full p-2 gap-8",
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
          className: "flex shrink-0 justify-center items-center",
          children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
            className:
              "flex justify-center items-center rounded-none max-h-[120px] max-w-[150px]",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(
              void 0,
              _chunkTQMZUA5Ijs.AnimatedImage,
              {
                src: (_b = club.logo) == null ? void 0 : _b.url,
                width: "auto",
                height: "auto",
                fit: "contain",
                className: "rounded-none",
                animation: LogoAnimations.introIn,
                exitAnimation: LogoAnimations.introOut,
                exitFrame,
              },
            ),
          }),
        }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
          className: "flex min-w-0 flex-col justify-center items-start",
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
              ref: containerRef,
              className: "w-full overflow-hidden",
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                ref: textRef,
                children: /* @__PURE__ */ _jsxruntime.jsx.call(
                  void 0,
                  _chunkTQMZUA5Ijs.AnimatedText,
                  {
                    textAlign: "left",
                    type: "compositionName",
                    variant: "onContainerTitle",
                    letterAnimation: "none",
                    animation: TextAnimations.title,
                    exitAnimation: TextAnimations.copyOut,
                    exitFrame,
                    fontFamily:
                      (_f =
                        (_e =
                          (_c = fontClasses.compositionName) == null
                            ? void 0
                            : _c.family) != null
                          ? _e
                          : (_d = fontClasses.heading) == null
                            ? void 0
                            : _d.family) != null
                        ? _f
                        : displayFont,
                    className:
                      _chunkTQMZUA5Ijs.BRICKWORK_HEADER_TITLE_BASE_CLASS,
                    style: fontSizeStyle,
                    children: title,
                  },
                ),
              }),
            }),
            /* @__PURE__ */ _jsxruntime.jsx.call(
              void 0,
              _chunkTQMZUA5Ijs.AnimatedText,
              {
                fontFamily:
                  (_h =
                    (_g = fontClasses.subheading) == null
                      ? void 0
                      : _g.family) != null
                    ? _h
                    : copyFont,
                type: "compositionNameSmall",
                textAlign: "left",
                variant: "onContainerTitle",
                letterAnimation: "word",
                animation: TextAnimations.title,
                exitAnimation: TextAnimations.copyOut,
                exitFrame,
                children: club.name,
              },
            ),
          ],
        }),
      ],
    }),
  });
};

// src/templates/variants/brickwork/components/brickworkMain.tsx

var BrickworkMain = () => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkTQMZUA5Ijs.BrickworkAssetAtmosphere,
    {
      className: "h-full w-full",
      children: /* @__PURE__ */ _jsxruntime.jsx.call(
        void 0,
        _chunkO26MLT2Zjs.OneColumn,
        { Header: BrickworkMainHeader },
      ),
    },
  );
};

// src/templates/variants/brickwork/animations.ts
var templateAnimations = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "slideInLeft",
          //slideInLeft
          duration: 15,
          delay: 15,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 500 },
        },
        introOut: {
          type: "slideOutRight",
          duration: 10,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 500 },
        },
        introExitFrame: 75,
      },
    },
    main: {
      title: {
        logo: {
          introIn: {
            type: "slideInTop",
            duration: 30,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 100 },
          },
          introOut: {
            type: "slideOutTop",
            duration: 15,
            easing: { type: "inOut", base: "ease" },
          },
        },
      },
      item: {
        logo: {
          itemIn: {
            type: "slideInRight",
            duration: 30,
            delay: 10,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 100 },
          },
          itemOut: {
            type: "slideOutLeft",
            duration: 15,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 100 },
          },
        },
      },
    },
    sponsor: {
      logo: {
        introIn: {
          type: "slideInBottom",
          duration: 15,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 100 },
        },
        introOut: {
          type: "collapseRight",
          duration: 15,
          easing: { type: "inOut", base: "ease" },
        },
      },
    },
  },
  text: {
    intro: {
      mainTitle: {
        type: "slideInRight",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 1e3 },
      },
      clubName: {
        type: "slideInRight",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 5,
        custom: { distance: 1e3 },
      },
      introOut: {
        type: "slideOutRight",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        custom: { distance: 1e3 },
      },
      introExitFrame: 80,
    },
    main: {
      title: {
        type: "fadeInDown",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 200 },
      },
      copyIn: {
        type: "typewriter",
        duration: 10,
        easing: { type: "inOut", base: "ease" },
        delay: 200,
      },
      copyOut: {
        type: "fadeOutUp",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
      },
    },
    outro: {
      copyIn: {
        type: "typewriter",
        duration: 1e3,
        easing: { type: "inOut", base: "ease" },
        delay: 200,
      },
      copyOut: {
        type: "fadeOutUp",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
      },
    },
  },
  container: {
    main: {
      parent: {
        containerIn: {
          type: "none",
        },
        containerOut: {
          type: "none",
        },
      },
      itemContainer: {
        containerIn: {
          type: "revealLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: {
            distance: "105%",
          },
        },
        containerOut: {
          type: "collapseRight",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: {
            distance: "105%",
          },
        },
      },
      itemContainerOuter: {
        containerIn: {
          type: "revealLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 200,
          },
        },
        containerOut: {
          type: "none",
        },
      },
      itemContainerInner: {
        containerIn: {
          type: "revealLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 200,
          },
        },
        containerOut: {
          type: "none",
        },
      },
      itemContainerSecondary: {
        containerIn: {
          type: "revealRight",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          delay: 15,
          custom: {
            distance: 100,
          },
        },
        containerOut: {
          type: "none",
        },
      },
    },
  },
  transition: {
    Main: {
      type: "none",
      direction: "none",
      durationInFrames: 15,
    },
  },
};

// src/templates/variants/brickwork/index.tsx

var Brickwork = ({ data }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkTQMZUA5Ijs.BaseTemplate,
    {
      data,
      settings: brickworkTheme,
      introComponent: BrickworkIntro,
      outroComponent: BrickworkOutro,
      backgroundComponent: BrickworkBackground,
      mainComponentLayout: BrickworkMain,
      animations: templateAnimations,
    },
  );
};

exports.Brickwork = Brickwork;
//# sourceMappingURL=brickwork-JG3H7LK7.js.map
