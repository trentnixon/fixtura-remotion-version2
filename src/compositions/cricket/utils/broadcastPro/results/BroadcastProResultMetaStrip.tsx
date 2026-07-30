import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MetadataMedium } from "../../primitives/metadataMedium";
import { cellBlur, csClass, useBroadcastProTheme } from "../index";
import { resolveBroadcastProEdgeMarkerStyle } from "../../../../../templates/types/broadcast-pro/marker-notch";

export interface BroadcastProResultMetaStripProps {
  gradeLabel: string;
  ground: string;
  delay?: number;
  className?: string;
  /** When false, only the grade/round label is shown (e.g. Result Single). */
  showGround?: boolean;
}

export const BroadcastProResultMetaStrip: React.FC<
  BroadcastProResultMetaStripProps
> = ({ gradeLabel, ground, delay = 0, className = "", showGround = true }) => {
  const { animations } = useAnimationContext();
  const { componentStyles } = useThemeContext();
  const { glass, text, accent } = useBroadcastProTheme();
  const copyIn = animations.text.main.copyIn;

  const stripClass = csClass(componentStyles, "broadcastProResultsMetaStrip");

  return (
    <div
      className={`${stripClass} ${className}`.trim()}
      style={{
        background: glass.headerGradient,
        ...resolveBroadcastProEdgeMarkerStyle("compact", "primary", {
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
