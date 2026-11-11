"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var _chunkJPRG76NNjs = require("./chunk-JPRG76NN.js");

var _chunkIFK37YAGjs = require("./chunk-IFK37YAG.js");

var _chunkCNAC6AOLjs = require("./chunk-CNAC6AOL.js");

var _chunkTGUIUP2Jjs = require("./chunk-TGUIUP2J.js");

// src/templates/variants/classic/components/ClassicIntro.tsx
var _jsxruntime = require("react/jsx-runtime");
var ClassicIntro = () => {
  var _a, _b, _c;
  const { club, metadata } = _chunkCNAC6AOLjs.useVideoDataContext.call(void 0);
  const { animations } = _chunkCNAC6AOLjs.useAnimationContext.call(void 0);
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = _chunkCNAC6AOLjs.useThemeContext.call(void 0);
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkIFK37YAGjs.VerticalStackLogoTitleName,
    {
      alignment: "center",
      Logo: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
        className:
          "w-full h-full flex justify-center py-0 mb-16 items-center max-h-[500px] max-w-[800px]",
        children: /* @__PURE__ */ _jsxruntime.jsx.call(
          void 0,
          _chunkCNAC6AOLjs.AnimatedImage,
          {
            src: ((_a = club.logo) == null ? void 0 : _a.url) || "",
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
        className: "overflow-hidden mb-4 mt-[-1.5em]",
        children: /* @__PURE__ */ _jsxruntime.jsx.call(
          void 0,
          _chunkCNAC6AOLjs.AnimatedText,
          {
            textAlign: "center",
            type: "title",
            variant: "onContainerTitle",
            letterAnimation: "word",
            animation: TextAnimations.mainTitle,
            exitAnimation: TextAnimations.introOut,
            exitFrame: TextAnimations.introExitFrame,
            fontFamily: (_b = fontClasses.title) == null ? void 0 : _b.family,
            style: { lineHeight: 1.05 },
            children: metadata.title,
          },
        ),
      }),
      Name: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
        className: "overflow-hidden mt-[-2.5em]",
        children: /* @__PURE__ */ _jsxruntime.jsx.call(
          void 0,
          _chunkCNAC6AOLjs.AnimatedText,
          {
            type: "titleSmall",
            textAlign: "center",
            variant: "onContainerTitle",
            letterAnimation: "word",
            animation: TextAnimations.clubName,
            exitAnimation: TextAnimations.introOut,
            exitFrame: TextAnimations.introExitFrame,
            fontFamily: (_c = fontClasses.copy) == null ? void 0 : _c.family,
            children: club.name,
          },
        ),
      }),
      PrimarySponsor: /* @__PURE__ */ _jsxruntime.jsx.call(
        void 0,
        _chunkCNAC6AOLjs.IntroPrimarySponsors,
        {
          introIn: LogoAnimations.introIn,
          introOut: LogoAnimations.introOut,
          introExitFrame: LogoAnimations.introExitFrame,
        },
      ),
    },
  );
};

// src/templates/variants/classic/components/ClassicOutro.tsx
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
  chunkSize: _chunkTGUIUP2Jjs.OUTRO_SPONSOR_PAGE_SIZE,
  sequenceDurationInFrames: _chunkTGUIUP2Jjs.OUTRO_PAGE_DURATION_FRAMES,
  logoExitFrame: _chunkTGUIUP2Jjs.OUTRO_PAGE_LOGO_EXIT_FRAME,
  logoDelayIncrement: _chunkTGUIUP2Jjs.OUTRO_PAGE_LOGO_STAGGER_FRAMES,
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
              _chunkCNAC6AOLjs.AnimatedImage,
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
var ClassicOutro = ({ doesAccountHaveSponsors }) => {
  var _a, _b;
  const { sponsors } = _chunkCNAC6AOLjs.useVideoDataContext.call(void 0);
  const { animations } = _chunkCNAC6AOLjs.useAnimationContext.call(void 0);
  const LogoAnimations = animations.image.sponsor.logo;
  if (!doesAccountHaveSponsors) {
    return null;
  }
  const sponsorsArray = _chunkTGUIUP2Jjs.buildOutroSponsorSequence.call(
    void 0,
    {
      primary:
        (_a = sponsors == null ? void 0 : sponsors.primary) != null ? _a : [],
      general:
        (_b = sponsors == null ? void 0 : sponsors.general) != null ? _b : [],
    },
  );
  const groups = _chunkTGUIUP2Jjs.chunkSponsors.call(
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
    _chunkCNAC6AOLjs.TransitionSeriesWrapper,
    {
      sequences,
      transitionType: "none",
      timing: { type: "linear", durationInFrames: 1 },
    },
  );
};

