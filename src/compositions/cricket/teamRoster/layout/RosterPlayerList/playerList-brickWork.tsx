import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { RosterPlayerName } from "../../../utils/primitives/RosterPlayerName";
import { truncatePlayerName } from "../utils";
import { RosterPlayerListProps } from "./_types/RosterPlayerListProps";
import { MAX_PLAYER_NAME_LENGTH } from "./_utils/constants";

/** Brickwork roster: each player in a row with medium background, no borders */
const RosterPlayerListBrickWork: React.FC<RosterPlayerListProps> = ({
  roster,
}) => {
  const { selectedPalette, layout } = useThemeContext();
  const bg = selectedPalette.container.backgroundTransparent.medium;

  return (
    <div className="flex-grow min-w-0">
      <div className="flex flex-col gap-1">
        {roster.teamRoster.map((player, index) => (
          <div
            key={index}
            className={`flex items-center w-full overflow-hidden px-4 py-2 ${layout.borderRadius.container}`}
            style={{ backgroundColor: bg }}
          >
            <RosterPlayerName
              value={truncatePlayerName(
                player.toUpperCase(),
                MAX_PLAYER_NAME_LENGTH,
              )}
              className="text-left"
              variant="onContainerCopyNoBg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RosterPlayerListBrickWork;
