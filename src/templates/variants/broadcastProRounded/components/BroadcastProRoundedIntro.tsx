import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedImage } from "../../../../components/images";
import { VerticalStackTitleLogoName } from "../../../../components/layout/titleScreen/index";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  BroadcastProRoundedHeadlineSecondary,
  BroadcastProRoundedHeadlineTitle,
} from "./headline";

export const BroadcastProRoundedIntro: React.FC = () => {
  const { club, metadata, sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses, layout } = useThemeContext();
  const imageRadius =
    layout.borderRadius.image ?? layout.borderRadius.container;

  return (
    <VerticalStackTitleLogoName
      alignment="center"
      Logo={
        <div
          className={`flex h-full w-full max-h-[500px] max-w-[500px] items-center justify-center overflow-hidden py-8 ${imageRadius}`}
        >
          <AnimatedImage
            src={club.logo?.url || ""}
            alt={club.name}
            width={"auto"}
            height={"auto"}
            fit="contain"
            className={imageRadius}
            animation={LogoAnimations.introIn}
            exitAnimation={LogoAnimations.introOut}
            exitFrame={LogoAnimations.introExitFrame}
          />
        </div>
      }
      Title={
        <BroadcastProRoundedHeadlineTitle
          text={metadata.title}
          variant="intro"
          letterAnimation="word"
          animation={TextAnimations.mainTitle}
          exitAnimation={TextAnimations.introOut}
          exitFrame={TextAnimations.introExitFrame}
          fontFamily={fontClasses.heading?.family}
        />
      }
      Name={
        <BroadcastProRoundedHeadlineSecondary
          text={club.name}
          variant="intro"
          animation={TextAnimations.clubName}
          exitAnimation={TextAnimations.introOut}
          exitFrame={TextAnimations.introExitFrame}
          fontFamily={fontClasses.subheading?.family}
        />
      }
      PrimarySponsor={
        sponsors?.primary[0]?.logo?.url && (
          <div
            className={`ok flex h-full max-h-[150px] w-full max-w-[150px] items-center justify-center overflow-hidden ${imageRadius}`}
          >
            <AnimatedImage
              src={sponsors?.primary[0]?.logo?.url || ""}
              alt={sponsors?.primary[0]?.name || ""}
              width={"auto"}
              height={"auto"}
              fit="contain"
              className={imageRadius}
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
