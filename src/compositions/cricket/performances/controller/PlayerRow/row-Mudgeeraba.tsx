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

/** Mudgeeraba design: uniform row - left edge straight, right edge angled */
const CLIP_ROW = "polygon(0% 0%, 100% 0%, 95% 100%, 0% 100%)";
/** Thin strip along the angled right edge */
const CLIP_EDGE_STRIP =
  "polygon(100% 0%, 95% 100%, 94% 100%, 99% 0%)";

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

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className="rounded-none"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <div
          className="flex items-stretch w-full overflow-hidden pl-0 pr-6 relative"
          style={{
            height: `${rowHeight}px`,
            backgroundColor: rowBg,
            clipPath: CLIP_ROW,
          }}
        >
          {/* Colored edge strip along angled border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: colors.primary,
              clipPath: CLIP_EDGE_STRIP,
            }}
            aria-hidden
          />

          {/* Logo - flush left, full height, angled right to match row */}
          <div
            className="flex shrink-0 mr-2 overflow-hidden items-center justify-center"
            style={{
              width: `${rowHeight}px`,
              height: `${rowHeight}px`,
              background: selectedPalette.container.backgroundTransparent.strong,
              clipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%)",
              WebkitClipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%)",
              filter: "drop-shadow(3px 2px 6px rgba(0, 0, 0, 0.25))",
              WebkitFilter: "drop-shadow(3px 2px 6px rgba(0, 0, 0, 0.25))",
            }}
          >
            <TeamLogo
              logo={performance.teamLogo}
              teamName={performance.playedFor}
              delay={delay}
              size={32}
            />
          </div>

          {/* Name & team */}
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

          {/* Score */}
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
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PerformanceRowMudgeeraba;
