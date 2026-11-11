import {
  OneColumn
} from "./chunk-RAMRHRQB.mjs";
import {
  VerticalStackLogoTitleName
} from "./chunk-42Q3FJK7.mjs";
import {
  AnimatedImage,
  AnimatedText,
  BaseTemplate,
  HEADER_NAME_INNER_PADDING_PX,
  HEADER_TITLE_INNER_PADDING_PX,
  HEADER_TITLE_PANEL_HEIGHT_RATIO,
  IntroPrimarySponsors,
  LayeredAngularHeader,
  SelectTemplateBackground,
  TITLE_SCREEN_BASE_FONT_PX,
  TransitionSeriesWrapper,
  baseTheme,
  getHeaderPanelContentWidth,
  getTitleScreenContentWidth,
  useAnimationContext,
  useFittedFontSize,
  useThemeContext,
  useVideoDataContext
} from "./chunk-JVWY6G7L.mjs";
import {
  OUTRO_PAGE_DURATION_FRAMES,
  OUTRO_PAGE_LOGO_EXIT_FRAME,
  OUTRO_PAGE_LOGO_STAGGER_FRAMES,
  OUTRO_SPONSOR_PAGE_SIZE,
  buildOutroSponsorSequence,
  chunkSponsors
} from "./chunk-DAUNLCV7.mjs";

// src/templates/variants/mudgeeraba/theme.ts
var mudgeerabaTheme = {
  ...baseTheme,
  // ===== FONT CONFIGURATION =====
  fonts: {
    title: {
      family: "Unbounded"
    },
    subtitle: {
      family: "Unbounded"
    },
    copy: {
      family: "Heebo"
    }
  },
  // ===== COMPONENT STYLES =====
  // Ready-to-use style objects for components
  componentStyles: {
    // Title component styles
    title: {
      className: "text-[10em] uppercase font-black tracking-tight leading-none text-center m-0 px-4"
    },
    // Title small component styles
    titleSmall: {
      className: "text-[4em] uppercase font-black tracking-tight leading-none text-center m-0 px-4"
    },
    // Subtitle component styles
    subtitle: {
      className: "text-3xl uppercase font-semibold tracking-normal leading-none text-center m-0 px-4"
    },
    // Body text component styles
    bodyText: {
      className: "text-xl font-normal tracking-normal leading-relaxed"
    },
    // Player name component styles
    playerName: {
      className: "text-3xl font-normal tracking-tight leading-tight"
    },
    // Score component styles
    score: {
      className: "text-6xl font-normal tracking-tight leading-tight"
    },
    // Team name component styles
    teamName: {
      className: "text-4xl font-normal tracking-tight leading-tight"
    },
    // Label component styles
    label: {
      className: "text-lg font-medium tracking-normal leading-snug"
    },
    // Ladder label component styles
    ladderGradeLabel: {
      className: "text-2xl font-medium tracking-normal leading-snug"
    },
    ladderTeamName: {
      className: "text-3xl font-medium tracking-normal leading-snug"
    },
    ladderTeamPoints: {
      className: "text-3xl font-medium tracking-normal leading-snug"
    },
    Top5PlayerName: {
      className: "text-5xl font-normal  tracking-wide leading-snug"
    },
    Top5PlayerTeam: {
      className: "text-2xl font-normal opacity-80 tracking-wider leading-tight"
    },
    Top5PlayerScore: {
      className: "text-7xl font-bold tracking-normal leading-tight mr-4"
    },
    Top5PlayerScoreSuffix: {
      className: "text-2xl font-bold tracking-wide leading-none"
    },
    TeamOfTheWeekPlayerName: {
      className: "text-3xl font-normal tracking-tighter leading-none"
    },
    TeamOfTheWeekTeam: {
      className: "text-xs font-normal tracking-wider leading-tight"
    },
    TeamOfTheWeekType: {
      className: "text-md font-normal uppercase tracking-wider leading-none"
    },
    TeamOfTheWeekStat: {
      className: "text-4xl font-normal tracking-tight leading-none"
    },
    ResultScore: {
      className: "text-3xl font-black tracking-tight leading-none"
    },
    ResultScoreFirstInnings: {
      className: "text-3xl font-bold tracking-tighter leading-none"
    },
    ResultScoreYetToBat: {
      className: "text-3xl font-bold tracking-tight py-4"
    },
    ResultTeamName: {
      className: "text-3xl font-semibold  tracking-wider leading-snug"
    },
    ResultPlayerName: {
      className: "text-2xl font-normal  tracking-wider leading-snug"
    },
    ResultPlayerScore: {
      className: "text-2xl font-bold  tracking-wider leading-snug"
    },
    ResultSyntax: {
      className: "text-2xl font-normal  tracking-wider leading-snug py-4 ml-4"
    },
    ResultFixtureResult: {
      className: "text-4xl font-normal text-center  tracking-wider leading-snug italic"
    },
    ResultMetaData: {
      className: "text-xl font-normal  tracking-wider leading-snug"
    },
    ResultStatementShort: {
      className: "text-3xl font-normal  tracking-wider leading-snug py-2 px-16"
    },
    ResultStatementText: {
      className: "text-3xl font-normal  tracking-wider leading-snug "
    },
    ResultVS: {
      className: "text-2xl font-normal  tracking-wider leading-snug"
    },
    RosterPlayerName: {
      className: "text-3xl font-normal  tracking-wider leading-snug"
    },
    metadataSmall: {
      className: "text-2xl font-normal  tracking-wider leading-snug"
    },
    metadataMedium: {
      className: "text-2xl font-normal  tracking-wider leading-snug"
    },
    metadataLarge: {
      className: "text-2xl font-normal  tracking-widest leading-snug"
    }
  },
  // ===== LAYOUT CONFIGURATION =====
  layout: {
    heights: {
      asset: 1010,
      header: 240,
      footer: 100
    },
    spacing: {
      section: "space-y-8",
      item: "space-y-4"
    },
    padding: {
      container: "p-8",
      section: "py-6",
      item: "py-2"
    },
    borderRadius: {
      container: "rounded-none"
    }
  },
  mode: {
    light: {
      container: {
        background: "#fff",
        backgroundAlt: "#f0f0f0",
        backgroundTransparent: "rgba(255, 255, 255, 0.5)"
      },
      text: {
        title: "#000",
        copy: "#000"
      }
    },
    lightAlt: {
      container: {
        background: "#fff",
        backgroundAlt: "#f0f0f0",
        backgroundTransparent: "rgba(255, 255, 255, 0.5)"
      },
      text: {
        title: "#fff",
        copy: "#000"
      }
    },
    dark: {
      container: {
        background: "#000",
        backgroundAlt: "#1a1a1a",
        backgroundTransparent: "rgba(0, 0, 0, 0.5)"
      },
      text: {
        title: "#fff",
        copy: "#fff"
      }
    },
    darkAlt: {
      container: {
        background: "#000",
        backgroundAlt: "#1a1a1a",
        backgroundTransparent: "rgba(0, 0, 0, 0.5)"
      },
      text: {
        title: "#000",
        copy: "#fff"
      }
    }
  }
};

