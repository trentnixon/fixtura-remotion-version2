// MudgeerabaMainHeader.tsx

import { useVideoConfig } from "remotion";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  TITLE_SCREEN_BASE_FONT_PX,
  useFittedFontSize,
} from "../../../../components/typography/utils/useFittedFontSize";
import {
  getHeaderPanelContentWidth,
  HEADER_NAME_INNER_PADDING_PX,
  HEADER_TITLE_INNER_PADDING_PX,
  LayeredAngularHeader,
} from "../design/LayeredAngularHeader";

/** Mudgeeraba theme `titleSmall` cap at default 16px root. */
const MUDGEERABA_HEADER_TITLE_MAX_FONT_PX = 4 * TITLE_SCREEN_BASE_FONT_PX;

const HEADER_TEXT_CLASS =
  "!m-0 !px-0 w-full max-w-full leading-tight whitespace-normal break-words";

export const MudgeerabaMainHeader = () => {
  const { layout, fontClasses } = useThemeContext();
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const { width } = useVideoConfig();

  const { heights } = layout;
  const timings = data?.timings;
  const exitFrame = timings?.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;

  const title = metadata.title ?? "";
  const clubName = club.name ?? "";
  const titleFontFamily = fontClasses.title?.family ?? "Unbounded";
  const nameFontFamily = fontClasses.subtitle?.family ?? "Unbounded";

  const titleContentWidth = getHeaderPanelContentWidth(
    width,
    undefined,
    HEADER_TITLE_INNER_PADDING_PX,
  );
  const nameContentWidth = getHeaderPanelContentWidth(
    width,
    undefined,
    HEADER_NAME_INNER_PADDING_PX,
  );

  const fittedTitleFontSize = useFittedFontSize({
    text: title,
    fontFamily: titleFontFamily,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "-0.025em",
    maxFontSize: MUDGEERABA_HEADER_TITLE_MAX_FONT_PX,
    minFontSize: 18,
    withinWidth: titleContentWidth,
  });

  const fittedNameFontSize = useFittedFontSize({
    text: clubName,
    fontFamily: nameFontFamily,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    maxFontSize: 24,
    minFontSize: 14,
    withinWidth: nameContentWidth,
  });

  const titleFontSize =
    fittedTitleFontSize ?? MUDGEERABA_HEADER_TITLE_MAX_FONT_PX;
  const nameFontSize = fittedNameFontSize ?? 24;

  return (
    <LayeredAngularHeader
      height={heights.header}
      exitFrame={exitFrame}
      title={
        <div
          className="w-full overflow-hidden text-center"
          style={{ maxWidth: titleContentWidth }}
        >
          <AnimatedText
            textAlign="center"
            type="titleSmall"
            variant="onBackgroundMain"
            letterAnimation="none"
            animation={TextAnimations.title}
            exitAnimation={TextAnimations.copyOut}
            exitFrame={exitFrame}
            fontFamily={titleFontFamily}
            className={HEADER_TEXT_CLASS}
            style={{ fontSize: titleFontSize, lineHeight: 1.05 }}
          >
            {title}
          </AnimatedText>
        </div>
      }
      name={
        <div
          className="w-full overflow-hidden text-center"
          style={{ maxWidth: nameContentWidth }}
        >
          <AnimatedText
            fontFamily={nameFontFamily}
            type="subtitle"
            textAlign="center"
            variant="onBackgroundMain"
            letterAnimation="none"
            animation={TextAnimations.title}
            exitAnimation={TextAnimations.copyOut}
            exitFrame={exitFrame}
            className={`${HEADER_TEXT_CLASS} text-balance uppercase tracking-wide`}
            style={{ fontSize: nameFontSize, lineHeight: 1.1 }}
          >
            {clubName}
          </AnimatedText>
        </div>
      }
    />
  );
};
