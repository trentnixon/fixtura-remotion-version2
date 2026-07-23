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
  CLASSIC_TWO_COLUMN_MIN_HEIGHT,
  ACCOUNT_TEAM_LOGO_SIZE,
  AGAINST_TEAM_LOGO_SIZE,
} from "./_utils/constants";
import { ClassicTexturedSurface } from "../../../../../templates/variants/classic/design";

const RosterDisplayClassicTwoColumn: React.FC<RosterDisplayProps> = ({
  roster,
}) => {
  const { layout } = useThemeContext();

  const { selectedPalette } = useThemeContext();
  const backgroundColor = selectedPalette.container.backgroundTransparent.high;
  return (
    <div className="flex h-full w-full flex-col p-0">
      <AnimatedContainer
        type="full"
        className="mx-16 flex flex-1 flex-col overflow-hidden rounded-lg"
        backgroundColor="none"
        animation={DEFAULT_CONTAINER_ANIMATION}
        animationDelay={0}
        exitAnimation={DEFAULT_CONTAINER_EXIT_ANIMATION}
        style={{
          minHeight: `${CLASSIC_TWO_COLUMN_MIN_HEIGHT}px`,
        }}
      >
        <div
          className="flex w-full flex-col justify-center"
          style={{ minHeight: `${CLASSIC_TWO_COLUMN_MIN_HEIGHT}px` }}
        >
          <TwoMetaValuesNoWrapper
            values={[formatDate(roster.date), truncateText(roster.ground, 50)]}
          />

          <ClassicTexturedSurface
            className={`force-p-4 rounded-lg ${layout.borderRadius.container}`}
            backgroundColor={backgroundColor}
          >
            <div className="flex flex-row items-center justify-between gap-2">
              <RosterPlayerList
                roster={roster}
                className="whitespace-nowrap text-left"
                gap="gap-4"
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
          </ClassicTexturedSurface>
          <TwoMetaValuesNoWrapper values={[roster.gradeName, roster.round]} />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplayClassicTwoColumn;
