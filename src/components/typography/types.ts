import React from "react";

// Base props that all typography components share
export interface BaseTypographyProps {
  children: React.ReactNode;
  variant?: string;
  contrastSafe?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