// src/templates/variants/classic/components/ClassicBackground.tsx

var ClassicBackground = () => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkCNAC6AOLjs.SelectTemplateBackground,
    {},
  );
};

// src/templates/variants/classic/components/ClassicMainHeader.tsx

var CLASSIC_HEADER_TITLE_MAX_FONT_PX =
  4.5 * _chunkCNAC6AOLjs.TITLE_SCREEN_BASE_FONT_PX;
var CLASSIC_HEADER_LOGO_PX = 110;
var CLASSIC_HEADER_ROW_GAP_PX = 6;
var CLASSIC_HEADER_HORIZONTAL_INSET_PX = 32;
var getClassicHeaderTitleWidth = (compositionWidth, hasLogo) => {
  const reserved =
    CLASSIC_HEADER_HORIZONTAL_INSET_PX +
    (hasLogo ? CLASSIC_HEADER_LOGO_PX + CLASSIC_HEADER_ROW_GAP_PX : 0);
  return Math.max(0, compositionWidth - reserved);
};
var ClassicMainHeader = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const { layout, fonts, fontClasses } =
    _chunkCNAC6AOLjs.useThemeContext.call(void 0);
  const { club, metadata, data } =
    _chunkCNAC6AOLjs.useVideoDataContext.call(void 0);
  const { animations } = _chunkCNAC6AOLjs.useAnimationContext.call(void 0);
  const { width } = _remotion.useVideoConfig.call(void 0);
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;
  const { heights } = layout;
  const { timings } = data;
  const exitFrame = timings.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;
  const headerTitleFont =
    (_f =
      (_e =
        (_c =
          (_a = fonts == null ? void 0 : fonts.title) == null
            ? void 0
            : _a.family) != null
          ? _c
          : (_b = fonts == null ? void 0 : fonts.subtitle) == null
            ? void 0
            : _b.family) != null
        ? _e
        : (_d = fontClasses == null ? void 0 : fontClasses.heading) == null
          ? void 0
          : _d.family) != null
      ? _f
      : "Impact";
  const title = (_g = metadata.title) != null ? _g : "";
  const hasLogo = Boolean((_h = club.logo) == null ? void 0 : _h.url);
  const fittedTitleFontSize = _chunkCNAC6AOLjs.useFittedFontSize.call(void 0, {
    text: title,
    fontFamily: headerTitleFont,
    fontWeight: 700,
    textTransform: "none",
    letterSpacing: "0em",
    maxFontSize: CLASSIC_HEADER_TITLE_MAX_FONT_PX,
    minFontSize: 20,
    withinWidth: getClassicHeaderTitleWidth(width, hasLogo),
    maxLines: 1,
  });
  const titleFontSize =
    fittedTitleFontSize != null
      ? fittedTitleFontSize
      : CLASSIC_HEADER_TITLE_MAX_FONT_PX;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
    className: "relative h-full w-full",
    children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(
        void 0,
        _chunkCNAC6AOLjs.SplitColourEdge,
        {
          orientation: "horizontal",
          placement: "bottom",
          animationDelay: 15,
        },
      ),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
        className: "relative z-10 h-full w-full",
        children: /* @__PURE__ */ _jsxruntime.jsx.call(
          void 0,
          _chunkCNAC6AOLjs.InlineHeaderLogoTitle,
          {
            height: heights.header,
            alignment: "center",
            rowClassName: "gap-1.5",
            Name: null,
            Logo: ((_i = club.logo) == null ? void 0 : _i.url)
              ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                  className:
                    "flex h-[110px] w-[110px] shrink-0 items-center justify-center",
                  children: /* @__PURE__ */ _jsxruntime.jsx.call(
                    void 0,
                    _chunkCNAC6AOLjs.AnimatedImage,
                    {
                      src: club.logo.url,
                      width: "auto",
                      height: "auto",
                      fit: "contain",
                      className: "max-h-[110px] max-w-[110px] rounded-none",
                      animation: LogoAnimations.introIn,
                      exitAnimation: LogoAnimations.introOut,
                      exitFrame,
                    },
                  ),
                })
              : null,
            Title: /* @__PURE__ */ _jsxruntime.jsx.call(
              void 0,
              _chunkCNAC6AOLjs.AnimatedText,
              {
                textAlign: "left",
                type: "titleSmall",
                variant: "onContainerTitle",
                letterAnimation: "none",
                animation: TextAnimations.title,
                exitAnimation: TextAnimations.copyOut,
                exitFrame,
                fontFamily: headerTitleFont,
                className:
                  "!mt-0 !px-0 !leading-none !font-bold whitespace-nowrap",
                style: {
                  fontFamily: `${headerTitleFont}, sans-serif`,
                  fontWeight: 700,
                  fontSize: titleFontSize,
                },
                children: title,
              },
            ),
          },
        ),
      }),
    ],
  });
};

