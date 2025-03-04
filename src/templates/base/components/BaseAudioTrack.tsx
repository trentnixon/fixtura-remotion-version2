import React from "react";
import { Audio } from "remotion";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";

export const BaseAudioTrack: React.FC = () => {
  const { Video } = useVideoDataContext();

  // Only render audio if a track is specified
  if (!Video.audio_option) return null;

  return <Audio src={Video.audio_option} volume={0.5} />;
};
