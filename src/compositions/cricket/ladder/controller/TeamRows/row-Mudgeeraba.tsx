import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import TeamLogo from "../../../utils/primitives/TeamLogo";
import LadderTeamName from "../../../utils/primitives/ladderTeamName";
import LadderTeamPoints from "../../../utils/primitives/ladderTeamPoints";
import { TeamRowProps } from "./_types/TeamRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  parseTeamPosition,
} from "./_utils/calculations";

/** Mudgeeraba design: uniform row - left edge straight, right edge angled */
const CLIP_ROW = "polygon(0% 0%, 100% 0%, 95% 100%, 0% 100%)";
/** Second polygon: thin strip along the angled right edge (outer edge 100%,0 → 95%,100%; inner edge 99%,0 → 94%,100%) */
const CLIP_EDGE_STRIP =
  "polygon(100% 0%, 95% 100%, 94% 100%, 99% 0%)";
/** Frames to wait after row animates in before edge strip animates in */
const EDGE_STRIP_DELAY_OFFSET = 12;

export const RowMudgeeraba: React.FC<TeamRowProps> = ({
  team,
  index,
  totalTeams,
  isBiasTeam,
  LadderRowHeight,
  compact = false,
}) => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const { selectedPalette, colors } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { timings } = data;

  const delay = calculateAnimationDelay(index, 5);
  const animationOutFrame = calculateAnimationOutFrame(timings);
  const position = parseTeamPosition(team.position);
  const rowBg = selectedPalette.container.backgroundTransparent.high;

  // Position color for the edge-strip polygon only (not the row bg)
  let edgeStripColor = colors.primary;
  if (position <= 1) {
    edgeStripColor = "rgb(34, 197, 94)"; // green-500 – top of ladder
  } else if (position >= totalTeams) {
    edgeStripColor = "rgb(239, 68, 68)"; // red-500 – bottom of ladder
  } else if (isBiasTeam) {
    edgeStripColor = colors.primary;
  }

  // Dynamic vertical padding: scale with row height (clamp so it never overflows)
  const paddingY = Math.max(2, Math.min(8, Math.round(LadderRowHeight * 0.15)));

  // Font size by team count: < 12 = normal, >= 12 = smaller
  const useSmallerFont = totalTeams >= 12;
  const teamNameFontSizePx = useSmallerFont ? 24 : 30;
  const statsFontSizePx = useSmallerFont ? 24 : 30;
  const teamNameStyle = { fontSize: `${teamNameFontSizePx}px` };
  const statsStyle = { fontSize: `${statsFontSizePx}px` };

  let rowStyle: React.CSSProperties = {
    backgroundColor: rowBg,
    clipPath: CLIP_ROW,
    height: `${LadderRowHeight}px`,
    minHeight: `${LadderRowHeight}px`,
    paddingTop: paddingY,
    paddingBottom: paddingY,
    boxSizing: "border-box",
  };

  if (isBiasTeam) {
    rowStyle = {
      ...rowStyle,
      borderLeft: `4px solid ${colors.primary}`,
    };
  }

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
          className={`flex items-center relative overflow-hidden ${compact ? "pl-2 pr-6" : "pl-4 pr-10"}`}
          style={rowStyle}
        >
          {/* Colored edge strip: second polygon, animates in after row */}
          <AnimatedContainer
            type="full"
            className="absolute inset-0 pointer-events-none"
            backgroundColor="none"
            animation={containerAnimation.containerIn}
            animationDelay={delay + EDGE_STRIP_DELAY_OFFSET}
            exitAnimation={containerAnimation.containerOut}
            exitFrame={animationOutFrame}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: edgeStripColor,
                clipPath: CLIP_EDGE_STRIP,
              }}
              aria-hidden
            />
          </AnimatedContainer>
          {/* Team info - logo + name */}
          <div
            className={`flex items-center min-w-0 flex-1 ${compact ? "mr-2" : "mr-3"}`}
            style={{ width: "70%", minWidth: 0 }}
          >
            <div className={`flex-shrink-0 overflow-hidden rounded-full ${compact ? "w-9 h-9 mr-2" : "w-14 h-14 mr-3"}`}>
              {team.clubLogo ?? team.playHQLogo ? (
                <TeamLogo
                  logo={team.clubLogo ?? team.playHQLogo ?? null}
                  teamName={team.teamName}
                  delay={delay}
                />
              ) : (
                <div className="w-full h-full bg-gray-300/20 rounded-full" />
              )}
            </div>
            <div className="flex-1 truncate min-w-0">
              <LadderTeamName
                value={team.teamName}
                delay={delay}
                style={teamNameStyle}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-1 justify-evenly shrink-0" style={statsStyle}>
            <div className="w-10 text-center whitespace-nowrap">
              <LadderTeamPoints value={team?.P ?? 0} delay={delay} />
            </div>
            <div className="w-10 text-center whitespace-nowrap">
              <LadderTeamPoints value={team?.W ?? 0} delay={delay} />
            </div>
            <div className="w-10 text-center whitespace-nowrap">
              <LadderTeamPoints value={team?.L ?? 0} delay={delay} />
            </div>
            <div className="w-10 text-center whitespace-nowrap">
              <LadderTeamPoints value={team?.BYE ?? 0} delay={delay} />
            </div>
            <div className="w-16 text-center whitespace-nowrap">
              <LadderTeamPoints value={team?.PTS ?? 0} delay={delay} />
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RowMudgeeraba;
