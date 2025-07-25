import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { VerticalStackLogoTitleName } from "../../../../components/layout/titleScreen/index";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

/**
 * BrickworkIntro Component
 *
 * A brickwork introduction template that showcases enhanced container styling options.
 * This template demonstrates how to style containers with various layout, text, and positioning options.
 */
export const BrickworkIntro: React.FC = () => {
  const { club, metadata, sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = useThemeContext();

  return (
    <VerticalStackLogoTitleName
      alignment="end"
      Logo={
        <div className="w-full h-full flex justify-center items-center max-h-[300px] max-w-[300px]">
          <AnimatedImage
            src={club.logo?.url || ""}
            alt={club.name}
            width={club.logo?.width}
            height={club.logo?.height}
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
            variant="onBackgroundDark"
            letterAnimation="none"
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
            variant="onBackgroundDark"
            letterAnimation="none"
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
              width={sponsors?.primary[0]?.logo?.width || 150}
              height={sponsors?.primary[0]?.logo?.height || 150}
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
