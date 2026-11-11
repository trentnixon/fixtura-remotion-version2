import type React from "react";
import { LiteFixtureSeparatorClassic } from "../layout/LiteFixtureSeparator-Classic";
import { LiteFixtureSeparatorClassicTwoColumn } from "../layout/LiteFixtureSeparator-ClassicTwoColumn";
import { LiteFixtureSeparatorMudgeeraba } from "../layout/LiteFixtureSeparator-Mudgeeraba";
import { LiteGradeHeaderBrickWork } from "../layout/LiteGradeHeader-BrickWork";
import { LiteGradeHeaderBroadcastPro } from "../layout/LiteGradeHeader-BroadcastPro";
import { LiteGradeHeaderBroadcastProRounded } from "../layout/LiteGradeHeader-BroadcastProRounded";
import { LiteGradeHeaderCNSW } from "../layout/LiteGradeHeader-CNSW";
import { LiteGradeHeaderClassic } from "../layout/LiteGradeHeader-Classic";
import { LiteGradeHeaderClassicTwoColumn } from "../layout/LiteGradeHeader-ClassicTwoColumn";
import { LiteGradeHeaderMudgeeraba } from "../layout/LiteGradeHeader-Mudgeeraba";
import { LiteGradeHeaderNightSession } from "../layout/LiteGradeHeader-NightSession";
import { LiteGradeHeaderScoreline } from "../layout/LiteGradeHeader-Scoreline";
import { LiteMatchCard } from "../layout/LiteMatchCard";
import { LiteMatchCardBrickWork } from "../layout/LiteMatchCard-BrickWork";
import { LiteMatchCardBroadcastPro } from "../layout/LiteMatchCard-BroadcastPro";
import { LiteMatchCardBroadcastProRounded } from "../layout/LiteMatchCard-BroadcastProRounded";
import { LiteMatchCardClassic } from "../layout/LiteMatchCard-Classic";
import { LiteMatchCardClassicTwoColumn } from "../layout/LiteMatchCard-ClassicTwoColumn";
import { LiteMatchCardMudgeeraba } from "../layout/LiteMatchCard-Mudgeeraba";
import { LiteMatchCardNightSession } from "../layout/LiteMatchCard-NightSession";
import { LiteMatchCardScoreline } from "../layout/LiteMatchCard-Scoreline";
import type { MatchResult } from "../../results/_types/types";
import { RESULTS_LITE_PER_SCREEN } from "./resultsLiteConstants";

export type ResultsLiteLayoutProfile =
  | "stackedGap"
  | "classicSeparated"
  | "classicTwoColumnAnimated"
  | "mudgeerabaSeparated"
  | "broadcastProGap"
  | "cnswRows"
  | "scorelineLedger"
  | "nightSessionLedger";

export type ResultsLiteGradePlacement = "none" | "header" | "inlineFirstCard";

export type ResultsLiteMatchCardProps = {
  match: MatchResult;
  index: number;
  gradeHeader?: string;
};

export type ResultsLiteFixtureSeparatorProps = {
  fixtureIndex: number;
};

export type ResultsLiteVariantComponents = {
  MatchCard: React.FC<ResultsLiteMatchCardProps>;
  GradeHeader?: React.FC<{ gradeName: string }>;
  FixtureSeparator?: React.FC<Partial<ResultsLiteFixtureSeparatorProps>>;
};

export type ResultsLiteFooterKind = "plain" | "cricketSponsor";

export type ResultsLiteVariantConfig = {
  profile: ResultsLiteLayoutProfile;
  gradePlacement: ResultsLiteGradePlacement;
  fixturesPerScreen?: number;
  components: ResultsLiteVariantComponents;
  footer: ResultsLiteFooterKind;
  sponsorStripKey?: string;
  /** Stacked-gap rows use px-8 and optional gap between fixtures. */
  stackedGapPx?: number;
  assetJustifyCenter?: boolean;
};

export const RESULTS_LITE_VARIANT_IDS = [
  "basic",
  "brickWork",
  "classic",
  "classicTwoColumn",
  "cnsw",
  "sixersThunder",
  "mudgeeraba",
  "broadcastPro",
  "broadcastProRounded",
  "scoreline",
  "nightSession",
] as const;

export type ResultsLiteVariantId = (typeof RESULTS_LITE_VARIANT_IDS)[number];

export const RESULTS_LITE_COMPOSITION_VARIANT_KEYS = [
  "basic",
  "brickwork",
  "classic",
  "twocolumnclassic",
  "cnsw",
  "cnswprivate",
  "sixers",
  "thunder",
  "mudgeeraba",
  "broadcastpro",
  "broadcastprorounded",
  "scoreline",
  "nightsession",
] as const;

export type ResultsLiteCompositionVariantKey =
  (typeof RESULTS_LITE_COMPOSITION_VARIANT_KEYS)[number];

const COMPOSITION_KEY_TO_VARIANT_ID: Record<
  ResultsLiteCompositionVariantKey,
  ResultsLiteVariantId
