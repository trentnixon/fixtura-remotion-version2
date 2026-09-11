import { useCallback, useMemo } from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { deriveScorelineThemeVars } from "./applyScorelineTheme";
import { csClass } from "./componentStyles";

export const useScorelineTheme = () => {
  const { colors, componentStyles } = useThemeContext();

  const themeVars = useMemo(
    () =>
      deriveScorelineThemeVars({
        primary: colors?.primary,
        secondary: colors?.secondary,
      }),
    [colors?.primary, colors?.secondary],
  );

  const cs = useCallback(
    (key: string) => csClass(componentStyles, key),
    [componentStyles],
  );

  return { ...themeVars, cs, componentStyles };
};
