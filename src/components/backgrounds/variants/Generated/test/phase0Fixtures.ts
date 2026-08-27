/**
 * Synced copies of Phase 0 authoritative fixtures.
 * Do not edit by hand — `syncPhase0HarnessLocks()` overwrites these from
 * `.scratch/generated-backgrounds/phase-0/fixtures/`.
 */
import sharedFixtureJson from "./locks/shared.json";
import matrixJson from "./locks/matrix.json";

export type GeneratedPhase0RowId =
  | "G-geo"
  | "N-geo"
  | "G-spk"
  | "N-spk"
  | "G-gfx"
  | "N-gfx"
  | "G-mismatch"
  | "P-dots"
  | "P-lines"
  | "P-grid"
  | "P-crosshatch"
  | "P-triangles"
  | "P-chevron";

export type SharedFixture = typeof sharedFixtureJson;
export type Phase0Matrix = typeof matrixJson;

export const sharedFixture = sharedFixtureJson as SharedFixture;
export const phase0Matrix = matrixJson as Phase0Matrix;

export const GENERATED_PHASE0_ROW_IDS = phase0Matrix.rows.map(
  (row) => row.rowId,
) as GeneratedPhase0RowId[];

export const getRowTemplateVariation = (rowId: GeneratedPhase0RowId) => {
  const row = phase0Matrix.rows.find((entry) => entry.rowId === rowId);
  if (!row) {
    throw new Error(`Unknown Phase 0 rowId: ${rowId}`);
  }
  const variation = {
    ...row.templateVariation,
  } as Record<string, unknown>;
  if (
    typeof variation.useBackground === "string" &&
    (variation.useBackground === "Graphics" ||
      variation.useBackground === "Noise")
  ) {
    variation.gradient = sharedFixture.gradient;
  }
  return variation;
};
