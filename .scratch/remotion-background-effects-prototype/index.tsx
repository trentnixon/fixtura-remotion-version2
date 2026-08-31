import React from "react";
import { Composition, registerRoot } from "remotion";
import { EnergyBurstPrototype } from "./EnergyBurstPrototype";
import {
  TopographicFineMapPrototype,
  TopographicFlowPrototype,
  TopographicSmoothAmbientPrototype,
} from "./TopographicFlowPrototype";
import { BroadcastHalftoneWavePrototype } from "./BroadcastHalftonePrototype";
import {
  SignalGridPerspectiveFloorInvertedPrototype,
  SignalGridPerspectiveFloorPrototype,
} from "./SignalGridPrototype";
import {
  WaveFieldPrototype,
  WaveFieldVerticalBandsPrototype,
  WaveFieldWideRowsPrototype,
} from "./WaveFieldPrototype";
import {
  NeonSweepHeavyGlowPrototype,
  NeonSweepWideBeamsPrototype,
} from "./NeonSweepPrototype";
import {
  ReactivePathHitsPrototype,
  ReactivePathSystemPrototype,
} from "./ReactivePathSystemPrototype";
import {
  MotionMotifPrototype,
  MotionMotifTiledFieldPrototype,
} from "./MotionMotifPrototype";
import { StadiumFieldLowSweepPrototype } from "./StadiumFieldPrototype";
import {
  HtmlInCanvasBroadcastPrototype,
  HtmlInCanvasOrbitRingsPrototype,
  HtmlInCanvasScoreboardGridPrototype,
  HtmlInCanvasNeonBeamsPrototype,
} from "./HtmlInCanvasBackgroundPrototype";
import {
  WebGPUMetalWavePrototype,
  WebGPUContourMapPrototype,
  WebGPUSheenSweepPrototype,
} from "./WebGPUMaterialLabPrototype";
import { RiveMotifTiledFieldPrototype } from "./RiveMotifPrototype";
import {
  LightLeakWarmFlarePrototype,
  LightLeakCoolFlarePrototype,
  LightLeakSlowBreathePrototype,
  LightLeakDualFlarePrototype,
  LightLeakVerticalWashPrototype,
  LightLeakSoftBloomPrototype,
} from "./LightLeakPrototype";

export const PrototypeRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BroadcastHalftoneWavePrototype"
        component={BroadcastHalftoneWavePrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="TopographicFlowPrototype"
        component={TopographicFlowPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="TopographicFineMapPrototype"
        component={TopographicFineMapPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="TopographicSmoothAmbientPrototype"
        component={TopographicSmoothAmbientPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="SignalGridPerspectiveFloorPrototype"
        component={SignalGridPerspectiveFloorPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="SignalGridPerspectiveFloorInvertedPrototype"
        component={SignalGridPerspectiveFloorInvertedPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="EnergyBurstPrototype"
        component={EnergyBurstPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="WaveFieldPrototype"
        component={WaveFieldPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="WaveFieldWideRowsPrototype"
        component={WaveFieldWideRowsPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="WaveFieldVerticalBandsPrototype"
        component={WaveFieldVerticalBandsPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="NeonSweepWideBeamsPrototype"
        component={NeonSweepWideBeamsPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="NeonSweepHeavyGlowPrototype"
        component={NeonSweepHeavyGlowPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="ReactivePathSystemPrototype"
        component={ReactivePathSystemPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="ReactivePathHitsPrototype"
        component={ReactivePathHitsPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="MotionMotifPrototype"
        component={MotionMotifPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="MotionMotifTiledFieldPrototype"
        component={MotionMotifTiledFieldPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="StadiumFieldLowSweepPrototype"
        component={StadiumFieldLowSweepPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="HtmlInCanvasBroadcastPrototype"
        component={HtmlInCanvasBroadcastPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="Experimental HtmlInCanvas lane. Without Chrome 149+ and canvas-draw-element flag, Studio shows CSS fallback (no canvas glow/vignette)."
      />
      <Composition
        id="HtmlInCanvasOrbitRingsPrototype"
        component={HtmlInCanvasOrbitRingsPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="SVG concentric dashed rings — orbit motion captured to canvas with glow."
      />
      <Composition
        id="HtmlInCanvasScoreboardGridPrototype"
        component={HtmlInCanvasScoreboardGridPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="Fixture matrix cells pulse in staggered waves."
      />
      <Composition
        id="HtmlInCanvasNeonBeamsPrototype"
        component={HtmlInCanvasNeonBeamsPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="Diagonal neon beams with chromatic aberration post-process."
      />
      <Composition
        id="WebGPUMetalWavePrototype"
        component={WebGPUMetalWavePrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="WebGPU TSL metalness/roughness waves on a lit standard material."
      />
      <Composition
        id="WebGPUContourMapPrototype"
        component={WebGPUContourMapPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="Fractal noise banded into topographic contour lines."
      />
      <Composition
        id="WebGPUSheenSweepPrototype"
        component={WebGPUSheenSweepPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="Horizontal sheen sweep with metallic specular roll."
      />
      <Composition
        id="RiveMotifTiledFieldPrototype"
        component={RiveMotifTiledFieldPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="Retained 2×2 tiled Rive motif field."
      />
      <Composition
        id="LightLeakWarmFlarePrototype"
        component={LightLeakWarmFlarePrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="Two-colour gradient + warm lightLeak — WebGL2; render with --gl=angle."
      />
      <Composition
        id="LightLeakCoolFlarePrototype"
        component={LightLeakCoolFlarePrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="Two-colour gradient + cool lightLeak — WebGL2; render with --gl=angle."
      />
      <Composition
        id="LightLeakSlowBreathePrototype"
        component={LightLeakSlowBreathePrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="One swell per loop — calmer leak timing."
      />
      <Composition
        id="LightLeakDualFlarePrototype"
        component={LightLeakDualFlarePrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="Warm + cool leaks offset by half a cycle."
      />
      <Composition
        id="LightLeakVerticalWashPrototype"
        component={LightLeakVerticalWashPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="Top-to-bottom gradient with corner leak."
      />
      <Composition
        id="LightLeakSoftBloomPrototype"
        component={LightLeakSoftBloomPrototype}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1350}
        comment="Horizontal wash, lighter vignette, wider leak."
      />
    </>
  );
};

registerRoot(PrototypeRoot);
