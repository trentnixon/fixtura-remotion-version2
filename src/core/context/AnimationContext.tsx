// src/core/context/AnimationContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

interface AnimationContextProps {
  animations: any;
}

const AnimationContext = createContext<AnimationContextProps | null>(null);

export const AnimationProvider: React.FC<{
  children: ReactNode;
  animations: any;
}> = ({ children, animations }) => {
  return (
    <AnimationContext.Provider value={{ animations }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error(
      "useAnimationContext must be used within an AnimationProvider",
    );
  }
  return context;
};
