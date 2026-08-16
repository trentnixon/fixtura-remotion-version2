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
  PADDING_SHALLOW_ROW_LOGO_FLUSH,
  PADDING_SHALLOW_ROW_LOGO_FLUSH_COMPACT,
  SHALLOW_EDGE_STRIP_RIGHT,
  SHALLOW_ROW_LEFT,
  LogoWell,
  LayeredAngularPanel,
  LAYERED_PANEL_OFFSET_Y,
  getLayeredUnderlayColor,
  showAngularEdgeAccents,
  clipPathStyle,
} from "../../../../../templates/variants/mudgeeraba/design";
/** Frames to wait after row animates in before edge strip animates in */
const EDGE_STRIP_DELAY_OFFSET = 12;
const INNER_ROW_BORDER_PX = 5;

export const RowMudgeeraba: React.FC<TeamRowProps> = ({
  team,
  index,
  totalTeams,
  isBiasTeam,
  LadderRowHeight,
  compact = false,
  isLast = false,
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

  // Font size by team count: < 12 = normal, >= 12 = smaller
  const useSmallerFont = totalTeams >= 12;
  const teamNameFontSizePx = useSmallerFont ? 24 : 30;
  const statsFontSizePx = useSmallerFont ? 24 : 30;
  const teamNameStyle = { fontSize: `${teamNameFontSizePx}px` };
  const statsStyle = { fontSize: `${statsFontSizePx}px` };

  const rowPanelClass = `flex items-stretch w-full overflow-hidden relative ${
    compact
      ? PADDING_SHALLOW_ROW_LOGO_FLUSH_COMPACT
      : PADDING_SHALLOW_ROW_LOGO_FLUSH
  }`;

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
    boxSizing: "border-box",
    boxShadow: `inset 0 -${INNER_ROW_BORDER_PX}px 0 0 ${colors.primary}`,
  };

  const rowContent = (
    <>
      {showAngularEdgeAccents() && (
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
              ...clipPathStyle(SHALLOW_EDGE_STRIP_RIGHT),
            }}
            aria-hidden
          />
        </AnimatedContainer>
      )}
      {/* Logo — flush left steep well (matches Top 5 / Performances) */}
      <LogoWell
        variant="steepLeft"
        size={LadderRowHeight}
        fullBleed
        className={compact ? "mr-2" : "mr-4"}
      >
        {(team.clubLogo ?? team.playHQLogo) ? (
          <TeamLogo
            logo={team.clubLogo ?? team.playHQLogo ?? null}
            teamName={team.teamName}
            delay={delay}
            size={LadderRowHeight}
            fit="cover"
            imgStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-300/20" />
        )}
      </LogoWell>

      <div className="flex flex-1 items-center min-w-0 truncate">
        <LadderTeamName
          value={team.teamName}
          delay={delay}
          style={teamNameStyle}
        />
      </div>

      {/* Stats */}
      <div className="flex flex-1 justify-evenly shrink-0 items-center" style={statsStyle}>
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
          offsetY={isLast ? 0 : LAYERED_PANEL_OFFSET_Y}
          surfaceClassName={rowPanelClass}
          surfaceStyle={surfaceStyle}
        >
          {rowContent}
        </LayeredAngularPanel>
      </AnimatedContainer>
    </div>
  );
};

export default RowMudgeeraba;