// src/templates/variants/classic/components/ClassicMain.tsx

var ClassicMain = () => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkJPRG76NNjs.OneColumn,
    { Header: ClassicMainHeader },
  );
};

// src/templates/variants/classic/animations.ts
var templateAnimations = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "fadeIn",
          duration: 30,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 50 },
        },
        introOut: {
          type: "slideOutTop",
          duration: 15,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 50 },
        },
        introExitFrame: 75,
      },
    },
    main: {
      title: {
        logo: {
          introIn: {
            type: "fadeIn",
            duration: 15,
            delay: 5,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 50 },
          },
          introOut: {
            type: "slideOutTop",
            duration: 30,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 500 },
          },
        },
      },
      item: {
        logo: {
          itemIn: {
            type: "fadeIn",
            duration: 15,
            delay: 10,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 50 },
          },
          itemOut: {
            type: "fadeOut",
            duration: 15,
            easing: { type: "inOut", base: "ease" },
          },
        },
      },
    },
    sponsor: {
      logo: {
        introIn: {
          type: "fadeIn",
          duration: 15,
          delay: 5,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 50 },
        },
        introOut: {
          type: "fadeOut",
          duration: 15,
          easing: { type: "inOut", base: "ease" },
        },
      },
    },
  },
  text: {
    intro: {
      mainTitle: {
        type: "fadeIn",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 500 },
      },
      clubName: {
        type: "fadeIn",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 5,
        custom: { distance: 500 },
      },
      introOut: {
        type: "slideOutBottom",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        custom: { distance: 500 },
      },
      introExitFrame: 80,
    },
    main: {
      title: {
        type: "fadeIn",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 20,
        custom: { distance: 500 },
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
          type: "revealLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 1e3,
          },
        },
        containerOut: {
          type: "collapseRight",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 1e3,
          },
        },
      },
      itemContainer: {
        containerIn: {
          type: "revealLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
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
          type: "slideInRight",
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
          type: "scaleIn",
          easing: { type: "inOut", base: "ease" },
          duration: 10,
          custom: {
            distance: 100,
          },
        },
        containerOut: {
          type: "none",
        },
      },
      itemContainerSecondary: {
        containerIn: {
          type: "slideInLeft",
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

// src/templates/variants/classic/index.tsx

var Classic = ({ data }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkCNAC6AOLjs.BaseTemplate,
    {
      data,
      settings: _chunkCNAC6AOLjs.basicTheme,
      introComponent: ClassicIntro,
      outroComponent: ClassicOutro,
      backgroundComponent: ClassicBackground,
      mainComponentLayout: ClassicMain,
      animations: templateAnimations,
    },
  );
};

exports.Classic = Classic;
//# sourceMappingURL=classic-M7RK36MN.js.map
