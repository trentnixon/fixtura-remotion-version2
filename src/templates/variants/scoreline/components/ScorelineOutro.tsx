import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { VerticalStackTitleLogoName } from "../../../../components/layout/titleScreen/index";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

export const ScorelineOutro: React.FC = () => {
  const { club, metadata } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.outro;
  const LogoAnimations = animations.image.outro.logo;
  const { fontClasses } = useThemeContext();

  return (
    <VerticalStackTitleLogoName
      alignment="center"
      Logo={
        <div className="flex h-full max-h-[500px] w-full max-w-[500px] items-center justify-center py-8">
          <AnimatedImage
            src={club.logo?.url || ""}
            alt={club.name}
            width="auto"
            height="auto"
            fit="contain"
            animation={LogoAnimations.outroIn}
            exitAnimation={LogoAnimations.outroOut}
            exitFrame={LogoAnimations.outroExitFrame}
          />
        </div>
      }
      Title={
        <div className="mb-4 overflow-hidden">
          <AnimatedText
            textAlign="center"
            type="title"
            variant="onContainerTitle"
            letterAnimation="word"
            animation={TextAnimations.mainTitle}
            exitAnimation={TextAnimations.outroOut}
            exitFrame={TextAnimations.outroExitFrame}
            fontFamily={fontClasses.heading?.family}
            className="font-barlow-condensed text-[124px] font-extrabold uppercase leading-none tracking-wide"
          >
            {metadata.title}
          </AnimatedText>
        </div>
      }
      Name={
        <AnimatedText
          textAlign="center"
          type="copy"
          variant="onContainerCopy"
          animation={TextAnimations.clubName}
          exitAnimation={TextAnimations.outroOut}
          exitFrame={TextAnimations.outroExitFrame}
          fontFamily={fontClasses.body?.family}
          className="font-source-sans text-3xl font-semibold uppercase tracking-widest"
        >
          {club.name}
        </AnimatedText>
      }
      PrimarySponsor={null}
    />
  );
};
