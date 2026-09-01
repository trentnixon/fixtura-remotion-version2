import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { halftoneLinearGradient } from "@remotion/effects/halftone-linear-gradient";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { vignette } from "@remotion/effects/vignette";
import { wave } from "@remotion/effects/wave";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 6;

/**
 * Prototype question:
 * Can a palette-driven Effects stack produce a readable Fixtura broadcast background?
 */
export const BroadcastHalftoneWavePrototype: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const phase = ((frame % loopFrames) / loopFrames) * Math.PI * 2;
  const palette = {
    background: baseTheme.colors.primary,
    accent: baseTheme.colors.secondary,
    text: baseTheme.colors.text.light,
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
            start: [0, 0.1],
            end: [1, 0.9],
            startColor: palette.background,
            endColor: palette.accent,
          }),
          halftoneLinearGradient({
            firstStopDotSize: 2,
            secondStopDotSize: 46,
            firstStopPosition: [0, 0.08],
            secondStopPosition: [1, 0.88],
            gridSize: 34,
            dotColor: palette.text,
          }),
          wave({
            phase,
            direction: "horizontal",
            amplitude: 24,
            wavelength: 420,
          }),
          vignette({
            amount: 0.58,
            radius: 0.62,
            feather: 0.45,
            color: palette.background,
          }),
        ]}
      />

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
            Fixtura / WAVE TEST
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
            Broadcast halftone with repeating horizontal distortion.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
