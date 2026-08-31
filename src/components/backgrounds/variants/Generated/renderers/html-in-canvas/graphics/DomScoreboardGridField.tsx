import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import type { HtmlInCanvasPalette } from "../types";
import { useLoopTiming } from "../useLoopTiming";
import { DomBaseGradient } from "./DomBaseGradient";

export const DomScoreboardGridField: React.FC<{
  palette: HtmlInCanvasPalette;
}> = ({ palette }) => {
  const { width, height } = useVideoConfig();
  const { frame, loopProgress } = useLoopTiming();
  const cols = 14;
  const rows = 18;
  const cellW = width / cols;
  const cellH = height / rows;

  const cells = Array.from({ length: cols * rows }, (_, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const wave =
      0.5 +
      Math.sin(
        loopProgress * Math.PI * 2 + col * 0.55 + row * 0.35 + frame * 0.04,
      ) *
        0.5;
    const lit = wave > 0.62;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: col * cellW + 2,
          top: row * cellH + 2,
          width: cellW - 4,
          height: cellH - 4,
          borderRadius: 4,
          backgroundColor: lit ? palette.accent : palette.line,
          opacity: lit ? 0.14 + wave * 0.12 : 0.04 + wave * 0.03,
          boxShadow: lit
            ? `0 0 ${8 + wave * 12}px ${palette.accent}55`
            : undefined,
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <DomBaseGradient palette={palette} angle={180} />
      {cells}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 40%, transparent 20%, ${palette.main}dd 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
