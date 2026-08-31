import React from "react";
import {
  AbsoluteFill,
  Solid,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { glow } from "@remotion/effects/glow";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { vignette } from "@remotion/effects/vignette";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 12;

type ReactivePathVariant = "orbits" | "hits";

type OrbitSpec = {
  radius: number;
  dashRatio: number;
  strokeWidth: number;
  direction: 1 | -1;
  color: "accent" | "text";
};

type RouteSpec = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeWidth: number;
  color: "accent" | "text";
  direction: 1 | -1;
  phase: number;
};

type Palette = {
  background: string;
  accent: string;
  text: string;
};

type ResolvedRoute = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
};

/** Concentric orbit rings — static field, travelling dashes only. */
const ORBITS: OrbitSpec[] = [
  { radius: 220, dashRatio: 0.34, strokeWidth: 2, direction: 1, color: "text" },
  { radius: 310, dashRatio: 0.28, strokeWidth: 2, direction: -1, color: "accent" },
  { radius: 400, dashRatio: 0.22, strokeWidth: 3, direction: 1, color: "text" },
  { radius: 490, dashRatio: 0.18, strokeWidth: 2, direction: -1, color: "accent" },
  { radius: 580, dashRatio: 0.14, strokeWidth: 2, direction: 1, color: "text" },
];

/** Fixture-style play routes spread across the frame — no central atom hub. */
const ROUTES: RouteSpec[] = [
  {
    x1: 0.07,
    y1: 0.14,
    x2: 0.93,
    y2: 0.11,
    strokeWidth: 2,
    color: "text",
    direction: 1,
    phase: 0,
  },
  {
    x1: 0.09,
    y1: 0.27,
    x2: 0.91,
    y2: 0.31,
    strokeWidth: 2,
    color: "accent",
    direction: -1,
    phase: 0.14,
  },
  {
    x1: 0.06,
    y1: 0.44,
    x2: 0.88,
    y2: 0.4,
    strokeWidth: 3,
    color: "text",
    direction: 1,
    phase: 0.28,
  },
  {
    x1: 0.12,
    y1: 0.58,
    x2: 0.9,
    y2: 0.62,
    strokeWidth: 2,
    color: "accent",
    direction: 1,
    phase: 0.42,
  },
  {
    x1: 0.08,
    y1: 0.74,
    x2: 0.86,
    y2: 0.7,
    strokeWidth: 2,
    color: "text",
    direction: -1,
    phase: 0.56,
  },
  {
    x1: 0.14,
    y1: 0.86,
    x2: 0.72,
    y2: 0.52,
    strokeWidth: 2,
    color: "accent",
    direction: 1,
    phase: 0.7,
  },
];

const VARIANT_SETTINGS: Record<
  ReactivePathVariant,
  { label: string; description: string }
> = {
  orbits: {
    label: "REACTIVE PATH / ORBITS",
    description:
      "Concentric orbit rings with travelling dash energy — static field, no spin.",
  },
  hits: {
    label: "REACTIVE PATH / HITS",
    description: "Pulsing hit marks travelling along fixture routes.",
  },
};

const resolveRoute = (
  route: RouteSpec,
  width: number,
  height: number,
): ResolvedRoute => {
  const x1 = route.x1 * width;
  const y1 = route.y1 * height;
  const x2 = route.x2 * width;
  const y2 = route.y2 * height;

  return {
    x1,
    y1,
    x2,
    y2,
    length: Math.hypot(x2 - x1, y2 - y1),
  };
};

const strokeFor = (palette: Palette, color: RouteSpec["color"]) =>
  color === "accent" ? palette.accent : palette.text;

const routeProgress = (route: RouteSpec, loopProgress: number) =>
  (loopProgress * route.direction + route.phase + 1) % 1;

const pointOnRoute = (
  route: RouteSpec,
  width: number,
  height: number,
  t: number,
) => {
  const resolved = resolveRoute(route, width, height);
  const clampedT = route.direction === 1 ? t : 1 - t;

  return {
    x: resolved.x1 + (resolved.x2 - resolved.x1) * clampedT,
    y: resolved.y1 + (resolved.y2 - resolved.y1) * clampedT,
  };
};

