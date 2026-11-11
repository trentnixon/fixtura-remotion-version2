import { OneColumn } from "./chunk-IJBICBEW.mjs";
import { VerticalStackLogoTitleName } from "./chunk-42Q3FJK7.mjs";
import {
  AnimatedImage,
  AnimatedText,
  BaseTemplate,
  IntroPrimarySponsors,
  SelectTemplateBackground,
  TransitionSeriesWrapper,
  VerticalHeaderTitleOnly,
  baseTheme,
  calculateMainHeaderExitFrame,
  useAnimationContext,
  useThemeContext,
  useVideoDataContext,
} from "./chunk-YUUFNNHG.mjs";
import {
  OUTRO_PAGE_DURATION_FRAMES,
  OUTRO_PAGE_LOGO_EXIT_FRAME,
  OUTRO_PAGE_LOGO_STAGGER_FRAMES,
  OUTRO_SPONSOR_PAGE_SIZE,
  buildOutroSponsorSequence,
  chunkSponsors,
} from "./chunk-S5B7PBPK.mjs";

// src/templates/variants/thunder/theme.ts
var basicTheme = {
  ...baseTheme,
  // ===== FONT CONFIGURATION =====
  fonts: {
    title: {
      family: "Monument Extended",
    },
    subtitle: {
      family: "Monument Extended",
    },
    copy: {
      family: "Tungsten",
    },
  },
  // ===== COMPONENT STYLES =====
  // Ready-to-use style objects for components
  componentStyles: {
    // Title component styles
    title: {
      className:
        "text-9xl font-normal tracking-wider leading-snug text-center m-0 px-4",
    },
    titleSmall: {
      className:
        "text-7xl font-normal tracking-wider leading-none text-center m-0 mt-8 px-4",
    },
    // Subtitle component styles
    subtitle: {
      className:
        "text-6xl font-normal tracking-wider leading-tight text-center m-0  px-4",
    },
    // Body text component styles
    bodyText: {
      className: "text-xl font-normal tracking-wider leading-tight",
    },
    // Player name component styles
    playerName: {
      className: "text-3xl font-black tracking-tight leading-tight",
    },
    // Score component styles
    score: {
      className: "text-6xl font-black tracking-tight leading-tight",
    },
    // Team name component styles
    teamName: {
      className: "text-4xl font-black tracking-tight leading-tight",
    },
    // Label component styles
    label: {
      className: "text-lg font-medium tracking-wider leading-tight",
    },
    // Ladder label component styles
    ladderGradeLabel: {
      className: "text-3xl font-medium tracking-wider leading-tight",
    },
    ladderTeamName: {
      className: "text-4xl font-medium tracking-wider leading-tight",
    },
    ladderTeamPoints: {
      className: "text-4xl font-bold tracking-wider leading-tight",
    },
    Top5PlayerName: {
      className: "text-6xl font-black tracking-wider leading-tight",
    },
    Top5PlayerTeam: {
      className:
        "text-3xl font-semibold opacity-80 tracking-wider leading-tight",
    },
    Top5PlayerScore: {
      className: "text-7xl font-black  tracking-wider leading-tight mr-2",
    },
    Top5PlayerScoreSuffix: {
      className: "text-2xl font-black  tracking-wide leading-loose",
    },
    ResultScore: {
      className: "text-4xl font-bold  tracking-wider leading-tight ",
    },
    ResultScoreFirstInnings: {
      className: "text-4xl font-bold  tracking-wider leading-tight ",
    },
    ResultScoreYetToBat: {
      className: "text-4xl font-bold  tracking-wider py-6",
    },
    ResultTeamName: {
      className: "text-4xl font-semibold  tracking-wider leading-tight",
    },
    ResultPlayerName: {
      className: "text-3xl font-semibold  tracking-wider leading-tight",
    },
    ResultPlayerScore: {
      className: "text-3xl font-semibold  tracking-wider leading-tight",
    },
    ResultSyntax: {
      className:
        "text-2xl font-semibold  tracking-wider leading-tight py-4 ml-4",
    },
    ResultFixtureResult: {
      className:
        "text-4xl font-normal text-center tracking-wider leading-tight italic",
    },
    ResultMetaData: {
      className: "text-3xl font-semibold  tracking-wider leading-tight",
    },
    ResultStatementShort: {
      className:
        "text-3xl font-semibold  tracking-wider leading-snug py-2 px-16",
    },
    ResultStatementText: {
      className: "text-3xl font-semibold  tracking-wider leading-snug ",
    },
    ResultVS: {
      className: "text-3xl font-semibold  tracking-wider leading-tight",
    },
    RosterPlayerName: {
      className: "text-4xl font-bold  tracking-wider leading-tight",
    },
    metadataSmall: {
      className: "text-3xl font-normal  tracking-wider leading-tight",
    },
    metadataMedium: {
      className: "text-4xl font-semibold  tracking-wider leading-tight",
    },
    metadataLarge: {
      className: "text-5xl font-semibold  tracking-widest leading-tight",
    },
    TeamOfTheWeekPlayerName: {
      className: "text-5xl font-black tracking-wider leading-none",
    },
    TeamOfTheWeekTeam: {
      className:
        "text-2xl font-semibold opacity-80 tracking-wider leading-none",
    },
    TeamOfTheWeekType: {
      className: "text-2xl font-normal tracking-wider leading-none",
    },
    TeamOfTheWeekStat: {
      className: "text-6xl font-black tracking-wider leading-none mr-2",
    },
  },
  // ===== LAYOUT CONFIGURATION =====
  layout: {
    heights: {
      asset: 1040,
      header: 190,
      footer: 120,
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

// src/templates/variants/thunder/utils/titleLookup.ts
var titleLookup = [
  {
    term: "Batting Performances",
    use: "Batting",
  },
  {
    term: "Bowling Performances",
    use: "Bowling",
  },
  // Add more mappings as needed
];
var getSimplifiedTitle = (title) => {
  if (!title) return title;
  const normalizedTitle = title.trim().replace(/\s+/g, " ");
  const lookup = titleLookup.find(
    (item) => item.term.toLowerCase() === normalizedTitle.toLowerCase(),
  );
  return lookup ? lookup.use : title;
};

// src/templates/variants/thunder/components/ThunderIntro.tsx
import { jsx } from "react/jsx-runtime";
var ThunderIntro = () => {
  var _a, _b;
  const { club, metadata } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = useThemeContext();
  const displayTitle = getSimplifiedTitle(metadata.title || "");
  return /* @__PURE__ */ jsx(VerticalStackLogoTitleName, {
    alignment: "center",
    Logo: /* @__PURE__ */ jsx("div", {
      className:
        "w-full h-full flex justify-center py-0 mb-16 items-center max-h-[500px] max-w-[800px]",
      children: /* @__PURE__ */ jsx(AnimatedImage, {
        src: ((_a = club.logo) == null ? void 0 : _a.url) || "",
        alt: club.name,
        width: "auto",
        height: "auto",
        fit: "contain",
        animation: LogoAnimations.introIn,
        exitAnimation: LogoAnimations.introOut,
        exitFrame: LogoAnimations.introExitFrame,
      }),
    }),
    Title: /* @__PURE__ */ jsx("div", {
      className: "overflow-hidden mb-0 mt-[-1.5em]",
      children: /* @__PURE__ */ jsx(AnimatedText, {
        textAlign: "center",
        type: "title",
        variant: "onContainerTitle",
        letterAnimation: "word",
        animation: TextAnimations.mainTitle,
        exitAnimation: TextAnimations.introOut,
        exitFrame: TextAnimations.introExitFrame,
        fontFamily: (_b = fontClasses.title) == null ? void 0 : _b.family,
        children: displayTitle,
      }),
    }),
    Name: null,
    PrimarySponsor: /* @__PURE__ */ jsx(IntroPrimarySponsors, {
      introIn: LogoAnimations.introIn,
      introOut: LogoAnimations.introOut,
      introExitFrame: LogoAnimations.introExitFrame,
    }),
  });
};

// src/templates/variants/thunder/components/ThunderOutro.tsx
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
  logoDelayIncrement: OUTRO_PAGE_LOGO_STAGGER_FRAMES,
};
var SponsorGrid = ({ sponsors, LogoAnimations }) =>
  /* @__PURE__ */ jsx2("div", {
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
        return /* @__PURE__ */ jsx2(
          "div",
          {
            className: "flex items-center justify-center w-full h-full",
            style: {
              aspectRatio: GRID_SETTINGS.cellAspectRatio,
              maxWidth: GRID_SETTINGS.cellMaxSize,
              maxHeight: GRID_SETTINGS.cellMaxSize,
              padding: GRID_SETTINGS.cellPadding,
            },
            children: /* @__PURE__ */ jsx2(AnimatedImage, {
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
            }),
          },
          `${sponsor.id}_${idx}`,
        );
      }),
  });
