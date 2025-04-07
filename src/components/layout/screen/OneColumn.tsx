// src/components/layout/screen/OneColumn.tsx
import { AbsoluteFill } from "remotion";
import { RouteToComposition } from "../../../core/utils/routing";
import { useThemeContext } from "../../../core/context/ThemeContext";

export const OneColumn: React.FC<{ Header: React.FC; Sponsor: React.FC }> = ({
  Header,
  Sponsor,
}) => {
  const { layout } = useThemeContext();

  const { heights } = layout;

  return (
    <AbsoluteFill>
      <div className="flex flex-col h-full w-full">
        <div style={{ height: `${heights.header}px` }}>
          <Header />
        </div>
        <div className="relative" style={{ height: `${heights.asset}px` }}>
          {RouteToComposition()}
        </div>
        <div style={{ height: `${heights.footer}px` }}>
          <Sponsor />
        </div>
      </div>
    </AbsoluteFill>
  );
};
