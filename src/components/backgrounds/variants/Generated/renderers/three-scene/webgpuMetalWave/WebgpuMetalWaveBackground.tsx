import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThemeContext } from "../../../../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../../../../core/context/VideoDataContext";
import { createWebGPURenderer } from "../shared/createWebGPURenderer";
import { LitAccentLighting } from "../shared/LitAccentLighting";
import { THREE_SCENE_CAMERA_Z } from "../shared/sceneConstants";
import type { ThreeScenePalette } from "../shared/types";
import { MetalWaveMesh } from "./MetalWaveMesh";

export const WebgpuMetalWaveBackground: React.FC = () => {
  const { width, height } = useVideoConfig();
  const { selectedPalette } = useThemeContext();
  const { video } = useVideoDataContext();

  const theme = video.appearance?.theme;
  const palette: ThreeScenePalette = {
    main:
      selectedPalette.background.main ??
      theme?.primary ??
      selectedPalette.background.userPrimary ??
      "#111111",
    accent:
      selectedPalette.background.accent ??
      theme?.secondary ??
      selectedPalette.background.userSecondary ??
      "#ffffff",
    line:
      selectedPalette.text.onBackground.light ??
      selectedPalette.background.light ??
      theme?.white ??
      "#ffffff",
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.main,
        zIndex: -1,
      }}
    >
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ fov: 50, position: [0, 0, THREE_SCENE_CAMERA_Z] }}
        gl={createWebGPURenderer}
      >
        <color attach="background" args={[palette.main]} />
        <LitAccentLighting accent={palette.accent} />
        <MetalWaveMesh palette={palette} />
      </ThreeCanvas>

      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 42%, transparent 0%, ${palette.main}00 42%, ${palette.main}cc 100%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
