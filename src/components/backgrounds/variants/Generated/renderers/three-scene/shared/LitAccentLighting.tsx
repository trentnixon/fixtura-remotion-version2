import React from "react";

type LitAccentLightingProps = {
  accent: string;
};

export const LitAccentLighting: React.FC<LitAccentLightingProps> = ({
  accent,
}) => (
  <>
    <ambientLight intensity={0.25} />
    <directionalLight position={[4, 6, 8]} intensity={2.2} />
    <directionalLight position={[-5, -2, 4]} intensity={0.8} color={accent} />
  </>
);
