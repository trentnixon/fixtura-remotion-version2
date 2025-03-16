import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { FadeIn, SlideInLeft } from "../../../../components/containers";
import { ImageAnimationConfig } from "../../../../components/images/config";
import { ContainerAnimationConfig } from "../../../../components/containers/animations";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import {
  ClubNameAnimationInConfig,
  ImageAnimationInConfig,
  IntroAnimationOutConfig,
  IntroExitFrame,
  TitleAnimationInConfig,
} from "./AnimationConfig";

/**
 * BasicIntro Component
 *
 * A basic introduction template that showcases enhanced container styling options.
 * This template demonstrates how to style containers with various layout, text, and positioning options.
 */
export const BasicIntro: React.FC = () => {
  const { Video, Club } = useVideoDataContext();

  return (
    <AbsoluteFill>
      <div className="flex flex-col justify-center items-center h-full w-full px-12 py-8 overflow-auto">
        <div className="w-full h-full flex justify-center items-center max-h-[500px] max-w-[500px]">
          {/* Image Animation */}
          <AnimatedImage
            src={Club.Logo.url}
            alt={Club.Name}
            width={Club.Logo.width}
            height={Club.Logo.height}
            animation={ImageAnimationInConfig as ImageAnimationConfig}
            exitAnimation={IntroAnimationOutConfig as ImageAnimationConfig}
            exitFrame={IntroExitFrame}
          />
        </div>
        {/* Video Category  */}
        <AnimatedText
          type="title"
          variant="onBackgroundMain"
          letterAnimation="none"
          animation={TitleAnimationInConfig as AnimationConfig}
          exitAnimation={IntroAnimationOutConfig as AnimationConfig}
          exitFrame={IntroExitFrame}
        >
          {Video.Title}
        </AnimatedText>

        {/* Club or Association Name */}
        <SlideInLeft
          backgroundColor="main"
          type="basic"
          rounded="full"
          className="p-6 my-4 w-[80%]"
          animation={{
            easing: "bounce",
          }}
          exitAnimation={IntroAnimationOutConfig as ContainerAnimationConfig}
          exitFrame={IntroExitFrame}
        >
          <AnimatedText
            type="subtitle"
            variant="onBackgroundDark"
            letterAnimation="word"
            animation={ClubNameAnimationInConfig as AnimationConfig}
            exitAnimation={IntroAnimationOutConfig as AnimationConfig}
            exitFrame={IntroExitFrame}
          >
            {Club.Name}
          </AnimatedText>
        </SlideInLeft>
      </div>
    </AbsoluteFill>
  );
};
