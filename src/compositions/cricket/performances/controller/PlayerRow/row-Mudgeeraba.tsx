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
import { PerformanceRowProps } from "./_types/PerformanceRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
} from "./_utils/calculations";
import { truncateText, getScoreValues, formatPlayerName } from "../../layout/_utils/helpers";
import {
  LayeredAngularPanel,
  LogoWell,
  PADDING_SHALLOW_ROW_LOGO_FLUSH_COMPACT,
  SHALLOW_EDGE_STRIP_RIGHT,
  SHALLOW_ROW_LEFT,
  getLayeredUnderlayColor,
} from "../../../../../templates/variants/mudgeeraba/design";

// const NAME_LENGTH = 30;
const TEAM_LENGTH = 35;

const PerformanceRowMudgeeraba: React.FC<PerformanceRowProps> = ({
  performance,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { selectedPalette, colors } = useThemeContext();

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateAnimationDelay(index, 5);
  const animationOutFrame = calculateAnimationOutFrame(data.timings);

  const rowBg = selectedPalette.container.backgroundTransparent.high;
  const playerName = formatPlayerName(performance.name);
  const teamName = truncateText(performance.playedFor, TEAM_LENGTH).toUpperCase();
  const { mainValue, suffix } = getScoreValues(performance);

  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;
  const rowPanelClass = `flex items-stretch w-full overflow-hidden ${PADDING_SHALLOW_ROW_LOGO_FLUSH_COMPACT} relative`;
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
          <LogoWell variant="steepLeft" size={rowHeight} className="mr-2">
            <TeamLogo
              logo={performance.teamLogo}
              teamName={performance.playedFor}
              delay={delay}
              size={32}
            />
          </LogoWell>
          <div className="flex flex-col justify-center flex-1 min-w-0 ml-2">
            <Top5PlayerName
              value={playerName}
              animation={{ ...largeTextAnimation, delay: delay + 2 }}
              className="truncate"
            />
            <Top5PlayerTeam
              value={teamName}
              animation={{ ...smallTextAnimation, delay: delay + 4 }}
              className="truncate"
            />
          </div>
          <div className="flex items-center justify-center shrink-0 whitespace-nowrap leading-none mr-8 ">
            <Top5PlayerScore
              value={mainValue}
              animation={{ ...largeTextAnimation, delay: delay + 6 }}
              className=""
            />
            {suffix && (
              <Top5PlayerScoreSuffix
                value={suffix}
                animation={{ ...smallTextAnimation, delay: delay + 7 }}
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

export default PerformanceRowMudgeeraba;
