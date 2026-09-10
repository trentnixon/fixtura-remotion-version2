import React from "react";
import { staticFile } from "remotion";

type ScorelineSurfaceGrainProps = {
  opacity?: number;
  className?: string;
};

const NOISE_URL = staticFile("textures/fine-noise.svg");

export const ScorelineSurfaceGrain: React.FC<ScorelineSurfaceGrainProps> = ({
  opacity = 0.05,
  className = "",
}) => {
  return (
    <span
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        backgroundImage: `url("${NOISE_URL}")`,
        backgroundSize: "256px 256px",
        backgroundRepeat: "repeat",
        mixBlendMode: "soft-light",
        opacity,
      }}
      aria-hidden
    />
  );
};
