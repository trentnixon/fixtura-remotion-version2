import { useMemo } from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { resolveBroadcastProGlass } from "./glass";
import {
  resolveBroadcastProTextOnContainer,
  resolveBroadcastProTextOnGlass,
} from "./themeColors";

/**
 * Shared BroadcastPro theme hook: glass surfaces + contrast-safe copy for
 * container and glass panel backgrounds (respects light/lightAlt/dark/darkAlt).
 */
export const useBroadcastProTheme = () => {
  const {
    selectedPalette,
    colors,
    fontClasses,
    broadcastProGlassOpacity,
    broadcastProTransparentLayers,
  } = useThemeContext();

  const surfaceBase = selectedPalette.container.background;
  const headingFont = fontClasses.heading?.family ?? "font-teko";

  const glass = useMemo(
    () =>
      resolveBroadcastProGlass({
        surfaceBase,
        broadcastProGlassOpacity,
        broadcastProTransparentLayers,
      }),
    [surfaceBase, broadcastProGlassOpacity, broadcastProTransparentLayers],
  );

  const textOnContainer = useMemo(
    () => resolveBroadcastProTextOnContainer(selectedPalette),
    [selectedPalette],
  );

  const textOnGlass = useMemo(
    () =>
      resolveBroadcastProTextOnGlass(surfaceBase, glass.panel, textOnContainer),
    [surfaceBase, glass.panel, textOnContainer],
  );

  const accent = colors?.primary ?? selectedPalette.container.accent;

  return {
    selectedPalette,
    surfaceBase,
    glass,
    textOnContainer,
    textOnGlass,
    /** Contrast-safe copy on primary panel glass (alias for textOnGlass). */
    text: textOnGlass,
    accent,
    headingFont,
  };
};
