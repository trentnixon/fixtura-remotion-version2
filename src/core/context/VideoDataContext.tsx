import React, { createContext, useContext, ReactNode } from "react";
import { useGlobalContext } from "./GlobalContext";

interface VideoDataContextProps {
  DATA: any;
  Video: any;
  Club: any;
}

const VideoDataContext = createContext<VideoDataContextProps | null>(null);

export const VideoDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { DATA } = useGlobalContext();
  console.log("[DATA.VIDEOMETA?.Video]", DATA.VIDEOMETA?.Video);
  const Video = DATA.VIDEOMETA?.Video || {};
  const Club = DATA.VIDEOMETA?.Club || {};

  const contextValue: VideoDataContextProps = {
    DATA,
    Video,
    Club,
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
