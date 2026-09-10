import { useMemo } from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { deriveScorelineThemeVars } from "./applyScorelineTheme";

export const useScorelineTheme = () => {
  const { colors } = useThemeContext();

  return useMemo(
    () =>
      deriveScorelineThemeVars({
        primary: colors?.primary,
        secondary: colors?.secondary,
      }),
    [colors?.primary, colors?.secondary],
  );
};
