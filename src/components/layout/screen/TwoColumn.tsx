import React from "react";
import { AbsoluteFill } from "remotion";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { RouteToComposition } from "../../../core/utils/routing";
import { AnimatedContainer } from "../../containers";
import { VerticalProgressTimer } from "../main/Timer/ProgressTimer";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";

export type TwoColumnProps = {
  // Header component to render in the side pane
  Header: React.FC;
  // Which side to place the header
  headerPosition?: "left" | "right";
  // Width of the header pane as a percentage (0..100)
  headerWidthPercent?: number;
  // Gap between columns in pixels
  gapPx?: number;
  // Optional className/style on outer wrapper
  className?: string;
  style?: React.CSSProperties;
};

/**
 * TwoColumn screen wrapper with a side header pane (left or right) and a main content pane.
 * Mirrors OneColumn by using ThemeContext layout heights and RouteToComposition for main content.
 */
export const TwoColumn: React.FC<TwoColumnProps> = ({
  Header,
  headerPosition,
  headerWidthPercent,
  gapPx,
  className = "",
  style = {},
}) => {
  const { layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { FPS_MAIN } = timings;
  // Read screen-level defaults from animations config
  const screenConfig = animations?.screen?.twoColumn ?? {};

  const effectiveHeaderPosition: "left" | "right" =
    headerPosition ?? screenConfig.headerPosition ?? "left";
  const effectiveHeaderWidthPercent: number =
    headerWidthPercent ?? screenConfig.headerWidthPercent ?? 20;
  const effectiveGapPx: number = gapPx ?? screenConfig.gapPx ?? 0;

  // Snap header width; no width animation
  const currentHeaderWidth = effectiveHeaderWidthPercent;

  const mainWidth = Math.max(0, 100 - currentHeaderWidth);
  const contentHeightPx = (layout.heights.asset + layout.heights.footer) * 2;

  // Snap transforms and opacity (no slide/fade)
  const sideTranslatePx = 0;
  const sideOpacity = 1;
  const mainTranslatePx = 0;
  const mainOpacity = 1;

  // Read container animations for panes from the container config if present
  const twoColumnContainer = animations?.container?.twoColumn ?? {};

  const SidePane = (
    <div
      style={{
        width: `${currentHeaderWidth}%`,
        height: "100%",
        // Keep computed transform/opacity until we fully migrate to container configs for motion distance
        transform: `translateX(${sideTranslatePx}px)`,
        opacity: sideOpacity,
      }}
    >
      <AnimatedContainer
        type="glass"
        style={{
          height: "100%",
          width: "100%",
          borderRight: "1px solid rgba(255, 255, 255, 0.25)",
        }}
        animation={twoColumnContainer.sidePane?.containerIn ?? "none"}
        exitAnimation={twoColumnContainer.sidePane?.containerOut ?? "none"}
        className="shadow-2xl shadow-black/50"
      >
        <Header />
      </AnimatedContainer>
    </div>
  );
  const MainPane = (
    <div
      style={{
        width: `${mainWidth}%`,
        height: "100%",
        position: "relative",
        minWidth: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transform: `translateX(${mainTranslatePx}px)`,
        opacity: mainOpacity,
      }}
    >
      <AnimatedContainer
        type="basic"
        style={{ height: "100%", width: "100%", display: "flex" }}
        animation={twoColumnContainer.mainPane?.containerIn ?? "none"}
      >
        {RouteToComposition()}
      </AnimatedContainer>
      <VerticalProgressTimer FRAMES={FPS_MAIN ?? 0} />
    </div>
  );

  return (
    <AbsoluteFill>
      <div
        className={`flex flex-col h-full w-full ${className}`.trim()}
        style={style}
      >
        <div
          className="relative flex"
          style={{
            height: `${contentHeightPx}px`,
            gap: effectiveGapPx,
            alignItems: "stretch",
          }}
        >
          {effectiveHeaderPosition === "left" ? (
            <>
              {SidePane}
              {MainPane}
            </>
          ) : (
            <>
              {MainPane}
              {SidePane}
            </>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
