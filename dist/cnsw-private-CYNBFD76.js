"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var _chunkO26MLT2Zjs = require("./chunk-O26MLT2Z.js");

var _chunkTQMZUA5Ijs = require("./chunk-TQMZUA5I.js");

var _chunk5OPIAWHPjs = require("./chunk-5OPIAWHP.js");

// src/templates/variants/cnsw-private/theme.ts
var cnswTheme = {
  ..._chunkTQMZUA5Ijs.baseTheme,
  fonts: {
    title: {
      family: "Impact",
    },
    subtitle: {
      family: "Heebo",
    },
    copy: {
      family: "Heebo",
    },
  },
  componentStyles: {
    title: {
      className:
        "text-[12em] font-normal tracking-wider leading-none text-center m-0 px-0",
    },
    subtitle: {
      className:
        "text-4xl font-light  leading-normal text-center m-0 px-4 text-white",
    },
    bodyText: {
      className: "text-2xl font-normal tracking-normal leading-normal",
    },
    playerName: {
      className: "text-3xl font-black tracking-tight leading-normal",
    },
    score: {
      className: "text-6xl font-black tracking-tight leading-normal",
    },
    teamName: {
      className: "text-4xl font-black tracking-tight leading-normal",
    },
    label: {
      className: "text-xl font-medium tracking-wide leading-normal",
    },
    ladderGradeLabel: {
      className: "text-2xl font-medium tracking-normal leading-normal",
    },
    ladderTeamName: {
      className: "text-2xl font-bold tracking-normal leading-normal",
    },
    ladderTeamPoints: {
      className: "text-2xl font-bold tracking-normal leading-normal",
    },
    Top5PlayerName: {
      className: "text-4xl font-black tracking-normal leading-normal",
    },
    Top5PlayerTeam: {
      className:
        "text-2xl font-semibold opacity-80 tracking-wider leading-tight",
    },
    Top5PlayerScore: {
      className: "text-4xl font-bold  tracking-normal leading-tight mr-2",
    },
    Top5PlayerScoreSuffix: {
      className: "text-2xl font-normal  tracking-wide leading-loose",
    },
    ResultScore: {
      className: "text-5xl font-bold tracking-normal leading-none",
    },
    ResultScoreFirstInnings: {
      className: "text-[2.1rem] font-bold tracking-normal leading-none",
    },
    ResultScoreYetToBat: {
      className: "text-3xl font-bold  tracking-wider py-6",
    },
    ResultTeamName: {
      className: "text-2xl font-semibold  tracking-wider leading-normal",
    },
    ResultPlayerName: {
      className: "text-2xl font-semibold  tracking-normal leading-normal",
    },
    ResultPlayerScore: {
      className: "text-2xl font-semibold  tracking-normal leading-normal",
    },
    ResultSyntax: {
      className:
        "text-2xl font-semibold  tracking-wider leading-normal py-4 ml-4",
    },
    ResultFixtureResult: {
      className:
        "text-4xl font-normal text-center tracking-wider leading-normal italic",
    },
    ResultStatementShort: {
      className:
        "text-3xl font-semibold  tracking-wider leading-snug py-2 px-16",
    },
    ResultStatementText: {
      className: "text-3xl font-semibold  tracking-wider leading-snug ",
    },
    ResultMetaData: {
      className: "text-2xl font-semibold  tracking-wider leading-normal",
    },
    ResultVS: {
      className: "text-2xl font-semibold  tracking-wider leading-normal",
    },
    RosterPlayerName: {
      className: "text-3xl font-bold  tracking-wider leading-normal",
    },
    metadataSmall: {
      className: "text-2xl font-normal  tracking-wider leading-normal",
    },
    metadataMedium: {
      className: "text-3xl font-semibold  tracking-wider leading-normal",
    },
    metadataLarge: {
      className: "text-6xl font-bold  tracking-widest leading-normal",
    },
    titleSmall: {
      className: "text-4xl font-semibold tracking-normal leading-normal",
    },
    TeamOfTheWeekPlayerName: {
      className: "text-3xl font-black tracking-normal leading-none",
    },
    TeamOfTheWeekTeam: {
      className:
        "text-2xl font-semibold opacity-80 tracking-wider leading-none",
    },
    TeamOfTheWeekType: {
      className: "text-xl font-normal tracking-wider leading-none",
    },
    TeamOfTheWeekStat: {
      className: "text-4xl font-bold tracking-normal leading-none mr-2",
    },
  },
  layout: {
    heights: {
      asset: 910,
      header: 300,
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
        background: "#ffffff",
        backgroundAlt: "#f2f6ff",
        backgroundTransparent: "rgba(255, 255, 255, 0.65)",
      },
      text: {
        title: "#002C6E",
        copy: "#0A1A2F",
      },
    },
    lightAlt: {
      container: {
        background: "#ffffff",
        backgroundAlt: "#e9f1ff",
        backgroundTransparent: "rgba(255, 255, 255, 0.5)",
      },
      text: {
        title: "#001a45",
        copy: "#0A1A2F",
      },
    },
    dark: {
      container: {
        background: "#0A1A2F",
        backgroundAlt: "#031022",
        backgroundTransparent: "rgba(10, 26, 47, 0.65)",
      },
      text: {
        title: "#E6F0FF",
        copy: "#E6F0FF",
      },
    },
    darkAlt: {
      container: {
        background: "#0A1A2F",
        backgroundAlt: "#0c1c33",
        backgroundTransparent: "rgba(10, 26, 47, 0.5)",
      },
      text: {
        title: "#cfe3ff",
        copy: "#e6f0ff",
      },
    },
  },
};

