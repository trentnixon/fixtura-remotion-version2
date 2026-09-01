import React, { useLayoutEffect, useMemo, useRef } from "react";
import { MeshStandardNodeMaterial } from "three/webgpu";
import { color, float, mix, sin, uniform, uv } from "three/tsl";
import type { ThreeScenePalette } from "../shared/types";
import { useLoopProgress } from "../shared/useLoopProgress";
import {
  THREE_SCENE_PLANE_HEIGHT,
  THREE_SCENE_PLANE_WIDTH,
} from "../shared/sceneConstants";

type MetalWaveMeshProps = {
  palette: ThreeScenePalette;
};

export const MetalWaveMesh: React.FC<MetalWaveMeshProps> = ({ palette }) => {
  const loopProgress = useLoopProgress();
  const progressUniform = useRef(uniform(0)).current;

  useLayoutEffect(() => {
    progressUniform.value = loopProgress;
  }, [loopProgress, progressUniform]);

  const material = useMemo(() => {
    const mat = new MeshStandardNodeMaterial();
    const wave = sin(
      uv()
        .x.mul(10)
        .add(progressUniform.mul(Math.PI * 2)),
    )
      .mul(0.5)
      .add(0.5);
    mat.colorNode = mix(
      color(palette.main),
      color(palette.accent),
      sin(
        uv()
          .y.mul(6)
          .add(progressUniform.mul(Math.PI * 2)),
      )
        .mul(0.5)
        .add(0.5),
    );
    mat.metalnessNode = float(0.82);
    mat.roughnessNode = wave.mul(0.55).add(0.18);
    return mat;
  }, [palette.accent, palette.main, progressUniform]);

  return (
    <mesh material={material}>
      <planeGeometry
        args={[THREE_SCENE_PLANE_WIDTH, THREE_SCENE_PLANE_HEIGHT, 64, 64]}
      />
    </mesh>
  );
};
