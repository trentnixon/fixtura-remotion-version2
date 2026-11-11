import React from "react";
import {
  resolveBackgroundIngress,
  SelectTemplateBackground,
} from "../../../../components/backgrounds";
import { ImageBackground as ImageBg } from "../../../../components/backgrounds/variants/Image";
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
  const { route } = resolveBackgroundIngress(video.templateVariation ?? {});

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
                effectType: image.type ?? undefined,
                overlayStyle: image.overlayStyle ?? undefined,
                overlayOpacity: image.overlayOpacity ?? undefined,
                width: image.width ?? undefined,
                height: image.height ?? undefined,
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
