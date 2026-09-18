import { AnimationConfig } from "../../types/AnimationConfig ";
import { broadcastSnapAnimations } from "../broadcastPro/animations";

/** Ledger / intro panel: unfold top → bottom; collapse downward on exit. */
const nightSessionPanelIn = {
  type: "revealTop",
  easing: { type: "inOut", base: "ease" },
  duration: 14,
} as const;

const nightSessionPanelOut = {
  type: "collapseBottom",
  easing: { type: "out", base: "ease" },
  duration: 12,
} as const;

/** Row shell: full drop (structure); copy tiers use inner/secondary presets below. */
const nightSessionRowIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 12,
  custom: { distance: "55%" },
} as const;

const nightSessionRowOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 10,
  custom: { distance: "55%" },
} as const;

/** Copy inside rows / ledger: shorter travel, trails shell (delay via tier offsets). */
const nightSessionCopyIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 13,
  custom: { distance: "30%" },
} as const;

const nightSessionCopyOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 9,
  custom: { distance: "30%" },
} as const;

const nightSessionStatsCopyIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 13,
  custom: { distance: "24%" },
} as const;

const nightSessionStatsCopyOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 9,
  custom: { distance: "24%" },
} as const;

const nightSessionIntroCopyIn = {
  type: "slideInTop",
  easing: { type: "inOut", base: "ease" },
  duration: 14,
  delay: 8,
  custom: { distance: 40 },
} as const;

const nightSessionIntroCopyOut = {
  type: "slideOutBottom",
  easing: { type: "out", base: "ease" },
  duration: 10,
  custom: { distance: 36 },
} as const;

const nightSessionIntroPanelIn = nightSessionPanelIn;
const nightSessionIntroPanelOut = nightSessionPanelOut;

/**
 * Night Session motion: vertical top → bottom in, mirrored downward exit.
 * Intro/outro/text/image inherit BroadcastSnap; main containers use vertical drop.
 */
export const templateAnimations: AnimationConfig = {
  ...broadcastSnapAnimations,
  text: {
    ...broadcastSnapAnimations.text,
    intro: {
      ...broadcastSnapAnimations.text.intro,
      mainTitle: nightSessionIntroCopyIn,
      clubName: {
        ...nightSessionIntroCopyIn,
        delay: 5,
      },
      introOut: nightSessionIntroCopyOut,
    },
  },
  container: {
    intro: {
      panel: {
        containerIn: nightSessionIntroPanelIn,
        containerOut: nightSessionIntroPanelOut,
      },
    },
    main: {
      parent: {
        containerIn: { type: "none" },
        containerOut: { type: "none" },
      },
      itemContainer: {
        containerIn: nightSessionRowIn,
        containerOut: nightSessionRowOut,
      },
      itemContainerOuter: {
        containerIn: nightSessionPanelIn,
        containerOut: nightSessionPanelOut,
      },
      itemContainerInner: {
        containerIn: nightSessionCopyIn,
        containerOut: nightSessionCopyOut,
      },
      itemContainerSecondary: {
        containerIn: nightSessionStatsCopyIn,
        containerOut: nightSessionStatsCopyOut,
      },
    },
  },
  transition: {
    Main: {
      type: "slide",
      direction: "from-top",
      durationInFrames: 12,
    },
  },
};

export const nightSessionAnimations = templateAnimations;
