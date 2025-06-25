//import { ThemePalettes } from "../../../core/context/types/ThemeContextTypes";
import { DesignPalette } from "../../../core/utils/designPalettes";
import { ContainerType } from "../types";

/**
 * Generates styles based on container type
 */
export const getTypeStyles = (
  type: ContainerType,
  selectedPalette: DesignPalette,
): React.CSSProperties => {
  switch (type) {
    case "border":
      return {
        border: "1px solid rgba(255, 255, 255, 0.2)",
      };
    case "borderBottom":
      return {
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      };
    case "borderTop":
      return {
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
      };
    case "borderLeft":
      return {
        borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
      };
    case "borderRight":
      return {
        borderRight: "1px solid rgba(255, 255, 255, 0.2)",
      };
    case "card":
      return {
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      };
    case "gradient":
      return {
        background: `linear-gradient(to bottom right, ${selectedPalette.background.gradient.primary}, ${selectedPalette.background.gradient.secondary})`,
      };
    case "basic":
    case "full":
    default:
      return {};
  }
};
