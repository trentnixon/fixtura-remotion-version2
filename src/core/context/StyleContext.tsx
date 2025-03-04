import React, { createContext, useContext, ReactNode } from "react";
import { useGlobalContext } from "./GlobalContext";
import { useVideoDataContext } from "./VideoDataContext";

interface StyleContextProps {
  THEME: any;
  fontConfig: any;
  fontSizing: any;
}

const StyleContext = createContext<StyleContextProps | null>(null);

export const StyleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { settings } = useGlobalContext();
  const { Video } = useVideoDataContext();

  const THEME = Video.Theme || {};

  const contextValue: StyleContextProps = {
    THEME,
    fontConfig: settings.fontConfig,
    fontSizing: settings.fontSizing,
  };

  return (
    <StyleContext.Provider value={contextValue}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStylesContext = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error("useStylesContext must be used within a StyleProvider");
  }
  return context;
};
