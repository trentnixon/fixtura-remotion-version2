import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/** @typedef {"isolated" | "integration"} EffectsSolidSmokeMode */

/**
 * Local smoke fixtures for effects-solid presets (WebGL2).
 * Isolated fixtures render `EffectsSolid-Background-Test` (background only).
 * Integration fixtures use ProductionRoot + `{ data: FixturaDataset }`.
 */
export const EFFECTS_SOLID_SMOKE_FIXTURES = [
  {
    id: "light-leak-isolated",
    mode: "isolated",
    presetId: "light-leak",
    compositionId: "CricketResults",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "broadcast-halftone-isolated",
    mode: "isolated",
    presetId: "broadcast-halftone",
    compositionId: "CricketResults",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "broadcast-halftone-mudgeeraba-results",
    mode: "integration",
    datasetFile: "testData/samples/Cricket/Cricket_Results.json",
    templateId: "Mudgeeraba",
    presetId: "broadcast-halftone",
    frames: [0, 120, 240],
  },
  {
    id: "topographic-flow-isolated",
    mode: "isolated",
    presetId: "topographic-flow",
    compositionId: "CricketResults",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "topographic-flow-mudgeeraba-results",
    mode: "integration",
    datasetFile: "testData/samples/Cricket/Cricket_Results.json",
    templateId: "Mudgeeraba",
    presetId: "topographic-flow",
    frames: [0, 120, 240],
  },
  {
    id: "signal-grid-floor-isolated",
    mode: "isolated",
    presetId: "signal-grid",
    compositionId: "CricketResults",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "signal-grid-floor-inverted-isolated",
    mode: "isolated",
    presetId: "signal-grid",
    compositionId: "CricketRoster",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "signal-grid-mudgeeraba-results",
    mode: "integration",
    datasetFile: "testData/samples/Cricket/Cricket_Results.json",
    templateId: "Mudgeeraba",
    presetId: "signal-grid",
    frames: [0, 120, 240],
  },
  {
    id: "reactive-path-orbits-isolated",
    mode: "isolated",
    presetId: "reactive-path",
    compositionId: "CricketResults",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "reactive-path-hits-isolated",
    mode: "isolated",
    presetId: "reactive-path",
    compositionId: "CricketRoster",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "reactive-path-mudgeeraba-results",
    mode: "integration",
    datasetFile: "testData/samples/Cricket/Cricket_Results.json",
    templateId: "Mudgeeraba",
    presetId: "reactive-path",
    frames: [0, 120, 240],
  },
  {
    id: "motion-motif-baseline-isolated",
    mode: "isolated",
    presetId: "motion-motif",
    compositionId: "CricketResults",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "motion-motif-tiled-isolated",
    mode: "isolated",
    presetId: "motion-motif",
    compositionId: "CricketRoster",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "motion-motif-mudgeeraba-results",
    mode: "integration",
    datasetFile: "testData/samples/Cricket/Cricket_Results.json",
    templateId: "Mudgeeraba",
    presetId: "motion-motif",
    frames: [0, 120, 240],
  },
  {
    id: "html-orbit-rings-isolated",
    mode: "isolated",
    presetId: "html-orbit-rings",
    compositionId: "CricketResults",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "html-scoreboard-grid-isolated",
    mode: "isolated",
    presetId: "html-scoreboard-grid",
    compositionId: "CricketResults",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "html-neon-beams-isolated",
    mode: "isolated",
    presetId: "html-neon-beams",
    compositionId: "CricketResults",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "html-orbit-rings-mudgeeraba-results",
    mode: "integration",
    datasetFile: "testData/samples/Cricket/Cricket_Results.json",
    templateId: "Mudgeeraba",
    presetId: "html-orbit-rings",
    frames: [0, 120, 240],
  },
  {
    id: "webgpu-metal-wave-isolated",
    mode: "isolated",
    presetId: "webgpu-metal-wave",
    compositionId: "CricketResults",
    primary: "#FF0000",
    secondary: "#004DE2",
    frames: [0, 90, 180],
  },
  {
    id: "webgpu-metal-wave-mudgeeraba-results",
    mode: "integration",
    datasetFile: "testData/samples/Cricket/Cricket_Results.json",
    templateId: "Mudgeeraba",
    presetId: "webgpu-metal-wave",
    frames: [0, 120, 240],
  },
  {
    id: "light-leak-mudgeeraba-results",
    mode: "integration",
    datasetFile: "testData/samples/Cricket/Cricket_Results.json",
    templateId: "Mudgeeraba",
    presetId: "light-leak",
    frames: [0, 120, 240],
  },
  {
    id: "light-leak-broadcastpro-results",
    mode: "integration",
    datasetFile: "testData/samples/Cricket/Cricket_Results.json",
    templateId: "BroadcastPro",
    presetId: "light-leak",
    frames: [0, 120],
  },
];

export const EFFECTS_SOLID_BACKGROUND_TEST_ID = "EffectsSolid-Background-Test";

export const getRemoteCompositionId = (templateId, compositionId) =>
  `${templateId}-Animated-${compositionId}`;

export const buildIntegrationDataset = (fixture) => {
  const datasetPath = path.join(root, fixture.datasetFile);
  const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf8"));

  dataset.videoMeta.video.appearance.template = fixture.templateId;
  dataset.videoMeta.video.templateVariation = {
    ...dataset.videoMeta.video.templateVariation,
    useBackground: "Animated",
    animation: { type: fixture.presetId },
  };

  const compositionId =
    dataset.videoMeta.video.metadata.compositionId ?? "UnknownComposition";

  return {
    props: { data: dataset },
    remoteCompositionId: getRemoteCompositionId(
      fixture.templateId,
      compositionId,
    ),
  };
};
