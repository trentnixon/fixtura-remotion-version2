// src/components/layout/screen/OneColumn.tsx
import { AbsoluteFill } from "remotion";
import { RouteToComposition } from "../../../core/utils/routing";
import { useThemeContext } from "../../../core/context/ThemeContext";

export const OneColumn: React.FC<{ Header: React.FC }> = ({ Header }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;

  return (
    <AbsoluteFill>
      <div className="flex flex-col h-full w-full ">
        <div style={{ height: `${heights.header}px ` }} className="py-0 px-4">
          <Header />
        </div>
        <div
          className="relative"
          style={{ height: `${(heights.asset + heights.footer) * 2}px` }}
        >
          {RouteToComposition()}
        </div>
      </div>
    </AbsoluteFill>
  );
};
