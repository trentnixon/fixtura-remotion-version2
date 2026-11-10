import React from "react";
import { Img } from "remotion";

/** Watermarked crest backdrop for night-session rows/bands (Img layer, not CSS background-image). */
export const NightSessionTeamBandLogoBg: React.FC<{ logoUrl: string }> = ({
  logoUrl,
}) => (
  <>
    <Img src={logoUrl} alt="" className="team-band-logo-preload" />
    <Img src={logoUrl} alt="" className="team-band-logo-bg" aria-hidden />
  </>
);