var ThunderOutro = ({ doesAccountHaveSponsors }) => {
  var _a, _b;
  const { sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const LogoAnimations = animations.image.sponsor.logo;
  if (!doesAccountHaveSponsors) {
    return null;
  }
  const sponsorsArray = buildOutroSponsorSequence({
    primary:
      (_a = sponsors == null ? void 0 : sponsors.primary) != null ? _a : [],
    general:
      (_b = sponsors == null ? void 0 : sponsors.general) != null ? _b : [],
  });
  const groups = chunkSponsors(sponsorsArray, GRID_SETTINGS.chunkSize);
  const sequences = groups.map((group) => ({
    content: /* @__PURE__ */ jsx2(AbsoluteFill, {
      className: "flex flex-col justify-center items-center",
      children: /* @__PURE__ */ jsx2(SponsorGrid, {
        sponsors: group,
        LogoAnimations,
      }),
    }),
    durationInFrames: GRID_SETTINGS.sequenceDurationInFrames,
  }));
  return /* @__PURE__ */ jsx2(TransitionSeriesWrapper, {
    sequences,
    transitionType: "none",
    timing: { type: "linear", durationInFrames: 1 },
  });
};

// src/templates/variants/thunder/components/ThunderBackground.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var ThunderBackground = () => {
  return /* @__PURE__ */ jsx3(SelectTemplateBackground, {});
};

