import React from "react";
import { Audio } from "remotion";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";

export const BaseAudioTrack: React.FC = () => {
  const { video } = useVideoDataContext();

  // Only render audio if a track is specified
  if (!video.audio_option) return null;

  return <Audio src={video.audio_option} volume={0.5} />;
};
