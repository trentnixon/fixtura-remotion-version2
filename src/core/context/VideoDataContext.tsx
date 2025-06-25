import React, { createContext, useContext, ReactNode } from "react";
import { useGlobalContext } from "./GlobalContext";
import {
  Video,
  VideoMetadata,
  VideoMedia,
  VideoAppearance,
  VideoContentLayout,
  VideoTemplateVariation,
} from "../types/data/videoData";
import { Club, SponsorsData } from "../types/data/sponsors";
import { FixturaDataset } from "../types/data/index";

interface VideoDataContextProps {
  data: FixturaDataset;
  video: Video;
  club: Club;
  metadata: VideoMetadata;
  media: VideoMedia;
  appearance: VideoAppearance;
  contentLayout: VideoContentLayout;
  templateVariation: VideoTemplateVariation;
  sponsors: SponsorsData;
}

const VideoDataContext = createContext<VideoDataContextProps | null>(null);

export const VideoDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data } = useGlobalContext();

  const video = data.videoMeta?.video || {};
  const club = data.videoMeta?.club || {};

  const contextValue: VideoDataContextProps = {
    data,
    video,
    metadata: video.metadata,
    media: video.media,
    appearance: video.appearance,
    contentLayout: video.contentLayout,
    templateVariation: video.templateVariation,
    club,
    sponsors: club.sponsors,
  };

  return (
    <VideoDataContext.Provider value={contextValue}>
      {children}
    </VideoDataContext.Provider>
  );
};

export const useVideoDataContext = () => {
  const context = useContext(VideoDataContext);
  if (!context) {
    throw new Error(
      "useVideoDataContext must be used within a VideoDataProvider",
    );
  }
  return context;
};
