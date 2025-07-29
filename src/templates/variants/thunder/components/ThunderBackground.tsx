// src/templates/variants/basic/components/BasicBackground.tsx
import React from "react";
import { SelectTemplateBackground } from "../../../../components/backgrounds";

// This is now just a wrapper around the centralized Background component
export const ThunderBackground: React.FC = () => {
  return <SelectTemplateBackground />;
};
