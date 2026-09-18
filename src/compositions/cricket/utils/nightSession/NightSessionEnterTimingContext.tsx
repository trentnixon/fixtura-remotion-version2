import React, { createContext, useContext } from "react";
import type { NightSessionRowEnterTiming } from "./nightSessionEnterTiming";

const NightSessionEnterTimingContext =
  createContext<NightSessionRowEnterTiming | null>(null);

export const NightSessionEnterTimingProvider: React.FC<{
  value: NightSessionRowEnterTiming;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <NightSessionEnterTimingContext.Provider value={value}>
    {children}
  </NightSessionEnterTimingContext.Provider>
);

export const useNightSessionRowEnterTiming = (): NightSessionRowEnterTiming => {
  const value = useContext(NightSessionEnterTimingContext);
  if (!value) {
    throw new Error(
      "useNightSessionRowEnterTiming requires NightSessionEnterTimingProvider",
    );
  }
  return value;
};

export const useOptionalNightSessionRowEnterTiming =
  (): NightSessionRowEnterTiming | null =>
    useContext(NightSessionEnterTimingContext);
