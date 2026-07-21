import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { AccountTeamLarge, AgainstTeamLarge } from "../../layout/RosterHeader";
import { formatDate, truncatePlayerName } from "../../../utils/utils-text";
import { VS } from "../../layout/Metadata/VS";
import { RosterPlayerName } from "../../../utils/primitives/RosterPlayerName";
import { MetadataLarge } from "../../../utils/primitives/metadataLarge";
import { RosterDisplayProps } from "./_types/RosterDisplayProps";
import { getAvailableHeight } from "./_utils/helpers";
import {
  ACCOUNT_TEAM_LOGO_SIZE,
  AGAINST_TEAM_LOGO_SIZE,
} from "./_utils/constants";
import { MAX_PLAYER_NAME_LENGTH } from "../../layout/RosterPlayerList/_utils/constants";
import {
  PADDING_SHALLOW_LEFT,
  SHALLOW_EDGE_STRIP_RIGHT,
  SHALLOW_ROW_LEFT,
  LayeredAngularPanel,
  getLayeredUnderlayColor,
} from "../../../../../templates/variants/mudgeeraba/design";
const ROSTER_ROW_HEIGHT = 58;

const RosterDisplayMudgeeraba: React.FC<RosterDisplayProps> = ({ roster }) => {
  const { layout, selectedPalette, colors } = useThemeContext();
  const { animations } = useAnimationContext();
  const availableHeight = getAvailableHeight(layout.heights);
  const textAnimations = animations.text.main.copyIn;

  const containerAnimation = animations.container.main.parent.containerIn;
  const containerExitAnimation = animations.container.main.parent.containerOut;

  return (
    <div className="p-0 flex flex-col w-full h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-6 overflow-hidden rounded-none"
        backgroundColor="none"
        animation={containerAnimation}
        animationDelay={0}
        exitAnimation={containerExitAnimation}
      >
        <div
          className="flex-1 flex flex-col justify-center min-h-0"
          style={{ height: `${availableHeight}px` }}
        >
          <div className="flex flex-row gap-4 justify-between items-stretch my-4 mx-4">
            {/* Player list – Mudgeeraba angled rows; take most of the width */}
            <div className="flex-1 min-w-0 flex flex-col gap-2 p-4 overflow-visible">
              {roster.teamRoster.map((player, index) => (
                <LayeredAngularPanel
                  key={index}
                  clipPath={SHALLOW_ROW_LEFT}
                  surfaceColor={selectedPalette.container.backgroundTransparent.medium}
                  underlayColor={getLayeredUnderlayColor(colors.primary)}
                  className="w-full relative"
                  style={{ height: `${ROSTER_ROW_HEIGHT}px` }}
                  surfaceClassName={`flex items-center w-full overflow-hidden ${PADDING_SHALLOW_LEFT} relative`}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundColor: colors.primary,
                      clipPath: SHALLOW_EDGE_STRIP_RIGHT,
                    }}
                    aria-hidden
                  />
                  <RosterPlayerName
                    value={truncatePlayerName(player.toUpperCase(), MAX_PLAYER_NAME_LENGTH)}
                    className="text-left font-bold relative z-0"
                    variant="onContainerCopy"
                  />
                </LayeredAngularPanel>
              ))}
            </div>

            <div className="flex flex-col gap-4 p-4 justify-center flex-shrink-0 max-w-[380px]">
              <AccountTeamLarge
                roster={roster}
                logoSize={ACCOUNT_TEAM_LOGO_SIZE}
                variant="onContainerCopyNoBg"
              />
              <VS variant="onContainerCopyNoBg" />
              <AgainstTeamLarge
                roster={roster}
                logoSize={AGAINST_TEAM_LOGO_SIZE}
                variant="onContainerCopyNoBg"
              />
            </div>
          </div>

          {/* Metadata stacked at bottom – no truncation, no bg variant */}
          <div className="w-full flex flex-col gap-0 p-4 flex-shrink-0">
            <MetadataLarge
              value={formatDate(roster.date)}
              animation={{ ...textAnimations, delay: 1 }}
              className="text-center text-3xl"
              variant="onContainerCopyNoBg"
            />
            <MetadataLarge
              value={roster.ground}
              animation={{ ...textAnimations, delay: 2 }}
              className="text-center text-3xl"
              variant="onContainerCopyNoBg"
            />
            <MetadataLarge
              value={`${roster.gradeName} – ${roster.round}`}
              animation={{ ...textAnimations, delay: 3 }}
              className="text-center text-3xl"
              variant="onContainerCopyNoBg"
            />
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplayMudgeeraba;
