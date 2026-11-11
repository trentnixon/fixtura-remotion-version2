"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkUZX656QWjs = require('./chunk-UZX656QW.js');


var _chunkIFK37YAGjs = require('./chunk-IFK37YAG.js');













var _chunk67CZOIHNjs = require('./chunk-67CZOIHN.js');







var _chunk5OPIAWHPjs = require('./chunk-5OPIAWHP.js');

// src/templates/variants/basic/theme.ts
var basicTheme = {
  ..._chunk67CZOIHNjs.baseTheme,
  // ===== FONT CONFIGURATION =====
  fonts: {
    title: {
      family: "Heebo"
    },
    subtitle: {
      family: "Heebo"
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
      className: "text-9xl font-black tracking-tight leading-none text-center m-0 px-4"
    },
    // Title small component styles
    titleSmall: {
      className: "text-6xl font-black tracking-tight leading-none text-center m-0 px-4"
    },
    // Subtitle component styles
    subtitle: {
      className: "text-6xl font-black tracking-normal leading-none text-center m-0 px-4"
    },
    // Body text component styles
    bodyText: {
      className: "text-xl font-normal tracking-normal leading-relaxed"
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
      className: "text-5xl font-black  tracking-wide leading-snug"
    },
    Top5PlayerTeam: {
      className: "text-2xl font-semibold opacity-80 tracking-wider leading-tight"
    },
    Top5PlayerScore: {
      className: "text-7xl font-black  tracking-normal leading-tight mr-4"
    },
    Top5PlayerScoreSuffix: {
      className: "text-2xl font-black  tracking-wide leading-none"
    },
    TeamOfTheWeekPlayerName: {
      className: "text-3xl font-bold tracking-tighter leading-none"
    },
    TeamOfTheWeekTeam: {
      className: "text-xs font-normal tracking-wider leading-tight"
    },
    TeamOfTheWeekType: {
      className: "text-md font-bold uppercase tracking-wider leading-none"
    },
    TeamOfTheWeekStat: {
      className: "text-4xl font-bold tracking-tight leading-none"
    },
    ResultScore: {
      className: "text-7xl font-bold tracking-normal leading-none"
    },
    ResultScoreFirstInnings: {
      className: "text-[1.8rem] font-bold tracking-normal leading-none"
    },
    ResultScoreYetToBat: {
      className: "text-3xl font-bold  tracking-wider py-6"
    },
    ResultTeamName: {
      className: "text-2xl font-semibold  tracking-wider leading-snug"
    },
    ResultPlayerName: {
      className: "text-2xl font-semibold  tracking-wider leading-snug"
    },
    ResultPlayerScore: {
      className: "text-2xl font-semibold  tracking-wider leading-snug"
    },
    ResultSyntax: {
      className: "text-2xl font-semibold  tracking-wider leading-snug py-4 ml-4"
    },
    ResultFixtureResult: {
      className: "text-4xl font-normal text-center  tracking-wider leading-snug italic"
    },
    ResultMetaData: {
      className: "text-xl font-semibold  tracking-wider leading-snug"
    },
    ResultStatementShort: {
      className: "text-3xl font-semibold  tracking-wider leading-snug py-2 px-16"
    },
    ResultStatementText: {
      className: "text-3xl font-semibold  tracking-wider leading-snug "
    },
    ResultVS: {
      className: "text-2xl font-semibold  tracking-wider leading-snug"
    },
    RosterPlayerName: {
      className: "text-3xl font-bold  tracking-wider leading-snug"
    },
    metadataSmall: {
      className: "text-2xl font-normal  tracking-wider leading-snug"
    },
    metadataMedium: {
      className: "text-2xl font-semibold  tracking-wider leading-snug"
    },
    metadataLarge: {
      className: "text-2xl font-semibold  tracking-widest leading-snug"
    }
  },
  // ===== LAYOUT CONFIGURATION =====
  layout: {
    heights: {
      asset: 1010,
      header: 190,
      footer: 150
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

// src/templates/variants/basic/components/BasicIntro.tsx
var _jsxruntime = require('react/jsx-runtime');
var BasicIntro = () => {
  var _a, _b, _c;
  const { club, metadata } = _chunk67CZOIHNjs.useVideoDataContext.call(void 0, );
  const { animations } = _chunk67CZOIHNjs.useAnimationContext.call(void 0, );
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = _chunk67CZOIHNjs.useThemeContext.call(void 0, );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _chunkIFK37YAGjs.VerticalStackTitleLogoName,
    {
      alignment: "center",
      Logo: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "w-full h-full flex justify-center py-8 items-center max-h-[500px] max-w-[500px]", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _chunk67CZOIHNjs.AnimatedImage,
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
      Title: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "overflow-hidden mb-4", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _chunk67CZOIHNjs.AnimatedText,
        {
          textAlign: "center",
          type: "title",
          variant: "onContainerTitle",
          letterAnimation: "word",
          animation: TextAnimations.mainTitle,
          exitAnimation: TextAnimations.introOut,
          exitFrame: TextAnimations.introExitFrame,
          fontFamily: (_b = fontClasses.title) == null ? void 0 : _b.family,
          children: metadata.title
        }
      ) }),
      Name: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "overflow-hidden", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _chunk67CZOIHNjs.AnimatedText,
        {
          type: "subtitle",
          textAlign: "center",
          variant: "onContainerTitle",
          letterAnimation: "word",
          animation: TextAnimations.clubName,
          exitAnimation: TextAnimations.introOut,
          exitFrame: TextAnimations.introExitFrame,
          fontFamily: (_c = fontClasses.subtitle) == null ? void 0 : _c.family,
          children: club.name
        }
      ) }),
      PrimarySponsor: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _chunk67CZOIHNjs.IntroPrimarySponsors,
        {
          introIn: LogoAnimations.introIn,
          introOut: LogoAnimations.introOut,
          introExitFrame: LogoAnimations.introExitFrame
        }
      )
    }
  );
};

