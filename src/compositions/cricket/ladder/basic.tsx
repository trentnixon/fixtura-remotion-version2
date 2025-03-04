// src/compositions/cricket/ladder/basic.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { FixturaDataset } from "../../../core/types/data/index";

interface LadderProps {
  DATA: FixturaDataset;
}

export const Basic: React.FC<LadderProps> = ({ DATA }) => {
  // This is where the Basic template implementation of a cricket ladder would go
  return (
    <AbsoluteFill>
      <h1>Basic Template - Cricket Ladder</h1>
      {/* Actual implementation details */}
    </AbsoluteFill>
  );
};
