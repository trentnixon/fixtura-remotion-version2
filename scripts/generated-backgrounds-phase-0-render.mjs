import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  MATRIX_ROWS,
  DUAL_INGRESS_PAIRS,
  PHASE0_DIR,
  STILLS_DIR,
  CONTACT_DIR,
  SHARED_FIXTURE_PATH,
  stillPathForRow,
  loadSharedFixture,
  assertSharedFixtureShape,
  ensureHarnessSharedFixturePresent,
  comparePngExact,
  buildContactSheet,
  ROOT,
} from "./generated-backgrounds-phase-0-lib.mjs";

const renderRow = (rowId, frame) => {
  const outputPath = stillPathForRow(rowId);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const compositionId = `Generated-Phase0-${rowId}`;
  console.log(`\n▶ ${rowId} → ${compositionId}`);
  const result = spawnSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      compositionId,
      outputPath,
      `--frame=${frame}`,
    ],
    {
      cwd: ROOT,
      stdio: "inherit",
      shell: true,
      env: { ...process.env, NODE_ENV: "production" },
    },
  );
  if (result.status !== 0 || !fs.existsSync(outputPath)) {
    throw new Error(`Render failed for ${rowId}`);
  }
  return outputPath;
};

const inventoryNoise = () => {
  const roots = [
    path.join(ROOT, "src"),
    path.join(ROOT, "docs"),
    path.join(ROOT, ".comms"),
    path.join(ROOT, "WARP.md"),
  ];
  const hits = [];
  const walk = (target) => {
    if (!fs.existsSync(target)) return;
    const stat = fs.statSync(target);
    if (stat.isFile()) {
      if (!/\.(md|ts|tsx|js|mjs|json)$/i.test(target)) return;
      const text = fs.readFileSync(target, "utf8");
      if (/\bNoise\b/.test(text) || /"Noise"/.test(text)) {
        hits.push(path.relative(ROOT, target).replace(/\\/g, "/"));
      }
      return;
    }
    for (const entry of fs.readdirSync(target)) {
      if (entry === "node_modules" || entry === "dist" || entry === ".git") {
        continue;
      }
      walk(path.join(target, entry));
    }
  };
  for (const root of roots) walk(root);
  hits.sort();
  const body = [
    "# Noise inventory (Phase 0)",
    "",
    "Runtime continues to accept Noise payloads. Noise is not newly advertised.",
    "",
    "## Mentions found",
    "",
    ...hits.map((h) => `- \`${h}\``),
    "",
  ].join("\n");
  fs.writeFileSync(path.join(PHASE0_DIR, "noise-inventory.md"), body);
};

const inventoryPatternAnimation = () => {
  const samplesDir = path.join(ROOT, "testData", "samples");
  const found = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
        continue;
      }
      if (!full.endsWith(".json")) continue;
      const json = JSON.parse(fs.readFileSync(full, "utf8"));
      const pattern = json?.videoMeta?.video?.templateVariation?.pattern;
      if (!pattern || pattern.animation === undefined || pattern.animation === null) {
        continue;
      }
      if (pattern.animation === "none") continue;
      found.push({
        file: path.relative(ROOT, full).replace(/\\/g, "/"),
        animation: pattern.animation,
      });
    }
  };
  walk(samplesDir);
  const lines = [
    "# Pattern animation inventory (Phase 0)",
    "",
    "Searches `templateVariation.pattern.animation` only. Particle `animation` values are excluded.",
    "",
  ];
  if (found.length === 0) {
    lines.push("none found");
    lines.push("");
  } else {
    lines.push("## Non-`none` Pattern animation samples");
    lines.push("");
    for (const item of found) {
      lines.push(`- \`${item.file}\` → \`${item.animation}\``);
    }
    lines.push("");
  }
  fs.writeFileSync(
    path.join(PHASE0_DIR, "pattern-animation-inventory.md"),
    lines.join("\n"),
  );
  return found;
};

