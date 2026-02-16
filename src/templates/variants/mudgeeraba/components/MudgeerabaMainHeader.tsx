// MudgeerabaMainHeader.tsx

import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { VerticalHeaderTitleLogoName } from "../../../../components/layout/main/header";
//import { AnimatedImage } from "../../../../components/images";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

export const MudgeerabaMainHeader = () => {
  const { layout, fontClasses } = useThemeContext();
  const { club, metadata, data, } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  //const LogoAnimations = animations.image.main.title.logo;

  const { heights } = layout;
  const timings = data?.timings;
  const exitFrame = timings?.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;

  /*   const OrgLogo = () => (
      <div className="w-full flex justify-center items-center">
        <div className="flex justify-center items-center rounded-none max-h-[80px] max-w-[120px]">
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
    ); */

  return (
    <VerticalHeaderTitleLogoName
      height={heights.header}
      alignment="center"
      Logo={null}
      Title={
        <div className="mt-8 mb-4">
          <AnimatedText
            textAlign="center"
            type="titleSmall"
            variant="onContainerTitle"
            letterAnimation="none"
            animation={TextAnimations.title}
            exitAnimation={TextAnimations.copyOut}
            exitFrame={exitFrame}
            fontFamily={fontClasses.title?.family}
          >
            {metadata.title}
          </AnimatedText>
        </div>
      }
      Name={
        <AnimatedText
          fontFamily={fontClasses.subtitle?.family}
          type="subtitle"
          textAlign="center"
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
