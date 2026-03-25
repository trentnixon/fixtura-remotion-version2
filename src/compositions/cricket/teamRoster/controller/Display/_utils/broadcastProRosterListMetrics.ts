/**
 * Sizes the BroadcastPro roster player list so all names stay inside the content
 * window: row height and font sizes scale from `availableHeight` and player count.
 */

import {
  DEFAULT_BROADCAST_PRO_ROSTER_LIST_SIZING,
  type BroadcastProRosterListSizing,
} from "../../../../../../templates/types/broadcast-pro/roster-list-sizing";

export type BroadcastProRosterListMetrics = {
  /** Approximate row height used for font math (matches flex-equal rows). */
  rowPx: number;
  gapPx: number;
  nameFontPx: number;
  numFontPx: number;
  numColWidthPx: number;
  cellPaddingYPx: number;
  cellPaddingXPx: number;
};

/**
 * @param availableHeightPx — Theme layout asset height for the roster body
 * @param playerCount — `teamRoster.length`
 * @param sizing — From `broadcastPro/theme/tokens.ts` `broadcastProRosterListSizing`; merged with {@link DEFAULT_BROADCAST_PRO_ROSTER_LIST_SIZING}
 */
export function computeBroadcastProRosterPlayerListMetrics(
  availableHeightPx: number,
  playerCount: number,
  sizing?: Partial<BroadcastProRosterListSizing>,
): BroadcastProRosterListMetrics {
  const s = { ...DEFAULT_BROADCAST_PRO_ROSTER_LIST_SIZING, ...sizing };
  const n = Math.max(1, playerCount);
  const listHeightPx = Math.max(
    s.minRowPx * n,
    availableHeightPx - s.leftColumnHeaderReservePx,
  );

  const gapPx =
    n <= 11 ? 8 : n <= 16 ? 6 : n <= 22 ? 4 : n <= 28 ? 3 : 2;

  const totalGaps = (n - 1) * gapPx;
  const rowPx = Math.max(s.minRowPx, (listHeightPx - totalGaps) / n);

  const nameInnerMax = Math.min(
    s.maxNameFontPx - s.nameInnerClampMaxOffsetPx,
    rowPx * s.nameRowHeightMultiplier,
  );
  const nameFontPx = Math.min(
    s.maxNameFontPx,
    Math.max(
      s.minNameFontPx,
      Math.round(Math.max(s.minNameFontPx, nameInnerMax)) + s.nameFontBonusPx,
    ),
  );
  const numFontPx = Math.round(
    Math.max(
      s.minNumberFontPx,
      Math.min(
        s.maxNumberFontPx,
        rowPx * s.numberRowHeightMultiplier,
      ),
    ),
  );

  const cellPaddingYPx = Math.max(2, Math.min(14, Math.floor(rowPx * 0.18)));
  const cellPaddingXPx = Math.max(8, Math.min(24, Math.floor(rowPx * 0.3)));
  const numColWidthPx = Math.max(44, Math.min(72, Math.floor(rowPx * 1.15)));

  return {
    rowPx,
    gapPx,
    nameFontPx,
    numFontPx,
    numColWidthPx,
    cellPaddingYPx,
    cellPaddingXPx,
  };
}
