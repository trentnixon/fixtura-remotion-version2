import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { RemotionRiveCanvas } from "@remotion/rive";
import { glow } from "@remotion/effects/glow";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { vignette } from "@remotion/effects/vignette";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 12;

/** Mock CDN asset until designer `.riv` files flow through asset ingest. */
const MOCK_RIVE_SRC = "https://cdn.rive.app/animations/vehicles.riv";

const TILE_COUNT = 2;
const MOTIF_OPACITY = 0.32;

/**
 * Retained Rive tiled motif — 2×2 field with staggered opacity.
 */
export const RiveMotifTiledFieldPrototype: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;

  const palette = {
    background: baseTheme.colors.primary,
    accent: baseTheme.colors.secondary,
    text: baseTheme.colors.text.light,
  };

  const cellW = width / TILE_COUNT;
  const cellH = height / TILE_COUNT;

  const tiles = Array.from({ length: TILE_COUNT * TILE_COUNT }, (_, index) => {
    const row = Math.floor(index / TILE_COUNT);
    const col = index % TILE_COUNT;
    const phase = (row + col) % 3;

    return (
      <AbsoluteFill
        key={index}
        style={{
          left: col * cellW,
          top: row * cellH,
          width: cellW,
          height: cellH,
          overflow: "hidden",
        }}
      >
        <AbsoluteFill
          style={{
            opacity: MOTIF_OPACITY * (0.85 + phase * 0.06),
            pointerEvents: "none",
          }}
        >
          <RemotionRiveCanvas
            src={MOCK_RIVE_SRC}
            fit="cover"
            alignment="center"
            style={{ width: "100%", height: "100%" }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    );
  });

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

      <AbsoluteFill style={{ overflow: "hidden" }}>{tiles}</AbsoluteFill>

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
            Fixtura / RIVE MOTIF / TILED
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
            2×2 Rive tile field with staggered opacity over the palette
            gradient.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
