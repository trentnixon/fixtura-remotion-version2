import React, { createContext, useContext, ReactNode } from "react";

interface GlobalContextProps {
  // Host-provided; shape varies by composition entry
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

const GlobalContext = createContext<GlobalContextProps | null>(null);

export const GlobalProvider: React.FC<{
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
