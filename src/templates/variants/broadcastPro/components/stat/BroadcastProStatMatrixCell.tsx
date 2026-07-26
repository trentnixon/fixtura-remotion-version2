import React from "react";
import type { BroadcastProStatMatrixTier } from "../../../../../templates/types/broadcast-pro/stat-matrix";
import {
  resolveBroadcastProStatMatrixHighlight,
  resolveBroadcastProStatMatrixScoreRole,
  type BroadcastProStatMatrixCell,
} from "../../../../../templates/types/broadcast-pro/stat-matrix";
import { BroadcastProScoreText } from "../score/BroadcastProScoreText";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import type { BroadcastProTextOnContainer } from "../../../../../compositions/cricket/utils/broadcastPro/themeColors";

export interface BroadcastProStatMatrixCellProps {
  cell: BroadcastProStatMatrixCell;
  tier: BroadcastProStatMatrixTier;
  index: number;
  withDivider: boolean;
  headingFont: string;
  labelClassName: string;
  dividerClassName?: string;
  text: BroadcastProTextOnContainer;
  glass: BroadcastProGlassStyle;
  accent: string;
}

export const BroadcastProStatMatrixCellView: React.FC<
  BroadcastProStatMatrixCellProps
> = ({
  cell,
  tier,
  index,
  withDivider,
  headingFont,
  labelClassName,
  dividerClassName,
  text,
  glass,
  accent,
}) => {
  const highlight = resolveBroadcastProStatMatrixHighlight(tier, index, cell);
  const scoreRole = resolveBroadcastProStatMatrixScoreRole(tier);
  const dividerStyle = withDivider ? { borderLeft: glass.border } : undefined;

  return (
    <div
      className={`w-full min-w-0 ${withDivider ? dividerClassName : ""}`.trim()}
      style={dividerStyle}
    >
      {cell.label ? (
        <p className={labelClassName} style={{ color: text.muted }}>
          {cell.label}
        </p>
      ) : null}
      <BroadcastProScoreText
        value={cell.value}
        role={scoreRole}
        variant="onContainerCopy"
        fontFamily={headingFont}
        style={{ color: highlight ? accent : text.copy }}
      />
    </div>
  );
};
