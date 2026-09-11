import { AnimationConfig } from "../../types/AnimationConfig ";
import { broadcastSnapAnimations } from "../broadcastPro/animations";

/** Ledger panel: wipe reveal left → right, collapse out to the right. */
const scorelinePanelIn = {
  type: "revealLeft",
  easing: { type: "inOut", base: "ease" },
  duration: 14,
};

const scorelinePanelOut = {
  type: "collapseRight",
  easing: { type: "out", base: "ease" },
  duration: 12,
};

/** List rows / cards: swipe in from the left, exit to the right. */
const scorelineRowIn = {
  type: "slideInLeft",
  easing: { type: "inOut", base: "ease" },
  duration: 12,
  custom: { distance: "105%" },
};

const scorelineRowOut = {
  type: "slideOutRight",
  easing: { type: "out", base: "ease" },
  duration: 10,
  custom: { distance: "105%" },
};

/**
 * Scoreline motion: horizontal L→R in, mirrored R exit.
 * Intro/outro/text presets inherit BroadcastSnap; main containers use horizontal swipe.
 */
export const templateAnimations: AnimationConfig = {
  ...broadcastSnapAnimations,
  container: {
    main: {
      parent: {
        containerIn: { type: "none" },
        containerOut: { type: "none" },
      },
      itemContainer: {
        containerIn: scorelineRowIn,
        containerOut: scorelineRowOut,
      },
      itemContainerOuter: {
        containerIn: scorelinePanelIn,
        containerOut: scorelinePanelOut,
      },
      itemContainerInner: {
        containerIn: scorelineRowIn,
        containerOut: scorelineRowOut,
      },
      itemContainerSecondary: {
        containerIn: scorelineRowIn,
        containerOut: scorelineRowOut,
      },
    },
  },
  transition: {
    Main: {
      type: "slide",
      direction: "from-left",
      durationInFrames: 12,
    },
  },
};
