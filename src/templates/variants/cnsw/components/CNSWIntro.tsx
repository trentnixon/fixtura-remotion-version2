import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";

export const CNSWIntro: React.FC = () => {
  const { metadata, sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const { fontClasses, selectedPalette } = useThemeContext();

  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;

  const leagueTableTitle = {
    "Men's Premier Cricket": {
      value: "MEN'S PREMIER CRICKET",
      spacing: "0.22em",
    },
    "Women's Premier Cricket": {
      value: "WOMEN'S PREMIER CRICKET",
      spacing: "0.22em",
    },
    "Junior Premier Cricket": {
      value: "JUNIOR PREMIER CRICKET",
      spacing: "0.22em",
    },
    "Senior Premier Cricket": {
      value: "SENIOR PREMIER CRICKET",
      spacing: "0.22em",
    },
    "Mixed Premier Cricket": {
      value: "MIXED PREMIER CRICKET",
      spacing: "0.22em",
    },
  };

  // === COMBINED VALUE AND SPACING OBJECT ===
  const assetConfig = {
    CricketLadder: {
      topLine: {
        value: "LEAGUE",
        spacing: "0.25em",
      },
      bottomLine: {
        value: "TABLES",
        spacing: "0.66em",
      },
    },
    CricketResults: {
      topLine: {
        value: "Weekend",
        spacing: "0.069em",
      },
      bottomLine: {
        value: "RESULTS",
        spacing: "0.46em",
      },
    },
    CricketUpcoming: {
      topLine: {
        value: "FIXTURES",
        spacing: "0.065em",
      },
      bottomLine: {
        value: "SCHEDULE",
        spacing: "0.3em",
      },
    },
    CricketTop5Bowling: {
      topLine: {
        value: "Leading",
        spacing: "0.155em",
      },
      bottomLine: {
        value: "Wicket takers",
        spacing: "0.055em",
      },
    },
    CricketTop5Batting: {
      topLine: {
        value: "Leading",
        spacing: "0.155em",
      },
      bottomLine: {
        value: "Run-Scorers",
        spacing: "0.07em",
      },
    },
    CricketRoster: {
      topLine: {
        value: "Team",
        spacing: "0.67em",
      },
      bottomLine: {
        value: "Roster",
        spacing: "0.62em",
      },
    },
    CricketResultSingle: {
      topLine: {
        value: "Weekend",
        spacing: "0.67em",
      },
      bottomLine: {
        value: "Result",
        spacing: "0.62em",
      },
    },
  };

  console.log("[metadata.compositionId]", metadata.compositionId);
  const currentConfig =
    assetConfig[metadata.compositionId as keyof typeof assetConfig] ||
    assetConfig["CricketResultSingle"];

  const topLine = currentConfig.topLine.value;
  const bottomLine = currentConfig.bottomLine.value;

  // Get title config based on metadata or default to Men's Premier Cricket
  const titleConfig = leagueTableTitle["Men's Premier Cricket"] || {
    value: "MEN'S PREMIER CRICKET",
    spacing: "0.8em",
  };

  const snugLetterSpacingTitle = titleConfig.spacing;
  const snugLetterSpacingTopLine = currentConfig.topLine.spacing;
  const snugLetterSpacingBottomLine = currentConfig.bottomLine.spacing;

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
          <div className="overflow-hidden mt-[-2.5em] w-[60%] mb-8 flex justify-center">
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
                letterSpacing: snugLetterSpacingTitle,
                textAlign: "left",
              }}
            >
              {titleConfig.value}
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
