import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  formatBroadcastProCompactBattingStat,
  formatBroadcastProCompactBowlingStat,
  formatBroadcastProCompactFieldingStat,
} from "./buildBroadcastProStatMatrixCells";
import {
  hasBothStats,
  isAllRounderPosition,
} from "../../../TeamOfTheWeek/controller/PlayerRow/_utils/helpers";
import type { TeamOfTheWeekPlayer } from "../../../TeamOfTheWeek/types";
import { BroadcastProStatMatrixCompact } from "../../../../../templates/variants/broadcastPro/components/stat";
import { BOWLING_STAT_DELAY_OFFSET } from "../../../TeamOfTheWeek/controller/PlayerRow/_utils/constants";

export interface BroadcastProStatMatrixCompactGroupProps {
  player: TeamOfTheWeekPlayer;
  delay: number;
  className?: string;
  statClassName?: string;
  statSuffixClassName?: string;
}

export const BroadcastProStatMatrixCompactGroup: React.FC<
  BroadcastProStatMatrixCompactGroupProps
> = ({
  player,
  delay,
  className = "",
  statClassName = "",
  statSuffixClassName = "",
}) => {
  const { animations } = useAnimationContext();
  const { fontClasses, fonts } = useThemeContext();
  const copyIn = animations.text.main.copyIn;
  const headingFont =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";

  const renderCompact = (value: string, statDelay: number) => (
    <BroadcastProStatMatrixCompact
      value={value}
      animation={{ ...copyIn, delay: statDelay }}
      fontFamily={headingFont}
      className={statClassName}
      suffixClassName={statSuffixClassName}
    />
  );

  const isAllRounder = isAllRounderPosition(player.categoryDetail.position);
  const hasBoth = hasBothStats(player);

  const statRowClass = `whitespace-nowrap ${className}`.trim();

  if (isAllRounder && hasBoth && player.batting && player.bowling) {
    return (
      <div
        className={`flex flex-nowrap items-baseline justify-start gap-0.5 ${statRowClass}`.trim()}
      >
        {renderCompact(
          formatBroadcastProCompactBattingStat(player.batting),
          delay,
        )}
        <span className="shrink-0 text-xs opacity-60">&amp;</span>
        {renderCompact(
          formatBroadcastProCompactBowlingStat(player.bowling),
          delay + BOWLING_STAT_DELAY_OFFSET,
        )}
      </div>
    );
  }

  if (
    (player.categoryDetail.position === "topscorer" ||
      player.categoryDetail.position === "higheststrikerate") &&
    player.batting
  ) {
    return (
      <div className={statRowClass}>
        {renderCompact(
          formatBroadcastProCompactBattingStat(player.batting),
          delay,
        )}
      </div>
    );
  }

  if (
    (player.categoryDetail.position === "mostwickets" ||
      player.categoryDetail.position === "besteconomy") &&
    player.bowling
  ) {
    return (
      <div className={statRowClass}>
        {renderCompact(
          formatBroadcastProCompactBowlingStat(player.bowling),
          delay,
        )}
      </div>
    );
  }

  if (
    player.categoryDetail.position === "wicketKeeper" &&
    "fielding" in player &&
    player.fielding
  ) {
    return (
      <div className={statRowClass}>
        {renderCompact(
          formatBroadcastProCompactFieldingStat(player.fielding),
          delay,
        )}
      </div>
    );
  }

  if (player.categoryDetail.position === "bestoftherest") {
    if (player.batting) {
      return (
        <div className={statRowClass}>
          {renderCompact(
            formatBroadcastProCompactBattingStat(player.batting),
            delay,
          )}
        </div>
      );
    }
    if (player.bowling) {
      return (
        <div className={statRowClass}>
          {renderCompact(
            formatBroadcastProCompactBowlingStat(player.bowling),
            delay,
          )}
        </div>
      );
    }
    return null;
  }

  if (player.batting) {
    return (
      <div className={statRowClass}>
        {renderCompact(
          formatBroadcastProCompactBattingStat(player.batting),
          delay,
        )}
      </div>
    );
  }

  if (player.bowling) {
    return (
      <div className={statRowClass}>
        {renderCompact(
          formatBroadcastProCompactBowlingStat(player.bowling),
          delay,
        )}
      </div>
    );
  }

  return null;
};
