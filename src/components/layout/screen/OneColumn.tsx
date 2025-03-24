// src/components/layout/screen/OneColumn.tsx
import { AbsoluteFill } from "remotion";
import { routeToComposition } from "../../../core/utils/routing";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";

export const OneColumn: React.FC<{ Header: React.FC; Sponsor: React.FC }> = ({
  Header,
  Sponsor,
}) => {
  const { layout } = useThemeContext();
  const { data } = useVideoDataContext();

  const { heights } = layout;

  return (
    <AbsoluteFill>
      <div className="flex flex-col h-full w-full">
        <div style={{ height: `${heights.header}px` }}>
          <Header />
        </div>
        <div className=" flex-grow" style={{ height: `${heights.asset}px` }}>
          {routeToComposition(data)}
        </div>
        <div style={{ height: `${heights.footer}px` }}>
          <Sponsor />
        </div>
      </div>
    </AbsoluteFill>
  );
};
