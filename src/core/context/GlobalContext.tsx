import React, { createContext, useContext, ReactNode } from "react";

interface GlobalContextProps {
  settings: any;
  data: any;
}

const GlobalContext = createContext<GlobalContextProps | null>(null);

export const GlobalProvider: React.FC<{
  children: ReactNode;
  settings: any;
  data: any;
}> = ({ children, settings, data }) => {
  const contextValue: GlobalContextProps = {
    settings,
    data,
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
