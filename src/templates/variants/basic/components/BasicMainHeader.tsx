// BasicMain.tsx

import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { TwoColumnHeaderTitle } from "../../../../components/layout/main/header";
import {
  IntroAnimationOutConfig,
  MainAnimationInConfig,
  MainTitleAnimationInConfig,
} from "./AnimationConfig";
import { AnimatedImage } from "../../../../components/images";
import { ImageAnimationConfig } from "../../../../components/images/config";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { AnimationConfig } from "../../../../components/typography/config/animations";

export const BasicMainHeader = () => {
  const { layout, fontClasses } = useThemeContext();
  const { club, metadata, data } = useVideoDataContext();
  const { heights } = layout;
  const { timings } = data;

  const exitFrame = timings.FPS_MAIN - 30;
  return (
    <TwoColumnHeaderTitle
      height={heights.header}
      alignment="center"
      Logo={
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-full flex  items-center max-h-[150px] max-w-[150px]">
            <AnimatedImage
              src={club.Logo.url}
              width={club.Logo.width}
              height={club.Logo.height}
              fit="contain"
              animation={MainAnimationInConfig as ImageAnimationConfig}
              exitAnimation={IntroAnimationOutConfig as ImageAnimationConfig}
              exitFrame={exitFrame}
            />
          </div>
        </div>
      }
      Title={
        <AnimatedText
          textAlign="center"
          type="subtitle"
          variant="onBackgroundMain"
          letterAnimation="none"
          animation={MainTitleAnimationInConfig as AnimationConfig}
          exitAnimation={IntroAnimationOutConfig as AnimationConfig}
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
          variant="onBackgroundDark"
          letterAnimation="word"
          animation={MainTitleAnimationInConfig as AnimationConfig}
          exitAnimation={IntroAnimationOutConfig as AnimationConfig}
          exitFrame={exitFrame}
        >
          {club.Name}
        </AnimatedText>
      }
    />
  );
};