// src/templates/variants/cnsw-private/components/CNSWIntro.tsx
var _remotion = require("remotion");

// src/templates/variants/cnsw-private/utils/compositionConfig.ts
var compositionConfig = {
  CricketLadder: {
    topLine: {
      value: "LEAGUE",
      spacing: "0.25em",
    },
    bottomLine: {
      value: "TABLES",
      spacing: "0.66em",
    },
    header: {
      topLine: {
        value: "LADDER",
        spacing: "0.2em",
        headerFontSize: "7em",
      },
      bottomLine: {
        value: "",
        spacing: "0.3em",
        headerFontSize: "0em",
      },
    },
  },
  CricketResults: {
    topLine: {
      value: "Weekend",
      spacing: "0.069em",
    },
    bottomLine: {
      value: "RESULTS",
      spacing: "0.46em",
    },
    header: {
      topLine: {
        value: "Weekend",
        spacing: "0.2em",
        headerFontSize: "6em",
      },
      bottomLine: {
        value: "RESULTS",
        spacing: "0.38em",
        headerFontSize: "5.2em",
      },
    },
  },
  CricketUpcoming: {
    topLine: {
      value: "FIXTURES",
      spacing: "0.065em",
    },
    bottomLine: {
      value: "SCHEDULE",
      spacing: "0.3em",
    },
    header: {
      topLine: {
        value: "FIXTURES",
        spacing: "0.2em",
        headerFontSize: "7em",
      },
      bottomLine: {
        value: "",
        spacing: "0.15em",
        headerFontSize: "0em",
      },
    },
  },
  CricketTop5Bowling: {
    topLine: {
      value: "Leading",
      spacing: "0.155em",
    },
    bottomLine: {
      value: "Wicket-takers",
      spacing: "0.055em",
    },
    header: {
      topLine: {
        value: "Leading",
        spacing: "0.1em",
        headerFontSize: "10em",
      },
      bottomLine: {
        value: "Wicket-takers",
        spacing: "0.27em",
        headerFontSize: "4em",
      },
    },
  },
  CricketTop5Batting: {
    topLine: {
      value: "Leading",
      spacing: "0.155em",
    },
    bottomLine: {
      value: "Run-Scorers",
      spacing: "0.07em",
    },
    header: {
      topLine: {
        value: "Leading",
        spacing: "0.1em",
        headerFontSize: "10em",
      },
      bottomLine: {
        value: "Run-Scorers",
        spacing: "0.38em",
        headerFontSize: "4em",
      },
    },
  },
  CricketBattingPerformances: {
    topLine: {
      value: "Batting",
      spacing: "0.155em",
    },
    bottomLine: {
      value: "Performances",
      spacing: "0.07em",
    },
    header: {
      topLine: {
        value: "Batting",
        spacing: "0.1em",
        headerFontSize: "10em",
      },
      bottomLine: {
        value: "Performances",
        spacing: "0.38em",
        headerFontSize: "4em",
      },
    },
  },
  CricketBowlingPerformances: {
    topLine: {
      value: "Bowling",
      spacing: "0.155em",
    },
    bottomLine: {
      value: "Performances",
      spacing: "0.055em",
    },
    header: {
      topLine: {
        value: "Bowling",
        spacing: "0.1em",
        headerFontSize: "10em",
      },
      bottomLine: {
        value: "Performances",
        spacing: "0.27em",
        headerFontSize: "4em",
      },
    },
  },
  CricketRoster: {
    topLine: {
      value: "Team",
      spacing: "0.67em",
    },
    bottomLine: {
      value: "Roster",
      spacing: "0.62em",
    },
    header: {
      topLine: {
        value: "Team",
        spacing: "0.3em",
        headerFontSize: "6em",
      },
      bottomLine: {
        value: "Roster",
        spacing: "0.15em",
        headerFontSize: "5em",
      },
    },
  },
  CricketResultSingle: {
    topLine: {
      value: "Weekend",
      spacing: "0.05em",
    },
    bottomLine: {
      value: "Result",
      spacing: "0.62em",
    },
    header: {
      topLine: {
        value: "Weekend",
        spacing: "0.2em",
        headerFontSize: "6em",
      },
      bottomLine: {
        value: "Result",
        spacing: "0.4em",
        headerFontSize: "6em",
      },
    },
  },
  CricketTeamOfTheWeek: {
    topLine: {
      value: "Team",
      spacing: "0.62em",
    },
    bottomLine: {
      value: "OF THE WEEK",
      spacing: "0.62em",
    },
    header: {
      topLine: {
        value: "Team",
        spacing: "0.3em",
        headerFontSize: "6em",
      },
      bottomLine: {
        value: "OF THE WEEK",
        spacing: "0.38em",
        headerFontSize: "5em",
      },
    },
  },
};
var getCompositionConfig = (compositionId) => {
  return (
    compositionConfig[compositionId] || compositionConfig["CricketResultSingle"]
  );
};
var getHeaderConfig = (compositionId) => {
  const config = getCompositionConfig(compositionId);
  if (config.header) {
    return config.header;
  }
  return {
    topLine: {
      ...config.topLine,
      headerFontSize: "7em",
    },
    bottomLine: {
      ...config.bottomLine,
      headerFontSize: "7em",
    },
  };
};
var VIDEO_DIMENSIONS = {
  WIDTH: 1080,
  // px
  HEIGHT: 1350,
  // px
};
var hardcodedTextSpacing = {
  // TopLine values
  LEAGUE: { intro: "0.25em", header: "0.2em" },
  Weekend: { intro: "0.069em", header: "0.2em" },
  FIXTURES: { intro: "0.065em", header: "0.2em" },
  Leading: { intro: "0.155em", header: "0.1em" },
  Team: { intro: "0.62em", header: "0.3em" },
  Batting: { intro: "0.155em", header: "0.1em" },
  Bowling: { intro: "0.1em", header: "0.1em" },
  // BottomLine values
  TABLES: { intro: "0.66em", header: "0.3em" },
  RESULTS: { intro: "0.46em", header: "0.38em" },
  SCHEDULE: { intro: "0.3em", header: "0.15em" },
  "Wicket-takers": { intro: "0em", header: "0.27em" },
  "Run-Scorers": { intro: "0.07em", header: "0.38em" },
  Roster: { intro: "0.66em", header: "0.15em" },
  Result: { intro: "0.62em", header: "0.4em" },
  Performances: { intro: "0.015em", header: "0.25em" },
  "OF THE WEEK": { intro: "0.095em", header: "0.28em" },
};
var getHardcodedSpacing = (text, context) => {
  var _a;
  return (
    ((_a = hardcodedTextSpacing[text]) == null ? void 0 : _a[context]) ||
    "0.2em"
  );
};
var calculateFitToWidthSpacing = (
  text,
  fontSize,
  containerWidth,
  avgCharWidth = 0.5,
) => {
  if (!text || text.length === 0) return "0em";
  const estimatedTextWidth = text.length * fontSize * avgCharWidth;
  const availableSpace = containerWidth - estimatedTextWidth;
  const numGaps = text.length - 1;
  if (numGaps <= 0) return "0em";
  const letterSpacingPx = availableSpace / numGaps;
  const letterSpacingEm = letterSpacingPx / fontSize;
  const clampedSpacing = Math.max(-0.1, Math.min(1, letterSpacingEm));
  return `${clampedSpacing.toFixed(3)}em`;
};
var getLeagueTitleConfig = (
  leagueTitle,
  containerWidth,
  fontSize,
  avgCharWidth,
) => {
  const title =
    (leagueTitle == null ? void 0 : leagueTitle.toUpperCase()) || "";
  const spacing =
    containerWidth && fontSize
      ? calculateFitToWidthSpacing(
          title,
          fontSize,
          containerWidth,
          avgCharWidth,
        )
      : "0.22em";
  return {
    value: title,
    spacing,
  };
};

