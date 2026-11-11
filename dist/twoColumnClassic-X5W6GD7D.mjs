import {
  VerticalStackLogoTitleName
} from "./chunk-42Q3FJK7.mjs";
import {
  AnimatedContainer,
  AnimatedImage,
  AnimatedText,
  BaseTemplate,
  IntroPrimarySponsors,
  RouteToComposition,
  SelectTemplateBackground,
  TransitionSeriesWrapper,
  TwoColumnVerticalHeaderLogoTitle,
  VerticalProgressTimer,
  baseTheme,
  calculateMainHeaderExitFrame,
  getCompositionSectionHeight,
  useAnimationContext,
  useThemeContext,
  useVideoDataContext
} from "./chunk-PD4YF4PN.mjs";
import {
  OUTRO_PAGE_DURATION_FRAMES,
  OUTRO_PAGE_LOGO_EXIT_FRAME,
  OUTRO_PAGE_LOGO_STAGGER_FRAMES,
  OUTRO_SPONSOR_PAGE_SIZE,
  buildOutroSponsorSequence,
  chunkSponsors
} from "./chunk-S5B7PBPK.mjs";

// src/templates/variants/twoColumnClassic/theme.ts
var basicTheme = {
  ...baseTheme,
  // ===== FONT CONFIGURATION =====
  fonts: {
    title: {
      family: "Impact"
    },
    subtitle: {
      family: "Impact"
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
      className: "text-9xl font-normal tracking-normal leading-snug text-center m-0 px-4"
    },
    titleSmall: {
      className: "text-7xl font-normal tracking-normal leading-none text-center m-0 mt-8 px-4"
    },
    // Subtitle component styles
    subtitle: {
      className: "text-9xl font-normal tracking-normal leading-none text-center m-0  px-4"
    },
    // Body text component styles
    bodyText: {
      className: "text-xl font-normal tracking-tight leading-tight"
    },
    // Player name component styles
    playerName: {
      className: "text-3xl font-black tracking-tight leading-tight"
    },
    // Score component styles
    score: {
      className: "text-6xl font-black tracking-tight leading-tight"
    },
    // Team name component styles
    teamName: {
      className: "text-4xl font-black tracking-tight leading-tight"
    },
    // Label component styles
    label: {
      className: "text-lg font-medium tracking-tight leading-tight"
    },
    // Ladder label component styles
    ladderGradeLabel: {
      className: "text-3xl font-medium tracking-tight leading-tight"
    },
    ladderTeamName: {
      className: "text-3xl font-medium tracking-tight leading-tight"
    },
    ladderTeamPoints: {
      className: "text-3xl font-normal tracking-tight leading-tight"
    },
    Top5PlayerName: {
      className: "text-4xl font-black tracking-tight leading-tight"
    },
    Top5PlayerTeam: {
      className: "text-2xl font-normal tracking-tight leading-tight"
    },
    Top5PlayerScore: {
      className: "text-6xl font-black  tracking-tight leading-tight mr-2"
    },
    Top5PlayerScoreSuffix: {
      className: "text-3xl font-black  tracking-tight leading-loose"
    },
    ResultScore: {
      className: "text-4xl font-black  tracking-tight leading-tight "
    },
    ResultScoreFirstInnings: {
      className: "text-4xl font-black  tracking-tight leading-tight "
    },
    ResultScoreYetToBat: {
      className: "text-4xl font-bold  tracking-tight py-6"
    },
    ResultTeamName: {
      className: "text-3xl font-normal  tracking-tight leading-tight"
    },
    ResultPlayerName: {
      className: "text-[1.6rem] font-normal  tracking-tight leading-tight"
    },
    ResultPlayerScore: {
      className: "text-[1.6rem] font-bold  tracking-tight leading-tight"
    },
    ResultSyntax: {
      className: "text-[1.4rem] font-semibold  tracking-tight leading-tight py-4 ml-4"
    },
    ResultFixtureResult: {
      className: "text-4xl font-normal text-center tracking-tight leading-tight italic"
    },
    ResultMetaData: {
      className: "text-2xl font-normal  tracking-tight leading-tight"
    },
    ResultStatementShort: {
      className: "text-6xl font-normal tracking-tight leading-tight text-center"
    },
    ResultStatementText: {
      className: "text-5xl font-normal tracking-tight leading-tight text-center"
    },
    ResultVS: {
      className: "text-3xl font-normal  tracking-tight leading-tight"
    },
    RosterPlayerName: {
      className: "text-3xl font-bold  tracking-tight py-2 leading-tight"
    },
    metadataSmall: {
      className: "text-2xl font-normal  tracking-tight leading-tight"
    },
    metadataMedium: {
      className: "text-3xl font-semibold  tracking-tight leading-tight"
    },
    metadataLarge: {
      className: "text-4xl font-semibold  tracking-tight leading-tight"
    },
    TeamOfTheWeekPlayerName: {
      className: "text-3xl font-black tracking-tight leading-none"
    },
    TeamOfTheWeekTeam: {
      className: "text-2xl font-normal tracking-tight leading-none"
    },
    TeamOfTheWeekType: {
      className: "text-xl font-normal tracking-wider leading-none"
    },
    TeamOfTheWeekStat: {
      className: "text-5xl font-black tracking-tight leading-none mr-2"
    }
  },
  // ===== LAYOUT CONFIGURATION =====
  layout: {
    heights: {
      asset: 1230,
      header: 230,
      footer: 120
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
      container: "rounded-none "
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

// src/templates/variants/twoColumnClassic/components/ClassicIntro.tsx
import { jsx } from "react/jsx-runtime";
var ClassicIntro = () => {
  var _a, _b, _c;
  const { club, metadata } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = useThemeContext();
  return /* @__PURE__ */ jsx(
    VerticalStackLogoTitleName,
    {
      alignment: "center",
      Logo: /* @__PURE__ */ jsx("div", { className: "w-full h-full flex justify-center py-0 mb-16 items-center max-h-[500px] max-w-[800px]", children: /* @__PURE__ */ jsx(
        AnimatedImage,
        {
          src: ((_a = club.logo) == null ? void 0 : _a.url) || "",
          alt: club.name,
          width: "auto",
          height: "auto",
          fit: "contain",
          animation: LogoAnimations.introIn,
          exitAnimation: LogoAnimations.introOut,
          exitFrame: LogoAnimations.introExitFrame
        }
      ) }),
      Title: /* @__PURE__ */ jsx("div", { className: "overflow-hidden mb-4 mt-[-1.5em]", children: /* @__PURE__ */ jsx(
        AnimatedText,
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
          children: metadata.title
        }
      ) }),
      Name: /* @__PURE__ */ jsx("div", { className: "overflow-hidden mt-[-2.5em]", children: /* @__PURE__ */ jsx(
        AnimatedText,
        {
          type: "titleSmall",
          textAlign: "center",
          variant: "onContainerTitle",
          letterAnimation: "word",
          animation: TextAnimations.clubName,
          exitAnimation: TextAnimations.introOut,
          exitFrame: TextAnimations.introExitFrame,
          fontFamily: (_c = fontClasses.copy) == null ? void 0 : _c.family,
          children: club.name
        }
      ) }),
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

// src/templates/variants/twoColumnClassic/components/ClassicOutro.tsx
import { AbsoluteFill } from "remotion";
import { jsx as jsx2 } from "react/jsx-runtime";
var GRID_SETTINGS = {
  columns: 2,
  rows: 3,
  gap: "0.25rem",
  containerMaxWidth: 1600,
  containerMaxHeight: 900,
  cellMaxSize: 600,
  cellPadding: 16,
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
var ClassicOutro = ({
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

// src/templates/variants/twoColumnClassic/components/ClassicBackground.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var ClassicBackground = () => {
  return /* @__PURE__ */ jsx3(SelectTemplateBackground, {});
};

// src/components/layout/screen/TwoColumn.tsx
import { AbsoluteFill as AbsoluteFill2 } from "remotion";
import { Fragment, jsx as jsx4, jsxs } from "react/jsx-runtime";
var TwoColumn = ({
  Header,
  headerPosition,
  headerWidthPercent,
  gapPx,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const { layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { FPS_MAIN } = timings;
  const screenConfig = (_b = (_a = animations == null ? void 0 : animations.screen) == null ? void 0 : _a.twoColumn) != null ? _b : {};
  const effectiveHeaderPosition = (_c = headerPosition != null ? headerPosition : screenConfig.headerPosition) != null ? _c : "left";
  const effectiveHeaderWidthPercent = (_d = headerWidthPercent != null ? headerWidthPercent : screenConfig.headerWidthPercent) != null ? _d : 20;
  const effectiveGapPx = (_e = gapPx != null ? gapPx : screenConfig.gapPx) != null ? _e : 0;
  const currentHeaderWidth = effectiveHeaderWidthPercent;
  const mainWidth = Math.max(0, 100 - currentHeaderWidth);
  const contentHeightPx = getCompositionSectionHeight(layout.heights);
  const sideTranslatePx = 0;
  const sideOpacity = 1;
  const mainTranslatePx = 0;
  const mainOpacity = 1;
  const twoColumnContainer = (_g = (_f = animations == null ? void 0 : animations.container) == null ? void 0 : _f.twoColumn) != null ? _g : {};
  const SidePane = /* @__PURE__ */ jsx4(
    "div",
    {
      style: {
        width: `${currentHeaderWidth}%`,
        height: "100%",
        // Keep computed transform/opacity until we fully migrate to container configs for motion distance
        transform: `translateX(${sideTranslatePx}px)`,
        opacity: sideOpacity
      },
      children: /* @__PURE__ */ jsx4(
        AnimatedContainer,
        {
          type: "glass",
          style: {
            height: "100%",
            width: "100%",
            borderRight: "1px solid rgba(255, 255, 255, 0.25)"
          },
          animation: (_i = (_h = twoColumnContainer.sidePane) == null ? void 0 : _h.containerIn) != null ? _i : "none",
          exitAnimation: (_k = (_j = twoColumnContainer.sidePane) == null ? void 0 : _j.containerOut) != null ? _k : "none",
          className: "shadow-2xl shadow-black/50",
          children: /* @__PURE__ */ jsx4(Header, {})
        }
      )
    }
  );
  const MainPane = /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        width: `${mainWidth}%`,
        height: "100%",
        position: "relative",
        minWidth: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transform: `translateX(${mainTranslatePx}px)`,
        opacity: mainOpacity
      },
      children: [
        /* @__PURE__ */ jsx4(
          AnimatedContainer,
          {
            type: "basic",
            style: { height: "100%", width: "100%", display: "flex" },
            animation: (_m = (_l = twoColumnContainer.mainPane) == null ? void 0 : _l.containerIn) != null ? _m : "none",
            children: RouteToComposition()
          }
        ),
        /* @__PURE__ */ jsx4(VerticalProgressTimer, { FRAMES: FPS_MAIN != null ? FPS_MAIN : 0 })
      ]
    }
  );
  return /* @__PURE__ */ jsx4(AbsoluteFill2, { children: /* @__PURE__ */ jsx4(
    "div",
    {
      className: `flex flex-col h-full w-full ${className}`.trim(),
      style,
      children: /* @__PURE__ */ jsx4(
        "div",
        {
          className: "relative flex",
          style: {
            height: `${contentHeightPx}px`,
            gap: effectiveGapPx,
            alignItems: "stretch"
          },
          children: effectiveHeaderPosition === "left" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            SidePane,
            MainPane
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            MainPane,
            SidePane
          ] })
        }
      )
    }
  ) });
};

// src/templates/variants/twoColumnClassic/components/ClassicMainHeaderRotated.tsx
import React from "react";

// src/templates/variants/twoColumnClassic/utils/titleLookup.ts
var titleLookup = [
  {
    term: "Batting Performances",
    use: "Batting"
  },
  {
    term: "Bowling Performances",
    use: "Bowling"
  }
  // Add more mappings as needed
];
var getSimplifiedTitle = (title) => {
  if (!title) return title;
  const normalizedTitle = title.trim().replace(/\s+/g, " ");
  const lookup = titleLookup.find(
    (item) => item.term.toLowerCase() === normalizedTitle.toLowerCase()
  );
  return lookup ? lookup.use : title;
};

// src/templates/variants/twoColumnClassic/components/ClassicMainHeaderRotated.tsx
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var ClassicMainHeaderRotated = () => {
  var _a, _b, _c, _d;
  const { fontClasses } = useThemeContext();
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;
  const { timings } = data;
  const exitFrame = calculateMainHeaderExitFrame(timings);
  const displayTitle = getSimplifiedTitle(metadata.title || "");
  const [rotatedMinHeight, setRotatedMinHeight] = React.useState(0);
  const measureRef = React.useRef(null);
  React.useLayoutEffect(() => {
    if (measureRef.current) {
      setRotatedMinHeight(measureRef.current.offsetWidth);
    }
  }, [displayTitle, (_a = fontClasses.title) == null ? void 0 : _a.family]);
  const TitleNode = /* @__PURE__ */ jsxs2(
    "div",
    {
      className: "relative w-full flex justify-center items-center overflow-visible",
      style: { minHeight: rotatedMinHeight ? rotatedMinHeight + 8 : void 0 },
      children: [
        /* @__PURE__ */ jsx5("div", { style: { transform: "rotate(-90deg)", transformOrigin: "center" }, children: /* @__PURE__ */ jsx5(
          AnimatedText,
          {
            textAlign: "center",
            type: "subtitle",
            variant: "onContainerTitle",
            letterAnimation: "none",
            animation: TextAnimations.title,
            exitAnimation: TextAnimations.copyOut,
            exitFrame,
            fontFamily: (_b = fontClasses.title) == null ? void 0 : _b.family,
            className: "mt-0 whitespace-nowrap",
            children: displayTitle
          }
        ) }),
        /* @__PURE__ */ jsx5(
          "div",
          {
            ref: measureRef,
            className: "absolute invisible whitespace-nowrap pointer-events-none",
            style: { left: -99999, top: -99999 },
            children: /* @__PURE__ */ jsx5(
              AnimatedText,
              {
                textAlign: "center",
                type: "subtitle",
                variant: "onContainerTitle",
                letterAnimation: "none",
                animation: TextAnimations.title,
                exitAnimation: TextAnimations.copyOut,
                exitFrame,
                fontFamily: (_c = fontClasses.title) == null ? void 0 : _c.family,
                className: "mt-0 whitespace-nowrap",
                children: displayTitle
              }
            )
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ jsx5(
    TwoColumnVerticalHeaderLogoTitle,
    {
      height: 1350,
      alignment: "center",
      Logo: /* @__PURE__ */ jsx5("div", { className: "w-full h-full flex justify-center items-center mt-4 mb-4", children: /* @__PURE__ */ jsx5("div", { className: "w-full h-full flex items-center", children: /* @__PURE__ */ jsx5(
        AnimatedImage,
        {
          src: (_d = club.logo) == null ? void 0 : _d.url,
          width: "auto",
          height: "auto",
          fit: "contain",
          className: "max-h-[220px] max-w-[220px]",
          animation: LogoAnimations.introIn,
          exitAnimation: LogoAnimations.introOut,
          exitFrame
        }
      ) }) }),
      Title: TitleNode,
      Name: null
    }
  );
};

// src/templates/variants/twoColumnClassic/components/ClassicMain.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var ClassicMain = () => {
  return /* @__PURE__ */ jsx6(
    TwoColumn,
    {
      Header: ClassicMainHeaderRotated,
      headerWidthPercent: 18,
      headerPosition: "left",
      gapPx: 0
    }
  );
};

// src/templates/variants/twoColumnClassic/animations.ts
var templateAnimations = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "ripple",
          duration: 90,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 50 }
        },
        introOut: {
          type: "slideOutTop",
          duration: 15,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 1e3 }
        },
        introExitFrame: 70
      }
    },
    main: {
      title: {
        logo: {
          introIn: {
            type: "slideInLeft",
            duration: 15,
            delay: 30,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 100 }
          },
          introOut: {
            type: "slideOutLeft",
            duration: 15,
            easing: { type: "inOut", base: "ease" }
          }
        }
      },
      item: {
        logo: {
          itemIn: {
            type: "fadeIn",
            duration: 15,
            delay: 10,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 50 }
          },
          itemOut: {
            type: "fadeOut",
            duration: 15,
            easing: { type: "inOut", base: "ease" }
          }
        }
      }
    },
    sponsor: {
      logo: {
        introIn: {
          type: "fadeIn",
          duration: 15,
          delay: 5,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 50 }
        },
        introOut: {
          type: "fadeOut",
          duration: 15,
          easing: { type: "inOut", base: "ease" }
        }
      }
    }
  },
  text: {
    intro: {
      mainTitle: {
        type: "slideInRight",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 1e3 }
      },
      clubName: {
        type: "slideInRight",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 5,
        custom: { distance: 1e3 }
      },
      introOut: {
        type: "slideOutRight",
        duration: 20,
        easing: { type: "inOut", base: "ease" },
        custom: { distance: 2e3 }
      },
      introExitFrame: 70
    },
    main: {
      title: {
        type: "fadeInDown",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 20,
        custom: { distance: 500 }
      },
      copyIn: {
        type: "typewriter",
        duration: 10,
        easing: { type: "inOut", base: "ease" },
        delay: 200
      },
      copyOut: {
        type: "slideOutDown",
        duration: 40,
        easing: { type: "inOut", base: "ease" },
        custom: { distance: 500 },
        delay: 0
      }
    },
    outro: {
      copyIn: {
        type: "typewriter",
        duration: 1e3,
        easing: { type: "inOut", base: "ease" },
        delay: 200
      },
      copyOut: {
        type: "typewriter",
        duration: 1e3,
        easing: { type: "inOut", base: "ease" },
        delay: 200
      }
    }
  },
  container: {
    main: {
      parent: {
        containerIn: {
          type: "revealLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 1e3
          }
        },
        containerOut: {
          type: "collapseRight",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 1e3
          }
        }
      },
      itemContainer: {
        containerIn: {
          type: "revealLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: "105%"
          }
        },
        containerOut: {
          type: "collapseRight",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: {
            distance: "105%"
          }
        }
      },
      itemContainerOuter: {
        containerIn: {
          type: "slideInRight",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 200
          }
        },
        containerOut: {
          type: "none"
        }
      },
      itemContainerInner: {
        containerIn: {
          type: "scaleIn",
          easing: { type: "inOut", base: "ease" },
          duration: 10,
          custom: {
            distance: 100
          }
        },
        containerOut: {
          type: "none"
        }
      },
      itemContainerSecondary: {
        containerIn: {
          type: "slideInLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 200
          }
        },
        containerOut: {
          type: "none"
        }
      }
    },
    twoColumn: {
      sidePane: {
        containerIn: {
          type: "revealLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: { distance: 100 }
        },
        containerOut: {
          type: "collapseLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: { distance: 100 }
        }
      },
      mainPane: {
        containerIn: {
          type: "revealLeft",
          easing: { type: "out", base: "cubic" },
          duration: 20,
          custom: { distance: 200 }
        },
        containerOut: {
          type: "none"
        }
      }
    }
  },
  transition: {
    Main: {
      type: "none",
      direction: "none",
      durationInFrames: 15
    }
  },
  screen: {
    twoColumn: {
      headerPosition: "left",
      headerWidthPercent: 22,
      gapPx: 12,
      animateWidth: {
        fromPercent: 16,
        toPercent: 22,
        startFrame: 0,
        durationInFrames: 30,
        easing: "linear"
      }
    }
  }
};

// src/templates/variants/twoColumnClassic/index.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var TwoColumnClassic = ({
  data
}) => {
  return /* @__PURE__ */ jsx7(
    BaseTemplate,
    {
      data,
      settings: basicTheme,
      introComponent: ClassicIntro,
      outroComponent: ClassicOutro,
      backgroundComponent: ClassicBackground,
      mainComponentLayout: ClassicMain,
      animations: templateAnimations
    }
  );
};
export {
  TwoColumnClassic
};
//# sourceMappingURL=twoColumnClassic-X5W6GD7D.mjs.map