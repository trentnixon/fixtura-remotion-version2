import React from "react";
import { AbsoluteFill } from "remotion";
import { FixturaDataset } from "../../core/types/data/index";

interface PlaceholderProps {
  data: FixturaDataset;
}

// A placeholder that can be used until real components are implemented
export const PlaceholderComposition: React.FC<PlaceholderProps> = ({
  data,
}) => {
  const compositionId = data.videoMeta.video.metadata.compositionId;
  const template = data.videoMeta.video.appearance.template || "Basic";

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
      <div
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 4,
        }}
      >
        {data.videoMeta.video.metadata.title || "AFL Composition"}
      </div>
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
