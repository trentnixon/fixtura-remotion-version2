import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "..");
export const PHASE0_DIR = path.join(
  ROOT,
  ".scratch",
  "generated-backgrounds",
  "phase-0",
);
export const STILLS_DIR = path.join(PHASE0_DIR, "stills");
export const CONTACT_DIR = path.join(PHASE0_DIR, "contact-sheet");
export const FIXTURES_DIR = path.join(PHASE0_DIR, "fixtures");
export const SHARED_FIXTURE_PATH = path.join(FIXTURES_DIR, "shared.json");
export const MATRIX_PATH = path.join(FIXTURES_DIR, "matrix.json");
export const HARNESS_LOCKS_DIR = path.join(
  ROOT,
  "src",
  "components",
  "backgrounds",
  "variants",
  "Generated",
  "test",
  "locks",
);
export const HARNESS_SHARED_LOCK_PATH = path.join(
  HARNESS_LOCKS_DIR,
  "shared.json",
);
export const HARNESS_MATRIX_LOCK_PATH = path.join(
  HARNESS_LOCKS_DIR,
  "matrix.json",
);

export const SHARED_FIXTURE_REQUIRED_FIELDS = [
  "width",
  "height",
  "fps",
  "frame",
  "palette",
  "foreground",
];

export const loadJson = (filePath) =>
  JSON.parse(fs.readFileSync(filePath, "utf8"));

export const loadSharedFixture = () => loadJson(SHARED_FIXTURE_PATH);

export const loadMatrix = () => loadJson(MATRIX_PATH);

export const getMatrixRows = () => loadMatrix().rows;

export const getDualIngressPairs = () => loadMatrix().dualIngressPairs;

export const assertSharedFixtureShape = (fixture) => {
  const missing = SHARED_FIXTURE_REQUIRED_FIELDS.filter(
    (key) => fixture[key] === undefined || fixture[key] === null,
  );
  if (missing.length > 0) {
    throw new Error(
      `shared.json missing required fields: ${missing.join(", ")}`,
    );
  }
  if (!fixture.foreground?.text?.content) {
    throw new Error("shared.json.foreground.text.content is required");
  }
  if (!fixture.foreground?.logo?.assetPath) {
    throw new Error("shared.json.foreground.logo.assetPath is required");
  }
  if (!fixture.foreground?.card?.title) {
    throw new Error("shared.json.foreground.card.title is required");
  }
  if (!fixture.palette?.id || !fixture.palette?.appearanceTheme) {
    throw new Error("shared.json.palette.id and appearanceTheme are required");
  }
};

export const stableStringify = (value) => JSON.stringify(value, null, 2);

export const syncPhase0HarnessLocks = () => {
  const shared = loadSharedFixture();
  const matrix = loadMatrix();
  assertSharedFixtureShape(shared);
  if (!Array.isArray(matrix.rows) || matrix.rows.length !== 13) {
    throw new Error("matrix.json must define exactly 13 rows");
  }
  fs.mkdirSync(HARNESS_LOCKS_DIR, { recursive: true });
  fs.writeFileSync(HARNESS_SHARED_LOCK_PATH, `${stableStringify(shared)}\n`);
  fs.writeFileSync(HARNESS_MATRIX_LOCK_PATH, `${stableStringify(matrix)}\n`);
};

export const assertHarnessLocksMatchAuthoritative = () => {
  if (!fs.existsSync(HARNESS_SHARED_LOCK_PATH)) {
    throw new Error("harness lock shared.json missing — run render/sync first");
  }
  if (!fs.existsSync(HARNESS_MATRIX_LOCK_PATH)) {
    throw new Error("harness lock matrix.json missing — run render/sync first");
  }
  const authoritativeShared = loadSharedFixture();
  const lockShared = loadJson(HARNESS_SHARED_LOCK_PATH);
  if (stableStringify(authoritativeShared) !== stableStringify(lockShared)) {
    throw new Error(
      "harness locks/shared.json does not deep-equal authoritative fixtures/shared.json",
    );
  }
  const authoritativeMatrix = loadMatrix();
  const lockMatrix = loadJson(HARNESS_MATRIX_LOCK_PATH);
  if (stableStringify(authoritativeMatrix) !== stableStringify(lockMatrix)) {
    throw new Error(
      "harness locks/matrix.json does not deep-equal authoritative fixtures/matrix.json",
    );
  }
};

