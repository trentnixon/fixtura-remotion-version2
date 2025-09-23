import React from "react";
import { RosterDataItem } from "../../types"; // Adjust path as needed
import { RosterPlayerName } from "../../../utils/primitives/RosterPlayerName";
import { truncatePlayerName } from "../utils";

interface RosterPlayerListProps {
  roster: RosterDataItem;
  className?: string;
  gap?: string;
}

const RosterPlayerList: React.FC<RosterPlayerListProps> = ({
  roster,
  className = "text-left font-bold",
  gap = "gap-2",
}) => {
  return (
    <div className="flex-grow">
      <div className={`flex flex-col p-8 ${gap}`}>
        {roster.teamRoster.map((player, index) => (
          <RosterPlayerName
            key={index}
            value={truncatePlayerName(player.toUpperCase(), 20)}
            className={className}
          />
        ))}
      </div>
    </div>
  );
};

export default RosterPlayerList;
