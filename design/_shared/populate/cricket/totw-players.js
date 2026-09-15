import { formatRosterPlayerName } from "./roster-rows.js";

const POSITION_LABELS = {
  topscorer: "Top Scorer",
  higheststrikerate: "Highest Strike Rate",
  mostwickets: "Most Wickets",
  besteconomy: "Best Economy",
  topallrounder: "Top All-Rounder",
  bestoftherest: "12th Man",
  wicketKeeper: "Wicket-Keeper",
};

/** @param {Record<string, unknown>} player */
const getRoleLabel = (player) => {
  const position = player.categoryDetail?.position ?? "";
  const positionLabel =
    POSITION_LABELS[position] ??
    String(position).replace(/([a-z])([A-Z])/g, "$1 $2");
  return `${player.category} · ${positionLabel}`;
};

/** @param {Record<string, unknown>} player */
const formatStats = (player) => {
  const position = player.categoryDetail?.position ?? "";

  if (
    (position === "topscorer" ||
      position === "higheststrikerate" ||
      position === "bestoftherest") &&
    player.batting
  ) {
    const { runs, balls, strikeRate, notOut } = player.batting;
    const main = notOut ? `${runs}*` : String(runs);
    const suffix = balls > 0 ? `(${balls})` : "";
    const subline = strikeRate > 0 ? `SR ${Number(strikeRate).toFixed(1)}` : "";
    return { main, suffix, subline, kind: "batting" };
  }

  if (
    (position === "mostwickets" || position === "besteconomy") &&
    player.bowling
  ) {
    const { wickets, runs, overs, economy } = player.bowling;
    return {
      main: `${wickets}/${runs}`,
      suffix: overs > 0 ? `(${overs})` : "",
      subline: economy > 0 ? `Econ ${Number(economy).toFixed(2)}` : "",
      kind: "bowling",
    };
  }

  if (position === "topallrounder" && player.batting && player.bowling) {
    const { runs, balls, notOut } = player.batting;
    const main = notOut ? `${runs}*` : String(runs);
    const suffix = balls > 0 ? `(${balls})` : "";
    const subline = `${player.bowling.wickets}/${player.bowling.runs} (${player.bowling.overs})`;
    return { main, suffix, subline, kind: "allrounder" };
  }

  if (position === "wicketKeeper" && player.fielding) {
    return {
      main: `${player.fielding.catches} ct`,
      suffix: "",
      subline: `${player.fielding.stumpings} st`,
      kind: "fielding",
    };
  }

  return { main: "", suffix: "", subline: "", kind: "empty" };
};

const resolveDensity = (count) => {
  if (count <= 7) {
    return "normal";
  }
  if (count <= 10) {
    return "compact";
  }
  return "tight";
};

/**
 * @param {Record<string, unknown>} player
 * @param {HTMLElement} container
 * @param {HTMLTemplateElement} template
 */
function appendTotwPlayerRow(player, container, template) {
  const fragment = template.content.cloneNode(true);
  const entry = fragment.querySelector(".totw-entry");
  const img = fragment.querySelector(".totw-mark img");
  const role = fragment.querySelector(".totw-role");
  const name = fragment.querySelector(".totw-name");
  const team = fragment.querySelector(".totw-team");
  const figure = fragment.querySelector(".totw-figure");
  const subline = fragment.querySelector(".totw-subline");
  const stats = formatStats(player);

  if (role instanceof HTMLElement) {
    role.textContent = getRoleLabel(player);
  }
  if (name instanceof HTMLElement) {
    const displayName = formatRosterPlayerName(String(player.player ?? ""));
    name.textContent = displayName;
    name.title = displayName;
  }
  if (team instanceof HTMLElement) {
    team.textContent = player.primaryTeam ?? player.club?.name ?? "";
  }
  if (figure instanceof HTMLElement) {
    figure.textContent = "";
    const main = document.createElement("span");
    main.textContent = stats.main;
    figure.appendChild(main);
    if (stats.suffix) {
      const balls = document.createElement("span");
      balls.className = "totw-balls";
      balls.textContent = stats.suffix;
      figure.appendChild(balls);
    }
  }
  if (subline instanceof HTMLElement) {
    subline.textContent = stats.subline;
    subline.dataset.empty = stats.subline ? "false" : "true";
  }

  const logoUrl = player.club?.logo?.url ?? "";
  if (img instanceof HTMLImageElement && logoUrl) {
    img.src = logoUrl;
    img.hidden = false;
    img.alt = `${player.primaryTeam ?? "Team"} logo`;
  }

  if (entry instanceof HTMLElement) {
    container.appendChild(fragment);
  }
}

/** @param {Record<string, unknown>[]} players @param {ParentNode} [root] */
export function mountScorelineTotwPlayers(players, root = document) {
  root.querySelectorAll(".totw-category").forEach((band) => {
    if (!(band instanceof HTMLElement)) {
      return;
    }

    const value = band.querySelector(".totw-category-value");
    band.dataset.empty = value?.textContent?.trim() ? "false" : "true";
  });

  const doc =
    root instanceof Document ? root : (root.ownerDocument ?? document);
  const template = doc.getElementById("totw-row-template");
  if (!(template instanceof HTMLTemplateElement)) {
    return;
  }

  const density = resolveDensity(players.length);
  const columns = root.querySelectorAll("[data-totw-column]");
  const legacy = root.querySelector("[data-totw-rows]");

  if (columns.length >= 2) {
    const splitAt = Math.ceil(players.length / 2);
    const batches = [players.slice(0, splitAt), players.slice(splitAt)];

    columns.forEach((column, index) => {
      if (!(column instanceof HTMLElement)) {
        return;
      }
      column.innerHTML = "";
      column.dataset.density = density;
      for (const player of batches[index] ?? []) {
        appendTotwPlayerRow(player, column, template);
      }
    });

    const columnsWrap = root.querySelector(".totw-columns");
    if (columnsWrap instanceof HTMLElement) {
      columnsWrap.dataset.density = density;
    }
    return;
  }

  if (!(legacy instanceof HTMLElement)) {
    return;
  }

  legacy.innerHTML = "";
  legacy.dataset.density = density;
  for (const player of players) {
    appendTotwPlayerRow(player, legacy, template);
  }
}
