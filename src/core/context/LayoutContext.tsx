import React, { createContext, useContext, ReactNode } from "react";
import { useVideoDataContext } from "./VideoDataContext";
interface LayoutContextProps {
  doesAccountHaveSponsors: boolean;
}

const LayoutContext = createContext<LayoutContextProps | null>(null);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { sponsors } = useVideoDataContext();

  const doesAccountHaveSponsors =
    Boolean(sponsors?.primary) || Boolean(sponsors?.default);
  const contextValue: LayoutContextProps = {
    doesAccountHaveSponsors,
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
