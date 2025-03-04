// src/Root.tsx
import React from "react";
import { isRemotionRender } from "./core/utils/environment";
import { ProductionRoot } from "./ProductionRoot";
import { DevelopmentRoot } from "./DevelopmentRoot";

export const RemotionRoot: React.FC = () => {
  // Choose the appropriate root based on environment
  if (isRemotionRender()) {
    return <ProductionRoot />;
  }

  return <DevelopmentRoot />;
};
