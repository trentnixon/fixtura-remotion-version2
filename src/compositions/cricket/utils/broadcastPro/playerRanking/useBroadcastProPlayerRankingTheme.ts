import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../index";
import { useBroadcastProTheme } from "../useBroadcastProTheme";

export const useBroadcastProPlayerRankingTheme = () => {
  const { fontClasses, componentStyles } = useThemeContext();
  const { glass, text, accent, headingFont, surfaceBase, selectedPalette } =
    useBroadcastProTheme();

  const cs = (key: string) => csClass(componentStyles, key);

  return {
    glass,
    text,
    accent,
    headingFont: headingFont ?? fontClasses.heading?.family ?? "font-teko",
    cs,
    surfaceBase,
    selectedPalette,
  };
};
