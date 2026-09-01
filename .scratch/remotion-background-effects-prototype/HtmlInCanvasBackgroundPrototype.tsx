import React from "react";
import {
  AbsoluteFill,
  HtmlInCanvas,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { blur } from "@remotion/effects/blur";
import { chromaticAberration } from "@remotion/effects/chromatic-aberration";
import { glow } from "@remotion/effects/glow";
import { vignette } from "@remotion/effects/vignette";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 12;

type Palette = {
  background: string;
  accent: string;
  text: string;
};

type GraphicId = "broadcast" | "orbit-rings" | "scoreboard-grid" | "neon-beams";

type HtmlInCanvasVariant =
  | "broadcast"
  | "orbit-rings"
  | "scoreboard-grid"
  | "neon-beams";

type VariantSettings = {
  graphicId: GraphicId;
  label: string;
  description: string;
  blurRadius: number;
  glowRadius: number;
  glowIntensity: number;
  glowThreshold: number;
  chromaticAmount: number;
  vignetteAmount: number;
};

const VARIANT_SETTINGS: Record<HtmlInCanvasVariant, VariantSettings> = {
  broadcast: {
    graphicId: "broadcast",
    label: "HTML IN CANVAS / BROADCAST",
    description:
      "Live DOM stripes captured to canvas with glow and vignette finishing.",
    blurRadius: 0,
    glowRadius: 22,
    glowIntensity: 0.22,
    glowThreshold: 0.42,
    chromaticAmount: 0,
    vignetteAmount: 0.62,
  },
  "orbit-rings": {
    graphicId: "orbit-rings",
    label: "HTML IN CANVAS / ORBIT RINGS",
    description:
      "SVG concentric dashes orbit a focal point — glow picks up accent linework.",
    blurRadius: 0,
    glowRadius: 26,
    glowIntensity: 0.28,
    glowThreshold: 0.35,
    chromaticAmount: 0,
    vignetteAmount: 0.58,
  },
  "scoreboard-grid": {
    graphicId: "scoreboard-grid",
    label: "HTML IN CANVAS / SCOREBOARD GRID",
    description:
      "Fixture matrix cells pulse in staggered waves like a live stats wall.",
    blurRadius: 1,
    glowRadius: 18,
    glowIntensity: 0.2,
    glowThreshold: 0.48,
    chromaticAmount: 0,
    vignetteAmount: 0.55,
  },
  "neon-beams": {
    graphicId: "neon-beams",
    label: "HTML IN CANVAS / NEON BEAMS",
    description:
      "Wide diagonal light beams sweep through DOM layers with chromatic fringe.",
    blurRadius: 2,
    glowRadius: 32,
    glowIntensity: 0.34,
    glowThreshold: 0.32,
    chromaticAmount: 2.4,
    vignetteAmount: 0.64,
  },
};

const useLoopTiming = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  const pulse = 0.5 + Math.sin(loopProgress * Math.PI * 2) * 0.5;
  return { frame, loopProgress, pulse };
};

