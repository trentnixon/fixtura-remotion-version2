import {
  VerticalHeaderLogoTitle,
  VerticalHeaderLogoTitleName,
} from "../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../components/images";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  BroadcastProRoundedHeadlineSecondary,
  BroadcastProRoundedHeadlineTitle,
  getBroadcastProRoundedHeaderSecondaryLine,
} from "./headline";

const COMPOSITIONS_WITHOUT_HEADER_SECONDARY = new Set([
  "CricketResultSingle",
  "CricketUpcoming",
]);

export const BroadcastProRoundedMainHeader = () => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const imageRadius =
    layout.borderRadius.image ?? layout.borderRadius.container;
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;

  const { timings } = data;

  const exitFrame = timings.FPS_MAIN ? timings.FPS_MAIN - 30 : 0;

  const hideSecondaryLine = COMPOSITIONS_WITHOUT_HEADER_SECONDARY.has(
    metadata.compositionId,
  );
  const secondaryLine = hideSecondaryLine
    ? ""
    : getBroadcastProRoundedHeaderSecondaryLine(metadata, club.name);

  const OrgLogo = () => (
    <div
      className={`mx-auto mb-5 size-[104px] shrink-0 overflow-hidden bg-white p-2.5 shadow-xl ${imageRadius}`}
    >
      <div
        className={`flex h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden ${imageRadius}`}
      >
        {club.logo?.url ? (
          <AnimatedImage
            src={club.logo.url}
            width="100%"
            height="100%"
            maxWidth="100%"
            maxHeight="100%"
            fit="contain"
            className={`max-h-full max-w-full object-contain ${imageRadius}`}
            animation={LogoAnimations.introIn}
            exitAnimation={LogoAnimations.introOut}
            exitFrame={exitFrame}
          />
        ) : null}
      </div>
    </div>
  );

  const titleBlock = (
    <BroadcastProRoundedHeadlineTitle
      text={metadata.title}
      variant="mainHeader"
      letterAnimation="none"
      animation={TextAnimations.title}
      exitAnimation={TextAnimations.copyOut}
      exitFrame={exitFrame}
    />
  );

  const headerProps = {
    height: heights.header,
    alignment: "center" as const,
    Logo: <OrgLogo />,
    Title: titleBlock,
  };

  if (hideSecondaryLine) {
    return <VerticalHeaderLogoTitle {...headerProps} Name={null} />;
  }

  return (
    <VerticalHeaderLogoTitleName
      {...headerProps}
      Name={
        <BroadcastProRoundedHeadlineSecondary
          text={secondaryLine}
          variant="mainHeader"
          animation={TextAnimations.title}
          exitAnimation={TextAnimations.copyOut}
          exitFrame={exitFrame}
        />
      }
    />
  );
};
