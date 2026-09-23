import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MetadataMedium } from "../../primitives/metadataMedium";
import { formatGroundLocation } from "../../utils-text";
import { cellBlur, csClass, useBroadcastProRoundedTheme } from "../index";
import { resolveBroadcastProRoundedEdgeMarkerStyle } from "../../../../../templates/types/broadcast-pro-rounded/marker-notch";
import type { BroadcastProRoundedSurfaceConnection } from "../glass";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";

export interface BroadcastProRoundedResultMetaStripProps {
  gradeLabel: string;
  ground: string;
  delay?: number;
  className?: string;
  /** When false, only the grade/round label is shown (e.g. Result Single). */
  showGround?: boolean;
  connection?: BroadcastProRoundedSurfaceConnection;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
}

export const BroadcastProRoundedResultMetaStrip: React.FC<
  BroadcastProRoundedResultMetaStripProps
> = ({
  gradeLabel,
  ground,
  delay = 0,
  className = "",
  showGround = true,
  connection = "standalone",
  exitAnimation,
  exitFrame,
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles, layout } = useThemeContext();
  const { glass, text, accent } = useBroadcastProRoundedTheme();
  const copyIn = animations.text.main.copyIn;
  const cellRadius = layout.borderRadius.container;

  const stripClass = csClass(
    componentStyles,
    "broadcastProRoundedResultsMetaStrip",
  );
  const gradeOnly = !showGround || !ground;
  const standalone = connection === "standalone";

  return (
    <div
      className={`${standalone ? `overflow-hidden ${cellRadius}` : ""} ${stripClass} ${gradeOnly ? "!justify-center" : ""} ${className}`.trim()}
      style={{
        background: glass.headerGradient,
        ...(standalone
          ? resolveBroadcastProRoundedEdgeMarkerStyle("compact", "primary", {
              accentColor: accent,
              mutedColor: accent,
            })
          : {}),
        ...cellBlur,
      }}
    >
      <MetadataMedium
        value={gradeLabel}
        animation={{ ...copyIn, delay }}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        className={`truncate font-normal uppercase tracking-widest ${gradeOnly ? "text-center" : ""}`}
        variant="onContainerCopy"
        style={{ color: text.copy }}
      />
      {!gradeOnly ? (
        <MetadataMedium
          value={formatGroundLocation(ground)}
          animation={{ ...copyIn, delay: delay + 2 }}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
          className="ml-4 min-w-0 flex-shrink-0 truncate text-right font-medium uppercase tracking-wider"
          variant="onContainerCopy"
          style={{ color: text.muted }}
        />
      ) : null}
    </div>
  );
};
