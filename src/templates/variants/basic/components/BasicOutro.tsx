import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useStylesContext } from "../../../../core/context/StyleContext";

interface BasicOutroProps {
  doesAccountHaveSponsors: boolean;
}

export const BasicOutro: React.FC<BasicOutroProps> = ({
  doesAccountHaveSponsors,
}) => {
  const { THEME } = useStylesContext();

  // If no sponsors, show alternative outro
  if (!doesAccountHaveSponsors) {
    return <AlternativeOutro />;
  }

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
      <h2
        style={{
          color: THEME.white || "#ffffff",
          fontSize: "3em",
          marginBottom: "1em",
        }}
      >
        Our Sponsors
      </h2>

      {/* Render sponsors - simplified for development */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "80%",
        }}
      >
        {/* Sample sponsor for development */}
        <div style={{ margin: "1em", background: "#ffffff", padding: "1em" }}>
          <div
            style={{
              width: "150px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            Sponsor 1
          </div>
        </div>
        <div style={{ margin: "1em", background: "#ffffff", padding: "1em" }}>
          <div
            style={{
              width: "150px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            Sponsor 2
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Alternative outro for when there are no sponsors
const AlternativeOutro: React.FC = () => {
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
            width: "30%",
            maxHeight: "30%",
            objectFit: "contain",
            marginBottom: "1em",
          }}
        />
      )}

      <h3
        style={{
          color: THEME.white || "#ffffff",
          fontSize: "2em",
        }}
      >
        Visit our website
      </h3>
    </AbsoluteFill>
  );
};
