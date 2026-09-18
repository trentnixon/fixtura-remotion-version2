import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { IntroPrimarySponsors } from "../../../../components/layout/sponsors";
import { useNightSessionCanvasStyle } from "../../../../compositions/cricket/utils/nightSession/nightSessionCanvasStyle";
import { resolveScorelineHeaderDefaults } from "../../../../compositions/cricket/utils/scoreline/resolveScorelineHeaderDefaults";
import { csClass } from "../../../../compositions/cricket/utils/scoreline/componentStyles";
import { NightSessionAnimatedShell } from "../../../../compositions/cricket/utils/nightSession/NightSessionAnimatedShell";
import { NIGHT_SESSION_HEADER_COPY_DELAY } from "../../../../compositions/cricket/utils/nightSession/nightSessionAnimationTiming";

export const NightSessionIntro: React.FC = () => {
  const { club, metadata, templateVariation } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const introExitFrame = TextAnimations.introExitFrame;
  const { fontClasses, componentStyles } = useThemeContext();
  const canvasStyle = useNightSessionCanvasStyle();
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
        <div className="night-session-intro__frame">
          <div className="night-session-intro__main">
            <NightSessionAnimatedShell
              className={`night-session-intro__animated ${csClass(componentStyles, "nightSessionAnimatedShell")}`}
              exitFrame={introExitFrame}
            >
              <div className="night-session-intro__panel">
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
                    variant="onContainerCopy"
                    letterAnimation="word"
                    animation={TextAnimations.mainTitle}
                    animationDelay={NIGHT_SESSION_HEADER_COPY_DELAY}
                    exitAnimation={TextAnimations.introOut}
                    exitFrame={TextAnimations.introExitFrame}
                    fontFamily={fontClasses.heading?.family}
                    className="header-eyebrow"
                  >
                    {eyebrow}
                  </AnimatedText>
                  <AnimatedText
                    textAlign="center"
                    type="title"
                    variant="onContainerCopy"
                    letterAnimation="word"
                    animation={TextAnimations.mainTitle}
                    animationDelay={NIGHT_SESSION_HEADER_COPY_DELAY + 4}
                    exitAnimation={TextAnimations.introOut}
                    exitFrame={TextAnimations.introExitFrame}
                    fontFamily={fontClasses.heading?.family}
                    className="header-title"
                  >
                    {title}
                  </AnimatedText>
                </div>
                <p className="sr-only">{club.name}</p>
              </header>
              </div>
            </NightSessionAnimatedShell>
          </div>

          <IntroPrimarySponsors
            introIn={LogoAnimations.introIn}
            introOut={LogoAnimations.introOut}
            introExitFrame={LogoAnimations.introExitFrame}
            className="night-session-intro__sponsors"
            itemClassName="night-session-intro__sponsor-slot"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
