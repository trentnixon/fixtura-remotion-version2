import React from "react";
import { AbsoluteFill } from "remotion";
import { SolidBackground } from "./SolidBackground";
import { GradientBackground } from "./GradientBackground";
import { NoiseBackground } from "./NoiseBackground";
import { PatternBackground } from "./PatternBackground";

// Define layer types
type LayerType =
  | { type: "solid"; color: string; opacity?: number }
  | {
      type: "gradient";
      gradientType?: string;
      colors: string[];
      direction?: string;
      opacity?: number;
    }
  | {
      type: "noise";
      baseColor?: string;
      noiseColor?: string;
      noiseOpacity?: number;
      noiseScale?: number;
      opacity?: number;
    }
  | {
      type: "pattern";
      pattern?: string;
      primaryColor?: string;
      secondaryColor?: string;
      opacity?: number;
    };

interface LayeredBackgroundProps {
  layers: LayerType[];
  className?: string;
  style?: React.CSSProperties;
}

export const LayeredBackground: React.FC<LayeredBackgroundProps> = ({
  layers = [],
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill
      className={`bg-layered ${className}`}
      style={{
        zIndex: -1,
        ...style,
      }}
    >
      {/* Render each layer */}
      {layers.map((layer, index) => {
        const zIndex = -10 + index; // Ensure proper stacking
        const opacity = layer.opacity !== undefined ? layer.opacity : 1;

        switch (layer.type) {
          case "solid":
            return (
              <SolidBackground
                key={`layer-${index}`}
                color={layer.color}
                opacity={opacity}
                style={{ zIndex }}
              />
            );

          case "gradient":
            return (
              <GradientBackground
                key={`layer-${index}`}
                gradientType={layer.gradientType as any}
                colors={layer.colors}
                direction={layer.direction}
                style={{ zIndex, opacity }}
              />
            );

          case "noise":
            return (
              <NoiseBackground
                key={`layer-${index}`}
                baseColor={layer.baseColor}
                noiseColor={layer.noiseColor}
                noiseOpacity={layer.noiseOpacity}
                noiseScale={layer.noiseScale}
                style={{ zIndex, opacity }}
              />
            );

          case "pattern":
            return (
              <PatternBackground
                key={`layer-${index}`}
                pattern={layer.pattern as any}
                primaryColor={layer.primaryColor}
                secondaryColor={layer.secondaryColor}
                style={{ zIndex, opacity }}
              />
            );

          default:
            return null;
        }
      })}
    </AbsoluteFill>
  );
};
