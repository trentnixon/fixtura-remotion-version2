import React from "react";
import type { BroadcastProRoundedStatMatrixTier } from "../../../../../templates/types/broadcast-pro-rounded/stat-matrix";
import {
  resolveBroadcastProRoundedStatMatrixHighlight,
  resolveBroadcastProRoundedStatMatrixScoreRole,
  type BroadcastProRoundedStatMatrixCell,
} from "../../../../../templates/types/broadcast-pro-rounded/stat-matrix";
import { BroadcastProRoundedScoreText } from "../score/BroadcastProRoundedScoreText";
import type { BroadcastProRoundedGlassStyle } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import type { BroadcastProRoundedTextOnContainer } from "../../../../../compositions/cricket/utils/broadcastProRounded/themeColors";

export interface BroadcastProRoundedStatMatrixCellProps {
  cell: BroadcastProRoundedStatMatrixCell;
  tier: BroadcastProRoundedStatMatrixTier;
  index: number;
  withDivider: boolean;
  headingFont: string;
  labelClassName: string;
  dividerClassName?: string;
  text: BroadcastProRoundedTextOnContainer;
  glass: BroadcastProRoundedGlassStyle;
  accent: string;
}

export const BroadcastProRoundedStatMatrixCellView: React.FC<
  BroadcastProRoundedStatMatrixCellProps
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
  const highlight = resolveBroadcastProRoundedStatMatrixHighlight(
    tier,
    index,
    cell,
  );
  const scoreRole = resolveBroadcastProRoundedStatMatrixScoreRole(tier);
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
      <BroadcastProRoundedScoreText
        value={cell.value}
        role={scoreRole}
        variant="onContainerCopy"
        fontFamily={headingFont}
        style={{ color: highlight ? accent : text.copy }}
      />
    </div>
  );
};
