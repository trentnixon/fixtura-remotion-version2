import { Easing } from "remotion";
import { EasingType } from "./types";

/**
 * Get easing function based on type
 */
export const getEasingFunction = (
  easing?: EasingType,
): ((t: number) => number) => {
  if (!easing) return Easing.linear;

  switch (easing) {
    case "linear":
      return Easing.linear;
    case "ease":
      return Easing.ease;
    case "easeIn":
      return Easing.in(Easing.ease);
    case "easeOut":
      return Easing.out(Easing.ease);
    case "easeInOut":
      return Easing.inOut(Easing.ease);
    case "cubic":
      return Easing.cubic;
    case "bounce":
      return Easing.bounce;
    case "elastic":
      return Easing.elastic(1);
    default:
      return Easing.linear;
  }
};
