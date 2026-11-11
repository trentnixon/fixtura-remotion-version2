import { logoHasCrest } from "./crest.js";

/**
 * @param {ParentNode} root
 */
export function syncScorelineTotwLayout(root = document) {
  root.querySelectorAll(".totw-entry").forEach((entry, index) => {
    if (!(entry instanceof HTMLElement)) {
      return;
    }

    const img = entry.querySelector(".totw-mark img");
    const mark = entry.querySelector(".totw-mark");
    const name = entry.querySelector(".totw-name");

    if (mark instanceof HTMLElement) {
      mark.dataset.hasCrest = logoHasCrest(img) ? "true" : "false";
    }

    entry.dataset.empty = name?.textContent?.trim() ? "false" : "true";

    if (index === 0 && name?.textContent?.trim()) {
      entry.dataset.rank = "1";
    } else {
      delete entry.dataset.rank;
    }
  });
}
