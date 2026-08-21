import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import ClassicTwoColumnsMatchCard from "../../layout/MatchCard/card-classic-two-columns";
import ClassicTwoColumnsMatchCardClubOnly from "../../layout/MatchCard/card-classic-two-columns-ClubOnly";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";

const ClassicSingleResultTwoColumns: React.FC<ResultSingleDisplayProps> = ({
  match,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { isAccountClub } = useVideoDataContext();

  return (
    <div className="flex flex-col h-full w-full">
      {/* Match result container */}
      <div
        className="w-full flex flex-col justify-center "
        style={{ minHeight: `${heights.asset}px` }}
      >
        {isAccountClub ? (
          <ClassicTwoColumnsMatchCardClubOnly match={match} />
        ) : (
          <ClassicTwoColumnsMatchCard match={match} />
        )}
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={match.assignSponsors} primaryForScreen={match.primaryForScreen} />
      </div>
    </div>
  );
};

export default ClassicSingleResultTwoColumns;
