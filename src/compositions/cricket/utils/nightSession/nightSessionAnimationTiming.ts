/** Frames after the ledger panel reveal before inner content drops in. */
export const NIGHT_SESSION_LEDGER_COPY_DELAY = 6;

/** Frames after composition start before main header copy animates. */
export const NIGHT_SESSION_HEADER_COPY_DELAY = 5;

/** Ledger row shell — px slide so enter reads from the card slot, not the page top. */
export const NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX = 48;

/** Short gap between fixture row enters on one screen. */
export const NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES = 6;

/** Inner fixture sections (schedule, teams, context, etc.). */
export const NIGHT_SESSION_FIXTURE_INNER_ENTER_DISTANCE_PX = 36;

/** @deprecated use NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX */
export const NIGHT_SESSION_RESULTS_FIXTURE_ENTER_DISTANCE_PX =
  NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX;

/** @deprecated use NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES */
export const NIGHT_SESSION_RESULTS_FIXTURE_ROW_STAGGER_FRAMES =
  NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES;

/** @deprecated use NIGHT_SESSION_FIXTURE_INNER_ENTER_DISTANCE_PX */
export const NIGHT_SESSION_RESULTS_INNER_ENTER_DISTANCE_PX =
  NIGHT_SESSION_FIXTURE_INNER_ENTER_DISTANCE_PX;
