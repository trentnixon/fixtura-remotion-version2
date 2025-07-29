import { AnimationConfig } from "../../types/AnimationConfig ";

export const templateAnimations: AnimationConfig = {
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
          custom: { distance: 2000 },
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
