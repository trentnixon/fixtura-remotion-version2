// BrickworkMainHeader.tsx

import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  BRICKWORK_HEADER_TITLE_BASE_CLASS,
  useBrickworkTypography,
} from "../design";
import { useFitTitleFontSize } from "../utils/useFitTitleFontSize";

export const BrickworkMainHeader = () => {
  const { layout, fontClasses } = useThemeContext();
  const { displayFont, copyFont } = useBrickworkTypography();
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;

  const { heights } = layout;
  const { timings } = data;
  const title = metadata.title ?? "";
  const { containerRef, textRef, fontSizeStyle } = useFitTitleFontSize(
    title,
    Boolean(title),
  );

  const exitFrame = timings.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;
  return (
    <div
      className="w-full p-0 justify-center flex items-center"
      style={{ height: `${heights.header}px` }}
    >
      <div className="flex justify-center items-center w-full p-2 gap-8">
        <div className="flex shrink-0 justify-center items-center">
          <div className="flex justify-center items-center rounded-none max-h-[120px] max-w-[150px]">
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
        <div className="flex min-w-0 flex-col justify-center items-start">
          <div ref={containerRef} className="w-full overflow-hidden">
            <div ref={textRef}>
              <AnimatedText
                textAlign="left"
                type="compositionName"
                variant="onContainerTitle"
                letterAnimation="none"
                animation={TextAnimations.title}
                exitAnimation={TextAnimations.copyOut}
                exitFrame={exitFrame}
                fontFamily={
                  fontClasses.compositionName?.family ??
                  fontClasses.heading?.family ??
                  displayFont
                }
                className={BRICKWORK_HEADER_TITLE_BASE_CLASS}
                style={fontSizeStyle}
              >
                {title}
              </AnimatedText>
            </div>
          </div>
          <AnimatedText
            fontFamily={fontClasses.subheading?.family ?? copyFont}
            type="compositionNameSmall"
            textAlign="left"
            variant="onContainerTitle"
            letterAnimation="word"
            animation={TextAnimations.title}
            exitAnimation={TextAnimations.copyOut}
            exitFrame={exitFrame}
          >
            {club.name}
          </AnimatedText>
        </div>
      </div>
    </div>
  );
};
