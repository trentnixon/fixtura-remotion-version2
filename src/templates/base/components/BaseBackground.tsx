import React from "react";
import { AbsoluteFill } from "remotion";
import { useStylesContext } from "../../../core/context/StyleContext";

export const BaseBackground: React.FC = () => {
  const { THEME } = useStylesContext();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.primary || "#000000",
        zIndex: -1,
      }}
    />
  );
};
