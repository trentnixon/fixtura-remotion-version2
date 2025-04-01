import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { TwoColumnLayout } from "../../../../components/layout/titleScreen/index";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

/**
 * BasicIntro Component
 *
 * A basic introduction template that showcases enhanced container styling options.
 * This template demonstrates how to style containers with various layout, text, and positioning options.
 */
export const BasicIntro: React.FC = () => {
  const { club, metadata } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = useThemeContext();

  return (
    <TwoColumnLayout
      alignment="center"
      Logo={
        <div className="w-full h-full flex justify-center items-center max-h-[300px] max-w-[300px]">
          <AnimatedImage
            src={club.Logo.url}
            alt={club.Name}
            width={club.Logo.width}
            height={club.Logo.height}
            fit="contain"
            animation={LogoAnimations.introIn}
            exitAnimation={LogoAnimations.introOut}
            exitFrame={LogoAnimations.introExitFrame}
          />
        </div>
      }
      Title={
        <div className="overflow-hidden mb-4">
          <AnimatedText
            textAlign="left"
            type="title"
            variant="onBackgroundDark"
            letterAnimation="word"
            animation={TextAnimations.mainTitle}
            exitAnimation={TextAnimations.introOut}
            exitFrame={TextAnimations.introExitFrame}
            fontFamily={fontClasses.title?.family}
          >
            {metadata.title}
          </AnimatedText>
        </div>
      }
      Name={
        <div className="overflow-hidden">
          <AnimatedText
            type="subtitle"
            textAlign="left"
            variant="onBackgroundDark"
            letterAnimation="word"
            animation={TextAnimations.clubName}
            exitAnimation={TextAnimations.introOut}
            exitFrame={TextAnimations.introExitFrame}
            fontFamily={fontClasses.subtitle?.family}
          >
            {club.Name}
          </AnimatedText>
        </div>
      }
    />
  );
};
