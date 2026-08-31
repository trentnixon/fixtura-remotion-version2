import React from "react";
import { AbsoluteFill } from "remotion";
import type { HtmlInCanvasPalette } from "../types";

type DomBaseGradientProps = {
  palette: HtmlInCanvasPalette;
  angle?: number;
};

export const DomBaseGradient: React.FC<DomBaseGradientProps> = ({
  palette,
  angle = 145,
}) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(${angle}deg, ${palette.main} 0%, ${palette.accent} 100%)`,
    }}
  />
);
