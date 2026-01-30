import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import ClassicTwoColumnsMatchCard from "../../layout/MatchCard/card-classic-two-columns";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";

const ClassicSingleResultTwoColumns: React.FC<ResultSingleDisplayProps> = ({
  match,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Match result container */}
      <div
        className="w-full flex flex-col justify-center "
        style={{ minHeight: `${heights.asset}px` }}
      >
        <ClassicTwoColumnsMatchCard match={match} />
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={match.assignSponsors} />
      </div>
    </div>
  );
};

export default ClassicSingleResultTwoColumns;
