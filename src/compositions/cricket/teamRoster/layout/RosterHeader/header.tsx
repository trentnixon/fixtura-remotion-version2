import React from "react";
import { RosterDataItem } from "../../types"; // Adjust path as needed

interface RosterHeaderProps {
  roster: RosterDataItem;
}

const RosterHeader: React.FC<RosterHeaderProps> = ({ roster }) => {
  return (
    <div>
      <h1>
        {roster.gradeName} - {roster.round}
      </h1>
      <h2>
        {roster.teamHome} vs {roster.teamAway}
      </h2>
    </div>
  );
};

export default RosterHeader;
