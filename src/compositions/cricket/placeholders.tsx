// src/compositions/cricket/placeholders.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../core/context/VideoDataContext";

// A placeholder that can be used until real composition overlays are implemented
export const PlaceholderComposition: React.FC = () => {
  const { data, metadata, appearance } = useVideoDataContext();
  const compositionId = metadata?.compositionId ?? "Unknown";
  const template = appearance?.template || "Basic";
  const title = metadata?.title || metadata?.videoTitle || "Composition";

  return (
    <AbsoluteFill className="bg-black bg-opacity-50 flex flex-col items-center justify-center p-8 text-white">
      <h1 className="text-3xl mb-0.5">
        {title}
      </h1>
      <h2 className="text-2xl mb-4">{template} Template</h2>
      <p className="text-xl text-center">
        Placeholder for composition: {compositionId}
      </p>
      {!data?.videoMeta?.video ? (
        <p className="mt-2 text-sm text-white/70">Missing videoMeta on dataset</p>
      ) : null}
    </AbsoluteFill>
  );
};

// Create basic template version (placeholder)
export const basic = PlaceholderComposition;
