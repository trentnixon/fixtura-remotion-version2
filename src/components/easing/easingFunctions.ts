import { Easing } from "remotion";
import { ImageEasingType } from "./types";

/*
Remotion Easing – Advanced Usage

You can use a wide variety of easing functions for all animated images and text. This gives you fine control over the "feel" of your motion, from simple linear to bouncy, elastic, or custom cubic-bezier curves.

Supported Easing Types:
1. Simple strings:
   - "linear", "ease", "quad", "cubic", "sin", "circle", "exp", "bounce"
   Example: easing: "cubic"

2. Parameterized objects:
   - Poly:      { type: "poly", n: 4 }
   - Elastic:   { type: "elastic", bounciness: 2 }
   - Back:      { type: "back", s: 1.5 }
   - Bezier:    { type: "bezier", values: [0.8, 0.22, 0.96, 0.65] }

3. Composed (in, out, inOut):
   - { type: "inOut", base: "cubic" }
   - { type: "in", base: "bounce" }
   - { type: "out", base: { type: "bezier", values: [0.8, 0.22, 0.96, 0.65] } }

Default Easing:
If you don't specify an easing, the default is:
  { type: "inOut", base: "ease" }

Visualize curves at https://easings.net/ and https://cubic-bezier.com/

Usage Example:
import { interpolate } from "remotion";
const progress = interpolate(frame, [0, 30], [0, 1], {
  easing: getImageEasingFunction(config.easing)
});

Reference Table:
| Type         | Example                                 | Description                        |
|--------------|-----------------------------------------|------------------------------------|
| String       | "cubic"                                 | Built-in curve                     |
| Poly         | { type: "poly", n: 4 }                  | Quartic/quintic, etc.              |
| Elastic      | { type: "elastic", bounciness: 2 }      | Springy, overshoots                |
| Back         | { type: "back", s: 1.5 }                | Goes back before forward           |
| Bezier       | { type: "bezier", values: [...] }       | Custom cubic bezier                |
| In/Out/InOut | { type: "inOut", base: "cubic" }        | Directional control                |
*/

/**
 * Get easing function based on type
 */
export const getImageEasingFunction = (
  easing?: ImageEasingType,
): ((t: number) => number) => {
  if (!easing) return Easing.linear;
  if (typeof easing === "string") {
    switch (easing) {
      case "linear":
        return Easing.linear;
      case "ease":
        return Easing.ease;
      case "quad":
        return Easing.quad;
      case "cubic":
        return Easing.cubic;
      case "sin":
        return Easing.sin;
      case "circle":
        return Easing.circle;
      case "exp":
        return Easing.exp;
      case "bounce":
        return Easing.bounce;
      default:
        return Easing.linear;
    }
  }
  if (typeof easing === "object") {
    switch (easing.type) {
      case "poly":
        return Easing.poly(easing.n);
      case "elastic":
        return Easing.elastic(easing.bounciness ?? 1);
      case "back":
        return Easing.back(easing.s ?? 1);
      case "bezier":
        return Easing.bezier(...easing.values);
      case "in":
        return Easing.in(getImageEasingFunction(easing.base));
      case "out":
        return Easing.out(getImageEasingFunction(easing.base));
      case "inOut":
        return Easing.inOut(getImageEasingFunction(easing.base));
      default:
        return Easing.linear;
    }
  }
  return Easing.linear;
};
