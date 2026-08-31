export const THRESHOLD_SAME_ENV = Number(
  process.env.LUMINANCE_THRESHOLD_SAME_ENV ?? "0.01",
);

export const THRESHOLD_CROSS_ENV = Number(
  process.env.LUMINANCE_THRESHOLD_CROSS_ENV ?? "0.03",
);

export const LUMINANCE_FIXTURE_IDS = [
  "F01",
  "F02",
  "F03",
  "F04",
  "F05",
  "F06",
  "F07",
  "F08",
  "F09",
];

export const LUMINANCE_CANARY_FIXTURE_IDS = ["F01", "F06", "F09"];

export const BASELINE_DIR =
  "src/components/backgrounds/variants/Luminance/__baselines__";
