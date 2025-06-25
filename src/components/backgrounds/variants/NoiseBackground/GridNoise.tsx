import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolateColors } from "remotion";
import { noise2D, noise3D } from "@remotion/noise";

interface GridNoiseProps {
  baseColor?: string;
  noiseColor?: string;
  startColor?: string;
  endColor?: string;
  gradientDirection?: "horizontal" | "vertical";
  blurAmount?: number;
  noiseOpacity?: number;
  noiseScale?: number;
  noiseSpeed?: number;
  noiseDimension?: "2d" | "3d";
  noiseSeed?: string;
  gridSize?: number;
  cellShape?: "square" | "circle";
  className?: string;
  style?: React.CSSProperties;
}

export const GridNoise: React.FC<GridNoiseProps> = ({
  baseColor = "#000021",
  noiseColor,
  startColor,
  endColor,
  gradientDirection = "horizontal",
  blurAmount = 0,
  noiseOpacity = 0.3,
  noiseScale = 1,
  noiseSpeed = 0.05,
  noiseDimension = "2d",
  noiseSeed = "noise-seed",
  gridSize = 20,
  cellShape = "square",
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();

  // Generate noise value based on frame
  const time = frame * noiseSpeed;

  // Create a grid of noise values
  const cells = [];

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const xPos = (x / gridSize) * noiseScale;
      const yPos = (y / gridSize) * noiseScale;

      // Generate noise value
      let noiseValue;
      if (noiseDimension === "2d") {
        noiseValue = noise2D(noiseSeed, xPos + time, yPos + time);
      } else {
        noiseValue = noise3D(noiseSeed, xPos, yPos, time);
      }

      // Determine the color for the cell
      let cellColor = noiseColor || "#ffffff";
      if (startColor && endColor) {
        const interpolationPoint =
          gradientDirection === "horizontal" ? x / gridSize : y / gridSize;
        cellColor = interpolateColors(
          interpolationPoint,
          [0, 1],
          [startColor, endColor],
        );
      }

      // Map noise value to opacity (0-1 range)
      const opacity = Math.abs(noiseValue) * noiseOpacity;

      // Calculate position and size
      const cellWidth = 100 / gridSize;
      const cellHeight = 100 / gridSize;

      cells.push({
        x: x * cellWidth,
        y: y * cellHeight,
        width: cellWidth,
        height: cellHeight,
        opacity,
        color: cellColor,
      });
    }
  }

  return (
    <AbsoluteFill
      className={`bg-noise ${className}`}
      style={{
        backgroundColor: baseColor,
        zIndex: -1,
        filter: `blur(${blurAmount}px)`,
        ...style,
      }}
    >
      {/* Render noise cells */}
      {cells.map((cell, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            width: `${cell.width}%`,
            height: `${cell.height}%`,
            backgroundColor: cell.color,
            opacity: cell.opacity,
            borderRadius: cellShape === "circle" ? "50%" : 0,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
