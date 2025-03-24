// src/compositions/cricket/ladder/basic.tsx
import React from "react";

interface LadderProps {
  data: any;
}

export const Basic: React.FC<LadderProps> = ({ data }) => {
  const { VIDEO } = data;

  console.log("[VIDEO]", VIDEO);

  // This is where the Basic template implementation of a cricket ladder would go

  return (
    <>
      <h1>Basic Template - Cricket Ladder</h1>
      {/* Actual implementation details */}
      {data.map((ladder: any) => {
        return (
          <div key={ladder.id}>
            <h2>{ladder.name}</h2>
          </div>
        );
      })}
    </>
  );
};
