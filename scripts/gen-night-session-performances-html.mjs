import fs from "node:fs";

const ROW_COUNT = 10;

/** @param {number} n */
function battingRow(n) {
  return `                    <!-- Ranked Player Row ${n} -->
                    <div class="leader-entry leader-unit">
                      <div class="leader-rank-bridge schedule-bridge">
                        <div
                          class="schedule-bridge__rule"
                          aria-hidden="true"
                        ></div>
                        <span
                          class="leader-rank leader-rank-tag schedule-lockup"
                          aria-hidden="true"
                          >${n}</span
                        >
                      </div>
                      <article class="leader-row gap-2">
                        <div class="leader-mark leader-cell">
                          <span class="mark-fallback" aria-hidden="true"></span>
                          <img
                            alt="Team logo"
                            data-hydrate="player-${n}-logo"
                            data-hydrate-attr="src"
                            onerror="this.hidden=true"
                          />
                        </div>
                        <div class="leader-copy leader-cell">
                          <p class="leader-name" data-hydrate="player-${n}-name">
                            Player
                          </p>
                          <p class="leader-team" data-hydrate="player-${n}-team">
                            Team
                          </p>
                        </div>
                        <p class="leader-figure">
                          <span data-hydrate="player-${n}-runs">0</span
                          ><span
                            data-hydrate="player-${n}-not-out"
                            data-hydrate-format="not-out"
                          ></span
                          ><span class="leader-balls"
                            >(<span data-hydrate="player-${n}-balls">0</span
                            >)</span
                          >
                        </p>
                      </article>
                    </div>`;
}

/** @param {number} n */
function bowlingRow(n) {
  return `                    <!-- Ranked Player Row ${n} -->
                    <div class="leader-entry leader-unit">
                      <div class="leader-rank-bridge schedule-bridge">
                        <div
                          class="schedule-bridge__rule"
                          aria-hidden="true"
                        ></div>
                        <span
                          class="leader-rank leader-rank-tag schedule-lockup"
                          aria-hidden="true"
                          >${n}</span
                        >
                      </div>
                      <article class="leader-row gap-2">
                        <div class="leader-mark leader-cell">
                          <span class="mark-fallback" aria-hidden="true"></span>
                          <img
                            alt="Team logo"
                            data-hydrate="player-${n}-logo"
                            data-hydrate-attr="src"
                            onerror="this.hidden=true"
                          />
                        </div>
                        <div class="leader-copy leader-cell">
                          <p class="leader-name" data-hydrate="player-${n}-name">
                            Player
                          </p>
                          <p class="leader-team" data-hydrate="player-${n}-team">
                            Team
                          </p>
                        </div>
                        <p class="leader-figure">
                          <span data-hydrate="player-${n}-wickets">0</span>/<span
                            data-hydrate="player-${n}-conceded"
                            >0</span
                          ><span class="leader-overs"
                            >(<span data-hydrate="player-${n}-overs">0</span
                            >)</span
                          >
                        </p>
                      </article>
                    </div>`;
}

/**
 * @param {string} top5Path
 * @param {string} outPath
 * @param {{
 *   assetSlug: string;
 *   fixture: string;
 *   title: string;
 *   discipline: "batting" | "bowling";
 *   headerEyebrow: string;
 *   headerTitle: string;
 * }} opts
 */
function buildFromTop5(top5Path, outPath, opts) {
  let html = fs.readFileSync(top5Path, "utf8");
  const rowFn = opts.discipline === "batting" ? battingRow : bowlingRow;
  const rows = Array.from({ length: ROW_COUNT }, (_, i) => rowFn(i + 1)).join(
    "\n\n",
  );

  html = html.replace(
    /<!-- Ranked Player Row 1 -->[\s\S]*?(?= {18}<\/div>\s*\n {16}<\/div>\s*\n {14}<\/main>)/,
    `${rows}\n`,
  );

  html = html.replace(
    /Handoff: night-session \/ cricket \/ top5-[a-z]+/,
    `Handoff: night-session / cricket / ${opts.assetSlug}`,
  );
  html = html.replace(
    /Fixture: testData\/samples\/Cricket\/Cricket_Top5[^\n]+/,
    `Fixture: testData/samples/Cricket/${opts.fixture}`,
  );
  html = html.replace(
    /<title>Night Session — Cricket Top 5 [^<]+<\/title>/,
    `<title>Night Session — Cricket ${opts.title}</title>`,
  );
  html = html.replace(
    /night-session-top5-(batting|bowling)\.css/,
    `night-session-performances-${opts.discipline}.css`,
  );
  html = html.replace(
    /<p class="header-eyebrow" data-hydrate="header-eyebrow">\s*[^<]+\s*<\/p>/,
    `<p class="header-eyebrow" data-hydrate="header-eyebrow">\n                    ${opts.headerEyebrow}\n                  </p>`,
  );
  html = html.replace(
    /<h1 class="header-title" data-hydrate="header-title">\s*[^<]+\s*<\/h1>/,
    `<h1 class="header-title" data-hydrate="header-title">\n                    ${opts.headerTitle}\n                  </h1>`,
  );
  html = html.replace(
    /assetSlug: "top5-[a-z]+"/,
    `assetSlug: "${opts.assetSlug}"`,
  );

  fs.writeFileSync(outPath, html);
}

const base = "design/variants/night-session/cricket";

buildFromTop5(
  `${base}/top5-batting.html`,
  `${base}/performances-batting.html`,
  {
    assetSlug: "performances-batting",
    fixture: "Cricket_BattingPerformances.json",
    title: "Batting Performances",
    discipline: "batting",
    headerEyebrow: "Batting Performances",
    headerTitle: "Weekend Batting",
  },
);

buildFromTop5(
  `${base}/top5-bowling.html`,
  `${base}/performances-bowling.html`,
  {
    assetSlug: "performances-bowling",
    fixture: "Cricket_BowlingPerformances.json",
    title: "Bowling Performances",
    discipline: "bowling",
    headerEyebrow: "Bowling Performances",
    headerTitle: "Weekend Bowling",
  },
);

console.log(`Wrote performances HTML (${ROW_COUNT} rows each).`);
