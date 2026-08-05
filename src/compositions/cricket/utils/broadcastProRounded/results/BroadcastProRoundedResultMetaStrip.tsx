import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MetadataMedium } from "../../primitives/metadataMedium";
import { cellBlur, csClass, useBroadcastProRoundedTheme } from "../index";
import { resolveBroadcastProRoundedEdgeMarkerStyle } from "../../../../../templates/types/broadcast-pro-rounded/marker-notch";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { resultContainerDelay } from "./matchContentHelpers";

export interface BroadcastProRoundedResultMetaStripProps {
  gradeLabel: string;
  ground: string;
  delay?: number;
  className?: string;
  /** When false, only the grade/round label is shown (e.g. Result Single). */
  showGround?: boolean;
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
  exitAnimation,
  exitFrame,
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles, layout } = useThemeContext();
  const { glass, text, accent } = useBroadcastProRoundedTheme();
  const copyIn = animations.text.main.copyIn;
  const containerAnimation = animations.container.main.itemContainerInner;
  const cellRadius = layout.borderRadius.container;

  const stripClass = csClass(
    componentStyles,
    "broadcastProRoundedResultsMetaStrip",
  );

  return (
    <AnimatedContainer
      type="full"
      className="w-full"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={resultContainerDelay(delay)}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={exitFrame}
    >
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
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
          className="truncate font-bold uppercase tracking-widest"
          variant="onContainerCopy"
          style={{ color: text.copy }}
        />
        {showGround && ground ? (
          <MetadataMedium
            value={ground}
            animation={{ ...copyIn, delay: delay + 4 }}
            exitAnimation={exitAnimation}
            exitFrame={exitFrame}
            className="ml-4 min-w-0 flex-shrink-0 truncate text-right font-medium uppercase tracking-wider"
            variant="onContainerCopy"
            style={{ color: text.muted }}
          />
        ) : null}
      </div>
    </AnimatedContainer>
  );
};
