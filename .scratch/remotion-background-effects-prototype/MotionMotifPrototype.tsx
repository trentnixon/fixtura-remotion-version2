import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Solid,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Lottie } from "@remotion/lottie";
import { glow } from "@remotion/effects/glow";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { vignette } from "@remotion/effects/vignette";
import { baseTheme } from "../../src/templates/base/theme";
import { createBroadcastMotifLottie } from "./broadcastMotifLottie";

const LOOP_DURATION_IN_SECONDS = 12;

type MotionMotifVariant = "baseline" | "tiled-field";

const VARIANT_SETTINGS: Record<
  MotionMotifVariant,
  {
    label: string;
    description: string;
    motifOpacity: number;
    motifScale: number;
    tileCount?: number;
  }
> = {
  baseline: {
    label: "MOTION MOTIF / BASELINE",
    description:
      "Designer-authored Lottie loop recoloured from the Fixtura palette.",
    motifOpacity: 0.42,
    motifScale: 1.18,
  },
  "tiled-field": {
    label: "MOTION MOTIF / TILED",
    description:
      "Repeated club motif tiles with staggered playback across the field.",
    motifOpacity: 0.28,
    motifScale: 0.46,
    tileCount: 3,
  },
};

/**
 * Prototype question:
 * Can a designer-authored Lottie motif recoloured per club read as a repeatable
 * broadcast background without binding to production asset ingest yet?
 */
interface MotionMotifPrototypeProps {
  variant?: MotionMotifVariant;
}

const MotionMotifScene: React.FC<MotionMotifPrototypeProps> = ({
  variant = "baseline",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  const settings = VARIANT_SETTINGS[variant];

  const palette = {
    background: baseTheme.colors.primary,
    accent: baseTheme.colors.secondary,
    text: baseTheme.colors.text.light,
  };

  const animationData = useMemo(
    () =>
      createBroadcastMotifLottie({
        accent: palette.accent,
        text: palette.text,
      }),
    [palette.accent, palette.text],
  );

  const motifStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    opacity: settings.motifOpacity,
    transform: `scale(${settings.motifScale})`,
    transformOrigin: "center center",
  };

  const renderMotif = (key: string, playbackRate = 1, opacity = 1) => (
    <div
      key={key}
      style={{
        ...motifStyle,
        opacity: settings.motifOpacity * opacity,
      }}
    >
      <Lottie
        animationData={animationData}
        loop
        playbackRate={playbackRate}
        renderer="svg"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );

  const renderMotifField = () => {
    if (variant !== "tiled-field" || !settings.tileCount) {
      return renderMotif("center");
    }

    const tiles: React.ReactNode[] = [];
    const cellW = width / settings.tileCount;
    const cellH = height / settings.tileCount;

    for (let row = 0; row < settings.tileCount; row++) {
      for (let col = 0; col < settings.tileCount; col++) {
        const phase = (row + col) % 3;
        tiles.push(
          <AbsoluteFill
            key={`${row}-${col}`}
            style={{
              left: col * cellW,
              top: row * cellH,
              width: cellW,
              height: cellH,
              overflow: "hidden",
            }}
          >
            {renderMotif(
              `${row}-${col}`,
              phase === 0 ? 1 : phase === 1 ? 0.82 : 1.18,
              0.85 + phase * 0.05,
            )}
          </AbsoluteFill>,
        );
      }
    }

    return tiles;
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
            start: [0.08, 0],
            end: [0.92, 1],
            startColor: palette.background,
            endColor: palette.accent,
          }),
          glow({
            radius: 18,
            intensity: 0.16 + Math.sin(loopProgress * Math.PI * 2) * 0.04,
            threshold: 0.5,
            color: palette.accent,
          }),
          vignette({
            amount: 0.66,
            radius: 0.6,
            feather: 0.48,
            color: palette.background,
          }),
        ]}
      />

      <AbsoluteFill style={{ overflow: "hidden" }}>
        {renderMotifField()}
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

export const MotionMotifPrototype: React.FC = () => (
  <MotionMotifScene variant="baseline" />
);

export const MotionMotifTiledFieldPrototype: React.FC = () => (
  <MotionMotifScene variant="tiled-field" />
);
