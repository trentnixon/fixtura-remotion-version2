import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { VerticalHeaderLogoTitleName } from "../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../components/images";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { VideoMetadata } from "../../../../core/types/data/videoData";

/**
 * Secondary line under main title: videoTitle, else titleSplit joined, else club name.
 */
const getHeaderSecondaryLine = (
  metadata: VideoMetadata,
  clubName: string,
): string => {
  const videoTitle = metadata.videoTitle?.trim();
  if (videoTitle) return videoTitle;

  const parts = metadata.titleSplit?.filter(Boolean) ?? [];
  if (parts.length > 0) return parts.join(" · ");

  return clubName;
};

export const BroadcastProMainHeader = () => {
  const { layout, fontClasses, fonts } = useThemeContext();
  const { heights } = layout;
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;

  const { timings } = data;

  const exitFrame = timings.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;

  const secondaryLine = getHeaderSecondaryLine(metadata, club.name);

  /** Teko / Rajdhani must match loaded theme fonts; weight normal avoids fallback when only Regular TTF is loaded. */
  const titleFontFamily =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";
  const subtitleFontFamily =
    fontClasses?.subheading?.family ??
    fonts?.subtitle?.family ??
    fonts?.copy?.family ??
    "Rajdhani";

  const OrgLogo = () => (
    <div className="mx-auto mb-5 size-[104px] shrink-0 overflow-hidden rounded-full bg-white p-2.5 shadow-xl">
      <div className="flex h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-full">
        {club.logo?.url ? (
          <AnimatedImage
            src={club.logo.url}
            width="100%"
            height="100%"
            maxWidth="100%"
            maxHeight="100%"
            fit="contain"
            className="max-h-full max-w-full object-contain"
            animation={LogoAnimations.introIn}
            exitAnimation={LogoAnimations.introOut}
            exitFrame={exitFrame}
          />
        ) : null}
      </div>
    </div>
  );

  return (
    <VerticalHeaderLogoTitleName
      height={heights.header}
      alignment="center"
      Logo={<OrgLogo />}
      Title={
        <AnimatedText
          textAlign="center"
          type="title"
          variant="onContainerTitle"
          letterAnimation="none"
          animation={TextAnimations.title}
          exitAnimation={TextAnimations.copyOut}
          exitFrame={exitFrame}
          fontFamily={titleFontFamily}
          style={{
            fontFamily: `${titleFontFamily}, sans-serif`,
            fontWeight: 400,
          }}
          className="!font-normal font-teko !text-[124px] !leading-[0.82] uppercase tracking-tight drop-shadow-2xl"
        >
          {metadata.title}
        </AnimatedText>
      }
      Name={
        <div className="mt-4 flex justify-center w-full">
          <div className="inline-flex bg-white/10 px-6 py-2 backdrop-blur-md max-w-[95%]">
            <AnimatedText
              textAlign="center"
              fontFamily={subtitleFontFamily}
              type="metadataMedium"
              variant="onContainerCopy"
              letterAnimation="none"
              animation={TextAnimations.title}
              exitAnimation={TextAnimations.copyOut}
              exitFrame={exitFrame}
              style={{
                fontFamily: `${subtitleFontFamily}, sans-serif`,
                fontWeight: 600,
              }}
              className="font-rajdhani whitespace-nowrap uppercase tracking-[0.2em] font-semibold"
            >
              {secondaryLine}
            </AnimatedText>
          </div>
        </div>
      }
    />
  );
};
