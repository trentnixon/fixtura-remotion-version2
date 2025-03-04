import React from "react";
import { AbsoluteFill } from "remotion";
import { FixturaDataset } from "../../core/types/data/index";

interface PlaceholderProps {
  DATA: FixturaDataset;
}

// A placeholder that can be used until real components are implemented
export const PlaceholderComposition: React.FC<PlaceholderProps> = ({
  DATA,
}) => {
  const compositionId = DATA.VIDEOMETA.Video.CompositionID;
  const template = DATA.VIDEOMETA.Video.Template || "Basic";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#222",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3em", marginBottom: 16 }}>
        {DATA.VIDEOMETA.Video.Title || "AFL Composition"}
      </h1>
      <h2 style={{ fontSize: "2em", marginBottom: 24 }}>{template} Template</h2>
      <p style={{ fontSize: "1.5em" }}>
        Placeholder for AFL composition: {compositionId}
      </p>
    </AbsoluteFill>
  );
};

// Export implementations for all composition types
export const ladder = {
  basic: PlaceholderComposition,
};

export const top5 = {
  basic: PlaceholderComposition,
};

export const results = {
  basic: PlaceholderComposition,
};

export const upcoming = {
  basic: PlaceholderComposition,
};

export const singleGameResult = {
  basic: PlaceholderComposition,
};
