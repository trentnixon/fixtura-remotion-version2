/**
 * Renders BroadcastPro cricket stills (Solid + Image) for Studio-equivalent regression.
 * Usage: node scripts/broadcastpro-visual-regression.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outRoot = path.join(root, "out", "visual-regression", "broadcastpro");
const propsDir = path.join(outRoot, "_props");

const BACKGROUNDS = ["Solid", "Image"];
const TEMPLATE_ID = "BroadcastPro";
const SPORT = "Cricket";

const DATASETS = [
  { id: "CricketLadder", file: "Cricket_Ladder.json" },
  { id: "CricketUpcoming", file: "Cricket_upcoming.json" },
  { id: "CricketTop5Batting", file: "Cricket_Top5Batters.json" },
  { id: "CricketTop5Bowling", file: "Cricket_Top5Bowlers.json" },
  { id: "CricketBattingPerformances", file: "Cricket_BattingPerformances.json" },
  { id: "CricketBowlingPerformances", file: "Cricket_BowlingPerformances.json" },
  { id: "CricketResults", file: "Cricket_Results.json" },
  { id: "CricketRoster", file: "Cricket_Roster.json" },
  { id: "CricketResultSingle", file: "Cricket_WeekendResultsSingle.json" },
  { id: "CricketTeamOfTheWeek", file: "Cricket_TeamOfTheWeek.json" },
];

function processDatasetForTemplate(dataset, templateId, variant, sportName) {
  const clone = structuredClone(dataset);
  const existingVideo = clone.videoMeta?.video ?? {};
  const existingClub = clone.videoMeta?.club ?? {};
  const existingTheme = existingVideo.appearance?.theme ?? {};
  const existingTemplateVariation = existingVideo.templateVariation ?? {};

  clone.videoMeta = {
    ...clone.videoMeta,
    theme: {
      theme: existingTheme,
      template: existingVideo.appearance?.template ?? templateId,
    },
    fixtureCategory: clone.videoMeta?.fixtureCategory ?? "Default",
    groupingCategory: clone.videoMeta?.groupingCategory ?? sportName,
    video: {
      ...existingVideo,
      metadata: { ...(existingVideo.metadata ?? {}) },
      appearance: {
        ...(existingVideo.appearance ?? {}),
        type: variant,
        template: templateId || existingVideo.appearance?.template,
      },
      templateVariation: {
        ...existingTemplateVariation,
        useBackground: variant,
      },
      media: existingVideo.media ?? {},
      contentLayout: existingVideo.contentLayout ?? {},
    },
    club: { ...existingClub },
  };

  return clone;
}

function getCompositionId(data) {
  const video = data.videoMeta.video;
  const templateId = video.appearance.template;
  const useBackground = video.templateVariation.useBackground;
  const compositionId = video.metadata.compositionId;
  return `${templateId}-${useBackground}-${compositionId}`;
}

function getFrame(data) {
  const intro = data.timings?.FPS_INTRO ?? 90;
  return intro + 45;
}

function loadDataset(fileName) {
  const filePath = path.join(root, "testData", "samples", "Cricket", fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

const results = [];

ensureDir(outRoot);
ensureDir(propsDir);

for (const { id, file } of DATASETS) {
  const raw = loadDataset(file);

  for (const background of BACKGROUNDS) {
    const processed = processDatasetForTemplate(
      raw,
      TEMPLATE_ID,
      background,
      SPORT,
    );
    const compositionId = getCompositionId(processed);
    const frame = getFrame(processed);
    const propsPath = path.join(propsDir, `${background}-${id}.json`);
    const outputPath = path.join(outRoot, background, `${id}.png`);

    ensureDir(path.dirname(outputPath));
    fs.writeFileSync(propsPath, JSON.stringify({ data: processed }));

    console.log(`\n▶ ${compositionId} @ frame ${frame}`);

    const render = spawnSync(
      "npx",
      [
        "remotion",
        "still",
        "src/index.ts",
        compositionId,
        outputPath,
        `--frame=${frame}`,
        `--props=${propsPath}`,
      ],
      {
        cwd: root,
        stdio: "inherit",
        shell: true,
        env: { ...process.env, NODE_ENV: "production" },
      },
    );

    const ok = render.status === 0 && fs.existsSync(outputPath);
    results.push({
      dataset: id,
      background,
      compositionId,
      frame,
      ok,
      outputPath: ok ? path.relative(root, outputPath) : null,
    });

    if (!ok) {
      console.error(`✗ Failed: ${compositionId}`);
    } else {
      console.log(`✓ ${path.relative(root, outputPath)}`);
    }
  }
}

const passed = results.filter((r) => r.ok).length;
const failed = results.filter((r) => !r.ok);

console.log("\n--- BroadcastPro visual regression ---");
console.log(`Passed: ${passed}/${results.length}`);

if (failed.length > 0) {
  console.log("Failures:");
  for (const f of failed) {
    console.log(`  - ${f.background} / ${f.dataset} (${f.compositionId})`);
  }
  process.exit(1);
}
