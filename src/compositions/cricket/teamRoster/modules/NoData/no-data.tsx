import React from "react";
import { AbsoluteFill } from "remotion";

const NoRosterData: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <h1>No Roster Data Available</h1>
    </AbsoluteFill>
  );
};

export default NoRosterData;
