import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { VerticalStackTitleLogoName } from "../../../../components/layout/titleScreen/index";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

/**
 * BasicIntro Component
 *
 * A basic introduction template that showcases enhanced container styling options.
 * This template demonstrates how to style containers with various layout, text, and positioning options.
 */
export const BasicIntro: React.FC = () => {
  const { club, metadata, sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = useThemeContext();

  return (
    <VerticalStackTitleLogoName
      alignment="center"
      Logo={
        <div className="w-full h-full flex justify-center py-8 items-center max-h-[500px] max-w-[500px]">
          <AnimatedImage
            src={club.logo?.url || ""}
            alt={club.name}
            width={"auto"}
            height={"auto"}
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
            textAlign="center"
            type="title"
            variant="onContainerTitle"
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
            textAlign="center"
            variant="onContainerTitle"
            letterAnimation="word"
            animation={TextAnimations.clubName}
            exitAnimation={TextAnimations.introOut}
            exitFrame={TextAnimations.introExitFrame}
            fontFamily={fontClasses.subtitle?.family}
          >
            {club.name}
          </AnimatedText>
        </div>
      }
      PrimarySponsor={
        sponsors?.primary[0]?.logo?.url && (
          <div className="w-full h-full ok justify-center items-center max-h-[150px] max-w-[150px]">
            <AnimatedImage
              src={sponsors?.primary[0]?.logo?.url || ""}
              alt={sponsors?.primary[0]?.name || ""}
              width={"auto"}
              height={"auto"}
              fit="contain"
              animation={LogoAnimations.introIn}
              exitAnimation={LogoAnimations.introOut}
              exitFrame={LogoAnimations.introExitFrame}
            />
          </div>
        )
      }
    />
  );
};
