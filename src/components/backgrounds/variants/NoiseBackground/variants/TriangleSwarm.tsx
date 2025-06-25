import React from "react";
import { ParticleNoise } from "../ParticleNoise";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

interface TriangleSwarmProps {
  baseColor?: string;
}

const TriangleSwarm: React.FC<TriangleSwarmProps> = ({ baseColor }) => {
  const { selectedPalette } = useThemeContext();

  return (
    <ParticleNoise
      baseColor={baseColor}
      particleShape={"triangle"}
      speed={0.007}
      circleRadius={10}
      maxOffset={40}
      particleColor={selectedPalette.background.light}
      particleCount={{ rows: 30, cols: 30 }}
    />
  );
};

export default TriangleSwarm;
