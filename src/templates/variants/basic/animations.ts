export const templateAnimations = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "slideInBottom",
          duration: 15,
          delay: 0,
          easing: "easeInOut",
          custom: { distance: 100 },
        },
        introOut: {
          type: "fadeOut",
          duration: 15,
          easing: "easeInOut",
        },
        introExitFrame: 60,
      },
    },
    main: {
      title: {
        logo: {
          introIn: {
            type: "slideInTop",
            duration: 30,
            delay: 0,
            easing: "easeInOut",
            custom: { distance: 100 },
          },
          introOut: {
            type: "fadeOut",
            duration: 15,
            easing: "easeInOut",
          },
        },
      },
      item: {
        logo: {
          itemIn: {
            type: "slideInTop",
            duration: 30,
            delay: 0,
            easing: "easeInOut",
            custom: { distance: 100 },
          },
          itemOut: {
            type: "fadeOut",
            duration: 15,
            easing: "easeInOut",
          },
        },
      },
    },
  },
  text: {
    intro: {
      mainTitle: {
        type: "fadeInUp",
        duration: 30,
        easing: "easeInOut",
        delay: 0,
        custom: { distance: 200 },
      },
      clubName: {
        type: "fadeInUp",
        duration: 30,
        easing: "easeInOut",
        delay: 5,
        custom: { distance: 200 },
      },
      introOut: {
        type: "fadeOutUp",
        duration: 15,
        easing: "easeInOut",
      },
      introExitFrame: 60,
    },
    main: {
      title: {
        type: "fadeInDown",
        duration: 30,
        easing: "easeInOut",
        delay: 0,
        custom: { distance: 200 },
      },
      copyIn: {
        type: "typewriter",
        duration: 10,
        easing: "easeInOut",
        delay: 200,
      },
      copyOut: {
        type: "typewriter",
        duration: 15,
        easing: "easeInOut",
        delay: 200,
      },
    },
    outro: {
      copyIn: {
        type: "typewriter",
        duration: 1000,
        easing: "linear",
        delay: 200,
      },
      copyOut: {
        type: "typewriter",
        duration: 1000,
        easing: "linear",
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
          type: "slideInBottom",
          easing: "easeInOut",
          duration: 15,
          custom: {
            distance: "105%",
          },
        },
        containerOut: {
          type: "slideOutBottom",
          easing: "easeInOut",
          duration: 20,
          custom: {
            distance: "105%",
          },
        },
      },
      itemContainerOuter: {
        containerIn: {
          type: "slideInBottom",
          easing: "easeInOut",
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
          type: "slideInBottom",
          easing: "easeInOut",
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
          type: "slideInBottom",
          easing: "easeInOut",
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
      type: "slide",
      direction: "from-bottom",
      durationInFrames: 15,
    },
  },
};