// src/templates/variants/mudgeeraba/components/MudgeerabaIntro.tsx
import { useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
var MUDGEERABA_TITLE_MAX_FONT_PX = 10 * TITLE_SCREEN_BASE_FONT_PX;
var INTRO_TITLE_MAX_LINES = 2;
var INTRO_TITLE_LINE_HEIGHT = 1.05;
var INTRO_LOGO_MAX_PX = 336;
var MudgeerabaIntro = () => {
  var _a, _b, _c, _d, _e;
  const { club, metadata } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = useThemeContext();
  const { width } = useVideoConfig();
  const title = (_a = metadata.title) != null ? _a : "";
  const titleFontFamily = (_c = (_b = fontClasses.title) == null ? void 0 : _b.family) != null ? _c : "Unbounded";
  const nameFontFamily = (_e = (_d = fontClasses.subtitle) == null ? void 0 : _d.family) != null ? _e : "Unbounded";
  const contentWidth = getTitleScreenContentWidth(width);
  const fittedTitleFontSize = useFittedFontSize({
    text: title,
    fontFamily: titleFontFamily,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "-0.025em",
    maxFontSize: MUDGEERABA_TITLE_MAX_FONT_PX,
    withinWidth: contentWidth,
    withinHeight: MUDGEERABA_TITLE_MAX_FONT_PX * INTRO_TITLE_LINE_HEIGHT * INTRO_TITLE_MAX_LINES,
    lineHeightRatio: INTRO_TITLE_LINE_HEIGHT,
    maxLines: INTRO_TITLE_MAX_LINES
  });
  const titleFontSize = fittedTitleFontSize != null ? fittedTitleFontSize : MUDGEERABA_TITLE_MAX_FONT_PX;
  const clubLogo = club.logo;
  const clubLogoWidth = clubLogo == null ? void 0 : clubLogo.width;
  const clubLogoHeight = clubLogo == null ? void 0 : clubLogo.height;
  return /* @__PURE__ */ jsx(
    VerticalStackLogoTitleName,
    {
      alignment: "center",
      Logo: /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex w-full justify-center pb-4 items-center",
          style: { maxHeight: INTRO_LOGO_MAX_PX, maxWidth: INTRO_LOGO_MAX_PX },
          children: /* @__PURE__ */ jsx(
            AnimatedImage,
            {
              src: (clubLogo == null ? void 0 : clubLogo.url) || "",
              alt: club.name,
              originalWidth: clubLogoWidth,
              originalHeight: clubLogoHeight,
              width: "auto",
              height: "auto",
              maxWidth: INTRO_LOGO_MAX_PX,
              maxHeight: INTRO_LOGO_MAX_PX,
              fit: "contain",
              preserveRatio: true,
              animation: LogoAnimations.introIn,
              exitAnimation: LogoAnimations.introOut,
              exitFrame: LogoAnimations.introExitFrame
            }
          )
        }
      ),
      Title: /* @__PURE__ */ jsx(
        "div",
        {
          className: "overflow-hidden mb-4 w-full",
          style: { maxWidth: contentWidth },
          children: /* @__PURE__ */ jsx(
            AnimatedText,
            {
              textAlign: "center",
              type: "title",
              variant: "onContainerTitle",
              letterAnimation: "word",
              animation: TextAnimations.mainTitle,
              exitAnimation: TextAnimations.introOut,
              exitFrame: TextAnimations.introExitFrame,
              fontFamily: titleFontFamily,
              className: "text-balance",
              style: {
                fontSize: titleFontSize,
                lineHeight: INTRO_TITLE_LINE_HEIGHT
              },
              children: title
            }
          )
        }
      ),
      Name: /* @__PURE__ */ jsx(
        "div",
        {
          className: "overflow-hidden w-full text-center",
          style: { maxWidth: contentWidth },
          children: /* @__PURE__ */ jsx(
            AnimatedText,
            {
              type: "titleSmall",
              textAlign: "center",
              variant: "onContainerTitle",
              letterAnimation: "word",
              animation: TextAnimations.clubName,
              exitAnimation: TextAnimations.introOut,
              exitFrame: TextAnimations.introExitFrame,
              fontFamily: nameFontFamily,
              className: "text-balance",
              children: club.name
            }
          )
        }
      ),
      PrimarySponsor: /* @__PURE__ */ jsx(
        IntroPrimarySponsors,
        {
          introIn: LogoAnimations.introIn,
          introOut: LogoAnimations.introOut,
          introExitFrame: LogoAnimations.introExitFrame
        }
      )
    }
  );
};

