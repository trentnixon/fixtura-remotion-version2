import React from "react";
import { SelectTemplateBackground } from "../../../../components/backgrounds";
import { ImageBackground as ImageBg } from "../../../../components/backgrounds/variants/Image";
import { matchLegacyIngress } from "../../../../components/backgrounds/variants/Generated/catalogue";
import { resolveValidatedBackgroundRoute } from "../../../../components/backgrounds/resolveValidatedBackgroundRoute";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import {
  resolveBroadcastProImageDefaults,
  type BroadcastProModeName,
} from "../../../types/broadcast-pro/image-defaults";

const isBroadcastProMode = (value: unknown): value is BroadcastProModeName =>
  value === "light" ||
  value === "lightAlt" ||
  value === "dark" ||
  value === "darkAlt";

export const BroadcastProRoundedBackground: React.FC = () => {
  const { video, metadata } = useVideoDataContext();
  const match = matchLegacyIngress(video.templateVariation ?? {});
  const route = resolveValidatedBackgroundRoute(match);

  if (route.kind === "image") {
    const mode = isBroadcastProMode(video.templateVariation?.mode)
      ? video.templateVariation.mode
      : "light";
    const image = video.templateVariation?.image;
    const hero = video.media?.heroImage;
    const stillRatio =
      hero?.width && hero.height
        ? hero.width / hero.height
        : image?.width && image.height
          ? image.width / image.height
          : undefined;

    return (
      <ImageBg
        templateDefaults={resolveBroadcastProImageDefaults({
          mode,
          image: image
            ? {
                effectType: image.type,
                overlayStyle: image.overlayStyle,
                overlayOpacity: image.overlayOpacity,
                width: image.width,
                height: image.height,
                ratio:
                  image.ratio === "landscape" ||
                  image.ratio === "portrait" ||
                  image.ratio === "square"
                    ? image.ratio
                    : undefined,
              }
            : undefined,
          stillRatio,
          compositionId: metadata.compositionId,
        })}
      />
    );
  }

  return <SelectTemplateBackground />;
};