// src/templates/variants/thunder/components/ThunderMainHeader.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var ThunderMainHeader = () => {
  var _a, _b;
  const { layout, fontClasses } = useThemeContext();
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;
  const { heights } = layout;
  const { timings } = data;
  const exitFrame = calculateMainHeaderExitFrame(timings);
  return /* @__PURE__ */ jsx4(VerticalHeaderTitleOnly, {
    height: heights.header,
    alignment: "center",
    Logo: /* @__PURE__ */ jsx4("div", {
      className: "w-full h-full flex justify-center items-center ",
      children: /* @__PURE__ */ jsx4("div", {
        className:
          "w-full h-full flex items-center rounded-none max-h-[120px] max-w-[150px]",
        children: /* @__PURE__ */ jsx4(AnimatedImage, {
          src: (_a = club.logo) == null ? void 0 : _a.url,
          width: "auto",
          height: "auto",
          fit: "contain",
          className: "rounded-none",
          animation: LogoAnimations.introIn,
          exitAnimation: LogoAnimations.introOut,
          exitFrame,
        }),
      }),
    }),
    Title: /* @__PURE__ */ jsx4(AnimatedText, {
      textAlign: "center",
      type: "subtitle",
      variant: "onContainerTitle",
      letterAnimation: "none",
      animation: TextAnimations.title,
      exitAnimation: TextAnimations.copyOut,
      exitFrame,
      fontFamily: (_b = fontClasses.title) == null ? void 0 : _b.family,
      className: "mt-8",
      children: metadata.title,
    }),
    Name: null,
  });
};

// src/templates/variants/thunder/components/ThunderMain.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var ThunderMain = () => {
  return /* @__PURE__ */ jsx5(OneColumn, { Header: ThunderMainHeader });
};

// src/templates/variants/thunder/animations.ts
var templateAnimations = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "statReveal",
          duration: 15,
          delay: 5,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 50 },
        },
        introOut: {
          type: "slideOutTop",
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
            type: "statReveal",
            duration: 15,
            delay: 5,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 50 },
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
            type: "statReveal",
            duration: 15,
            delay: 10,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 50 },
          },
          itemOut: {
            type: "slideOutTop",
            duration: 15,
            easing: { type: "inOut", base: "ease" },
          },
        },
      },
    },
    sponsor: {
      logo: {
        introIn: {
          type: "statReveal",
          duration: 15,
          delay: 5,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 50 },
        },
        introOut: {
          type: "slideOutTop",
          duration: 15,
          easing: { type: "inOut", base: "ease" },
        },
      },
    },
  },
  text: {
    intro: {
      mainTitle: {
        type: "typewriter",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 5,
        custom: { distance: 500 },
      },
      clubName: {
        type: "typewriter",
        duration: 20,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 200 },
      },
      introOut: {
        type: "slideOutRight",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        custom: { distance: 900 },
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
        type: "typewriter",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 200,
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
        type: "typewriter",
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
          type: "none",
        },
        containerOut: {
          type: "none",
        },
      },
      itemContainer: {
        containerIn: {
          type: "slideInRight",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: "105%",
          },
        },
        containerOut: {
          type: "slideOutLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: {
            distance: "105%",
          },
        },
      },
      itemContainerOuter: {
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

// src/templates/variants/thunder/index.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var Thunder = ({ data }) => {
  return /* @__PURE__ */ jsx6(BaseTemplate, {
    data,
    settings: basicTheme,
    introComponent: ThunderIntro,
    outroComponent: ThunderOutro,
    backgroundComponent: ThunderBackground,
    mainComponentLayout: ThunderMain,
    animations: templateAnimations,
  });
};
export { Thunder };
//# sourceMappingURL=thunder-4NZ2VUZ3.mjs.map
