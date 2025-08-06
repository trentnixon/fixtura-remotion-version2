// src/compositions/cricket/sponsorFooter/index.tsx

import { AnimatedImage } from "../../../components/images/AnimatedImage";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { AssignSponsors } from "../composition-types";

export const SponsorFooter = ({
  assignSponsors,
}: {
  assignSponsors: AssignSponsors;
}) => {
  const animationContext = useAnimationContext();
  const videoDataContext = useVideoDataContext();

  if (!assignSponsors) {
    console.warn("[SponsorFooter] Missing match or assignSponsors");
    return null;
  }
  if (!animationContext || !videoDataContext) {
    console.warn("[SponsorFooter] Missing animation or video data context");
    return null;
  }
  //const { assignSponsors } = match;
  const { animations } = animationContext;
  const { data } = videoDataContext;
  if (!animations || !animations.image?.sponsor?.logo) {
    console.warn("[SponsorFooter] Missing logo animations");
    return null;
  }
  if (!data || !data.timings) {
    console.warn("[SponsorFooter] Missing video data or timings");
    return null;
  }
  const LogoAnimations = animations.image.sponsor.logo;

  const defaultSponsorList = createFlatSponsorList(assignSponsors);
  return (
    <div className="flex flex-row justify-start gap-4 items-center my-2 px-8">
      <IncludePrimarySponsor />
      {defaultSponsorList.map((sponsor, idx) => {
        // Only grade and competition have id and name
        const key = "id" in sponsor ? sponsor.id : idx;

        if (!sponsor?.logo?.url) {
          return null;
        }
        return (
          <div key={key}>
            <AnimatedImage
              src={sponsor?.logo?.url || ""}
              alt={""}
              width={sponsor?.logo?.width || 100}
              height={sponsor?.logo?.height || 100}
              fit="contain"
              animation={LogoAnimations.introIn}
              exitAnimation={LogoAnimations.introOut}
              animationDelay={idx * 5}
              exitFrame={300}
            />
          </div>
        );
      })}
    </div>
  );
};

const IncludePrimarySponsor = () => {
  const videoDataContext = useVideoDataContext();
  const animationContext = useAnimationContext();
  if (!videoDataContext || !animationContext) {
    console.warn(
      "[IncludePrimarySponsor] Missing animation or video data context",
    );
    return null;
  }
  const { sponsors } = videoDataContext;
  const { animations } = animationContext;
  if (!sponsors || !sponsors.primary) {
    console.warn("[IncludePrimarySponsor] Missing sponsors or primary");
    return null;
  }
  if (!animations || !animations.image?.sponsor?.logo) {
    console.warn("[IncludePrimarySponsor] Missing logo animations");
    return null;
  }
  const LogoAnimations = animations.image.sponsor.logo;
  const primaryArray = Object.values(sponsors.primary);
  if (primaryArray.length > 0 && primaryArray[0]) {
    if (!primaryArray[0]?.logo?.url) {
      console.warn("[IncludePrimarySponsor] Primary sponsor missing logo url");
      return null;
    }
    return (
      <div className="w-full h-full ok justify-center items-center max-h-[100px] max-w-[100px]">
        <AnimatedImage
          src={primaryArray[0].logo.url || ""}
          alt={primaryArray[0].name || ""}
          width={"auto"}
          height={"auto"}
          fit="contain"
          animation={LogoAnimations.introIn}
          exitAnimation={LogoAnimations.introOut}
          exitFrame={300}
        />
      </div>
    );
  }
  return null;
};

function createFlatSponsorList(assignSponsors: AssignSponsors) {
  const { competition = [], grade = [], team = [] } = assignSponsors;
  return [...competition, ...grade, ...team];
}
