import React from "react";
import { AbsoluteFill } from "remotion";
import { RouteToComposition } from "../../../../core/utils/routing";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { ProgressTimer } from "../../../../components/layout/main/Timer/ProgressTimer";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { getCompositionSectionHeight } from "../../../../core/utils/layoutHeights";
import { useNightSessionCanvasStyle } from "../../../../compositions/cricket/utils/nightSession/nightSessionCanvasStyle";
import { resolveNightSessionCanvasDataset } from "../../../../compositions/cricket/utils/nightSession/resolveNightSessionCanvasDataset";
import { csClass } from "../../../../compositions/cricket/utils/scoreline/componentStyles";
import { NightSessionMainHeader } from "./NightSessionMainHeader";

export const NightSessionMain: React.FC = () => {
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const { data, metadata, templateVariation } = useVideoDataContext();
  const { timings } = data;
  const canvasStyle = useNightSessionCanvasStyle();
  const canvasDataset = resolveNightSessionCanvasDataset(
    metadata.compositionId,
  );
  const compositionRouteHeight = getCompositionSectionHeight(heights);

  return (
    <AbsoluteFill>
      <div
        className={`night-session-canvas template-canvas ${csClass(componentStyles, "nightSessionCanvasShell")}`}
        style={canvasStyle}
        data-night-session-mode={templateVariation.mode || "light"}
        {...canvasDataset}
      >
        <NightSessionMainHeader />
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
