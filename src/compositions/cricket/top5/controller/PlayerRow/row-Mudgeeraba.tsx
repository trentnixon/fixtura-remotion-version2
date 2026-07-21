import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { TeamLogo } from "../../../utils/primitives/TeamLogo";
import { Top5PlayerName } from "../../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../../utils/primitives/Top5PlayerScoreSuffix";
import { PlayerRowProps } from "./_types/PlayerRowProps";
import { calculatePlayerDelay, calculateExitFrame } from "./_utils/calculations";
import { getDefaultRestrictions } from "./_utils/helpers";
import { truncateText } from "../../layout/_utils/helpers";
import { getScoreValues } from "../../layout/_utils/scoreHelpers";
import {
  PLAYER_NAME_DELAY_OFFSET,
  TEAM_NAME_DELAY_OFFSET,
  MAIN_SCORE_DELAY_OFFSET,
  SCORE_SUFFIX_DELAY_OFFSET,
} from "../../layout/_utils/constants";
import {
  LayeredAngularPanel,
  LogoWell,
  PADDING_SHALLOW_ROW_LOGO_FLUSH,
  SHALLOW_EDGE_STRIP_RIGHT,
  SHALLOW_ROW_LEFT,
  getLayeredUnderlayColor,
} from "../../../../../templates/variants/mudgeeraba/design";

const PlayerRowMudgeeraba: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { selectedPalette, colors } = useThemeContext();

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculatePlayerDelay(index);
  const animationOutFrame = calculateExitFrame(data.timings);
  const restrictions = getDefaultRestrictions();

  const rowBg = selectedPalette.container.backgroundTransparent.high;
  const playerName = truncateText(player.name, restrictions.nameLength).toUpperCase();
  const teamName = truncateText(player.playedFor, restrictions.teamLength).toUpperCase();
  const { mainValue, suffix } = getScoreValues(player);

  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;
  const rowPanelClass = `flex items-stretch w-full overflow-hidden ${PADDING_SHALLOW_ROW_LOGO_FLUSH} relative`;
  const rowPanelStyle: React.CSSProperties = { height: `${rowHeight}px` };

  const rowContent = (
    <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: colors.primary,
              clipPath: SHALLOW_EDGE_STRIP_RIGHT,
            }}
            aria-hidden
          />

          {/* Logo - flush left, full height, clip on container so content gets angled shape */}
          <LogoWell variant="steepLeft" size={rowHeight} className="mr-4">
            <TeamLogo
              logo={player.teamLogo}
              teamName={player.playedFor}
              delay={delay}
              size={32}
            />
          </LogoWell>

          {/* Name & team */}
          <div className="flex flex-col justify-center flex-1 min-w-0 ml-4">
            <Top5PlayerName
              value={playerName}
              animation={{ ...largeTextAnimation, delay: delay + PLAYER_NAME_DELAY_OFFSET }}
              className="truncate"
            />
            <Top5PlayerTeam
              value={teamName}
              animation={{ ...smallTextAnimation, delay: delay + TEAM_NAME_DELAY_OFFSET }}
              className="truncate"
            />
          </div>

          {/* Score */}
          <div className="flex items-center justify-center shrink-0 whitespace-nowrap leading-none ml-8 pr-2">
            <Top5PlayerScore
              value={mainValue}
              animation={{ ...largeTextAnimation, delay: delay + MAIN_SCORE_DELAY_OFFSET }}
              className=""
            />
            {suffix && (
              <Top5PlayerScoreSuffix
                value={suffix}
                animation={{ ...smallTextAnimation, delay: delay + SCORE_SUFFIX_DELAY_OFFSET }}
                className=""
              />
            )}
          </div>
    </>
  );

  return (
    <div className="overflow-visible">
      <AnimatedContainer
        type="full"
        className="rounded-none"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <LayeredAngularPanel
          clipPath={SHALLOW_ROW_LEFT}
          surfaceColor={rowBg}
          underlayColor={getLayeredUnderlayColor(colors.primary)}
          className="w-full relative"
          style={rowPanelStyle}
          surfaceClassName={rowPanelClass}
        >
          {rowContent}
        </LayeredAngularPanel>
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowMudgeeraba;
