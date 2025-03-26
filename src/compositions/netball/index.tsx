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
        backgroundColor: "#103",
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
        {data.videoMeta.video.metadata.title || "Netball Composition"}
      </h1>
      <h2 style={{ fontSize: "2em", marginBottom: 24 }}>{template} Template</h2>
      <p style={{ fontSize: "1.5em" }}>
        Placeholder for Netball composition: {compositionId}
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
