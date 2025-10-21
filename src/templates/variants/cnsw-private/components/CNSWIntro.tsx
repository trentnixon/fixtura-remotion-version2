import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import {
  getCompositionConfig,
  getHardcodedSpacing,
} from "../utils/compositionConfig";

export const CNSWIntro: React.FC = () => {
  const { metadata, sponsors, club } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const { fontClasses, selectedPalette } = useThemeContext();

  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;

  // === DATA PREPARATION ===
  const byLineValue = club.name || " ";
  const currentConfig = getCompositionConfig(metadata.compositionId);
  const topLine = currentConfig.topLine.value;
  const bottomLine = currentConfig.bottomLine.value;

  // === LETTER SPACING ASSIGNMENT ===
  const snugLetterSpacingTopLine = getHardcodedSpacing(topLine, "intro"); // Hardcoded lookup
  const snugLetterSpacingBottomLine = getHardcodedSpacing(bottomLine, "intro"); // Hardcoded lookup

  return (
    <>
      <AbsoluteFill>
        <Img
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Cricket_Ground_Outline_3ec66a78e3.png"
          className="cricket-ground-outline"
          style={{
            width: "1080px",
            height: "1080px",
            objectFit: "cover",
            position: "absolute",
            top: "-250px",
            left: "430px",
            zIndex: 0,
            opacity: 0.3,
          }}
        />
      </AbsoluteFill>

      <div className="flex flex-col items-center justify-center h-full w-full px-8 py-8">
        <div
          className=" flex flex-col items-center justify-center"
          style={{
            height: "1200px",
            width: "100%",
          }}
        >
          {/* SNUG-FIT TITLE */}
          <div className="overflow-hidden mt-[-2.5em] w-[90%] mb-8 flex justify-center">
            <AnimatedText
              type="subtitle"
              variant="onContainerTitle"
              letterAnimation="none"
              animation={TextAnimations.clubName}
              exitAnimation={TextAnimations.introOut}
              exitFrame={TextAnimations.introExitFrame}
              fontFamily={fontClasses.subtitle?.family}
              style={{
                color: "#ffffff",
                whiteSpace: "nowrap",
                width: "100%",
                letterSpacing: "0.06em",
                textAlign: "center",
              }}
            >
              {byLineValue.toUpperCase()}
            </AnimatedText>
          </div>

          {/* SECOND LINE */}
          <div className="overflow-hidden mt-[-1.5em] flex flex-col items-center justify-center w-full">
            <div className="w-[80%]">
              <AnimatedText
                type="title"
                variant="onContainerTitle"
                letterAnimation="none"
                animation={TextAnimations.mainTitle}
                exitAnimation={TextAnimations.introOut}
                exitFrame={TextAnimations.introExitFrame}
                fontFamily={fontClasses.title?.family}
                style={{
                  color: selectedPalette.container.secondary,
                  textTransform: "uppercase",
                  fontSize: "12em",
                  whiteSpace: "nowrap",
                  width: "100%",
                  letterSpacing: snugLetterSpacingTopLine,
                  textAlign: "left",
                }}
              >
                {topLine}
              </AnimatedText>
            </div>
            <div className="w-[80%]">
              <AnimatedText
                type="title"
                variant="onContainerTitle"
                letterAnimation="none"
                animation={TextAnimations.mainTitle}
                exitAnimation={TextAnimations.introOut}
                exitFrame={TextAnimations.introExitFrame}
                fontFamily={fontClasses.title?.family}
                style={{
                  color: "#ffffff",
                  textTransform: "uppercase",
                  fontSize: "8em",
                  whiteSpace: "nowrap",
                  width: "100%",
                  letterSpacing: snugLetterSpacingBottomLine,
                  textAlign: "left",
                }}
              >
                {bottomLine}
              </AnimatedText>
            </div>
          </div>
        </div>
        {sponsors?.primary?.[0]?.logo?.url && (
          <div className="w-[80%] mt-8">
            <div className="w-full h-full flex justify-start items-start max-h-[150px] max-w-[150px]">
              <AnimatedImage
                src={sponsors.primary[0].logo.url}
                alt={sponsors.primary[0].name || ""}
                width="auto"
                height="auto"
                fit="contain"
                animation={LogoAnimations.introIn}
                exitAnimation={LogoAnimations.introOut}
                exitFrame={LogoAnimations.introExitFrame}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
