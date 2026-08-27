import fs from "node:fs";
import path from "node:path";
import {
  PHASE0_DIR,
  STILLS_DIR,
  CONTACT_DIR,
  SHARED_FIXTURE_PATH,
  stillPathForRow,
  loadSharedFixture,
  assertSharedFixtureShape,
  assertHarnessLocksMatchAuthoritative,
  assertMatrixMatchesContract,
  getMatrixRows,
  getDualIngressPairs,
  comparePngExact,
  parseApprovalRecord,
  parseDualIngressSection,
  collectNoiseMentions,
  loadMatrix,
  ROOT,
} from "./generated-backgrounds-phase-0-lib.mjs";

const fail = (message) => {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
};

const main = () => {
  process.exitCode = 0;

  if (!fs.existsSync(SHARED_FIXTURE_PATH)) {
    fail("fixtures/shared.json missing");
    return;
  }

  let fixture;
  let matrixRows;
  let dualPairs;
  try {
    fixture = loadSharedFixture();
    assertSharedFixtureShape(fixture);
    assertHarnessLocksMatchAuthoritative();
    assertMatrixMatchesContract(loadMatrix());
    matrixRows = getMatrixRows();
    dualPairs = getDualIngressPairs();
  } catch (error) {
    fail(error.message);
    return;
  }

  const expectedIds = matrixRows.map((row) => row.rowId);
  for (const rowId of expectedIds) {
    const still = stillPathForRow(rowId);
    if (!fs.existsSync(still)) {
      fail(`missing still for ${rowId}: ${still}`);
    }
  }

  const stillFiles = fs
    .readdirSync(STILLS_DIR)
    .filter((name) => name.endsWith(".png"))
    .map((name) => name.replace(/\.png$/, ""));
  const unexpected = stillFiles.filter((id) => !expectedIds.includes(id));
  if (unexpected.length > 0) {
    fail(`unexpected stills: ${unexpected.join(", ")}`);
  }
  if (stillFiles.length !== expectedIds.length) {
    fail(
      `expected ${expectedIds.length} stills, found ${stillFiles.length}`,
    );
  }

  const contactSheet = path.join(CONTACT_DIR, "phase-0-contact-sheet.png");
  const manifestPath = path.join(CONTACT_DIR, "manifest.json");
  if (!fs.existsSync(contactSheet)) {
    fail("contact-sheet/phase-0-contact-sheet.png missing");
  }
  if (!fs.existsSync(manifestPath)) {
    fail("contact-sheet/manifest.json missing");
  } else {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    for (const rowId of expectedIds) {
      if (!manifest.rows?.includes(rowId)) {
        fail(`contact sheet manifest missing row ${rowId}`);
      }
    }
  }

  const approvalPath = path.join(PHASE0_DIR, "approval-record.md");
  if (!fs.existsSync(approvalPath)) {
    fail("approval-record.md missing");
    return;
  }
  const approvalMarkdown = fs.readFileSync(approvalPath, "utf8");
  const rows = parseApprovalRecord(approvalMarkdown);
  for (const expected of matrixRows) {
    const row = rows.find((entry) => entry.rowId === expected.rowId);
    if (!row) {
      fail(`approval-record missing row ${expected.rowId}`);
      continue;
    }
    for (const field of [
      "rowId",
      "workingName",
      "wireIngress",
      "stillPath",
      "productDecision",
      "productApprover",
      "productRole",
      "productDate",
      "productNotes",
      "mergeTarget",
      "engineeringResult",
      "engineeringApprover",
      "engineeringRole",
      "engineeringDate",
      "engineeringNotes",
    ]) {
      if (row.fields[field] === undefined) {
        fail(`${expected.rowId} missing field ${field}`);
      }
    }
    if (row.fields.productDecision !== "unresolved") {
      fail(
        `${expected.rowId} productDecision must be unresolved at agent handoff (found ${row.fields.productDecision})`,
      );
    }
    if (expected.orphanOrMismatch) {
      if (row.fields.orphanOrMismatchClassification === undefined) {
        fail(`${expected.rowId} missing orphanOrMismatchClassification`);
      }
    }
  }

  const pairs = parseDualIngressSection(approvalMarkdown);
  if (pairs.length !== dualPairs.length) {
    fail(
      `expected ${dualPairs.length} dual-ingress pair blocks, found ${pairs.length}`,
    );
  }

  for (const [left, right] of dualPairs) {
    const block = pairs.find(
      (pair) => pair.title.includes(left) && pair.title.includes(right),
    );
    if (!block) {
      fail(`dual-ingress section missing ${left} ↔ ${right}`);
      continue;
    }
    const recorded = Number(block.fields.differingPixels);
    if (!Number.isFinite(recorded)) {
      fail(`${left}↔${right} differingPixels missing or not a number`);
      continue;
    }
    const expectedMatch = recorded === 0 ? "yes" : "no";
    if (block.fields.outputsMatch !== expectedMatch) {
      fail(
        `${left}↔${right} outputsMatch must be ${expectedMatch} when differingPixels=${recorded}`,
      );
    }
    const recomputed = comparePngExact(
      stillPathForRow(left),
      stillPathForRow(right),
    );
    if (recomputed.differingPixels !== recorded) {
      fail(
        `${left}↔${right} recorded differingPixels=${recorded} but recomputed=${recomputed.differingPixels}`,
      );
    }
  }

  const noisePath = path.join(PHASE0_DIR, "noise-inventory.md");
  const patternPath = path.join(PHASE0_DIR, "pattern-animation-inventory.md");
  if (!fs.existsSync(noisePath)) {
    fail("noise-inventory.md missing");
  } else {
    const noiseText = fs.readFileSync(noisePath, "utf8");
    const requiredMentions = collectNoiseMentions();
    for (const mention of [
      "CONTEXT.md",
      ".skills/architecture/components-backgrounds-folder.md",
    ]) {
      if (
        requiredMentions.includes(mention) &&
        !noiseText.includes(`\`${mention}\``)
      ) {
        fail(`noise-inventory.md missing required mention ${mention}`);
      }
    }
  }
  if (!fs.existsSync(patternPath)) {
    fail("pattern-animation-inventory.md missing");
  } else {
    const patternText = fs.readFileSync(patternPath, "utf8");
    const hasNoneFound = patternText.includes("none found");
    const hasSamples = /## Non-`none` Pattern animation samples/.test(
      patternText,
    );
    if (!hasNoneFound && !hasSamples) {
      fail(
        'pattern-animation-inventory.md must list samples or contain "none found"',
      );
    }
  }

  if (process.exitCode === 0) {
    console.log("PASS: Phase 0 audit verification");
    console.log(`ROOT=${ROOT}`);
  }
};

main();
