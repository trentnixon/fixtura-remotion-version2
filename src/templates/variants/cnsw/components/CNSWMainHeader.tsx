/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatedText } from "../../../../components/typography/AnimatedText";
//import { AnimatedImage } from "../../../../components/images";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  getHeaderConfig,
  getLeagueTitleConfig,
} from "../utils/compositionConfig";
import { AbsoluteFill, Img } from "remotion";

export const CNSWMainHeader = () => {
  const { layout, fontClasses, selectedPalette } = useThemeContext();
  const { metadata, data, video } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  const { heights } = layout;
  const { timings } = data;
  const competitionName = video.fixtureCategory;
  // Get configuration using utility functions
  const headerConfig = getHeaderConfig(metadata.compositionId);
  const leagueTitleConfig = getLeagueTitleConfig(video.fixtureCategory);

  // Apply header-specific styling to match the image design
  const leagueTitle = {
    ...leagueTitleConfig,
    fontSize: "1.5em",
    color: "#ffffff",
  };

  const topLine = {
    ...headerConfig.topLine,
    fontSize: headerConfig.topLine.headerFontSize || "7em",
    color: selectedPalette.container.secondary, // Use theme color instead of CSS var
  };

  const bottomLine = {
    ...headerConfig.bottomLine,
    fontSize: headerConfig.bottomLine.headerFontSize || "7em",
    color: "#ffffff",
  };

  const exitFrame = timings.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;

  return (
    <div
      className="w-full flex flex-col items-center justify-center relative"
      style={{ height: `${heights.header}px` }}
    >
      {/* Background with circular elements */}
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

      {/* Logo */}
      {/*       <div className="absolute top-4 left-4 z-20">
        <div className="w-full h-full flex items-center rounded-none max-h-[120px] max-w-[150px]">
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
      </div> */}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-end w-full h-full relative z-10">
        {/* LEAGUE TITLE - Top line */}
        <div className="mb-0">
          <AnimatedText
            textAlign="center"
            type="subtitle"
            variant="onContainerTitle"
            letterAnimation="none"
            animation={TextAnimations.title}
            exitAnimation={TextAnimations.copyOut}
            exitFrame={exitFrame}
            fontFamily={fontClasses.subtitle?.family}
            style={{
              color: "#ffffff",
              textTransform: "uppercase",
              fontSize: leagueTitle.fontSize,
              whiteSpace: "nowrap",
              letterSpacing: leagueTitle.spacing,
              textAlign: "center",
              fontWeight: "300",
            }}
          >
            {/* {leagueTitle.value} */}
            {competitionName}
          </AnimatedText>
        </div>
        <div>
          {/* MAIN TITLE - Middle line */}
          <div className="mb-2">
            <AnimatedText
              textAlign="center"
              type="title"
              variant="onContainerTitle"
              letterAnimation="none"
              animation={TextAnimations.title}
              exitAnimation={TextAnimations.copyOut}
              exitFrame={exitFrame}
              fontFamily={fontClasses.title?.family}
              style={{
                color: selectedPalette.container.secondary,
                textTransform: "uppercase",
                fontSize: topLine.fontSize,
                whiteSpace: "nowrap",
                letterSpacing: topLine.spacing,
                textAlign: "center",
                fontWeight: "900",
              }}
            >
              {topLine.value}
            </AnimatedText>
          </div>

          {/* SUBTITLE - Bottom line */}
          <div>
            <AnimatedText
              textAlign="center"
              type="title"
              variant="onContainerTitle"
              letterAnimation="none"
              animation={TextAnimations.title}
              exitAnimation={TextAnimations.copyOut}
              exitFrame={exitFrame}
              fontFamily={fontClasses.title?.family}
              style={{
                color: "#ffffff",
                textTransform: "uppercase",
                fontSize: bottomLine.fontSize,
                whiteSpace: "nowrap",
                letterSpacing: bottomLine.spacing,
                textAlign: "center",
                fontWeight: "900",
              }}
            >
              {bottomLine.value}
            </AnimatedText>
          </div>
        </div>
      </div>
    </div>
  );
};
