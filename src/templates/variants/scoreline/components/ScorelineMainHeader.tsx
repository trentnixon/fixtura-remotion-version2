import React from "react";
import { Img } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { ScorelineCreaseMarkup } from "./crease/ScorelineCreaseMarkup";

export const ScorelineMainHeader: React.FC = () => {
  const { selectedPalette } = useThemeContext();
  const { club, metadata } = useVideoDataContext();
  const headerTextColor = selectedPalette.text.onContainer.title;
  const logoUrl = club.logo?.url ?? "";
  const hasCrest = Boolean(logoUrl);
  const eyebrow =
    metadata.title || metadata.titleSplit?.join(" · ") || "Results";
  const title =
    metadata.videoTitle || metadata.title || "Weekend Results";

  return (
    <header className="scoreline-header">
      <div className="header-shell">
        <div className="header-shell__main">
          <div className="header-identity-lockup">
            <div
              className="organisation-mark"
              data-has-crest={hasCrest ? "true" : "false"}
            >
              <span className="mark-fallback" aria-hidden />
              {hasCrest ? <Img src={logoUrl} alt="" /> : null}
            </div>
            <div className="header-identity">
              <p className="organisation-name" style={{ color: headerTextColor }}>
                {club.name}
              </p>
            </div>
          </div>
          <div className="header-title-stack">
            <p className="header-eyebrow" style={{ color: headerTextColor }}>
              {eyebrow}
            </p>
            <h1 style={{ color: headerTextColor }}>{title}</h1>
          </div>
        </div>
        <div className="header-shell__crease" aria-hidden>
          <ScorelineCreaseMarkup />
        </div>
      </div>
    </header>
  );
};
