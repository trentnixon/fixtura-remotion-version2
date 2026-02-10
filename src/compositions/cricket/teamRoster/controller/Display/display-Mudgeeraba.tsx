import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import RosterPlayerList from "../../layout/RosterPlayerList/playerList";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { AccountTeamLarge, AgainstTeamLarge } from "../../layout/RosterHeader";
import { TwoMetaValuesSubtleWrapper } from "../../layout/Metadata/TwoMetaValues";
import { formatDate, truncateText } from "../../../utils/utils-text";
import { VS } from "../../layout/Metadata/VS";
import { RosterDisplayProps } from "./_types/RosterDisplayProps";
import { getAvailableHeight, getBackgroundColor } from "./_utils/helpers";
import {
  ACCOUNT_TEAM_LOGO_SIZE,
  AGAINST_TEAM_LOGO_SIZE,
} from "./_utils/constants";

const RosterDisplayMudgeeraba: React.FC<RosterDisplayProps> = ({ roster }) => {
  const { layout, selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const availableHeight = getAvailableHeight(layout.heights);
  const backgroundColor = getBackgroundColor(selectedPalette);

  // Use Mudgeeraba animations from context
  const containerAnimation = animations.container.main.parent.containerIn;
  const containerExitAnimation = animations.container.main.parent.containerOut;

  return (
    <div className="p-0 flex flex-col w-full h-full">
      <AnimatedContainer
        type="full"
        className={`flex-1 flex flex-col mx-16 ${layout.borderRadius.container} overflow-hidden`}
        backgroundColor="none"
        animation={containerAnimation}
        animationDelay={0}
        exitAnimation={containerExitAnimation}
      >
        <div
          className="w-full flex flex-col justify-center rounded-xl"
          style={{ height: `${availableHeight}px` }}
        >
          <TwoMetaValuesSubtleWrapper
            values={[formatDate(roster.date), truncateText(roster.ground, 50)]}
          />

          <div
            className="flex flex-row gap-2 justify-between items-center "
            style={{ backgroundColor: backgroundColor }}
          >
            <RosterPlayerList roster={roster} gap="gap-4" />
            <div className="flex flex-col gap-4 p-4">
              <AccountTeamLarge roster={roster} logoSize={ACCOUNT_TEAM_LOGO_SIZE} />
              <VS variant="onContainerCopy" />
              <AgainstTeamLarge roster={roster} logoSize={AGAINST_TEAM_LOGO_SIZE} />
            </div>
          </div>
          <TwoMetaValuesSubtleWrapper
            values={[roster.gradeName, roster.round]}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplayMudgeeraba;
