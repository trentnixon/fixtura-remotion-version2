// BasicMain.tsx

import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { TwoColumnHeaderTitle } from "../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../components/images";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

export const BasicMainHeader = () => {
  const { layout, fontClasses } = useThemeContext();
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;

  const { heights } = layout;
  const { timings } = data;

  const exitFrame = timings.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;
  return (
    <TwoColumnHeaderTitle
      height={heights.header}
      alignment="start"
      Logo={
        <div className="w-full h-full flex justify-center items-center ">
          <div className="w-full h-full flex justify-center items-center rounded-none max-h-[120px] max-w-[150px]">
            <AnimatedImage
              src={club.logo?.url}
              width={"auto"}
              height={"auto"}
              fit="contain"
              className="rounded-none"
              animation={LogoAnimations.introIn}
              exitAnimation={LogoAnimations.introOut}
              exitFrame={exitFrame}
            />
          </div>
        </div>
      }
      Title={
        <AnimatedText
          textAlign="center"
          type="subtitle"
          variant="onContainerTitle"
          letterAnimation="none"
          animation={TextAnimations.title}
          exitAnimation={TextAnimations.copyOut}
          exitFrame={exitFrame}
          fontFamily={fontClasses.title?.family}
        >
          {metadata.title}
        </AnimatedText>
      }
      Name={
        <AnimatedText
          fontFamily={fontClasses.subtitle?.family}
          type="subtitle"
          textAlign="right"
          variant="onContainerTitle"
          letterAnimation="word"
          animation={TextAnimations.title}
          exitAnimation={TextAnimations.copyOut}
          exitFrame={exitFrame}
        >
          {club.name}
        </AnimatedText>
      }
    />
  );
};