// src/templates/variants/mudgeeraba/components/MudgeerabaOutro.tsx
import { AbsoluteFill } from "remotion";
import { jsx as jsx2 } from "react/jsx-runtime";
var GRID_SETTINGS = {
  columns: 2,
  rows: 3,
  gap: "0.25rem",
  // Tailwind gap-1 equivalent
  containerMaxWidth: 1600,
  containerMaxHeight: 900,
  cellMaxSize: 600,
  cellPadding: 16,
  // px, matches Tailwind p-4
  cellAspectRatio: "1 / 1",
  chunkSize: OUTRO_SPONSOR_PAGE_SIZE,
  sequenceDurationInFrames: OUTRO_PAGE_DURATION_FRAMES,
  logoExitFrame: OUTRO_PAGE_LOGO_EXIT_FRAME,
  logoDelayIncrement: OUTRO_PAGE_LOGO_STAGGER_FRAMES
};
var SponsorGrid = ({ sponsors, LogoAnimations }) => /* @__PURE__ */ jsx2(
  "div",
  {
    className: "grid justify-center items-center w-full h-full",
    style: {
      gridTemplateColumns: `repeat(${GRID_SETTINGS.columns}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${GRID_SETTINGS.rows}, minmax(0, 1fr))`,
      gap: GRID_SETTINGS.gap,
      maxWidth: GRID_SETTINGS.containerMaxWidth,
      maxHeight: GRID_SETTINGS.containerMaxHeight,
      gridAutoRows: "1fr"
    },
    children: sponsors.filter((sponsor) => sponsor.logo && sponsor.logo.url).map((sponsor, idx) => {
      var _a;
      return /* @__PURE__ */ jsx2(
        "div",
        {
          className: "flex items-center justify-center w-full h-full",
          style: {
            aspectRatio: GRID_SETTINGS.cellAspectRatio,
            maxWidth: GRID_SETTINGS.cellMaxSize,
            maxHeight: GRID_SETTINGS.cellMaxSize,
            padding: GRID_SETTINGS.cellPadding
          },
          children: /* @__PURE__ */ jsx2(
            AnimatedImage,
            {
              src: sponsor.logo.url,
              alt: sponsor.name || "",
              width: "100%",
              height: "100%",
              fit: "contain",
              animation: LogoAnimations.introIn,
              exitAnimation: (_a = LogoAnimations.exitAnimation) != null ? _a : LogoAnimations.introOut,
              animationDelay: idx * GRID_SETTINGS.logoDelayIncrement,
              exitFrame: GRID_SETTINGS.logoExitFrame
            }
          )
        },
        `${sponsor.id}_${idx}`
      );
    })
  }
);
var MudgeerabaOutro = ({
  doesAccountHaveSponsors
}) => {
  var _a, _b;
  const { sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const LogoAnimations = animations.image.sponsor.logo;
  if (!doesAccountHaveSponsors) {
    return null;
  }
  const sponsorsArray = buildOutroSponsorSequence({
    primary: (_a = sponsors == null ? void 0 : sponsors.primary) != null ? _a : [],
    general: (_b = sponsors == null ? void 0 : sponsors.general) != null ? _b : []
  });
  const groups = chunkSponsors(sponsorsArray, GRID_SETTINGS.chunkSize);
  const sequences = groups.map((group) => ({
    content: /* @__PURE__ */ jsx2(AbsoluteFill, { className: "flex flex-col justify-center items-center", children: /* @__PURE__ */ jsx2(SponsorGrid, { sponsors: group, LogoAnimations }) }),
    durationInFrames: GRID_SETTINGS.sequenceDurationInFrames
  }));
  return /* @__PURE__ */ jsx2(
    TransitionSeriesWrapper,
    {
      sequences,
      transitionType: "none",
      timing: { type: "linear", durationInFrames: 1 }
    }
  );
};

// src/templates/variants/mudgeeraba/components/MudgeerabaBackground.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var MudgeerabaBackground = () => {
  return /* @__PURE__ */ jsx3(SelectTemplateBackground, {});
};

