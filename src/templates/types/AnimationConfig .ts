import { ImageEasingType } from "../../components/images/config/types";

export interface AnimationConfig {
  image: ImageConfig;
  text: TextConfig;
  container: ContainerConfig;
  transition: TransitionConfig;
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
