// BasicMain.tsx

import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { VerticalHeaderLogoNameTitle } from "../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../components/images";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

export const ClassicMainHeader = () => {
  const { layout, fontClasses } = useThemeContext();
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;

  const { heights } = layout;
  const { timings } = data;

  const exitFrame = timings.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;
  return (
    <VerticalHeaderLogoNameTitle
      height={heights.header}
      alignment="center"
      Logo={
        <div className="w-full h-full flex justify-center items-center mt-2 mb-2">
          <div className="w-full h-full flex justify-center items-center rounded-none p-2 max-h-[100px] max-w-[120px]">
            <AnimatedImage
              src={club.logo?.url}
              width={"auto"}
              height={"auto"}
              fit="contain"
              className="rounded-none max-h-[100px] max-w-[120px] text-center"
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
          className="mt-0"
        >
          {metadata.title}
        </AnimatedText>
      }
      Name={null}
    />
  );
};
