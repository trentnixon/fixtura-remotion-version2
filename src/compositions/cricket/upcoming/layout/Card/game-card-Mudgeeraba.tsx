import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import Ground from "../Meta/Ground";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import TeamLogo from "../../../utils/primitives/TeamLogo";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { GameCardProps } from "./_types/GameCardProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  FAST_DELAY_MULTIPLIER,
} from "./_utils/calculations";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import { LOGO_SIZES } from "../Logos/variations/_utils/helpers";

/** Left team container: straight left edge, angled right edge */
const CLIP_LEFT_COLUMN = "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)";
/** Right team container: angled left edge, straight right edge (mirrored) */
const CLIP_RIGHT_COLUMN = "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)";
/** Edge strip along home (left) container's angled right edge */
const CLIP_EDGE_STRIP_HOME = "polygon(100% 0%, 90% 100%, 89% 100%, 99% 0%)";
/** Edge strip along away (right) container's angled left edge: outer (10%,0)-(0%,100%), inner (11%,0)-(1%,100%) */
const CLIP_EDGE_STRIP_AWAY = "polygon(10% 0%, 0% 100%, 1% 100%, 11% 0%)";

const EDGE_COLOR_HOME = "rgb(34, 197, 94)"; // green
const EDGE_COLOR_AWAY = "rgb(239, 68, 68)"; // red

export const GameCardMudgeeraba: React.FC<GameCardProps> = ({ game, index }) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();

  const ContainerAnimations = animations.container;
  const delay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
  const animationOutFrame = calculateAnimationOutFrame(timings);
  const teamBg = selectedPalette.container.backgroundTransparent.high;

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className="rounded-none w-full overflow-hidden"
        backgroundColor="none"
        animation={ContainerAnimations.main.itemContainer.containerIn}
        animationDelay={delay}
        exitAnimation={ContainerAnimations.main.itemContainer.containerOut}
        exitFrame={animationOutFrame}
      >
        {/* Grade Section - Top */}
        <Ground
          ground={game.gradeName}
          delay={delay}
          backgroundColor="transparent"
        />

        {/* Location and time under the grade (tight to grade) */}
        <div className="flex items-center justify-center gap-3 py-0.5 text-center w-full">
          <MetadataMedium
            value={game.ground}
            animation={{ ...animations.text.main.copyIn, delay: delay + 20 }}
            className="text-center"
            variant="onContainerCopyNoBg"
          />
          <MetadataMedium
            value={game.date}
            animation={{ ...animations.text.main.copyIn, delay: delay + 20 }}
            className="text-center"
            variant="onContainerCopyNoBg"
          />
          <MetadataMedium
            value={game.time}
            animation={{ ...animations.text.main.copyIn, delay: delay + 20 }}
            className="text-center"
            variant="onContainerCopyNoBg"
          />
        </div>

        {/* Two team columns: logo above, angled container with team name below */}
        <div className="flex w-full relative">
          {/* Home: logo above, then angled polygon with team name only */}
          <div className="flex flex-1 flex-col items-center min-w-0">
            <div className="w-28 h-28 overflow-hidden rounded-full shrink-0 mb-2">
              <TeamLogo
                logo={game.teamHomeLogo}
                teamName={game.teamHome}
                delay={delay + 10}
                size={28}
              />
            </div>
            <div
              className="flex flex-1 w-full min-w-0 items-center justify-center py-2 overflow-hidden pl-4 pr-10 relative"
              style={{
                backgroundColor: teamBg,
                clipPath: CLIP_LEFT_COLUMN,
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: EDGE_COLOR_HOME,
                  clipPath: CLIP_EDGE_STRIP_HOME,
                }}
                aria-hidden
              />
              <MetadataMedium
                value={game.teamHome}
                animation={{ ...animations.text.main.copyIn, delay: delay + 15 }}
                className="block text-center truncate w-full max-w-full relative z-10"
                variant="onContainerCopy"
              />
            </div>
          </div>

          {/* Away: logo above, then angled polygon with team name only */}
          <div className="flex flex-1 flex-col items-center min-w-0">
            <div className="w-28 h-28 overflow-hidden rounded-full shrink-0 mb-2">
              <TeamLogo
                logo={game.teamAwayLogo}
                teamName={game.teamAway}
                delay={delay + 25}
                size={28}
              />
            </div>
            <div
              className="flex flex-1 w-full min-w-0 items-center justify-center py-2 overflow-hidden pl-12 pr-3 relative"
              style={{
                backgroundColor: teamBg,
                clipPath: CLIP_RIGHT_COLUMN,
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: EDGE_COLOR_AWAY,
                  clipPath: CLIP_EDGE_STRIP_AWAY,
                }}
                aria-hidden
              />
              <MetadataMedium
                value={game.teamAway}
                animation={{ ...animations.text.main.copyIn, delay: delay + 30 }}
                className="block text-center truncate w-full max-w-full relative z-10"
                variant="onContainerCopy"
              />
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardMudgeeraba;
