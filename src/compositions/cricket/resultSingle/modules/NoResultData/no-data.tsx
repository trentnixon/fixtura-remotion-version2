import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

const NoResultData: React.FC = () => {
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;

  return (
    <div
      className="flex items-center justify-center"
      style={{ height: `${heights.asset}px` }}
    >
      <div className={componentStyles.title.className}>
        No Match Result Available
      </div>
    </div>
  );
};

export default NoResultData;
