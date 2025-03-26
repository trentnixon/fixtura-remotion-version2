import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { ImageAnimationConfig } from "../../../../components/images/config";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import {
  ClubNameAnimationInConfig,
  ImageAnimationInConfig,
  IntroAnimationOutConfig,
  IntroExitFrame,
  TitleAnimationInConfig,
} from "./AnimationConfig";
import { TwoColumnLayout } from "../../../../components/layout/titleScreen/index";
import { useThemeContext } from "../../../../core/context/ThemeContext";

/**
 * BasicIntro Component
 *
 * A basic introduction template that showcases enhanced container styling options.
 * This template demonstrates how to style containers with various layout, text, and positioning options.
 */
export const BasicIntro: React.FC = () => {
  const { club, metadata } = useVideoDataContext();

  console.log("[metadata]", metadata);

  const { fontClasses } = useThemeContext();
  console.log("[fontClasses]", fontClasses);
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
            animation={ImageAnimationInConfig as ImageAnimationConfig}
            exitAnimation={IntroAnimationOutConfig as ImageAnimationConfig}
            exitFrame={IntroExitFrame}
          />
        </div>
      }
      Title={
        <AnimatedText
          textAlign="left"
          type="title"
          variant="onBackgroundDark"
          letterAnimation="word"
          animation={TitleAnimationInConfig as AnimationConfig}
          exitAnimation={IntroAnimationOutConfig as AnimationConfig}
          exitFrame={IntroExitFrame}
          fontFamily={fontClasses.title?.family}
        >
          {metadata.title}
        </AnimatedText>
      }
      Name={
        <AnimatedText
          fontFamily={fontClasses.subtitle?.family}
          type="subtitle"
          textAlign="left"
          variant="onBackgroundDark"
          letterAnimation="word"
          animation={ClubNameAnimationInConfig as AnimationConfig}
          exitAnimation={IntroAnimationOutConfig as AnimationConfig}
          exitFrame={IntroExitFrame}
        >
          {club.Name}
        </AnimatedText>
      }
    />
  );
};
