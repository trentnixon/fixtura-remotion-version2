import { AnimationConfig } from "../../types/AnimationConfig ";

export const templateAnimations: AnimationConfig = {
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
          type: "fadeOut",
          duration: 15,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 0 },
        },
        introExitFrame: 70,
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
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        custom: { distance: 2000 },
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
        type: "typewriter",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 200,
      },
    },
    outro: {
      copyIn: {
        type: "typewriter",
        duration: 1000,
        easing: { type: "inOut", base: "ease" },
        delay: 200,
      },
      copyOut: {
        type: "typewriter",
        duration: 1000,
        easing: { type: "inOut", base: "ease" },
        delay: 200,
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
            distance: 1000,
          },
        },
        containerOut: {
          type: "collapseRight",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 1000,
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