const DomBaseGradient: React.FC<{ palette: Palette; angle?: number }> = ({
  palette,
  angle = 145,
}) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(${angle}deg, ${palette.background} 0%, ${palette.accent} 100%)`,
    }}
  />
);

const DomBroadcastField: React.FC<{ palette: Palette }> = ({ palette }) => {
  const { width, height } = useVideoConfig();
  const { loopProgress, pulse } = useLoopTiming();
  const sweep = loopProgress * 120 - 60;

  const stripes = Array.from({ length: 7 }, (_, index) => {
    const offset = sweep + index * 16;
    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: "-40%",
          top: `${8 + index * 12}%`,
          width: "180%",
          height: index % 2 === 0 ? 72 : 48,
          background:
            index % 2 === 0
              ? `linear-gradient(90deg, transparent, ${palette.accent}, transparent)`
              : `linear-gradient(90deg, transparent, ${palette.text}, transparent)`,
          opacity: 0.1 + (index % 3) * 0.04,
          transform: `rotate(-28deg) translateX(${offset}%)`,
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ width, height, overflow: "hidden" }}>
      <DomBaseGradient palette={palette} />
      {stripes}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          width: 520 + pulse * 80,
          height: 520 + pulse * 80,
          marginLeft: -(260 + pulse * 40),
          marginTop: -(260 + pulse * 40),
          borderRadius: "50%",
          border: `2px solid ${palette.text}`,
          opacity: 0.14 + pulse * 0.08,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          width: 320,
          height: 320,
          marginLeft: -160,
          marginTop: -160,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`,
          opacity: 0.18 + pulse * 0.12,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.03) 3px,
            rgba(255,255,255,0.03) 4px
          )`,
          opacity: 0.5,
          transform: `translateY(${loopProgress * 40}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

const DomOrbitRingsField: React.FC<{ palette: Palette }> = ({ palette }) => {
  const { width, height } = useVideoConfig();
  const { loopProgress } = useLoopTiming();
  const cx = width * 0.5;
  const cy = height * 0.42;

  const rings = [
    { r: 180, dash: 0.34, width: 2, dir: 1, color: palette.text },
    { r: 260, dash: 0.28, width: 2, dir: -1, color: palette.accent },
    { r: 340, dash: 0.22, width: 3, dir: 1, color: palette.text },
    { r: 430, dash: 0.18, width: 2, dir: -1, color: palette.accent },
    { r: 520, dash: 0.14, width: 2, dir: 1, color: palette.text },
    { r: 610, dash: 0.1, width: 2, dir: -1, color: palette.accent },
  ];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <DomBaseGradient palette={palette} angle={160} />
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        {rings.map((ring, index) => {
          const circumference = 2 * Math.PI * ring.r;
          const dashLength = circumference * ring.dash;
          const gapLength = circumference - dashLength;
          const offset =
            loopProgress * circumference * ring.dir +
            index * circumference * 0.08;
          return (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={ring.r}
              fill="none"
              stroke={ring.color}
              strokeWidth={ring.width}
              strokeDasharray={`${dashLength} ${gapLength}`}
              strokeDashoffset={-offset}
              opacity={0.16 + (index % 2) * 0.06}
            />
          );
        })}
        <circle cx={cx} cy={cy} r={48} fill={palette.accent} opacity={0.22} />
        <circle
          cx={cx}
          cy={cy}
          r={48}
          fill="none"
          stroke={palette.text}
          strokeWidth={2}
          opacity={0.35}
        />
      </svg>
    </AbsoluteFill>
  );
};

