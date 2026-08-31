/**
 * Compare protected-linework supersample scales for F07 / test007.
 *
 * Prefer Remotion stills (clears webpack cache first — corrupted cache causes
 * wasm-hash crashes). Falls back to the Node algorithm path if Remotion fails.
 *
 * Usage:
 *   npm run luminance:supersample-compare
 *   node scripts/luminance-supersample-compare.mjs --fixture=F07
 *   node scripts/luminance-supersample-compare.mjs --node-only
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outRoot = path.join(root, "out", "luminance-supersample");

const args = process.argv.slice(2);
const fixtureArg = args.find((arg) => arg.startsWith("--fixture="));
const fixtureId = fixtureArg?.split("=")[1] ?? "F07";
const nodeOnly = args.includes("--node-only");
const scales = [1, 2, 4];

const runNodeCompare = () => {
  console.log("Running Node supersample compare (algorithm path)…");
  const result = spawnSync(
    "npx",
    [
      "vitest",
      "run",
      "src/components/backgrounds/variants/Luminance/supersample/supersampleCompare.write.test.ts",
    ],
    {
      cwd: root,
      stdio: "inherit",
      shell: true,
      env: { ...process.env, LUMINANCE_SUPERSAMPLE_WRITE: "1" },
    },
  );
  return result.status === 0;
};

const clearWebpackCache = () => {
  const result = spawnSync("node", ["scripts/clear-webpack-cache.mjs"], {
    cwd: root,
    stdio: "inherit",
    shell: true,
  });
  return result.status === 0;
};

const renderRemotionScale = (scale) => {
  const label = scale === 1 ? "baseline-1x" : `${scale}x`;
  const outputPath = path.join(outRoot, `${fixtureId}-${label}.png`);
  const propsPath = path.join(outRoot, "_props", `${fixtureId}-${label}.json`);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.mkdirSync(path.dirname(propsPath), { recursive: true });
  fs.writeFileSync(
    propsPath,
    JSON.stringify({
      fixtureId,
      backend: "svg",
      supersampleScale: scale,
    }),
  );

  console.log(`Rendering ${fixtureId} at supersample ${scale}× (Remotion)…`);
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
    return { ok: false, label, outputPath };
  }

  console.log(`✓ ${path.relative(root, outputPath)}`);
  return { ok: true, label, outputPath };
};

if (nodeOnly) {
  process.exit(runNodeCompare() ? 0 : 1);
}

console.log("Clearing webpack cache before Remotion stills…");
clearWebpackCache();

let remotionFailed = false;
for (const scale of scales) {
  const result = renderRemotionScale(scale);
  if (!result.ok) {
    console.error(`Remotion failed: ${result.label}`);
    remotionFailed = true;
    break;
  }
}

if (remotionFailed) {
  console.warn(
    "Remotion still path failed — falling back to Node algorithm compare.",
  );
  process.exit(runNodeCompare() ? 0 : 1);
}

console.log(`
Compare visually:
  ${path.relative(root, path.join(outRoot, `${fixtureId}-baseline-1x.png`))}
  ${path.relative(root, path.join(outRoot, `${fixtureId}-2x.png`))}
  ${path.relative(root, path.join(outRoot, `${fixtureId}-4x.png`))}

Inspect black/white curve edges for stair-stepping vs retained sharpness.
`);

process.exit(0);
