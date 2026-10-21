import { useVideoConfig } from "remotion";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { InlineHeaderLogoTitle } from "../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../components/images";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  TITLE_SCREEN_BASE_FONT_PX,
  useFittedFontSize,
} from "../../../../components/typography/utils/useFittedFontSize";
import { SplitColourEdge } from "../design";

/** Classic `titleSmall` cap (`text-7xl`) at the 16px composition root. */
const CLASSIC_HEADER_TITLE_MAX_FONT_PX = 4.5 * TITLE_SCREEN_BASE_FONT_PX;
const CLASSIC_HEADER_LOGO_PX = 110;
/** `gap-1.5` between the logo and title. */
const CLASSIC_HEADER_ROW_GAP_PX = 6;
/** OneColumn `px-2` plus InlineHeaderLogoTitle `px-2`. */
const CLASSIC_HEADER_HORIZONTAL_INSET_PX = 32;

const getClassicHeaderTitleWidth = (
  compositionWidth: number,
  hasLogo: boolean,
): number => {
  const reserved =
    CLASSIC_HEADER_HORIZONTAL_INSET_PX +
    (hasLogo ? CLASSIC_HEADER_LOGO_PX + CLASSIC_HEADER_ROW_GAP_PX : 0);

  return Math.max(0, compositionWidth - reserved);
};

export const ClassicMainHeader = () => {
  const { layout, fonts, fontClasses } = useThemeContext();
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const { width } = useVideoConfig();
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
  const title = metadata.title ?? "";
  const hasLogo = Boolean(club.logo?.url);
  const fittedTitleFontSize = useFittedFontSize({
    text: title,
    fontFamily: headerTitleFont,
    fontWeight: 700,
    textTransform: "none",
    letterSpacing: "0em",
    maxFontSize: CLASSIC_HEADER_TITLE_MAX_FONT_PX,
    minFontSize: 20,
    withinWidth: getClassicHeaderTitleWidth(width, hasLogo),
    maxLines: 1,
  });
  const titleFontSize = fittedTitleFontSize ?? CLASSIC_HEADER_TITLE_MAX_FONT_PX;

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
                fontSize: titleFontSize,
              }}
            >
              {title}
            </AnimatedText>
          }
        />
      </div>
    </div>
  );
};
