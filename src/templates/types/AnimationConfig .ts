import { ImageEasingType } from "../../components/easing/types";

export interface AnimationConfig {
  image: ImageConfig;
  text: TextConfig;
  container: ContainerConfig;
  transition: TransitionConfig;
  screen?: ScreenConfig;
}

export interface ImageConfig {
  intro: {
    logo: {
      introIn: AnimationSettings;
      introOut: AnimationSettings;
      introExitFrame: number;
    };
  };
  main: {
    title: {
      logo: {
        introIn: AnimationSettings;
        introOut: AnimationSettings;
      };
    };
    item: {
      logo: {
        itemIn: AnimationSettings;
        itemOut: AnimationSettings;
      };
    };
  };
  sponsor: {
    logo: {
      introIn: AnimationSettings;
      introOut: AnimationSettings;
    };
  };
}

export interface TextConfig {
  intro: {
    mainTitle: AnimationSettings;
    clubName: AnimationSettings;
    introOut: AnimationSettings;
    introExitFrame: number;
  };
  main: {
    title: AnimationSettings;
    copyIn: AnimationSettings;
    copyOut: AnimationSettings;
  };
  outro: {
    copyIn: AnimationSettings;
    copyOut: AnimationSettings;
  };
}

export interface ContainerConfig {
  main: {
    parent: {
      containerIn: AnimationSettings;
      containerOut: AnimationSettings;
    };
    itemContainer: {
      containerIn: AnimationSettings;
      containerOut: AnimationSettings;
    };
    itemContainerOuter: {
      containerIn: AnimationSettings;
      containerOut: AnimationSettings;
    };
    itemContainerInner: {
      containerIn: AnimationSettings;
      containerOut: AnimationSettings;
    };
    itemContainerSecondary: {
      containerIn: AnimationSettings;
      containerOut: AnimationSettings;
    };
  };
  twoColumn?: {
    sidePane?: {
      containerIn?: AnimationSettings;
      containerOut?: AnimationSettings;
    };
    mainPane?: {
      containerIn?: AnimationSettings;
      containerOut?: AnimationSettings;
    };
  };
}

export interface TransitionConfig {
  Main: {
    type: string;
    direction: string;
    durationInFrames: number;
  };
}

export interface AnimationSettings {
  type: string;
  duration?: number;
  delay?: number;
  easing?: ImageEasingType;
  custom?: {
    distance: number | string;
  };
}

// Screen-level animation settings to control layout wrappers like TwoColumn
export interface ScreenConfig {
  twoColumn?: TwoColumnScreenConfig;
}

export interface TwoColumnScreenConfig {
  headerPosition?: "left" | "right";
  headerWidthPercent?: number; // default 20
  gapPx?: number; // default 0

  // Optional width animation for header pane
  animateWidth?: {
    fromPercent?: number; // defaults to headerWidthPercent
    toPercent: number;
    startFrame?: number; // default 0
    durationInFrames?: number; // default 30
    easing?: ImageEasingType; // default ease linear
  };

  // Optional slide+fade animations for side and main panes
  paneAnimations?: {
    side?: {
      startFrame?: number; // default 0
      durationInFrames?: number; // default 20
      fromPx?: number; // default: -50 if left, +50 if right
      toPx?: number; // default 0
      fromOpacity?: number; // default 0
      toOpacity?: number; // default 1
      easing?: ImageEasingType; // default out(cubic)
    };
    main?: {
      startFrame?: number; // default 5
      durationInFrames?: number; // default 25
      fromPx?: number; // default: +30 if left, -30 if right
      toPx?: number; // default 0
      fromOpacity?: number; // default 0
      toOpacity?: number; // default 1
      easing?: ImageEasingType; // default out(cubic)
    };
  };
}
