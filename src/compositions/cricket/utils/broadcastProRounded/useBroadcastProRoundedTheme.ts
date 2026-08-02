import { useMemo } from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { resolveBroadcastProRoundedGlass } from "./glass";
import {
  resolveBroadcastProRoundedTextOnContainer,
  resolveBroadcastProRoundedTextOnGlass,
} from "./themeColors";

/**
 * Shared BroadcastProRounded theme hook: glass surfaces + contrast-safe copy for
 * container and glass panel backgrounds (respects light/lightAlt/dark/darkAlt).
 */
export const useBroadcastProRoundedTheme = () => {
  const {
    selectedPalette,
    colors,
    fontClasses,
    broadcastProRoundedGlassOpacity,
    broadcastProRoundedTransparentLayers,
  } = useThemeContext();

  const surfaceBase = selectedPalette.container.background;
  const headingFont = fontClasses.heading?.family ?? "font-teko";

  const glass = useMemo(
    () =>
      resolveBroadcastProRoundedGlass({
        surfaceBase,
        broadcastProRoundedGlassOpacity,
        broadcastProRoundedTransparentLayers,
      }),
    [
      surfaceBase,
      broadcastProRoundedGlassOpacity,
      broadcastProRoundedTransparentLayers,
    ],
  );

  const textOnContainer = useMemo(
    () => resolveBroadcastProRoundedTextOnContainer(selectedPalette),
    [selectedPalette],
  );

  const textOnGlass = useMemo(
    () =>
      resolveBroadcastProRoundedTextOnGlass(
        surfaceBase,
        glass.panel,
        textOnContainer,
      ),
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