const renderOrbits = (
  palette: Palette,
  centerX: number,
  centerY: number,
  loopProgress: number,
) =>
  ORBITS.map((orbit, index) => {
    const circumference = 2 * Math.PI * orbit.radius;
    const dashLength = circumference * orbit.dashRatio;
    const gapLength = circumference - dashLength;
    const dashOffset =
      loopProgress * circumference * orbit.direction + index * 48;

    return (
      <circle
        key={orbit.radius}
        cx={centerX}
        cy={centerY}
        r={orbit.radius}
        fill="none"
        stroke={strokeFor(palette, orbit.color)}
        strokeWidth={orbit.strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${dashLength} ${gapLength}`}
        strokeDashoffset={dashOffset}
        opacity={0.72}
      />
    );
  });

const renderRouteTracks = (
  palette: Palette,
  width: number,
  height: number,
  opacity = 0.22,
) =>
  ROUTES.map((route, index) => {
    const resolved = resolveRoute(route, width, height);

    return (
      <line
        key={`track-${index}`}
        x1={resolved.x1}
        y1={resolved.y1}
        x2={resolved.x2}
        y2={resolved.y2}
        stroke={strokeFor(palette, route.color)}
        strokeWidth={1}
        opacity={opacity}
      />
    );
  });

const renderHits = (
  palette: Palette,
  width: number,
  height: number,
  loopProgress: number,
) => {
  const hitPulse = 0.5 + Math.sin(loopProgress * Math.PI * 2 * 4) * 0.5;

  return (
    <>
      {renderRouteTracks(palette, width, height, 0.3)}
      {ROUTES.flatMap((route, routeIndex) =>
        [0, 0.33].map((hitPhase) => {
          const travel = routeProgress(route, loopProgress + hitPhase);
          const point = pointOnRoute(route, width, height, travel);
          const localPulse =
            0.45 +
            Math.sin((loopProgress + hitPhase) * Math.PI * 2 * 3) * 0.55;
          const radius = 5 + localPulse * 6 + hitPulse * 2;

          return (
            <g key={`${routeIndex}-${hitPhase}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r={radius * 1.9}
                fill={palette.accent}
                opacity={0.1 + localPulse * 0.14}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={radius}
                fill={hitPhase === 0 ? palette.accent : palette.text}
                opacity={0.55 + localPulse * 0.4}
              />
            </g>
          );
        }),
      )}
    </>
  );
};

/**
 * Prototype question:
 * Can fixture-style route marks over a palette field read as sports energy
 * without binding to production composition data yet?
 */
interface ReactivePathSystemProps {
  variant?: ReactivePathVariant;
}

const ReactivePathScene: React.FC<ReactivePathSystemProps> = ({
  variant = "orbits",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  const settings = VARIANT_SETTINGS[variant];
  const palette: Palette = {
    background: baseTheme.colors.primary,
    accent: baseTheme.colors.secondary,
    text: baseTheme.colors.text.light,
  };

  const centerX = width * 0.52;
  const centerY = height * 0.46;

  const renderVariant = () => {
    if (variant === "hits") {
      return renderHits(palette, width, height, loopProgress);
    }

    return renderOrbits(palette, centerX, centerY, loopProgress);
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Solid
        width={width}
        height={height}
        color={palette.background}
        effects={[
          linearGradient({
            start: [0.1, 0],
            end: [0.9, 1],
            startColor: palette.background,
            endColor: palette.accent,
          }),
          glow({
            radius: variant === "hits" ? 20 : 16,
            intensity: variant === "hits" ? 0.24 : 0.18,
            threshold: 0.52,
            color: palette.accent,
          }),
          vignette({
            amount: 0.64,
            radius: 0.62,
            feather: 0.46,
            color: palette.background,
          }),
        ]}
      />

      <AbsoluteFill style={{ overflow: "hidden" }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ position: "absolute", inset: 0 }}
        >
          {renderVariant()}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 96,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 760,
            padding: "48px 56px",
            border: `2px solid ${palette.text}`,
            backgroundColor: palette.background,
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

export const ReactivePathSystemPrototype: React.FC = () => (
  <ReactivePathScene variant="orbits" />
);

export const ReactivePathHitsPrototype: React.FC = () => (
  <ReactivePathScene variant="hits" />
);
