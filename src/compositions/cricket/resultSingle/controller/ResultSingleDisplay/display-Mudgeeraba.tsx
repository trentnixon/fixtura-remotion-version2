import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import MatchCardMudgeeraba from "../../layout/MatchCard/card-Mudgeeraba";
import { SponsorFooter } from "../../../sponsorFooter";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import MatchCardMudgeerabaClubOnly from "../../layout/MatchCard/card-Mudgeeraba-clubOnly";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";

const ResultSingleDisplayMudgeeraba: React.FC<ResultSingleDisplayProps> = ({ match }) => {
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
          <MatchCardMudgeerabaClubOnly match={match} />
        ) : (
          <MatchCardMudgeeraba match={match} />
        )}
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={match.assignSponsors} />
      </div>
    </div>
  );
};

export default ResultSingleDisplayMudgeeraba;
