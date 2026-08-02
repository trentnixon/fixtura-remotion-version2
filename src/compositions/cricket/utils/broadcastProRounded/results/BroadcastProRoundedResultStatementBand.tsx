import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProRoundedResultVerdict } from "../../../../../templates/variants/broadcastProRounded/components/verdict";
import { buildCompactVerdictLine } from "./buildBroadcastProRoundedVerdictModel";
import type { BroadcastProRoundedGlassStyle } from "../glass";

export interface BroadcastProRoundedResultStatementBandProps {
  resultShort: string;
  delay?: number;
  glass?: BroadcastProRoundedGlassStyle;
  className?: string;
}

export const BroadcastProRoundedResultStatementBand: React.FC<
  BroadcastProRoundedResultStatementBandProps
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
    <BroadcastProRoundedResultVerdict
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
