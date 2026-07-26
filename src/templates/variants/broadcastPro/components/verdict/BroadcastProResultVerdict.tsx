import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import type { BroadcastProVerdictModel } from "../../../../../compositions/cricket/utils/broadcastPro/results/buildBroadcastProVerdictModel";
import type { BroadcastProVerdictTier } from "../../../../../templates/types/broadcast-pro/verdict-typography";
import { BROADCAST_PRO_VERDICT_TIER_BAND_KEY } from "../../../../../templates/types/broadcast-pro/verdict-typography";
import { BroadcastProGlassPanel } from "../../../../../compositions/cricket/utils/broadcastPro/results/BroadcastProGlassPanel";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { BroadcastProVerdictHeroLockup } from "./BroadcastProVerdictHeroLockup";
import { BroadcastProVerdictCompactLine } from "./BroadcastProVerdictCompactLine";
import { BroadcastProVerdictAbandoned } from "./BroadcastProVerdictAbandoned";
import { resolveBroadcastProEdgeMarkerStyle } from "../../../../../templates/types/broadcast-pro/marker-notch";

export interface BroadcastProResultVerdictProps {
  model: BroadcastProVerdictModel;
  tier: BroadcastProVerdictTier;
  accentColor: string;
  delay?: number;
  glass?: BroadcastProGlassStyle;
  className?: string;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
}

export const BroadcastProResultVerdict: React.FC<
  BroadcastProResultVerdictProps
> = ({
  model,
  tier,
  accentColor,
  delay = 0,
  glass,
  className = "",
  animation,
  exitAnimation,
  exitFrame,
}) => {
  const { componentStyles } = useThemeContext();
  const bandKey = BROADCAST_PRO_VERDICT_TIER_BAND_KEY[tier];
  const bandClass = csClass(componentStyles, bandKey);

  const edgeMarkerStyle = resolveBroadcastProEdgeMarkerStyle("standard", "primary", {
    accentColor,
    mutedColor: accentColor,
  });

  if (tier === "hero" && model.kind === "hero") {
    return (
      <BroadcastProGlassPanel
        glass={glass}
        surface="strong"
        className={`${bandClass} ${className}`.trim()}
        style={edgeMarkerStyle}
      >
        <BroadcastProVerdictHeroLockup
          winner={model.winner}
          contextLine={model.contextLine}
          accentColor={accentColor}
          delay={delay}
          animation={animation}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
        />
      </BroadcastProGlassPanel>
    );
  }

  if (tier === "compact" && model.kind === "compact") {
    return (
      <BroadcastProGlassPanel
        glass={glass}
        surface="strong"
        className={`${bandClass} ${className}`.trim()}
        style={edgeMarkerStyle}
      >
        <BroadcastProVerdictCompactLine
          line={model.line}
          delay={delay}
          animation={animation}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
        />
      </BroadcastProGlassPanel>
    );
  }

  if (tier === "abandoned" && model.kind === "abandoned") {
    return (
      <BroadcastProGlassPanel
        glass={glass}
        surface="strong"
        className={`${bandClass} ${className}`.trim()}
        style={edgeMarkerStyle}
      >
        <BroadcastProVerdictAbandoned
          status={model.status}
          result={model.result}
          delay={delay}
          animation={animation}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
        />
      </BroadcastProGlassPanel>
    );
  }

  return null;
};
