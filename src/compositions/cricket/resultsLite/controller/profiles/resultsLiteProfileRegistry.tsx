import type React from "react";
import type { ResultsLiteLayoutProfile } from "../resultsLiteVariantMatrix";
import type { ResultsLiteProfileProps } from "./resultsLiteProfileTypes";
import { StackedGapResultsLiteProfile } from "./StackedGapResultsLiteProfile";
import { ClassicSeparatedResultsLiteProfile } from "./ClassicSeparatedResultsLiteProfile";
import { ClassicTwoColumnResultsLiteProfile } from "./ClassicTwoColumnResultsLiteProfile";
import { MudgeerabaSeparatedResultsLiteProfile } from "./MudgeerabaSeparatedResultsLiteProfile";
import { BroadcastProGapResultsLiteProfile } from "./BroadcastProGapResultsLiteProfile";
import { CnswRowsResultsLiteProfile } from "./CnswRowsResultsLiteProfile";
import { ScorelineLedgerResultsLiteProfile } from "./ScorelineLedgerResultsLiteProfile";
import { NightSessionLedgerResultsLiteProfile } from "./NightSessionLedgerResultsLiteProfile";

export const RESULTS_LITE_PROFILE_RENDERERS: Record<
  ResultsLiteLayoutProfile,
  React.FC<ResultsLiteProfileProps>
> = {
  stackedGap: StackedGapResultsLiteProfile,
  classicSeparated: ClassicSeparatedResultsLiteProfile,
  classicTwoColumnAnimated: ClassicTwoColumnResultsLiteProfile,
  mudgeerabaSeparated: MudgeerabaSeparatedResultsLiteProfile,
  broadcastProGap: BroadcastProGapResultsLiteProfile,
  cnswRows: CnswRowsResultsLiteProfile,
  scorelineLedger: ScorelineLedgerResultsLiteProfile,
  nightSessionLedger: NightSessionLedgerResultsLiteProfile,
};

export const renderResultsLiteLayoutProfile = (
  profile: ResultsLiteLayoutProfile,
  props: ResultsLiteProfileProps,
): React.ReactElement => {
  const Profile = RESULTS_LITE_PROFILE_RENDERERS[profile];
  return <Profile {...props} />;
};
