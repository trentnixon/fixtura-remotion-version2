import React, { createContext, useContext, ReactNode } from "react";

interface GlobalContextProps {
  settings: any;
  DATA: any;
}

const GlobalContext = createContext<GlobalContextProps | null>(null);

export const GlobalProvider: React.FC<{
  children: ReactNode;
  settings: any;
  DATA: any;
}> = ({ children, settings, DATA }) => {
  const contextValue: GlobalContextProps = {
    settings,
    DATA,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
