import React from "react";
import { RosterDataItem } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import RosterHeader from "../../layout/RosterHeader/header";
import RosterDetails from "../../layout/RosterDetails/details";
import RosterPlayerList from "../../layout/RosterPlayerList/playerList";
import RosterSponsors from "../../layout/RosterSponsors/sponsors";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";

interface RosterDisplayProps {
  roster: RosterDataItem;
}

const RosterDisplay: React.FC<RosterDisplayProps> = ({ roster }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const availableHeight = heights.asset;

  return (
    <div className="p-0 flex flex-col w-full h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-8 p-4 bg-black/40 rounded-lg overflow-hidden"
        backgroundColor="none"
        animation={{
          type: "revealBottom",
          easing: "easeInOut",
          duration: 25,
          custom: {
            distance: 200,
          },
        }}
        animationDelay={0}
        exitAnimation={{
          type: "none",
          easing: "easeInOut",
          duration: 15,
          custom: {
            distance: 100,
          },
        }}
      >
        <div className="flex flex-col h-full w-full">
          <div
            className="w-full flex flex-col justify-between"
            style={{ height: `${availableHeight}px` }}
          >
            <RosterHeader roster={roster} />
            <RosterDetails roster={roster} />
            <RosterPlayerList roster={roster} />
            <RosterSponsors roster={roster} />
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplay;
