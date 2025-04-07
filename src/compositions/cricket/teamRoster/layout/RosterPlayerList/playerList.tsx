import React from "react";
import { RosterDataItem } from "../../types"; // Adjust path as needed

interface RosterPlayerListProps {
  roster: RosterDataItem;
}

const RosterPlayerList: React.FC<RosterPlayerListProps> = ({ roster }) => {
  return (
    <div className="flex-grow">
      <ul>
        {roster.teamRoster.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
};

export default RosterPlayerList;