const writeApprovalRecord = (pairResults) => {
  const pairByRow = new Map();
  for (const pair of pairResults) {
    pairByRow.set(pair.left, pair);
    pairByRow.set(pair.right, pair);
  }

  const lines = [
    "# Phase 0 approval record",
    "",
    "Agent handoff pack. Product decisions are unresolved. Engineering measurements are filled; engineering approvals await a human.",
    "",
    "## Dual-ingress pairs",
    "",
  ];

  for (const pair of pairResults) {
    lines.push(`### ${pair.left} ↔ ${pair.right}`);
    lines.push(`- leftStill: \`${pair.leftStill}\``);
    lines.push(`- rightStill: \`${pair.rightStill}\``);
    lines.push(`- differingPixels: ${pair.differingPixels}`);
    lines.push(`- outputsMatch: ${pair.outputsMatch}`);
    lines.push("");
  }

  for (const row of MATRIX_ROWS) {
    const still = stillPathForRow(row.rowId);
    const relStill = path.relative(ROOT, still).replace(/\\/g, "/");
    lines.push(`## ${row.rowId} — ${row.workingName}`);
    lines.push(`- rowId: ${row.rowId}`);
    lines.push(`- workingName: ${row.workingName}`);
    lines.push(`- wireIngress: ${row.wireIngress}`);
    lines.push(`- stillPath: \`${relStill}\``);
    lines.push("- productDecision: unresolved");
    lines.push("- productApprover: ");
    lines.push("- productRole: ");
    lines.push("- productDate: ");
    lines.push("- productNotes: ");
    lines.push("- mergeTarget: ");
    lines.push("- engineeringResult: unresolved");
    lines.push("- engineeringApprover: ");
    lines.push("- engineeringRole: ");
    lines.push("- engineeringDate: ");
    lines.push("- engineeringNotes: ");
    const pair = pairByRow.get(row.rowId);
    if (pair) {
      lines.push(`- differingPixels: ${pair.differingPixels}`);
      lines.push(`- outputsMatch: ${pair.outputsMatch}`);
    }
    if (row.orphanOrMismatch) {
      lines.push("- orphanOrMismatchClassification: unresolved");
    }
    lines.push("");
  }

  fs.writeFileSync(path.join(PHASE0_DIR, "approval-record.md"), lines.join("\n"));
};

const main = () => {
  ensureHarnessSharedFixturePresent();
  const fixture = loadSharedFixture();
  assertSharedFixtureShape(fixture);

  fs.mkdirSync(STILLS_DIR, { recursive: true });
  fs.mkdirSync(CONTACT_DIR, { recursive: true });

  for (const row of MATRIX_ROWS) {
    renderRow(row.rowId, fixture.frame);
  }

  const pairResults = DUAL_INGRESS_PAIRS.map(([left, right]) => {
    const leftStill = stillPathForRow(left);
    const rightStill = stillPathForRow(right);
    const comparison = comparePngExact(leftStill, rightStill);
    return {
      left,
      right,
      leftStill: path.relative(ROOT, leftStill).replace(/\\/g, "/"),
      rightStill: path.relative(ROOT, rightStill).replace(/\\/g, "/"),
      differingPixels: comparison.differingPixels,
      outputsMatch: comparison.outputsMatch,
    };
  });

  const rowIds = MATRIX_ROWS.map((row) => row.rowId);
  buildContactSheet(
    rowIds,
    STILLS_DIR,
    path.join(CONTACT_DIR, "phase-0-contact-sheet.png"),
  );

  inventoryNoise();
  inventoryPatternAnimation();
  writeApprovalRecord(pairResults);

  console.log("\nPhase 0 audit pack written to", PHASE0_DIR);
  console.log("Dual-ingress results:");
  for (const pair of pairResults) {
    console.log(
      `  ${pair.left} ↔ ${pair.right}: differingPixels=${pair.differingPixels} outputsMatch=${pair.outputsMatch}`,
    );
  }
};

main();
