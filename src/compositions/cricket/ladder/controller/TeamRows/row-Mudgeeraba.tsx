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
import {
  PADDING_SHALLOW_LEFT,
  PADDING_SHALLOW_LEFT_COMPACT,
  SHALLOW_EDGE_STRIP_RIGHT,
  SHALLOW_ROW_LEFT,
  LogoWell,
  LayeredAngularPanel,
  getLayeredUnderlayColor,
} from "../../../../../templates/variants/mudgeeraba/design";
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

  // Secondary polygon (angled edge strip): user's primary from video.appearance.theme,
  // except green tip (#1) and red tip (last place)
  let edgeStripColor = colors.primary; // User's primary color from theme
  if (position <= 1) {
    edgeStripColor = "rgb(34, 197, 94)"; // green-500 – top of ladder
  } else if (position >= totalTeams) {
    edgeStripColor = "rgb(239, 68, 68)"; // red-500 – bottom of ladder
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
    height: `${LadderRowHeight}px`,
    minHeight: `${LadderRowHeight}px`,
  };

  if (isBiasTeam) {
    rowStyle = {
      ...rowStyle,
      borderLeft: `4px solid ${colors.primary}`,
    };
  }

  const surfaceStyle: React.CSSProperties = {
    paddingTop: paddingY,
    paddingBottom: paddingY,
    boxSizing: "border-box",
  };

  const rowContent = (
    <>
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
            clipPath: SHALLOW_EDGE_STRIP_RIGHT,
          }}
          aria-hidden
        />
      </AnimatedContainer>
      {/* Team info - logo + name */}
      <div
        className={`flex items-center min-w-0 flex-1 ${compact ? "mr-2" : "mr-3"}`}
        style={{ width: "70%", minWidth: 0 }}
      >
        <LogoWell
          variant="circle"
          size={compact ? 36 : 56}
          className={compact ? "mr-2" : "mr-3"}
        >
          {(team.clubLogo ?? team.playHQLogo) ? (
            <TeamLogo
              logo={team.clubLogo ?? team.playHQLogo ?? null}
              teamName={team.teamName}
              delay={delay}
              size={compact ? 9 : 14}
            />
          ) : (
            <div className="w-full h-full bg-gray-300/20 rounded-full" />
          )}
        </LogoWell>
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
          style={rowStyle}
          surfaceClassName={`flex items-center relative overflow-hidden ${compact ? PADDING_SHALLOW_LEFT_COMPACT : PADDING_SHALLOW_LEFT}`}
          surfaceStyle={surfaceStyle}
        >
          {rowContent}
        </LayeredAngularPanel>
      </AnimatedContainer>
    </div>
  );
};

export default RowMudgeeraba;