// src/templates/variants/cnsw-private/components/CNSWIntro.tsx
var _jsxruntime = require("react/jsx-runtime");
var CNSWIntro = () => {
  var _a, _b, _c, _d;
  const { metadata, sponsors, club } =
    _chunkTQMZUA5Ijs.useVideoDataContext.call(void 0);
  const { animations } = _chunkTQMZUA5Ijs.useAnimationContext.call(void 0);
  const { fontClasses, selectedPalette } =
    _chunkTQMZUA5Ijs.useThemeContext.call(void 0);
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const byLineValue = club.name || " ";
  const currentConfig = getCompositionConfig(metadata.compositionId);
  const topLine = currentConfig.topLine.value;
  const bottomLine = currentConfig.bottomLine.value;
  const snugLetterSpacingTopLine = getHardcodedSpacing(topLine, "intro");
  const snugLetterSpacingBottomLine = getHardcodedSpacing(bottomLine, "intro");
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, {
    children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _remotion.AbsoluteFill, {
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _remotion.Img, {
          src: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Cricket_Ground_Outline_3ec66a78e3.png",
          className: "cricket-ground-outline",
          style: {
            width: "1080px",
            height: "1080px",
            objectFit: "cover",
            position: "absolute",
            top: "-250px",
            left: "430px",
            zIndex: 0,
            opacity: 0.3,
          },
        }),
      }),
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
        className:
          "flex flex-col items-center justify-center h-full w-full px-8 py-8",
        children: [
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
            className: " flex flex-col items-center justify-center",
            style: {
              height: "1200px",
              width: "100%",
            },
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                className:
                  "overflow-hidden mt-[-2.5em] w-[90%] mb-8 flex justify-center",
                children: /* @__PURE__ */ _jsxruntime.jsx.call(
                  void 0,
                  _chunkTQMZUA5Ijs.AnimatedText,
                  {
                    type: "subtitle",
                    variant: "onContainerTitle",
                    letterAnimation: "none",
                    animation: TextAnimations.clubName,
                    exitAnimation: TextAnimations.introOut,
                    exitFrame: TextAnimations.introExitFrame,
                    fontFamily:
                      (_a = fontClasses.subtitle) == null ? void 0 : _a.family,
                    style: {
                      color: "#ffffff",
                      whiteSpace: "nowrap",
                      width: "100%",
                      letterSpacing: "0.06em",
                      textAlign: "center",
                    },
                    children: byLineValue.toUpperCase(),
                  },
                ),
              }),
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
                className:
                  "overflow-hidden mt-[-1.5em] flex flex-col items-center justify-center w-full",
                children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                    className: "w-[80%]",
                    children: /* @__PURE__ */ _jsxruntime.jsx.call(
                      void 0,
                      _chunkTQMZUA5Ijs.AnimatedText,
                      {
                        type: "title",
                        variant: "onContainerTitle",
                        letterAnimation: "none",
                        animation: TextAnimations.mainTitle,
                        exitAnimation: TextAnimations.introOut,
                        exitFrame: TextAnimations.introExitFrame,
                        fontFamily:
                          (_b = fontClasses.title) == null ? void 0 : _b.family,
                        style: {
                          color: selectedPalette.container.secondary,
                          textTransform: "uppercase",
                          fontSize: "12em",
                          whiteSpace: "nowrap",
                          width: "100%",
                          letterSpacing: snugLetterSpacingTopLine,
                          textAlign: "left",
                        },
                        children: topLine,
                      },
                    ),
                  }),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                    className: "w-[80%]",
                    children: /* @__PURE__ */ _jsxruntime.jsx.call(
                      void 0,
                      _chunkTQMZUA5Ijs.AnimatedText,
                      {
                        type: "title",
                        variant: "onContainerTitle",
                        letterAnimation: "none",
                        animation: TextAnimations.mainTitle,
                        exitAnimation: TextAnimations.introOut,
                        exitFrame: TextAnimations.introExitFrame,
                        fontFamily:
                          (_c = fontClasses.title) == null ? void 0 : _c.family,
                        style: {
                          color: "#ffffff",
                          textTransform: "uppercase",
                          fontSize: "8em",
                          whiteSpace: "nowrap",
                          width: "100%",
                          letterSpacing: snugLetterSpacingBottomLine,
                          textAlign: "left",
                        },
                        children: bottomLine,
                      },
                    ),
                  }),
                ],
              }),
            ],
          }),
          (
            (_d = sponsors == null ? void 0 : sponsors.primary) == null
              ? void 0
              : _d.length
          )
            ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                className: "w-[80%] mt-8",
                children: /* @__PURE__ */ _jsxruntime.jsx.call(
                  void 0,
                  _chunkTQMZUA5Ijs.IntroPrimarySponsors,
                  {
                    className:
                      "w-full flex flex-row flex-wrap justify-start items-start gap-4",
                    itemClassName: "flex-shrink-0 max-h-[150px] max-w-[150px]",
                    introIn: LogoAnimations.introIn,
                    introOut: LogoAnimations.introOut,
                    introExitFrame: LogoAnimations.introExitFrame,
                  },
                ),
              })
            : null,
        ],
      }),
    ],
  });
};

