import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import {
  BASELINE_DIR,
  LUMINANCE_CANARY_FIXTURE_IDS,
  LUMINANCE_FIXTURE_IDS,
  THRESHOLD_CROSS_ENV,
  THRESHOLD_SAME_ENV,
} from "./luminance-visual-regression-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

export const readPng = (filePath) => {
  const buffer = fs.readFileSync(filePath);
  return PNG.sync.read(buffer);
};

export const comparePngFiles = (actualPath, expectedPath) => {
  const actual = readPng(actualPath);
  const expected = readPng(expectedPath);

  if (actual.width !== expected.width || actual.height !== expected.height) {
    return {
      ok: false,
      diffRatio: 1,
      diffPixels: actual.width * actual.height,
      totalPixels: actual.width * actual.height,
    };
  }

  const { width, height } = actual;
  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(
    actual.data,
    expected.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 },
  );

  const totalPixels = width * height;
  return {
    ok: diffPixels / totalPixels <= THRESHOLD_SAME_ENV,
    diffRatio: diffPixels / totalPixels,
    diffPixels,
    totalPixels,
    diff,
  };
};

export const writeDiffImage = (diff, outputPath) => {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, PNG.sync.write(diff));
};

export const baselinePathForFixture = (fixtureId) =>
  path.join(root, BASELINE_DIR, `${fixtureId}.png`);

export const parseArgs = (argv) => {
  const args = {
    mode: "regress",
    backend: "svg",
    fixtures: [...LUMINANCE_FIXTURE_IDS],
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--help" || token === "-h") {
      args.help = true;
    } else if (token === "--spike") {
      args.mode = "spike";
    } else if (token === "--regress") {
      args.mode = "regress";
    } else if (token === "--calibrate-same-env") {
      args.mode = "calibrate-same-env";
    } else if (token === "--calibrate-cross-env") {
      args.mode = "calibrate-cross-env";
    } else if (token === "--update-baselines") {
      args.mode = "update-baselines";
    } else if (token.startsWith("--backend=")) {
      args.backend = token.split("=")[1];
    } else if (token.startsWith("--fixtures=")) {
      args.fixtures = token
        .split("=")[1]
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
    }
  }

  return args;
};

export const printHelp = () => {
  console.log(`Usage: node scripts/luminance-visual-regression.mjs [options]

Modes:
  --regress                 Compare renders to committed baselines (default)
  --spike                   Render without baseline requirement
  --calibrate-same-env      Report same-environment threshold inputs
  --calibrate-cross-env     Report cross-environment threshold inputs
  --update-baselines        Write baseline PNGs for selected fixtures

Options:
  --backend=svg|remotion|precompute
  --fixtures=F01,F02,...      Default: all F01-F09
  --help

Thresholds:
  THRESHOLD_SAME_ENV=${THRESHOLD_SAME_ENV}
  THRESHOLD_CROSS_ENV=${THRESHOLD_CROSS_ENV}
`);
};

export {
  LUMINANCE_CANARY_FIXTURE_IDS,
  THRESHOLD_CROSS_ENV,
  THRESHOLD_SAME_ENV,
};