export const stillPathForRow = (rowId) =>
  path.join(STILLS_DIR, `${rowId}.png`);

export const comparePngExact = (leftPath, rightPath) => {
  const left = PNG.sync.read(fs.readFileSync(leftPath));
  const right = PNG.sync.read(fs.readFileSync(rightPath));
  if (left.width !== right.width || left.height !== right.height) {
    return {
      differingPixels: left.width * left.height,
      outputsMatch: "no",
      width: left.width,
      height: left.height,
    };
  }
  const { width, height } = left;
  const diff = new PNG({ width, height });
  const differingPixels = pixelmatch(
    left.data,
    right.data,
    diff.data,
    width,
    height,
    { threshold: 0, includeAA: true },
  );
  return {
    differingPixels,
    outputsMatch: differingPixels === 0 ? "yes" : "no",
    width,
    height,
    diff,
  };
};

export const parseApprovalRecord = (markdown) => {
  const rows = [];
  const blocks = markdown.split(/\n## /).slice(1);
  for (const block of blocks) {
    if (block.startsWith("Dual-ingress") || block.startsWith("Notes")) {
      continue;
    }
    const lines = block.split("\n");
    const title = lines[0].trim();
    const rowIdMatch = title.match(/^([A-Za-z0-9-]+)\b/);
    if (!rowIdMatch) continue;
    const fields = {};
    for (const line of lines) {
      const m = line.match(/^- ([^:]+):\s*(.*)$/);
      if (m) fields[m[1].trim()] = m[2].trim();
    }
    rows.push({ rowId: rowIdMatch[1], fields, title });
  }
  return rows;
};

export const parseDualIngressSection = (markdown) => {
  const section = markdown.split("## Dual-ingress pairs\n")[1];
  if (!section) return [];
  const body = section.split(/\n## /)[0];
  const pairs = [];
  for (const block of body.split(/\n### /).slice(1)) {
    const lines = block.split("\n");
    const title = lines[0].trim();
    const fields = {};
    for (const line of lines) {
      const m = line.match(/^- ([^:]+):\s*(.*)$/);
      if (m) fields[m[1].trim()] = m[2].trim();
    }
    pairs.push({ title, fields });
  }
  return pairs;
};

export const buildContactSheet = (rowIds, stillDir, outputPath) => {
  const images = rowIds.map((rowId) => {
    const file = path.join(stillDir, `${rowId}.png`);
    return { rowId, png: PNG.sync.read(fs.readFileSync(file)) };
  });
  const cellW = images[0].png.width;
  const cellH = images[0].png.height;
  const cols = 4;
  const rows = Math.ceil(images.length / cols);
  const sheet = new PNG({ width: cols * cellW, height: rows * cellH });
  images.forEach((image, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    PNG.bitblt(
      image.png,
      sheet,
      0,
      0,
      cellW,
      cellH,
      col * cellW,
      row * cellH,
    );
  });
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, PNG.sync.write(sheet));
  const manifest = {
    rows: rowIds,
    columns: cols,
    cellWidth: cellW,
    cellHeight: cellH,
    path: outputPath,
  };
  fs.writeFileSync(
    path.join(path.dirname(outputPath), "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  return manifest;
};

export const collectNoiseMentions = () => {
  const roots = [
    path.join(ROOT, "src"),
    path.join(ROOT, "docs"),
    path.join(ROOT, ".comms"),
    path.join(ROOT, ".skills"),
    path.join(ROOT, "CONTEXT.md"),
    path.join(ROOT, "WARP.md"),
  ];
  const hits = new Set();
  const walk = (target) => {
    if (!fs.existsSync(target)) return;
    const stat = fs.statSync(target);
    if (stat.isFile()) {
      if (!/\.(md|ts|tsx|js|mjs|json)$/i.test(target)) return;
      const text = fs.readFileSync(target, "utf8");
      if (/\bNoise\b/.test(text) || /"Noise"/.test(text)) {
        hits.add(path.relative(ROOT, target).replace(/\\/g, "/"));
      }
      return;
    }
    for (const entry of fs.readdirSync(target)) {
      if (
        entry === "node_modules" ||
        entry === "dist" ||
        entry === ".git" ||
        entry === "locks"
      ) {
        continue;
      }
      walk(path.join(target, entry));
    }
  };
  for (const root of roots) walk(root);
  return [...hits].sort();
};
