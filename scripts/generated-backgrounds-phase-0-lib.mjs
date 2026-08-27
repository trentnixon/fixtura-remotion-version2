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
export const HARNESS_SHARED_FIXTURE_PATH = path.join(
  ROOT,
  "src",
  "components",
  "backgrounds",
  "variants",
  "Generated",
  "test",
  "sharedFixture.ts",
);

export const MATRIX_ROWS = [
  {
    rowId: "G-geo",
    workingName: "Geometric field",
    wireIngress: 'useBackground: "Graphics", noise.type: "geometric"',
    orphanOrMismatch: false,
  },
  {
    rowId: "N-geo",
    workingName: "Geometric field",
    wireIngress: 'useBackground: "Noise", noise.type: "geometric"',
    orphanOrMismatch: false,
  },
  {
    rowId: "G-spk",
    workingName: "Spokes",
    wireIngress: 'useBackground: "Graphics", noise.type: "spokes"',
    orphanOrMismatch: false,
  },
  {
    rowId: "N-spk",
    workingName: "Spokes",
    wireIngress: 'useBackground: "Noise", noise.type: "spokes"',
    orphanOrMismatch: false,
  },
  {
    rowId: "G-gfx",
    workingName: "Orphan graphics",
    wireIngress: 'useBackground: "Graphics", noise.type: "graphics"',
    orphanOrMismatch: true,
  },
  {
    rowId: "N-gfx",
    workingName: "Orphan graphics",
    wireIngress: 'useBackground: "Noise", noise.type: "graphics"',
    orphanOrMismatch: true,
  },
  {
    rowId: "G-mismatch",
    workingName: "Graphics mismatch",
    wireIngress:
      'useBackground: "Graphics", noise.type: "floatingParticles"',
    orphanOrMismatch: true,
  },
  {
    rowId: "P-dots",
    workingName: "Dots",
    wireIngress: 'Pattern dots, animation: "none"',
    orphanOrMismatch: false,
  },
  {
    rowId: "P-lines",
    workingName: "Lines",
    wireIngress: 'Pattern lines, animation: "none"',
    orphanOrMismatch: false,
  },
  {
    rowId: "P-grid",
    workingName: "Grid",
    wireIngress: 'Pattern grid, animation: "none"',
    orphanOrMismatch: false,
  },
  {
    rowId: "P-crosshatch",
    workingName: "Crosshatch",
    wireIngress: 'Pattern crosshatch, animation: "none"',
    orphanOrMismatch: false,
  },
  {
    rowId: "P-triangles",
    workingName: "Triangles",
    wireIngress: 'Pattern triangles, animation: "none"',
    orphanOrMismatch: false,
  },
  {
    rowId: "P-chevron",
    workingName: "Chevron",
    wireIngress: 'Pattern chevron, animation: "none"',
    orphanOrMismatch: false,
  },
];

export const DUAL_INGRESS_PAIRS = [
  ["G-geo", "N-geo"],
  ["G-spk", "N-spk"],
  ["G-gfx", "N-gfx"],
];

export const SHARED_FIXTURE_REQUIRED_FIELDS = [
  "width",
  "height",
  "fps",
  "frame",
  "palette",
  "foreground",
];

export const stillPathForRow = (rowId) =>
  path.join(STILLS_DIR, `${rowId}.png`);

export const loadSharedFixture = () => {
  const raw = fs.readFileSync(SHARED_FIXTURE_PATH, "utf8");
  return JSON.parse(raw);
};

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

export const ensureHarnessSharedFixturePresent = () => {
  const fixture = loadSharedFixture();
  assertSharedFixtureShape(fixture);
  if (!fs.existsSync(HARNESS_SHARED_FIXTURE_PATH)) {
    throw new Error("harness sharedFixture.ts missing");
  }
};

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
    { threshold: 0 },
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