// src/templates/variants/cnsw-private/components/CNSWOutro.tsx

var SponsorGrid = ({ sponsors, LogoAnimations }) =>
  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
    className:
      "grid grid-cols-2 grid-rows-3 gap-10  justify-center items-center",
    children: sponsors
      .filter((sponsor) => sponsor.logo && sponsor.logo.url)
      .map((sponsor, idx) => {
        var _a;
        return /* @__PURE__ */ _jsxruntime.jsx.call(
          void 0,
          "div",
          {
            className:
              "flex items-center justify-center p-4 max-h-[300px] max-w-[300px]",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(
              void 0,
              _chunkTQMZUA5Ijs.AnimatedImage,
              {
                src: sponsor.logo.url,
                alt: sponsor.name || "",
                width: "auto",
                height: "auto",
                fit: "contain",
                animation: LogoAnimations.introIn,
                exitAnimation:
                  (_a = LogoAnimations.exitAnimation) != null
                    ? _a
                    : LogoAnimations.introOut,
                animationDelay:
                  idx * _chunk5OPIAWHPjs.OUTRO_PAGE_LOGO_STAGGER_FRAMES,
                exitFrame: _chunk5OPIAWHPjs.OUTRO_PAGE_LOGO_EXIT_FRAME,
              },
            ),
          },
          `${sponsor.id}_${idx}`,
        );
      }),
  });
