import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProResultVerdict } from "../../../../../templates/variants/broadcastPro/components/verdict";
import { buildCompactVerdictLine } from "./buildBroadcastProVerdictModel";
import type { BroadcastProGlassStyle } from "../glass";

export interface BroadcastProResultStatementBandProps {
  resultShort: string;
  delay?: number;
  glass?: BroadcastProGlassStyle;
  className?: string;
}

export const BroadcastProResultStatementBand: React.FC<
  BroadcastProResultStatementBandProps
> = ({ resultShort, delay = 0, glass, className = "" }) => {
  const { animations } = useAnimationContext();
  const { colors, selectedPalette } = useThemeContext();
  const copyIn = animations.text.main.copyIn;
  const accent = colors?.primary ?? selectedPalette.container.accent;

  const line = buildCompactVerdictLine({ resultShort }) ?? resultShort?.trim();
  if (!line) {
    return null;
  }

  return (
    <BroadcastProResultVerdict
      model={{ kind: "compact", line }}
      tier="compact"
      accentColor={accent}
      delay={delay}
      glass={glass}
      animation={copyIn}
      className={className}
    />
  );
};
