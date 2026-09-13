const parsePlayerEntry = (raw) => {
  const value = String(raw ?? "").trim();
  if (!value || /no players allocated/i.test(value)) {
    return { emptyRoster: true, name: value || "No players allocated" };
  }

  const lines = value.split("\n");
  let name = lines[0]?.trim() ?? "";
  const badges = [];

  const role = lines[1]?.trim().toLowerCase() ?? "";
  if (role === "c") {
    badges.push({ label: "C", captain: true });
  } else if (role === "vc") {
    badges.push({ label: "VC", captain: false });
  }

  if (/\(WK\)/i.test(name)) {
    badges.push({ label: "WK", captain: false });
    name = name.replace(/\(WK\)/gi, "").trim();
  }

  return { emptyRoster: false, name, badges };
};

const resolveDensity = (count) => {
  if (count <= 11) {
    return "normal";
  }
  if (count <= 14) {
    return "compact";
  }
  return "tight";
};

/** @param {string[]} players */
export function mountScorelineRosterRows(players) {
  const container = document.querySelector("[data-roster-rows]");
  const template = document.getElementById("roster-row-template");
  if (
    !(container instanceof HTMLElement) ||
    !(template instanceof HTMLTemplateElement)
  ) {
    return;
  }

  container.innerHTML = "";

  if (
    players.length === 0 ||
    players.every((entry) => parsePlayerEntry(entry).emptyRoster)
  ) {
    const fragment = template.content.cloneNode(true);
    const entry = fragment.querySelector(".roster-entry");
    const row = fragment.querySelector(".roster-row");
    const index = row?.querySelector(".roster-index");
    const player = row?.querySelector(".roster-player");
    const badges = row?.querySelector(".roster-badges");
    const crease = fragment.querySelector(".roster-crease");

    if (row instanceof HTMLElement) {
      row.dataset.emptyRoster = "true";
    }
    if (index instanceof HTMLElement) {
      index.hidden = true;
    }
    if (badges instanceof HTMLElement) {
      badges.hidden = true;
    }
    if (player instanceof HTMLElement) {
      player.textContent = "No players allocated to line-up";
    }
    if (crease instanceof HTMLElement) {
      crease.hidden = true;
    }
    if (entry instanceof HTMLElement) {
      container.appendChild(fragment);
    }
    return;
  }

  container.dataset.density = resolveDensity(players.length);

  players.forEach((rawPlayer, playerIndex) => {
    const parsed = parsePlayerEntry(rawPlayer);
    if (parsed.emptyRoster) {
      return;
    }

    const fragment = template.content.cloneNode(true);
    const entry = fragment.querySelector(".roster-entry");
    const row = fragment.querySelector(".roster-row");
    const index = row?.querySelector(".roster-index");
    const player = row?.querySelector(".roster-player");
    const badges = row?.querySelector(".roster-badges");

    if (index instanceof HTMLElement) {
      index.textContent = String(playerIndex + 1);
    }
    if (player instanceof HTMLElement) {
      player.textContent = parsed.name;
      player.title = parsed.name;
    }
    if (badges instanceof HTMLElement) {
      parsed.badges.forEach((badge) => {
        const chip = document.createElement("span");
        chip.className = badge.captain
          ? "roster-badge roster-badge--captain"
          : "roster-badge";
        chip.textContent = badge.label;
        badges.appendChild(chip);
      });
      if (parsed.badges.length === 0) {
        badges.hidden = true;
      }
    }

    if (entry instanceof HTMLElement) {
      container.appendChild(fragment);
    }
  });
}
