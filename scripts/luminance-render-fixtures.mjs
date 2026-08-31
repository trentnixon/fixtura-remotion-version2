import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LUMINANCE_FIXTURE_IDS } from "./luminance-visual-regression-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outRoot = path.join(root, "out", "luminance-smoke");

const args = process.argv.slice(2);
const backendArg = args.find((arg) => arg.startsWith("--backend="));
const fixturesArg = args.find((arg) => arg.startsWith("--fixtures="));
const backend = backendArg?.split("=")[1] ?? "svg";
const fixtures = fixturesArg
  ? fixturesArg
      .split("=")[1]
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  : LUMINANCE_FIXTURE_IDS;

let failed = false;

for (const fixtureId of fixtures) {
  const outputPath = path.join(outRoot, backend, `${fixtureId}.png`);
  const propsPath = path.join(outRoot, "_props", `${fixtureId}.json`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.mkdirSync(path.dirname(propsPath), { recursive: true });
  fs.writeFileSync(propsPath, JSON.stringify({ fixtureId, backend }));

  const render = spawnSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      "Luminance-Test",
      outputPath,
      "--frame=0",
      `--props=${propsPath}`,
    ],
    {
      cwd: root,
      stdio: "inherit",
      shell: true,
      env: { ...process.env, NODE_ENV: "production" },
    },
  );

  if (render.status !== 0 || !fs.existsSync(outputPath)) {
    console.error(`Failed to render ${fixtureId}`);
    failed = true;
  } else {
    console.log(`✓ ${path.relative(root, outputPath)}`);
  }
}

process.exit(failed ? 1 : 0);
