import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import type { HtmlInCanvasPalette } from "../types";
import { useLoopTiming } from "../useLoopTiming";
import { DomBaseGradient } from "./DomBaseGradient";

export const DomNeonBeamsField: React.FC<{ palette: HtmlInCanvasPalette }> = ({
  palette,
}) => {
  const { width, height } = useVideoConfig();
  const { loopProgress, pulse } = useLoopTiming();
  const sweep = loopProgress * 140 - 70;

  const beams = Array.from({ length: 6 }, (_, index) => {
    const offset = sweep + index * 22;
    const thickness = index % 2 === 0 ? 96 : 64;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: "-50%",
          top: `${6 + index * 14}%`,
          width: "220%",
          height: thickness,
          background: `linear-gradient(90deg, transparent 0%, ${palette.accent}88 35%, ${palette.line}cc 50%, ${palette.accent}88 65%, transparent 100%)`,
          opacity: 0.12 + (index % 3) * 0.05 + pulse * 0.04,
          transform: `rotate(-32deg) translateX(${offset}%)`,
          filter: "blur(1px)",
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ width, height, overflow: "hidden" }}>
      <DomBaseGradient palette={palette} angle={125} />
      {beams}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(
            -32deg,
            transparent,
            transparent 120px,
            rgba(255,255,255,0.025) 120px,
            rgba(255,255,255,0.025) 122px
          )`,
          transform: `translateX(${loopProgress * 80 - 40}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
