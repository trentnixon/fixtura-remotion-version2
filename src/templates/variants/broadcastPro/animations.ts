import { AnimationConfig } from "../../types/AnimationConfig ";

/**
 * BroadcastPro animation presets (see `.skills`: components-easing-folder,
 * components-transitions-folder, create-template-variant).
 *
 * - **BroadcastSnap** (active): Snappy frame counts with slow `ease` curves (inOut/out),
 *   horizontal motion on rows/titles,
 *   unified full-bleed container slides, crisp sequence handoffs.
 * - **BroadcastGlass**: Softer variant — keep fadeInUp / fadeInDown, slightly longer
 *   container duration (18–24f), same easing family with `ease` base.
 * - **BroadcastData**: Favor fade over typewriter on dense main copy — blended into
 *   the active export via `text.main.copyIn` and `text.outro.copyIn`.
 *
 * Active export: `broadcastSnapAnimations` (BroadcastSnap + BroadcastData copy).
 */
export const broadcastSnapAnimations: AnimationConfig = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "slideInBottom",
          duration: 10,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 72 },
        },
        introOut: {
          type: "fadeOut",
          duration: 9,
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
            duration: 16,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 90 },
          },
          introOut: {
            type: "slideOutRight",
            duration: 9,
            easing: { type: "out", base: "ease" },
            custom: { distance: 90 },
          },
        },
      },
      item: {
        logo: {
          itemIn: {
            type: "slideInLeft",
            duration: 15,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 80 },
          },
          itemOut: {
            type: "slideOutRight",
            duration: 9,
            easing: { type: "out", base: "ease" },
            custom: { distance: 80 },
          },
        },
      },
    },
    sponsor: {
      logo: {
        introIn: {
          type: "slideInLeft",
          duration: 6,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 72 },
        },
        introOut: {
          type: "slideOutLeft",
          duration: 5,
          easing: { type: "out", base: "ease" },
          custom: { distance: 60 },
        },
      },
    },
  },
  text: {
    intro: {
      mainTitle: {
        type: "slideInRight",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 280 },
      },
      clubName: {
        type: "slideInRight",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 3,
        custom: { distance: 280 },
      },
      introOut: {
        type: "slideOutRight",
        duration: 9,
        easing: { type: "out", base: "ease" },
        custom: { distance: 200 },
      },
      introExitFrame: 60,
    },
    main: {
      title: {
        type: "fadeInDown",
        duration: 16,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 120 },
      },
      copyIn: {
        type: "fadeIn",
        duration: 14,
        easing: { type: "inOut", base: "ease" },
        delay: 8,
      },
      copyOut: {
        type: "fadeOut",
        duration: 9,
        easing: { type: "out", base: "ease" },
        delay: 0,
      },
    },
    outro: {
      copyIn: {
        type: "fadeIn",
        duration: 18,
        easing: { type: "inOut", base: "ease" },
        delay: 6,
      },
      copyOut: {
        type: "fadeOut",
        duration: 10,
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
      // Ladder rows (and similar list items): pop-in. Panel wrapper uses itemContainerOuter slide-in.
      itemContainer: {
        containerIn: {
          type: "scaleIn",
          easing: { type: "out", base: "ease" },
          duration: 10,
          custom: {
            startScale: 0.86,
          },
        },
        containerOut: {
          type: "none",
        },
      },
      itemContainerOuter: {
        containerIn: {
          type: "slideInBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 10,
          custom: {
            distance: "105%",
          },
        },
        containerOut: {
          type: "none",
        },
      },
      itemContainerInner: {
        containerIn: {
          type: "slideInBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 10,
          custom: {
            distance: "105%",
          },
        },
        containerOut: {
          type: "none",
        },
      },
      itemContainerSecondary: {
        containerIn: {
          type: "slideInBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 10,
          custom: {
            distance: "105%",
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
      type: "slide",
      direction: "from-right",
      durationInFrames: 12,
    },
  },
};

export const templateAnimations: AnimationConfig = broadcastSnapAnimations;
