import React from "react";
import { useVideoConfig } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { VerticalStackTitleLogoName } from "../../../../components/layout/titleScreen/index";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  getTitleScreenContentWidth,
  TITLE_SCREEN_BASE_FONT_PX,
  useFittedFontSize,
} from "../../../../components/typography/utils/useFittedFontSize";

/** Mudgeeraba theme `text-[10em]` cap at default 16px root. */
const MUDGEERABA_TITLE_MAX_FONT_PX = 10 * TITLE_SCREEN_BASE_FONT_PX;

/**
 * MudgeerabaIntro Component
 *
 * Introduction template for Mudgeeraba variant.
 * Long asset titles shrink to fit; association names wrap within the frame.
 */
export const MudgeerabaIntro: React.FC = () => {
  const { club, metadata, sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = useThemeContext();
  const { width } = useVideoConfig();

  const title = metadata.title ?? "";
  const titleFontFamily = fontClasses.title?.family ?? "Unbounded";
  const nameFontFamily = fontClasses.subtitle?.family ?? "Unbounded";
  const contentWidth = getTitleScreenContentWidth(width);

  const fittedTitleFontSize = useFittedFontSize({
    text: title,
    fontFamily: titleFontFamily,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "-0.025em",
    maxFontSize: MUDGEERABA_TITLE_MAX_FONT_PX,
  });

  const titleFontSize = fittedTitleFontSize ?? MUDGEERABA_TITLE_MAX_FONT_PX;

  return (
    <VerticalStackTitleLogoName
      alignment="center"
      Logo={
        <div className="w-full h-full flex justify-center py-8 items-center max-h-[500px] max-w-[500px]">
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
          className="overflow-hidden mb-4 w-full"
          style={{ maxWidth: contentWidth }}
        >
          <AnimatedText
            textAlign="center"
            type="title"
            variant="onContainerTitle"
            letterAnimation="word"
            animation={TextAnimations.mainTitle}
            exitAnimation={TextAnimations.introOut}
            exitFrame={TextAnimations.introExitFrame}
            fontFamily={titleFontFamily}
            style={{ fontSize: titleFontSize }}
          >
            {title}
          </AnimatedText>
        </div>
      }
      Name={
        <div
          className="overflow-hidden w-full text-center"
          style={{ maxWidth: contentWidth }}
        >
          <AnimatedText
            type="titleSmall"
            textAlign="center"
            variant="onContainerTitle"
            letterAnimation="word"
            animation={TextAnimations.clubName}
            exitAnimation={TextAnimations.introOut}
            exitFrame={TextAnimations.introExitFrame}
            fontFamily={nameFontFamily}
            className="text-balance"
          >
            {club.name}
          </AnimatedText>
        </div>
      }
      PrimarySponsor={
        sponsors?.primary[0]?.logo?.url && (
          <div className="w-full h-full flex justify-center items-center max-h-[150px] max-w-[150px]">
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
