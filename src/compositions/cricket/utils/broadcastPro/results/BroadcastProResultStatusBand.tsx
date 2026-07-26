import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProResultVerdict } from "../../../../../templates/variants/broadcastPro/components/verdict";
import type { BroadcastProGlassStyle } from "../glass";

export interface BroadcastProResultStatusBandProps {
  status: string;
  result?: string;
  delay?: number;
  glass?: BroadcastProGlassStyle;
  className?: string;
}

export const BroadcastProResultStatusBand: React.FC<
  BroadcastProResultStatusBandProps
> = ({ status, result, delay = 0, glass, className = "" }) => {
  const { animations } = useAnimationContext();
  const { colors, selectedPalette } = useThemeContext();
  const copyIn = animations.text.main.copyIn;
  const accent = colors?.primary ?? selectedPalette.container.accent;

  if (!status && !result) {
    return null;
  }

  return (
    <BroadcastProResultVerdict
      model={{
        kind: "abandoned",
        status,
        result: result?.trim() || undefined,
      }}
      tier="abandoned"
      accentColor={accent}
      delay={delay}
      glass={glass}
      animation={copyIn}
      className={className}
    />
  );
};
