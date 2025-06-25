import React from "react";
import { Audio } from "remotion";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";

export const BaseAudioTrack: React.FC = () => {
  const { video } = useVideoDataContext();

  // Only render audio if a track is specified
  if (!video.media?.audio?.url) return null;

  return (
    <Audio
      src={video.media.audio.audioOption || video.media.audio.url}
      volume={0.5}
    />
  );
};
