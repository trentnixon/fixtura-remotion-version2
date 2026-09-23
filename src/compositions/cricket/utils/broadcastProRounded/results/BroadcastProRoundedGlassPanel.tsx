import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  cellBlur,
  getBroadcastProRoundedGlassSurface,
  resolveBroadcastProRoundedGlass,
} from "../glass";
import type {
  BroadcastProRoundedGlassStyle,
  BroadcastProRoundedGlassSurfaceRole,
  BroadcastProRoundedSurfaceConnection,
} from "../glass";

export interface BroadcastProRoundedGlassPanelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glass?: BroadcastProRoundedGlassStyle;
  /** Semantic surface tier; defaults to primary panel glass. */
  surface?: Exclude<BroadcastProRoundedGlassSurfaceRole, "logoWell">;
  connection?: BroadcastProRoundedSurfaceConnection;
  /**
   * When set, fades/scales the glass shell in (use {@link resultContainerDelay}
   * so it leads the copy slightly).
   */
  animationDelay?: number;
  /** Frame to begin the container exit animation. */
  exitFrame?: number;
}

export const BroadcastProRoundedGlassPanel: React.FC<
  BroadcastProRoundedGlassPanelProps
> = ({
  children,
  className = "",
  style,
  glass: glassOverride,
  surface = "panel",
  connection = "standalone",
  animationDelay,
  exitFrame,
}) => {
  const { animations } = useAnimationContext();
  const {
    selectedPalette,
    layout,
    broadcastProRoundedGlassOpacity,
    broadcastProRoundedTransparentLayers,
  } = useThemeContext();

  const glass =
    glassOverride ??
    resolveBroadcastProRoundedGlass({
      surfaceBase: selectedPalette.container.background,
      broadcastProRoundedGlassOpacity,
      broadcastProRoundedTransparentLayers,
    });

  const containerAnimation = animations.container.main.itemContainerInner;
  const shouldAnimate = animationDelay !== undefined || exitFrame !== undefined;

  const panel = (
    <div
      className={`overflow-hidden ${layout.borderRadius.container} ${className}`.trim()}
      style={{
        background: getBroadcastProRoundedGlassSurface(glass, surface),
        border: connection === "standalone" ? glass.border : undefined,
        ...cellBlur,
        ...style,
      }}
    >
      {children}
    </div>
  );

  if (!shouldAnimate) {
    return panel;
  }

  return (
    <AnimatedContainer
      type="full"
      className="h-full w-full"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={animationDelay ?? 0}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={exitFrame}
    >
      {panel}
    </AnimatedContainer>
  );
};
