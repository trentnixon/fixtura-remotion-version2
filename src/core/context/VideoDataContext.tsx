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
import { normalizeTemplateVariation } from "../utils/normalizeTemplateVariation";

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
  isAccountClub: boolean;
}

const VideoDataContext = createContext<VideoDataContextProps | null>(null);

export const VideoDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data } = useGlobalContext();

  const sourceVideo = data.videoMeta?.video || {};
  const templateVariation = normalizeTemplateVariation(
    sourceVideo.templateVariation,
  );
  const video = { ...sourceVideo, templateVariation };
  const club = data.videoMeta?.club || {};

  const contextValue: VideoDataContextProps = {
    data,
    video,
    metadata: video.metadata,
    media: video.media,
    appearance: video.appearance,
    contentLayout: video.contentLayout,
    templateVariation: templateVariation ?? ({} as VideoTemplateVariation),
    club,
    sponsors: club.sponsors,
    isAccountClub: !!data.videoMeta?.club?.IsAccountClub,
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
