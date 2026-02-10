import { AnimationConfig } from "../../types/AnimationConfig ";

export const templateAnimations: AnimationConfig = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "slideInRight",
          duration: 28,
          delay: 0,
          easing: { type: "out", base: "cubic" },
          custom: { distance: 280 },
        },
        introOut: {
          type: "slideOutLeft",
          duration: 12,
          easing: { type: "in", base: "cubic" },
          custom: { distance: 180 },
        },
        introExitFrame: 60,
      },
    },
    main: {
      title: {
        logo: {
          introIn: {
            type: "slideInRight",
            duration: 24,
            delay: 0,
            easing: { type: "out", base: "cubic" },
            custom: { distance: 180 },
          },
          introOut: {
            type: "slideOutLeft",
            duration: 10,
            easing: { type: "in", base: "cubic" },
            custom: { distance: 120 },
          },
        },
      },
      item: {
        logo: {
          itemIn: {
            type: "slideInRight",
            duration: 18,
            delay: 0,
            easing: { type: "out", base: "cubic" },
            custom: { distance: 140 },
          },
          itemOut: {
            type: "slideOutLeft",
            duration: 10,
            easing: { type: "in", base: "cubic" },
            custom: { distance: 100 },
          },
        },
      },
    },
    sponsor: {
      logo: {
        introIn: {
          type: "slideInRight",
          duration: 16,
          delay: 0,
          easing: { type: "out", base: "cubic" },
          custom: { distance: 140 },
        },
        introOut: {
          type: "slideOutLeft",
          duration: 8,
          easing: { type: "in", base: "cubic" },
          custom: { distance: 80 },
        },
      },
    },
  },
  text: {
    intro: {
      mainTitle: {
        type: "slideInRight",
        duration: 26,
        easing: { type: "out", base: "cubic" },
        delay: 10,
        custom: { distance: 280 },
      },
      clubName: {
        type: "slideInRight",
        duration: 22,
        easing: { type: "out", base: "cubic" },
        delay: 14,
        custom: { distance: 200 },
      },
      introOut: {
        type: "slideOutLeft",
        duration: 14,
        easing: { type: "in", base: "cubic" },
        custom: { distance: 200 },
      },
      introExitFrame: 60,
    },
    main: {
      title: {
        type: "slideInRight",
        duration: 24,
        easing: { type: "out", base: "cubic" },
        delay: 0,
        custom: { distance: 280 },
      },
      copyIn: {
        type: "slideInRight",
        duration: 14,
        easing: { type: "out", base: "cubic" },
        delay: 4,
        custom: { distance: 130 },
      },
      copyOut: {
        type: "slideOutLeft",
        duration: 10,
        easing: { type: "in", base: "cubic" },
        delay: 0,
        custom: { distance: 120 },
      },
    },
    outro: {
      copyIn: {
        type: "slideInRight",
        duration: 18,
        easing: { type: "out", base: "cubic" },
        delay: 0,
        custom: { distance: 180 },
      },
      copyOut: {
        type: "slideOutLeft",
        duration: 10,
        easing: { type: "in", base: "cubic" },
        delay: 0,
        custom: { distance: 120 },
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
          easing: { type: "out", base: "cubic" },
          duration: 22,
          custom: { distance: "150%" },
        },
        containerOut: {
          type: "none",
        },
      },
      itemContainerOuter: {
        containerIn: {
          type: "slideInRight",
          easing: { type: "out", base: "cubic" },
          duration: 20,
          custom: { distance: 400 },
        },
        containerOut: {
          type: "slideOutLeft",
          easing: { type: "in", base: "cubic" },
          duration: 7,
          custom: { distance: "500%" },
        },
      },
      itemContainerInner: {
        containerIn: {
          type: "slideInRight",
          easing: { type: "out", base: "cubic" },
          duration: 22,
          custom: { distance: 400 },
        },
        containerOut: {
          type: "slideOutLeft",
          easing: { type: "in", base: "cubic" },
          duration: 7,
          custom: { distance: "500%" },
        },
      },
      itemContainerSecondary: {
        containerIn: {
          type: "slideInRight",
          easing: { type: "out", base: "cubic" },
          duration: 20,
          custom: { distance: 400 },
        },
        containerOut: {
          type: "slideOutLeft",
          easing: { type: "in", base: "cubic" },
          duration: 7,
          custom: { distance: "500%" },
        },
      },
    },
  },
  transition: {
    Main: {
      type: "slide",
      direction: "from-left",
      durationInFrames: 26,
    },
  },
};
