import React from "react";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { TwoColumnVerticalHeaderLogoTitle } from "../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../components/images";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

export const ClassicMainHeaderStacked: React.FC = () => {
  const { fontClasses } = useThemeContext();
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;

  const { timings } = data;
  const exitFrame = timings.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;

  const TitleNode = (
    <div className="w-full flex flex-col justify-center items-center leading-none">
      {metadata.title
        .replace(/\s+/g, "")
        .split("")
        .map((char, idx) => (
          <AnimatedText
            key={`${char}-${idx}`}
            textAlign="center"
            type="subtitle"
            variant="onContainerTitle"
            letterAnimation="none"
            animation={TextAnimations.title}
            exitAnimation={TextAnimations.copyOut}
            exitFrame={exitFrame}
            fontFamily={fontClasses.title?.family}
            className="leading-none"
          >
            {char}
          </AnimatedText>
        ))}
    </div>
  );

  return (
    <TwoColumnVerticalHeaderLogoTitle
      height={1350}
      alignment="center"
      Logo={
        <div className="w-full h-full flex justify-center items-center mt-4 mb-4">
          <div className="w-full h-full flex items-center">
            <AnimatedImage
              src={club.logo?.url}
              width={"auto"}
              height={"auto"}
              fit={"contain"}
              className="max-h-[220px] max-w-[220px]"
              animation={LogoAnimations.introIn}
              exitAnimation={LogoAnimations.introOut}
              exitFrame={exitFrame}
            />
          </div>
        </div>
      }
      Title={TitleNode}
      Name={null}
    />
  );
};
