// src/package/generated/scorelineBundledCss.ts
var SCORELINE_BUNDLED_CSS = `/* src/templates/variants/scoreline/styles/scoreline-polish.css */
/* Scoreline shared polish \u2014 tokens, surfaces, contrast, layout states */

.scoreline-canvas {
  /* Semantic surface inputs (refined by scoreline-theme.js) */
  --surface-strong-primary: var(--club-primary);
  --surface-strong-secondary: var(--club-secondary);
  --on-surface: #ffffff;
  --on-surface-muted: rgb(255 255 255 / 72%);
  --on-surface-label: rgb(255 255 255 / 68%);

  /* Contrast architecture */
  --contrast-score: var(--on-surface);
  --contrast-team: rgb(255 255 255 / 92%);
  --contrast-performance: rgb(8 11 13 / 88%);
  --contrast-performance-lead: rgb(8 11 13 / 92%);
  --contrast-performance-support: rgb(8 11 13 / 74%);
  --contrast-meta: rgb(8 11 13 / 68%);
  --contrast-sponsor: rgb(8 11 13 / 58%);
  --contrast-meta-on-surface: rgb(255 255 255 / 58%);
  --accent-on-light-primary: var(--club-primary);
  --accent-on-light-secondary: var(--club-secondary);

  /* Legacy aliases */
  --on-team: var(--on-surface);
  --on-team-muted: var(--on-surface-muted);
  --on-team-label: var(--on-surface-label);
  --text-meta: var(--contrast-meta);
  --text-meta-on-dark: var(--contrast-meta-on-surface);

  /* Depth tokens */
  --shadow-contact: 0 2px 4px rgb(8 11 13 / 10%);
  --shadow-elevated: 0 8px 24px rgb(8 11 13 / 14%);
  --border-optical-light: 1px solid rgb(255 255 255 / 18%);
  --border-optical-dark: 1px solid rgb(255 255 255 / 12%);
  --highlight-inset: inset 0 1px 0 rgb(255 255 255 / 14%);
  --highlight-inset-light: inset 0 1px 0 rgb(255 255 255 / 55%);
  --surface-gradient-angle: 118deg;

  /* Team band surfaces */
  --team-surface-primary: color-mix(
    in srgb,
    var(--surface-strong-primary) 88%,
    var(--ink)
  );
  --team-surface-secondary: color-mix(
    in srgb,
    var(--surface-strong-secondary) 88%,
    var(--ink)
  );
  --team-gradient-deep-primary: color-mix(
    in srgb,
    var(--surface-strong-primary) 68%,
    var(--ink)
  );
  --team-gradient-lift-primary: color-mix(
    in srgb,
    var(--surface-strong-primary) 82%,
    white
  );
  --team-gradient-deep-secondary: color-mix(
    in srgb,
    var(--surface-strong-secondary) 68%,
    var(--ink)
  );
  --team-gradient-lift-secondary: color-mix(
    in srgb,
    var(--surface-strong-secondary) 82%,
    white
  );

  /* Result bar */
  --result-gradient-edge: color-mix(in srgb, var(--ink) 86%, black);
  --result-gradient-core: color-mix(in srgb, var(--surface-ink) 90%, white);
  --shadow-result-bar: var(--highlight-inset), var(--shadow-contact);

  /* Logo wells */
  --well-border: 1px solid rgb(8 11 13 / 11%);
  --well-shadow: var(--shadow-contact);

  /* Team band inset */
  --team-band-pad: 14px;

  /* Sponsor strip */
  --sponsor-gradient-top: transparent;
  --sponsor-gradient-base: transparent;

  /* Surface texture (see design/_shared/textures/manifest.json) */
  --texture-noise-url: url("/design/_shared/textures/fine-noise.svg");
  --texture-noise-size: 256px 256px;
  --texture-noise-opacity: 0.05;
  --texture-noise-opacity-header: 0.035;
  --texture-noise-opacity-sponsor: 0.028;
  --texture-blend: soft-light;

  /* Club-band spotlight (transitional) */
  --surface-spot-size: ellipse 75% 55%;
  --surface-spot-y: 22%;
  --surface-spot-opacity: 10%;
  --team-spot-x: 28%;

  /* Crease motif \u2014 The Crease System */
  --crease-post-width: 2px;
  --crease-rule-height: 10px;
  --crease-post-height: 8px;
  --crease-rail-height: 2px;
  --crease-rule-height-emphasis: 12px;
  --crease-post-height-emphasis: 10px;
  --crease-rail-height-emphasis: 3px;
  --crease-rule-height-compact: 8px;
  --crease-post-height-compact: 6px;

  /* Header shell (integrated crease) */
  --zone-header-pad-bottom: 0px;
}

/* Hydration-only palette / debug binds \u2014 must not paint on canvas */
.scoreline-canvas .fixture-palette {
  display: none;
}

/* \u2014\u2014 Crease motif (shared across Scoreline assets) \u2014\u2014 */
.scoreline-canvas .crease-rule {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: var(--crease-rule-height);
  flex: 0 0 auto;
}

.scoreline-canvas .crease-post {
  width: var(--crease-post-width);
  height: var(--crease-post-height);
  flex: 0 0 var(--crease-post-width);
}

.scoreline-canvas .crease-post--primary {
  background: var(--club-primary);
}

.scoreline-canvas .crease-post--secondary {
  background: var(--club-secondary);
}

.scoreline-canvas .crease-rail {
  flex: 1 1 auto;
  display: flex;
  height: var(--crease-rail-height);
}

.scoreline-canvas .crease-rail__primary,
.scoreline-canvas .crease-rail__secondary {
  flex: 1 1 50%;
  height: var(--crease-rail-height);
}

.scoreline-canvas .crease-rail__primary {
  background: var(--club-primary);
}

.scoreline-canvas .crease-rail__secondary {
  background: var(--club-secondary);
}

/* Crease removed from footer \u2014 112px zone is sponsor-only (see .asset-footer). */
.scoreline-canvas .footer-crease {
  display: none;
}

.scoreline-canvas :is(.match-separator, .fixture-separator) {
  flex: 0 0 auto;
  margin: var(--space-4) 0;
  padding: var(--space-3) 0;
}

.scoreline-canvas
  :is(
    .match-separator,
    .fixture-separator,
    .leader-crease,
    .ladder-crease,
    .totw-crease
  )
  .crease-rule {
  height: var(--crease-rule-height-emphasis);
}

.scoreline-canvas
  :is(
    .match-separator,
    .fixture-separator,
    .leader-crease,
    .ladder-crease,
    .totw-crease
  )
  .crease-post {
  height: var(--crease-post-height-emphasis);
}

.scoreline-canvas
  :is(
    .match-separator,
    .fixture-separator,
    .leader-crease,
    .ladder-crease,
    .totw-crease
  )
  :is(.crease-rail, .crease-rail__primary, .crease-rail__secondary) {
  height: var(--crease-rail-height-emphasis);
}

.scoreline-canvas :is(.leader-crease, .ladder-crease, .totw-crease) {
  flex: 0 0 auto;
  padding: var(--space-2) 0;
}

.scoreline-canvas .roster-crease {
  flex: 0 0 auto;
  padding: var(--space-1) 0;
}

.scoreline-canvas .roster-crease .crease-rule {
  height: var(--crease-rule-height-compact);
}

.scoreline-canvas .roster-crease .crease-post {
  height: var(--crease-post-height-compact);
}

.scoreline-canvas
  .roster-crease
  :is(.crease-rail, .crease-rail__primary, .crease-rail__secondary) {
  height: var(--crease-rail-height);
}

.scoreline-canvas
  :is(
    .leaderboard-rows .leader-entry:not(:first-of-type) .leader-crease,
    .ladder-rows .ladder-entry:not(:first-of-type) .ladder-crease,
    .totw-rows .totw-entry:not(:first-of-type) .totw-crease
  )
  .crease-post--primary,
.scoreline-canvas
  :is(
    .leaderboard-rows .leader-entry:not(:first-of-type) .leader-crease,
    .ladder-rows .ladder-entry:not(:first-of-type) .ladder-crease,
    .totw-rows .totw-entry:not(:first-of-type) .totw-crease
  )
  .crease-rail__primary {
  background: var(--club-secondary);
}

.scoreline-canvas
  :is(
    .leaderboard-rows .leader-entry:not(:first-of-type) .leader-crease,
    .ladder-rows .ladder-entry:not(:first-of-type) .ladder-crease,
    .totw-rows .totw-entry:not(:first-of-type) .totw-crease
  )
  .crease-post--secondary,
.scoreline-canvas
  :is(
    .leaderboard-rows .leader-entry:not(:first-of-type) .leader-crease,
    .ladder-rows .ladder-entry:not(:first-of-type) .ladder-crease,
    .totw-rows .totw-entry:not(:first-of-type) .totw-crease
  )
  .crease-rail__secondary {
  background: var(--club-primary);
}

.scoreline-canvas
  .roster-rows
  .roster-entry:nth-of-type(even)
  .roster-crease
  .crease-post--primary,
.scoreline-canvas
  .roster-rows
  .roster-entry:nth-of-type(even)
  .roster-crease
  .crease-rail__primary {
  background: var(--club-secondary);
}

.scoreline-canvas
  .roster-rows
  .roster-entry:nth-of-type(even)
  .roster-crease
  .crease-post--secondary,
.scoreline-canvas
  .roster-rows
  .roster-entry:nth-of-type(even)
  .roster-crease
  .crease-rail__secondary {
  background: var(--club-primary);
}

.scoreline-canvas[data-totw] .totw-entry:last-of-type .totw-crease {
  display: none;
}

.scoreline-canvas .performance-heading {
  margin-bottom: var(--space-2, 8px);
  color: var(--club-primary);
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: 0.12em;
  line-height: 1;
  text-transform: uppercase;
}

.scoreline-canvas .performance-heading::after {
  display: block;
  width: 28px;
  height: 2px;
  margin-top: 6px;
  background: var(--club-primary);
  content: "";
}

.scoreline-canvas .performance-panel:last-child .performance-heading {
  color: var(--club-secondary);
}

.scoreline-canvas .performance-panel:last-child .performance-heading::after {
  background: var(--club-secondary);
}

/* \u2014\u2014 Asset header shell \u2014\u2014 */
.scoreline-canvas .scoreline-header {
  flex: 0 0 var(--zone-header);
  min-height: var(--zone-header);
  max-height: var(--zone-header);
  padding: var(--zone-pad) var(--zone-header-pad-inline)
    var(--zone-header-pad-bottom);
  display: flex;
  flex-direction: column;
  border-bottom: 0;
}

.scoreline-canvas .header-shell {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  overflow: hidden;
  /* Remotion overlay: template background shows through header zone */
  background: transparent;
  border: none;
  box-shadow: none;
}

.scoreline-canvas .header-shell::before {
  content: "";
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  width: 4px;
  background: linear-gradient(
    180deg,
    var(--club-primary) 0%,
    var(--club-secondary) 100%
  );
  pointer-events: none;
}

.scoreline-canvas .header-shell__main {
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(168px, 42%);
  align-items: center;
}

.scoreline-canvas .header-identity-lockup {
  min-width: 0;
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  padding: 0 16px 0 20px;
}

.scoreline-canvas .header-title-stack {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
  padding: 0 16px;
  border-inline-start: 1px solid
    color-mix(in srgb, var(--header-text, var(--ink)) 10%, transparent);
}

.scoreline-canvas .header-eyebrow {
  color: var(--header-text, var(--ink));
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: 0.14em;
  line-height: 1;
  text-transform: uppercase;
}

.scoreline-canvas .header-eyebrow::after {
  display: block;
  width: 24px;
  height: 2px;
  margin-top: 6px;
  margin-inline-start: auto;
  background: var(--header-accent, var(--club-primary));
  content: "";
}

.scoreline-canvas .header-shell__crease {
  padding: 0 16px 8px 20px;
}

.scoreline-canvas .header-identity {
  min-width: 0;
  overflow: hidden;
}

.scoreline-canvas .header-identity-lockup .organisation-name {
  display: -webkit-box;
  overflow: hidden;
  color: var(--header-text, var(--ink));
  font-family: var(--font-body);
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.1;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.scoreline-canvas .scoreline-header h1,
.scoreline-canvas .header-title-stack .header-title {
  min-width: 0;
  overflow: hidden;
  color: var(--header-text, var(--ink));
  font-family: var(--font-display);
  font-size: var(--type-header-title, 44px);
  font-weight: 900;
  font-stretch: condensed;
  letter-spacing: -0.02em;
  line-height: 1;
  text-align: right;
  text-transform: uppercase;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: normal;
}

.scoreline-canvas .header-identity-lockup .organisation-mark {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  background: transparent;
}

.scoreline-canvas .mark-fallback {
  width: 42%;
  height: 42%;
  border: 3px solid currentColor;
  opacity: 0.14;
}

.scoreline-canvas .organisation-mark[data-has-crest="true"] .mark-fallback,
.scoreline-canvas .organisation-mark:has(img:not([hidden])) .mark-fallback {
  display: none;
}

.scoreline-canvas .header-identity-lockup .organisation-mark img {
  position: absolute;
  inset: 6px;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  object-fit: contain;
}

/* \u2014\u2014 Team score bands (match modules only) \u2014\u2014 */
.scoreline-canvas .team-score-area .team-band {
  position: relative;
  overflow: hidden;
  padding: var(--team-band-pad);
  border-top: var(--border-optical-light);
  border-bottom: var(--border-optical-dark);
  box-shadow: var(--highlight-inset);
  color: var(--container-text, var(--on-surface));
}

.scoreline-canvas .team-score-area .team-band[data-club-team="true"]::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(
    var(--surface-spot-size) at var(--team-spot-x, 28%) var(--surface-spot-y),
    rgb(255 255 255 / var(--surface-spot-opacity)),
    transparent 68%
  );
  pointer-events: none;
}

.scoreline-canvas
  .team-score-area
  > .team-band:last-of-type[data-club-team="true"]::before {
  --team-spot-x: 72%;
}

.scoreline-canvas .team-score-area .team-band > * {
  position: relative;
  z-index: 1;
}

.scoreline-canvas .team-score-area .team-band[data-club-team="true"] {
  background: linear-gradient(
    var(--surface-gradient-angle),
    var(--team-gradient-deep-primary),
    var(--team-surface-primary),
    var(--team-gradient-lift-primary)
  );
}

.scoreline-canvas .team-score-area .team-band[data-club-team="false"] {
  background: linear-gradient(
    var(--surface-gradient-angle),
    var(--team-gradient-deep-secondary),
    var(--team-surface-secondary),
    var(--team-gradient-lift-secondary)
  );
}

.scoreline-canvas
  .team-score-area
  > .team-band:last-of-type[data-club-team="true"] {
  background: linear-gradient(
    calc(var(--surface-gradient-angle) + 180deg),
    var(--team-gradient-deep-primary),
    var(--team-surface-primary),
    var(--team-gradient-lift-primary)
  );
}

.scoreline-canvas
  .team-score-area
  > .team-band:last-of-type[data-club-team="false"] {
  background: linear-gradient(
    calc(var(--surface-gradient-angle) + 180deg),
    var(--team-gradient-deep-secondary),
    var(--team-surface-secondary),
    var(--team-gradient-lift-secondary)
  );
}

/* \u2014\u2014 Contrast wiring (results team bands follow mode container copy) \u2014\u2014 */
.scoreline-canvas .team-score-area .score {
  color: var(--container-text, var(--contrast-score));
}

.scoreline-canvas .team-score-area .team-name {
  color: var(--container-text, var(--contrast-team));
}

.scoreline-canvas .team-score-area .overs {
  color: var(--container-text, var(--contrast-score));
}

.scoreline-canvas .team-score-area .team-role {
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

.scoreline-canvas .result-statement {
  color: var(--contrast-score);
}

.scoreline-canvas .performance-player {
  color: var(--contrast-performance-support);
  font-weight: 600;
}

.scoreline-canvas .performance-area .performance-player {
  color: var(--container-text-support, var(--contrast-performance-support));
}

.scoreline-canvas .performance-figure {
  color: var(--container-text, var(--contrast-performance-lead));
  font-weight: 700;
}

.scoreline-canvas .performance-area .performance-figure {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas .performance-panel:last-child .performance-figure {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas
  .performance-area
  .performance-panel:last-child
  .performance-figure {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas .performance-row[data-rank="1"] .performance-player {
  color: var(--contrast-performance-lead);
  font-weight: 650;
}

.scoreline-canvas
  .performance-area
  .performance-row[data-rank="1"]
  .performance-player {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas .performance-row[data-rank="1"] .performance-figure {
  font-weight: 800;
}

.scoreline-canvas .performance-row[data-rank="2"] .performance-figure,
.scoreline-canvas .performance-row[data-rank="3"] .performance-figure {
  font-weight: 700;
  opacity: 0.9;
}

.scoreline-canvas .performance-balls,
.scoreline-canvas .performance-empty {
  color: var(--contrast-meta);
}

.scoreline-canvas .performance-area .performance-balls,
.scoreline-canvas .performance-area .performance-empty {
  color: var(--container-text-muted, var(--contrast-meta));
}

.scoreline-canvas .context-left,
.scoreline-canvas .match-context {
  color: var(
    --match-context-text-muted,
    var(--container-text-muted, var(--contrast-meta))
  );
}

.scoreline-canvas .context-venue {
  color: var(
    --match-context-text,
    var(--container-text, var(--contrast-performance))
  );
}

/* \u2014\u2014 Container copy (light/lightAlt = light panel + dark text; dark/darkAlt = dark panel + white text) \u2014\u2014 */
.scoreline-canvas
  :is(
    .match-context,
    .match-grade,
    .performance-area,
    .roster-context,
    .fixture-grade,
    .fixture-centre,
    .ladder-grade,
    .leaderboard-category,
    .totw-category,
    [data-roster] .roster-grade,
    [data-roster] .roster-squad-header,
    [data-leaderboard] .leaderboard-rows .leader-entry .leader-row,
    [data-ladder] .ladder-rows .ladder-entry:nth-of-type(even) .ladder-row,
    [data-roster] .roster-rows .roster-entry .roster-row,
    [data-totw] .totw-rows .totw-entry .totw-row
  ) {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas
  :is(
    .match-context,
    .match-grade,
    .performance-area,
    .roster-context,
    .fixture-grade,
    .fixture-centre,
    .ladder-grade,
    .leaderboard-category,
    .totw-category,
    [data-roster] .roster-grade-meta,
    [data-roster] .roster-squad-label,
    [data-leaderboard] .leaderboard-category-label,
    [data-totw] .totw-category-label,
    [data-leaderboard] .leader-entry:not(:first-of-type) .leader-team-label,
    [data-leaderboard] .leader-entry:not(:first-of-type) .leader-team,
    [data-leaderboard] .leader-entry:not(:first-of-type) .leader-balls,
    [data-leaderboard] .leader-entry:not(:first-of-type) .leader-overs,
    [data-leaderboard] .leader-entry:not(:first-of-type) .leader-sr,
    [data-leaderboard] .leader-entry:not(:first-of-type) .leader-figure-label,
    [data-ladder] .ladder-stat,
    [data-totw] .totw-team-label,
    [data-totw] .totw-balls,
    [data-totw] .totw-subline,
    .fixture-field-label,
    .fixture-grade-meta
  ) {
  color: var(--container-text-muted, var(--contrast-meta));
}

.scoreline-canvas
  :is(
    [data-leaderboard] .leader-name,
    [data-leaderboard] .leader-figure,
    [data-leaderboard] .leaderboard-category-value,
    [data-ladder] .ladder-team,
    [data-ladder] .ladder-grade-name,
    [data-roster] .roster-player,
    [data-roster] .roster-grade-name,
    [data-roster] .roster-squad-team,
    [data-totw] .totw-name,
    [data-totw] .totw-team,
    [data-totw] .totw-figure,
    [data-totw] .totw-category-value,
    .fixture-grade-name,
    .fixture-date,
    .fixture-ground
  ) {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas
  :is(
    [data-leaderboard] .leader-entry:not(:first-of-type) .leader-rank,
    [data-roster] .roster-index
  ) {
  color: var(--container-text-accent, var(--accent-on-light-primary));
}

/* Container surfaces \u2014 40% min tint via tokens; clip copy inside panel bounds */
.scoreline-canvas
  :is(
    .match-context,
    .match-grade,
    .performance-area,
    .performance-panel,
    .roster-context,
    .fixture-grade,
    .fixture-centre,
    .ladder-grade,
    .leaderboard-category,
    .totw-category,
    [data-roster] .roster-grade,
    [data-roster] .roster-squad-header,
    [data-roster] .roster-rows .roster-entry .roster-row,
    [data-totw] .totw-rows .totw-entry .totw-row,
    [data-leaderboard] .leaderboard-rows .leader-entry .leader-row
  ) {
  min-width: 0;
  overflow: hidden;
}

/* \u2014\u2014 Result statement \u2014\u2014 */
.scoreline-canvas .result-statement {
  position: relative;
  isolation: isolate;
  background: linear-gradient(
    90deg,
    var(--result-gradient-edge) 0%,
    var(--result-gradient-core) 50%,
    var(--result-gradient-edge) 100%
  );
  border-top: var(--border-optical-light);
  box-shadow: var(--shadow-result-bar);
}

/* \u2014\u2014 Logo wells \u2014\u2014 */
.scoreline-canvas .organisation-mark,
.scoreline-canvas .team-mark,
.scoreline-canvas .leader-mark,
.scoreline-canvas .ladder-mark {
  border: var(--well-border);
  box-shadow: var(--well-shadow);
}

.scoreline-canvas .leader-mark[data-has-crest="true"] .mark-fallback,
.scoreline-canvas .leader-mark:has(img:not([hidden])) .mark-fallback,
.scoreline-canvas .ladder-mark[data-has-crest="true"] .mark-fallback,
.scoreline-canvas .ladder-mark:has(img:not([hidden])) .mark-fallback {
  display: none;
}

/* \u2014\u2014 Data-resilient layout states \u2014\u2014 */
.scoreline-canvas .match-module[data-performance-count="1"] .performance-area {
  grid-template-columns: minmax(0, 1fr);
}

.scoreline-canvas
  .match-module[data-performance-count="1"]
  .performance-panel[data-state="empty"] {
  display: none;
}

.scoreline-canvas
  .team-score-area
  .team-band[data-has-crest="false"]
  .team-mark {
  display: none;
}

.scoreline-canvas
  .team-score-area
  .team-band[data-has-crest="false"]
  .team-primary,
.scoreline-canvas
  .team-score-area
  > .team-band:last-of-type[data-has-crest="false"]
  .team-primary {
  grid-template-columns: minmax(0, 1fr);
}

.scoreline-canvas .organisation-mark[data-has-crest="false"] img {
  display: none;
}

.scoreline-canvas .organisation-mark[data-has-crest="false"] .mark-fallback {
  opacity: 0.22;
}

.scoreline-canvas .result-statement[data-length="long"] {
  display: -webkit-box;
  overflow: hidden;
  font-size: calc(var(--type-result) * 0.82);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* \u2014\u2014 Typography resilience \u2014\u2014 */
.scoreline-canvas .team-name,
.scoreline-canvas .organisation-name {
  overflow-wrap: anywhere;
  text-wrap: balance;
}

/* \u2014\u2014 Footer & sponsor strip (fits --zone-footer / theme footer 112px) \u2014\u2014 */
.scoreline-canvas .asset-footer {
  flex: 0 0 var(--zone-footer);
  min-height: var(--zone-footer);
  max-height: var(--zone-footer);
  box-sizing: border-box;
  padding: 0 var(--zone-pad) var(--zone-pad);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  overflow: hidden;
}

.scoreline-canvas .sponsor-strip {
  position: relative;
  width: 100%;
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: var(--space-3, 16px);
  padding: var(--space-2, 8px) var(--space-4, 24px);
  border: 0;
  background: transparent;
  box-shadow: none;
}

.scoreline-canvas .sponsor-strip > * {
  position: relative;
  z-index: 1;
}

.scoreline-canvas .sponsor-slot {
  min-width: 0;
  flex: 1 1 0;
  min-height: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: none;
  color: var(--contrast-sponsor);
}

.scoreline-canvas .sponsor-slot img {
  max-width: 100%;
  max-height: 56px;
  object-fit: contain;
}

.scoreline-canvas .sponsor-symbol {
  width: 56px;
  height: 40px;
  flex: 0 0 auto;
  border: 0;
  background: color-mix(in srgb, var(--muted) 18%, transparent);
  opacity: 0.5;
}

.scoreline-canvas[data-sponsor-state="absent"] .asset-footer {
  display: none;
}

.scoreline-canvas .team-mark {
  position: relative;
  z-index: 2;
}

/* \u2014\u2014 Fixture matchup bands (upcoming) \u2014\u2014 */
.scoreline-canvas .fixture-matchup .team-band {
  position: relative;
  overflow: hidden;
  padding: var(--team-band-pad);
  border-top: var(--border-optical-light);
  border-bottom: var(--border-optical-dark);
  box-shadow: var(--highlight-inset);
  color: var(--container-text, var(--on-surface));
}

.scoreline-canvas .fixture-matchup .team-band::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(
    var(--surface-spot-size) at var(--team-spot-x, 28%) var(--surface-spot-y),
    rgb(255 255 255 / var(--surface-spot-opacity)),
    transparent 68%
  );
  pointer-events: none;
}

.scoreline-canvas .fixture-matchup .team-band--home::before {
  --team-spot-x: 28%;
}

.scoreline-canvas .fixture-matchup .team-band--away::before {
  --team-spot-x: 72%;
}

.scoreline-canvas .fixture-matchup .team-band > * {
  position: relative;
  z-index: 1;
}

.scoreline-canvas .fixture-matchup .team-band--home {
  background: linear-gradient(
    var(--surface-gradient-angle),
    var(--team-gradient-deep-primary),
    var(--team-surface-primary),
    var(--team-gradient-lift-primary)
  );
}

.scoreline-canvas .fixture-matchup .team-band--away {
  background: linear-gradient(
    calc(var(--surface-gradient-angle) + 180deg),
    var(--team-gradient-deep-secondary),
    var(--team-surface-secondary),
    var(--team-gradient-lift-secondary)
  );
}

.scoreline-canvas .fixture-matchup .team-band--home[data-club-team="false"] {
  background: linear-gradient(
    var(--surface-gradient-angle),
    var(--team-gradient-deep-secondary),
    var(--team-surface-secondary),
    var(--team-gradient-lift-secondary)
  );
}

.scoreline-canvas .fixture-matchup .team-band--away[data-club-team="true"] {
  background: linear-gradient(
    calc(var(--surface-gradient-angle) + 180deg),
    var(--team-gradient-deep-primary),
    var(--team-surface-primary),
    var(--team-gradient-lift-primary)
  );
}

/* Fixture team bands \u2014 mode container copy (not surface contrast) */
.scoreline-canvas .fixture-matchup .team-name {
  color: var(--container-text, var(--contrast-team));
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.scoreline-canvas .fixture-matchup .team-side-label {
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

.scoreline-canvas
  .fixture-matchup
  .team-band[data-has-crest="false"]
  .team-mark {
  display: none;
}

.scoreline-canvas .fixture-grade {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.scoreline-canvas .fixture-centre {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

/* \u2014\u2014 Top 5 leaderboard \u2014\u2014 */
.scoreline-canvas .leaderboard-category {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.scoreline-canvas .leaderboard-category-label {
  color: var(--container-text-muted, var(--contrast-meta));
}

.scoreline-canvas[data-leaderboard] .leader-entry:first-of-type .leader-name {
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.scoreline-canvas[data-leaderboard] .leader-entry:first-of-type .leader-rank,
.scoreline-canvas[data-leaderboard] .leader-entry:first-of-type .leader-copy,
.scoreline-canvas[data-leaderboard] .leader-entry:first-of-type .leader-stats {
  opacity: 0.75;
}

.scoreline-canvas[data-leaderboard] .leader-name {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas[data-leaderboard="batting"] .leader-rank {
  color: var(--container-text-accent, var(--accent-on-light-primary));
}

.scoreline-canvas[data-leaderboard="bowling"] .leader-rank {
  color: var(--container-text-accent, var(--accent-on-light-secondary));
}

.scoreline-canvas[data-leaderboard] .leader-figure {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas[data-leaderboard] .leader-team-label,
.scoreline-canvas[data-leaderboard] .leader-team,
.scoreline-canvas[data-leaderboard] .leader-balls,
.scoreline-canvas[data-leaderboard] .leader-overs,
.scoreline-canvas[data-leaderboard] .leader-sr,
.scoreline-canvas[data-leaderboard] .leader-figure-label {
  color: var(--container-text-muted, var(--contrast-meta));
}

.scoreline-canvas[data-leaderboard] .leader-mark[data-has-crest="false"] {
  visibility: hidden;
}

/* \u2014\u2014 Ladder table \u2014\u2014 */
.scoreline-canvas .ladder-grade {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.scoreline-canvas .ladder-columns {
  color: var(--contrast-meta);
  border-bottom: 1px solid rgb(8 11 13 / 8%);
}

.scoreline-canvas[data-ladder] .ladder-entry:first-of-type .ladder-team {
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.scoreline-canvas[data-ladder] .ladder-rank {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas[data-ladder] .ladder-team {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas[data-ladder] .ladder-stat,
.scoreline-canvas[data-ladder] .ladder-stat--pts {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas[data-ladder]
  .ladder-rows
  .ladder-entry:nth-of-type(even)
  .ladder-row {
  box-shadow: var(--highlight-inset-light);
}

.scoreline-canvas[data-ladder] .ladder-row[data-bias="true"] {
  box-shadow:
    var(--match-context-inset, var(--highlight-inset-light)),
    inset 4px 0 0 var(--club-secondary);
}

.scoreline-canvas[data-ladder] .ladder-mark[data-has-crest="false"] {
  visibility: hidden;
}

/* \u2014\u2014 Team roster \u2014\u2014 */
.scoreline-canvas[data-roster] .roster-grade {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.scoreline-canvas[data-roster] .roster-grade-meta {
  color: var(--container-text-muted, var(--contrast-meta));
}

.scoreline-canvas[data-roster] .roster-squad-header {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.scoreline-canvas[data-roster] .roster-squad-label {
  color: var(--container-text-muted, var(--contrast-meta));
}

.scoreline-canvas[data-roster] .fixture-matchup .team-name {
  color: var(--container-text, var(--contrast-team));
}

.scoreline-canvas[data-roster] .roster-index {
  color: var(--container-text-accent, var(--accent-on-light-primary));
}

.scoreline-canvas[data-roster] .roster-player {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas[data-roster] .roster-row[data-empty-roster="true"] {
  color: var(--container-text-muted, var(--contrast-meta));
}

.scoreline-canvas[data-roster] .roster-context {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
}

.scoreline-canvas[data-roster] .roster-context > * {
  position: relative;
  z-index: 1;
}

.scoreline-canvas[data-roster] .roster-context-date {
  color: var(
    --match-context-text,
    var(--container-text, var(--contrast-performance-lead))
  );
}

.scoreline-canvas[data-roster] .roster-context-venue {
  color: var(
    --match-context-text-muted,
    var(--container-text-muted, var(--contrast-performance))
  );
}

.scoreline-canvas[data-roster]
  .fixture-matchup
  .team-band[data-has-crest="false"]
  .team-mark {
  display: none;
}

/* \u2014\u2014 Team of the Week \u2014\u2014 */
.scoreline-canvas .totw-category {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.scoreline-canvas .totw-category-label {
  color: var(--container-text-muted, var(--contrast-meta));
}

.scoreline-canvas[data-totw] .totw-name {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas[data-totw] .totw-figure {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas[data-totw] .totw-role {
  color: var(--container-text-accent, var(--accent-on-light-secondary));
}

.scoreline-canvas[data-totw] .totw-team {
  color: var(--container-text, var(--contrast-performance-lead));
}

.scoreline-canvas[data-totw] .totw-team-label,
.scoreline-canvas[data-totw] .totw-balls,
.scoreline-canvas[data-totw] .totw-subline {
  color: var(--container-text-muted, var(--contrast-meta));
}

.scoreline-canvas[data-totw] .totw-mark[data-has-crest="false"] {
  visibility: hidden;
}

.scoreline-canvas .header-shell__main,
.scoreline-canvas .header-shell__crease {
  position: relative;
  z-index: 1;
}

/* \u2014\u2014 Intro title card \u2014\u2014 */
.scoreline-canvas.scoreline-intro .header-eyebrow,
.scoreline-canvas.scoreline-intro .organisation-name,
.scoreline-canvas.scoreline-intro .header-title {
  color: var(--header-text, var(--container-text, var(--ink)));
}

/* \u2014\u2014 Shared surface grain (single atmospheric texture) \u2014\u2014 */
.scoreline-canvas
  :is(
    .result-statement,
    .team-score-area .team-band,
    .fixture-matchup .team-band,
    [data-roster] .roster-context
  )::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: var(--texture-noise-url);
  background-size: var(--texture-noise-size);
  background-repeat: repeat;
  mix-blend-mode: var(--texture-blend);
  opacity: var(--surface-grain-opacity, var(--texture-noise-opacity));
  pointer-events: none;
}

.scoreline-canvas .result-statement::after {
  z-index: -1;
}

/* \u2014\u2014 Score watermark (hero / single-match only) \u2014\u2014 */
.scoreline-canvas[data-score-watermark="enabled"] .score-watermark {
  position: absolute;
  right: 36px;
  top: 38%;
  z-index: 0;
  max-width: 70%;
  overflow: hidden;
  color: rgb(8 11 13 / 6%);
  font-family: var(--font-display);
  font-size: clamp(180px, 28vw, 320px);
  font-weight: 800;
  font-stretch: condensed;
  letter-spacing: -0.06em;
  line-height: 0.72;
  font-variant-numeric: tabular-nums lining-nums;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.scoreline-canvas[data-score-watermark="enabled"] .scoreline-header,
.scoreline-canvas[data-score-watermark="enabled"] .results-ledger,
.scoreline-canvas[data-score-watermark="enabled"] .asset-footer {
  position: relative;
  z-index: 1;
}

/* \u2014\u2014 Export-safe fallbacks \u2014\u2014 */
@supports not (color: color-mix(in srgb, white 50%, black)) {
  .scoreline-canvas {
    --team-surface-primary: var(--surface-strong-primary);
    --team-surface-secondary: var(--surface-strong-secondary);
    --result-gradient-core: var(--surface-ink);
  }
}


/* src/templates/variants/scoreline/styles/scoreline-intro.css */
/* Scoreline intro \u2014 synced with design/_shared/scoreline-intro.css */

.scoreline-canvas.scoreline-intro {
  --type-intro-title: 64px;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: visible;
}

.scoreline-intro__animated {
  width: 100%;
  min-width: 0;
  flex: 0 0 auto;
  overflow: hidden;
}

.scoreline-intro__frame {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: var(--space-3, 16px);
  padding: var(--zone-pad, 12px) var(--zone-content-pad, 28px);
}

.scoreline-intro__panel {
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: none;
  overflow: hidden;
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
  color: var(--container-text, var(--ink));
}

.scoreline-intro__panel::before {
  content: "";
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  width: 4px;
  background: linear-gradient(
    180deg,
    var(--club-primary) 0%,
    var(--club-secondary) 100%
  );
  pointer-events: none;
}

.scoreline-intro__shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: var(--space-2, 8px);
  padding: 22px 20px 12px 24px;
}

.scoreline-intro__main {
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(200px, 44%);
  gap: var(--space-3, 16px);
  align-items: center;
}

.scoreline-canvas.scoreline-intro .header-identity-lockup {
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 16px;
  padding: 0;
}

.scoreline-canvas.scoreline-intro .organisation-mark {
  width: 112px;
  height: 112px;
  flex: 0 0 112px;
}

.scoreline-canvas.scoreline-intro
  .header-identity-lockup
  .organisation-mark
  img {
  inset: 8px;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
}

.scoreline-canvas.scoreline-intro .header-title-stack {
  align-items: flex-end;
  padding: 0;
  border-inline-start: 1px solid
    color-mix(in srgb, var(--header-text, var(--ink)) 10%, transparent);
}

.scoreline-canvas.scoreline-intro .header-title-stack .header-title,
.scoreline-canvas.scoreline-intro .scoreline-intro__headline {
  font-size: var(--type-intro-title);
  font-weight: 900;
  line-height: 0.98;
  text-align: right;
  text-wrap: balance;
}

.scoreline-intro__crease {
  padding: 0 0 4px;
}

.scoreline-intro__sponsors {
  width: 100%;
  min-height: 88px;
  flex: 0 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  gap: var(--space-4, 24px);
  padding: var(--space-3, 16px) var(--space-4, 24px);
}

.scoreline-intro__sponsors:empty {
  display: none;
}

.scoreline-canvas.scoreline-intro .scoreline-intro__sponsor-slot {
  min-width: 0;
  min-height: 64px;
  flex: 1 1 0;
  max-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scoreline-canvas.scoreline-intro .scoreline-intro__sponsor-slot img {
  max-width: 100%;
  max-height: 64px;
  width: auto;
  height: auto;
  object-fit: contain;
}


/* src/templates/variants/scoreline/styles/scoreline-results.css */
/* Scoreline Results layout \u2014 synced with design/_shared/scoreline-results.css */

.scoreline-canvas {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header-pad-inline: 28px;
  --zone-header-pad-bottom: 0px;
  --zone-content-pad: 28px;
  --zone-header: 140px;
  --zone-content: 1088px;
  --zone-footer: 112px;
  --ink: #080b0d;
  --paper: #ffffff;
  --surface: #ffffff;
  --surface-muted: #f3f0ea;
  --surface-ink: #080b0d;
  --rule: rgba(8, 11, 13, 0.12);
  --muted: #5f5b56;
  --font-display: "Geist", Arial, sans-serif;
  --font-body: "Geist", Arial, sans-serif;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --type-score: 72px;
  --type-result: 34px;
  --type-team: 30px;
  --type-player: 26px;
  --type-figure: 30px;
  --type-meta: 21px;
  --type-venue: 23px;

  position: relative;
  isolation: isolate;
  overflow: hidden;
  /* Remotion: overlay-only \u2014 selected template background shows through */
  background: transparent;
  color: var(--ink);
  font-family: var(--font-body);
}

.scoreline-canvas,
.scoreline-canvas * {
  box-sizing: border-box;
}

.scoreline-canvas h1,
.scoreline-canvas h2,
.scoreline-canvas h3,
.scoreline-canvas p {
  margin: 0;
}

.scoreline-canvas .team-mark {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: var(--surface);
  width: 96px;
  height: 96px;
}

.scoreline-canvas .team-mark img {
  max-width: calc(100% - 8px);
  max-height: calc(100% - 8px);
  object-fit: contain;
}

.scoreline-canvas .results-ledger {
  min-height: 0;
  flex: 1 1 var(--zone-content);
  max-height: var(--zone-content);
  padding: var(--zone-content-pad);
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
}

/* Remotion wraps each match row in AnimatedContainer \u2014 restore flex height chain */
.scoreline-canvas .results-ledger > .animated-container {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 0;
}

.scoreline-canvas .results-ledger > .animated-container > .match-module {
  flex: 1 1 0;
  min-height: 0;
  height: 100%;
}

/* Two-match density: keep separator readable without consuming ledger height */
.scoreline-canvas .results-ledger > .match-separator {
  margin: var(--space-2) 0;
  padding: var(--space-2) 0;
}

/* Reading order: teams \u2192 outcome \u2192 performances \u2192 context */
.scoreline-canvas .match-module {
  min-height: 0;
  flex: 1 1 0;
  display: grid;
  grid-template-rows: 172px auto minmax(0, 1fr) auto;
  gap: var(--space-2) 0;
  overflow: hidden;
  border-top: 0;
}

.scoreline-canvas .match-module.without-performances {
  grid-template-rows: 172px auto auto;
}

.scoreline-canvas .team-score-area {
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 40px minmax(0, 1fr);
  gap: 6px;
  align-items: stretch;
  background: transparent;
}

.scoreline-canvas .team-score-area__divider {
  display: grid;
  place-items: center;
}

.scoreline-canvas .team-score-area__divider-anim {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
}

.scoreline-canvas .team-score-area .team-band > .team-band__slot {
  min-width: 0;
  min-height: 0;
}

.scoreline-canvas .team-score-area .team-band > .team-band__slot--identity {
  height: 40px;
  max-height: 40px;
}

.scoreline-canvas .team-score-area .team-band__anim {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.scoreline-canvas .team-score-area .team-band__anim > .team-primary,
.scoreline-canvas .team-score-area .team-band__anim > .team-identity {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.scoreline-canvas .scoreline-result-cell {
  min-width: 0;
  width: 100%;
  min-height: 0;
}

.scoreline-canvas .scoreline-result-cell__anim {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.scoreline-canvas .scoreline-result-cell__anim--divider {
  align-items: center;
  justify-content: center;
}

.scoreline-canvas .scoreline-result-cell__anim > .performance-area {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  height: 100%;
}

.scoreline-canvas .match-module__section {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.scoreline-canvas .match-module__section .scoreline-result-cell {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.scoreline-canvas .match-module__section--performances {
  overflow: hidden;
}

.scoreline-canvas .match-module__section--performances .scoreline-result-cell,
.scoreline-canvas
  .match-module__section--performances
  .scoreline-result-cell__anim,
.scoreline-canvas .match-module__section--performances .performance-area {
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
}

.scoreline-canvas .match-module__section--result .result-bridge,
.scoreline-canvas .match-module__section--context .match-context {
  width: 100%;
}

.scoreline-canvas .team-score-area .team-band {
  min-width: 0;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-rows: minmax(0, 1fr) 40px;
  border: 0;
}

.scoreline-canvas .team-primary {
  min-width: 0;
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
}

.scoreline-canvas .team-score-area .team-band[data-side="home"] .team-score {
  justify-items: end;
}

.scoreline-canvas .team-score-area .team-band[data-side="away"] .team-score {
  justify-items: start;
}

.scoreline-canvas .team-score {
  min-width: 0;
  width: 100%;
  display: grid;
  grid-template-rows: auto auto;
  gap: 10px;
  align-content: center;
}

.scoreline-canvas .score-stack {
  --type-score-active: var(--type-score);
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 0;
  min-width: 0;
}

/* Two Day+ stacked innings \u2014 shrink main score so prior + current + overs fit */
.scoreline-canvas .score-stack:has(.score--prior) {
  --type-score-active: calc(var(--type-score) * 0.72);
}

.scoreline-canvas .team-score-area .team-band[data-side="home"] .score-stack {
  align-items: flex-end;
}

.scoreline-canvas .team-score-area .team-band[data-side="away"] .score-stack {
  align-items: flex-start;
}

.scoreline-canvas .score {
  font-family: var(--font-display);
  font-size: var(--type-score-active, var(--type-score));
  font-weight: 800;
  font-stretch: condensed;
  letter-spacing: -0.04em;
  line-height: 0.9;
  white-space: nowrap;
  font-variant-numeric: tabular-nums lining-nums;
}

.scoreline-canvas .score--prior {
  font-size: calc(var(--type-score-active, var(--type-score)) * 0.4);
  line-height: 1;
}

.scoreline-canvas .team-score:has(.score--prior) {
  gap: 6px;
}

.scoreline-canvas .team-score-area .team-band[data-side="home"] .score,
.scoreline-canvas .team-score-area .team-band[data-side="home"] .score--prior,
.scoreline-canvas .team-score-area .team-band[data-side="home"] .overs {
  text-align: right;
}

.scoreline-canvas .team-score-area .team-band[data-side="away"] .score,
.scoreline-canvas .team-score-area .team-band[data-side="away"] .score--prior,
.scoreline-canvas .team-score-area .team-band[data-side="away"] .overs {
  text-align: left;
}

.scoreline-canvas .overs {
  min-height: 20px;
  font-family: var(--font-body);
  font-size: var(--type-meta);
  font-weight: 500;
  font-variant-numeric: tabular-nums lining-nums;
  letter-spacing: 0;
  line-height: 1.1;
  text-transform: none;
  white-space: nowrap;
}

.scoreline-canvas .overs[data-empty="true"] {
  display: none;
}

.scoreline-canvas .team-identity {
  min-width: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.scoreline-canvas .team-name {
  display: -webkit-box;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: var(--type-team);
  font-style: italic;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: -0.02em;
  line-height: 1.05;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.scoreline-canvas .team-role {
  flex: 0 0 auto;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.12em;
  line-height: 1;
  text-transform: uppercase;
}

.scoreline-canvas .club-role,
.scoreline-canvas .opposition-role {
  display: none;
}

.scoreline-canvas .team-band[data-club-team="true"] .club-role,
.scoreline-canvas .team-band[data-club-team="false"] .opposition-role {
  display: inline;
}

.scoreline-canvas .team-divider {
  place-self: center;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.scoreline-canvas .result-bridge {
  min-height: 0;
  margin-top: 0;
  overflow: hidden;
}

.scoreline-canvas .result-statement {
  min-width: 0;
  min-height: 58px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: var(--type-result);
  font-style: italic;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-align: center;
}

.scoreline-canvas .performance-area {
  min-height: 0;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  padding: var(--space-2) var(--space-3);
  overflow: hidden;
  background: var(
    --performance-area-surface,
    color-mix(in srgb, var(--surface-muted) 50%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.scoreline-canvas .performance-panel {
  min-width: 0;
  padding: 0;
  display: grid;
  grid-template-rows: auto repeat(3, minmax(0, 1fr));
  gap: 0;
  border: 0;
}

.scoreline-canvas .performance-row {
  min-width: 0;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: baseline;
  padding: 7px 0;
}

.scoreline-canvas .performance-row[data-empty="true"] {
  display: none;
}

.scoreline-canvas .performance-player {
  overflow: hidden;
  font-family: var(--font-body);
  font-size: var(--type-player);
  font-weight: 600;
  line-height: 1.05;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.scoreline-canvas .performance-figure,
.scoreline-canvas .performance-figure span {
  font-variant-numeric: tabular-nums lining-nums;
}

.scoreline-canvas .performance-figure {
  display: inline-flex;
  align-items: baseline;
  gap: 0;
  font-family: var(--font-display);
  font-size: var(--type-figure);
  font-weight: 700;
  font-stretch: condensed;
  line-height: 1;
  white-space: nowrap;
}

.scoreline-canvas .performance-balls,
.scoreline-canvas .performance-balls span {
  font-variant-numeric: tabular-nums lining-nums;
}

.scoreline-canvas .performance-balls {
  margin-left: 4px;
  font-family: var(--font-body);
  font-size: 19px;
  font-weight: 500;
}

.scoreline-canvas .performance-panel[data-state="empty"] {
  grid-template-rows: auto 1fr;
}

.scoreline-canvas .performance-empty {
  display: flex;
  align-items: center;
  padding: 9px 0;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
}

.scoreline-canvas .match-context {
  min-width: 0;
  margin-top: 0;
  padding: 8px 12px;
  display: grid;
  grid-template-columns: minmax(0, 0.64fr) minmax(0, 1.36fr);
  gap: var(--space-3);
  align-items: center;
  border: 0;
  overflow: hidden;
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
  font-family: var(--font-body);
  font-size: var(--type-meta);
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.3;
  text-transform: none;
}

.scoreline-canvas .context-left,
.scoreline-canvas .context-venue {
  min-width: 0;
  margin: 0;
  font-size: var(--type-meta);
  font-weight: 500;
  line-height: 1.3;
}

.scoreline-canvas .context-left {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--space-2);
}

.scoreline-canvas .context-separator {
  width: 4px;
  height: 4px;
  flex: 0 0 auto;
  background: var(--match-context-accent, var(--club-primary));
}

.scoreline-canvas .context-venue {
  overflow: hidden;
  text-align: right;
  text-wrap: balance;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  display: -webkit-box;
  align-self: center;
}

.scoreline-canvas .team-score-area .team-band[data-side="away"] .team-primary {
  grid-template-columns: minmax(0, 1fr) 96px;
}

.scoreline-canvas .team-score-area .team-band[data-side="away"] .team-mark {
  order: 2;
}

.scoreline-canvas .team-score-area .team-band[data-side="away"] .team-score {
  order: 1;
}

/* Team band logo background (full Results + Results Lite scoreline) */
.scoreline-canvas .team-score-area .team-band[data-logo-band-bg="true"]::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: var(--team-band-logo-url);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.2;
  filter: grayscale(0.75);
  mix-blend-mode: soft-light;
  pointer-events: none;
}

.scoreline-canvas
  .team-score-area
  .team-band[data-logo-band-bg="true"][data-side="home"]
  .team-primary {
  grid-template-columns: minmax(0, 1fr);
  justify-items: end;
}

.scoreline-canvas
  .team-score-area
  .team-band[data-logo-band-bg="true"][data-side="away"]
  .team-primary {
  grid-template-columns: minmax(0, 1fr);
  justify-items: start;
}

.scoreline-canvas
  .team-score-area
  .team-band[data-logo-band-bg="true"][data-side="away"]
  .team-score {
  order: unset;
}

.scoreline-canvas
  .team-score-area
  .team-band[data-logo-band-bg="true"][data-side="home"]
  .team-score {
  justify-items: end;
}

.scoreline-canvas
  .team-score-area
  .team-band[data-logo-band-bg="true"][data-side="away"]
  .team-score {
  justify-items: start;
}

.scoreline-canvas
  .team-score-area
  .team-band[data-logo-band-bg="true"][data-side="home"]
  .score-stack {
  align-items: flex-end;
}

.scoreline-canvas
  .team-score-area
  .team-band[data-logo-band-bg="true"][data-side="away"]
  .score-stack {
  align-items: flex-start;
}

.scoreline-canvas
  .team-score-area
  .team-band[data-logo-band-bg="true"][data-side="home"]
  :is(.score, .score--prior, .overs) {
  text-align: right;
}

.scoreline-canvas
  .team-score-area
  .team-band[data-logo-band-bg="true"][data-side="away"]
  :is(.score, .score--prior, .overs) {
  text-align: left;
}

/* Full Cricket Results scoreline \u2014 team name row (not Results Lite ledger) */
.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module
  .team-identity {
  justify-content: flex-start;
  width: 100%;
}

.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module
  .team-name {
  flex: 1 1 auto;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-box-orient: unset;
  -webkit-line-clamp: unset;
  line-clamp: unset;
}

.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module
  .team-band[data-side="home"]
  .team-name {
  text-align: right;
}

.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module
  .team-band[data-side="away"]
  .team-name {
  text-align: left;
}

.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module
  .result-statement {
  font-weight: 400;
}

/* Full Cricket Results scoreline \u2014 compact stats (no Batting/Bowling headings) */
.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module[data-performance-headings="off"]:not(.without-performances) {
  grid-template-rows: 172px auto auto auto;
}

.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module[data-performance-headings="off"]
  .match-module__section--performances
  .scoreline-result-cell,
.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module[data-performance-headings="off"]
  .match-module__section--performances
  .scoreline-result-cell__anim,
.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module[data-performance-headings="off"]
  .match-module__section--performances
  .performance-area {
  flex: 0 0 auto;
  height: auto;
}

.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module[data-performance-headings="off"]
  .performance-panel {
  grid-template-rows: repeat(3, auto);
}

.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module[data-performance-headings="off"]
  .performance-panel
  > .performance-row:nth-child(1):not([data-empty="true"]),
.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module[data-performance-headings="off"]
  .performance-panel
  > .performance-row:nth-child(2):not([data-empty="true"]) {
  border-bottom: 2px solid var(--rule);
}

/* Cricket Results Lite (Scoreline template) */
.scoreline-canvas .match-module.results-lite-scoreline {
  --type-score: calc(72px - 5pt);
  --results-lite-team-band-height: 160px;
  --results-lite-result-band-height: 72px;
  /* team row + grid gap (--space-2) + result row */
  --results-lite-match-height: calc(
    var(--results-lite-team-band-height) + var(--space-2) +
      var(--results-lite-result-band-height)
  );
  flex: 0 0 var(--results-lite-match-height);
  height: var(--results-lite-match-height);
  min-height: var(--results-lite-match-height);
  max-height: var(--results-lite-match-height);
}

/* Fixed bands (full Scoreline results uses 172px team row) */
.scoreline-canvas .match-module.results-lite-scoreline.without-performances {
  grid-template-rows:
    var(--results-lite-team-band-height)
    var(--results-lite-result-band-height);
}

.scoreline-canvas .match-module.results-lite-scoreline .team-score-area {
  height: var(--results-lite-team-band-height);
  min-height: var(--results-lite-team-band-height);
  max-height: var(--results-lite-team-band-height);
  box-sizing: border-box;
}

/* Same inset as full Scoreline results (.team-score-area .team-band in scoreline-polish.css) */
.scoreline-canvas
  .match-module.results-lite-scoreline
  .team-score-area
  .team-band {
  padding: var(--team-band-pad);
  box-sizing: border-box;
}

.scoreline-canvas
  .match-module.results-lite-scoreline
  .match-module__section--result {
  height: var(--results-lite-result-band-height);
  min-height: var(--results-lite-result-band-height);
  max-height: var(--results-lite-result-band-height);
}

.scoreline-canvas .match-module.results-lite-scoreline .result-bridge {
  min-height: 40px;
  overflow: hidden;
}

.scoreline-canvas .match-module.results-lite-scoreline .result-statement {
  min-height: 0;
  padding: 6px 12px;
  font-size: calc(var(--type-result) - 5pt);
  font-weight: 400;
  line-height: 1.2;
  overflow: visible;
}

.scoreline-canvas
  .match-module.results-lite-scoreline
  .result-statement[data-length="long"] {
  min-height: 0;
  font-size: calc((var(--type-result) - 5pt) * 0.82);
  line-height: 1.18;
}

/* Same token as .team-score-area .score (scoreline-polish.css) \u2014 not muted meta */
.scoreline-canvas .match-module.results-lite-scoreline .team-score-area .overs {
  color: var(--container-text, var(--contrast-score));
}

.scoreline-canvas .match-module.results-lite-scoreline .team-identity {
  justify-content: flex-start;
  width: 100%;
}

.scoreline-canvas .match-module.results-lite-scoreline .team-name {
  flex: 1 1 auto;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-box-orient: unset;
  -webkit-line-clamp: unset;
  line-clamp: unset;
}

.scoreline-canvas
  .match-module.results-lite-scoreline
  .team-band[data-side="home"]
  .team-name {
  text-align: right;
}

.scoreline-canvas
  .match-module.results-lite-scoreline
  .team-band[data-side="away"]
  .team-name {
  text-align: left;
}

.scoreline-canvas .results-ledger.results-lite-scoreline-ledger {
  justify-content: flex-start;
}

.scoreline-canvas .results-ledger.results-lite-scoreline-ledger > .match-grade {
  margin-bottom: var(--space-4);
}

.scoreline-canvas
  .results-ledger.results-lite-scoreline-ledger
  > .animated-container {
  flex: 0 0 auto;
}

.scoreline-canvas
  .results-ledger.results-lite-scoreline-ledger
  > .animated-container {
  flex: 0 0 var(--results-lite-match-height, 240px);
  height: var(--results-lite-match-height, 240px);
  min-height: var(--results-lite-match-height, 240px);
  max-height: var(--results-lite-match-height, 240px);
}

.scoreline-canvas
  .results-ledger.results-lite-scoreline-ledger
  > .animated-container
  > .match-module.results-lite-scoreline {
  flex: 1 1 auto;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
}

.scoreline-canvas
  .results-ledger.results-lite-scoreline-ledger
  > .match-separator {
  display: none;
}


/* src/templates/variants/scoreline/styles/scoreline-result-single.css */
/* Scoreline Result Single \u2014 synced with design/_shared/scoreline-result-single.css */

.scoreline-canvas[data-result-single] {
  --type-header-title: 36px;
}

.scoreline-canvas {
  --type-score: 88px;
  --type-result: 38px;
  --type-team: 34px;
  --type-player: 28px;
  --type-figure: 34px;
}

.scoreline-canvas .results-ledger--single,
.scoreline-canvas .results-ledger:has(.single-result-stack) {
  justify-content: center;
}

.scoreline-canvas .single-result-stack {
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
}

/* Vertical stack \u2014 override shared .match-module grid (172px row) for Result Single */
.scoreline-canvas .match-module.match-module--single,
.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module.match-module--single[data-performance-headings="off"]:not(
    .without-performances
  ) {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-3);
  min-width: 0;
  width: 100%;
  height: auto;
  min-height: 0;
  overflow: visible;
  grid-template-rows: unset;
}

.scoreline-canvas .match-module.match-module--single > .match-grade,
.scoreline-canvas .match-module.match-module--single > .result-bridge,
.scoreline-canvas
  .match-module.match-module--single
  > .team-score-area--single {
  display: block;
  flex: 0 0 auto;
  width: 100%;
  min-width: 0;
  height: auto;
  max-height: none;
}

/* One row: T20 \xB7 Round 2 \u2014\u2014\u2014 Nelson Park / 4 (not stacked block children) */
.scoreline-canvas .match-module.match-module--single > .match-context,
.scoreline-canvas[data-result-single] .match-module--single .match-context {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  flex: 0 0 auto;
  width: 100%;
  min-width: 0;
  height: auto;
  max-height: none;
  grid-template-columns: unset;
}

.scoreline-canvas[data-result-single] .match-module--single .context-left {
  flex: 0 1 auto;
  min-width: 0;
}

.scoreline-canvas[data-result-single] .match-module--single .context-venue {
  display: block;
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  -webkit-box-orient: unset;
  -webkit-line-clamp: unset;
  line-clamp: unset;
}

.scoreline-canvas .match-module.match-module--single > .performance-area {
  flex: 0 0 auto;
  width: 100%;
  min-width: 0;
  height: auto;
  max-height: none;
  align-self: stretch;
}

.scoreline-canvas
  .match-module.match-module--single
  .team-score-area.team-score-area--single {
  height: auto;
}

.scoreline-canvas
  .results-ledger:not(.results-lite-scoreline-ledger)
  .match-module.match-module--single[data-performance-headings="off"]
  .performance-area {
  flex: 0 0 auto;
  height: auto;
}

.scoreline-canvas
  .results-ledger
  > .animated-container
  > .match-module.match-module--single,
.scoreline-canvas .results-ledger--single > .match-module.match-module--single {
  flex: 0 0 auto;
  height: auto;
  min-height: 0;
}

.scoreline-canvas .team-score-area--single {
  min-height: 0;
  min-width: 0;
  width: 100%;
  height: auto;
  max-height: none;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 40px minmax(0, 1fr);
  grid-template-rows: auto;
  gap: 6px;
  align-items: start;
  align-content: start;
  background: transparent;
}

.scoreline-canvas .team-score-area--single > .team-band[data-side="home"] {
  grid-column: 1;
  grid-row: 1;
}

.scoreline-canvas .team-score-area--single > .team-band[data-side="away"] {
  grid-column: 3;
  grid-row: 1;
}

.scoreline-canvas .team-score-area--single > .team-band:first-of-type {
  grid-column: 1;
  grid-row: 1;
}

.scoreline-canvas .team-score-area--single > .team-band:last-of-type {
  grid-column: 3;
  grid-row: 1;
}

.scoreline-canvas .team-score-area--single > .team-divider {
  grid-column: 2;
  grid-row: 1;
}

/* Hero band grid: row 1 = crest + score, row 2 = name/role full width */
.scoreline-canvas .team-score-area--single .team-band {
  display: grid;
  gap: 10px 14px;
  align-items: start;
  align-content: start;
  grid-template-rows: auto auto;
  min-width: 0;
  width: 100%;
  max-width: 100%;
}

/* Keep score/mark in row 1 with a real box \u2014 \`display: contents\` dropped team-name row from band height */
.scoreline-canvas .team-score-area--single .team-band .team-primary {
  display: grid;
  grid-column: 1 / -1;
  grid-row: 1;
  gap: 10px 14px;
  align-items: center;
  min-width: 0;
  width: 100%;
}

.scoreline-canvas .team-score-area--single .team-band .team-mark {
  width: 112px;
  height: 112px;
  justify-self: center;
}

.scoreline-canvas .team-score-area--single .team-band .team-score {
  width: auto;
  min-width: 0;
  align-self: center;
  margin: 0;
}

.scoreline-canvas .team-score-area--single .team-band .team-identity {
  display: block;
  min-width: 0;
  width: 100%;
}

.scoreline-canvas[data-result-single] .team-score-area--single .team-name {
  display: block;
  min-width: 0;
  max-width: 100%;
  margin: 0;
  overflow-wrap: normal;
  word-break: normal;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Home \u2014 crest left, score right (toward centre), name row below */
.scoreline-canvas .team-score-area--single .team-band[data-side="home"] {
  grid-template-columns: minmax(0, 1fr);
}

.scoreline-canvas
  .team-score-area--single
  .team-band[data-side="home"]
  .team-primary {
  grid-template-columns: 112px minmax(0, 1fr);
}

.scoreline-canvas
  .team-score-area--single
  .team-band[data-side="home"]
  .team-mark {
  grid-column: 1;
  grid-row: 1;
}

.scoreline-canvas
  .team-score-area--single
  .team-band[data-side="home"]
  .team-score {
  grid-column: 2;
  grid-row: 1;
  justify-items: start;
}

.scoreline-canvas
  .team-score-area--single
  .team-band[data-side="home"]
  .score-stack {
  align-items: flex-start;
}

.scoreline-canvas .team-score-area--single .team-band[data-side="home"] .score,
.scoreline-canvas .team-score-area--single .team-band[data-side="home"] .overs {
  text-align: left;
}

.scoreline-canvas
  .team-score-area--single
  .team-band[data-side="home"]
  .team-name {
  text-align: left;
}

.scoreline-canvas
  .team-score-area--single
  .team-band[data-side="home"]
  .team-identity {
  grid-column: 1 / -1;
  grid-row: 2;
}

/* Away \u2014 score left (toward centre), crest right, name row below */
.scoreline-canvas .team-score-area--single .team-band[data-side="away"] {
  grid-template-columns: minmax(0, 1fr);
}

.scoreline-canvas
  .team-score-area--single
  .team-band[data-side="away"]
  .team-primary {
  grid-template-columns: minmax(0, 1fr) 112px;
}

.scoreline-canvas
  .team-score-area--single
  .team-band[data-side="away"]
  .team-score {
  grid-column: 1;
  grid-row: 1;
  justify-items: start;
}

.scoreline-canvas .team-score-area--single .team-band[data-side="away"] .score,
.scoreline-canvas .team-score-area--single .team-band[data-side="away"] .overs {
  text-align: left;
}

.scoreline-canvas
  .team-score-area--single
  .team-band[data-side="away"]
  .team-mark {
  grid-column: 2;
  grid-row: 1;
}

.scoreline-canvas
  .team-score-area--single
  .team-band[data-side="away"]
  .team-identity {
  grid-column: 1 / -1;
  grid-row: 2;
}

.scoreline-canvas
  .team-score-area--single
  .team-band[data-side="away"]
  .team-name {
  text-align: left;
}

/*
 * Both teams left \u2014 beats scoreline-results home-right + logo-band rules
 * (higher specificity than \`.team-score-area .team-band[data-logo-band-bg][data-side=home]\`).
 */
.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-side="home"]
  .team-primary,
.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-side="home"]
  .team-score,
.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"][data-side="home"]
  .team-primary,
.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"][data-side="home"]
  .team-score {
  justify-items: start;
}

.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-side="home"]
  .score-stack,
.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"][data-side="home"]
  .score-stack {
  align-items: flex-start;
}

.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-side="home"]
  :is(.score, .score--prior, .overs),
.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"][data-side="home"]
  :is(.score, .score--prior, .overs) {
  text-align: left;
}

.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band
  .team-score,
.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-side="away"]
  .team-primary,
.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-side="away"]
  .team-score {
  justify-items: start;
}

.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-side="away"]
  .score-stack {
  align-items: flex-start;
}

.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band[data-side="away"]
  :is(.score, .score--prior, .overs) {
  text-align: left;
}

.scoreline-canvas[data-result-single]
  .results-ledger--single
  .match-module--single
  .team-band[data-side="home"]
  .team-name,
.scoreline-canvas[data-result-single]
  .match-module--single
  .team-score-area--single
  .team-band
  .team-name {
  text-align: left;
}

.scoreline-canvas .match-module.match-module--single > .match-grade {
  box-sizing: border-box;
}

.scoreline-canvas .match-grade {
  min-width: 0;
  padding: 12px 16px 10px;
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.scoreline-canvas .match-grade[data-empty="true"] {
  display: none;
}

.scoreline-canvas .match-grade-name {
  display: -webkit-box;
  overflow: hidden;
  color: var(--match-context-text, var(--container-text, var(--ink)));
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: -0.01em;
  line-height: 1.06;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.scoreline-canvas .match-module.match-module--single .result-statement {
  min-width: 0;
  min-height: 0;
  padding: 7px 16px 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: var(--type-result);
  font-style: italic;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: -0.02em;
  line-height: 1.06;
  text-align: center;
}

.scoreline-canvas .team-band--hero .team-mark {
  width: 112px;
  height: 112px;
}

.scoreline-canvas .match-module--single .performance-area {
  align-content: start;
}

.scoreline-canvas .match-module--single .performance-panel {
  grid-template-rows: auto repeat(3, auto);
  gap: var(--space-3);
  align-content: start;
}

.scoreline-canvas .match-module--single .performance-row {
  padding: 0;
}

.scoreline-canvas .match-module--single .performance-heading {
  margin-bottom: 0;
}

/* Result Single \u2014 band logo background (matches full Results scoreline treatment) */
.scoreline-canvas
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"][data-side="home"] {
  grid-template-columns: minmax(0, 1fr);
}

.scoreline-canvas
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"][data-side="away"] {
  grid-template-columns: minmax(0, 1fr);
}

.scoreline-canvas
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"][data-side="home"]
  .team-score {
  grid-column: 1;
  justify-items: start;
}

.scoreline-canvas
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"][data-side="away"]
  .team-score {
  grid-column: 1;
  justify-items: start;
}

.scoreline-canvas
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"]
  .team-primary {
  grid-template-columns: minmax(0, 1fr);
}

.scoreline-canvas
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"]
  .team-name {
  flex: 1 1 auto;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-wrap: nowrap;
  overflow-wrap: normal;
  word-break: normal;
  -webkit-box-orient: unset;
  -webkit-line-clamp: unset;
  line-clamp: unset;
}

.scoreline-canvas
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"][data-side="home"]
  .team-name {
  text-align: left;
}

.scoreline-canvas
  .match-module--single
  .team-score-area--single
  .team-band[data-logo-band-bg="true"][data-side="away"]
  .team-name {
  text-align: left;
}

.scoreline-canvas
  .match-module--single[data-performance-headings="off"]
  .performance-panel
  > .performance-row:nth-child(1):not([data-empty="true"]),
.scoreline-canvas
  .match-module--single[data-performance-headings="off"]
  .performance-panel
  > .performance-row:nth-child(2):not([data-empty="true"]) {
  padding-top: 6px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--rule);
}

.scoreline-canvas
  .match-module--single[data-performance-headings="off"]
  .performance-panel
  > .performance-row:nth-child(1):not([data-empty="true"])
  :is(.performance-player, .performance-figure),
.scoreline-canvas
  .match-module--single[data-performance-headings="off"]
  .performance-panel
  > .performance-row:nth-child(2):not([data-empty="true"])
  :is(.performance-player, .performance-figure) {
  padding-bottom: 4px;
}


/* src/templates/variants/scoreline/styles/scoreline-upcoming.css */
/* Scoreline Upcoming layout \u2014 synced with design/_shared/scoreline-upcoming.css */

.scoreline-canvas {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header-pad-inline: 28px;
  --zone-header-pad-bottom: 0px;
  --zone-content-pad: 28px;
  --zone-header: 140px;
  --zone-content: 1088px;
  --zone-footer: 112px;
  --club-primary: #862f2f;
  --club-secondary: #efb247;
  --ink: #080b0d;
  --paper: #ffffff;
  --surface: #ffffff;
  --surface-muted: #f3f0ea;
  --rule: rgba(8, 11, 13, 0.12);
  --muted: #5f5b56;
  --font-display: "Geist", Arial, sans-serif;
  --font-body: "Geist", Arial, sans-serif;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --type-fixture-grade: 21px;
  --type-fixture-team: 34px;
  --type-meta: 21px;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  color: var(--ink);
  font-family: var(--font-body);
}

.scoreline-canvas,
.scoreline-canvas * {
  box-sizing: border-box;
}

.scoreline-canvas h1,
.scoreline-canvas h2,
.scoreline-canvas h3,
.scoreline-canvas p {
  margin: 0;
}

.scoreline-canvas .fixture-palette {
  display: none;
}

.scoreline-canvas .team-mark {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: var(--surface);
}

.scoreline-canvas .team-mark img {
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: contain;
}

.scoreline-canvas .fixtures-ledger {
  min-height: 0;
  flex: 1 1 var(--zone-content);
  max-height: var(--zone-content);
  padding: var(--zone-content-pad);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  overflow: hidden;
}

.scoreline-canvas .fixtures-stack {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.scoreline-canvas .fixtures-stack > .fixture-card {
  flex: 0 0 auto;
}

.scoreline-canvas .fixtures-stack > .fixture-separator {
  flex: 0 0 auto;
  margin: var(--space-2) 0;
  padding: var(--space-2) 0;
}

.scoreline-canvas .fixture-card {
  overflow: hidden;
}

.scoreline-canvas .fixture-card > .animated-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.scoreline-canvas .fixture-grade {
  min-width: 0;
  padding: 10px 12px;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: var(--space-3);
  align-items: center;
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.scoreline-canvas .fixture-grade-name {
  display: -webkit-box;
  overflow: hidden;
  align-self: center;
  color: var(--container-text, var(--ink));
  font-family: var(--font-display);
  font-size: var(--type-fixture-grade);
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: -0.01em;
  line-height: 1.3;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.scoreline-canvas .fixture-grade-meta {
  min-width: 0;
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px 8px;
  color: var(--container-text-muted, var(--contrast-meta));
  font-family: var(--font-body);
  font-size: var(--type-fixture-grade);
  font-weight: 500;
  line-height: 1.3;
  text-align: right;
}

.scoreline-canvas .fixture-grade-meta[data-empty="true"] {
  display: none;
}

.scoreline-canvas .meta-separator {
  width: 4px;
  height: 4px;
  flex: 0 0 auto;
  background: var(--club-primary);
}

.scoreline-canvas .meta-separator--secondary {
  background: var(--club-secondary);
}

.scoreline-canvas .meta-chip[data-empty="true"] {
  display: none;
}

.scoreline-canvas .fixture-matchup {
  min-height: 132px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px minmax(0, 1fr);
  gap: 6px;
  align-items: stretch;
}

.scoreline-canvas .fixture-matchup__cell {
  min-width: 0;
  min-height: 132px;
  height: 100%;
}

.scoreline-canvas .fixture-matchup__anim {
  width: 100%;
  height: 100%;
  min-height: 132px;
}

.scoreline-canvas .fixture-matchup__anim > .team-band,
.scoreline-canvas .fixture-matchup__anim > .fixture-centre {
  width: 100%;
  height: 100%;
  min-height: 132px;
}

.scoreline-canvas .fixture-matchup .team-band {
  min-width: 0;
  min-height: 132px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
}

.scoreline-canvas .fixture-matchup .team-band--away {
  flex-direction: row-reverse;
}

.scoreline-canvas .fixture-matchup .team-mark {
  width: 96px;
  height: 96px;
  flex: 0 0 96px;
  background: var(--surface);
}

.scoreline-canvas .fixture-matchup .team-copy {
  min-width: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.scoreline-canvas .fixture-matchup .team-band--away .team-copy {
  align-items: flex-end;
}

.scoreline-canvas .fixture-matchup .team-side-label {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.14em;
  line-height: 1;
  text-transform: uppercase;
}

.scoreline-canvas .fixture-matchup .team-name {
  display: -webkit-box;
  overflow: hidden;
  min-width: 0;
  width: 100%;
  font-family: var(--font-display);
  font-size: var(--type-fixture-team);
  font-style: italic;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-align: left;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.scoreline-canvas .fixture-matchup .team-band--away .team-name {
  text-align: right;
}

.scoreline-canvas .fixture-centre {
  min-width: 0;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
  text-align: center;
}

.scoreline-canvas .fixture-vs {
  color: var(--container-text-muted, var(--muted));
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.scoreline-canvas .fixture-when,
.scoreline-canvas .fixture-where {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.scoreline-canvas .fixture-where {
  padding-top: var(--space-2);
  border-top: 1px solid rgb(8 11 13 / 10%);
}

.scoreline-canvas .fixture-field-label {
  color: var(--container-text-muted, var(--contrast-meta));
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.14em;
  line-height: 1;
  text-transform: uppercase;
}

.scoreline-canvas .fixture-date {
  color: var(--container-text, var(--ink));
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 800;
  font-stretch: condensed;
  letter-spacing: -0.02em;
  line-height: 1;
}

.scoreline-canvas .fixture-time {
  color: var(--club-primary);
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  font-stretch: condensed;
  line-height: 1;
}

.scoreline-canvas .fixture-ground {
  display: -webkit-box;
  overflow: hidden;
  width: 100%;
  color: var(--container-text, var(--contrast-performance));
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 500;
  line-height: 1.34;
  overflow-wrap: anywhere;
  text-wrap: balance;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}


/* src/templates/variants/scoreline/styles/scoreline-ladder.css */
/* Scoreline ladder layout \u2014 synced with src/templates/variants/scoreline/styles/scoreline-ladder.css */

/* Scoreline \u2014 The Crease System \xB7 Ladder */
.scoreline-canvas {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header-pad-inline: 28px;
  --zone-header-pad-bottom: 0px;
  --zone-content-pad: 28px;
  --zone-header: 140px;
  --zone-content: 1088px;
  --zone-footer: 112px;
  --club-primary: #352466;
  --club-secondary: #ffa500;
  --ink: #080b0d;
  --paper: #ffffff;
  --surface: #ffffff;
  --surface-muted: #f3f0ea;
  --rule: rgba(8, 11, 13, 0.12);
  --muted: #5f5b56;
  --font-display: "Geist", Arial, sans-serif;
  --font-body: "Geist", Arial, sans-serif;
  --font-mono: "Geist Mono", "Geist", ui-monospace, monospace;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --ladder-grid: 40px 52px minmax(0, 1fr) repeat(5, 46px);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  /* Remotion: overlay-only \u2014 template background shows through */
  color: var(--ink);
  font-family: var(--font-body);
}

.scoreline-canvas,
.scoreline-canvas * {
  box-sizing: border-box;
}

.scoreline-canvas h1,
.scoreline-canvas h2,
.scoreline-canvas p {
  margin: 0;
}

.fixture-palette {
  display: none;
}

.ladder-mark {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  width: var(--ladder-mark-size, 52px);
  height: var(--ladder-mark-size, 52px);
  flex: 0 0 var(--ladder-mark-size, 52px);
  background: var(--surface);
}

.mark-fallback {
  width: 42%;
  height: 42%;
  border: 3px solid currentColor;
  opacity: 0.14;
}

.ladder-mark img {
  position: absolute;
  inset: 3px;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  object-fit: contain;
}

.ladder-ledger {
  min-height: 0;
  flex: 1 1 var(--zone-content);
  max-height: var(--zone-content);
  padding: var(--zone-content-pad);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ladder-stack {
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ladder-grade {
  flex: 0 0 auto;
  padding: 10px 14px;
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.ladder-grade[data-empty="true"] {
  display: none;
}

.ladder-grade-name {
  display: -webkit-box;
  overflow: hidden;
  color: var(--container-text, var(--ink));
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: -0.01em;
  line-height: 1.12;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.ladder-table {
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.ladder-columns {
  flex: 0 0 auto;
  padding: 2px 12px 6px;
  display: grid;
  grid-template-columns: var(--ladder-grid);
  gap: 8px;
  align-items: end;
  font-family: var(--font-body);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: 1.1;
  text-transform: uppercase;
}

.ladder-columns span:nth-child(n + 4) {
  text-align: center;
}

.ladder-rows {
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  --ladder-rank-size: 28px;
  --ladder-rank-hero-size: 32px;
  --ladder-team-size: 22px;
  --ladder-team-hero-size: 24px;
  --ladder-stat-size: 22px;
  --ladder-stat-pts-size: 26px;
  --ladder-mark-size: 52px;
  --ladder-row-pad-block: 6px;
  --ladder-row-pad-inline: 12px;
}

.ladder-rows[data-density="compact"] {
  --ladder-rank-size: 24px;
  --ladder-rank-hero-size: 28px;
  --ladder-team-size: 20px;
  --ladder-team-hero-size: 22px;
  --ladder-stat-size: 20px;
  --ladder-stat-pts-size: 22px;
  --ladder-mark-size: 44px;
  --ladder-row-pad-block: 4px;
  --ladder-row-pad-inline: 10px;
}

.ladder-rows[data-density="tight"] {
  --ladder-rank-size: 22px;
  --ladder-rank-hero-size: 26px;
  --ladder-team-size: 18px;
  --ladder-team-hero-size: 20px;
  --ladder-stat-size: 18px;
  --ladder-stat-pts-size: 20px;
  --ladder-mark-size: 40px;
  --ladder-row-pad-block: 3px;
  --ladder-row-pad-inline: 8px;
}

.ladder-rows[data-creases="false"] .ladder-crease {
  display: none;
}

.ladder-entry {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.ladder-entry[data-empty="true"] {
  display: none;
}

/* Remotion wraps each ladder row in AnimatedContainer \u2014 restore flex height chain */
.scoreline-canvas .ladder-entry > .animated-container {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 auto;
}

.scoreline-canvas .ladder-entry > .animated-container > .ladder-row {
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
}

.ladder-row {
  min-height: 0;
  flex: 1 1 auto;
  padding: var(--ladder-row-pad-block, 6px) var(--ladder-row-pad-inline, 12px);
  display: grid;
  grid-template-columns: 40px 52px minmax(0, 1fr) minmax(0, 262px);
  gap: 8px;
  align-items: center;
}

.scoreline-canvas[data-ladder] .ladder-rows .ladder-entry .ladder-row {
  background: var(
    --ladder-row-surface,
    color-mix(in srgb, var(--surface-muted) 50%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.ladder-row__cell {
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
}

.ladder-row__cell--rank,
.ladder-row__cell--mark {
  justify-content: center;
}

.ladder-row__cell--team {
  justify-content: flex-start;
}

.ladder-row__cell--stats {
  justify-content: flex-end;
}

.ladder-row__anim {
  width: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
}

.ladder-row__cell--rank .ladder-row__anim,
.ladder-row__cell--mark .ladder-row__anim {
  justify-content: center;
}

.ladder-row__cell--team .ladder-row__anim {
  justify-content: flex-start;
}

.ladder-row__cell--stats .ladder-row__anim {
  justify-content: flex-end;
}

.ladder-row__stats {
  display: grid;
  grid-template-columns: repeat(5, 46px);
  gap: 8px;
  width: max-content;
  max-width: 100%;
}

.ladder-row__cell--team .ladder-team {
  width: 100%;
}

.ladder-rank {
  font-family: var(--font-mono, var(--font-display));
  font-size: var(--ladder-team-size, 22px);
  font-weight: 900;
  font-stretch: condensed;
  line-height: 1;
  font-variant-numeric: tabular-nums lining-nums;
  text-align: center;
}

.ladder-rows .ladder-entry:first-of-type .ladder-rank {
  font-size: var(--ladder-team-hero-size, 24px);
}

.ladder-team {
  min-width: 0;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: var(--ladder-team-size, 22px);
  font-style: italic;
  font-weight: 700;
  font-stretch: condensed;
  line-height: 1.05;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ladder-rows .ladder-entry:first-of-type .ladder-team {
  font-size: var(--ladder-team-hero-size, 24px);
  white-space: normal;
}

.ladder-rows[data-density="compact"] .ladder-entry:first-of-type .ladder-team,
.ladder-rows[data-density="tight"] .ladder-entry:first-of-type .ladder-team {
  white-space: nowrap;
}

.ladder-stat {
  font-family: var(--font-mono, var(--font-display));
  font-size: var(--ladder-team-size, 22px);
  font-weight: 700;
  font-stretch: condensed;
  line-height: 1;
  font-variant-numeric: tabular-nums lining-nums;
  text-align: center;
}

.ladder-stat--pts {
  font-size: var(--ladder-team-size, 22px);
  font-weight: 800;
}

.ladder-rows .ladder-entry:first-of-type .ladder-stat--pts {
  font-size: var(--ladder-team-hero-size, 24px);
}


/* src/templates/variants/scoreline/styles/scoreline-top5.css */
/* Scoreline top5 layout \u2014 synced with src/templates/variants/scoreline/styles/scoreline-top5.css */

/* Scoreline \u2014 The Crease System \xB7 Top 5 Batting */
.scoreline-canvas {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header-pad-inline: 28px;
  --zone-header-pad-bottom: 0px;
  --zone-content-pad: 28px;
  --zone-header: 140px;
  --zone-content: 1088px;
  --zone-footer: 112px;
  --club-primary: #862f2f;
  --club-secondary: #efb247;
  --ink: #080b0d;
  --paper: #ffffff;
  --surface: #ffffff;
  --surface-muted: #f3f0ea;
  --rule: rgba(8, 11, 13, 0.12);
  --muted: #5f5b56;
  --font-display: "Geist", Arial, sans-serif;
  --font-body: "Geist", Arial, sans-serif;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --type-leaderboard-category: 21px;
  --type-leader-name: 34px;
  --type-leader-name-hero: 38px;
  --type-leader-meta-label: 16px;
  --type-leader-team: 20px;
  --type-leader-rank: 39px;
  --type-leader-rank-hero: 47px;
  --type-leader-figure: 42px;
  --type-leader-figure-hero: 50px;
  --type-leader-suffix: 26px;
  --type-leader-sr: 21px;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  /* Remotion: overlay-only \u2014 template background shows through */
  color: var(--ink);
  font-family: var(--font-body);
}

.scoreline-canvas,
.scoreline-canvas * {
  box-sizing: border-box;
}

.scoreline-canvas h1,
.scoreline-canvas h2,
.scoreline-canvas h3,
.scoreline-canvas p {
  margin: 0;
}

.fixture-palette {
  display: none;
}

.leader-mark {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  background: var(--surface);
}

.leader-mark img {
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: contain;
}

.leaderboard-ledger {
  min-height: 0;
  flex: 1 1 var(--zone-content);
  max-height: var(--zone-content);
  padding: var(--zone-content-pad);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  overflow: hidden;
}

.leaderboard-stack {
  width: min(100%, 750px);
  max-width: 75%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.leaderboard-category {
  min-width: 0;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.leaderboard-category-label {
  font-family: var(--font-body);
  font-size: var(--type-leaderboard-category);
  font-weight: 500;
  letter-spacing: 0.14em;
  line-height: 1.3;
  text-transform: uppercase;
}

.leaderboard-category-value {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  color: var(--container-text, var(--ink));
  font-family: var(--font-display);
  font-size: var(--type-leaderboard-category);
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: -0.01em;
  line-height: 1.3;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.leaderboard-category[data-empty="true"] {
  display: none;
}

.leader-row {
  min-width: 0;
  min-height: 120px;
  padding: 12px 14px;
  display: grid;
  grid-template-columns: 48px 72px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
}

.scoreline-canvas[data-leaderboard]
  .leaderboard-rows
  .leader-entry
  .leader-row {
  background: var(
    --ladder-row-surface,
    color-mix(in srgb, var(--surface-muted) 50%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.scoreline-canvas[data-leaderboard]
  .leaderboard-rows
  .leader-entry:first-of-type
  .leader-row {
  background: var(
    --leaderboard-hero-row-surface,
    color-mix(in srgb, var(--surface-muted) 75%, transparent)
  );
}

.leader-entry {
  display: flex;
  flex-direction: column;
}

.leader-entry[data-empty="true"] {
  display: none;
}

.leaderboard-rows .leader-entry:first-of-type .leader-row {
  min-height: 152px;
  padding: 16px 14px;
}

.leader-rank {
  font-family: var(--font-display);
  font-size: var(--type-leader-rank);
  font-weight: 900;
  font-stretch: condensed;
  line-height: 1;
  font-variant-numeric: tabular-nums lining-nums;
  text-align: center;
}

.leaderboard-rows .leader-entry:first-of-type .leader-rank {
  font-size: var(--type-leader-rank-hero);
}

.leader-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.leader-team-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.leader-team-label {
  font-family: var(--font-body);
  font-size: var(--type-leader-meta-label);
  font-weight: 500;
  letter-spacing: 0.14em;
  line-height: 1;
  text-transform: uppercase;
}

.leader-team {
  overflow: hidden;
  font-size: var(--type-leader-team);
  font-weight: 500;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.leader-name {
  display: -webkit-box;
  overflow: hidden;
  min-width: 0;
  font-family: var(--font-display);
  font-size: var(--type-leader-name);
  font-style: italic;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: -0.02em;
  line-height: 1.05;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.leaderboard-rows .leader-entry:first-of-type .leader-name {
  font-size: var(--type-leader-name-hero);
}

.leader-stats {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  text-align: right;
}

.leader-figure {
  display: inline-flex;
  align-items: baseline;
  gap: 0;
  color: var(--container-text, var(--ink));
  font-family: var(--font-display);
  font-size: var(--type-leader-figure);
  font-weight: 800;
  font-stretch: condensed;
  line-height: 1;
  white-space: nowrap;
  font-variant-numeric: tabular-nums lining-nums;
}

.leaderboard-rows .leader-entry:first-of-type .leader-figure {
  font-size: var(--type-leader-figure-hero);
  font-weight: 800;
}

.leader-balls,
.leader-overs {
  margin-left: 4px;
  font-family: var(--font-body);
  font-size: var(--type-leader-suffix);
  font-weight: 500;
  font-variant-numeric: tabular-nums lining-nums;
}

.leader-figure-label {
  font-family: var(--font-body);
  font-size: var(--type-leader-meta-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1;
  text-transform: uppercase;
}

.leader-sr {
  font-family: var(--font-body);
  font-size: var(--type-leader-sr);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1;
  text-transform: uppercase;
}

.leader-sr[data-empty="true"] {
  display: none;
}


/* src/templates/variants/scoreline/styles/scoreline-performances.css */
/* Scoreline performances \u2014 density overrides for 6\u20137 row screens (Top 5 base: scoreline-top5.css) */

.scoreline-canvas[data-leaderboard]
  .leaderboard-rows[data-density="compact"]
  .leader-row {
  min-height: 96px;
  padding: 10px 14px;
}

.scoreline-canvas[data-leaderboard]
  .leaderboard-rows[data-density="compact"]
  .leader-entry:first-of-type
  .leader-row {
  min-height: 124px;
  padding: 12px 14px;
}

.scoreline-canvas[data-leaderboard]
  .leaderboard-rows[data-density="tight"]
  .leader-row {
  min-height: 88px;
  padding: 8px 14px;
}

.scoreline-canvas[data-leaderboard]
  .leaderboard-rows[data-density="tight"]
  .leader-entry:first-of-type
  .leader-row {
  min-height: 112px;
  padding: 10px 14px;
}

.scoreline-canvas[data-leaderboard]
  .leaderboard-rows[data-density="tight"]
  .leader-copy {
  gap: 6px;
}

.scoreline-canvas[data-leaderboard]
  .leaderboard-rows[data-density="tight"]
  .leader-stats {
  gap: 4px;
}


/* src/templates/variants/scoreline/styles/scoreline-team-roster.css */
/* Scoreline team-roster layout \u2014 synced with src/templates/variants/scoreline/styles/scoreline-team-roster.css */

/* Scoreline \u2014 The Crease System \xB7 Team Roster */
.scoreline-canvas {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header-pad-inline: 28px;
  --zone-header-pad-bottom: 0px;
  --zone-content-pad: 28px;
  --zone-header: 140px;
  --zone-content: 1088px;
  --zone-footer: 112px;
  --club-primary: #352466;
  --club-secondary: #ffa500;
  --ink: #080b0d;
  --paper: #ffffff;
  --surface: #ffffff;
  --surface-muted: #f3f0ea;
  --rule: rgba(8, 11, 13, 0.12);
  --muted: #5f5b56;
  --font-display: "Geist", Arial, sans-serif;
  --font-body: "Geist", Arial, sans-serif;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --roster-row-height: 44px;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  /* Remotion: overlay-only \u2014 template background shows through */
  color: var(--ink);
  font-family: var(--font-body);
}

.scoreline-canvas,
.scoreline-canvas * {
  box-sizing: border-box;
}

.scoreline-canvas h1,
.scoreline-canvas h2,
.scoreline-canvas h3,
.scoreline-canvas p {
  margin: 0;
}

.fixture-palette {
  display: none;
}

.team-mark {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  background: var(--surface);
}

.mark-fallback {
  width: 42%;
  height: 42%;
  border: 3px solid currentColor;
  opacity: 0.14;
}

.team-mark img {
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: contain;
}

.roster-ledger {
  min-height: 0;
  flex: 1 1 var(--zone-content);
  max-height: var(--zone-content);
  padding: var(--zone-content-pad);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.roster-stack {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.roster-grade {
  min-width: 0;
  padding: 10px 12px;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: var(--space-3);
  align-items: start;
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.roster-grade-name {
  display: -webkit-box;
  overflow: hidden;
  color: var(--container-text, var(--ink));
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: -0.01em;
  line-height: 1.12;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.roster-grade-meta {
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px 8px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;
  text-align: right;
}

.meta-separator {
  width: 4px;
  height: 4px;
  flex: 0 0 auto;
  background: var(--club-primary);
}

.meta-separator--secondary {
  background: var(--club-secondary);
}

.meta-chip[data-empty="true"] {
  display: none;
}

.fixture-matchup {
  min-height: 110px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 56px minmax(0, 1fr);
  gap: 6px;
  align-items: stretch;
}

.team-band {
  min-width: 0;
  min-height: 110px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.team-band--away {
  flex-direction: row-reverse;
}

.team-copy {
  min-width: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.team-band--away .team-copy {
  align-items: flex-end;
}

.team-side-label {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.14em;
  line-height: 1;
  text-transform: uppercase;
}

.team-name {
  display: -webkit-box;
  overflow: hidden;
  min-width: 0;
  width: 100%;
  color: var(--container-text, var(--ink));
  font-family: var(--font-display);
  font-size: var(--type-team);
  font-style: italic;
  font-weight: 700;
  font-stretch: condensed;
  line-height: 1.05;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.team-band--away .team-name {
  text-align: right;
}

.fixture-centre {
  padding: 8px;
  display: grid;
  place-items: center;
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.fixture-vs {
  color: var(--container-text-muted, var(--muted));
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.roster-lineup {
  width: min(100%, 560px);
  max-width: 58%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.roster-squad-header {
  min-width: 0;
  padding: 8px 12px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.roster-squad-label {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.14em;
  line-height: 1;
  text-transform: uppercase;
}

.roster-squad-team {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  color: var(--container-text, var(--ink));
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  font-stretch: condensed;
  line-height: 1.1;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.roster-rows {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.roster-rows[data-density="compact"] {
  --roster-row-height: 38px;
}

.roster-rows[data-density="tight"] {
  --roster-row-height: 34px;
}

.roster-entry {
  display: flex;
  flex-direction: column;
}

.roster-entry[data-empty="true"] {
  display: none;
}

.roster-row {
  min-height: var(--roster-row-height);
  padding: 0 10px;
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
}

.scoreline-canvas[data-roster] .roster-rows .roster-entry .roster-row {
  background: var(
    --roster-row-surface,
    color-mix(in srgb, var(--surface-muted) 75%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
  color: var(--container-text, var(--ink));
}

.roster-row[data-empty-roster="true"] {
  grid-template-columns: minmax(0, 1fr);
  justify-items: center;
  color: var(--container-text-muted, var(--muted));
  font-size: 16px;
  font-weight: 500;
  font-style: italic;
}

.roster-index {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 900;
  font-stretch: condensed;
  line-height: 1;
  font-variant-numeric: tabular-nums lining-nums;
  text-align: center;
}

.roster-rows[data-density="compact"] .roster-index {
  font-size: 20px;
}

.roster-rows[data-density="tight"] .roster-index {
  font-size: 18px;
}

.roster-player {
  min-width: 0;
  overflow: hidden;
  color: var(--container-text, var(--ink));
  font-size: 22px;
  font-weight: 500;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.roster-rows[data-density="compact"] .roster-player {
  font-size: 20px;
}

.roster-rows[data-density="tight"] .roster-player {
  font-size: 19px;
}

.roster-badges {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
}

.roster-badge {
  padding: 1px 5px;
  color: var(--on-team);
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: 0.06em;
  line-height: 1;
  text-transform: uppercase;
  background: var(--club-secondary);
}

.roster-badge--captain {
  background: var(--club-primary);
}

.roster-context {
  min-width: 0;
  padding: 10px 12px;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: var(--space-3);
  align-items: start;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
}

.roster-context-date {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  font-stretch: condensed;
  line-height: 1.1;
}

.roster-context-venue {
  display: -webkit-box;
  overflow: hidden;
  text-align: right;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.scoreline-canvas[data-roster] {
  --type-team: 24px;
}

.scoreline-canvas[data-roster] .header-identity-lockup {
  grid-template-columns: 80px;
}

.scoreline-canvas[data-roster] .fixture-matchup {
  min-height: 110px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 56px minmax(0, 1fr);
  gap: 6px;
  align-items: stretch;
}

.scoreline-canvas[data-roster] .fixture-matchup .team-band {
  min-height: 110px;
  gap: 12px;
}

.scoreline-canvas[data-roster] .fixture-matchup .team-mark {
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
}

.scoreline-canvas[data-roster] .fixture-centre {
  padding: 8px;
  display: grid;
  place-items: center;
}


/* src/templates/variants/scoreline/styles/scoreline-team-of-the-week.css */
/* Scoreline team-of-the-week layout \u2014 synced with src/templates/variants/scoreline/styles/scoreline-team-of-the-week.css */

/* Scoreline \u2014 The Crease System \xB7 Team of the Week */
.scoreline-canvas {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header-pad-inline: 28px;
  --zone-header-pad-bottom: 0px;
  --zone-content-pad: 28px;
  --zone-header: 140px;
  --zone-content: 1088px;
  --zone-footer: 112px;
  --club-primary: #862f2f;
  --club-secondary: #efb247;
  --ink: #080b0d;
  --paper: #ffffff;
  --surface: #ffffff;
  --surface-muted: #f3f0ea;
  --rule: rgba(8, 11, 13, 0.12);
  --muted: #5f5b56;
  --font-display: "Geist", Arial, sans-serif;
  --font-body: "Geist", Arial, sans-serif;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --type-leader-name: 34px;
  --type-leader-name-hero: 38px;
  --type-leader-meta-label: 16px;
  --type-leader-team: 20px;
  --type-leader-rank: 39px;
  --type-leader-rank-hero: 47px;
  --type-leader-figure: 42px;
  --type-leader-figure-hero: 50px;
  --type-leader-suffix: 26px;
  --type-leader-sr: 21px;
  --type-leaderboard-category: 21px;
  /* Row heights include budget for --totw-row-gap between entries */
  --totw-row-gap: var(--space-2);
  --totw-row-height: 92px;
  --totw-featured-height: 120px;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  /* Remotion: overlay-only \u2014 template background shows through */
  color: var(--ink);
  font-family: var(--font-body);
}

.scoreline-canvas,
.scoreline-canvas * {
  box-sizing: border-box;
}

.scoreline-canvas h1,
.scoreline-canvas h2,
.scoreline-canvas p {
  margin: 0;
}

.fixture-palette {
  display: none;
}

.totw-mark {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  flex: 0 0 56px;
  background: var(--surface);
}

.mark-fallback {
  width: 42%;
  height: 42%;
  border: 3px solid currentColor;
  opacity: 0.14;
}

.totw-mark img {
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: contain;
}

.totw-ledger {
  min-height: 0;
  flex: 1 1 var(--zone-content);
  max-height: var(--zone-content);
  padding: var(--zone-content-pad);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.totw-stack {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.totw-selection {
  width: min(100%, 560px);
  max-width: 58%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.totw-category {
  min-width: 0;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.totw-category-label {
  font-family: var(--font-body);
  font-size: var(--type-leaderboard-category);
  font-weight: 500;
  letter-spacing: 0.14em;
  line-height: 1.3;
  text-transform: uppercase;
}

.totw-category-value {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  color: var(--container-text, var(--ink));
  font-family: var(--font-display);
  font-size: var(--type-leaderboard-category);
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: -0.01em;
  line-height: 1.3;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.totw-category[data-empty="true"] {
  display: none;
}

.totw-rows {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--totw-row-gap);
}

.totw-rows[data-density="compact"] {
  --totw-row-height: 88px;
  --totw-featured-height: 116px;
}

.totw-rows[data-density="tight"] {
  --totw-row-height: 82px;
  --totw-featured-height: 108px;
}

.totw-entry {
  display: flex;
  flex-direction: column;
}

.totw-entry[data-empty="true"] {
  display: none;
}

.scoreline-canvas[data-totw] .totw-rows .totw-entry .totw-row {
  background: var(
    --ladder-row-surface,
    color-mix(in srgb, var(--surface-muted) 50%, transparent)
  );
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
  color: var(--container-text, var(--ink));
}

.totw-row {
  min-height: var(--totw-row-height);
  max-height: var(--totw-row-height);
  padding: 6px 10px;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  overflow: hidden;
}

.totw-rows .totw-entry:first-of-type .totw-row {
  min-height: var(--totw-featured-height);
  max-height: var(--totw-featured-height);
  padding: 8px 12px;
}

.totw-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.totw-role {
  color: var(--container-text-accent, var(--club-secondary));
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: 1;
  text-transform: uppercase;
}

.totw-name {
  overflow: hidden;
  min-width: 0;
  color: var(--container-text, var(--ink));
  font-family: var(--font-display);
  font-size: var(--type-leader-name);
  font-style: italic;
  font-weight: 700;
  font-stretch: condensed;
  line-height: 1.05;
  text-overflow: ellipsis;
  text-transform: capitalize;
  white-space: nowrap;
}

.totw-rows .totw-entry:first-of-type .totw-name {
  font-size: var(--type-leader-name-hero);
}

.totw-team-block {
  min-width: 0;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.totw-team-label {
  color: var(--container-text-muted, var(--muted));
  font-family: var(--font-body);
  font-size: var(--type-leader-meta-label);
  font-weight: 500;
  letter-spacing: 0.14em;
  line-height: 1;
  text-transform: uppercase;
  flex: 0 0 auto;
}

.totw-team {
  overflow: hidden;
  min-width: 0;
  color: var(--container-text, var(--ink));
  font-size: var(--type-leader-team);
  font-weight: 500;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.totw-stats {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  text-align: right;
}

.totw-figure {
  display: inline-flex;
  align-items: baseline;
  gap: 0;
  color: var(--container-text, var(--ink));
  font-family: var(--font-display);
  font-size: var(--type-leader-figure);
  font-weight: 800;
  font-stretch: condensed;
  line-height: 1;
  white-space: nowrap;
  font-variant-numeric: tabular-nums lining-nums;
}

.totw-rows .totw-entry:first-of-type .totw-figure {
  font-size: var(--type-leader-figure-hero);
  font-weight: 800;
}

.totw-balls {
  margin-left: 4px;
  color: var(--container-text-muted, var(--muted));
  font-family: var(--font-body);
  font-size: var(--type-leader-suffix);
  font-weight: 500;
  font-variant-numeric: tabular-nums lining-nums;
}

.totw-subline {
  color: var(--container-text-muted, var(--muted));
  font-family: var(--font-body);
  font-size: var(--type-leader-sr);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1;
  text-transform: uppercase;
}

.totw-subline[data-empty="true"] {
  display: none;
}
`;

// src/package/ScorelineBundledStyles.tsx
import { jsx } from "react/jsx-runtime";
var STYLE_ELEMENT_ID = "fixtura-scoreline-styles";
var ScorelineBundledStyles = () => /* @__PURE__ */ jsx(
  "style",
  {
    id: STYLE_ELEMENT_ID,
    dangerouslySetInnerHTML: { __html: SCORELINE_BUNDLED_CSS }
  }
);

export {
  ScorelineBundledStyles
};
//# sourceMappingURL=chunk-7DM3J7LM.mjs.map