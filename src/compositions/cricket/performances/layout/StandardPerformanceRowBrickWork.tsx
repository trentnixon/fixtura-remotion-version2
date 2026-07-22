import React from "react";
import { TeamLogo as PerformanceTeamLogoType } from "../_types/types";
import {
  getBrickworkColourRoles,
  getFeaturedRowSurfaces,
  isFeaturedRow,
  LogoPlate,
  useBrickworkTypography,
} from "../../../../templates/variants/brickwork/design";

import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { PerformanceRowLayoutPropsWithRestrictions } from "./_types/PerformanceRowLayoutProps";
import { truncateText, getScoreValues } from "./_utils/helpers";
import {
  PLAYER_NAME_DELAY_OFFSET,
  TEAM_NAME_DELAY_OFFSET,
  LOGO_DELAY_OFFSET,
  STAT_DELAY_OFFSET,
  STAT_SUFFIX_DELAY_OFFSET,
} from "./_utils/constants";

export const StandardPerformanceRowBrickWork: React.FC<
  PerformanceRowLayoutPropsWithRestrictions
> = ({ performance, index, rowHeight, delay, restrictions }) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();
  const { displayFont, copyFont } = useBrickworkTypography();
  const roles = getBrickworkColourRoles(selectedPalette);
  const featured = isFeaturedRow(index);
  const surfaces = getFeaturedRowSurfaces(roles, featured);

  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const playerName = truncateText(
    performance.name,
    restrictions.nameLength,
  ).toUpperCase();
  const teamName = truncateText(
    performance.playedFor,
    restrictions.teamLength,
  ).toUpperCase();

  const { mainValue, suffix } = getScoreValues(performance);

  return (
    <div
      className="grid grid-cols-12 items-center h-full overflow-hidden rounded-none"
      style={{
        background: surfaces.rowSurface,
        height: `${rowHeight}px`,
      }}
    >
      <div className="col-span-7 flex flex-col justify-center px-4 h-full">
        <Top5PlayerName
          value={playerName}
          animation={{
            ...largeTextAnimation,
            delay: delay + PLAYER_NAME_DELAY_OFFSET,
          }}
          className=""
          variant="onContainerCopy"
          fontFamily={copyFont}
        />
        <Top5PlayerTeam
          value={teamName}
          animation={{
            ...smallTextAnimation,
            delay: delay + TEAM_NAME_DELAY_OFFSET,
          }}
          className=""
          variant="onContainerCopy"
          fontFamily={copyFont}
        />
      </div>

      <div
        className="col-span-2 flex items-center justify-center h-full"
        style={{ background: surfaces.logoColumnSurface }}
      >
        <div className="w-30 h-30 overflow-hidden flex items-center justify-center">
          <LogoPlate
            mode="preserve"
            logo={performance.teamLogo as PerformanceTeamLogoType}
            teamName={performance.playedFor}
            delay={delay + LOGO_DELAY_OFFSET}
            className="h-full w-full"
          />
        </div>
      </div>

      <div
        className="col-span-3 flex items-center justify-center whitespace-nowrap leading-none px-4 h-full"
        style={{ background: surfaces.statSurface }}
      >
        <Top5PlayerScore
          value={mainValue}
          animation={{
            ...largeTextAnimation,
            delay: delay + STAT_DELAY_OFFSET,
          }}
          className=""
          variant={surfaces.statTextVariant}
          fontFamily={displayFont}
        />
        {suffix && (
          <Top5PlayerScoreSuffix
            value={suffix}
            animation={{
              ...smallTextAnimation,
              delay: delay + STAT_SUFFIX_DELAY_OFFSET,
            }}
            className=""
            variant={surfaces.statTextVariant}
          />
        )}
      </div>
    </div>
  );
};

export default StandardPerformanceRowBrickWork;
