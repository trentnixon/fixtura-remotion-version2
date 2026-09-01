import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { gridlines } from "@remotion/effects/gridlines";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { scanlines } from "@remotion/effects/scanlines";
import { vignette } from "@remotion/effects/vignette";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 12;
type SignalGridVariant = "floor" | "floor-inverted";

const VARIANT_SETTINGS: Record<
  SignalGridVariant,
  {
    label: string;
    description: string;
    gridSize: number;
    lineWidth: number;
    rotation: number;
    rotationX: number;
    rotationY: number;
    perspective: number;
    scanAmount: number;
    scanSpacing: number;
  }
> = {
  floor: {
    label: "PERSPECTIVE FLOOR",
    description: "Deep floor-plane grid with slow vertical movement.",
    gridSize: 64,
    lineWidth: 2,
    rotation: 0,
    rotationX: 42,
    rotationY: 0,
    perspective: 650,
    scanAmount: 0.08,
    scanSpacing: 8,
  },
  "floor-inverted": {
    label: "PERSPECTIVE FLOOR / INVERTED GRID",
    description:
      "Vertically inverted floor-plane grid with larger cells at the bottom.",
    gridSize: 64,
    lineWidth: 2,
    rotation: 0,
    rotationX: -42,
    rotationY: 0,
    perspective: 650,
    scanAmount: 0.08,
    scanSpacing: 8,
  },
};

/**
 * Prototype question:
 * Can a restrained perspective grid create a readable Fixtura signal background?
 */
interface SignalGridPrototypeProps {
  variant?: SignalGridVariant;
}

const SignalGridPrototype: React.FC<SignalGridPrototypeProps> = ({
  variant = "floor",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  const settings = VARIANT_SETTINGS[variant];
  const gridOffsetX = 0;
  const gridOffsetY = loopProgress * settings.gridSize;
  const scanlineOffset = ((frame % loopFrames) / loopFrames) * 6;
  const palette = {
    background: baseTheme.colors.primary,
    accent: baseTheme.colors.secondary,
    text: baseTheme.colors.text.light,
    panel: baseTheme.colors.primary,
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
          gridlines({
            gridSize: settings.gridSize,
            lineWidth: settings.lineWidth,
            lineColor: palette.text,
            backgroundColor: "transparent",
            rotation: settings.rotation,
            rotationX: settings.rotationX,
            rotationY: settings.rotationY,
            perspective: settings.perspective,
            offsetX: gridOffsetX,
            offsetY: gridOffsetY,
          }),
          scanlines({
            amount: settings.scanAmount,
            spacing: settings.scanSpacing,
            thickness: 1,
            offset: scanlineOffset,
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
            backgroundColor: palette.panel,
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

export const SignalGridPerspectiveFloorPrototype: React.FC = () => (
  <SignalGridPrototype variant="floor" />
);

export const SignalGridPerspectiveFloorInvertedPrototype: React.FC = () => (
  <SignalGridPrototype variant="floor-inverted" />
);
