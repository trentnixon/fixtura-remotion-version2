import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import type { HtmlInCanvasPalette } from "../types";
import { useLoopTiming } from "../useLoopTiming";
import { DomBaseGradient } from "./DomBaseGradient";

export const DomOrbitRingsField: React.FC<{ palette: HtmlInCanvasPalette }> = ({
  palette,
}) => {
  const { width, height } = useVideoConfig();
  const { loopProgress } = useLoopTiming();
  const cx = width * 0.5;
  const cy = height * 0.42;

  const rings = [
    { r: 180, dash: 0.34, width: 2, dir: 1, color: palette.line },
    { r: 260, dash: 0.28, width: 2, dir: -1, color: palette.accent },
    { r: 340, dash: 0.22, width: 3, dir: 1, color: palette.line },
    { r: 430, dash: 0.18, width: 2, dir: -1, color: palette.accent },
    { r: 520, dash: 0.14, width: 2, dir: 1, color: palette.line },
    { r: 610, dash: 0.1, width: 2, dir: -1, color: palette.accent },
  ];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <DomBaseGradient palette={palette} angle={160} />
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        {rings.map((ring, index) => {
          const circumference = 2 * Math.PI * ring.r;
          const dashLength = circumference * ring.dash;
          const gapLength = circumference - dashLength;
          const offset =
            loopProgress * circumference * ring.dir +
            index * circumference * 0.08;

          return (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={ring.r}
              fill="none"
              stroke={ring.color}
              strokeWidth={ring.width}
              strokeDasharray={`${dashLength} ${gapLength}`}
              strokeDashoffset={-offset}
              opacity={0.16 + (index % 2) * 0.06}
            />
          );
        })}
        <circle cx={cx} cy={cy} r={48} fill={palette.accent} opacity={0.22} />
        <circle
          cx={cx}
          cy={cy}
          r={48}
          fill="none"
          stroke={palette.line}
          strokeWidth={2}
          opacity={0.35}
        />
      </svg>
    </AbsoluteFill>
  );
};
