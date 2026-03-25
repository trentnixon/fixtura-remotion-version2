// src/components/layout/screen/OneColumn.tsx
import { AbsoluteFill } from "remotion";
import { RouteToComposition } from "../../../core/utils/routing";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { ProgressTimer } from "../main/Timer/ProgressTimer";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";

export const OneColumn: React.FC<{ Header: React.FC }> = ({ Header }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const compositionRouteHeight = (heights.asset + heights.footer) * 2;
  const headerPx = heights.header;
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { FPS_MAIN } = timings;
  return (
    <AbsoluteFill>
      <div className="flex flex-col h-full w-full ">
        <div
          style={{
            height: `${headerPx}px`,
            minHeight: `${headerPx}px`,
            maxHeight: `${headerPx}px`,
            flexShrink: 0,
          }}
          className="flex min-h-0 w-full flex-col overflow-visible px-2 py-0"
        >
          <div className="flex h-full min-h-0 w-full flex-col">
            <Header />
          </div>
        </div>
        <div
          className="relative"
          style={{
            height: `${compositionRouteHeight}px`,
          }}
        >
          {RouteToComposition()}
        </div>
        <ProgressTimer FRAMES={FPS_MAIN ?? 0} />
      </div>
    </AbsoluteFill>
  );
};
