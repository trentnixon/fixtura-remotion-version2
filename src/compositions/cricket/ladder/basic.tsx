// src/compositions/cricket/ladder/basic.tsx
import React from "react";
import { AbsoluteFill } from "remotion";

interface LadderProps {
  DATA: any;
}

export const Basic: React.FC<LadderProps> = ({ DATA }) => {
  // This is where the Basic template implementation of a cricket ladder would go
  console.log("[DATA LADDER]", DATA);
  return (
    <AbsoluteFill>
      <h1>Basic Template - Cricket Ladder</h1>
      {/* Actual implementation details */}
      {DATA.map((ladder: any) => {
        return (
          <div key={ladder.id}>
            <h2>{ladder.name}</h2>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
