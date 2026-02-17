import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import RosterPlayerListBrickWork from "../../layout/RosterPlayerList/playerList-brickWork";
import { AccountTeamLarge, AgainstTeamLarge } from "../../layout/RosterHeader";
import { MetadataLarge } from "../../../utils/primitives/metadataLarge";
import { formatDate, truncateText } from "../../../utils/utils-text";
import { VS } from "../../layout/Metadata/VS";
import { RosterDisplayProps } from "./_types/RosterDisplayProps";
import {
  DEFAULT_CONTAINER_ANIMATION,
  DEFAULT_CONTAINER_EXIT_ANIMATION,
} from "./_utils/animations";
import { getAvailableHeight } from "./_utils/helpers";
/** Brickwork: smaller logos and tighter spacing in middle section */
const BRICKWORK_ACCOUNT_LOGO = "200";
const BRICKWORK_AGAINST_LOGO = "80";

const RosterDisplayBrickWork: React.FC<RosterDisplayProps> = ({ roster }) => {
  const { layout, selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const availableHeight = getAvailableHeight(layout.heights);
  const textAnimations = animations.text.main.copyIn;
  const bg = selectedPalette.container.backgroundTransparent.medium;

  return (
    <div className="p-0 flex flex-col w-full h-full">
      <AnimatedContainer
        type="full"
        className={`flex-1 flex flex-col mx-8 overflow-hidden ${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={DEFAULT_CONTAINER_ANIMATION}
        animationDelay={0}
        exitAnimation={DEFAULT_CONTAINER_EXIT_ANIMATION}
      >
        <div
          className="flex flex-col justify-center min-h-0 gap-1"
          style={{ height: `${availableHeight}px` }}
        >
          {/* Main: player list (60%) + team logos (40%) */}
          <div
            className={`flex flex-row gap-4 items-center flex-shrink-0 ${layout.borderRadius.container}`}
            style={{ backgroundColor: bg }}
          >
            <div className="min-w-0" style={{ flex: "6 0 0" }}>
              <RosterPlayerListBrickWork roster={roster} />
            </div>
            <div className="flex flex-col gap-2 justify-center min-w-0" style={{ flex: "4 0 0" }}>
              <AccountTeamLarge
                roster={roster}
                logoSize={BRICKWORK_ACCOUNT_LOGO}
                variant="onContainerCopyNoBg"
                compact
              />
              <VS variant="onContainerCopyNoBg" />
              <AgainstTeamLarge
                roster={roster}
                logoSize={BRICKWORK_AGAINST_LOGO}
                variant="onContainerCopyNoBg"
                compact
              />
            </div>
          </div>

          {/* Metadata – stacked at bottom */}
          <div
            className="w-full flex flex-col items-start gap-0 p-3"
            style={{ backgroundColor: bg }}
          >
            <MetadataLarge
              value={roster.round + " - " + roster.gradeName}
              animation={{ ...textAnimations, delay: 0 }}
              className="text-center text-[26px]"
              variant="onContainerCopyNoBg"
            />
            <MetadataLarge
              value={formatDate(roster.date)}
              animation={{ ...textAnimations, delay: 0 }}
              className="text-center text-[26px]"
              variant="onContainerCopyNoBg"
            />
            <MetadataLarge
              value={truncateText(roster.ground, 150)}
              animation={{ ...textAnimations, delay: 1 }}
              className="text-center text-[26px]"
              variant="onContainerCopyNoBg"
            />

          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplayBrickWork;
