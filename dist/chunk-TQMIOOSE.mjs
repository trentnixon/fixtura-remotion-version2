import {
  AnimatedImage,
  TransitionSeriesWrapper,
  useAnimationContext,
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

// src/templates/variants/broadcastPro/components/BroadcastProOutro.tsx
import { AbsoluteFill } from "remotion";
import { jsx } from "react/jsx-runtime";
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
var SponsorGrid = ({ sponsors, LogoAnimations }) => /* @__PURE__ */ jsx(
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
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex items-center justify-center w-full h-full",
          style: {
            aspectRatio: GRID_SETTINGS.cellAspectRatio,
            maxWidth: GRID_SETTINGS.cellMaxSize,
            maxHeight: GRID_SETTINGS.cellMaxSize,
            padding: GRID_SETTINGS.cellPadding
          },
          children: /* @__PURE__ */ jsx(
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
var BroadcastProOutro = ({
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
    content: /* @__PURE__ */ jsx(AbsoluteFill, { className: "flex flex-col justify-center items-center", children: /* @__PURE__ */ jsx(SponsorGrid, { sponsors: group, LogoAnimations }) }),
    durationInFrames: GRID_SETTINGS.sequenceDurationInFrames
  }));
  return /* @__PURE__ */ jsx(
    TransitionSeriesWrapper,
    {
      sequences,
      transitionType: "none",
      timing: { type: "linear", durationInFrames: 1 }
    }
  );
};

// src/templates/variants/broadcastPro/animations.ts
var broadcastSnapAnimations = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "slideInBottom",
          duration: 10,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 72 }
        },
        introOut: {
          type: "fadeOut",
          duration: 9,
          easing: { type: "out", base: "ease" }
        },
        introExitFrame: 60
      }
    },
    main: {
      title: {
        logo: {
          introIn: {
            type: "slideInLeft",
            duration: 16,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 90 }
          },
          introOut: {
            type: "slideOutRight",
            duration: 9,
            easing: { type: "out", base: "ease" },
            custom: { distance: 90 }
          }
        }
      },
      item: {
        logo: {
          itemIn: {
            type: "slideInLeft",
            duration: 15,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 80 }
          },
          itemOut: {
            type: "slideOutRight",
            duration: 9,
            easing: { type: "out", base: "ease" },
            custom: { distance: 80 }
          }
        }
      }
    },
    sponsor: {
      logo: {
        introIn: {
          type: "slideInLeft",
          duration: 6,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 72 }
        },
        introOut: {
          type: "slideOutLeft",
          duration: 5,
          easing: { type: "out", base: "ease" },
          custom: { distance: 60 }
        }
      }
    }
  },
  text: {
    intro: {
      mainTitle: {
        type: "slideInRight",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 280 }
      },
      clubName: {
        type: "slideInRight",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 3,
        custom: { distance: 280 }
      },
      introOut: {
        type: "slideOutRight",
        duration: 9,
        easing: { type: "out", base: "ease" },
        custom: { distance: 200 }
      },
      introExitFrame: 60
    },
    main: {
      title: {
        type: "fadeInDown",
        duration: 16,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 120 }
      },
      copyIn: {
        type: "fadeIn",
        duration: 14,
        easing: { type: "inOut", base: "ease" },
        delay: 8
      },
      copyOut: {
        type: "fadeOut",
        duration: 9,
        easing: { type: "out", base: "ease" },
        delay: 0
      }
    },
    outro: {
      copyIn: {
        type: "fadeIn",
        duration: 18,
        easing: { type: "inOut", base: "ease" },
        delay: 6
      },
      copyOut: {
        type: "fadeOut",
        duration: 10,
        easing: { type: "out", base: "ease" },
        delay: 0
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
      // Ladder rows (and similar list items): pop-in. Panel wrapper uses itemContainerOuter slide-in.
      itemContainer: {
        containerIn: {
          type: "scaleIn",
          easing: { type: "out", base: "ease" },
          duration: 10,
          custom: {
            startScale: 0.86
          }
        },
        containerOut: {
          type: "none"
        }
      },
      itemContainerOuter: {
        containerIn: {
          type: "slideInBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 10,
          custom: {
            distance: "105%"
          }
        },
        containerOut: {
          type: "none"
        }
      },
      itemContainerInner: {
        containerIn: {
          type: "slideInBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 10,
          custom: {
            distance: "105%"
          }
        },
        containerOut: {
          type: "none"
        }
      },
      itemContainerSecondary: {
        containerIn: {
          type: "slideInBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 10,
          custom: {
            distance: "105%"
          }
        },
        containerOut: {
          type: "none"
        }
      }
    }
  },
  transition: {
    Main: {
      type: "slide",
      direction: "from-right",
      durationInFrames: 15
    }
  }
};
var templateAnimations = broadcastSnapAnimations;

export {
  BroadcastProOutro,
  broadcastSnapAnimations,
  templateAnimations
};
//# sourceMappingURL=chunk-TQMIOOSE.mjs.map