var CNSWOutro = ({ doesAccountHaveSponsors }) => {
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
    _chunk5OPIAWHPjs.OUTRO_SPONSOR_PAGE_SIZE,
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
    durationInFrames: _chunk5OPIAWHPjs.OUTRO_PAGE_DURATION_FRAMES,
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

// src/templates/variants/cnsw-private/components/CNSWBackground.tsx

var CNSWBackground = () => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkTQMZUA5Ijs.SelectTemplateBackground,
    {},
  );
};

// src/templates/variants/cnsw-private/components/CNSWMainHeader.tsx

var CNSWMainHeader = () => {
  var _a, _b, _c;
  const { layout, fontClasses, selectedPalette } =
    _chunkTQMZUA5Ijs.useThemeContext.call(void 0);
  const { metadata, data, video, club } =
    _chunkTQMZUA5Ijs.useVideoDataContext.call(void 0);
  const { animations } = _chunkTQMZUA5Ijs.useAnimationContext.call(void 0);
  const TextAnimations = animations.text.main;
  const { heights } = layout;
  const { timings } = data;
  const competitionName = club.name || video.fixtureCategory;
  const headerConfig = getHeaderConfig(metadata.compositionId);
  const topLineValue = headerConfig.topLine.value;
  const bottomLineValue = headerConfig.bottomLine.value;
  const containerWidth = VIDEO_DIMENSIONS.WIDTH * 0.9;
  const leagueTitleFontSize = 30;
  const avgCharWidth = 0.5;
  const leagueTitleConfig = getLeagueTitleConfig(
    competitionName,
    containerWidth,
    leagueTitleFontSize,
    avgCharWidth,
  );
  const leagueTitleSpacing = leagueTitleConfig.spacing;
  const topLineSpacing = getHardcodedSpacing(topLineValue, "header");
  const bottomLineSpacing = getHardcodedSpacing(bottomLineValue, "header");
  const leagueTitle = {
    value: leagueTitleConfig.value,
    fontSize: "1.5em",
    color: "#ffffff",
    spacing: leagueTitleSpacing,
  };
  const topLine = {
    value: topLineValue,
    fontSize: headerConfig.topLine.headerFontSize || "7em",
    color: selectedPalette.container.secondary,
    spacing: topLineSpacing,
  };
  const bottomLine = {
    value: bottomLineValue,
    fontSize: headerConfig.bottomLine.headerFontSize || "7em",
    color: "#ffffff",
    spacing: bottomLineSpacing,
  };
  const exitFrame = _chunkTQMZUA5Ijs.calculateMainHeaderExitFrame.call(
    void 0,
    timings,
  );
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
    className: "w-full flex flex-col items-center justify-center relative",
    style: { height: `${heights.header}px` },
    children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _remotion.AbsoluteFill, {
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _remotion.Img, {
          src: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Cricket_Ground_Outline_3ec66a78e3.png",
          className: "cricket-ground-outline",
          style: {
            width: "1080px",
            height: "1080px",
            objectFit: "cover",
            position: "absolute",
            top: "-250px",
            left: "430px",
            zIndex: 0,
            opacity: 0.3,
          },
        }),
      }),
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
        className:
          "flex flex-col items-center justify-end w-full h-full relative z-10",
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
            className: "mb-0",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(
              void 0,
              _chunkTQMZUA5Ijs.AnimatedText,
              {
                textAlign: "center",
                type: "subtitle",
                variant: "onContainerTitle",
                letterAnimation: "none",
                animation: TextAnimations.title,
                exitAnimation: TextAnimations.copyOut,
                exitFrame,
                fontFamily:
                  (_a = fontClasses.subtitle) == null ? void 0 : _a.family,
                style: {
                  color: "#ffffff",
                  textTransform: "uppercase",
                  fontSize: leagueTitle.fontSize,
                  whiteSpace: "nowrap",
                  letterSpacing: leagueTitle.spacing,
                  textAlign: "center",
                  fontWeight: "300",
                },
                children: leagueTitle.value,
              },
            ),
          }),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
            children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                className: "mb-2",
                children: /* @__PURE__ */ _jsxruntime.jsx.call(
                  void 0,
                  _chunkTQMZUA5Ijs.AnimatedText,
                  {
                    textAlign: "center",
                    type: "title",
                    variant: "onContainerTitle",
                    letterAnimation: "none",
                    animation: TextAnimations.title,
                    exitAnimation: TextAnimations.copyOut,
                    exitFrame,
                    fontFamily:
                      (_b = fontClasses.title) == null ? void 0 : _b.family,
                    style: {
                      color: selectedPalette.container.secondary,
                      textTransform: "uppercase",
                      fontSize: topLine.fontSize,
                      whiteSpace: "nowrap",
                      letterSpacing: topLine.spacing,
                      textAlign: "center",
                      fontWeight: "900",
                    },
                    children: topLine.value,
                  },
                ),
              }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
                children: /* @__PURE__ */ _jsxruntime.jsx.call(
                  void 0,
                  _chunkTQMZUA5Ijs.AnimatedText,
                  {
                    textAlign: "center",
                    type: "title",
                    variant: "onContainerTitle",
                    letterAnimation: "none",
                    animation: TextAnimations.title,
                    exitAnimation: TextAnimations.copyOut,
                    exitFrame,
                    fontFamily:
                      (_c = fontClasses.title) == null ? void 0 : _c.family,
                    style: {
                      color: "#ffffff",
                      textTransform: "uppercase",
                      fontSize: bottomLine.fontSize,
                      whiteSpace: "nowrap",
                      letterSpacing: bottomLine.spacing,
                      textAlign: "center",
                      fontWeight: "900",
                    },
                    children: bottomLine.value,
                  },
                ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

// src/templates/variants/cnsw-private/components/CNSWMain.tsx

var CNSWMain = () => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkO26MLT2Zjs.OneColumn,
    { Header: CNSWMainHeader },
  );
};

