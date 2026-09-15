import {
  applyNightSessionBackdrop,
  applyNightSessionMode,
  nightSessionModes,
  persistNightSessionBackdrop,
  persistNightSessionMode,
  readNightSessionBackdrop,
  readNightSessionMode,
} from "./night-session-mode.js";

/**
 * Dev chrome: mode + backdrop controls for Night Session prototypes.
 *
 * @param {HTMLElement} canvas
 */
export function mountNightSessionModeControls(canvas) {
  if (!(canvas instanceof HTMLElement)) {
    return;
  }

  const main = canvas.closest(".design-main");
  if (!(main instanceof HTMLElement)) {
    return;
  }

  if (main.querySelector("[data-night-session-mode-controls]")) {
    return;
  }

  const bar = document.createElement("div");
  bar.className = "night-session-mode-controls";
  bar.dataset.nightSessionModeControls = "true";

  const modeLabel = document.createElement("label");
  modeLabel.textContent = "Mode";
  const modeSelect = document.createElement("select");
  modeSelect.setAttribute("aria-label", "Night Session theme mode");

  for (const modeId of Object.keys(nightSessionModes)) {
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
    const modeId = readNightSessionMode();
    const backdropId = readNightSessionBackdrop();
    modeSelect.value = modeId;
    backdropSelect.value = backdropId;
    applyNightSessionMode(canvas, modeId);
    applyNightSessionBackdrop(document, backdropId);
  };

  modeSelect.addEventListener("change", () => {
    const modeId =
      /** @type {import("./night-session-mode.js").NightSessionModeId} */ (
        modeSelect.value
      );
    persistNightSessionMode(modeId);
    applyNightSessionMode(canvas, modeId);
  });

  backdropSelect.addEventListener("change", () => {
    const backdropId =
      /** @type {import("./night-session-mode.js").NightSessionBackdropId} */ (
        backdropSelect.value
      );
    persistNightSessionBackdrop(backdropId);
    applyNightSessionBackdrop(document, backdropId);
  });

  sync();
}
