import React from "react";
import { Composition, Folder } from "remotion";
import {
  GeneratedPhase0Composition,
  type GeneratedPhase0RowId,
} from "./GeneratedPhase0Composition";
import { sharedFixture } from "./sharedFixture";

export const GENERATED_PHASE0_ROW_IDS: GeneratedPhase0RowId[] = [
  "G-geo",
  "N-geo",
  "G-spk",
  "N-spk",
  "G-gfx",
  "N-gfx",
  "G-mismatch",
  "P-dots",
  "P-lines",
  "P-grid",
  "P-crosshatch",
  "P-triangles",
  "P-chevron",
];

/**
 * Development-only registration for Phase 0 audit stills.
 */
export const GeneratedPhase0Root: React.FC = () => (
  <Folder name="Generated-Phase0-Audit">
    {GENERATED_PHASE0_ROW_IDS.map((rowId) => (
      <Composition
        key={rowId}
        id={`Generated-Phase0-${rowId}`}
        component={GeneratedPhase0Composition}
        durationInFrames={90}
        fps={sharedFixture.fps}
        width={sharedFixture.width}
        height={sharedFixture.height}
        defaultProps={{ rowId }}
      />
    ))}
  </Folder>
);
