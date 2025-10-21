import React from "react";
import { MatchResult } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import CNSWMatchCardPrivate from "../../layout/MatchCard/card-cnsw-private";

interface ResultSingleDisplayProps {
  match: MatchResult;
}

const CNSWSingleResultPrivate: React.FC<ResultSingleDisplayProps> = ({
  match,
}) => {
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
        <CNSWMatchCardPrivate match={match} />
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={match.assignSponsors} />
      </div>
    </div>
  );
};

export default CNSWSingleResultPrivate;