// src/templates/variants/basic/components/BasicOutro.tsx
var _remotion = require('remotion');

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
  chunkSize: _chunk5OPIAWHPjs.OUTRO_SPONSOR_PAGE_SIZE,
  sequenceDurationInFrames: _chunk5OPIAWHPjs.OUTRO_PAGE_DURATION_FRAMES,
  logoExitFrame: _chunk5OPIAWHPjs.OUTRO_PAGE_LOGO_EXIT_FRAME,
  logoDelayIncrement: _chunk5OPIAWHPjs.OUTRO_PAGE_LOGO_STAGGER_FRAMES
};
var SponsorGrid = ({ sponsors, LogoAnimations }) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "div",
        {
          className: "flex items-center justify-center w-full h-full",
          style: {
            aspectRatio: GRID_SETTINGS.cellAspectRatio,
            maxWidth: GRID_SETTINGS.cellMaxSize,
            maxHeight: GRID_SETTINGS.cellMaxSize,
            padding: GRID_SETTINGS.cellPadding
          },
          children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            _chunk67CZOIHNjs.AnimatedImage,
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
var BasicOutro = ({
  doesAccountHaveSponsors
}) => {
  var _a, _b;
  const { sponsors } = _chunk67CZOIHNjs.useVideoDataContext.call(void 0, );
  const { animations } = _chunk67CZOIHNjs.useAnimationContext.call(void 0, );
  const LogoAnimations = animations.image.sponsor.logo;
  if (!doesAccountHaveSponsors) {
    return null;
  }
  const sponsorsArray = _chunk5OPIAWHPjs.buildOutroSponsorSequence.call(void 0, {
    primary: (_a = sponsors == null ? void 0 : sponsors.primary) != null ? _a : [],
    general: (_b = sponsors == null ? void 0 : sponsors.general) != null ? _b : []
  });
  const groups = _chunk5OPIAWHPjs.chunkSponsors.call(void 0, sponsorsArray, GRID_SETTINGS.chunkSize);
  const sequences = groups.map((group) => ({
    content: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _remotion.AbsoluteFill, { className: "flex flex-col justify-center items-center", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, SponsorGrid, { sponsors: group, LogoAnimations }) }),
    durationInFrames: GRID_SETTINGS.sequenceDurationInFrames
  }));
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _chunk67CZOIHNjs.TransitionSeriesWrapper,
    {
      sequences,
      transitionType: "none",
      timing: { type: "linear", durationInFrames: 1 }
    }
  );
};

// src/templates/variants/basic/components/BasicBackground.tsx

var BasicBackground = () => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunk67CZOIHNjs.SelectTemplateBackground, {});
};

// src/templates/variants/basic/components/BasicMainHeader.tsx

