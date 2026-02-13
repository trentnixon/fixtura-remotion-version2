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

/** Mudgeeraba design: row with straight left, angled right edge */
const CLIP_ROW = "polygon(0% 0%, 100% 0%, 95% 100%, 0% 100%)";
/** Thin strip along the angled right edge */
const CLIP_EDGE_STRIP = "polygon(100% 0%, 95% 100%, 94% 100%, 99% 0%)";
const ROSTER_ROW_HEIGHT = 44;

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
            {/* Player list – Mudgeeraba angled rows with edge strip */}
            <div className="flex-grow flex flex-col gap-2 p-4">
              {roster.teamRoster.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center w-full overflow-hidden pl-4 pr-10 relative"
                  style={{
                    height: `${ROSTER_ROW_HEIGHT}px`,
                    backgroundColor: selectedPalette.container.backgroundTransparent.medium,
                    clipPath: CLIP_ROW,
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundColor: colors.primary,
                      clipPath: CLIP_EDGE_STRIP,
                    }}
                    aria-hidden
                  />
                  <RosterPlayerName
                    value={truncatePlayerName(player.toUpperCase(), MAX_PLAYER_NAME_LENGTH)}
                    className="text-left font-bold relative z-0"
                    variant="onContainerCopy"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 p-4 justify-center">
              <AccountTeamLarge roster={roster} logoSize={ACCOUNT_TEAM_LOGO_SIZE} />
              <VS variant="onContainerCopy" />
              <AgainstTeamLarge roster={roster} logoSize={AGAINST_TEAM_LOGO_SIZE} />
            </div>
          </div>

          {/* Metadata stacked at bottom – no truncation */}
          <div className="w-full flex flex-col gap-2 p-4 flex-shrink-0">
            <MetadataLarge
              value={formatDate(roster.date)}
              animation={{ ...textAnimations, delay: 1 }}
              className="text-left"
              variant="onContainerCopy"
            />
            <MetadataLarge
              value={roster.ground}
              animation={{ ...textAnimations, delay: 2 }}
              className="text-left"
              variant="onContainerCopy"
            />
            <MetadataLarge
              value={`${roster.gradeName} – ${roster.round}`}
              animation={{ ...textAnimations, delay: 3 }}
              className="text-left"
              variant="onContainerCopy"
            />
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplayMudgeeraba;
