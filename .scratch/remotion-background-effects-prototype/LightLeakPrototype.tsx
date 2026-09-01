import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { lightLeak } from "@remotion/light-leaks";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { vignette } from "@remotion/effects/vignette";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 12;

type LightLeakVariant =
  | "warm-flare"
  | "cool-flare"
  | "slow-breathe"
  | "dual-flare"
  | "vertical-wash"
  | "soft-bloom";

type GradientPoint = [number, number];

type LeakLayer = {
  seed: number;
  hueShift: number;
  phaseOffset: number;
};

const PALETTE_HUES = {
  primary: hexToHue(baseTheme.colors.primary),
  secondary: hexToHue(baseTheme.colors.secondary),
};

const VARIANT_SETTINGS: Record<
  LightLeakVariant,
  {
    label: string;
    description: string;
    gradientStart: GradientPoint;
    gradientEnd: GradientPoint;
    leaks: LeakLayer[];
    progressCycles: number;
    vignetteAmount: number;
    vignetteRadius: number;
  }
> = {
  "warm-flare": {
    label: "WARM FLARE",
    description:
      "Diagonal primary-to-secondary field with a warm leak keyed to the accent colour.",
    gradientStart: [0, 1],
    gradientEnd: [1, 0],
    leaks: [{ seed: 4, hueShift: PALETTE_HUES.secondary, phaseOffset: 0 }],
    progressCycles: 2,
    vignetteAmount: 0.58,
    vignetteRadius: 0.64,
  },
  "cool-flare": {
    label: "COOL FLARE",
    description:
      "Same diagonal field with a cool leak keyed to the primary hue.",
    gradientStart: [0, 1],
    gradientEnd: [1, 0],
    leaks: [{ seed: 9, hueShift: PALETTE_HUES.primary, phaseOffset: 0 }],
    progressCycles: 2,
    vignetteAmount: 0.62,
    vignetteRadius: 0.64,
  },
  "slow-breathe": {
    label: "SLOW BREATHE",
    description:
      "One full leak swell per twelve-second loop for a calmer broadcast read.",
    gradientStart: [0, 1],
    gradientEnd: [1, 0],
    leaks: [{ seed: 6, hueShift: PALETTE_HUES.secondary, phaseOffset: 0 }],
    progressCycles: 1,
    vignetteAmount: 0.56,
    vignetteRadius: 0.66,
  },
  "dual-flare": {
    label: "DUAL FLARE",
    description:
      "Warm and cool leaks offset by half a cycle so one rises as the other fades.",
    gradientStart: [0, 1],
    gradientEnd: [1, 0],
    leaks: [
      { seed: 4, hueShift: PALETTE_HUES.secondary, phaseOffset: 0 },
      { seed: 13, hueShift: PALETTE_HUES.primary, phaseOffset: 0.5 },
    ],
    progressCycles: 2,
    vignetteAmount: 0.6,
    vignetteRadius: 0.62,
  },
  "vertical-wash": {
    label: "VERTICAL WASH",
    description:
      "Top-to-bottom two-colour wash with a corner leak pattern from seed 11.",
    gradientStart: [0.5, 0],
    gradientEnd: [0.5, 1],
    leaks: [{ seed: 11, hueShift: PALETTE_HUES.secondary, phaseOffset: 0.15 }],
    progressCycles: 2,
    vignetteAmount: 0.54,
    vignetteRadius: 0.68,
  },
  "soft-bloom": {
    label: "SOFT BLOOM",
    description:
      "Lighter vignette and a wider leak shape for a softer match-day backdrop.",
    gradientStart: [0, 0.5],
    gradientEnd: [1, 0.5],
    leaks: [{ seed: 16, hueShift: PALETTE_HUES.secondary, phaseOffset: 0 }],
    progressCycles: 2,
    vignetteAmount: 0.42,
    vignetteRadius: 0.72,
  },
};

const getLeakProgress = (
  loopProgress: number,
  phaseOffset: number,
  progressCycles: number,
): number => {
  const phased = (loopProgress + phaseOffset) % 1;
  return 0.5 - 0.5 * Math.cos(phased * Math.PI * 2 * progressCycles);
};

/**
 * Prototype question:
 * Can a two-colour palette gradient with lightLeak() read as a repeatable
 * broadcast background loop?
 */
interface LightLeakPrototypeProps {
  variant?: LightLeakVariant;
}

const LightLeakScene: React.FC<LightLeakPrototypeProps> = ({
  variant = "warm-flare",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  const settings = VARIANT_SETTINGS[variant];
  const palette = {
    primary: baseTheme.colors.primary,
    secondary: baseTheme.colors.secondary,
    text: baseTheme.colors.text.light,
  };

  const leakEffects = settings.leaks.map((layer) =>
    lightLeak({
      seed: layer.seed,
      hueShift: layer.hueShift,
      progress: getLeakProgress(
        loopProgress,
        layer.phaseOffset,
        settings.progressCycles,
      ),
    }),
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.primary,
        color: palette.text,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Solid
        width={width}
        height={height}
        color={palette.primary}
        effects={[
          linearGradient({
            start: settings.gradientStart,
            end: settings.gradientEnd,
            startColor: palette.primary,
            endColor: palette.secondary,
          }),
          ...leakEffects,
          vignette({
            amount: settings.vignetteAmount,
            radius: settings.vignetteRadius,
            feather: 0.44,
            color: palette.primary,
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
            backgroundColor: palette.primary,
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)",
          }}
        >
          <div
            style={{
              color: palette.secondary,
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

function hexToHue(hex: string): number {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16) / 255;
  const g = Number.parseInt(normalized.slice(2, 4), 16) / 255;
  const b = Number.parseInt(normalized.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  if (max === min) {
    return 0;
  }

  const delta = max - min;
  let hue = 0;

  if (max === r) {
    hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
  } else if (max === g) {
    hue = ((b - r) / delta + 2) / 6;
  } else {
    hue = ((r - g) / delta + 4) / 6;
  }

  return hue * 360;
}

export const LightLeakWarmFlarePrototype: React.FC = () => (
  <LightLeakScene variant="warm-flare" />
);

export const LightLeakCoolFlarePrototype: React.FC = () => (
  <LightLeakScene variant="cool-flare" />
);

export const LightLeakSlowBreathePrototype: React.FC = () => (
  <LightLeakScene variant="slow-breathe" />
);

export const LightLeakDualFlarePrototype: React.FC = () => (
  <LightLeakScene variant="dual-flare" />
);

export const LightLeakVerticalWashPrototype: React.FC = () => (
  <LightLeakScene variant="vertical-wash" />
);

export const LightLeakSoftBloomPrototype: React.FC = () => (
  <LightLeakScene variant="soft-bloom" />
);
