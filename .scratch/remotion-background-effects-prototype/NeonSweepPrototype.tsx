import React from "react";
import {
  AbsoluteFill,
  Solid,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { blur } from "@remotion/effects/blur";
import { chromaticAberration } from "@remotion/effects/chromatic-aberration";
import { glow } from "@remotion/effects/glow";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { lines, type LinesDirection } from "@remotion/effects/lines";
import { vignette } from "@remotion/effects/vignette";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 12;

type NeonSweepVariant = "wide-beams" | "heavy-glow";

const VARIANT_SETTINGS: Record<
  NeonSweepVariant,
  {
    label: string;
    description: string;
    direction: LinesDirection;
    thickness: number;
    gap: number;
    angle: number;
    blurRadius: number;
    glowRadius: number;
    glowIntensity: number;
    glowThreshold: number;
    chromaticAmount: number;
    gradientDepth: string;
  }
> = {
  "wide-beams": {
    label: "WIDE BEAMS",
    description: "Extra-wide diagonal neon beams with a slower, bolder sweep read.",
    direction: "horizontal",
    thickness: 36,
    gap: 72,
    angle: -26,
    blurRadius: 5,
    glowRadius: 34,
    glowIntensity: 0.52,
    glowThreshold: 0.28,
    chromaticAmount: 7,
    gradientDepth: "#111827",
  },
  "heavy-glow": {
    label: "HEAVY GLOW",
    description: "Dense diagonal lines with stronger blur, glow, and chromatic split.",
    direction: "horizontal",
    thickness: 4,
    gap: 18,
    angle: -38,
    blurRadius: 6,
    glowRadius: 30,
    glowIntensity: 0.58,
    glowThreshold: 0.28,
    chromaticAmount: 9,
    gradientDepth: "#050816",
  },
};

const getLineCycle = (thickness: number, gap: number) => (thickness + gap) * 3;

/**
 * Prototype question:
 * Can diagonal neon line sweeps with blur, glow, and chromatic aberration stay
 * readable as a repeatable twelve-second background loop?
 */
interface NeonSweepPrototypeProps {
  variant?: NeonSweepVariant;
}

const NeonSweepScene: React.FC<NeonSweepPrototypeProps> = ({
  variant = "wide-beams",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  const settings = VARIANT_SETTINGS[variant];
  const lineOffset = loopProgress * getLineCycle(settings.thickness, settings.gap);
  const aberrationAngle = loopProgress * 360;
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
            start: [0, 1],
            end: [1, 0],
            startColor: palette.background,
            endColor: settings.gradientDepth,
          }),
          lines({
            colors: [palette.accent, palette.text, palette.accent],
            direction: settings.direction,
            thickness: settings.thickness,
            gap: settings.gap,
            angle: settings.angle,
            offset: lineOffset,
          }),
          blur({
            radius: settings.blurRadius,
          }),
          glow({
            radius: settings.glowRadius,
            intensity: settings.glowIntensity,
            threshold: settings.glowThreshold,
            color: palette.accent,
          }),
          chromaticAberration({
            amount: settings.chromaticAmount,
            angle: aberrationAngle,
          }),
          vignette({
            amount: 0.66,
            radius: 0.6,
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

export const NeonSweepWideBeamsPrototype: React.FC = () => (
  <NeonSweepScene variant="wide-beams" />
);

export const NeonSweepHeavyGlowPrototype: React.FC = () => (
  <NeonSweepScene variant="heavy-glow" />
);
