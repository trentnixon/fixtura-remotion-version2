// src/compositions/cricket/placeholders.tsx
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
    <AbsoluteFill className="bg-black bg-opacity-50 flex flex-col items-center justify-center p-8 text-white">
      <h1 className="text-3xl mb-0.5">
        {DATA.VIDEOMETA.Video.Title || "Composition"}
      </h1>
      <h2 className="text-2xl mb-4">{template} Template</h2>
      <p className="text-xl text-center">
        Placeholder for composition: {compositionId}
      </p>
    </AbsoluteFill>
  );
};

// Create basic template version (placeholder)
export const basic = PlaceholderComposition;
