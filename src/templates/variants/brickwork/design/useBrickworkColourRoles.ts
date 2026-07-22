import { useThemeContext } from "../../../../core/context/ThemeContext";
import {
  BrickworkColourRoles,
  getBrickworkColourRoles,
} from "./colours";

export const useBrickworkColourRoles = (): BrickworkColourRoles => {
  const { selectedPalette } = useThemeContext();
  return getBrickworkColourRoles(selectedPalette);
};
