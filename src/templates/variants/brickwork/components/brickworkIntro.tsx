// BrickworkIntro.tsx

import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { VerticalStackLogoTitleName } from "../../../../components/layout/titleScreen/index";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  BRICKWORK_TITLE_BASE_CLASS,
  useBrickworkTypography,
} from "../design";
import { useFitTitleFontSize } from "../utils/useFitTitleFontSize";

/**
 * BrickworkIntro Component
 *
 * Display title uses Allerta Stencil with measured fitting when text overflows.
 * Club name uses Roboto copy role.
 */
export const BrickworkIntro: React.FC = () => {
  const { club, metadata, sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = useThemeContext();
  const { displayFont, copyFont } = useBrickworkTypography();

  const title = metadata.title ?? "";
  const { containerRef, textRef, fontSizeStyle } = useFitTitleFontSize(title);

  return (
    <VerticalStackLogoTitleName
      alignment="end"
      Logo={
        <div className="w-full h-full flex justify-center items-center max-h-[300px] max-w-[300px]">
          <AnimatedImage
            src={club.logo?.url || ""}
            alt={club.name}
            width={"auto"}
            height={"auto"}
            fit="contain"
            animation={LogoAnimations.introIn}
            exitAnimation={LogoAnimations.introOut}
            exitFrame={LogoAnimations.introExitFrame}
          />
        </div>
      }
      Title={
        <div
          ref={containerRef}
          className="overflow-hidden mb-4 w-full"
        >
          <div ref={textRef}>
            <AnimatedText
              textAlign="center"
              type="title"
              variant="onContainerTitle"
              letterAnimation="none"
              animation={TextAnimations.mainTitle}
              exitAnimation={TextAnimations.introOut}
              exitFrame={TextAnimations.introExitFrame}
              fontFamily={
                fontClasses.heading?.family ?? displayFont
              }
              className={BRICKWORK_TITLE_BASE_CLASS}
              style={fontSizeStyle}
            >
              {title}
            </AnimatedText>
          </div>
        </div>
      }
      Name={
        <div className="overflow-hidden">
          <AnimatedText
            type="subtitle"
            textAlign="center"
            variant="onContainerTitle"
            letterAnimation="none"
            animation={TextAnimations.clubName}
            exitAnimation={TextAnimations.introOut}
            exitFrame={TextAnimations.introExitFrame}
            fontFamily={fontClasses.subheading?.family ?? copyFont}
          >
            {club.name}
          </AnimatedText>
        </div>
      }
      PrimarySponsor={
        sponsors?.primary[0]?.logo?.url && (
          <div className="w-full h-full ok justify-center items-center max-h-[150px] max-w-[150px]">
            <AnimatedImage
              src={sponsors?.primary[0]?.logo?.url || ""}
              alt={sponsors?.primary[0]?.name || ""}
              width={"auto"}
              height={"auto"}
              fit="contain"
              animation={LogoAnimations.introIn}
              exitAnimation={LogoAnimations.introOut}
              exitFrame={LogoAnimations.introExitFrame}
            />
          </div>
        )
      }
    />
  );
};
