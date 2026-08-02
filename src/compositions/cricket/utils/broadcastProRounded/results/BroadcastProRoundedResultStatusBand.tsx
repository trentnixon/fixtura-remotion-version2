import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProRoundedResultVerdict } from "../../../../../templates/variants/broadcastProRounded/components/verdict";
import type { BroadcastProRoundedGlassStyle } from "../glass";

export interface BroadcastProRoundedResultStatusBandProps {
  status: string;
  result?: string;
  delay?: number;
  glass?: BroadcastProRoundedGlassStyle;
  className?: string;
}

export const BroadcastProRoundedResultStatusBand: React.FC<
  BroadcastProRoundedResultStatusBandProps
> = ({ status, result, delay = 0, glass, className = "" }) => {
  const { animations } = useAnimationContext();
  const { colors, selectedPalette } = useThemeContext();
  const copyIn = animations.text.main.copyIn;
  const accent = colors?.primary ?? selectedPalette.container.accent;

  if (!status && !result) {
    return null;
  }

  return (
    <BroadcastProRoundedResultVerdict
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
