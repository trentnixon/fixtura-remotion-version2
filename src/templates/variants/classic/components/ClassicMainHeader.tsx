import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { InlineHeaderLogoTitle } from "../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../components/images";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { SplitColourEdge } from "../design";

export const ClassicMainHeader = () => {
  const { layout, fonts, fontClasses } = useThemeContext();
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;

  const { heights } = layout;
  const { timings } = data;

  const exitFrame = timings.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;
  const headerTitleFont =
    fonts?.title?.family ??
    fonts?.subtitle?.family ??
    fontClasses?.heading?.family ??
    "Impact";

  return (
    <div className="relative h-full w-full">
      <SplitColourEdge
        orientation="horizontal"
        placement="bottom"
        animationDelay={15}
      />
      <div className="relative z-10 h-full w-full">
        <InlineHeaderLogoTitle
          height={heights.header}
          alignment="center"
          rowClassName="gap-1.5"
          Name={null}
          Logo={
            club.logo?.url ? (
              <div className="flex h-[110px] w-[110px] shrink-0 items-center justify-center">
                <AnimatedImage
                  src={club.logo.url}
                  width="auto"
                  height="auto"
                  fit="contain"
                  className="max-h-[110px] max-w-[110px] rounded-none"
                  animation={LogoAnimations.introIn}
                  exitAnimation={LogoAnimations.introOut}
                  exitFrame={exitFrame}
                />
              </div>
            ) : null
          }
          Title={
            <AnimatedText
              textAlign="left"
              type="titleSmall"
              variant="onContainerTitle"
              letterAnimation="none"
              animation={TextAnimations.title}
              exitAnimation={TextAnimations.copyOut}
              exitFrame={exitFrame}
              fontFamily={headerTitleFont}
              className="!mt-0 !px-0 !leading-none !font-bold whitespace-nowrap"
              style={{
                fontFamily: `${headerTitleFont}, sans-serif`,
                fontWeight: 700,
              }}
            >
              {metadata.title}
            </AnimatedText>
          }
        />
      </div>
    </div>
  );
};
