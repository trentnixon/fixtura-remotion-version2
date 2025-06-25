import React from "react";

interface PlaceholderComponentProps {
  title: string;
  compositionId: string;
  templateId: string;
  sport: string;
  reason?: string;
}

export const PlaceholderComponent: React.FC<PlaceholderComponentProps> = ({
  title,
  compositionId,
  templateId,
  sport,
  reason,
}) => {
  const baseStyle = {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "20px",
    textAlign: "center" as const,
  };

  return (
    <div style={baseStyle}>
      <h1 style={{ fontSize: "3em", marginBottom: "20px" }}>
        {title || "Composition"}
      </h1>
      <h1 style={{ fontSize: "3em", marginBottom: "20px" }}>{reason}</h1>
      <p style={{ fontSize: "1.5em", marginBottom: "10px" }}>
        Missing Composition Implementation
      </p>
      <p style={{ fontSize: "1.2em", marginBottom: "5px" }}>Sport: {sport}</p>
      <p style={{ fontSize: "1.2em", marginBottom: "5px" }}>
        Template: {templateId}
      </p>
      <p style={{ fontSize: "1.2em", marginBottom: "5px" }}>
        Composition: {compositionId}
      </p>
    </div>
  );
};