const DomScoreboardGridField: React.FC<{ palette: Palette }> = ({
  palette,
}) => {
  const { width, height } = useVideoConfig();
  const { frame, loopProgress } = useLoopTiming();
  const cols = 14;
  const rows = 18;
  const cellW = width / cols;
  const cellH = height / rows;

  const cells = Array.from({ length: cols * rows }, (_, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const wave =
      0.5 +
      Math.sin(
        loopProgress * Math.PI * 2 + col * 0.55 + row * 0.35 + frame * 0.04,
      ) *
        0.5;
    const lit = wave > 0.62;
    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: col * cellW + 2,
          top: row * cellH + 2,
          width: cellW - 4,
          height: cellH - 4,
          borderRadius: 4,
          backgroundColor: lit ? palette.accent : palette.text,
          opacity: lit ? 0.14 + wave * 0.12 : 0.04 + wave * 0.03,
          boxShadow: lit
            ? `0 0 ${8 + wave * 12}px ${palette.accent}55`
            : undefined,
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <DomBaseGradient palette={palette} angle={180} />
      {cells}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 40%, transparent 20%, ${palette.background}dd 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

const DomNeonBeamsField: React.FC<{ palette: Palette }> = ({ palette }) => {
  const { width, height } = useVideoConfig();
  const { loopProgress, pulse } = useLoopTiming();
  const sweep = loopProgress * 140 - 70;

  const beams = Array.from({ length: 6 }, (_, index) => {
    const offset = sweep + index * 22;
    const thickness = index % 2 === 0 ? 96 : 64;
    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: "-50%",
          top: `${6 + index * 14}%`,
          width: "220%",
          height: thickness,
          background: `linear-gradient(90deg, transparent 0%, ${palette.accent}88 35%, ${palette.text}cc 50%, ${palette.accent}88 65%, transparent 100%)`,
          opacity: 0.12 + (index % 3) * 0.05 + pulse * 0.04,
          transform: `rotate(-32deg) translateX(${offset}%)`,
          filter: "blur(1px)",
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ width, height, overflow: "hidden" }}>
      <DomBaseGradient palette={palette} angle={125} />
      {beams}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(
            -32deg,
            transparent,
            transparent 120px,
            rgba(255,255,255,0.025) 120px,
            rgba(255,255,255,0.025) 122px
          )`,
          transform: `translateX(${loopProgress * 80 - 40}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

const GRAPHICS: Record<GraphicId, React.FC<{ palette: Palette }>> = {
  broadcast: DomBroadcastField,
  "orbit-rings": DomOrbitRingsField,
  "scoreboard-grid": DomScoreboardGridField,
  "neon-beams": DomNeonBeamsField,
};

const DomStudioFallback: React.FC<{
  palette: Palette;
  settings: VariantSettings;
  Graphic: React.FC<{ palette: Palette }>;
}> = ({ palette, settings, Graphic }) => (
  <>
    <AbsoluteFill
      style={{
        filter:
          settings.blurRadius > 0
            ? `blur(${settings.blurRadius}px) saturate(1.08)`
            : undefined,
      }}
    >
      <Graphic palette={palette} />
    </AbsoluteFill>
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 42%, transparent 0%, ${palette.background}00 42%, ${palette.background}cc 100%)`,
        pointerEvents: "none",
      }}
    />
  </>
);

interface HtmlInCanvasBackgroundProps {
  variant?: HtmlInCanvasVariant;
}

const HtmlInCanvasBackgroundScene: React.FC<HtmlInCanvasBackgroundProps> = ({
  variant = "broadcast",
}) => {
  const { width, height } = useVideoConfig();
  const settings = VARIANT_SETTINGS[variant];
  const Graphic = GRAPHICS[settings.graphicId];
  const supported = HtmlInCanvas.isSupported();

  const palette: Palette = {
    background: baseTheme.colors.primary,
    accent: baseTheme.colors.secondary,
    text: baseTheme.colors.text.light,
  };

  const canvasEffects = [
    ...(settings.blurRadius > 0 ? [blur({ radius: settings.blurRadius })] : []),
    glow({
      radius: settings.glowRadius,
      intensity: settings.glowIntensity,
      threshold: settings.glowThreshold,
      color: palette.accent,
    }),
    ...(settings.chromaticAmount > 0
      ? [chromaticAberration({ amount: settings.chromaticAmount })]
      : []),
    vignette({
      amount: settings.vignetteAmount,
      radius: 0.58,
      feather: 0.46,
      color: palette.background,
    }),
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {supported ? (
        <HtmlInCanvas
          width={width}
          height={height}
          effects={canvasEffects}
          style={{ width, height }}
        >
          <Graphic palette={palette} />
        </HtmlInCanvas>
      ) : (
        <DomStudioFallback
          palette={palette}
          settings={settings}
          Graphic={Graphic}
        />
      )}

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 96,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 760,
            padding: "48px 56px",
            border: `2px solid ${palette.text}`,
            backgroundColor: "rgba(11, 22, 48, 0.88)",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)",
          }}
        >
          <div
            style={{
              color: palette.accent,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 8,
            }}
          >
            Fixtura / {settings.label}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -3,
            }}
          >
            Match day
          </div>
          <div
            style={{
              marginTop: 28,
              color: palette.text,
              fontSize: 30,
              lineHeight: 1.3,
            }}
          >
            {settings.description}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const makePrototype =
  (variant: HtmlInCanvasVariant): React.FC =>
  () => <HtmlInCanvasBackgroundScene variant={variant} />;

export const HtmlInCanvasBroadcastPrototype = makePrototype("broadcast");
export const HtmlInCanvasOrbitRingsPrototype = makePrototype("orbit-rings");
export const HtmlInCanvasScoreboardGridPrototype =
  makePrototype("scoreboard-grid");
export const HtmlInCanvasNeonBeamsPrototype = makePrototype("neon-beams");
