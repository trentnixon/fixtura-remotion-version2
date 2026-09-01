import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { glow } from "@remotion/effects/glow";
import { liquidContours } from "@remotion/effects/liquid-contours";
import { vignette } from "@remotion/effects/vignette";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 12;
type TopographicFlowVariant = "baseline" | "fine" | "smooth";

const VARIANT_SETTINGS: Record<
  TopographicFlowVariant,
  {
    label: string;
    description: string;
    spacing: number;
    scale: number;
    complexity: number;
    smoothness: number;
    glowRadius: number;
    glowIntensity: number;
    glowThreshold: number;
  }
> = {
  baseline: {
    label: "TOPOGRAPHIC TEST",
    description: "Topographic contours with repeating phase movement.",
    spacing: 72,
    scale: 300,
    complexity: 0.35,
    smoothness: 0.86,
    glowRadius: 18,
    glowIntensity: 0.45,
    glowThreshold: 0.35,
  },
  fine: {
    label: "FINE MAP LINES",
    description: "Dense contour detail with a more energetic texture.",
    spacing: 34,
    scale: 250,
    complexity: 0.7,
    smoothness: 0.78,
    glowRadius: 10,
    glowIntensity: 0.25,
    glowThreshold: 0.55,
  },
  smooth: {
    label: "SMOOTH AMBIENT",
    description: "Soft low-detail movement for text-heavy layouts.",
    spacing: 96,
    scale: 440,
    complexity: 0.18,
    smoothness: 0.98,
    glowRadius: 28,
    glowIntensity: 0.18,
    glowThreshold: 0.6,
  },
};

/**
 * Prototype question:
 * Can animated liquid contours create a readable, repeatable Fixtura background?
 */
interface TopographicFlowPrototypeProps {
  variant?: TopographicFlowVariant;
}

export const TopographicFlowPrototype: React.FC<
  TopographicFlowPrototypeProps
> = ({ variant = "baseline" }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const phase = ((frame % loopFrames) / loopFrames) * Math.PI * 2;
  const settings = VARIANT_SETTINGS[variant];
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
          liquidContours({
            firstColor: palette.accent,
            secondColor: palette.background,
            spacing: settings.spacing,
            scale: settings.scale,
            complexity: settings.complexity,
            smoothness: settings.smoothness,
            seed: 7,
            phase,
          }),
          glow({
            radius: settings.glowRadius,
            intensity: settings.glowIntensity,
            threshold: settings.glowThreshold,
            color: palette.accent,
          }),
          vignette({
            amount: 0.62,
            radius: 0.62,
            feather: 0.42,
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

export const TopographicFineMapPrototype: React.FC = () => (
  <TopographicFlowPrototype variant="fine" />
);

export const TopographicSmoothAmbientPrototype: React.FC = () => (
  <TopographicFlowPrototype variant="smooth" />
);
