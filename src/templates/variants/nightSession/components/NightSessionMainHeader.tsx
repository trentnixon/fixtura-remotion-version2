import React from "react";
import { Img } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { resolveScorelineHeaderDefaults } from "../../../../compositions/cricket/utils/scoreline/resolveScorelineHeaderDefaults";

export const NightSessionMainHeader: React.FC = () => {
  const { selectedPalette } = useThemeContext();
  const { club, metadata } = useVideoDataContext();
  const headerTextColor = selectedPalette.text.onContainer.title;
  const logoUrl = club.logo?.url ?? "";
  const hasCrest = Boolean(logoUrl);
  const headerDefaults = resolveScorelineHeaderDefaults(metadata.compositionId);
  const eyebrow =
    metadata.title ||
    metadata.titleSplit?.join(" · ") ||
    headerDefaults.eyebrow;
  const title = metadata.videoTitle || metadata.title || headerDefaults.title;

  return (
    <header className="ns-header">
      <div className="ns-header__accent" aria-hidden>
        <span className="ns-accent-wedge" />
        <span className="ns-accent-lines" />
      </div>
      <div className="organisation-mark ns-header__mark">
        <span className="mark-fallback" aria-hidden />
        {hasCrest ? <Img src={logoUrl} alt="" /> : null}
      </div>
      <div className="ns-header__lockup">
        <p className="header-eyebrow" style={{ color: headerTextColor }}>
          {eyebrow}
        </p>
        <h1 className="header-title" style={{ color: headerTextColor }}>
          {title}
        </h1>
      </div>
      <p className="sr-only">{club.name}</p>
    </header>
  );
};
