import React from "react";
import { MatchResult } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import MatchCard from "../../layout/MatchCard/card";

interface ResultSingleDisplayProps {
  match: MatchResult;
}

const ResultSingleDisplay: React.FC<ResultSingleDisplayProps> = ({ match }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;

  // Full height is available for a single match
  const availableHeight = heights.asset;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Match result container */}
      <div
        className="w-full flex flex-col justify-center"
        style={{ height: `${availableHeight}px` }}
      >
        <MatchCard match={match} />
      </div>
    </div>
  );
};

export default ResultSingleDisplay;
