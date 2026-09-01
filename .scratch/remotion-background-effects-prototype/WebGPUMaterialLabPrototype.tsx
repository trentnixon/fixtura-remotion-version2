import React, { useLayoutEffect, useMemo, useRef } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  MeshBasicNodeMaterial,
  MeshStandardNodeMaterial,
  WebGPURenderer,
} from "three/webgpu";
import {
  color,
  float,
  mix,
  mx_fractal_noise_float,
  sin,
  uniform,
  uv,
  vec2,
} from "three/tsl";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 12;
const PLANE_WIDTH = 11;
const PLANE_HEIGHT = 13.75;
const CAMERA_Z = 14;

type Palette = {
  background: string;
  accent: string;
  text: string;
};

type WebGPUMaterialVariant = "metal-wave" | "contour-map" | "sheen-sweep";

type SceneLighting = "ambient" | "lit-accent";

type VariantSettings = {
  label: string;
  description: string;
  lighting: SceneLighting;
};

const VARIANT_SETTINGS: Record<WebGPUMaterialVariant, VariantSettings> = {
  "metal-wave": {
    label: "WEBGPU / METAL WAVE",
    description:
      "Animated metalness and roughness waves roll across a lit standard material.",
    lighting: "lit-accent",
  },
  "contour-map": {
    label: "WEBGPU / CONTOUR MAP",
    description:
      "Fractal noise banded into topographic contour lines over the palette.",
    lighting: "ambient",
  },
  "sheen-sweep": {
    label: "WEBGPU / SHEEN SWEEP",
    description:
      "Horizontal sheen sweep with metallic specular roll on a lit standard material.",
    lighting: "lit-accent",
  },
};

const createWebGPURenderer = async (
  props: ConstructorParameters<typeof WebGPURenderer>[0],
) => {
  const renderer = new WebGPURenderer(props);
  await renderer.init();
  return renderer;
};

const useLoopProgress = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  return (frame % loopFrames) / loopFrames;
};

const useProgressUniform = () => {
  const loopProgress = useLoopProgress();
  const progressUniform = useRef(uniform(0)).current;

  useLayoutEffect(() => {
    progressUniform.value = loopProgress;
  }, [loopProgress, progressUniform]);

  return progressUniform;
};

const BackgroundPlane: React.FC<{
  material: MeshBasicNodeMaterial | MeshStandardNodeMaterial;
  segments?: number;
}> = ({ material, segments = 1 }) => (
  <mesh material={material}>
    <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT, segments, segments]} />
  </mesh>
);

const MetalWaveMesh: React.FC<{ palette: Palette }> = ({ palette }) => {
  const progressUniform = useProgressUniform();
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
      color(palette.background),
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
  }, [palette.accent, palette.background, progressUniform]);

  return <BackgroundPlane material={material} segments={64} />;
};

const ContourMapMesh: React.FC<{ palette: Palette }> = ({ palette }) => {
  const progressUniform = useProgressUniform();
  const material = useMemo(() => {
    const mat = new MeshBasicNodeMaterial();
    const terrain = mx_fractal_noise_float(
      uv()
        .mul(5)
        .add(vec2(progressUniform.mul(0.8), progressUniform.mul(0.25))),
    );
    const contours = sin(terrain.mul(22).add(progressUniform.mul(Math.PI * 2)))
      .mul(0.5)
      .add(0.5);
    mat.colorNode = mix(
      color(palette.background),
      mix(color(palette.accent), color(palette.text), terrain.mul(0.4)),
      contours.mul(0.55).add(0.12),
    );
    return mat;
  }, [palette.accent, palette.background, palette.text, progressUniform]);

  return <BackgroundPlane material={material} segments={48} />;
};

const SheenSweepMesh: React.FC<{ palette: Palette }> = ({ palette }) => {
  const progressUniform = useProgressUniform();
  const material = useMemo(() => {
    const mat = new MeshStandardNodeMaterial();
    const sweep = sin(
      uv()
        .x.mul(9)
        .add(progressUniform.mul(Math.PI * 2)),
    )
      .mul(0.5)
      .add(0.5);
    const sheenBand = sin(
      uv()
        .y.mul(14)
        .sub(progressUniform.mul(Math.PI * 2)),
    )
      .mul(0.5)
      .add(0.5);
    mat.colorNode = mix(
      color(palette.background),
      color(palette.accent),
      sweep,
    );
    mat.metalnessNode = float(0.72);
    mat.roughnessNode = float(0.28);
    mat.sheenNode = float(1);
    mat.sheenRoughnessNode = sheenBand.mul(0.45).add(0.2);
    mat.sheenColorNode = color(palette.text);
    return mat;
  }, [palette.accent, palette.background, palette.text, progressUniform]);

  return <BackgroundPlane material={material} segments={64} />;
};

const MESH_BY_VARIANT: Record<
  WebGPUMaterialVariant,
  React.FC<{ palette: Palette }>
> = {
  "metal-wave": MetalWaveMesh,
  "contour-map": ContourMapMesh,
  "sheen-sweep": SheenSweepMesh,
};

const SceneLightingRig: React.FC<{
  lighting: SceneLighting;
  accent: string;
}> = ({ lighting, accent }) => {
  if (lighting === "ambient") {
    return <ambientLight intensity={0.35} />;
  }

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 8]} intensity={2.2} />
      <directionalLight position={[-5, -2, 4]} intensity={0.8} color={accent} />
    </>
  );
};

const WebGPUScene: React.FC<{ variant: WebGPUMaterialVariant }> = ({
  variant,
}) => {
  const { width, height } = useVideoConfig();
  const settings = VARIANT_SETTINGS[variant];
  const Mesh = MESH_BY_VARIANT[variant];

  const palette: Palette = {
    background: baseTheme.colors.primary,
    accent: baseTheme.colors.secondary,
    text: baseTheme.colors.text.light,
  };

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ fov: 50, position: [0, 0, CAMERA_Z] }}
      gl={createWebGPURenderer}
    >
      <color attach="background" args={[palette.background]} />
      <SceneLightingRig lighting={settings.lighting} accent={palette.accent} />
      <Mesh palette={palette} />
    </ThreeCanvas>
  );
};

interface WebGPUMaterialLabProps {
  variant?: WebGPUMaterialVariant;
}

const WebGPUMaterialLabScene: React.FC<WebGPUMaterialLabProps> = ({
  variant = "metal-wave",
}) => {
  const settings = VARIANT_SETTINGS[variant];
  const palette: Palette = {
    background: baseTheme.colors.primary,
    accent: baseTheme.colors.secondary,
    text: baseTheme.colors.text.light,
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <WebGPUScene variant={variant} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 96,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 760,
            padding: "48px 56px",
            border: `2px solid ${palette.text}`,
            backgroundColor: "rgba(11, 22, 48, 0.88)",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)",
          }}
        >
          <div
            style={{
              color: palette.accent,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 8,
            }}
          >
            Fixtura / {settings.label}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -3,
            }}
          >
            Match day
          </div>
          <div
            style={{
              marginTop: 28,
              color: palette.text,
              fontSize: 30,
              lineHeight: 1.3,
            }}
          >
            {settings.description}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const makePrototype =
  (variant: WebGPUMaterialVariant): React.FC =>
  () => <WebGPUMaterialLabScene variant={variant} />;

export const WebGPUMetalWavePrototype = makePrototype("metal-wave");
export const WebGPUContourMapPrototype = makePrototype("contour-map");
export const WebGPUSheenSweepPrototype = makePrototype("sheen-sweep");
