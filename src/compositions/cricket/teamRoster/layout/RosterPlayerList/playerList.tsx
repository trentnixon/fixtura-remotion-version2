import React from "react";
import { RosterPlayerName } from "../../../utils/primitives/RosterPlayerName";
import { truncatePlayerName } from "../utils";
import { RosterPlayerListProps } from "./_types/RosterPlayerListProps";
import {
  DEFAULT_PLAYER_LIST_CLASSNAME,
  DEFAULT_PLAYER_LIST_GAP,
  MAX_PLAYER_NAME_LENGTH,
} from "./_utils/constants";

const RosterPlayerList: React.FC<RosterPlayerListProps> = ({
  roster,
  className = DEFAULT_PLAYER_LIST_CLASSNAME,
  gap = DEFAULT_PLAYER_LIST_GAP,
}) => {
  return (
    <div className="flex-grow">
      <div className={`flex flex-col p-8 ${gap}`}>
        {roster.teamRoster.map((player, index) => (
          <RosterPlayerName
            key={index}
            value={truncatePlayerName(
              player.toUpperCase(),
              MAX_PLAYER_NAME_LENGTH,
            )}
            className={className}
          />
        ))}
      </div>
    </div>
  );
};

export default RosterPlayerList;
