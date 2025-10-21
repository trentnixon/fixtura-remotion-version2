import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  getHeaderConfig,
  getLeagueTitleConfig,
  getHardcodedSpacing,
  VIDEO_DIMENSIONS,
} from "../utils/compositionConfig";
import { AbsoluteFill, Img } from "remotion";

export const CNSWMainHeader = () => {
  const { layout, fontClasses, selectedPalette } = useThemeContext();
  const { metadata, data, video, club } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  const { heights } = layout;
  const { timings } = data;
  // const gradeName = video.fixtureCategory;
  // === DATA PREPARATION ===
  const competitionName = club.name || video.fixtureCategory;
  const headerConfig = getHeaderConfig(metadata.compositionId);
  const topLineValue = headerConfig.topLine.value;
  const bottomLineValue = headerConfig.bottomLine.value;

  // === DYNAMIC SPACING CALCULATION (for league title only) ===
  const containerWidth = VIDEO_DIMENSIONS.WIDTH * 0.9; // 972px (90% of 1080px)
  const leagueTitleFontSize = 30; // Estimated actual rendered size (1.5em ≈ 30px)
  const avgCharWidth = 0.5; // Calibrated for league title spacing
  const leagueTitleConfig = getLeagueTitleConfig(
    competitionName,
    containerWidth,
    leagueTitleFontSize,
    avgCharWidth,
  );

  // === LETTER SPACING ASSIGNMENT ===
  const leagueTitleSpacing = leagueTitleConfig.spacing; // Dynamic for league title
  const topLineSpacing = getHardcodedSpacing(topLineValue, "header"); // Hardcoded lookup
  const bottomLineSpacing = getHardcodedSpacing(bottomLineValue, "header"); // Hardcoded lookup

  // === STYLING CONFIGURATION ===
  const leagueTitle = {
    value: leagueTitleConfig.value,
    fontSize: "1.5em",
    color: "#ffffff",
    spacing: leagueTitleSpacing,
  };

  const topLine = {
    value: topLineValue,
    fontSize: headerConfig.topLine.headerFontSize || "7em",
    color: selectedPalette.container.secondary,
    spacing: topLineSpacing,
  };

  const bottomLine = {
    value: bottomLineValue,
    fontSize: headerConfig.bottomLine.headerFontSize || "7em",
    color: "#ffffff",
    spacing: bottomLineSpacing,
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

      {/* Logo section commented out for now */}

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
            {leagueTitle.value}
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
