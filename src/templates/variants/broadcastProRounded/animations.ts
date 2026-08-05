import { AnimationConfig } from "../../types/AnimationConfig ";

/**
 * BroadcastProRounded animation presets (see `.skills`: components-easing-folder,
 * components-transitions-folder, create-template-variant).
 *
 * - **BroadcastSnap**: Snappy frame counts — used by BroadcastPro (square).
 * - **BroadcastGlass** (active): Softer fadeInUp / fadeInDown, longer container
 *   durations (18–24f), gentle scale, real exit fades — suits rounded glass UI.
 * - **BroadcastData**: Favor fade motion over typewriter on dense main copy —
 *   blended via `text.main.copyIn` / `text.outro.copyIn`.
 *
 * Active export: `broadcastGlassAnimations` (BroadcastGlass + BroadcastData copy).
 */
export const broadcastGlassAnimations: AnimationConfig = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "slideInBottom",
          duration: 18,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 56 },
        },
        introOut: {
          type: "fadeOut",
          duration: 14,
          easing: { type: "out", base: "ease" },
        },
        introExitFrame: 60,
      },
    },
    main: {
      title: {
        logo: {
          introIn: {
            type: "slideInLeft",
            duration: 20,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 64 },
          },
          introOut: {
            type: "fadeOut",
            duration: 14,
            easing: { type: "out", base: "ease" },
          },
        },
      },
      item: {
        logo: {
          itemIn: {
            type: "fadeIn",
            duration: 16,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
          },
          itemOut: {
            type: "fadeOut",
            duration: 12,
            easing: { type: "out", base: "ease" },
          },
        },
      },
    },
    sponsor: {
      logo: {
        introIn: {
          type: "fadeIn",
          duration: 14,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
        },
        introOut: {
          type: "fadeOut",
          duration: 10,
          easing: { type: "out", base: "ease" },
        },
      },
    },
  },
  text: {
    intro: {
      mainTitle: {
        type: "fadeInUp",
        duration: 20,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 28 },
      },
      clubName: {
        type: "fadeInUp",
        duration: 20,
        easing: { type: "inOut", base: "ease" },
        delay: 6,
        custom: { distance: 28 },
      },
      introOut: {
        type: "fadeOut",
        duration: 14,
        easing: { type: "out", base: "ease" },
      },
      introExitFrame: 60,
    },
    main: {
      title: {
        type: "fadeInDown",
        duration: 20,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 28 },
      },
      copyIn: {
        type: "fadeInUp",
        duration: 18,
        easing: { type: "inOut", base: "ease" },
        delay: 4,
        custom: { distance: 16 },
      },
      copyOut: {
        type: "fadeOut",
        duration: 14,
        easing: { type: "out", base: "ease" },
        delay: 0,
      },
    },
    outro: {
      copyIn: {
        type: "fadeInUp",
        duration: 20,
        easing: { type: "inOut", base: "ease" },
        delay: 6,
        custom: { distance: 20 },
      },
      copyOut: {
        type: "fadeOut",
        duration: 14,
        easing: { type: "out", base: "ease" },
        delay: 0,
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
      // Match rows / list items: soft rise + mild scale (no hard pop).
      itemContainer: {
        containerIn: {
          type: "scaleIn",
          easing: { type: "out", base: "ease" },
          duration: 20,
          custom: {
            startScale: 0.96,
          },
        },
        containerOut: {
          type: "fadeOut",
          easing: { type: "out", base: "ease" },
          duration: 14,
        },
      },
      itemContainerOuter: {
        containerIn: {
          type: "fadeIn",
          easing: { type: "inOut", base: "ease" },
          duration: 22,
        },
        containerOut: {
          type: "fadeOut",
          easing: { type: "out", base: "ease" },
          duration: 16,
        },
      },
      itemContainerInner: {
        containerIn: {
          type: "fadeIn",
          easing: { type: "inOut", base: "ease" },
          duration: 18,
        },
        containerOut: {
          type: "fadeOut",
          easing: { type: "out", base: "ease" },
          duration: 14,
        },
      },
      itemContainerSecondary: {
        containerIn: {
          type: "fadeIn",
          easing: { type: "inOut", base: "ease" },
          duration: 18,
        },
        containerOut: {
          type: "fadeOut",
          easing: { type: "out", base: "ease" },
          duration: 14,
        },
      },
    },
  },
  transition: {
    Main: {
      type: "fade",
      direction: "from-right",
      durationInFrames: 20,
    },
  },
};

export const templateAnimations: AnimationConfig = broadcastGlassAnimations;
