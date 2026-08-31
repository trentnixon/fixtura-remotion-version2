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
import { wave } from "@remotion/effects/wave";
import { zigzag, type ZigzagDirection } from "@remotion/effects/zigzag";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 12;

type WaveFieldVariant = "baseline" | "wide-rows" | "vertical";

const VARIANT_SETTINGS: Record<
  WaveFieldVariant,
  {
    label: string;
    description: string;
    direction: ZigzagDirection;
    thickness: number;
    gap: number;
    amplitude: number;
    wavelength: number;
    verticalWaveAmplitude: number;
    verticalWaveWavelength: number;
    horizontalWaveAmplitude: number;
    horizontalWaveWavelength: number;
    horizontalWavePhaseScale: number;
    glowIntensity: number;
  }
> = {
  baseline: {
    label: "WAVE FIELD TEST",
    description: "Zigzag bands with slow dual-axis wave drift over a palette gradient.",
    direction: "horizontal",
    thickness: 26,
    gap: 6,
    amplitude: 22,
    wavelength: 240,
    verticalWaveAmplitude: 18,
    verticalWaveWavelength: 360,
    horizontalWaveAmplitude: 12,
    horizontalWaveWavelength: 520,
    horizontalWavePhaseScale: 0.5,
    glowIntensity: 0.22,
  },
  "wide-rows": {
    label: "WIDE ROWS",
    description: "Extra-wide zigzag bands with broader wave motion across the frame.",
    direction: "horizontal",
    thickness: 104,
    gap: 26,
    amplitude: 46,
    wavelength: 520,
    verticalWaveAmplitude: 28,
    verticalWaveWavelength: 560,
    horizontalWaveAmplitude: 18,
    horizontalWaveWavelength: 720,
    horizontalWavePhaseScale: 0.5,
    glowIntensity: 0.18,
  },
  vertical: {
    label: "VERTICAL BANDS",
    description: "Extra-wide vertical zigzag columns with cross-axis wave displacement.",
    direction: "vertical",
    thickness: 104,
    gap: 26,
    amplitude: 46,
    wavelength: 520,
    verticalWaveAmplitude: 18,
    verticalWaveWavelength: 560,
    horizontalWaveAmplitude: 28,
    horizontalWaveWavelength: 480,
    horizontalWavePhaseScale: 0.65,
    glowIntensity: 0.18,
  },
};

const getBandCycle = (thickness: number, gap: number) => (thickness + gap) * 3;

/**
 * Prototype question:
 * Can layered zigzag bands plus travelling wave displacement create a readable
 * ambient wave-field background with a repeatable twelve-second loop?
 */
interface WaveFieldPrototypeProps {
  variant?: WaveFieldVariant;
}

const WaveFieldScene: React.FC<WaveFieldPrototypeProps> = ({
  variant = "baseline",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  const phase = loopProgress * Math.PI * 2;
  const settings = VARIANT_SETTINGS[variant];
  const zigzagOffset = loopProgress * getBandCycle(settings.thickness, settings.gap);
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
            start: [0, 0],
            end: [1, 1],
            startColor: palette.background,
            endColor: palette.accent,
          }),
          zigzag({
            colors: [palette.accent, palette.text, palette.background],
            direction: settings.direction,
            thickness: settings.thickness,
            gap: settings.gap,
            amplitude: settings.amplitude,
            wavelength: settings.wavelength,
            offset: zigzagOffset,
          }),
          wave({
            phase,
            direction: "vertical",
            amplitude: settings.verticalWaveAmplitude,
            wavelength: settings.verticalWaveWavelength,
          }),
          wave({
            phase: phase * settings.horizontalWavePhaseScale,
            direction: "horizontal",
            amplitude: settings.horizontalWaveAmplitude,
            wavelength: settings.horizontalWaveWavelength,
          }),
          glow({
            radius: 14,
            intensity: settings.glowIntensity,
            threshold: 0.5,
            color: palette.accent,
          }),
          vignette({
            amount: 0.58,
            radius: 0.64,
            feather: 0.44,
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

export const WaveFieldPrototype: React.FC = () => (
  <WaveFieldScene variant="baseline" />
);

export const WaveFieldWideRowsPrototype: React.FC = () => (
  <WaveFieldScene variant="wide-rows" />
);

export const WaveFieldVerticalBandsPrototype: React.FC = () => (
  <WaveFieldScene variant="vertical" />
);
