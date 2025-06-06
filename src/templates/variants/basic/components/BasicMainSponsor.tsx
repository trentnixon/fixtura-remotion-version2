// BasicMainSponsor.tsx

import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { IntroAnimationOutConfig } from "./OLD_AnimationConfig";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { MainTitleAnimationInConfig } from "./OLD_AnimationConfig";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const BasicMainSponsor = () => {
  const { layout, fontClasses } = useThemeContext();
  const { data } = useVideoDataContext();
  const { heights } = layout;
  const { timings } = data;

  const exitFrame = timings.FPS_MAIN - 30;
  return (
    <div
      className={`flex flex-col items-center justify-center ${heights.footer} `}
    >
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
        BasicMainSponsor
      </AnimatedText>
    </div>
  );
};
