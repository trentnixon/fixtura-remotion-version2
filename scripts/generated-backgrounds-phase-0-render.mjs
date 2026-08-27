import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  PHASE0_DIR,
  STILLS_DIR,
  CONTACT_DIR,
  stillPathForRow,
  loadSharedFixture,
  assertSharedFixtureShape,
  syncPhase0HarnessLocks,
  getMatrixRows,
  getDualIngressPairs,
  comparePngExact,
  buildContactSheet,
  collectNoiseMentions,
  ROOT,
} from "./generated-backgrounds-phase-0-lib.mjs";

const ENTRY = "src/GeneratedPhase0Entry.tsx";

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
      ENTRY,
      compositionId,
      outputPath,
      `--frame=${frame}`,
    ],
    {
      cwd: ROOT,
      stdio: "inherit",
      shell: true,
      env: { ...process.env },
    },
  );
  if (result.status !== 0 || !fs.existsSync(outputPath)) {
    throw new Error(`Render failed for ${rowId}`);
  }
  return outputPath;
};

const inventoryNoise = () => {
  const hits = collectNoiseMentions();
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
      if (
        !pattern ||
        pattern.animation === undefined ||
        pattern.animation === null
      ) {
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
  const matrixRows = getMatrixRows();
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

  for (const row of matrixRows) {
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
  syncPhase0HarnessLocks();
  const fixture = loadSharedFixture();
  assertSharedFixtureShape(fixture);
  const matrixRows = getMatrixRows();
  const dualPairs = getDualIngressPairs();

  fs.mkdirSync(STILLS_DIR, { recursive: true });
  fs.mkdirSync(CONTACT_DIR, { recursive: true });

  for (const row of matrixRows) {
    renderRow(row.rowId, fixture.frame);
  }

  const pairResults = dualPairs.map(([left, right]) => {
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

  const rowIds = matrixRows.map((row) => row.rowId);
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
