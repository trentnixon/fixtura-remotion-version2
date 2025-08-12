import React from "react";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { TwoColumnVerticalHeaderLogoTitle } from "../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../components/images";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

export const ClassicMainHeaderRotated: React.FC = () => {
  const { fontClasses } = useThemeContext();
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;

  const { timings } = data;
  const exitFrame = timings.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;

  // Measure unrotated width and use it as min-height for the rotated block to prevent clipping
  const [rotatedMinHeight, setRotatedMinHeight] = React.useState<number>(0);
  const measureRef = React.useRef<HTMLDivElement | null>(null);
  React.useLayoutEffect(() => {
    if (measureRef.current) {
      setRotatedMinHeight(measureRef.current.offsetWidth);
    }
  }, [metadata.title, fontClasses.title?.family]);

  const TitleNode = (
    <div
      className="relative w-full flex justify-center items-center overflow-visible"
      style={{ minHeight: rotatedMinHeight ? rotatedMinHeight + 8 : undefined }}
    >
      <div style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}>
        <AnimatedText
          textAlign="center"
          type="subtitle"
          variant="onContainerTitle"
          letterAnimation="none"
          animation={TextAnimations.title}
          exitAnimation={TextAnimations.copyOut}
          exitFrame={exitFrame}
          fontFamily={fontClasses.title?.family}
          className="mt-0 whitespace-nowrap"
        >
          {metadata.title}
        </AnimatedText>
      </div>
      {/* Hidden measurement clone to compute natural width */}
      <div
        ref={measureRef}
        className="absolute invisible whitespace-nowrap pointer-events-none"
        style={{ left: -99999, top: -99999 }}
      >
        <AnimatedText
          textAlign="center"
          type="subtitle"
          variant="onContainerTitle"
          letterAnimation="none"
          animation={TextAnimations.title}
          exitAnimation={TextAnimations.copyOut}
          exitFrame={exitFrame}
          fontFamily={fontClasses.title?.family}
          className="mt-0 whitespace-nowrap"
        >
          {metadata.title}
        </AnimatedText>
      </div>
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
