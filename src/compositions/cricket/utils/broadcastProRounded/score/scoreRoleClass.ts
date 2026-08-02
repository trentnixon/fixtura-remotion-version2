import type { BroadcastProRoundedScoreRole } from "../../../../../templates/types/broadcast-pro-rounded/score-typography";
import {
  BROADCAST_PRO_SCORE_ROLE_THEME_KEY,
  DEFAULT_BROADCAST_PRO_SCORE_SIZING,
  type BroadcastProRoundedScoreSizing,
} from "../../../../../templates/types/broadcast-pro-rounded/score-typography";
import type { ComponentStyles } from "../../../../../core/context/types/ThemeContextTypes";

const COMPACT_ROLES = new Set<BroadcastProRoundedScoreRole>([
  "tableRank",
  "tableStat",
  "tablePoints",
  "matchDivider",
]);

export const getBroadcastProRoundedScoreThemeKey = (
  role: BroadcastProRoundedScoreRole,
): string => BROADCAST_PRO_SCORE_ROLE_THEME_KEY[role];

export const getBroadcastProRoundedScoreRoleClass = (
  componentStyles: ComponentStyles,
  role: BroadcastProRoundedScoreRole,
  options?: { compact?: boolean; sizing?: BroadcastProRoundedScoreSizing },
): string => {
  const themeKey = getBroadcastProRoundedScoreThemeKey(role);
  const baseClass = componentStyles[themeKey]?.className ?? "";
  const sizing = options?.sizing ?? DEFAULT_BROADCAST_PRO_SCORE_SIZING;

  if (!options?.compact || !COMPACT_ROLES.has(role)) {
    return baseClass;
  }

  const compactClass = sizing.compact[role as keyof typeof sizing.compact];
  return compactClass || baseClass;
};
