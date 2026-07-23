import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import RosterPlayerList from "../../layout/RosterPlayerList/playerList";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { AccountTeamLarge, AgainstTeamLarge } from "../../layout/RosterHeader";
import { TwoMetaValuesNoWrapper } from "../../layout/Metadata/TwoMetaValues";
import { formatDate, truncateText } from "../../../utils/utils-text";
import { VS } from "../../layout/Metadata/VS";
import { RosterDisplayProps } from "./_types/RosterDisplayProps";
import {
  DEFAULT_CONTAINER_ANIMATION,
  DEFAULT_CONTAINER_EXIT_ANIMATION,
} from "./_utils/animations";
import {
  ACCOUNT_TEAM_LOGO_SIZE,
  AGAINST_TEAM_LOGO_SIZE,
} from "./_utils/constants";
import { ClassicForegroundShell } from "../../../../../templates/variants/classic/design";

const RosterDisplayClassic: React.FC<RosterDisplayProps> = ({ roster }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const availableHeight = heights.asset;
  return (
    <div className="p-0 flex flex-col w-full h-full overflow-visible">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-16 overflow-visible"
        backgroundColor="none"
        animation={DEFAULT_CONTAINER_ANIMATION}
        animationDelay={0}
        exitAnimation={DEFAULT_CONTAINER_EXIT_ANIMATION}
      >
        <div
          className="w-full flex flex-col justify-center overflow-visible"
          style={{ height: `${availableHeight}px` }}
        >
          <TwoMetaValuesNoWrapper
            values={[formatDate(roster.date), truncateText(roster.ground, 50)]}
          />

          <ClassicForegroundShell height="auto" delay={0} depth="full">
            <div
              className={`flex flex-row gap-2 justify-between items-center ${layout.borderRadius.container} force-p-4 h-full`}
            >
              <RosterPlayerList
                roster={roster}
                className="text-left"
                gap="gap-0"
              />
              <div className="flex flex-col gap-4 p-4">
                <AccountTeamLarge
                  roster={roster}
                  logoSize={ACCOUNT_TEAM_LOGO_SIZE}
                />
                <VS variant="onContainerCopy" />
                <AgainstTeamLarge
                  roster={roster}
                  logoSize={AGAINST_TEAM_LOGO_SIZE}
                />
              </div>
            </div>
          </ClassicForegroundShell>

          <TwoMetaValuesNoWrapper values={[roster.gradeName, roster.round]} />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplayClassic;
