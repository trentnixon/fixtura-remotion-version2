import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildIntegrationDataset,
  EFFECTS_SOLID_SMOKE_FIXTURES,
  EFFECTS_SOLID_BACKGROUND_TEST_ID,
} from "./effects-solid-smoke-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outRoot = path.join(root, "out", "effects-solid-smoke");
const propsRoot = path.join(outRoot, "_props");

const args = process.argv.slice(2);
const fixturesArg = args.find((arg) => arg.startsWith("--fixtures="));
const fixtures = fixturesArg
  ? fixturesArg
      .split("=")[1]
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  : EFFECTS_SOLID_SMOKE_FIXTURES.map((fixture) => fixture.id);

let failed = false;

for (const fixtureId of fixtures) {
  const fixture = EFFECTS_SOLID_SMOKE_FIXTURES.find(
    (entry) => entry.id === fixtureId,
  );

  if (!fixture) {
    console.error(`Unknown fixture: ${fixtureId}`);
    failed = true;
    continue;
  }

  const { remoteCompositionId, props } =
    fixture.mode === "integration"
      ? buildIntegrationDataset(fixture)
      : {
          remoteCompositionId: EFFECTS_SOLID_BACKGROUND_TEST_ID,
          props: {
            presetId: fixture.presetId,
            primary: fixture.primary,
            secondary: fixture.secondary,
            compositionId: fixture.compositionId,
          },
        };

  for (const frame of fixture.frames) {
    const outputPath = path.join(
      outRoot,
      fixture.id,
      `frame-${String(frame).padStart(4, "0")}.png`,
    );
    const propsPath = path.join(propsRoot, `${fixture.id}-frame-${frame}.json`);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.mkdirSync(path.dirname(propsPath), { recursive: true });
    fs.writeFileSync(propsPath, JSON.stringify(props));

    const render = spawnSync(
      "npx",
      [
        "remotion",
        "still",
        "src/index.ts",
        remoteCompositionId,
        outputPath,
        `--frame=${frame}`,
        `--props=${propsPath}`,
        "--gl=angle",
      ],
      {
        cwd: root,
        stdio: "inherit",
        shell: true,
        env: { ...process.env, NODE_ENV: "production" },
      },
    );

    if (render.status !== 0 || !fs.existsSync(outputPath)) {
      console.error(`Failed: ${fixture.id} frame ${frame}`);
      failed = true;
    } else {
      console.log(`✓ ${path.relative(root, outputPath)}`);
    }
  }
}

if (failed) {
  console.error(
    "effects-solid-render-smoke: one or more stills failed — check WebGL (--gl=angle) and preset wiring",
  );
  process.exit(1);
}

console.log("effects-solid-render-smoke: all fixtures passed");
