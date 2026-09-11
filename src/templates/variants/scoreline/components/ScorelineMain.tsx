import React from "react";
import { AbsoluteFill } from "remotion";
import { RouteToComposition } from "../../../../core/utils/routing";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { ProgressTimer } from "../../../../components/layout/main/Timer/ProgressTimer";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { getCompositionSectionHeight } from "../../../../core/utils/layoutHeights";
import { useScorelineCanvasStyle } from "../../../../compositions/cricket/utils/scoreline/scorelineCanvasStyle";
import { resolveScorelineCanvasDataset } from "../../../../compositions/cricket/utils/scoreline/resolveScorelineCanvasDataset";
import { csClass } from "../../../../compositions/cricket/utils/scoreline/componentStyles";
import { ScorelineMainHeader } from "./ScorelineMainHeader";

export const ScorelineMain: React.FC = () => {
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const { data, metadata, templateVariation } = useVideoDataContext();
  const { timings } = data;
  const canvasStyle = useScorelineCanvasStyle();
  const canvasDataset = resolveScorelineCanvasDataset(metadata.compositionId);
  const compositionRouteHeight = getCompositionSectionHeight(heights);

  return (
    <AbsoluteFill>
      <div
        className={`scoreline-canvas ${csClass(componentStyles, "scorelineCanvasShell")}`}
        style={canvasStyle}
        data-scoreline-mode={templateVariation.mode || "light"}
        {...canvasDataset}
      >
        <ScorelineMainHeader />
        <div
          className="relative min-h-0"
          style={{
            height: `${compositionRouteHeight}px`,
            maxHeight: `${compositionRouteHeight}px`,
          }}
        >
          {RouteToComposition()}
        </div>
        <ProgressTimer FRAMES={timings?.FPS_MAIN ?? 0} />
      </div>
    </AbsoluteFill>
  );
};
