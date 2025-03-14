import { ContainerSize } from "../types";

/**
 * Generates styles based on container size
 */
export const getSizeStyles = (size: ContainerSize): React.CSSProperties => {
  switch (size) {
    case "xs":
      return { width: "16.666667%", height: "auto" }; // 1/6
    case "sm":
      return { width: "25%", height: "auto" }; // 1/4
    case "md":
      return { width: "50%", height: "auto" }; // 1/2
    case "lg":
      return { width: "75%", height: "auto" }; // 3/4
    case "xl":
      return { width: "83.333333%", height: "auto" }; // 5/6
    case "full":
      return { width: "100%", height: "100%" };
    case "auto":
    default:
      return { width: "auto", height: "auto" };
  }
};
