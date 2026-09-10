import React from "react";
import { Img } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { ScorelineCreaseRule } from "./crease/ScorelineCreaseRule";
import { ScorelineSurfaceGrain } from "./surface/ScorelineSurfaceGrain";
import { useScorelineTheme } from "../../../../compositions/cricket/utils/scoreline/useScorelineTheme";

export const ScorelineMainHeader: React.FC = () => {
  const { club, metadata } = useVideoDataContext();
  const theme = useScorelineTheme();
  const logoUrl = club.logo?.url ?? "";
  const eyebrow = metadata.videoTitle || metadata.titleSplit?.join(" · ") || "Results";
  const title = metadata.title || "Weekend Results";

  return (
    <div
      className="relative isolate flex h-full min-h-0 w-full flex-col overflow-hidden border border-[rgb(8_11_13/9%)]"
      style={{
        background:
          "linear-gradient(180deg, rgb(243 240 234 / 72%) 0%, rgb(243 240 234 / 48%) 100%)",
        boxShadow: "inset 0 1px 0 rgb(255 255 255 / 55%)",
      }}
    >
      <ScorelineSurfaceGrain opacity={0.035} />
      <div className="relative z-[1] flex min-h-0 flex-1 items-center px-7 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="grid h-14 w-14 flex-shrink-0 place-items-center overflow-hidden bg-white">
            {logoUrl ? (
              <Img src={logoUrl} alt="" className="max-h-[85%] max-w-[85%] object-contain" />
            ) : null}
          </div>
          <div className="min-w-0">
            <p
              className="font-source-sans m-0 truncate text-[15px] font-semibold uppercase tracking-[0.08em] text-[rgb(8_11_13/58%)]"
            >
              {club.name}
            </p>
          </div>
        </div>
        <div className="min-w-0 text-right">
          <p
            className="font-source-sans m-0 text-[13px] font-bold uppercase tracking-[0.14em] text-[rgb(8_11_13/58%)]"
          >
            {eyebrow}
          </p>
          <h1
            className="font-barlow-condensed m-0 truncate text-[42px] font-extrabold uppercase leading-none tracking-wide text-[rgb(8_11_13/92%)]"
          >
            {title}
          </h1>
        </div>
      </div>
      <div className="relative z-[1] px-7 pb-0">
        <ScorelineCreaseRule
          primaryColor={theme.clubPrimary}
          secondaryColor={theme.clubSecondary}
        />
      </div>
    </div>
  );
};
