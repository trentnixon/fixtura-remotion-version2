import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { IntroPrimarySponsors } from "../../../../components/layout/sponsors";
import { useScorelineCanvasStyle } from "../../../../compositions/cricket/utils/scoreline/scorelineCanvasStyle";
import { resolveScorelineHeaderDefaults } from "../../../../compositions/cricket/utils/scoreline/resolveScorelineHeaderDefaults";
import { csClass } from "../../../../compositions/cricket/utils/scoreline/componentStyles";
import { ScorelineCreaseMarkup } from "./crease/ScorelineCreaseMarkup";

export const ScorelineIntro: React.FC = () => {
  const { club, metadata, templateVariation } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const introPanelAnimation =
    animations.container.intro?.panel ??
    animations.container.main.itemContainerOuter;
  const introExitFrame = TextAnimations.introExitFrame;
  const { fontClasses, componentStyles, selectedPalette } = useThemeContext();
  const canvasStyle = useScorelineCanvasStyle();
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
        className={`scoreline-canvas scoreline-intro ${csClass(componentStyles, "scorelineCanvasShell")}`}
        style={canvasStyle}
        data-scoreline-mode={templateVariation.mode || "light"}
      >
        <div className="scoreline-intro__frame">
          <AnimatedContainer
            type="full"
            size="auto"
            className={`scoreline-intro__animated ${csClass(componentStyles, "scorelineAnimatedItem")}`}
            backgroundColor="none"
            animation={introPanelAnimation.containerIn}
            exitAnimation={introPanelAnimation.containerOut}
            exitFrame={introExitFrame}
          >
            <div className="scoreline-intro__panel">
              <div className="scoreline-intro__shell">
                <div className="scoreline-intro__main">
                  <div className="header-identity-lockup">
                    <div
                      className="organisation-mark"
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
                    <div className="header-identity">
                      <AnimatedText
                        textAlign="left"
                        type="copy"
                        variant="onContainerCopy"
                        letterAnimation="word"
                        animation={TextAnimations.clubName}
                        exitAnimation={TextAnimations.introOut}
                        exitFrame={TextAnimations.introExitFrame}
                        fontFamily={fontClasses.body?.family}
                        className="organisation-name"
                        style={{ color: headerTextColor }}
                      >
                        {club.name}
                      </AnimatedText>
                    </div>
                  </div>

                  <div className="header-title-stack">
                    <AnimatedText
                      textAlign="right"
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
                      textAlign="right"
                      type="title"
                      variant="onContainerTitle"
                      letterAnimation="word"
                      animation={TextAnimations.mainTitle}
                      animationDelay={4}
                      exitAnimation={TextAnimations.introOut}
                      exitFrame={TextAnimations.introExitFrame}
                      fontFamily={fontClasses.heading?.family}
                      className="header-title scoreline-intro__headline"
                      style={{ color: headerTextColor }}
                    >
                      {title}
                    </AnimatedText>
                  </div>
                </div>

                <div className="scoreline-intro__crease" aria-hidden>
                  <ScorelineCreaseMarkup />
                </div>
              </div>
            </div>
          </AnimatedContainer>

          <IntroPrimarySponsors
            introIn={LogoAnimations.introIn}
            introOut={LogoAnimations.introOut}
            introExitFrame={LogoAnimations.introExitFrame}
            className="scoreline-intro__sponsors"
            itemClassName="scoreline-intro__sponsor-slot"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
