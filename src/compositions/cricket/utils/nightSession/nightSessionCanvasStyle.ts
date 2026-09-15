import type { CSSProperties } from "react";
import { useMemo } from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useScorelineCanvasStyle } from "../scoreline/scorelineCanvasStyle";
import { resolveNightSessionBandTokens } from "./resolveNightSessionOverlayTokens";

export const useNightSessionCanvasStyle = (): CSSProperties => {
  const scorelineStyle = useScorelineCanvasStyle();
  const { selectedPalette } = useThemeContext();
  const bandTokens = useMemo(
    () => resolveNightSessionBandTokens(selectedPalette),
    [selectedPalette],
  );

  return useMemo(
    () =>
      ({
        ...scorelineStyle,
        ...bandTokens,
        "--font-display": "Teko, sans-serif",
        "--font-body": "Heebo, sans-serif",
      }) as CSSProperties,
    [bandTokens, scorelineStyle],
  );
};
