import React, { createContext, useContext, ReactNode } from "react";
import { useGlobalContext } from "./GlobalContext";
import { useVideoDataContext } from "./VideoDataContext";

interface LayoutContextProps {
  doesAccountHaveSponsors: boolean;
  heights: any;
}

const LayoutContext = createContext<LayoutContextProps | null>(null);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { settings } = useGlobalContext();
  const { Club } = useVideoDataContext();

  const doesAccountHaveSponsors =
    Club?.Sponsors?.default?.general_sponsors?.length > 0 ||
    !!Club?.Sponsors?.default?.primary_sponsor;

  const contextValue: LayoutContextProps = {
    doesAccountHaveSponsors,
    heights: settings.heights,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
};
