import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import BrickWorkMatchCard from "../../layout/MatchCard/card-brickWork";
import BrickWorkMatchCardClubOnly from "../../layout/MatchCard/card-brickWork-ClubOnly";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";

const BrickWorkSingleResult: React.FC<ResultSingleDisplayProps> = ({ match }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { isAccountClub } = useVideoDataContext();

  // Full height is available for a single match
  const availableHeight = heights.asset;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Match result container */}
      <div
        className="w-full flex flex-col justify-center"
        style={{ height: `${availableHeight}px` }}
      >
        {isAccountClub ? (
          <BrickWorkMatchCardClubOnly match={match} />
        ) : (
          <BrickWorkMatchCard match={match} />
        )}
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={match.assignSponsors} />
      </div>
    </div>
  );
};

export default BrickWorkSingleResult;
