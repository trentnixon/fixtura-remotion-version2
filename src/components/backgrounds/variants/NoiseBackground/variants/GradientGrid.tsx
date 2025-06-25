import React from "react";
import { GridNoise } from "../GridNoise";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

const GradientGrid: React.FC<React.ComponentProps<typeof GridNoise>> = (
  props,
) => {
  const { selectedPalette } = useThemeContext();

  return (
    <GridNoise
      {...props}
      startColor={selectedPalette.background.accent}
      endColor={selectedPalette.background.main}
      gradientDirection="horizontal"
      blurAmount={50}
      noiseOpacity={0.4}
      noiseScale={1.5}
      noiseSpeed={0.005}
      gridSize={25}
    />
  );
};

export default GradientGrid;