// src/templates/variants/mudgeeraba/components/MudgeerabaMainHeader.tsx
import { useVideoConfig as useVideoConfig2 } from "remotion";
import { jsx as jsx4 } from "react/jsx-runtime";
var MUDGEERABA_HEADER_TITLE_MAX_FONT_PX = 4 * TITLE_SCREEN_BASE_FONT_PX;
var HEADER_TITLE_VERTICAL_PADDING_PX = 20;
var HEADER_TEXT_CLASS = "!m-0 !px-0 w-full max-w-full leading-tight whitespace-normal break-words";
var MudgeerabaMainHeader = () => {
  var _a, _b, _c, _d, _e, _f;
  const { layout, fontClasses } = useThemeContext();
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const { width } = useVideoConfig2();
  const { heights } = layout;
  const timings = data == null ? void 0 : data.timings;
  const exitFrame = (timings == null ? void 0 : timings.FPS_MAIN) ? timings.FPS_MAIN - 30 : 0;
  const title = (_a = metadata.title) != null ? _a : "";
  const clubName = (_b = club.name) != null ? _b : "";
  const titleFontFamily = (_d = (_c = fontClasses.title) == null ? void 0 : _c.family) != null ? _d : "Unbounded";
  const nameFontFamily = (_f = (_e = fontClasses.subtitle) == null ? void 0 : _e.family) != null ? _f : "Unbounded";
  const titleContentWidth = getHeaderPanelContentWidth(
    width,
    void 0,
    HEADER_TITLE_INNER_PADDING_PX
  );
  const titleContentHeight = Math.round(heights.header * HEADER_TITLE_PANEL_HEIGHT_RATIO) - HEADER_TITLE_VERTICAL_PADDING_PX;
  const nameContentWidth = getHeaderPanelContentWidth(
    width,
    void 0,
    HEADER_NAME_INNER_PADDING_PX
  );
  const fittedTitleFontSize = useFittedFontSize({
    text: title,
    fontFamily: titleFontFamily,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "-0.025em",
    maxFontSize: MUDGEERABA_HEADER_TITLE_MAX_FONT_PX,
    minFontSize: 18,
    withinWidth: titleContentWidth,
    withinHeight: titleContentHeight,
    lineHeightRatio: 1.05,
    maxLines: 2
  });
  const fittedNameFontSize = useFittedFontSize({
    text: clubName,
    fontFamily: nameFontFamily,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    maxFontSize: 24,
    minFontSize: 14,
    withinWidth: nameContentWidth
  });
  const titleFontSize = fittedTitleFontSize != null ? fittedTitleFontSize : MUDGEERABA_HEADER_TITLE_MAX_FONT_PX;
  const nameFontSize = fittedNameFontSize != null ? fittedNameFontSize : 24;
  return /* @__PURE__ */ jsx4(
    LayeredAngularHeader,
    {
      height: heights.header,
      exitFrame,
      title: /* @__PURE__ */ jsx4(
        "div",
        {
          className: "w-full overflow-hidden text-center",
          style: { maxWidth: titleContentWidth },
          children: /* @__PURE__ */ jsx4(
            AnimatedText,
            {
              textAlign: "center",
              type: "titleSmall",
              variant: "onContainerTitle",
              letterAnimation: "none",
              animation: TextAnimations.title,
              exitAnimation: TextAnimations.copyOut,
              exitFrame,
              fontFamily: titleFontFamily,
              className: `${HEADER_TEXT_CLASS} text-balance`,
              style: { fontSize: titleFontSize, lineHeight: 1.05 },
              children: title
            }
          )
        }
      ),
      name: /* @__PURE__ */ jsx4(
        "div",
        {
          className: "w-full overflow-hidden text-center",
          style: { maxWidth: nameContentWidth },
          children: /* @__PURE__ */ jsx4(
            AnimatedText,
            {
              fontFamily: nameFontFamily,
              type: "subtitle",
              textAlign: "center",
              variant: "onContainerTitle",
              letterAnimation: "none",
              animation: TextAnimations.title,
              exitAnimation: TextAnimations.copyOut,
              exitFrame,
              className: `${HEADER_TEXT_CLASS} text-balance uppercase tracking-wide`,
              style: { fontSize: nameFontSize, lineHeight: 1.1 },
              children: clubName
            }
          )
        }
      )
    }
  );
};

