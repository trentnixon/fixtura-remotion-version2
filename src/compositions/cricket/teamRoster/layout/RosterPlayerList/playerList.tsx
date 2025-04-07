import React from "react";
import { RosterDataItem } from "../../types"; // Adjust path as needed
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { RosterPlayerName } from "../../../utils/primitives/RosterPlayerName";

interface RosterPlayerListProps {
  roster: RosterDataItem;
}

const RosterPlayerList: React.FC<RosterPlayerListProps> = ({ roster }) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  return (
    <div className="flex-grow">
      <div className="flex flex-col p-8 gap-2">
        {roster.teamRoster.map((player, index) => (
          <RosterPlayerName
            key={index}
            value={player.toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: 0 }}
            className="text-center"
          />
        ))}
      </div>
    </div>
  );
};

export default RosterPlayerList;
