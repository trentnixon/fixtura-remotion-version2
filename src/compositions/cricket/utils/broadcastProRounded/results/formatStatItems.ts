import type {
  BattingPerformance,
  BowlingPerformance,
  Team,
} from "../../../results/_types/types";
import { truncateText } from "../../../results/layout/Sections/PlayerStats/_utils/helpers";
import type { BroadcastProRoundedResultStatItem } from "./types";

const MAX_NAME = 22;

const formatBattingStat = (player: BattingPerformance): string =>
  `${player.runs}${player.notOut ? "*" : ""} (${player.balls})`;

const formatBowlingStat = (player: BowlingPerformance): string =>
  `${player.wickets}/${player.runs} (${player.overs})`;

/**
 * Builds up to `maxItems` stitch-style stat cells from a team's performances.
 * Batting rows first, then bowling; bowling stats are marked highlight.
 */
export const buildBroadcastProRoundedResultStatItems = (
  team: Team,
  maxItems = 3,
): BroadcastProRoundedResultStatItem[] => {
  const items: BroadcastProRoundedResultStatItem[] = [];

  for (const player of team.battingPerformances ?? []) {
    if (items.length >= maxItems) break;
    items.push({
      playerName: truncateText(player.player, MAX_NAME),
      statValue: formatBattingStat(player),
    });
  }

  for (const player of team.bowlingPerformances ?? []) {
    if (items.length >= maxItems) break;
    items.push({
      playerName: truncateText(player.player, MAX_NAME),
      statValue: formatBowlingStat(player),
      highlight: true,
    });
  }

  return items;
};
