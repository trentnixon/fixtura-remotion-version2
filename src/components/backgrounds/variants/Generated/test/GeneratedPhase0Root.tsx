import React from "react";
import { Composition, Folder } from "remotion";
import { GeneratedPhase0Composition } from "./GeneratedPhase0Composition";
import {
  GENERATED_PHASE0_ROW_IDS,
  sharedFixture,
  type GeneratedPhase0RowId,
} from "./phase0Fixtures";

export type { GeneratedPhase0RowId };
export { GENERATED_PHASE0_ROW_IDS };

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
