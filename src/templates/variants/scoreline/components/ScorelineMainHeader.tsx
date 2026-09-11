import React from "react";
import { Img } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { ScorelineCreaseMarkup } from "./crease/ScorelineCreaseMarkup";
import { resolveScorelineHeaderDefaults } from "../../../../compositions/cricket/utils/scoreline/resolveScorelineHeaderDefaults";

export const ScorelineMainHeader: React.FC = () => {
  const { selectedPalette } = useThemeContext();
  const { club, metadata } = useVideoDataContext();
  const headerTextColor = selectedPalette.text.onContainer.title;
  const logoUrl = club.logo?.url ?? "";
  const hasCrest = Boolean(logoUrl);
  const headerDefaults = resolveScorelineHeaderDefaults(metadata.compositionId);
  const showOrganisationName = metadata.compositionId !== "CricketRoster";
  const eyebrow =
    metadata.title ||
    metadata.titleSplit?.join(" · ") ||
    headerDefaults.eyebrow;
  const title = metadata.videoTitle || metadata.title || headerDefaults.title;

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
            {showOrganisationName ? (
              <div className="header-identity">
                <p
                  className="organisation-name"
                  style={{ color: headerTextColor }}
                >
                  {club.name}
                </p>
              </div>
            ) : null}
          </div>
          <div className="header-title-stack">
            <p className="header-eyebrow" style={{ color: headerTextColor }}>
              {eyebrow}
            </p>
            <h1 className="header-title" style={{ color: headerTextColor }}>
              {title}
            </h1>
          </div>
        </div>
        <div className="header-shell__crease" aria-hidden>
          <ScorelineCreaseMarkup />
        </div>
      </div>
    </header>
  );
};
