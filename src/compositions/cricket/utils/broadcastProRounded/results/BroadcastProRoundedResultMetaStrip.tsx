import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MetadataMedium } from "../../primitives/metadataMedium";
import { cellBlur, csClass, useBroadcastProRoundedTheme } from "../index";
import { resolveBroadcastProRoundedEdgeMarkerStyle } from "../../../../../templates/types/broadcast-pro-rounded/marker-notch";

export interface BroadcastProRoundedResultMetaStripProps {
  gradeLabel: string;
  ground: string;
  delay?: number;
  className?: string;
  /** When false, only the grade/round label is shown (e.g. Result Single). */
  showGround?: boolean;
}

export const BroadcastProRoundedResultMetaStrip: React.FC<
  BroadcastProRoundedResultMetaStripProps
> = ({ gradeLabel, ground, delay = 0, className = "", showGround = true }) => {
  const { animations } = useAnimationContext();
  const { componentStyles, layout } = useThemeContext();
  const { glass, text, accent } = useBroadcastProRoundedTheme();
  const copyIn = animations.text.main.copyIn;
  const cellRadius = layout.borderRadius.container;

  const stripClass = csClass(
    componentStyles,
    "broadcastProRoundedResultsMetaStrip",
  );

  return (
    <div
      className={`overflow-hidden ${cellRadius} ${stripClass} ${className}`.trim()}
      style={{
        background: glass.headerGradient,
        ...resolveBroadcastProRoundedEdgeMarkerStyle("compact", "primary", {
          accentColor: accent,
          mutedColor: accent,
        }),
        ...cellBlur,
      }}
    >
      <MetadataMedium
        value={gradeLabel}
        animation={{ ...copyIn, delay }}
        className="truncate font-bold uppercase tracking-widest"
        variant="onContainerCopy"
        style={{ color: text.copy }}
      />
      {showGround && ground ? (
        <MetadataMedium
          value={ground}
          animation={{ ...copyIn, delay: delay + 2 }}
          className="ml-4 min-w-0 flex-shrink-0 truncate text-right font-medium uppercase tracking-wider"
          variant="onContainerCopy"
          style={{ color: text.muted }}
        />
      ) : null}
    </div>
  );
};
