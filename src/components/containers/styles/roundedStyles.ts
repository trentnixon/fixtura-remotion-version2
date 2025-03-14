import { ContainerRounded } from "../types";

/**
 * Generates styles based on container rounded corners
 */
export const getRoundedStyles = (
  rounded: ContainerRounded,
): React.CSSProperties => {
  switch (rounded) {
    case "sm":
      return { borderRadius: "0.125rem" }; // 2px
    case "md":
      return { borderRadius: "0.375rem" }; // 6px
    case "lg":
      return { borderRadius: "0.5rem" }; // 8px
    case "xl":
      return { borderRadius: "0.75rem" }; // 12px
    case "full":
      return { borderRadius: "9999px" };
    case "none":
    default:
      return {};
  }
};
