import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { glow } from "@remotion/effects/glow";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { rings } from "@remotion/effects/rings";
import { vignette } from "@remotion/effects/vignette";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 12;
type EnergyBurstVariant = "baseline";

const VARIANT_SETTINGS: Record<
  EnergyBurstVariant,
  {
    label: string;
    description: string;
    center: [number, number];
    thickness: number;
    gap: number;
    glowRadius: number;
    glowBase: number;
    glowPulse: number;
  }
> = {
  baseline: {
    label: "ENERGY BURST TEST",
    description: "Concentric energy rings with a repeating radial pulse.",
    center: [0.5, 0.42],
    thickness: 8,
    gap: 40,
    glowRadius: 18,
    glowBase: 0.3,
    glowPulse: 0.2,
  },
};

/**
 * Prototype question:
 * Can the available rings and glow effects approximate an Energy Burst while
 * starburst() and lightLeak() remain unavailable on the pinned baseline?
 */
interface EnergyBurstPrototypeProps {
  variant?: EnergyBurstVariant;
}

const EnergyBurstScene: React.FC<EnergyBurstPrototypeProps> = ({
  variant = "baseline",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  const settings = VARIANT_SETTINGS[variant];
  const ringCycle = (settings.thickness + settings.gap) * 3;
  const ringOffset = loopProgress * ringCycle;
  const pulse = 0.5 + Math.sin(loopProgress * Math.PI * 2) * 0.5;
  const center = settings.center;
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
            endColor: palette.accent,
          }),
          rings({
            colors: [palette.accent, palette.text, palette.accent],
            center,
            thickness: settings.thickness,
            gap: settings.gap,
            offset: ringOffset,
          }),
          glow({
            radius: settings.glowRadius,
            intensity: settings.glowBase + pulse * settings.glowPulse,
            threshold: 0.42,
            color: palette.accent,
          }),
          vignette({
            amount: 0.64,
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

export const EnergyBurstPrototype: React.FC = () => (
  <EnergyBurstScene variant="baseline" />
);
