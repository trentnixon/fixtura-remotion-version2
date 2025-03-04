import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useStylesContext } from "../../../../core/context/StyleContext";

export const BasicIntro: React.FC = () => {
  const { Club } = useVideoDataContext();
  const { THEME } = useStylesContext();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.primary || "#111111",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      {Club?.Logo?.url && (
        <img
          src={Club.Logo.url}
          alt={Club.Name || "Club Logo"}
          style={{
            width: "40%",
            maxHeight: "40%",
            objectFit: "contain",
            marginBottom: "2em",
          }}
        />
      )}

      {/* Club Name */}
      <h1
        style={{
          color: THEME.secondary || "#ffffff",
          fontSize: "5em",
          textAlign: "center",
          margin: 0,
          padding: "0 1em",
        }}
      >
        {Club?.Name || "Cricket Club"}
      </h1>
      <p
        style={{
          color: THEME.secondary || "#ffffff",
          fontSize: "5em",
          textAlign: "center",
          margin: 0,
          padding: "0 1em",
        }}
      >
        SOME TExT
      </p>
    </AbsoluteFill>
  );
};
