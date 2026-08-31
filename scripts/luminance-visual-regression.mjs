import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  baselinePathForFixture,
  comparePngFiles,
  parseArgs,
  printHelp,
  writeDiffImage,
} from "./luminance-visual-regression-lib.mjs";
import { THRESHOLD_SAME_ENV } from "./luminance-visual-regression-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outRoot = path.join(root, "out", "luminance-visual-regression");
const propsDir = path.join(outRoot, "_props");

const renderFixture = ({ fixtureId, backend, outputPath }) => {
  const props = {
    fixtureId,
    backend,
  };
  const propsPath = path.join(propsDir, `${fixtureId}-${backend}.json`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.mkdirSync(propsDir, { recursive: true });
  fs.writeFileSync(propsPath, JSON.stringify(props));

  const started = process.hrtime.bigint();
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
  const elapsedMs = Number(process.hrtime.bigint() - started) / 1_000_000;

  return {
    ok: render.status === 0 && fs.existsSync(outputPath),
    elapsedMs,
    memoryMb: Math.round((process.memoryUsage().rss / 1024 / 1024) * 10) / 10,
  };
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const results = [];

for (const fixtureId of args.fixtures) {
  const outputPath = path.join(outRoot, args.backend, `${fixtureId}.png`);
  console.log(`\n▶ ${fixtureId} (${args.backend})`);

  const renderResult = renderFixture({
    fixtureId,
    backend: args.backend,
    outputPath,
  });

  const entry = {
    fixtureId,
    backend: args.backend,
    outputPath,
    ...renderResult,
  };

  if (!renderResult.ok) {
    results.push({ ...entry, status: "render-failed" });
    continue;
  }

  if (args.mode === "update-baselines") {
    const baselinePath = baselinePathForFixture(fixtureId);
    fs.mkdirSync(path.dirname(baselinePath), { recursive: true });
    fs.copyFileSync(outputPath, baselinePath);
    results.push({ ...entry, status: "baseline-updated", baselinePath });
    continue;
  }

  if (
    args.mode === "spike" ||
    args.mode === "calibrate-same-env" ||
    args.mode === "calibrate-cross-env"
  ) {
    results.push({ ...entry, status: args.mode });
    continue;
  }

  const baselinePath = baselinePathForFixture(fixtureId);
  if (!fs.existsSync(baselinePath)) {
    results.push({ ...entry, status: "missing-baseline", baselinePath });
    continue;
  }

  const comparison = comparePngFiles(outputPath, baselinePath);
  if (!comparison.ok) {
    writeDiffImage(
      comparison.diff,
      path.join(outRoot, "diff", `${fixtureId}.png`),
    );
  }

  results.push({
    ...entry,
    status: comparison.ok ? "passed" : "failed",
    diffRatio: comparison.diffRatio,
    threshold: THRESHOLD_SAME_ENV,
  });
}

console.log("\n--- luminance visual regression ---");
for (const result of results) {
  console.log(
    `${result.status.padEnd(18)} ${result.fixtureId} ${result.backend} ${result.diffRatio !== undefined ? `(diff ${(result.diffRatio * 100).toFixed(3)}%)` : ""} ${result.elapsedMs ? `${result.elapsedMs.toFixed(0)}ms` : ""} ${result.memoryMb ? `${result.memoryMb}MB` : ""}`,
  );
}

const failed = results.filter((result) =>
  ["render-failed", "missing-baseline", "failed"].includes(result.status),
);

if (failed.length > 0) {
  process.exit(1);
}
