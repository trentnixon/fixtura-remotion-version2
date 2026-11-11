/**
 * @param {string} text
 */
const runsFromScore = (text) => {
  const value = String(text).trim();
  const slashPart = value.split("/")[1];
  if (slashPart) {
    return slashPart.replace(/\D.*$/, "").trim();
  }

  return value.match(/\d+/)?.[0] ?? "";
};

/**
 * Optional oversized score watermark for single-match hero assets.
 *
 * @param {HTMLElement} canvas
 */
export function syncScoreWatermark(canvas) {
  if (!(canvas instanceof HTMLElement)) {
    return;
  }

  if (canvas.dataset.scoreWatermark !== "enabled") {
    canvas.querySelector(".score-watermark")?.remove();
    return;
  }

  const homeScore =
    canvas.querySelector('[data-hydrate="match-1-home-score"]')?.textContent ??
    "";
  const awayScore =
    canvas.querySelector('[data-hydrate="match-1-away-score"]')?.textContent ??
    "";
  const homeRuns = Number(runsFromScore(homeScore)) || 0;
  const awayRuns = Number(runsFromScore(awayScore)) || 0;
  const watermarkScore =
    awayRuns > homeRuns ? runsFromScore(awayScore) : runsFromScore(homeScore);

  if (!watermarkScore) {
    return;
  }

  let watermark = canvas.querySelector(".score-watermark");
  if (!(watermark instanceof HTMLElement)) {
    watermark = document.createElement("div");
    watermark.className = "score-watermark";
    watermark.setAttribute("aria-hidden", "true");
    canvas.append(watermark);
  }

  watermark.textContent = watermarkScore;
}
