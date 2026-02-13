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

/** Mudgeeraba design: uniform row - left edge straight, right edge angled */
const CLIP_ROW = "polygon(0% 0%, 100% 0%, 95% 100%, 0% 100%)";
/** Thin strip along the angled right edge */
const CLIP_EDGE_STRIP =
  "polygon(100% 0%, 95% 100%, 94% 100%, 99% 0%)";

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
          className="flex items-stretch w-full overflow-hidden pl-0 pr-10 relative"
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

          {/* Logo - flush left, full height, clip on container so content gets angled shape */}
          <div
            className="flex shrink-0 mr-4 overflow-hidden items-center justify-center"
            style={{
              width: `${rowHeight}px`,
              height: `${rowHeight}px`,
              background: selectedPalette.container.backgroundTransparent.strong,
              clipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%)",
              WebkitClipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%)",
            }}
          >
            <TeamLogo
              logo={player.teamLogo}
              teamName={player.playedFor}
              delay={delay}
              size={32}
            />
          </div>

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
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowMudgeeraba;
