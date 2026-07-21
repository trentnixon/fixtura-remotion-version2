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
import {
  LayeredAngularPanel,
  LogoWell,
  PADDING_SHALLOW_LEFT,
  PADDING_SHALLOW_RIGHT,
  SHALLOW_COLUMN_LEFT,
  SHALLOW_COLUMN_RIGHT,
  SHALLOW_EDGE_STRIP_LEFT,
  SHALLOW_EDGE_STRIP_RIGHT,
  getLayeredUnderlayColor,
} from "../../../../../templates/variants/mudgeeraba/design";

const EDGE_COLOR_HOME = "rgb(34, 197, 94)"; // green
const EDGE_COLOR_AWAY = "rgb(239, 68, 68)"; // red

export const GameCardMudgeeraba: React.FC<GameCardProps> = ({
  game,
  index,
}) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { selectedPalette, colors } = useThemeContext();

  const ContainerAnimations = animations.container;
  const delay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
  const animationOutFrame = calculateAnimationOutFrame(timings);
  const teamBg = selectedPalette.container.backgroundTransparent.high;
  const underlayColor = getLayeredUnderlayColor(colors.primary);

  return (
    <div className="overflow-visible">
      <AnimatedContainer
        type="full"
        className="rounded-none w-full overflow-visible"
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
        <div className="flex w-full relative overflow-visible">
          {/* Home: logo above, then angled polygon with team name only */}
          <div className="flex flex-1 flex-col items-center min-w-0">
            <LogoWell variant="circle" size={112} className="shrink-0 mb-2">
              <TeamLogo
                logo={game.teamHomeLogo}
                teamName={game.teamHome}
                delay={delay + 10}
                size={28}
              />
            </LogoWell>
            <LayeredAngularPanel
              clipPath={SHALLOW_COLUMN_LEFT}
              surfaceColor={teamBg}
              underlayColor={underlayColor}
              className="flex flex-1 w-full min-w-0 relative"
              surfaceClassName={`flex flex-1 w-full min-w-0 items-center justify-center py-2 overflow-hidden relative ${PADDING_SHALLOW_LEFT}`}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: EDGE_COLOR_HOME,
                  clipPath: SHALLOW_EDGE_STRIP_RIGHT,
                }}
                aria-hidden
              />
              <MetadataMedium
                value={game.teamHome}
                animation={{
                  ...animations.text.main.copyIn,
                  delay: delay + 15,
                }}
                className="block text-center truncate w-full max-w-full relative z-10"
                variant="onContainerCopy"
              />
            </LayeredAngularPanel>
          </div>

          {/* Away: logo above, then angled polygon with team name only */}
          <div className="flex flex-1 flex-col items-center min-w-0">
            <LogoWell variant="circle" size={112} className="shrink-0 mb-2">
              <TeamLogo
                logo={game.teamAwayLogo}
                teamName={game.teamAway}
                delay={delay + 25}
                size={28}
              />
            </LogoWell>
            <LayeredAngularPanel
              clipPath={SHALLOW_COLUMN_RIGHT}
              surfaceColor={teamBg}
              underlayColor={underlayColor}
              className="flex flex-1 w-full min-w-0 relative"
              surfaceClassName={`flex flex-1 w-full min-w-0 items-center justify-center py-2 overflow-hidden relative ${PADDING_SHALLOW_RIGHT}`}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: EDGE_COLOR_AWAY,
                  clipPath: SHALLOW_EDGE_STRIP_LEFT,
                }}
                aria-hidden
              />
              <MetadataMedium
                value={game.teamAway}
                animation={{
                  ...animations.text.main.copyIn,
                  delay: delay + 30,
                }}
                className="block text-center truncate w-full max-w-full relative z-10"
                variant="onContainerCopy"
              />
            </LayeredAngularPanel>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardMudgeeraba;
