import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { IntroPrimarySponsors } from "../../../../components/layout/sponsors";
import { useNightSessionCanvasStyle } from "../../../../compositions/cricket/utils/nightSession/nightSessionCanvasStyle";
import { resolveScorelineHeaderDefaults } from "../../../../compositions/cricket/utils/scoreline/resolveScorelineHeaderDefaults";
import { csClass } from "../../../../compositions/cricket/utils/scoreline/componentStyles";

export const NightSessionIntro: React.FC = () => {
  const { club, metadata, templateVariation } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const introPanelAnimation =
    animations.container.intro?.panel ??
    animations.container.main.itemContainerOuter;
  const introExitFrame = TextAnimations.introExitFrame;
  const { fontClasses, componentStyles, selectedPalette } = useThemeContext();
  const canvasStyle = useNightSessionCanvasStyle();
  const headerTextColor = selectedPalette.text.onContainer.title;
  const headerDefaults = resolveScorelineHeaderDefaults(metadata.compositionId);
  const eyebrow =
    metadata.title ||
    metadata.titleSplit?.join(" · ") ||
    headerDefaults.eyebrow;
  const title = metadata.videoTitle || metadata.title || headerDefaults.title;
  const logoUrl = club.logo?.url ?? "";
  const hasCrest = Boolean(logoUrl);

  return (
    <AbsoluteFill>
      <div
        className={`night-session-canvas night-session-intro ${csClass(componentStyles, "nightSessionCanvasShell")}`}
        style={canvasStyle}
        data-night-session-mode={templateVariation.mode || "light"}
      >
        <AnimatedContainer
          type="full"
          className="flex h-full w-full flex-col items-center justify-center px-8"
          backgroundColor="none"
          animation={introPanelAnimation.containerIn}
          exitAnimation={introPanelAnimation.containerOut}
          exitFrame={introExitFrame}
        >
          <header className="ns-header ns-header--intro">
            <div className="ns-header__accent" aria-hidden>
              <span className="ns-accent-wedge" />
              <span className="ns-accent-lines" />
            </div>
            <div
              className="organisation-mark ns-header__mark"
              data-has-crest={hasCrest ? "true" : "false"}
            >
              <span className="mark-fallback" aria-hidden />
              {hasCrest ? (
                <AnimatedImage
                  src={logoUrl}
                  alt=""
                  width="auto"
                  height="auto"
                  fit="contain"
                  animation={LogoAnimations.introIn}
                  exitAnimation={LogoAnimations.introOut}
                  exitFrame={LogoAnimations.introExitFrame}
                />
              ) : null}
            </div>
            <div className="ns-header__lockup">
              <AnimatedText
                textAlign="center"
                type="label"
                variant="onContainerTitle"
                letterAnimation="word"
                animation={TextAnimations.mainTitle}
                exitAnimation={TextAnimations.introOut}
                exitFrame={TextAnimations.introExitFrame}
                fontFamily={fontClasses.heading?.family}
                className="header-eyebrow"
                style={{ color: headerTextColor }}
              >
                {eyebrow}
              </AnimatedText>
              <AnimatedText
                textAlign="center"
                type="title"
                variant="onContainerTitle"
                letterAnimation="word"
                animation={TextAnimations.mainTitle}
                animationDelay={4}
                exitAnimation={TextAnimations.introOut}
                exitFrame={TextAnimations.introExitFrame}
                fontFamily={fontClasses.heading?.family}
                className="header-title"
                style={{ color: headerTextColor }}
              >
                {title}
              </AnimatedText>
            </div>
          </header>
          <IntroPrimarySponsors />
        </AnimatedContainer>
      </div>
    </AbsoluteFill>
  );
};
