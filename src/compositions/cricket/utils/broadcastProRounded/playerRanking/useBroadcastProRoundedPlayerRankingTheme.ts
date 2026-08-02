import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../index";
import { useBroadcastProRoundedTheme } from "../useBroadcastProRoundedTheme";

export const useBroadcastProRoundedPlayerRankingTheme = () => {
  const { fontClasses, componentStyles } = useThemeContext();
  const { glass, text, accent, headingFont, surfaceBase, selectedPalette } =
    useBroadcastProRoundedTheme();

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
