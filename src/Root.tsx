// src/Root.tsx
import React from "react";
import { isRemotionRender } from "./core/utils/environment";
import { ProductionRoot } from "./ProductionRoot";
import { DevelopmentRoot } from "./DevelopmentRoot";

export const RemotionRoot: React.FC = () => {
  // Studio preview uses DevelopmentRoot. Studio "Render" and CLI/Lambda set
  // NODE_ENV=production → ProductionRoot. ProductionRoot dual-registers the
  // Studio generated-preset composition ID when appearance.type is a catalogue
  // preset, so Studio Render finds the same ID as preview.
  if (isRemotionRender()) {
    return <ProductionRoot />;
  }

  return <DevelopmentRoot />;
};
