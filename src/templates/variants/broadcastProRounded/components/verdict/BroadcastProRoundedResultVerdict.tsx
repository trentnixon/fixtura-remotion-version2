import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import type { BroadcastProRoundedVerdictModel } from "../../../../../compositions/cricket/utils/broadcastProRounded/results/buildBroadcastProRoundedVerdictModel";
import type { BroadcastProRoundedVerdictTier } from "../../../../../templates/types/broadcast-pro-rounded/verdict-typography";
import { BROADCAST_PRO_VERDICT_TIER_BAND_KEY } from "../../../../../templates/types/broadcast-pro-rounded/verdict-typography";
import { BroadcastProRoundedGlassPanel } from "../../../../../compositions/cricket/utils/broadcastProRounded/results/BroadcastProRoundedGlassPanel";
import type { BroadcastProRoundedGlassStyle } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { BroadcastProRoundedVerdictHeroLockup } from "./BroadcastProRoundedVerdictHeroLockup";
import { BroadcastProRoundedVerdictCompactLine } from "./BroadcastProRoundedVerdictCompactLine";
import { BroadcastProRoundedVerdictAbandoned } from "./BroadcastProRoundedVerdictAbandoned";
import { resolveBroadcastProRoundedEdgeMarkerStyle } from "../../../../../templates/types/broadcast-pro-rounded/marker-notch";

export interface BroadcastProRoundedResultVerdictProps {
  model: BroadcastProRoundedVerdictModel;
  tier: BroadcastProRoundedVerdictTier;
  accentColor: string;
  delay?: number;
  glass?: BroadcastProRoundedGlassStyle;
  className?: string;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
}

export const BroadcastProRoundedResultVerdict: React.FC<
  BroadcastProRoundedResultVerdictProps
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

  const edgeMarkerStyle = resolveBroadcastProRoundedEdgeMarkerStyle(
    "standard",
    "primary",
    {
      accentColor,
      mutedColor: accentColor,
    },
  );

  if (tier === "hero" && model.kind === "hero") {
    return (
      <BroadcastProRoundedGlassPanel
        glass={glass}
        surface="strong"
        className={`${bandClass} ${className}`.trim()}
        style={edgeMarkerStyle}
      >
        <BroadcastProRoundedVerdictHeroLockup
          winner={model.winner}
          contextLine={model.contextLine}
          accentColor={accentColor}
          delay={delay}
          animation={animation}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
        />
      </BroadcastProRoundedGlassPanel>
    );
  }

  if (tier === "compact" && model.kind === "compact") {
    return (
      <BroadcastProRoundedGlassPanel
        glass={glass}
        surface="strong"
        className={`${bandClass} ${className}`.trim()}
        style={edgeMarkerStyle}
      >
        <BroadcastProRoundedVerdictCompactLine
          line={model.line}
          delay={delay}
          animation={animation}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
        />
      </BroadcastProRoundedGlassPanel>
    );
  }

  if (tier === "abandoned" && model.kind === "abandoned") {
    return (
      <BroadcastProRoundedGlassPanel
        glass={glass}
        surface="strong"
        className={`${bandClass} ${className}`.trim()}
        style={edgeMarkerStyle}
      >
        <BroadcastProRoundedVerdictAbandoned
          status={model.status}
          result={model.result}
          delay={delay}
          animation={animation}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
        />
      </BroadcastProRoundedGlassPanel>
    );
  }

  return null;
};
