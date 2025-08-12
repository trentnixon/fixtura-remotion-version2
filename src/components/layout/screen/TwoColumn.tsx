import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { getImageEasingFunction } from "../../easing/easingFunctions";
import { RouteToComposition } from "../../../core/utils/routing";
import { AnimatedContainer } from "../../containers";

export type TwoColumnProps = {
  // Header component to render in the side pane
  Header: React.FC;
  // Which side to place the header
  headerPosition?: "left" | "right";
  // Width of the header pane as a percentage (0..100)
  headerWidthPercent?: number;
  // Gap between columns in pixels
  gapPx?: number;
  // Optional width animation for header pane
  animateWidth?: {
    fromPercent?: number; // defaults to headerWidthPercent
    toPercent: number;
    startFrame?: number; // default 0
    durationInFrames?: number; // default 30
    easing?: (t: number) => number; // default Easing.linear
  };
  // Optional slide+fade animations for side and main panes
  paneAnimations?: {
    side?: {
      startFrame?: number; // default 0
      durationInFrames?: number; // default 20
      fromPx?: number; // default: -50 if left, +50 if right
      toPx?: number; // default 0
      fromOpacity?: number; // default 0
      toOpacity?: number; // default 1
      easing?: (t: number) => number; // default Easing.outCubic
    };
    main?: {
      startFrame?: number; // default 5
      durationInFrames?: number; // default 25
      fromPx?: number; // default: +30 if left, -30 if right
      toPx?: number; // default 0
      fromOpacity?: number; // default 0
      toOpacity?: number; // default 1
      easing?: (t: number) => number; // default Easing.outCubic
    };
  };
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
  animateWidth,
  paneAnimations,
  className = "",
  style = {},
}) => {
  const { layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const frame = useCurrentFrame();

  // Read screen-level defaults from animations config
  const screenConfig = animations?.screen?.twoColumn ?? {};

  const effectiveHeaderPosition: "left" | "right" =
    headerPosition ?? screenConfig.headerPosition ?? "left";
  const effectiveHeaderWidthPercent: number =
    headerWidthPercent ?? screenConfig.headerWidthPercent ?? 20;
  const effectiveGapPx: number = gapPx ?? screenConfig.gapPx ?? 0;

  // Map context-based easing to functions when needed
  const widthEasingFn: (t: number) => number = (() => {
    const cfg = screenConfig.animateWidth?.easing;
    if (animateWidth?.easing) return animateWidth.easing;
    if (cfg) return getImageEasingFunction(cfg);
    return Easing.linear;
  })();

  // Compute current header width (percent) with optional animation
  const resolvedAnimateWidth = React.useMemo(() => {
    // Prefer props; fall back to screen config
    const fromCfg = animateWidth ?? screenConfig.animateWidth;
    return fromCfg;
  }, [animateWidth, screenConfig.animateWidth]);

  const currentHeaderWidth = React.useMemo(() => {
    if (!resolvedAnimateWidth) return effectiveHeaderWidthPercent;
    const from =
      resolvedAnimateWidth.fromPercent ?? effectiveHeaderWidthPercent;
    const to = resolvedAnimateWidth.toPercent;
    const start = resolvedAnimateWidth.startFrame ?? 0;
    const duration = resolvedAnimateWidth.durationInFrames ?? 30;

    const value = interpolate(frame, [start, start + duration], [from, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: widthEasingFn,
    });
    return Math.max(0, Math.min(100, value));
  }, [resolvedAnimateWidth, frame, effectiveHeaderWidthPercent, widthEasingFn]);

  const mainWidth = Math.max(0, 100 - currentHeaderWidth);
  const contentHeightPx = (layout.heights.asset + layout.heights.footer) * 2;

  // Defaults for slide+fade animations
  const sideDefaults = {
    startFrame: 0,
    durationInFrames: 20,
    fromPx: effectiveHeaderPosition === "left" ? -50 : 50,
    toPx: 0,
    fromOpacity: 0,
    toOpacity: 1,
    easing: getImageEasingFunction({ type: "out", base: "cubic" }),
  } as const;
  const mainDefaults = {
    startFrame: 5,
    durationInFrames: 25,
    fromPx: effectiveHeaderPosition === "left" ? 30 : -30,
    toPx: 0,
    fromOpacity: 0,
    toOpacity: 1,
    easing: getImageEasingFunction({ type: "out", base: "cubic" }),
  } as const;

  const screenPane = screenConfig.paneAnimations ?? {};
  // Build easing functions from screen config when provided
  const sideEasingFromScreen = screenPane.side?.easing
    ? getImageEasingFunction(screenPane.side.easing)
    : undefined;
  const mainEasingFromScreen = screenPane.main?.easing
    ? getImageEasingFunction(screenPane.main.easing)
    : undefined;

  const sideAnim = {
    ...sideDefaults,
    ...(screenPane.side ?? {}),
    ...(paneAnimations?.side ?? {}),
    easing:
      paneAnimations?.side?.easing ||
      sideEasingFromScreen ||
      sideDefaults.easing,
  } as typeof sideDefaults &
    Partial<NonNullable<typeof paneAnimations>["side"]>;
  const mainAnim = {
    ...mainDefaults,
    ...(screenPane.main ?? {}),
    ...(paneAnimations?.main ?? {}),
    easing:
      paneAnimations?.main?.easing ||
      mainEasingFromScreen ||
      mainDefaults.easing,
  } as typeof mainDefaults &
    Partial<NonNullable<typeof paneAnimations>["main"]>;

  const sideProgress = interpolate(
    frame,
    [sideAnim.startFrame, sideAnim.startFrame + sideAnim.durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: sideAnim.easing,
    },
  );
  const mainProgress = interpolate(
    frame,
    [mainAnim.startFrame, mainAnim.startFrame + mainAnim.durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: mainAnim.easing,
    },
  );

  const sideTranslatePx =
    sideAnim.fromPx + (sideAnim.toPx - sideAnim.fromPx) * sideProgress;
  const sideOpacity =
    sideAnim.fromOpacity +
    (sideAnim.toOpacity - sideAnim.fromOpacity) * sideProgress;
  const mainTranslatePx =
    mainAnim.fromPx + (mainAnim.toPx - mainAnim.fromPx) * mainProgress;
  const mainOpacity =
    mainAnim.fromOpacity +
    (mainAnim.toOpacity - mainAnim.fromOpacity) * mainProgress;

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
        type="basic"
        backgroundColor="primary"
        style={{ height: "100%", width: "100%" }}
        animation={twoColumnContainer.sidePane?.containerIn ?? "none"}
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