var BasicMainHeader = () => {
  var _a, _b;
  const { layout, fontClasses } = _chunk67CZOIHNjs.useThemeContext.call(void 0, );
  const { club, metadata, data, isAccountClub } = _chunk67CZOIHNjs.useVideoDataContext.call(void 0, );
  const { animations } = _chunk67CZOIHNjs.useAnimationContext.call(void 0, );
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;
  const { heights } = layout;
  const { timings } = data;
  const exitFrame = _chunk67CZOIHNjs.calculateMainHeaderExitFrame.call(void 0, timings);
  const OrgLogo = () => {
    var _a2;
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "w-full h-full flex justify-center items-center ", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "w-full h-full flex justify-center items-center rounded-none max-h-[120px] max-w-[150px]", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _chunk67CZOIHNjs.AnimatedImage,
      {
        src: (_a2 = club.logo) == null ? void 0 : _a2.url,
        width: "auto",
        height: "auto",
        fit: "contain",
        className: "rounded-none",
        animation: LogoAnimations.introIn,
        exitAnimation: LogoAnimations.introOut,
        exitFrame
      }
    ) }) });
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _chunk67CZOIHNjs.TwoColumnHeaderTitle,
    {
      height: heights.header,
      alignment: "start",
      Logo: isAccountClub ? null : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, OrgLogo, {}),
      Title: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _chunk67CZOIHNjs.AnimatedText,
        {
          textAlign: "center",
          type: "subtitle",
          variant: "onContainerTitle",
          letterAnimation: "none",
          animation: TextAnimations.title,
          exitAnimation: TextAnimations.copyOut,
          exitFrame,
          fontFamily: (_a = fontClasses.title) == null ? void 0 : _a.family,
          children: metadata.title
        }
      ),
      Name: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _chunk67CZOIHNjs.AnimatedText,
        {
          fontFamily: (_b = fontClasses.subtitle) == null ? void 0 : _b.family,
          type: "subtitle",
          textAlign: "right",
          variant: "onContainerTitle",
          letterAnimation: "word",
          animation: TextAnimations.title,
          exitAnimation: TextAnimations.copyOut,
          exitFrame,
          children: club.name
        }
      )
    }
  );
};

// src/templates/variants/basic/components/BasicMain.tsx

var BasicMain = () => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkUZX656QWjs.OneColumn, { Header: BasicMainHeader });
};

// src/templates/variants/basic/animations.ts
var templateAnimations = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "slideInBottom",
          duration: 15,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 100 }
        },
        introOut: {
          type: "fadeOut",
          duration: 15,
          easing: { type: "inOut", base: "ease" }
        },
        introExitFrame: 60
      }
    },
    main: {
      title: {
        logo: {
          introIn: {
            type: "slideInTop",
            duration: 30,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 100 }
          },
          introOut: {
            type: "fadeOut",
            duration: 15,
            easing: { type: "inOut", base: "ease" }
          }
        }
      },
      item: {
        logo: {
          itemIn: {
            type: "slideInTop",
            duration: 30,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 100 }
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
          type: "slideInLeft",
          duration: 10,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 100 }
        },
        introOut: {
          type: "fadeOut",
          duration: 5,
          easing: { type: "inOut", base: "ease" }
        }
      }
    }
  },
  text: {
    intro: {
      mainTitle: {
        type: "fadeInUp",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 100 }
      },
      clubName: {
        type: "fadeInUp",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 3,
        custom: { distance: 100 }
      },
      introOut: {
        type: "fadeOutUp",
        duration: 15,
        easing: { type: "inOut", base: "ease" }
      },
      introExitFrame: 60
    },
    main: {
      title: {
        type: "fadeInDown",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 200 }
      },
      copyIn: {
        type: "typewriter",
        duration: 10,
        easing: { type: "inOut", base: "ease" },
        delay: 200
      },
      copyOut: {
        type: "fadeOut",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 200
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
        type: "fadeOut",
        duration: 10,
        easing: { type: "inOut", base: "ease" },
        delay: 200
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
          type: "slideInBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: "105%"
          }
        },
        containerOut: {
          type: "slideOutBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: {
            distance: "105%"
          }
        }
      },
      itemContainerOuter: {
        containerIn: {
          type: "slideInBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 200
          }
        },
        containerOut: {
          type: "slideOutBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: {
            distance: "105%"
          }
        }
      },
      itemContainerInner: {
        containerIn: {
          type: "slideInBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 200
          }
        },
        containerOut: {
          type: "slideOutBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: {
            distance: "105%"
          }
        }
      },
      itemContainerSecondary: {
        containerIn: {
          type: "slideInBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 200
          }
        },
        containerOut: {
          type: "slideOutBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: {
            distance: "105%"
          }
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
  }
};

// src/templates/variants/basic/index.tsx

var Basic = ({ data }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _chunk67CZOIHNjs.BaseTemplate,
    {
      data,
      settings: basicTheme,
      introComponent: BasicIntro,
      outroComponent: BasicOutro,
      backgroundComponent: BasicBackground,
      mainComponentLayout: BasicMain,
      animations: templateAnimations
    }
  );
};


exports.Basic = Basic;
//# sourceMappingURL=basic-HGOL7K2W.js.map