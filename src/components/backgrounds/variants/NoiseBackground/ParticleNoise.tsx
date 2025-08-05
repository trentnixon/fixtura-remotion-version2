import { noise3D } from "@remotion/noise";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ShapeNoise, SupportedShape } from "./ShapeNoise";
import { useThemeContext } from "../../../../core/context/ThemeContext";

interface ParticleNoiseProps {
  baseColor?: string;
  speed?: number;
  circleRadius?: number;
  maxOffset?: number;
  particleColor?: string;
  particleCount?: {
    rows: number;
    cols: number;
  };
  noiseSeed?: string;
  particleShape?: SupportedShape;
}

export const ParticleNoise: React.FC<ParticleNoiseProps> = ({
  speed = 0.01,
  circleRadius = 5,
  maxOffset = 50,
  particleCount = { rows: 10, cols: 15 },
  noiseSeed = "particle-noise-seed",
  particleShape = "circle",
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();
  const OVERSCAN_MARGIN = 50;
  // selectedPalette
  const { selectedPalette } = useThemeContext();
  const bgOptions =
    selectedPalette.container.gradientPrimaryToSecondaryVertical;
  return (
    <AbsoluteFill
      style={{
        background: bgOptions,
      }}
    >
      <svg width={width} height={height}>
        {new Array(particleCount.cols).fill(0).map((_, i) =>
          new Array(particleCount.rows).fill(0).map((__, j) => {
            const x = i * ((width + OVERSCAN_MARGIN) / particleCount.cols);
            const y = j * ((height + OVERSCAN_MARGIN) / particleCount.rows);
            const px = i / particleCount.cols;
            const py = j / particleCount.rows;

            const dx =
              noise3D(noiseSeed + "x", px, py, frame * speed) * maxOffset;
            const dy =
              noise3D(noiseSeed + "y", px, py, frame * speed) * maxOffset;

            const opacity = interpolate(
              noise3D(noiseSeed + "opacity", i, j, frame * speed),
              [-1, 1],
              [0, 0.5],
            );

            const key = `${i}-${j}`;

            return (
              <ShapeNoise
                key={key}
                shape={particleShape}
                x={x + dx}
                y={y + dy}
                size={circleRadius * 2}
                color={selectedPalette.container.main}
                opacity={opacity}
              />
            );
          }),
        )}
      </svg>
    </AbsoluteFill>
  );
};
