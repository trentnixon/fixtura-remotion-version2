import React, { CSSProperties } from "react";
import { useAnimation } from "../../../../components/containers/animations/useAnimation";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import {
  DEFAULT_SPLIT_EDGE_TOKENS,
  getCornerSplitEdgeStyle,
  getHorizontalSplitEdgeStyle,
  getSplitEdgeRailAnimations,
  getVerticalSplitEdgeStyle,
  resolveSplitEdgeColours,
  SPLIT_EDGE_ANIMATION_STAGGER,
  SplitColourEdgePlacement,
  SplitColourEdgeTokens,
} from "./splitColourEdge";
import type { ContainerAnimationConfig } from "../../../../components/containers/animations/animationTypes";

export interface SplitColourEdgeProps {
  /** Vertical left/right, horizontal top/bottom, or corner L-shape. */
  orientation?: "vertical" | "horizontal" | "corner";
  /** Edge placement within the parent. */
  placement?: SplitColourEdgePlacement;
  /** Override primary rail colour. */
  primaryColor?: string;
  /** Override secondary rail colour. */
  secondaryColor?: string;
  /** Override rail span in px (uses orientation-specific default when omitted). */
  lengthPx?: number;
  /** Frame to start the entrance animation. */
  animationDelay?: number;
  /** When false, rails render without motion. */
  animate?: boolean;
  tokens?: SplitColourEdgeTokens;
  className?: string;
  style?: CSSProperties;
}

const AnimatedRail: React.FC<{
  style: CSSProperties;
  animation: ContainerAnimationConfig;
  startFrame: number;
  animate: boolean;
}> = ({ style, animation, startFrame, animate }) => {
  const animStyle = useAnimation(animate ? animation : { type: "none" }, startFrame);
  return <div style={{ ...style, ...animStyle }} />;
};

/**
 * Paired primary + secondary colour rails with stepped terminals.
 * Non-interactive; mount inside a relative parent with content at z-10+.
 */
export const SplitColourEdge: React.FC<SplitColourEdgeProps> = ({
  orientation = "vertical",
  placement = "leading",
  primaryColor,
  secondaryColor,
  lengthPx,
  animationDelay = 0,
  animate = true,
  tokens: tokensProp,
  className = "",
  style,
}) => {
  const { colors, selectedPalette } = useThemeContext();
  const rawPrimary =
    primaryColor ?? colors.primary ?? selectedPalette.container.primary;
  const rawSecondary =
    secondaryColor ?? colors.secondary ?? selectedPalette.container.secondary;
  const edgeColours = resolveSplitEdgeColours(rawPrimary, rawSecondary);
  const baseTokens = tokensProp ?? DEFAULT_SPLIT_EDGE_TOKENS;
  const motionOrientation =
    orientation === "corner" ? "vertical" : orientation;
  const railAnimations = getSplitEdgeRailAnimations(motionOrientation);
  const secondaryStartFrame = animationDelay + SPLIT_EDGE_ANIMATION_STAGGER;

  const renderRails = (
    primaryStyle: CSSProperties,
    secondaryStyle: CSSProperties,
    containerStyle: CSSProperties,
  ) => (
    <div
      className={`pointer-events-none z-0 ${className}`}
      aria-hidden
      style={{ ...containerStyle, ...style }}
    >
      <AnimatedRail
        style={primaryStyle}
        animation={railAnimations.primary}
        startFrame={animationDelay}
        animate={animate}
      />
      <AnimatedRail
        style={secondaryStyle}
        animation={railAnimations.secondary}
        startFrame={secondaryStartFrame}
        animate={animate}
      />
    </div>
  );

  if (orientation === "corner") {
    const corner =
      placement === "topLeading"
        ? "topLeading"
        : placement === "trailing"
          ? "topTrailing"
          : "topLeading";
    const cornerStyles = getCornerSplitEdgeStyle(corner, edgeColours, baseTokens);

    return (
      <div
        className={`pointer-events-none absolute inset-0 z-0 ${className}`}
        aria-hidden
        style={style}
      >
        <div style={cornerStyles.vertical}>
          <AnimatedRail
            style={cornerStyles.verticalPrimary}
            animation={railAnimations.primary}
            startFrame={animationDelay}
            animate={animate}
          />
          <AnimatedRail
            style={cornerStyles.verticalSecondary}
            animation={railAnimations.secondary}
            startFrame={secondaryStartFrame}
            animate={animate}
          />
        </div>
        <div style={cornerStyles.horizontal}>
          <AnimatedRail
            style={cornerStyles.horizontalPrimary}
            animation={getSplitEdgeRailAnimations("horizontal").primary}
            startFrame={animationDelay}
            animate={animate}
          />
          <AnimatedRail
            style={cornerStyles.horizontalSecondary}
            animation={getSplitEdgeRailAnimations("horizontal").secondary}
            startFrame={secondaryStartFrame}
            animate={animate}
          />
        </div>
      </div>
    );
  }

  if (orientation === "horizontal") {
    const tokens = {
      ...baseTokens,
      ...(lengthPx != null ? { horizontalLengthPx: lengthPx } : {}),
    };
    const { container, primary, secondary } = getHorizontalSplitEdgeStyle(
      placement === "top" ? "top" : "bottom",
      edgeColours,
      tokens,
    );

    return renderRails(primary, secondary, container);
  }

  const tokens = {
    ...baseTokens,
    ...(lengthPx != null ? { verticalLengthPx: lengthPx } : {}),
  };
  const { container, primary, secondary } = getVerticalSplitEdgeStyle(
    placement === "trailing" ? "trailing" : "leading",
    edgeColours,
    tokens,
  );

  return renderRails(primary, secondary, container);
};
