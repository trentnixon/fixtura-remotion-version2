import type { BroadcastProScoreRole } from "../../../../../templates/types/broadcast-pro/score-typography";
import {
  BROADCAST_PRO_SCORE_ROLE_THEME_KEY,
  DEFAULT_BROADCAST_PRO_SCORE_SIZING,
  type BroadcastProScoreSizing,
} from "../../../../../templates/types/broadcast-pro/score-typography";
import type { ComponentStyles } from "../../../../../core/context/types/ThemeContextTypes";

const COMPACT_ROLES = new Set<BroadcastProScoreRole>([
  "tableRank",
  "tableStat",
  "tablePoints",
  "matchDivider",
]);

export const getBroadcastProScoreThemeKey = (
  role: BroadcastProScoreRole,
): string => BROADCAST_PRO_SCORE_ROLE_THEME_KEY[role];

export const getBroadcastProScoreRoleClass = (
  componentStyles: ComponentStyles,
  role: BroadcastProScoreRole,
  options?: { compact?: boolean; sizing?: BroadcastProScoreSizing },
): string => {
  const themeKey = getBroadcastProScoreThemeKey(role);
  const baseClass = componentStyles[themeKey]?.className ?? "";
  const sizing = options?.sizing ?? DEFAULT_BROADCAST_PRO_SCORE_SIZING;

  if (!options?.compact || !COMPACT_ROLES.has(role)) {
    return baseClass;
  }

  const compactClass = sizing.compact[role as keyof typeof sizing.compact];
  return compactClass || baseClass;
};
