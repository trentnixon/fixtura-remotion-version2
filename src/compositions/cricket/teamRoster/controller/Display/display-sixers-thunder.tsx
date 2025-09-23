import React from "react";
import { RosterDataItem } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import RosterPlayerList from "../../layout/RosterPlayerList/playerList";
//import RosterSponsors from "../../layout/RosterSponsors/sponsors";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { AccountTeamLarge, AgainstTeamLarge } from "../../layout/RosterHeader";
import { TwoMetaValuesNoWrapper } from "../../layout/Metadata/TwoMetaValues";
import { formatDate, truncateText } from "../../../utils/utils-text";
import { VS } from "../../layout/Metadata/VS";

interface RosterDisplayProps {
  roster: RosterDataItem;
}

const RosterDisplaySixersThunder: React.FC<RosterDisplayProps> = ({
  roster,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const availableHeight = heights.asset;
  const { selectedPalette } = useThemeContext();
  const backgroundColor = selectedPalette.container.backgroundTransparent.high;
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
          className="w-full flex flex-col justify-center"
          style={{ height: `${availableHeight}px` }}
        >
          <TwoMetaValuesNoWrapper
            values={[formatDate(roster.date), truncateText(roster.ground, 50)]}
          />

          <div
            className={`flex flex-row gap-2 justify-between items-center rounded-lg ${layout.borderRadius.container}  force-p-4`}
            style={{ backgroundColor: backgroundColor }}
          >
            <RosterPlayerList
              roster={roster}
              className="text-left"
              gap="gap-4"
            />
            <div className="flex flex-col gap-4 p-4">
              <AccountTeamLarge roster={roster} logoSize={"300"} />
              <VS variant="onContainerCopy" />
              <AgainstTeamLarge roster={roster} logoSize={"120"} />
            </div>
          </div>
          <TwoMetaValuesNoWrapper values={[roster.gradeName, roster.round]} />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplaySixersThunder;
