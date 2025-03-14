import { Easing } from "remotion";
import { ContainerEasingType } from "./animationTypes";

/**
 * Get the appropriate easing function based on the easing type
 */
export const getContainerEasingFunction = (
  easing?: ContainerEasingType,
): ((t: number) => number) => {
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
      return (t: number) => {
        const p = 0.3;
        return (
          Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
        );
      };
    default:
      return Easing.inOut(Easing.ease);
  }
};
