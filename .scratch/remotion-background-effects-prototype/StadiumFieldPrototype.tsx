import React, { useLayoutEffect } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { baseTheme } from "../../src/templates/base/theme";

const LOOP_DURATION_IN_SECONDS = 12;

type StadiumFieldVariant = "low-sweep";

const VARIANT_SETTINGS: Record<
  StadiumFieldVariant,
  {
    label: string;
    description: string;
    cameraHeight: number;
    cameraRadius: number;
    cameraTilt: number;
  }
> = {
  "low-sweep": {
    label: "CRICKET PITCH / LOW SWEEP",
    description:
      "Low-angle sweep across the wicket strip with accent rim lighting.",
    cameraHeight: 2.8,
    cameraRadius: 13,
    cameraTilt: 0.12,
  },
};

type Palette = {
  background: string;
  accent: string;
  text: string;
  outfield: string;
  pitchStrip: string;
};

type CameraControllerProps = {
  x: number;
  y: number;
  z: number;
  lookAtY?: number;
};

/** Remotion frame updates must imperatively move the default R3F camera. */
const CameraController: React.FC<CameraControllerProps> = ({
  x,
  y,
  z,
  lookAtY = -0.4,
}) => {
  const { camera } = useThree();

  useLayoutEffect(() => {
    camera.position.set(x, y, z);
    camera.lookAt(0, lookAtY, 0);
    camera.updateProjectionMatrix();
  }, [camera, lookAtY, x, y, z]);

  return null;
};

const PitchLine: React.FC<{
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}> = ({ position, size, color }) => (
  <mesh position={position}>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} />
  </mesh>
);

const Stumps: React.FC<{
  z: number;
  color: string;
  bailColor: string;
}> = ({ z, color, bailColor }) => {
  const stumpSpacing = 0.18;
  const stumpPositions = [-stumpSpacing, 0, stumpSpacing];

  return (
    <>
      {stumpPositions.map((x) => (
        <mesh key={`${z}-${x}`} position={[x, 0.28, z]}>
          <boxGeometry args={[0.06, 0.56, 0.06]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
      <mesh position={[0, 0.58, z]}>
        <boxGeometry args={[0.46, 0.04, 0.04]} />
        <meshStandardMaterial color={bailColor} />
      </mesh>
    </>
  );
};

const EndCrease: React.FC<{
  z: number;
  pitchHalfWidth: number;
  color: string;
  towardCenter: 1 | -1;
}> = ({ z, pitchHalfWidth, color, towardCenter }) => {
  const returnCreaseZ = z + towardCenter * 0.55;

  return (
    <>
      <PitchLine
        position={[0, 0.05, z]}
        size={[pitchHalfWidth * 2, 0.03, 0.06]}
        color={color}
      />
      <PitchLine
        position={[-pitchHalfWidth, 0.05, returnCreaseZ]}
        size={[0.05, 0.03, 1.05]}
        color={color}
      />
      <PitchLine
        position={[pitchHalfWidth, 0.05, returnCreaseZ]}
        size={[0.05, 0.03, 1.05]}
        color={color}
      />
    </>
  );
};

const PitchScene: React.FC<{
  palette: Palette;
  settings: (typeof VARIANT_SETTINGS)[StadiumFieldVariant];
}> = ({ palette, settings }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  const angle = loopProgress * Math.PI * 2;
  const bob = Math.sin(loopProgress * Math.PI * 2) * settings.cameraTilt;
  const cameraX = Math.sin(angle) * settings.cameraRadius;
  const cameraZ = Math.cos(angle) * settings.cameraRadius;
  const cameraY = settings.cameraHeight + bob;
  const accentLightX = Math.sin(angle + Math.PI / 3) * 12;
  const accentLightZ = Math.cos(angle + Math.PI / 3) * 12;
  const markerX = Math.sin(angle * 2) * 0.35;
  const markerZ = Math.cos(angle * 2) * 5.2;

  const pitchHalfWidth = 1.6;
  const pitchLength = 14;
  const pitchHalfLength = pitchLength / 2;

  return (
    <>
      <color attach="background" args={[palette.background]} />
      <fog attach="fog" args={[palette.background, 22, 55]} />
      <CameraController x={cameraX} y={cameraY} z={cameraZ} />
      <ambientLight intensity={0.55} color={palette.text} />
      <directionalLight
        position={[8, 14, 6]}
        intensity={1.1}
        color={palette.text}
      />
      <pointLight
        position={[accentLightX, 6, accentLightZ]}
        intensity={0.85}
        color={palette.accent}
      />
      <pointLight
        position={[-accentLightX * 0.6, 4, -accentLightZ * 0.6]}
        intensity={0.45}
        color={palette.accent}
      />

      {/* Outfield */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[26, 20]} />
        <meshStandardMaterial color={palette.outfield} roughness={0.86} metalness={0.03} />
      </mesh>

      {/* Oval boundary rope */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[8.6, 8.75, 64]} />
        <meshStandardMaterial color={palette.text} side={THREE.DoubleSide} />
      </mesh>

      {/* Wicket strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <planeGeometry args={[pitchHalfWidth * 2, pitchLength]} />
        <meshStandardMaterial color={palette.pitchStrip} roughness={0.72} metalness={0.02} />
      </mesh>

      {/* Crease sets at both ends */}
      <EndCrease
        z={-pitchHalfLength + 0.55}
        pitchHalfWidth={pitchHalfWidth}
        color={palette.text}
        towardCenter={1}
      />
      <EndCrease
        z={pitchHalfLength - 0.55}
        pitchHalfWidth={pitchHalfWidth}
        color={palette.text}
        towardCenter={-1}
      />
      <PitchLine
        position={[0, 0.05, -pitchHalfLength + 1.15]}
        size={[pitchHalfWidth * 2, 0.03, 0.06]}
        color={palette.text}
      />
      <PitchLine
        position={[0, 0.05, pitchHalfLength - 1.15]}
        size={[pitchHalfWidth * 2, 0.03, 0.06]}
        color={palette.text}
      />

      <Stumps z={-pitchHalfLength + 0.55} color={palette.text} bailColor={palette.accent} />
      <Stumps z={pitchHalfLength - 0.55} color={palette.text} bailColor={palette.accent} />

      {/* Cricket ball travel along the strip */}
      <mesh position={[markerX, 0.22, markerZ]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color={palette.accent}
          emissive={palette.accent}
          emissiveIntensity={0.35}
          roughness={0.45}
        />
      </mesh>

      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 12.5, 2.4, 0]}>
          <boxGeometry args={[0.5, 4.8, 18]} />
          <meshStandardMaterial color={palette.background} roughness={0.9} />
        </mesh>
      ))}
    </>
  );
};

/**
 * Prototype question:
 * Can a lightweight Three.js cricket ground read as a repeatable Fixtura
 * background without binding to production catalogue code yet?
 */
const StadiumFieldScene: React.FC = () => {
  const { width, height } = useVideoConfig();
  const settings = VARIANT_SETTINGS["low-sweep"];

  const palette: Palette = {
    background: baseTheme.colors.primary,
    accent: baseTheme.colors.secondary,
    text: baseTheme.colors.text.light,
    outfield: "#2a7a46",
    pitchStrip: "#c9b07a",
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ fov: 52, near: 0.1, far: 120 }}
        gl={{ antialias: true }}
        style={{ width, height }}
      >
        <PitchScene palette={palette} settings={settings} />
      </ThreeCanvas>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 40%, transparent 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 96,
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

export const StadiumFieldLowSweepPrototype: React.FC = () => (
  <StadiumFieldScene />
);
