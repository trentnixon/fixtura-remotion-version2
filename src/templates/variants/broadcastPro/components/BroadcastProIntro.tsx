import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedImage } from "../../../../components/images";
import { VerticalStackTitleLogoName } from "../../../../components/layout/titleScreen/index";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  BroadcastProHeadlineSecondary,
  BroadcastProHeadlineTitle,
} from "./headline";

export const BroadcastProIntro: React.FC = () => {
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
        <BroadcastProHeadlineTitle
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
        <BroadcastProHeadlineSecondary
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
