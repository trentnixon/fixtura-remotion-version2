import {
  applyScorelineBackdrop,
  applyScorelineMode,
  persistScorelineBackdrop,
  persistScorelineMode,
  readScorelineBackdrop,
  readScorelineMode,
  scorelineModes,
} from "./scoreline-mode.js";

/**
 * Dev chrome: mode + backdrop controls for Scoreline prototypes (outside canvas).
 *
 * @param {HTMLElement} canvas
 */
export function mountScorelineModeControls(canvas) {
  if (!(canvas instanceof HTMLElement)) {
    return;
  }

  const main = canvas.closest(".design-main");
  if (!(main instanceof HTMLElement)) {
    return;
  }

  if (main.querySelector("[data-scoreline-mode-controls]")) {
    return;
  }

  const bar = document.createElement("div");
  bar.className = "scoreline-mode-controls";
  bar.dataset.scorelineModeControls = "true";

  const modeLabel = document.createElement("label");
  modeLabel.textContent = "Mode";
  const modeSelect = document.createElement("select");
  modeSelect.setAttribute("aria-label", "Scoreline theme mode");

  for (const modeId of Object.keys(scorelineModes)) {
    const option = document.createElement("option");
    option.value = modeId;
    option.textContent = modeId;
    modeSelect.append(option);
  }

  const backdropLabel = document.createElement("label");
  backdropLabel.textContent = "Backdrop";
  const backdropSelect = document.createElement("select");
  backdropSelect.setAttribute("aria-label", "Preview backdrop");

  for (const [value, label] of [
    ["light", "Light neutral"],
    ["dark", "Dark neutral"],
    ["club", "Club gradient"],
  ]) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    backdropSelect.append(option);
  }

  modeLabel.append(modeSelect);
  backdropLabel.append(backdropSelect);
  bar.append(modeLabel, backdropLabel);

  const tabs = main.querySelector(".design-tabs");
  if (tabs instanceof HTMLElement) {
    tabs.insertAdjacentElement("afterend", bar);
  } else {
    main.prepend(bar);
  }

  const sync = () => {
    const modeId = readScorelineMode();
    const backdropId = readScorelineBackdrop();
    modeSelect.value = modeId;
    backdropSelect.value = backdropId;
    applyScorelineMode(canvas, modeId);
    applyScorelineBackdrop(document, backdropId);
  };

  modeSelect.addEventListener("change", () => {
    const modeId =
      /** @type {import("./scoreline-mode.js").ScorelineModeId} */ (
        modeSelect.value
      );
    persistScorelineMode(modeId);
    applyScorelineMode(canvas, modeId);
  });

  backdropSelect.addEventListener("change", () => {
    const backdropId =
      /** @type {import("./scoreline-mode.js").ScorelineBackdropId} */ (
        backdropSelect.value
      );
    persistScorelineBackdrop(backdropId);
    applyScorelineBackdrop(document, backdropId);
  });

  sync();
}