// src/templates/variants/cnsw-private/animations.ts
var templateAnimations = {
  image: {
    intro: {
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
          custom: { distance: 2e3 },
        },
        introExitFrame: 80,
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
            type: "fadeOut",
            duration: 15,
            easing: { type: "inOut", base: "ease" },
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
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 5,
        custom: { distance: 500 },
      },
      clubName: {
        type: "fadeIn",
        duration: 20,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 200 },
      },
      introOut: {
        type: "fadeOut",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        custom: { distance: 900 },
      },
      introExitFrame: 80,
    },
    main: {
      title: {
        type: "fadeIn",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 200 },
      },
      copyIn: {
        type: "fadeIn",
        duration: 10,
        easing: { type: "inOut", base: "ease" },
        delay: 200,
      },
      copyOut: {
        type: "fadeOut",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 200,
      },
    },
    outro: {
      copyIn: {
        type: "fadeIn",
        duration: 1e3,
        easing: { type: "inOut", base: "ease" },
        delay: 200,
      },
      copyOut: {
        type: "fadeOut",
        duration: 1e3,
        easing: { type: "inOut", base: "ease" },
        delay: 200,
      },
    },
  },
  container: {
    main: {
      parent: {
        containerIn: {
          type: "fadeIn",
        },
        containerOut: {
          type: "fadeOut",
        },
      },
      itemContainer: {
        containerIn: {
          type: "fadeIn",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: "105%",
          },
        },
        containerOut: {
          type: "fadeOut",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: {
            distance: "105%",
          },
        },
      },
      itemContainerOuter: {
        containerIn: {
          type: "fadeIn",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 200,
          },
        },
        containerOut: {
          type: "fadeOut",
        },
      },
      itemContainerInner: {
        containerIn: {
          type: "fadeIn",
          easing: { type: "inOut", base: "ease" },
          duration: 10,
          custom: {
            distance: 100,
          },
        },
        containerOut: {
          type: "fadeOut",
        },
      },
      itemContainerSecondary: {
        containerIn: {
          type: "fadeIn",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 200,
          },
        },
        containerOut: {
          type: "fadeOut",
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

// src/templates/variants/cnsw-private/index.tsx

var CNSWPrivate = ({ data }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(
    void 0,
    _chunkTQMZUA5Ijs.BaseTemplate,
    {
      data,
      settings: cnswTheme,
      introComponent: CNSWIntro,
      outroComponent: CNSWOutro,
      backgroundComponent: CNSWBackground,
      mainComponentLayout: CNSWMain,
      animations: templateAnimations,
    },
  );
};

exports.CNSWPrivate = CNSWPrivate;
//# sourceMappingURL=cnsw-private-CYNBFD76.js.map
