import { ContainerShadow } from "../types";

/**
 * Generates styles based on container shadow
 */
export const getShadowStyles = (
  shadow: ContainerShadow,
): React.CSSProperties => {
  switch (shadow) {
    case "sm":
      return { boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" };
    case "md":
      return {
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      };
    case "lg":
      return {
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      };
    case "xl":
      return {
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      };
    case "inner":
      return { boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)" };
    case "none":
    default:
      return {};
  }
};
