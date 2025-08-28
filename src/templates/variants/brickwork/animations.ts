import { AnimationConfig } from "../../types/AnimationConfig ";

export const templateAnimations: AnimationConfig = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "slideInLeft", //slideInLeft
          duration: 15,
          delay: 15,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 500 },
        },
        introOut: {
          type: "slideOutRight",
          duration: 10,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 500 },
        },
        introExitFrame: 75,
      },
    },
    main: {
      title: {
        logo: {
          introIn: {
            type: "slideInTop",
            duration: 30,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 100 },
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
            type: "slideInRight",
            duration: 30,
            delay: 10,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 100 },
          },
          itemOut: {
            type: "slideOutLeft",
            duration: 15,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 100 },
          },
        },
      },
    },
    sponsor: {
      logo: {
        introIn: {
          type: "slideInBottom",
          duration: 15,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 100 },
        },
        introOut: {
          type: "collapseRight",
          duration: 15,
          easing: { type: "inOut", base: "ease" },
        },
      },
    },
  },
  text: {
    intro: {
      mainTitle: {
        type: "slideInRight",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 1000 },
      },
      clubName: {
        type: "slideInRight",
        duration: 30,
        easing: { type: "inOut", base: "ease" },
        delay: 5,
        custom: { distance: 1000 },
      },
      introOut: {
        type: "slideOutRight",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        custom: { distance: 1000 },
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
        type: "fadeOutUp",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
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
        type: "fadeOutUp",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
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
          type: "revealLeft",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
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
          type: "revealLeft",
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
          type: "revealLeft",
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
      itemContainerSecondary: {
        containerIn: {
          type: "revealRight",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          delay: 15,
          custom: {
            distance: 100,
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
