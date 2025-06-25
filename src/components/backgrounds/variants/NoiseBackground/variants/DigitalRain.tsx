import React from "react";
import { ParticleNoise } from "../ParticleNoise";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

interface DigitalRainProps {
  baseColor?: string;
}

const DigitalRain: React.FC<DigitalRainProps> = ({ baseColor }) => {
  const { selectedPalette } = useThemeContext();

  return (
    <ParticleNoise
      baseColor={baseColor}
      particleShape={"line"}
      speed={0.005}
      circleRadius={20} // This will be the line width
      maxOffset={40}
      particleColor={selectedPalette.background.light}
      particleCount={{ rows: 25, cols: 25 }}
    />
  );
};

export default DigitalRain;