> = {
  basic: "basic",
  brickwork: "brickWork",
  classic: "classic",
  twocolumnclassic: "classicTwoColumn",
  cnsw: "cnsw",
  cnswprivate: "cnsw",
  sixers: "sixersThunder",
  thunder: "sixersThunder",
  mudgeeraba: "mudgeeraba",
  broadcastpro: "broadcastPro",
  broadcastprorounded: "broadcastProRounded",
  scoreline: "scoreline",
  nightsession: "nightSession",
};

export const resolveResultsLiteVariantId = (
  compositionKey: string,
): ResultsLiteVariantId => {
  const resolved =
    COMPOSITION_KEY_TO_VARIANT_ID[
      compositionKey as ResultsLiteCompositionVariantKey
    ];
  if (!resolved) {
    throw new Error(`Unknown Results Lite composition key: ${compositionKey}`);
  }
  return resolved;
};

const STACKED_GAP_DEFAULTS = {
  stackedGapPx: 30,
  assetJustifyCenter: true,
} as const;

export const RESULTS_LITE_VARIANT_CONFIG: Record<
  ResultsLiteVariantId,
  ResultsLiteVariantConfig
> = {
  basic: {
    profile: "stackedGap",
    gradePlacement: "inlineFirstCard",
    components: { MatchCard: LiteMatchCard },
    footer: "plain",
    ...STACKED_GAP_DEFAULTS,
  },
  brickWork: {
    profile: "stackedGap",
    gradePlacement: "header",
    components: {
      GradeHeader: LiteGradeHeaderBrickWork,
      MatchCard: LiteMatchCardBrickWork,
    },
    footer: "plain",
    ...STACKED_GAP_DEFAULTS,
  },
  classic: {
    profile: "classicSeparated",
    gradePlacement: "header",
    components: {
      GradeHeader: LiteGradeHeaderClassic,
      MatchCard: LiteMatchCardClassic,
      FixtureSeparator: LiteFixtureSeparatorClassic,
    },
    footer: "plain",
  },
  classicTwoColumn: {
    profile: "classicTwoColumnAnimated",
    gradePlacement: "header",
    components: {
      GradeHeader: LiteGradeHeaderClassicTwoColumn,
      MatchCard: LiteMatchCardClassicTwoColumn,
      FixtureSeparator: LiteFixtureSeparatorClassicTwoColumn,
    },
    footer: "plain",
  },
  cnsw: {
    profile: "cnswRows",
    gradePlacement: "header",
    components: {
      GradeHeader: LiteGradeHeaderCNSW,
      /** CNSW rows use `LiteMatchRowCNSW` inside the parameterized display. */
      MatchCard: LiteMatchCard,
    },
    footer: "plain",
  },
  sixersThunder: {
    profile: "stackedGap",
    gradePlacement: "inlineFirstCard",
    components: { MatchCard: LiteMatchCard },
    footer: "plain",
    ...STACKED_GAP_DEFAULTS,
  },
  mudgeeraba: {
    profile: "mudgeerabaSeparated",
    gradePlacement: "header",
    components: {
      GradeHeader: LiteGradeHeaderMudgeeraba,
      MatchCard: LiteMatchCardMudgeeraba,
      FixtureSeparator: LiteFixtureSeparatorMudgeeraba,
    },
    footer: "plain",
  },
  broadcastPro: {
    profile: "broadcastProGap",
    gradePlacement: "header",
    components: {
      GradeHeader: LiteGradeHeaderBroadcastPro,
      MatchCard: LiteMatchCardBroadcastPro,
    },
    footer: "plain",
  },
  broadcastProRounded: {
    profile: "broadcastProGap",
    gradePlacement: "header",
    components: {
      GradeHeader: LiteGradeHeaderBroadcastProRounded,
      MatchCard: LiteMatchCardBroadcastProRounded,
    },
    footer: "plain",
  },
  scoreline: {
    profile: "scorelineLedger",
    gradePlacement: "header",
    components: {
      GradeHeader: LiteGradeHeaderScoreline,
      MatchCard: LiteMatchCardScoreline,
    },
    footer: "cricketSponsor",
    sponsorStripKey: "scorelineResultsSponsorStrip",
  },
  nightSession: {
    profile: "nightSessionLedger",
    gradePlacement: "header",
    components: {
      GradeHeader: LiteGradeHeaderNightSession,
      MatchCard: LiteMatchCardNightSession,
    },
    footer: "cricketSponsor",
    sponsorStripKey: "nightSessionResultsSponsorStrip",
  },
};

export const getResultsLiteVariantConfig = (
  variantId: ResultsLiteVariantId,
): ResultsLiteVariantConfig => {
  const config = RESULTS_LITE_VARIANT_CONFIG[variantId];
  if (!config) {
    throw new Error(`Unknown Results Lite variant id: ${variantId}`);
  }
  return config;
};

export const getResultsLiteFixturesPerScreen = (
  variantId: ResultsLiteVariantId,
): number => {
  return (
    getResultsLiteVariantConfig(variantId).fixturesPerScreen ??
    RESULTS_LITE_PER_SCREEN
  );
};
