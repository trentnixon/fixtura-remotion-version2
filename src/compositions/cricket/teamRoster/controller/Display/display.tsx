import React from "react";
import { RosterDataItem } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import RosterPlayerList from "../../layout/RosterPlayerList/playerList";
//import RosterSponsors from "../../layout/RosterSponsors/sponsors";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import AccountLogoInSubtleWrapper from "../../layout/RosterHeader/AccountTeam";
import { TwoMetaValuesSubtleWrapper } from "../../layout/Metadata/TwoMetaValues";
import { truncateText } from "../../../utils/utils-text";

interface RosterDisplayProps {
  roster: RosterDataItem;
}

const RosterDisplay: React.FC<RosterDisplayProps> = ({ roster }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const availableHeight = heights.asset;
  const { selectedPalette } = useThemeContext();
  const backgroundColor = selectedPalette.container.backgroundTransparent.high;
  const TeamLogoBackground =
    selectedPalette.container.backgroundTransparent.medium;
  return (
    <div className="p-0 flex flex-col w-full h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-16 rounded-lg overflow-hidden"
        backgroundColor="none"
        animation={{
          type: "none",
          easing: { type: "inOut", base: "ease" },
          duration: 25,
          custom: {
            distance: 200,
          },
        }}
        animationDelay={0}
        exitAnimation={{
          type: "none",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 100,
          },
        }}
      >
        <div
          className="w-full flex flex-col justify-center rounded-xl"
          style={{ height: `${availableHeight}px` }}
        >
          <TwoMetaValuesSubtleWrapper
            values={[roster.date, truncateText(roster.ground, 50)]}
          />
          <AccountLogoInSubtleWrapper
            roster={roster}
            variant="onContainerCopy"
            logoSize="150"
            backgroundColor={TeamLogoBackground}
          />
          <div
            className="flex flex-row gap-2 justify-between items-center "
            style={{ backgroundColor: backgroundColor }}
          >
            <RosterPlayerList roster={roster} />
          </div>
          <TwoMetaValuesSubtleWrapper
            values={[roster.gradeName, roster.round]}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplay;