// src/templates/variants/mudgeeraba/components/MudgeerabaMain.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var MudgeerabaMain = () => {
  return /* @__PURE__ */ jsx5(OneColumn, { Header: MudgeerabaMainHeader });
};

// src/templates/variants/mudgeeraba/animations.ts
var templateAnimations = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "slideInRight",
          duration: 28,
          delay: 0,
          easing: { type: "out", base: "cubic" },
          custom: { distance: 280 }
        },
        introOut: {
          type: "slideOutLeft",
          duration: 12,
          easing: { type: "in", base: "cubic" },
          custom: { distance: 180 }
        },
        introExitFrame: 60
      }
    },
    main: {
      title: {
        logo: {
          introIn: {
            type: "slideInRight",
            duration: 24,
            delay: 0,
            easing: { type: "out", base: "cubic" },
            custom: { distance: 180 }
          },
          introOut: {
            type: "slideOutLeft",
            duration: 10,
            easing: { type: "in", base: "cubic" },
            custom: { distance: 120 }
          }
        }
      },
      item: {
        logo: {
          itemIn: {
            type: "slideInRight",
            duration: 18,
            delay: 0,
            easing: { type: "out", base: "cubic" },
            custom: { distance: 140 }
          },
          itemOut: {
            type: "slideOutLeft",
            duration: 10,
            easing: { type: "in", base: "cubic" },
            custom: { distance: 100 }
          }
        }
      }
    },
    sponsor: {
      logo: {
        introIn: {
          type: "slideInRight",
          duration: 16,
          delay: 0,
          easing: { type: "out", base: "cubic" },
          custom: { distance: 140 }
        },
        introOut: {
          type: "slideOutLeft",
          duration: 8,
          easing: { type: "in", base: "cubic" },
          custom: { distance: 80 }
        }
      }
    }
  },
  text: {
    intro: {
      mainTitle: {
        type: "slideInRight",
        duration: 26,
        easing: { type: "out", base: "cubic" },
        delay: 10,
        custom: { distance: 280 }
      },
      clubName: {
        type: "slideInRight",
        duration: 22,
        easing: { type: "out", base: "cubic" },
        delay: 14,
        custom: { distance: 200 }
      },
      introOut: {
        type: "slideOutLeft",
        duration: 14,
        easing: { type: "in", base: "cubic" },
        custom: { distance: 200 }
      },
      introExitFrame: 60
    },
    main: {
      title: {
        type: "slideInRight",
        duration: 24,
        easing: { type: "out", base: "cubic" },
        delay: 0,
        custom: { distance: 280 }
      },
      copyIn: {
        type: "slideInRight",
        duration: 14,
        easing: { type: "out", base: "cubic" },
        delay: 4,
        custom: { distance: 130 }
      },
      copyOut: {
        type: "slideOutLeft",
        duration: 10,
        easing: { type: "in", base: "cubic" },
        delay: 0,
        custom: { distance: 120 }
      }
    },
    outro: {
      copyIn: {
        type: "slideInRight",
        duration: 18,
        easing: { type: "out", base: "cubic" },
        delay: 0,
        custom: { distance: 180 }
      },
      copyOut: {
        type: "slideOutLeft",
        duration: 10,
        easing: { type: "in", base: "cubic" },
        delay: 0,
        custom: { distance: 120 }
      }
    }
  },
  container: {
    main: {
      parent: {
        containerIn: {
          type: "none"
        },
        containerOut: {
          type: "none"
        }
      },
      itemContainer: {
        containerIn: {
          type: "slideInRight",
          easing: { type: "out", base: "cubic" },
          duration: 22,
          custom: { distance: "150%" }
        },
        containerOut: {
          type: "none"
        }
      },
      itemContainerOuter: {
        containerIn: {
          type: "slideInRight",
          easing: { type: "out", base: "cubic" },
          duration: 20,
          custom: { distance: 400 }
        },
        containerOut: {
          type: "slideOutLeft",
          easing: { type: "in", base: "cubic" },
          duration: 7,
          custom: { distance: "500%" }
        }
      },
      itemContainerInner: {
        containerIn: {
          type: "slideInRight",
          easing: { type: "out", base: "cubic" },
          duration: 22,
          custom: { distance: 400 }
        },
        containerOut: {
          type: "slideOutLeft",
          easing: { type: "in", base: "cubic" },
          duration: 7,
          custom: { distance: "500%" }
        }
      },
      itemContainerSecondary: {
        containerIn: {
          type: "slideInRight",
          easing: { type: "out", base: "cubic" },
          duration: 20,
          custom: { distance: 400 }
        },
        containerOut: {
          type: "slideOutLeft",
          easing: { type: "in", base: "cubic" },
          duration: 7,
          custom: { distance: "500%" }
        }
      },
      header: {
        titlePanel: {
          containerIn: {
            type: "slideInRight",
            easing: { type: "out", base: "cubic" },
            duration: 22,
            delay: 0,
            custom: { distance: 360 }
          },
          containerOut: {
            type: "slideOutLeft",
            easing: { type: "in", base: "cubic" },
            duration: 10,
            custom: { distance: 140 }
          }
        },
        namePanel: {
          containerIn: {
            type: "slideInRight",
            easing: { type: "out", base: "cubic" },
            duration: 20,
            delay: 8,
            custom: { distance: 280 }
          },
          containerOut: {
            type: "slideOutLeft",
            easing: { type: "in", base: "cubic" },
            duration: 10,
            custom: { distance: 120 }
          }
        }
      }
    }
  },
  transition: {
    Main: {
      type: "slide",
      direction: "from-left",
      durationInFrames: 15
    }
  }
};

// src/templates/variants/mudgeeraba/index.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var Mudgeeraba = ({ data }) => {
  return /* @__PURE__ */ jsx6(
    BaseTemplate,
    {
      data,
      settings: mudgeerabaTheme,
      introComponent: MudgeerabaIntro,
      outroComponent: MudgeerabaOutro,
      backgroundComponent: MudgeerabaBackground,
      mainComponentLayout: MudgeerabaMain,
      animations: templateAnimations
    }
  );
};

export {
  Mudgeeraba
};
//# sourceMappingURL=chunk-GY2YJD5X.mjs.map