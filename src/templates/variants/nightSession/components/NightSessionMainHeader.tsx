import React from "react";
import { Img } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { resolveScorelineHeaderDefaults } from "../../../../compositions/cricket/utils/scoreline/resolveScorelineHeaderDefaults";
import { NightSessionAnimatedCopy } from "../../../../compositions/cricket/utils/nightSession/NightSessionAnimatedCopy";
import { NIGHT_SESSION_HEADER_COPY_DELAY } from "../../../../compositions/cricket/utils/nightSession/nightSessionAnimationTiming";

export const NightSessionMainHeader: React.FC = () => {
  const { selectedPalette } = useThemeContext();
  const { club, metadata } = useVideoDataContext();
  const headerTextColor = selectedPalette.text.onContainer.title;
  const logoUrl = club.logo?.url ?? "";
  const hasCrest = Boolean(logoUrl);
  const headerDefaults = resolveScorelineHeaderDefaults(metadata.compositionId);
  const title = metadata.videoTitle || metadata.title || headerDefaults.title;

  return (
    <header className="ns-header">
      <div className="ns-header__accent" aria-hidden>
        <span className="ns-accent-lines" />
      </div>
      <div className="ns-header__row gap-8">
        <div
          className="organisation-mark ns-header__mark"
          data-has-crest={hasCrest ? "true" : "false"}
        >
          <span className="mark-fallback" aria-hidden />
          {hasCrest ? <Img src={logoUrl} alt="" /> : null}
        </div>
        <NightSessionAnimatedCopy
          className="ns-header__lockup"
          animationDelay={NIGHT_SESSION_HEADER_COPY_DELAY}
        >
          <h1 className="header-title" style={{ color: headerTextColor }}>
            {title}
          </h1>
        </NightSessionAnimatedCopy>
      </div>
      <div className="ns-header__wedge" aria-hidden>
        <span className="ns-accent-wedge" />
      </div>
      <p className="sr-only">{club.name}</p>
    </header>
  );
};
