import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";

const SEPARATOR_LINE_PX = 1;
const SEPARATOR_VERTICAL_PADDING_PX = 14;
const SEPARATOR_HORIZONTAL_INSET_PX = 48;

/** Thin rule between lite fixtures — same palette as team stripes, not the full angular band. */
export const LiteFixtureSeparatorMudgeeraba: React.FC = () => {
  const { selectedPalette } = useThemeContext();
  const lineColor = selectedPalette.container.backgroundTransparent.high;

  return (
    <div
      className="flex w-full shrink-0 items-center justify-center"
      style={{ padding: `${SEPARATOR_VERTICAL_PADDING_PX}px 0` }}
      aria-hidden
    >
      <div
        className="w-full"
        style={{
          height: SEPARATOR_LINE_PX,
          marginLeft: SEPARATOR_HORIZONTAL_INSET_PX,
          marginRight: SEPARATOR_HORIZONTAL_INSET_PX,
          backgroundColor: lineColor,
          opacity: 0.55,
        }}
      />
    </div>
  );
};
