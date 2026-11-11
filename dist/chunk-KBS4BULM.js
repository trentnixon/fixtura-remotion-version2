"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); // src/package/generated/nightSessionBundledCss.ts
var NIGHT_SESSION_BUNDLED_CSS = `/* src/templates/variants/nightSession/styles/night-session-shared.css */
/* Scoreline shared polish \u2014 tokens, surfaces, contrast, layout states */

.night-session-canvas {
  --font-display: "Teko", "Arial Narrow", sans-serif;
  --font-body: "Source Sans 3", Arial, sans-serif;

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
  --team-band-pad: 28px;

  /* Sponsor strip */
  --sponsor-gradient-top: transparent;
  --sponsor-gradient-base: transparent;

  /* Surface texture (see design/_shared/textures/manifest.json) */
  --texture-noise-url: var(--texture-noise-url);
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
.night-session-canvas .fixture-palette {
  display: none;
}

/* \u2014\u2014 Crease motif (shared across Scoreline assets) \u2014\u2014 */
.night-session-canvas .crease-rule {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: var(--crease-rule-height);
  flex: 0 0 auto;
}

.night-session-canvas .crease-post {
  width: var(--crease-post-width);
  height: var(--crease-post-height);
  flex: 0 0 var(--crease-post-width);
}

.night-session-canvas .crease-post--primary {
  background: var(--club-primary);
}

.night-session-canvas .crease-post--secondary {
  background: var(--club-secondary);
}

.night-session-canvas .crease-rail {
  flex: 1 1 auto;
  display: flex;
  height: var(--crease-rail-height);
}

.night-session-canvas .crease-rail__primary,
.night-session-canvas .crease-rail__secondary {
  flex: 1 1 50%;
  height: var(--crease-rail-height);
}

.night-session-canvas .crease-rail__primary {
  background: var(--club-primary);
}

.night-session-canvas .crease-rail__secondary {
  background: var(--club-secondary);
}

.night-session-canvas .footer-crease {
  flex: 0 0 auto;
  padding: 0 var(--zone-content-pad);
}

.night-session-canvas :is(.match-separator, .fixture-separator) {
  flex: 0 0 auto;
  margin: var(--space-4) 0;
  padding: var(--space-3) 0;
}

.night-session-canvas
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

.night-session-canvas
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

.night-session-canvas
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

.night-session-canvas :is(.leader-crease, .ladder-crease, .totw-crease) {
  flex: 0 0 auto;
  padding: var(--space-2) 0;
}

.night-session-canvas .roster-crease {
  flex: 0 0 auto;
  padding: var(--space-1) 0;
}

.night-session-canvas .roster-crease .crease-rule {
  height: var(--crease-rule-height-compact);
}

.night-session-canvas .roster-crease .crease-post {
  height: var(--crease-post-height-compact);
}

.night-session-canvas
  .roster-crease
  :is(.crease-rail, .crease-rail__primary, .crease-rail__secondary) {
  height: var(--crease-rail-height);
}

.night-session-canvas
  :is(
    .leaderboard-rows .leader-entry:not(:first-of-type) .leader-crease,
    .ladder-rows .ladder-entry:not(:first-of-type) .ladder-crease,
    .totw-rows .totw-entry:not(:first-of-type) .totw-crease
  )
  .crease-post--primary,
.night-session-canvas
  :is(
    .leaderboard-rows .leader-entry:not(:first-of-type) .leader-crease,
    .ladder-rows .ladder-entry:not(:first-of-type) .ladder-crease,
    .totw-rows .totw-entry:not(:first-of-type) .totw-crease
  )
  .crease-rail__primary {
  background: var(--club-secondary);
}

.night-session-canvas
  :is(
    .leaderboard-rows .leader-entry:not(:first-of-type) .leader-crease,
    .ladder-rows .ladder-entry:not(:first-of-type) .ladder-crease,
    .totw-rows .totw-entry:not(:first-of-type) .totw-crease
  )
  .crease-post--secondary,
.night-session-canvas
  :is(
    .leaderboard-rows .leader-entry:not(:first-of-type) .leader-crease,
    .ladder-rows .ladder-entry:not(:first-of-type) .ladder-crease,
    .totw-rows .totw-entry:not(:first-of-type) .totw-crease
  )
  .crease-rail__secondary {
  background: var(--club-primary);
}

.night-session-canvas
  .roster-rows
  .roster-entry:nth-of-type(even)
  .roster-crease
  .crease-post--primary,
.night-session-canvas
  .roster-rows
  .roster-entry:nth-of-type(even)
  .roster-crease
  .crease-rail__primary {
  background: var(--club-secondary);
}

.night-session-canvas
  .roster-rows
  .roster-entry:nth-of-type(even)
  .roster-crease
  .crease-post--secondary,
.night-session-canvas
  .roster-rows
  .roster-entry:nth-of-type(even)
  .roster-crease
  .crease-rail__secondary {
  background: var(--club-primary);
}

.night-session-canvas[data-totw] .totw-entry:last-of-type .totw-crease {
  display: none;
}

.night-session-canvas .performance-heading {
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

.night-session-canvas .performance-heading::after {
  display: block;
  width: 28px;
  height: 2px;
  margin-top: 6px;
  background: var(--club-primary);
  content: "";
}

.night-session-canvas .performance-panel:last-child .performance-heading {
  color: var(--club-secondary);
}

.night-session-canvas
  .performance-panel:last-child
  .performance-heading::after {
  background: var(--club-secondary);
}

/* \u2014\u2014 Asset header shell \u2014\u2014 */
.night-session-canvas .scoreline-header {
  flex: 0 0 var(--zone-header);
  min-height: var(--zone-header);
  max-height: var(--zone-header);
  padding: var(--zone-pad) var(--zone-header-pad-inline)
    var(--zone-header-pad-bottom);
  display: flex;
  flex-direction: column;
  border-bottom: 0;
}

.night-session-canvas .header-shell {
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

.night-session-canvas .header-shell::before {
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

.night-session-canvas .header-shell__main {
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(168px, 42%);
  align-items: center;
}

.night-session-canvas .header-identity-lockup {
  min-width: 0;
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  padding: 0 16px 0 20px;
}

.night-session-canvas .header-title-stack {
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

.night-session-canvas .header-eyebrow {
  color: var(--header-text, var(--ink));
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 700;
  font-stretch: condensed;
  letter-spacing: 0.14em;
  line-height: 1;
  text-transform: uppercase;
}

.night-session-canvas .header-eyebrow::after {
  display: block;
  width: 24px;
  height: 2px;
  margin-top: 6px;
  margin-inline-start: auto;
  background: var(--header-accent, var(--club-primary));
  content: "";
}

.night-session-canvas .header-shell__crease {
  padding: 0 16px 8px 20px;
}

.night-session-canvas .header-identity {
  min-width: 0;
  overflow: hidden;
}

.night-session-canvas .header-identity-lockup .organisation-name {
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

.night-session-canvas .scoreline-header h1,
.night-session-canvas .header-title-stack .header-title {
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

.night-session-canvas .header-identity-lockup .organisation-mark {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  background: transparent;
}

.night-session-canvas .mark-fallback {
  width: 42%;
  height: 42%;
  border: 3px solid currentColor;
  opacity: 0.14;
}

.night-session-canvas .organisation-mark[data-has-crest="true"] .mark-fallback,
.night-session-canvas .organisation-mark:has(img:not([hidden])) .mark-fallback {
  display: none;
}

.night-session-canvas .header-identity-lockup .organisation-mark img {
  position: absolute;
  inset: 6px;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  object-fit: contain;
}

/* \u2014\u2014 Team score bands (match modules only) \u2014\u2014 */
.night-session-canvas .team-score-area .team-band {
  position: relative;
  overflow: hidden;
  padding: var(--team-band-pad);
  border-top: var(--border-optical-light);
  border-bottom: var(--border-optical-dark);
  box-shadow: var(--highlight-inset);
  color: var(--container-text, var(--on-surface));
}

/* Team crest as band background (Results family + Top 5 + TOTW + Ladder rows) */
.night-session-canvas
  :is(
    .team-band[data-logo-band-bg="true"],
    .leader-row[data-logo-band-bg="true"],
    .totw-row[data-logo-band-bg="true"],
    .ladder-row[data-logo-band-bg="true"]
  ) {
  position: relative;
  overflow: hidden;
}

/* Crest bg layer (DOM \u2014 avoids ::before club/crease overrides on comparison-band) */
.night-session-canvas
  :is(
    .team-band[data-logo-band-bg="true"] .team-band-logo-preload,
    .leader-row[data-logo-band-bg="true"] > .team-band-logo-preload,
    .totw-row[data-logo-band-bg="true"] > .team-band-logo-preload,
    .ladder-row[data-logo-band-bg="true"] > .team-band-logo-preload
  ) {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
}

.night-session-canvas
  :is(
    .team-band[data-logo-band-bg="true"] .team-band-logo-bg,
    .leader-row[data-logo-band-bg="true"] > .team-band-logo-bg,
    .totw-row[data-logo-band-bg="true"] > .team-band-logo-bg,
    .ladder-row[data-logo-band-bg="true"] > .team-band-logo-bg
  ) {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.1;
  filter: grayscale(0.75);
  mix-blend-mode: soft-light;
  pointer-events: none;
}

.night-session-canvas
  :is(
    .leader-row[data-logo-band-bg="true"],
    .totw-row[data-logo-band-bg="true"],
    .ladder-row[data-logo-band-bg="true"]
  )
  > *:not(.team-band-logo-preload):not(.team-band-logo-bg) {
  position: relative;
  z-index: 1;
}

.night-session-canvas
  .team-band[data-logo-band-bg="true"][data-club-team="true"]::before {
  display: none;
}

.night-session-canvas .team-band[data-logo-band-bg="true"] .team-group {
  position: relative;
  z-index: 1;
}

/* Results family \u2014 stacked team band: team name \u2192 score \u2192 overs */
.night-session-canvas .comparison-band .team-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 8px);
  width: 100%;
  min-width: 0;
}

.night-session-canvas
  .comparison-band
  .team-band[data-side="home"]
  .team-group {
  align-items: flex-end;
  text-align: right;
}

.night-session-canvas
  .comparison-band
  .team-band[data-side="away"]
  .team-group {
  align-items: flex-start;
  text-align: left;
}

.night-session-canvas .comparison-band .team-score {
  display: block;
  margin: 0;
  width: 100%;
  max-width: 100%;
}

.night-session-canvas .comparison-band .score-stack {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 0;
  min-width: 0;
}

.night-session-canvas
  .comparison-band
  .team-band[data-side="home"]
  .score-stack {
  align-items: flex-end;
}

.night-session-canvas
  .comparison-band
  .team-band[data-side="away"]
  .score-stack {
  align-items: flex-start;
}

.night-session-canvas
  .comparison-band
  .team-band[data-side="home"]
  :is(.score, .score--prior, .overs, .team-name) {
  text-align: right;
}

.night-session-canvas
  .comparison-band
  .team-band[data-side="away"]
  :is(.score, .score--prior, .overs, .team-name) {
  text-align: left;
}

.night-session-canvas .comparison-band .team-identity {
  display: block;
  width: 100%;
  min-width: 0;
}

/* Results family \u2014 pill-shaped visible containers */
.night-session-canvas {
  --ns-container-radius: 50px;
}

.night-session-canvas .match-module .team-score-area {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .match-module .team-score-area::before {
  border-radius: inherit;
}

.night-session-canvas .comparison-band .team-band {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .comparison-band .team-mark {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .result-bridge.outcome-bridge,
.night-session-canvas .outcome-bridge {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .outcome-bridge .result-statement,
.night-session-canvas .result-bridge.outcome-bridge .result-statement {
  border-radius: var(--ns-container-radius);
}

.night-session-canvas .performance-area {
  border-radius: var(--ns-container-radius);
}

.night-session-canvas .performance-row .performance-player,
.night-session-canvas .performance-row .performance-figure {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .match-module .match-context {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .match-module--single.fixture-card.fixture-unit,
.night-session-canvas .match-module--single .fixture-unit__rail,
.night-session-canvas .match-module--single .fixture-unit__frame {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .results-ledger .match-grade,
.night-session-canvas .header-shared-grade {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas
  .team-score-area
  .team-band[data-club-team="true"]::before {
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

.night-session-canvas
  .team-score-area
  > .team-band:last-of-type[data-club-team="true"]::before {
  --team-spot-x: 72%;
}

.night-session-canvas .team-score-area .team-band > * {
  position: relative;
  z-index: 1;
}

.night-session-canvas .team-score-area .team-band[data-club-team="true"] {
  background: linear-gradient(
    var(--surface-gradient-angle),
    var(--team-gradient-deep-primary),
    var(--team-surface-primary),
    var(--team-gradient-lift-primary)
  );
}

.night-session-canvas .team-score-area .team-band[data-club-team="false"] {
  background: linear-gradient(
    var(--surface-gradient-angle),
    var(--team-gradient-deep-secondary),
    var(--team-surface-secondary),
    var(--team-gradient-lift-secondary)
  );
}

.night-session-canvas
  .team-score-area
  > .team-band:last-of-type[data-club-team="true"] {
  background: linear-gradient(
    calc(var(--surface-gradient-angle) + 180deg),
    var(--team-gradient-deep-primary),
    var(--team-surface-primary),
    var(--team-gradient-lift-primary)
  );
}

.night-session-canvas
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
.night-session-canvas .team-score-area .score {
  color: var(--container-text, var(--contrast-score));
}

.night-session-canvas .team-score-area .team-name {
  color: var(--container-text, var(--contrast-team));
}

.night-session-canvas .team-score-area .overs,
.night-session-canvas .team-score-area .team-role {
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

.night-session-canvas .result-statement {
  color: var(--contrast-score);
}

/* Outcome pill on results \u2014 black tag, white copy (see night-session-results.css) */
.night-session-canvas .outcome-bridge .result-statement {
  color: rgb(244 243 241 / 96%);
}

.night-session-canvas .performance-player {
  color: var(--contrast-performance-support);
  font-weight: 600;
}

.night-session-canvas .performance-area .performance-player {
  color: var(--container-text-support, var(--contrast-performance-support));
}

.night-session-canvas .performance-figure {
  color: var(--container-text, var(--contrast-performance-lead));
  font-weight: 700;
}

.night-session-canvas .performance-area .performance-figure {
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas .performance-panel:last-child .performance-figure {
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas
  .performance-area
  .performance-panel:last-child
  .performance-figure {
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas .performance-row[data-rank="1"] .performance-player {
  color: var(--contrast-performance-lead);
  font-weight: 650;
}

.night-session-canvas
  .performance-area
  .performance-row[data-rank="1"]
  .performance-player {
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas .performance-row[data-rank="1"] .performance-figure {
  font-weight: 800;
}

.night-session-canvas .performance-row[data-rank="2"] .performance-figure,
.night-session-canvas .performance-row[data-rank="3"] .performance-figure {
  font-weight: 700;
  opacity: 0.9;
}

.night-session-canvas .performance-balls,
.night-session-canvas .performance-empty {
  color: var(--contrast-meta);
}

.night-session-canvas .performance-area .performance-balls,
.night-session-canvas .performance-area .performance-empty {
  color: var(--container-text-muted, var(--contrast-meta));
}

.night-session-canvas .context-left,
.night-session-canvas .match-context {
  color: var(
    --match-context-text-muted,
    var(--container-text-muted, var(--contrast-meta))
  );
}

.night-session-canvas .context-venue {
  color: var(
    --match-context-text,
    var(--container-text, var(--contrast-performance))
  );
}

/* \u2014\u2014 Container copy (light/lightAlt = light panel + dark text; dark/darkAlt = dark panel + white text) \u2014\u2014 */
.night-session-canvas
  :is(
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

.night-session-canvas
  :is(
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
    [data-leaderboard] .leader-entry:not(:first-of-type) .leader-sr,
    [data-leaderboard] .leader-entry:not(:first-of-type) .leader-figure-label,
    [data-totw] .totw-team-label,
    [data-totw] .totw-balls,
    [data-totw] .totw-subline,
    .fixture-field-label,
    .fixture-grade-meta
  ) {
  color: var(--container-text-muted, var(--contrast-meta));
}

.night-session-canvas
  :is(
    [data-leaderboard] .leader-name,
    [data-leaderboard] .leaderboard-category-value,
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

.night-session-canvas :is([data-roster] .roster-index) {
  color: var(
    --ns-roster-index-text,
    var(--container-text-accent, var(--container-text, rgb(8 11 13 / 96%)))
  );
}

.night-session-canvas[data-leaderboard] .leader-rank.leader-rank-tag,
.night-session-canvas[data-leaderboard] .leader-rank-tag.schedule-lockup {
  color: var(
    --ns-leader-rank-text,
    var(--container-text-accent, var(--container-text, rgb(8 11 13 / 96%)))
  );
}

/* Container surfaces \u2014 40% min tint via tokens; clip copy inside panel bounds */
.night-session-canvas
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
.night-session-canvas .result-statement {
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
.night-session-canvas .organisation-mark,
.night-session-canvas .team-mark,
.night-session-canvas .leader-mark,
.night-session-canvas .ladder-mark {
  border: var(--well-border);
  box-shadow: var(--well-shadow);
}

.night-session-canvas[data-ladder] .ladder-mark {
  border-radius: 50%;
}

.night-session-canvas .leader-mark[data-has-crest="true"] .mark-fallback,
.night-session-canvas .leader-mark:has(img:not([hidden])) .mark-fallback,
.night-session-canvas .ladder-mark[data-has-crest="true"] .mark-fallback,
.night-session-canvas .ladder-mark:has(img:not([hidden])) .mark-fallback {
  display: none;
}

/* \u2014\u2014 Data-resilient layout states \u2014\u2014 */
.night-session-canvas
  .match-module[data-performance-count="1"]
  .performance-area {
  grid-template-columns: minmax(0, 1fr);
}

.night-session-canvas
  .match-module[data-performance-count="1"]
  .performance-panel[data-state="empty"] {
  display: none;
}

.night-session-canvas
  .team-score-area
  .team-band[data-has-crest="false"]
  .team-mark {
  display: none;
}

.night-session-canvas
  .team-score-area
  .team-band[data-has-crest="false"]
  .team-primary,
.night-session-canvas
  .team-score-area
  > .team-band:last-of-type[data-has-crest="false"]
  .team-primary {
  grid-template-columns: minmax(0, 1fr);
}

.night-session-canvas .organisation-mark[data-has-crest="false"] img {
  display: none;
}

.night-session-canvas
  .organisation-mark[data-has-crest="false"]
  .mark-fallback {
  opacity: 0.22;
}

.night-session-canvas .result-statement[data-length="long"] {
  display: -webkit-box;
  overflow: hidden;
  font-size: calc(var(--type-result) * 0.82);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* \u2014\u2014 Typography roles \u2014\u2014 */
/* Display (--font-display): asset title lockup, intro, performance section labels.
   Body (--font-body): names, stats, metadata, and all ledger row data. */
.night-session-canvas
  :is(
    .header-shared-grade,
    .score,
    .overs,
    .ladder-rank,
    .ladder-rank.ladder-cell,
    .ladder-team,
    .ladder-team.ladder-cell,
    .ladder-stat,
    .ladder-stat--pts,
    .leaderboard-category-value,
    .leader-rank-tag.schedule-lockup,
    .leader-copy .leader-name,
    .leader-row .leader-figure,
    .fixture-time,
    .fixture-date,
    .outcome-bridge .result-statement,
    .result-bridge.outcome-bridge .result-statement,
    .match-module .performance-row .performance-figure,
    .match-module
      .performance-row
      .performance-figure
      > span:not(.performance-balls),
    .roster-team-name--hero,
    .roster-schedule-line:first-child,
    .roster-squad-team,
    .roster-index.roster-cell,
    .roster-player__name,
    .roster-badge,
    .totw-category-value,
    .totw-name,
    .totw-figure
  ) {
  font-family: var(--font-body);
  font-stretch: normal;
}

/* \u2014\u2014 Typography resilience \u2014\u2014 */
.night-session-canvas .team-name,
.night-session-canvas .organisation-name {
  overflow-wrap: anywhere;
  text-wrap: balance;
}

/* Not Scoreline: global ladder/team roster rules set display names italic */
.night-session-canvas :is(.team-name, .ladder-team) {
  font-style: normal;
}

/* \u2014\u2014 Footer & sponsor strip (fits --zone-footer / theme footer 112px) \u2014\u2014 */
.night-session-canvas .asset-footer {
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

.night-session-canvas .sponsor-strip {
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

.night-session-canvas .sponsor-strip > * {
  position: relative;
  z-index: 1;
}

.night-session-canvas .sponsor-slot {
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

.night-session-canvas .sponsor-slot img {
  max-width: 100%;
  max-height: 56px;
  object-fit: contain;
}

.night-session-canvas .sponsor-symbol {
  width: 56px;
  height: 40px;
  flex: 0 0 auto;
  border: 0;
  background: color-mix(in srgb, var(--muted) 18%, transparent);
  opacity: 0.5;
}

.night-session-canvas[data-sponsor-state="absent"] .asset-footer {
  display: none;
}

.night-session-canvas .team-mark {
  position: relative;
  z-index: 2;
}

/* \u2014\u2014 Fixture matchup bands (upcoming) \u2014\u2014 */
.night-session-canvas .fixture-matchup .team-band {
  position: relative;
  overflow: hidden;
  padding: var(--team-band-pad);
  border-top: var(--border-optical-light);
  border-bottom: var(--border-optical-dark);
  box-shadow: var(--highlight-inset);
  color: var(--container-text, var(--on-surface));
}

.night-session-canvas .fixture-matchup .team-band::before {
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

.night-session-canvas .fixture-matchup .team-band--home::before {
  --team-spot-x: 28%;
}

.night-session-canvas .fixture-matchup .team-band--away::before {
  --team-spot-x: 72%;
}

.night-session-canvas .fixture-matchup .team-band > * {
  position: relative;
  z-index: 1;
}

.night-session-canvas .fixture-matchup .team-band--home {
  background: linear-gradient(
    var(--surface-gradient-angle),
    var(--team-gradient-deep-primary),
    var(--team-surface-primary),
    var(--team-gradient-lift-primary)
  );
}

.night-session-canvas .fixture-matchup .team-band--away {
  background: linear-gradient(
    calc(var(--surface-gradient-angle) + 180deg),
    var(--team-gradient-deep-secondary),
    var(--team-surface-secondary),
    var(--team-gradient-lift-secondary)
  );
}

.night-session-canvas
  .fixture-matchup
  .team-band--home[data-club-team="false"] {
  background: linear-gradient(
    var(--surface-gradient-angle),
    var(--team-gradient-deep-secondary),
    var(--team-surface-secondary),
    var(--team-gradient-lift-secondary)
  );
}

.night-session-canvas .fixture-matchup .team-band--away[data-club-team="true"] {
  background: linear-gradient(
    calc(var(--surface-gradient-angle) + 180deg),
    var(--team-gradient-deep-primary),
    var(--team-surface-primary),
    var(--team-gradient-lift-primary)
  );
}

/* Fixture team bands \u2014 mode container copy (not surface contrast) */
.night-session-canvas .fixture-matchup .team-name {
  color: var(--container-text, var(--contrast-team));
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.night-session-canvas .fixture-matchup .team-side-label {
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

.night-session-canvas
  .fixture-matchup
  .team-band[data-has-crest="false"]
  .team-mark {
  display: none;
}

.night-session-canvas .fixture-grade {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.night-session-canvas .fixture-centre {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

/* \u2014\u2014 Top 5 leaderboard \u2014\u2014 */
.night-session-canvas .leaderboard-category {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.night-session-canvas .leaderboard-category-label {
  color: var(--container-text-muted, var(--contrast-meta));
}

.night-session-canvas[data-leaderboard]
  .leader-entry:first-of-type
  .leader-name {
  overflow-wrap: anywhere;
  text-wrap: balance;
}

/* Top 5: #1 opacity is applied on the whole entry in night-session-top5.css */

.night-session-canvas[data-leaderboard] .leader-name {
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas[data-leaderboard] .leader-figure,
.night-session-canvas[data-leaderboard] .leader-balls,
.night-session-canvas[data-leaderboard] .leader-overs {
  color: var(--header-text, rgb(255 255 255 / 92%));
}

.night-session-canvas[data-leaderboard] .leader-team-label,
.night-session-canvas[data-leaderboard] .leader-team,
.night-session-canvas[data-leaderboard] .leader-sr,
.night-session-canvas[data-leaderboard] .leader-figure-label {
  color: var(--container-text-muted, var(--contrast-meta));
}

.night-session-canvas[data-leaderboard] .leader-mark[data-has-crest="false"] {
  visibility: hidden;
}

/* \u2014\u2014 Ladder table \u2014\u2014 */
.night-session-canvas .ladder-grade {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.night-session-canvas .ladder-columns {
  color: var(--contrast-meta);
  border-bottom: 1px solid rgb(8 11 13 / 8%);
}

.night-session-canvas[data-ladder] .ladder-entry:first-of-type .ladder-team {
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.night-session-canvas[data-ladder]
  .ladder-rows
  .ladder-row
  :is(
    .ladder-rank,
    .ladder-rank.ladder-cell,
    .ladder-team,
    .ladder-team.ladder-cell,
    .ladder-stat,
    .ladder-stat--pts
  ) {
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas[data-ladder]
  .ladder-rows
  .ladder-entry:nth-of-type(even)
  .ladder-row {
  box-shadow: var(--highlight-inset-light);
}

.night-session-canvas[data-ladder] .ladder-row[data-bias="true"] {
  box-shadow:
    var(--match-context-inset, var(--highlight-inset-light)),
    inset 4px 0 0 var(--club-secondary);
}

.night-session-canvas[data-ladder] .ladder-mark[data-has-crest="false"] {
  visibility: hidden;
}

/* \u2014\u2014 Team roster \u2014\u2014 */
.night-session-canvas[data-roster] .roster-grade.fixture-unit__rail {
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

.night-session-canvas[data-roster] .roster-grade-meta {
  color: var(--container-text-muted, var(--contrast-meta));
}

.night-session-canvas[data-roster] .roster-squad-header {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.night-session-canvas[data-roster] .roster-squad-label {
  color: var(--container-text-muted, var(--contrast-meta));
}

.night-session-canvas[data-roster] .fixture-matchup .team-name {
  color: var(--container-text, var(--contrast-team));
}

.night-session-canvas[data-roster] .roster-index {
  color: var(
    --ns-roster-index-text,
    var(--container-text-accent, var(--container-text, rgb(8 11 13 / 96%)))
  );
}

.night-session-canvas[data-roster] .roster-player {
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas[data-roster] .roster-row[data-empty-roster="true"] {
  color: var(--container-text-muted, var(--contrast-meta));
}

.night-session-canvas[data-roster] .roster-context {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
  background: var(
    --match-context-surface,
    color-mix(in srgb, var(--surface-muted) 40%, transparent)
  );
}

.night-session-canvas[data-roster] .roster-context > * {
  position: relative;
  z-index: 1;
}

.night-session-canvas[data-roster] .roster-context-date {
  color: var(
    --match-context-text,
    var(--container-text, var(--contrast-performance-lead))
  );
}

.night-session-canvas[data-roster] .roster-context-venue {
  color: var(
    --match-context-text-muted,
    var(--container-text-muted, var(--contrast-performance))
  );
}

.night-session-canvas[data-roster]
  .fixture-matchup
  .team-band[data-has-crest="false"]
  .team-mark {
  display: none;
}

/* \u2014\u2014 Team of the Week \u2014\u2014 */
.night-session-canvas .totw-category {
  box-shadow: var(--match-context-inset, var(--highlight-inset-light));
}

.night-session-canvas .totw-category-label {
  color: var(--container-text-muted, var(--contrast-meta));
}

.night-session-canvas[data-totw] .totw-name {
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas[data-totw] .totw-figure {
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas[data-totw] .totw-role {
  color: var(
    --ns-performance-player,
    var(--container-text-support, var(--contrast-performance-support))
  );
}

.night-session-canvas[data-totw] .totw-team {
  color: var(
    --container-text-support,
    var(--contrast-performance-support, var(--container-text-muted))
  );
}

.night-session-canvas[data-totw] .totw-team-label,
.night-session-canvas[data-totw] .totw-balls,
.night-session-canvas[data-totw] .totw-subline {
  color: var(--container-text-muted, var(--contrast-meta));
}

.night-session-canvas[data-totw] .totw-mark[data-has-crest="false"] {
  visibility: hidden;
}

.night-session-canvas .header-shell__main,
.night-session-canvas .header-shell__crease {
  position: relative;
  z-index: 1;
}

/* Intro layout: night-session-intro.css */

/* \u2014\u2014 Shared surface grain (single atmospheric texture) \u2014\u2014 */
.night-session-canvas
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

.night-session-canvas .result-statement::after {
  z-index: -1;
}

/* \u2014\u2014 Score watermark (hero / single-match only) \u2014\u2014 */
.night-session-canvas[data-score-watermark="enabled"] .score-watermark {
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

.night-session-canvas[data-score-watermark="enabled"] .scoreline-header,
.night-session-canvas[data-score-watermark="enabled"] .results-ledger,
.night-session-canvas[data-score-watermark="enabled"] .asset-footer {
  position: relative;
  z-index: 1;
}

/* \u2014\u2014 Export-safe fallbacks \u2014\u2014 */
@supports not (color: color-mix(in srgb, white 50%, black)) {
  .night-session-canvas {
    --team-surface-primary: var(--surface-strong-primary);
    --team-surface-secondary: var(--surface-strong-secondary);
    --result-gradient-core: var(--surface-ink);
  }
}


/* src/templates/variants/nightSession/styles/night-session-intro.css */
/* Night Session intro \u2014 aligned with asset header + performance pill tokens */

.night-session-canvas.night-session-intro {
  --zone-pad: 12px;
  --zone-header: 148px;
  --content-inset: 12px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 20px;
  --intro-mark-size: 72px;
  --type-intro-title: 56px;
  --type-intro-eyebrow: 16px;
  --ns-container-radius: 50px;
  --header-text: rgb(244 243 241 / 96%);
  --font-display: "Teko", "Arial Narrow", sans-serif;
  --font-body: "Source Sans 3", Arial, sans-serif;

  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.night-session-intro__frame {
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: var(--zone-pad) var(--content-inset)
    calc(var(--zone-pad) + var(--space-3));
}

.night-session-intro__main {
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.night-session-intro__animated {
  width: 100%;
  min-width: 0;
  flex: 0 1 auto;
}

.night-session-intro__panel {
  position: relative;
  isolation: isolate;
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  border-radius: var(--ns-container-radius);
  background: var(
    --ns-performance-row-bg,
    var(--container-surface, rgb(10 12 14 / 65%))
  ) !important;
  box-shadow: var(
    --container-inset,
    inset 0 1px 0 rgb(255 255 255 / 4%)
  ) !important;
  color: var(--container-text, var(--on-surface));
}

.night-session-canvas.night-session-intro .ns-header {
  flex: 0 0 var(--zone-header);
  min-height: var(--zone-header);
  max-height: var(--zone-header);
  padding: var(--zone-pad) var(--content-inset) 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  position: relative;
}

.night-session-canvas.night-session-intro .ns-header__accent {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.night-session-canvas.night-session-intro .ns-accent-wedge {
  position: absolute;
  top: 18px;
  left: calc(50% - 120px);
  width: 240px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--container-text-accent, var(--club-primary)) 45%,
    transparent
  );
  opacity: 0.75;
}

.night-session-canvas.night-session-intro .ns-accent-lines {
  position: absolute;
  top: 22px;
  right: calc(var(--content-inset) + 84px);
  width: 36px;
  height: 18px;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 3px,
    rgb(255 255 255 / 14%) 3px,
    rgb(255 255 255 / 14%) 4px
  );
  opacity: 0.55;
}

.night-session-canvas.night-session-intro .ns-header__mark {
  position: absolute;
  top: calc(var(--zone-pad) + 4px);
  right: var(--content-inset);
  width: var(--intro-mark-size);
  height: var(--intro-mark-size);
  display: grid;
  place-items: center;
  z-index: 2;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 8%);
  background: rgb(0 0 0 / 28%);
}

.night-session-canvas.night-session-intro .ns-header__mark img {
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: contain;
}

.night-session-canvas.night-session-intro .ns-header__lockup {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 0;
  padding: 8px calc(var(--intro-mark-size) + 16px) 10px;
  text-align: center;
}

.night-session-canvas.night-session-intro .header-eyebrow,
.night-session-canvas.night-session-intro .header-title {
  margin: 0;
  font-family: var(--font-display);
  text-transform: uppercase;
}

.night-session-canvas.night-session-intro .header-eyebrow {
  font-size: var(--type-intro-eyebrow);
  font-weight: 500;
  letter-spacing: 0.2em;
  line-height: 1;
  color: var(
    --container-text-muted,
    var(--match-context-text-muted, rgb(244 243 241 / 52%))
  );
}

.night-session-canvas.night-session-intro .header-title {
  font-size: var(--type-intro-title);
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 0.92;
  text-wrap: balance;
  color: var(
    --header-text,
    var(--container-text, var(--match-context-text, var(--on-surface)))
  );
}

.night-session-intro__sponsors {
  width: 100%;
  min-height: 88px;
  flex: 0 0 auto;
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-2) 0;
}

.night-session-intro__sponsors:empty {
  display: none;
}

.night-session-canvas.night-session-intro .night-session-intro__sponsor-slot {
  min-width: 0;
  min-height: 64px;
  flex: 1 1 0;
  max-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.night-session-canvas.night-session-intro
  .night-session-intro__sponsor-slot
  img {
  max-width: 100%;
  max-height: 64px;
  width: auto;
  height: auto;
  object-fit: contain;
}


/* src/templates/variants/nightSession/styles/night-session-broadcast.css */
/* Night Session \u2014 broadcast visual identity (Results pass 2) */

.night-session-canvas {
  --on-surface: #f4f3f1;
  --header-text: rgb(244 243 241 / 96%);
  --header-accent: var(--club-primary);
}

/* Angular perimeter signature \u2014 overlay-only */
.night-session-canvas::before,
.night-session-canvas::after {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

.night-session-canvas::before {
  top: 0;
  right: 0;
  width: 120px;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--club-primary) 50%,
    transparent 100%
  );
  opacity: 0.8;
}

.night-session-canvas::after {
  bottom: 92px;
  left: var(--zone-content-pad, 24px);
  width: 64px;
  height: 2px;
  background: var(--club-primary);
  clip-path: polygon(0 0, 100% 0, 82% 100%, 0 100%);
  opacity: 0.5;
}

.night-session-canvas > * {
  position: relative;
  z-index: 1;
}

/* Neutralise inherited Scoreline polish inside Night Session Results */
.night-session-canvas
  .comparison-band:not(.comparison-band--single)
  .team-band {
  background: transparent !important;
  border-top: 0 !important;
  box-shadow: none !important;
}

.night-session-canvas .comparison-band--single .team-band {
  background: var(--ns-performance-row-bg) !important;
  border: 1px solid var(--ns-performance-border) !important;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 4%) !important;
}

.night-session-canvas .outcome-bridge .result-statement,
.night-session-canvas .result-bridge.outcome-bridge .result-statement {
  background: var(--ns-outcome-bg, rgb(10 12 14 / 92%)) !important;
  border: 0 !important;
  box-shadow: none !important;
  color: var(--ns-outcome-text, rgb(244 243 241 / 96%)) !important;
}

.night-session-canvas .result-statement::after {
  display: none;
}

.night-session-canvas .performance-area {
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}

/* Results \u2014 performance copy follows mode container tokens (all ranks) */
.night-session-canvas .match-module .performance-row .performance-player {
  color: var(
    --ns-performance-player,
    var(--container-text, var(--contrast-performance-lead))
  ) !important;
}

.night-session-canvas .match-module .performance-row .performance-figure,
.night-session-canvas
  .match-module
  .performance-row
  .performance-figure
  > span:not(.performance-balls) {
  color: var(
    --ns-performance-figure,
    var(--container-text, var(--contrast-performance-lead))
  ) !important;
}

.night-session-canvas .match-module .performance-row .performance-balls,
.night-session-canvas .match-module .performance-row .performance-balls span {
  color: var(
    --ns-performance-player,
    var(--container-text, var(--contrast-performance-lead))
  ) !important;
}

.night-session-canvas .match-module--single .fixture-grade-name {
  color: var(--container-text, var(--contrast-performance-lead)) !important;
}

.night-session-canvas .match-module--single .fixture-unit__rail {
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(--ns-grade-rail-gradient-mid) 58%,
      var(--ns-grade-rail-gradient-end) 100%
    ),
    var(--ns-performance-row-bg) !important;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 4%) !important;
}

.night-session-canvas
  .match-module:not(.match-module--single)
  > .match-context {
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  color: var(
    --match-context-text-muted,
    var(
      --on-container-copy-no-bg-muted,
      var(--container-text-muted, var(--contrast-meta-on-surface))
    )
  ) !important;
}

.night-session-canvas
  .match-module:not(.match-module--single)
  > .match-context
  .context-left {
  color: inherit !important;
}

.night-session-canvas
  .match-module:not(.match-module--single)
  > .match-context
  .context-venue {
  color: var(
    --match-context-text,
    var(--on-container-copy-no-bg, var(--container-text, var(--contrast-team)))
  ) !important;
}

.night-session-canvas
  .match-module:not(.match-module--single)
  > .match-context
  .context-separator {
  background: var(
    --match-context-accent,
    var(--container-text-accent, var(--club-primary))
  ) !important;
}

.night-session-canvas .match-module--single .match-context {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

.night-session-canvas .match-module--single .match-context .context-left {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

.night-session-canvas .match-module--single .match-context .context-venue {
  color: var(--container-text, var(--contrast-team)) !important;
}

.night-session-canvas .match-module--single .match-context .context-separator {
  background: var(--container-text-accent, var(--club-primary)) !important;
}

/* Upcoming \u2014 fixture meta uses in-container mode copy */
.night-session-canvas .fixture-unit .match-context {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

.night-session-canvas .fixture-unit .match-context .context-left {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

.night-session-canvas .fixture-unit .match-context .context-venue {
  color: var(--container-text, var(--contrast-team)) !important;
}

.night-session-canvas .fixture-unit .match-context .context-separator {
  background: var(--container-text-accent, var(--club-primary)) !important;
}

.night-session-canvas .fixture-unit .fixture-date {
  color: var(--container-text, var(--contrast-performance-lead)) !important;
}

.night-session-canvas .fixture-unit .fixture-time {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

.night-session-canvas .fixture-unit .fixture-grade-name {
  color: var(--container-text, var(--contrast-performance-lead)) !important;
}

.night-session-canvas .comparison-band .team-band[data-club-team="true"] {
  border-top: 0 !important;
}

.night-session-canvas .match-module .team-score-area {
  background: transparent !important;
  border-top-color: rgb(255 255 255 / 10%);
}

.night-session-canvas .match-module .team-score-area::before {
  background: var(--ns-team-score-container-bg, var(--ns-band-bg)) !important;
  opacity: var(--ns-team-score-container-opacity, 0.85) !important;
}

.night-session-canvas
  .match-module
  .team-score-area:has(.team-band[data-club-team="true"]) {
  border-top-color: color-mix(in srgb, var(--club-primary) 72%, white);
}

/* Asset header \u2014 logo + title row, accent wedge below (intro keeps corner crest) */
.night-session-canvas:not(.night-session-intro) .ns-header {
  --ns-header-mark-height: calc(56px * 1.44);
  --ns-header-mark-max-width: calc(var(--ns-header-mark-height) * 2.75);

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 0;
}

.night-session-canvas:not(.night-session-intro) .ns-header__row {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
  padding: 0 var(--content-inset);
}

.night-session-canvas:not(.night-session-intro) .ns-header__mark {
  position: relative;
  top: auto;
  right: auto;
  z-index: 2;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--ns-header-mark-height);
  width: auto;
  min-width: 0;
  max-width: var(--ns-header-mark-max-width);
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

/* Height-anchored slot: square crests fill height; wide logos grow width up to max */
.night-session-canvas:not(.night-session-intro) .ns-header__mark img {
  position: relative;
  display: block;
  flex: 0 0 auto;
  height: 100%;
  width: auto;
  max-height: 100%;
  max-width: var(--ns-header-mark-max-width);
  object-fit: contain;
}

.night-session-canvas:not(.night-session-intro) .ns-header__wedge {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 0;
  margin-block: 2px;
  padding: 4px var(--content-inset);
}

.night-session-canvas:not(.night-session-intro)
  .ns-header__wedge
  .ns-accent-wedge {
  position: relative;
  top: auto;
  left: auto;
  flex: 0 0 auto;
  margin: 0;
}

.night-session-canvas:not(.night-session-intro) .ns-header__lockup {
  position: relative;
  z-index: 1;
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 0;
  padding: 0;
  gap: 0;
  text-align: left;
}

.night-session-canvas:not(.night-session-intro)
  .ns-header__lockup
  .header-title {
  text-align: left;
}

.night-session-canvas .asset-footer {
  background: linear-gradient(
    0deg,
    rgb(8 10 12 / 88%) 0%,
    rgb(8 10 12 / 0%) 100%
  );
}

/* Upcoming \u2014 neutralise inherited Scoreline team-band fills on cells */
.night-session-canvas
  .fixture-opponents
  .team-band:not(.fixture-opponent__cell) {
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}

.night-session-canvas
  .fixture-opponents
  .team-band:not(.fixture-opponent__cell)::before {
  display: none !important;
}

.night-session-canvas[data-leaderboard] .leaderboard-category {
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(--ns-grade-rail-gradient-mid) 58%,
      var(--ns-grade-rail-gradient-end) 100%
    ),
    var(--ns-performance-row-bg) !important;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 4%) !important;
}

/* Top 5 \u2014 in-container vs open-canvas copy */
.night-session-canvas[data-leaderboard] .leaderboard-category-label {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

.night-session-canvas[data-leaderboard] .leaderboard-category-value {
  color: var(--container-text, var(--contrast-team)) !important;
}

.night-session-canvas[data-leaderboard] .leader-copy .leader-name {
  color: var(--container-text, var(--contrast-team)) !important;
}

.night-session-canvas[data-leaderboard] .leader-copy .leader-team {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

.night-session-canvas[data-leaderboard] .leader-rank-tag.schedule-lockup {
  background: var(--ns-leader-rank-bg, rgb(255 255 255 / 95%)) !important;
  color: var(
    --ns-leader-rank-text,
    var(--container-text-accent, var(--container-text, rgb(8 11 13 / 96%)))
  ) !important;
}

.night-session-canvas[data-leaderboard] .leader-row .leader-figure {
  color: var(--header-text, rgb(255 255 255 / 92%)) !important;
}

.night-session-canvas[data-leaderboard] .leader-balls,
.night-session-canvas[data-leaderboard] .leader-overs {
  color: var(--header-text, rgb(255 255 255 / 92%)) !important;
}

/* Ladder \u2014 row is one pill; grade rail keeps gradient */
.night-session-canvas[data-ladder] .ladder-rows .ladder-entry .ladder-row {
  border-color: var(--ns-performance-border) !important;
  background: var(--ns-performance-row-bg, var(--container-surface)) !important;
  box-shadow: var(--container-inset) !important;
}

.night-session-canvas[data-ladder] .ladder-row .ladder-cell {
  background: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
}

.night-session-canvas[data-ladder] .ladder-grade,
.night-session-canvas[data-ladder] .ladder-unit__rail {
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, var(--club-primary) 10%, transparent) 58%,
    color-mix(in srgb, var(--club-primary) 32%, transparent) 100%
  ) !important;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 3%) !important;
}

.night-session-canvas[data-ladder]
  .ladder-rows
  .ladder-entry:nth-of-type(even)
  .ladder-row {
  background: var(--ns-performance-row-bg, var(--container-surface)) !important;
}

/* Team roster \u2014 neutralise inherited Scoreline row fills */
.night-session-canvas[data-roster] .roster-rows .roster-entry .roster-row {
  background: transparent !important;
  box-shadow: none !important;
}

.night-session-canvas[data-roster] .fixture-unit__rail,
.night-session-canvas[data-roster] .roster-grade.fixture-unit__rail {
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(--ns-grade-rail-gradient-mid) 58%,
      var(--ns-grade-rail-gradient-end) 100%
    ),
    var(--ns-performance-row-bg, var(--container-surface)) !important;
  border-bottom-color: var(--ns-performance-border) !important;
  box-shadow: var(--container-inset) !important;
}

/* Team roster \u2014 mode container panels + copy */
.night-session-canvas[data-roster] .roster-cell {
  background: var(--ns-performance-row-bg, var(--container-surface)) !important;
  border-color: var(--ns-performance-border) !important;
  box-shadow: var(--container-inset) !important;
}

.night-session-canvas[data-roster]
  .roster-team-name--hero[data-club-team="true"] {
  background: color-mix(
    in srgb,
    var(--container-text-accent, var(--club-primary)) 14%,
    var(--ns-performance-row-bg, var(--container-surface))
  ) !important;
  border-color: color-mix(
    in srgb,
    var(--container-text-accent, var(--club-primary)) 42%,
    var(--ns-performance-border)
  ) !important;
}

.night-session-canvas[data-roster]
  .roster-team-block[data-club-team="true"]
  .roster-team-mark--hero.roster-cell {
  background: color-mix(
    in srgb,
    var(--container-text-accent, var(--club-primary)) 10%,
    var(--ns-performance-row-bg, var(--container-surface))
  ) !important;
  border-color: color-mix(
    in srgb,
    var(--container-text-accent, var(--club-primary)) 38%,
    var(--ns-performance-border)
  ) !important;
}

.night-session-canvas[data-roster] .fixture-grade-name {
  color: var(--container-text, var(--contrast-performance-lead)) !important;
}

.night-session-canvas[data-roster] .roster-squad-label {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

.night-session-canvas[data-roster] .roster-squad-team {
  color: var(--container-text, var(--contrast-team)) !important;
}

.night-session-canvas[data-roster] .roster-meta-part {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

.night-session-canvas[data-roster] .roster-team-name--hero {
  color: var(--container-text, var(--contrast-team)) !important;
}

.night-session-canvas[data-roster] .roster-schedule-line:first-child {
  color: var(--container-text, var(--contrast-performance-lead)) !important;
}

.night-session-canvas[data-roster] .roster-schedule-line {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

.night-session-canvas[data-roster] .roster-index.roster-cell,
.night-session-canvas[data-roster] .roster-index {
  color: var(
    --ns-roster-index-text,
    var(--container-text-accent, var(--container-text, rgb(8 11 13 / 96%)))
  ) !important;
}

.night-session-canvas[data-roster] .roster-player__name {
  color: var(--container-text, var(--contrast-performance-lead)) !important;
}

.night-session-canvas[data-roster] .roster-row[data-empty-roster="true"] {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
  background: var(--ns-performance-row-bg, var(--container-surface)) !important;
  border-color: var(--ns-performance-border) !important;
}

.night-session-canvas[data-roster] .roster-lineup {
  width: auto !important;
  max-width: none !important;
  margin-inline: 0 !important;
}

.night-session-canvas[data-roster]
  .roster-columns
  > .fixture-card.fixture-unit {
  flex: 1 1 auto !important;
  height: 100% !important;
  max-width: none !important;
}

.night-session-canvas[data-roster] .roster-ledger {
  justify-content: flex-start !important;
}

.night-session-canvas[data-totw] .totw-ledger {
  justify-content: center !important;
}

.night-session-canvas[data-totw] .totw-selection.totw-unit {
  width: 100% !important;
  max-width: none !important;
  margin-inline: 0 !important;
  flex: 0 1 auto !important;
  max-height: 100% !important;
  height: auto !important;
}

.night-session-canvas[data-totw] .totw-row {
  max-height: none !important;
  min-height: calc(
    var(--totw-role-rail-height) + var(--totw-row-min-height)
  ) !important;
}

.night-session-canvas[data-totw] .totw-row__main {
  min-height: var(--totw-row-min-height) !important;
  height: var(--totw-row-min-height) !important;
  max-height: var(--totw-row-min-height) !important;
}

.night-session-canvas[data-totw] .totw-col .totw-entry:first-of-type .totw-row,
.night-session-canvas[data-totw]
  .totw-rows
  .totw-entry:first-of-type
  .totw-row {
  min-height: calc(
    var(--totw-role-rail-height) + var(--totw-row-min-height)
  ) !important;
  height: auto !important;
  max-height: none !important;
}

/* Team of the Week \u2014 row is one pill; inner cells stay transparent */
.night-session-canvas[data-totw]
  :is(.totw-rows, .totw-col)
  .totw-entry
  .totw-row {
  border-color: var(--ns-performance-border) !important;
  background: var(--ns-performance-row-bg, var(--container-surface)) !important;
  box-shadow: var(--container-inset) !important;
}

.night-session-canvas[data-totw] .totw-unit__rail,
.night-session-canvas[data-totw] .totw-category.totw-unit__rail {
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(--ns-grade-rail-gradient-mid) 58%,
      var(--ns-grade-rail-gradient-end) 100%
    ),
    var(--ns-performance-row-bg, var(--container-surface)) !important;
  border-bottom-color: var(--ns-performance-border) !important;
  box-shadow: var(--container-inset) !important;
}

.night-session-canvas[data-totw] .totw-row .totw-cell {
  background: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
}

.night-session-canvas[data-totw] .totw-row .totw-role-rail.totw-cell {
  display: flex !important;
  align-items: center !important;
  padding-block: 0 !important;
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(--ns-grade-rail-gradient-mid) 58%,
      var(--ns-grade-rail-gradient-end) 100%
    ),
    var(--ns-performance-row-bg, var(--container-surface)) !important;
  justify-content: center !important;
  border: 0 !important;
  border-top: 1px solid var(--ns-performance-border) !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.night-session-canvas[data-totw] .totw-role {
  color: var(
    --ns-performance-player,
    var(--container-text-support, var(--contrast-performance-support))
  ) !important;
}

.night-session-canvas[data-totw] .totw-name,
.night-session-canvas[data-totw] .totw-figure,
.night-session-canvas[data-totw] .totw-figure > span:not(.totw-balls),
.night-session-canvas[data-totw] .totw-category-value {
  color: var(--container-text, var(--contrast-performance-lead)) !important;
}

.night-session-canvas[data-totw] .totw-team,
.night-session-canvas[data-totw] .totw-balls {
  color: var(
    --ns-performance-player,
    var(--container-text-support, var(--contrast-performance-support))
  ) !important;
}

.night-session-canvas[data-totw] .totw-team-label,
.night-session-canvas[data-totw] .totw-subline,
.night-session-canvas[data-totw] .totw-category-label {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

/* Intro \u2014 panel copy uses mode container tokens (not header-text) */
.night-session-canvas.night-session-intro .night-session-intro__panel {
  background: var(--container-surface, var(--match-context-surface)) !important;
  box-shadow: var(--container-inset, var(--match-context-inset)) !important;
}

.night-session-canvas.night-session-intro .header-eyebrow {
  color: var(
    --container-text-muted,
    var(--contrast-meta-on-surface)
  ) !important;
}

.night-session-canvas.night-session-intro .header-title {
  color: var(--container-text, var(--contrast-performance-lead)) !important;
}


/* src/templates/variants/nightSession/styles/night-session-results.css */
/* Night Session \u2014 Results layout (connected broadcast band composition) */

.night-session-canvas {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header: 148px;
  --zone-content: 1080px;
  --zone-footer: 112px;
  --zone-content-pad: 24px;
  --content-inset: 24px;
  --content-width: 1032px;

  --ink: #070809;
  --paper: #f4f3f1;
  --surface: #121418;
  --surface-muted: #181b20;
  --surface-ink: #ececea;
  --rule: rgb(255 255 255 / 8%);
  --muted: rgb(244 243 241 / 52%);
  --font-display: "Teko", "Arial Narrow", sans-serif;
  --font-body: "Source Sans 3", Arial, sans-serif;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 20px;
  --type-score: 76px;
  --type-result: 30px;
  --type-team: 23px;
  --type-player: 32px;
  --type-figure: 40px;
  --type-meta: 17px;
  --type-venue: 17px;

  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  color: var(--paper);
  font-family: var(--font-body);
}

.night-session-canvas,
.night-session-canvas * {
  box-sizing: border-box;
}

.night-session-canvas h1,
.night-session-canvas h2,
.night-session-canvas h3,
.night-session-canvas p {
  margin: 0;
}

.night-session-canvas .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* \u2014\u2014 Header \u2014\u2014 */
.night-session-canvas .ns-header {
  flex: 0 0 var(--zone-header);
  min-height: var(--zone-header);
  max-height: var(--zone-header);
  padding: var(--zone-pad) var(--content-inset) 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  position: relative;
}

.night-session-canvas .ns-header__mark {
  position: absolute;
  top: calc(var(--zone-pad) + 4px);
  right: var(--content-inset);
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  z-index: 2;
}

.night-session-canvas .ns-header__mark img {
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: contain;
}

.night-session-canvas .ns-header__lockup {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 0;
  padding: 8px 88px 10px;
  text-align: center;
}

.night-session-canvas .header-shared-grade {
  display: inline-block;
  padding: 8px 14px;
  color: var(--ink);
  background: var(--club-primary);
  font-family: var(--font-body);
  font-size: 21px;
  font-weight: 500;
  letter-spacing: 0.12em;
  line-height: 1;
  text-transform: uppercase;
}

.night-session-canvas .header-eyebrow {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.2em;
  line-height: 1;
  text-transform: uppercase;
  color: rgb(244 243 241 / 52%);
}

.night-session-canvas .header-title {
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 0.92;
  text-transform: uppercase;
  color: var(--header-text, #fff);
}

.night-session-canvas .header-shared-round {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: rgb(244 243 241 / 58%);
}

.night-session-canvas .ns-header__accent {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.night-session-canvas .ns-accent-wedge {
  position: absolute;
  top: 18px;
  left: calc(50% - 120px);
  width: 240px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--club-primary) 45%,
    transparent
  );
  opacity: 0.75;
}

.night-session-canvas .ns-accent-lines {
  position: absolute;
  top: 22px;
  right: calc(var(--content-inset) + 84px);
  width: 36px;
  height: 18px;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 3px,
    rgb(255 255 255 / 14%) 3px,
    rgb(255 255 255 / 14%) 4px
  );
  opacity: 0.55;
}

/* \u2014\u2014 Content ledger \u2014\u2014 */
.night-session-canvas .results-ledger {
  min-height: 0;
  flex: 1 1 var(--zone-content);
  max-height: var(--zone-content);
  padding: 4px var(--zone-content-pad) 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
}

.night-session-canvas .match-module {
  min-height: 0;
  flex: 1 1 0;
  display: grid;
  grid-template-rows: auto auto auto auto auto;
  align-content: start;
  gap: var(--space-2) 0;
  overflow: hidden;
}

.night-session-canvas .match-module.without-performances {
  grid-template-rows: auto auto auto auto;
}

.night-session-canvas .match-module.without-performances.without-context {
  grid-template-rows: auto auto auto;
}

.night-session-canvas .match-module + .match-module {
  margin-top: 0;
}

/* \u2014\u2014 Team score container (parent) + comparison band \u2014\u2014 */
.night-session-canvas .match-module .team-score-area {
  position: relative;
  isolation: isolate;
  min-height: 156px;
  padding: 2px;
  background: transparent;
  border: 1px solid var(--ns-band-border, rgb(255 255 255 / 7%));
  border-top: 2px solid rgb(255 255 255 / 10%);
  box-shadow: none;
}

.night-session-canvas .match-module .team-score-area::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: var(
    --ns-team-score-container-bg,
    var(
      --ns-band-bg,
      linear-gradient(180deg, rgb(22 25 29) 0%, rgb(10 12 14) 100%)
    )
  );
  opacity: var(--ns-team-score-container-opacity, 0.85);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 5%);
}

.night-session-canvas .match-module .team-score-area > * {
  position: relative;
  z-index: 1;
}

.night-session-canvas
  .match-module
  .team-score-area:has(.team-band[data-club-team="true"]) {
  border-top-color: color-mix(in srgb, var(--club-primary) 72%, white);
}

.night-session-canvas .comparison-band:not(.comparison-band--single) {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);
  gap: 4px;
  align-items: stretch;
  min-height: 156px;
  background: transparent;
  border: 0;
  box-shadow: none;
}

.night-session-canvas
  .comparison-band:not(.comparison-band--single)
  .comparison-band__spine {
  background: linear-gradient(
    180deg,
    transparent,
    rgb(255 255 255 / 10%) 35%,
    rgb(255 255 255 / 10%) 65%,
    transparent
  );
}

.night-session-canvas
  .comparison-band:not(.comparison-band--single)
  .team-band {
  min-width: 0;
  min-height: 100%;
  padding: 28px 32px 24px;
  display: flex;
  align-items: stretch;
  background: transparent;
  border: 0;
  box-shadow: none;
}

.night-session-canvas
  .comparison-band:not(.comparison-band--single)
  .team-band:not([data-logo-band-bg="true"])::before {
  display: none;
}

.night-session-canvas
  .comparison-band:not(.comparison-band--single)
  .team-group {
  min-height: 100%;
  justify-content: center;
}

.night-session-canvas .team-mark {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: rgb(0 0 0 / 35%);
  border: 1px solid rgb(255 255 255 / 8%);
}

.night-session-canvas
  .comparison-band:not(.comparison-band--single)
  .team-mark {
  flex: 0 0 auto;
  width: 80px;
  height: 80px;
}

.night-session-canvas .team-mark img {
  object-fit: contain;
}

.night-session-canvas
  .comparison-band:not(.comparison-band--single)
  .team-mark
  img {
  max-width: calc(100% - 8px);
  max-height: calc(100% - 8px);
}

.night-session-canvas .team-score {
  min-width: 0;
}

.night-session-canvas .score-stack {
  --type-score-active: var(--type-score);
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 0;
  min-width: 0;
  align-items: flex-start;
}

.night-session-canvas
  .comparison-band:not(.comparison-band--single)
  .score-stack:has(.score--prior) {
  --type-score-active: calc(var(--type-score) * 0.72);
  --type-score-main: calc(var(--type-score-active) * 1.1);
}

.night-session-canvas .team-score:has(.score--prior) {
  gap: 2px;
}

.night-session-canvas .score {
  font-family: var(--font-body);
  font-size: var(
    --type-score-main,
    var(--type-score-active, var(--type-score))
  );
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 0.88;
  white-space: nowrap;
  font-variant-numeric: tabular-nums lining-nums;
  color: var(--ns-band-score, #fff);
}

.night-session-canvas .score--prior {
  font-size: calc(var(--type-score-active, var(--type-score)) * 0.4);
  line-height: 1;
}

.night-session-canvas
  .comparison-band:not(.comparison-band--single)
  .score--prior {
  text-align: right;
}

.night-session-canvas .overs {
  min-height: 18px;
  font-size: var(--type-meta);
  font-weight: 500;
  font-variant-numeric: tabular-nums lining-nums;
  line-height: 1.1;
  color: var(--ns-band-meta, rgb(244 243 241 / 58%));
}

.night-session-canvas .overs[data-empty="true"] {
  display: none;
}

.night-session-canvas .team-identity {
  min-width: 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.night-session-canvas
  .comparison-band:not(.comparison-band--single)
  .team-name {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.night-session-canvas .team-name {
  display: -webkit-box;
  overflow: hidden;
  font-family: var(--font-body);
  font-size: var(--type-team);
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.15;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: var(--ns-band-team, rgb(255 255 255 / 92%));
}

.night-session-canvas .team-role,
.night-session-canvas .club-role,
.night-session-canvas .opposition-role {
  display: none;
}

/* \u2014\u2014 Outcome bridge \u2014\u2014 */
.night-session-canvas .outcome-bridge,
.night-session-canvas .result-bridge.outcome-bridge {
  position: relative;
  display: grid;
  align-items: center;
  justify-items: center;
  min-height: 48px;
  margin-top: -1px;
  padding: 0 12px;
}

.night-session-canvas .outcome-bridge__rule {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: rgb(255 255 255 / 12%);
  z-index: 0;
}

.night-session-canvas .outcome-bridge__rule::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 48px;
  height: 2px;
  transform: translate(-50%, -50%);
  background: var(--club-primary);
}

.night-session-canvas .outcome-bridge .result-statement,
.night-session-canvas .result-bridge.outcome-bridge .result-statement {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  max-width: 92%;
  min-height: 42px;
  margin: 0;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ns-outcome-bg, rgb(10 12 14 / 92%));
  font-family: var(--font-body);
  font-size: var(--type-result);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.1;
  text-align: center;
  text-transform: none;
  color: var(--ns-outcome-text, rgb(244 243 241 / 96%));
}

.night-session-canvas .outcome-bridge .result-statement[data-length="long"],
.night-session-canvas
  .result-bridge.outcome-bridge
  .result-statement[data-length="long"] {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  font-size: calc(var(--type-result) * 0.82);
  min-height: 44px;
  padding: 6px 14px;
}

/* \u2014\u2014 Performances \u2014\u2014 */
.night-session-canvas .match-module .performance-area {
  min-height: 0;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding: 6px 0 0;
  overflow: visible;
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.night-session-canvas
  .match-module[data-performance-count="1"]
  .performance-area {
  grid-template-columns: minmax(0, 1fr);
}

.night-session-canvas .match-module .performance-panel {
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) max-content;
  column-gap: var(--space-2);
  row-gap: var(--space-2);
  align-content: start;
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.night-session-canvas .performance-heading {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.night-session-canvas .performance-heading::after {
  display: none;
}

.night-session-canvas .performance-row {
  display: contents;
}

.night-session-canvas .performance-row .performance-player,
.night-session-canvas .performance-row .performance-figure {
  min-height: 46px;
  display: flex;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: var(--ns-performance-row-bg, rgb(10 12 14 / 65%));
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 3%);
}

.night-session-canvas .performance-row .performance-player {
  min-width: 0;
  justify-self: stretch;
}

.night-session-canvas .performance-row .performance-figure {
  justify-self: stretch;
  justify-content: flex-end;
  width: 100%;
  font-variant-numeric: tabular-nums lining-nums;
}

.night-session-canvas
  .performance-row
  .performance-figure
  > span:not(.performance-balls),
.night-session-canvas .performance-row .performance-balls span {
  font-variant-numeric: tabular-nums lining-nums;
}

.night-session-canvas .performance-row[data-empty="true"] {
  display: none;
}

.night-session-canvas .performance-row[data-empty="true"] .performance-player,
.night-session-canvas .performance-row[data-empty="true"] .performance-figure {
  display: none;
}

.night-session-canvas .performance-row[data-empty="true"] .performance-player,
.night-session-canvas .performance-row[data-empty="true"] .performance-figure {
  display: none;
}

.night-session-canvas .match-module .performance-row .performance-player {
  overflow: hidden;
  font-size: var(--type-player);
  font-weight: 500;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(
    --ns-performance-player,
    var(--container-text, var(--contrast-performance-lead))
  );
}

.night-session-canvas .match-module .performance-row .performance-figure,
.night-session-canvas
  .match-module
  .performance-row
  .performance-figure
  > span:not(.performance-balls) {
  font-family: var(--font-body);
  font-size: var(--type-figure);
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  color: var(
    --ns-performance-figure,
    var(--container-text, var(--contrast-performance-lead))
  );
}

.night-session-canvas
  .match-module
  .performance-row[data-rank="1"]
  .performance-player,
.night-session-canvas
  .match-module
  .performance-row[data-rank="2"]
  .performance-player,
.night-session-canvas
  .match-module
  .performance-row[data-rank="3"]
  .performance-player {
  font-weight: 500;
}

.night-session-canvas
  .match-module
  .performance-row[data-rank="1"]
  .performance-figure,
.night-session-canvas
  .match-module
  .performance-row[data-rank="2"]
  .performance-figure,
.night-session-canvas
  .match-module
  .performance-row[data-rank="3"]
  .performance-figure {
  font-weight: 400;
  opacity: 1;
}

.night-session-canvas .match-module .performance-balls {
  margin-left: 3px;
  font-family: var(--font-body);
  font-size: 22px;
  font-weight: 500;
  color: var(
    --ns-performance-player,
    var(--container-text, var(--contrast-performance-lead))
  );
  opacity: 1;
}

.night-session-canvas .performance-panel[data-state="empty"] {
  display: none;
}

/* \u2014\u2014 Match context (open strip \u2014 mode tokens, not container copy) \u2014\u2014 */
.night-session-canvas .match-module .match-context {
  min-width: 0;
  width: 100%;
  padding: 4px 0 0;
  margin-top: 0;
  display: grid;
  grid-template-columns: minmax(0, 0.34fr) minmax(0, 0.66fr);
  column-gap: var(--space-3);
  row-gap: var(--space-1);
  align-items: center;
  background: transparent;
  border: 0;
  box-shadow: none;
  font-size: var(--type-meta);
  font-weight: 500;
  line-height: 1.25;
  color: var(
    --match-context-text-muted,
    var(
      --on-container-copy-no-bg-muted,
      var(--container-text-muted, var(--contrast-meta-on-surface))
    )
  );
}

.night-session-canvas .match-module .match-context .context-left {
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  color: inherit;
}

.night-session-canvas
  .match-module
  > .match-context
  .context-left
  > span:not(.context-separator) {
  min-width: 0;
  overflow-wrap: anywhere;
}

.night-session-canvas .match-module > .match-context .context-separator {
  width: 3px;
  height: 3px;
  flex: 0 0 auto;
  background: var(
    --match-context-accent,
    var(--container-text-accent, var(--club-primary))
  );
  opacity: 0.85;
}

.night-session-canvas .match-module .match-context .context-venue {
  min-width: 0;
  overflow: hidden;
  text-align: right;
  text-wrap: pretty;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  color: var(
    --match-context-text,
    var(--on-container-copy-no-bg, var(--container-text, var(--contrast-team)))
  );
}

/* \u2014\u2014 Fixture divider (header accent motif) \u2014\u2014 */
.night-session-canvas .fixture-close {
  padding: var(--space-3) 0 var(--space-2);
}

.night-session-canvas .fixture-close .ns-accent-divider {
  position: relative;
  width: 100%;
  height: 22px;
}

.night-session-canvas .fixture-close .ns-accent-wedge {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(100%, 280px);
  height: 2px;
  transform: translate(-50%, -50%);
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(
        in srgb,
        var(
            --header-text,
            var(--on-container-copy-no-bg, rgb(244 243 241 / 96%))
          )
          75%,
        transparent
      )
      45%,
    transparent
  );
  opacity: 0.85;
}

.night-session-canvas .fixture-close .ns-accent-lines {
  position: absolute;
  top: 50%;
  right: 0;
  width: 36px;
  height: 18px;
  transform: translateY(-50%);
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 3px,
    color-mix(
        in srgb,
        var(
            --header-text,
            var(--on-container-copy-no-bg, rgb(244 243 241 / 96%))
          )
          14%,
        transparent
      )
      3px,
    color-mix(
        in srgb,
        var(
            --header-text,
            var(--on-container-copy-no-bg, rgb(244 243 241 / 96%))
          )
          14%,
        transparent
      )
      4px
  );
  opacity: 0.55;
}

/* \u2014\u2014 Footer \u2014\u2014 */
.night-session-canvas .asset-footer {
  flex: 0 0 var(--zone-footer);
  min-height: var(--zone-footer);
  max-height: var(--zone-footer);
  box-sizing: border-box;
  padding: 0 var(--zone-content-pad) var(--zone-pad);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  overflow: hidden;
}

.night-session-canvas .footer-rule {
  height: 1px;
  margin-bottom: 10px;
  background: rgb(255 255 255 / 10%);
}

.night-session-canvas .sponsor-strip {
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
}

.night-session-canvas .sponsor-slot {
  flex: 0 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: rgb(244 243 241 / 42%);
}

.night-session-canvas .sponsor-symbol {
  width: 56px;
  height: 40px;
  background: rgb(255 255 255 / 6%);
  opacity: 0.6;
}

.night-session-canvas[data-sponsor-state="absent"] .asset-footer {
  display: none;
}

.night-session-canvas .mark-fallback {
  width: 42%;
  height: 42%;
  border: 2px solid currentColor;
  opacity: 0.14;
}

.night-session-canvas .organisation-mark[data-has-crest="true"] .mark-fallback,
.night-session-canvas .organisation-mark:has(img:not([hidden])) .mark-fallback {
  display: none;
}

.night-session-canvas
  .comparison-band
  .team-band[data-has-crest="false"]
  .team-mark {
  display: none;
}

.night-session-canvas .team-name,
.night-session-canvas .organisation-name {
  overflow-wrap: anywhere;
  text-wrap: balance;
}


/* src/templates/variants/nightSession/styles/night-session-result-single.css */
/* Night Session \u2014 Result Single (one match, Results family) */

.night-session-canvas[data-result-single] {
  --type-score: 96px;
  --type-result: 34px;
  --type-team: 28px;
  --type-player: 28px;
  --type-figure: 36px;
  --type-meta: 18px;
}

/* \u2014\u2014 Centered single stack \u2014\u2014 */
.night-session-canvas .results-ledger--single {
  justify-content: center;
  padding-top: var(--space-3);
}

.night-session-canvas .single-result-stack {
  flex: 0 1 auto;
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.night-session-canvas .match-module--single {
  flex: 0 0 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: visible;
}

.night-session-canvas .match-module--single.fixture-card.fixture-unit {
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  overflow: hidden;
}

.night-session-canvas .match-module--single .fixture-unit__rail {
  position: relative;
  flex: 0 0 auto;
  min-width: 0;
  padding: 8px 14px;
  border: 0;
  border-bottom: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(
          --ns-grade-rail-gradient-mid,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 10%,
            transparent
          )
        )
        58%,
      var(
          --ns-grade-rail-gradient-end,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 32%,
            transparent
          )
        )
        100%
    ),
    var(--ns-performance-row-bg, rgb(10 12 14 / 65%));
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 4%);
}

.night-session-canvas .match-module--single .fixture-unit__rail::after {
  content: "";
  position: absolute;
  top: 8px;
  right: 12px;
  width: 28px;
  height: 12px;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 2px,
    rgb(255 255 255 / 12%) 2px,
    rgb(255 255 255 / 12%) 3px
  );
  opacity: 0.55;
  pointer-events: none;
}

.night-session-canvas
  .match-module--single
  .fixture-unit__rail[data-empty="true"] {
  display: none;
}

.night-session-canvas .match-module--single .fixture-grade-name {
  display: -webkit-box;
  overflow: hidden;
  padding-right: 36px;
  font-family: var(--font-body);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--container-text, var(--contrast-team, rgb(8 11 13 / 96%)));
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.night-session-canvas .match-module--single .fixture-unit__frame {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-2);
  min-width: 0;
}

/* \u2014\u2014 Hero comparison band \u2014\u2014 (teams stacked, not side-by-side columns) */
.night-session-canvas .comparison-band--single {
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-2);
  padding: 2px;
}

.night-session-canvas .comparison-band--single .comparison-band__spine {
  width: 100%;
  height: 1px;
  min-height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgb(255 255 255 / 14%) 20%,
    rgb(255 255 255 / 14%) 80%,
    transparent
  );
}

.night-session-canvas .comparison-band--single .team-band {
  flex: 0 0 auto;
  width: 100%;
  min-width: 0;
  padding: 32px 36px 28px;
  display: block;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: var(--ns-performance-row-bg, rgb(10 12 14 / 65%));
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 4%);
}

.night-session-canvas .comparison-band--single .team-mark {
  flex: none;
  width: 96px;
  height: 96px;
  max-width: 96px;
  max-height: 96px;
}

.night-session-canvas .comparison-band--single .team-mark img {
  max-width: calc(100% - 10px);
  max-height: calc(100% - 10px);
}

.night-session-canvas .comparison-band--single .team-name {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  font-family: var(--font-body);
  font-size: var(--type-team);
  font-weight: 600;
  line-height: 1.15;
  color: var(--container-text, var(--contrast-team));
}

.night-session-canvas .comparison-band--single .score {
  font-family: var(--font-body);
  font-size: var(--type-score);
  font-weight: 700;
  line-height: 0.88;
  text-align: center;
  color: var(--container-text, var(--contrast-score));
}

.night-session-canvas .comparison-band--single .score--prior {
  font-size: calc(var(--type-score) * 0.4);
  line-height: 1;
  text-align: center;
  color: var(--container-text, var(--contrast-score));
}

.night-session-canvas .comparison-band--single .overs {
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

/* Centre stack \u2014 override shared home-right / away-left (Result Single only) */
.night-session-canvas
  .comparison-band--single
  .team-band[data-side="home"]
  .team-group,
.night-session-canvas
  .comparison-band--single
  .team-band[data-side="away"]
  .team-group {
  align-items: center;
  text-align: center;
}

.night-session-canvas
  .comparison-band--single
  .team-band[data-side="home"]
  .score-stack,
.night-session-canvas
  .comparison-band--single
  .team-band[data-side="away"]
  .score-stack {
  align-items: center;
}

.night-session-canvas
  .comparison-band--single
  .team-band[data-side="home"]
  :is(.score, .score--prior, .overs, .team-name),
.night-session-canvas
  .comparison-band--single
  .team-band[data-side="away"]
  :is(.score, .score--prior, .overs, .team-name) {
  text-align: center;
}

.night-session-canvas .comparison-band--single .team-mark {
  border-color: var(--ns-performance-border, rgb(255 255 255 / 10%));
}

.night-session-canvas .comparison-band--single .comparison-band__spine {
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(
        in srgb,
        var(
            --header-text,
            var(--on-container-copy-no-bg, rgb(244 243 241 / 96%))
          )
          14%,
        transparent
      )
      20%,
    color-mix(
        in srgb,
        var(
            --header-text,
            var(--on-container-copy-no-bg, rgb(244 243 241 / 96%))
          )
          14%,
        transparent
      )
      80%,
    transparent
  );
}

.night-session-canvas .match-module--single .fixture-unit__rail::after {
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 2px,
    color-mix(
        in srgb,
        var(
            --header-text,
            var(--on-container-copy-no-bg, rgb(244 243 241 / 96%))
          )
          12%,
        transparent
      )
      2px,
    color-mix(
        in srgb,
        var(
            --header-text,
            var(--on-container-copy-no-bg, rgb(244 243 241 / 96%))
          )
          12%,
        transparent
      )
      3px
  );
}

.night-session-canvas .match-module--single .performance-area {
  padding: var(--space-2) 2px;
  gap: var(--space-3);
}

.night-session-canvas
  .match-module--single
  .performance-row
  .performance-player,
.night-session-canvas
  .match-module--single
  .performance-row
  .performance-figure {
  min-height: 52px;
  padding: 10px 14px;
  font-size: var(--type-player);
  line-height: 1.08;
}

.night-session-canvas
  .match-module--single
  .performance-row
  .performance-figure,
.night-session-canvas
  .match-module--single
  .performance-row
  .performance-figure
  > span:not(.performance-balls) {
  font-size: var(--type-figure);
}

.night-session-canvas
  .match-module--single
  .performance-row
  .performance-player,
.night-session-canvas
  .match-module--single
  .performance-row
  .performance-figure,
.night-session-canvas .match-module--single .performance-row .performance-balls,
.night-session-canvas
  .match-module--single
  .performance-row
  .performance-balls
  span {
  color: var(--container-text, var(--contrast-performance-lead, rgb(8 11 13)));
  opacity: 1;
}

/* Meta row \u2014 in-container copy (not open-canvas match-context tokens) */
.night-session-canvas .match-module--single .match-context {
  min-width: 0;
  width: 100%;
  padding: 4px 0 0;
  margin-top: 0;
  display: grid;
  grid-template-columns: minmax(0, 0.34fr) minmax(0, 0.66fr);
  column-gap: var(--space-3);
  align-items: stretch;
  background: transparent;
  border: 0;
  box-shadow: none;
  font-size: var(--type-meta);
  font-weight: 500;
  line-height: 1.25;
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

.night-session-canvas .match-module--single .match-context .context-left,
.night-session-canvas .match-module--single .match-context .context-venue {
  min-height: 44px;
  align-self: stretch;
  padding: 8px 12px;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: var(--ns-performance-row-bg, rgb(10 12 14 / 65%));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

.night-session-canvas .match-module--single .match-context .context-left {
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

.night-session-canvas
  .match-module--single
  .match-context
  .context-left
  > span:not(.context-separator) {
  min-width: 0;
  overflow-wrap: anywhere;
}

.night-session-canvas .match-module--single .match-context .context-separator {
  width: 3px;
  height: 3px;
  flex: 0 0 auto;
  background: var(--container-text-accent, var(--club-primary));
  opacity: 0.85;
}

.night-session-canvas .match-module--single .match-context .context-venue {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
  overflow: hidden;
  text-align: right;
  text-wrap: pretty;
  overflow-wrap: anywhere;
  color: var(--container-text, var(--contrast-team));
}

.night-session-canvas[data-result-single] .footer-crease {
  display: none;
}


/* src/templates/variants/nightSession/styles/night-session-upcoming.css */
/* Night Session \u2014 Upcoming layout */

.night-session-canvas {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header: 148px;
  --zone-content: 1080px;
  --zone-footer: 112px;
  --zone-content-pad: 24px;
  --content-inset: 24px;
  --space-4: 20px;
  --space-5: 32px;
  --space-3: 12px;
  --space-2: 8px;
  --fixture-stack-gap: var(--space-5);
  --header-text: rgb(244 243 241 / 96%);
  --font-display: "Teko", "Arial Narrow", sans-serif;
  --font-body: "Source Sans 3", Arial, sans-serif;
  --type-fixture-grade: var(--type-fixture-time);
  --type-fixture-team: 28px;
  --type-fixture-date: var(--type-fixture-time);
  --type-fixture-time: 28px;
  --type-fixture-venue: var(--type-fixture-time);
  --type-fixture-context: var(--type-fixture-time);
  --ns-upcoming-grade-rail-bg: rgb(6 8 10 / 88%);
  --ns-container-radius: 50px;

  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  color: var(--paper, #f4f3f1);
  font-family: var(--font-body);
}

.night-session-canvas,
.night-session-canvas * {
  box-sizing: border-box;
}

.night-session-canvas h1,
.night-session-canvas h2,
.night-session-canvas h3,
.night-session-canvas p {
  margin: 0;
}

.night-session-canvas .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* \u2014\u2014 Header (shared with Results) \u2014\u2014 */
.night-session-canvas .ns-header {
  flex: 0 0 var(--zone-header);
  min-height: var(--zone-header);
  max-height: var(--zone-header);
  padding: var(--zone-pad) var(--content-inset) 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  position: relative;
}

.night-session-canvas .ns-header__mark {
  position: absolute;
  top: calc(var(--zone-pad) + 4px);
  right: var(--content-inset);
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  z-index: 2;
}

.night-session-canvas .ns-header__mark img {
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: contain;
}

.night-session-canvas .ns-header__lockup {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 0;
  padding: 8px 88px 10px;
  text-align: center;
}

.night-session-canvas .header-shared-grade {
  display: inline-block;
  padding: 4px 10px;
  color: var(--ink, #070809);
  background: var(--club-primary);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.12em;
  line-height: 1;
  text-transform: uppercase;
}

.night-session-canvas .header-eyebrow {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.2em;
  line-height: 1;
  text-transform: uppercase;
  color: rgb(244 243 241 / 52%);
}

.night-session-canvas .header-title {
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 0.92;
  text-transform: uppercase;
  color: var(--header-text, #fff);
}

.night-session-canvas .header-shared-round {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: rgb(244 243 241 / 58%);
}

.night-session-canvas .ns-header__accent {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.night-session-canvas .ns-accent-wedge {
  position: absolute;
  top: 18px;
  left: calc(50% - 120px);
  width: 240px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--club-primary) 45%,
    transparent
  );
  opacity: 0.75;
}

.night-session-canvas .ns-accent-lines {
  position: absolute;
  top: 22px;
  right: calc(var(--content-inset) + 84px);
  width: 36px;
  height: 18px;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 3px,
    rgb(255 255 255 / 14%) 3px,
    rgb(255 255 255 / 14%) 4px
  );
  opacity: 0.55;
}

.night-session-canvas .fixtures-ledger {
  min-height: 0;
  flex: 1 1 var(--zone-content);
  max-height: var(--zone-content);
  padding: 0 var(--zone-content-pad);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  overflow: hidden;
}

.night-session-canvas .fixtures-stack {
  width: 100%;
  flex: 0 1 auto;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--fixture-stack-gap);
  overflow: hidden;
}

.night-session-canvas .fixtures-grade-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
}

.night-session-canvas .fixtures-grade-group__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
}

.night-session-canvas
  .fixtures-grade-group
  .fixtures-grade-rail.fixture-unit__rail {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 9px 14px;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  border-radius: var(--ns-container-radius);
  background: linear-gradient(
      90deg,
      transparent 0%,
      color-mix(
          in srgb,
          var(--container-text-accent, var(--club-primary)) 6%,
          transparent
        )
        58%,
      color-mix(
          in srgb,
          var(--container-text-accent, var(--club-primary)) 14%,
          transparent
        )
        100%
    ),
    var(--ns-upcoming-grade-rail-bg, rgb(6 8 10 / 88%));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

.night-session-canvas
  .fixtures-grade-group
  .fixtures-grade-rail
  .fixture-grade-name {
  width: 100%;
  margin: 0;
  padding-right: 0;
  text-align: center;
  font-weight: 400;
  text-transform: none;
  -webkit-line-clamp: 2;
}

.night-session-canvas
  .fixtures-grade-group[data-empty="true"]
  .fixtures-grade-rail,
.night-session-canvas .fixtures-grade-rail[data-empty="true"] {
  display: none;
}

.night-session-canvas .fixtures-date-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.night-session-canvas .fixtures-date-group__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.night-session-canvas .fixtures-schedule-rail {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  border-radius: var(--ns-container-radius);
  background: var(--ns-performance-row-bg, rgb(10 12 14 / 65%));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

.night-session-canvas .fixtures-date-rail.fixtures-schedule-rail {
  align-self: flex-start;
  width: fit-content;
  max-width: 100%;
  justify-content: flex-start;
  padding-block: calc(var(--space-2) + 1pt);
  padding-inline: calc(var(--space-3) + 1pt) calc(var(--space-4) + 1pt);
}

.night-session-canvas .fixtures-date-rail .fixture-date {
  width: auto;
  margin: 0;
  padding: 0;
  text-align: left;
  white-space: nowrap;
}

.night-session-canvas
  .fixtures-date-group[data-empty="true"]
  .fixtures-date-rail,
.night-session-canvas .fixtures-date-rail[data-empty="true"] {
  display: none;
}

.night-session-canvas .fixture-unit .context-right.fixture-time-slot {
  justify-content: center;
  text-align: center;
  font-family: var(--font-body);
  font-size: var(--type-fixture-time);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
  text-transform: none;
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas
  .fixture-unit
  .context-right.fixture-time-slot[data-empty="true"] {
  visibility: hidden;
}

/* \u2014\u2014 Pill container radius (Results parity) \u2014\u2014 */
/* Outer fixture shell \u2014 square, no border; pills on inner blocks */
.night-session-canvas .fixture-card.fixture-unit {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.night-session-canvas .fixture-opponent__cell {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .fixture-unit .match-context {
  border-radius: var(--ns-container-radius);
  overflow: visible;
}

.night-session-canvas .fixture-unit .context-left,
.night-session-canvas .fixture-unit .context-right,
.night-session-canvas .fixture-unit .context-venue {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

/* Grade rail \u2014 fixture label; club primary washes left \u2192 right */
.night-session-canvas
  .fixture-unit:not(.match-module--single)
  .fixture-unit__rail {
  position: relative;
  min-width: 0;
  padding: 7px 12px;
  border: 0;
  border-bottom: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(
          --ns-grade-rail-gradient-mid,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 10%,
            transparent
          )
        )
        58%,
      var(
          --ns-grade-rail-gradient-end,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 32%,
            transparent
          )
        )
        100%
    ),
    var(--ns-performance-row-bg, rgb(10 12 14 / 65%));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

.night-session-canvas
  .fixture-unit:not(.match-module--single)
  .fixture-unit__rail::after {
  content: "";
  position: absolute;
  top: 6px;
  right: 10px;
  width: 28px;
  height: 12px;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 2px,
    rgb(255 255 255 / 12%) 2px,
    rgb(255 255 255 / 12%) 3px
  );
  opacity: 0.55;
  pointer-events: none;
}

.night-session-canvas .fixture-grade-name {
  display: -webkit-box;
  overflow: hidden;
  padding-right: 36px;
  font-family: var(--font-body);
  font-size: var(--type-fixture-grade);
  font-weight: 600;
  line-height: 1.2;
  color: var(--container-text, var(--ns-band-team, rgb(255 255 255 / 92%)));
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* Fixture body \u2014 stacked bordered blocks with gap-2 */
.night-session-canvas .fixture-unit__frame {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
  padding: var(--space-2);
  overflow: hidden;
  border: 0;
  border-radius: var(--ns-container-radius);
  background: transparent;
  box-shadow: none;
}

.night-session-canvas .fixture-opponents {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);
  align-items: stretch;
  column-gap: var(--space-2);
  min-height: 100px;
  padding: var(--space-2);
  overflow: hidden;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  border-radius: var(--ns-container-radius);
  background: var(
    --performance-area-surface,
    var(--ns-performance-row-bg, rgb(10 12 14 / 65%))
  );
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

.night-session-canvas .fixture-side {
  display: flex;
  align-items: stretch;
  gap: var(--space-2);
  min-width: 0;
}

/* Home: crest on outer left, name immediately to its right (toward spine) */
.night-session-canvas .fixture-side--home {
  flex-direction: row;
  justify-content: flex-start;
}

/* Away: crest on outer right, name band fills toward spine */
.night-session-canvas .fixture-side--away {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
  gap: var(--space-2);
  width: 100%;
  min-width: 0;
}

.night-session-canvas .fixture-opponents__spine {
  align-self: stretch;
  background: linear-gradient(
    180deg,
    transparent,
    var(--ns-performance-border, rgb(255 255 255 / 10%)) 35%,
    var(--ns-performance-border, rgb(255 255 255 / 10%)) 65%,
    transparent
  );
}

.night-session-canvas .fixture-opponents .team-band {
  min-width: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
}

.night-session-canvas
  .fixture-opponents
  .fixture-opponent__cell--name[data-club-team="true"] {
  border-color: color-mix(
    in srgb,
    var(--club-primary) 36%,
    var(--ns-performance-border, rgb(255 255 255 / 10%))
  );
}

.night-session-canvas .fixture-opponent__cell {
  min-width: 0;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: var(--ns-performance-row-bg, rgb(10 12 14 / 65%));
  box-shadow: var(
    --match-context-inset,
    var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 3%))
  );
}

.night-session-canvas .fixture-opponent__cell--mark {
  flex: 0 0 auto;
  align-self: stretch;
  display: grid;
  place-items: center;
  width: auto;
  height: auto;
  min-height: 92px;
  aspect-ratio: 1;
  padding: 0;
  overflow: hidden;
}

.night-session-canvas .fixture-opponent__cell--name {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 92px;
  margin: 0;
  padding: 8px 12px;
}

.night-session-canvas .fixture-side--home .fixture-opponent__cell--name {
  justify-content: flex-start;
  text-align: left;
}

.night-session-canvas .fixture-side--away .fixture-opponent__cell--name {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
}

.night-session-canvas .fixture-side--away .fixture-opponent__cell--mark {
  grid-column: 2;
  grid-row: 1;
}

.night-session-canvas .fixture-side--home .fixture-opponent__cell--mark {
  order: 1;
}

.night-session-canvas .fixture-side--home .fixture-opponent__cell--name {
  order: 2;
}

.night-session-canvas
  .fixture-opponents
  .fixture-opponent__cell--mark.team-mark {
  position: relative;
  display: grid;
  place-items: center;
}

.night-session-canvas
  .fixture-opponents
  .fixture-opponent__cell--mark.team-mark
  img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.night-session-canvas
  .fixture-opponents
  .fixture-opponent__cell--mark[data-has-crest="false"] {
  display: none;
}

.night-session-canvas
  .fixture-side--home:has(.fixture-opponent__cell--mark[data-has-crest="false"])
  .fixture-opponent__cell--name {
  flex: 1 1 100%;
}

.night-session-canvas
  .fixture-side--away:has(.fixture-opponent__cell--mark[data-has-crest="false"])
  .fixture-opponent__cell--name {
  flex: 1 1 100%;
}

.night-session-canvas
  .fixture-opponents
  .team-name.fixture-opponent__cell--name {
  overflow: hidden;
  min-width: 0;
  font-family: var(--font-body);
  font-size: var(--type-fixture-team);
  font-weight: 700;
  line-height: 1.15;
  color: var(--container-text, var(--ns-band-team, rgb(255 255 255 / 92%)));
}

.night-session-canvas .fixture-opponents .team-name__copy {
  display: block;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.night-session-canvas .fixture-side--home .team-name__copy {
  text-align: left;
}

.night-session-canvas .fixture-side--away .team-name__copy {
  text-align: right;
}

.night-session-canvas .fixture-opponents .team-side-label {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Schedule bridge \u2014 rule only; date/time sit in one bordered lockup */
.night-session-canvas .schedule-bridge {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 46px;
  padding: 0 12px;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.night-session-canvas .schedule-bridge__rule {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: var(--ns-performance-row-rule, rgb(255 255 255 / 12%));
  z-index: 0;
}

.night-session-canvas .schedule-bridge__rule::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 48px;
  height: 2px;
  transform: translate(-50%, -50%);
  background: var(--club-primary);
}

.night-session-canvas .schedule-lockup {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: min(100%, 280px);
  min-height: 44px;
  padding: 10px 28px;
  overflow: hidden;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  border-radius: var(--ns-container-radius);
  background: var(--ns-schedule-lockup-bg, rgb(10 12 14 / 95%));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

.night-session-canvas .schedule-lockup .fixture-grade-name {
  padding-right: 0;
  margin: 0;
  text-align: center;
  font-weight: 600;
  line-height: 1.2;
  color: var(
    --container-text-accent,
    var(--container-text, var(--ns-band-team, rgb(255 255 255 / 92%)))
  );
  -webkit-line-clamp: 2;
}

.night-session-canvas .schedule-lockup .fixture-grade-name[data-empty="true"] {
  display: none;
}

.night-session-canvas .fixture-time {
  font-family: var(--font-body);
  font-size: var(--type-fixture-time);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
  text-transform: none;
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas .fixture-date {
  font-family: var(--font-body);
  font-size: var(--type-fixture-date);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1;
  text-transform: none;
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

/* Match context \u2014 same reading order as Results metadata row */
.night-session-canvas .fixture-unit .match-context {
  min-width: 0;
  padding: 0;
  margin-top: var(--space-2);
  display: grid;
  grid-template-columns: minmax(0, 0.6fr) minmax(0, 0.4fr);
  gap: var(--space-3);
  align-items: stretch;
  border: 0;
  font-size: var(--type-fixture-context);
  font-weight: 500;
  line-height: 1.25;
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

.night-session-canvas .fixture-unit .context-left,
.night-session-canvas .fixture-unit .context-right,
.night-session-canvas .fixture-unit .context-venue {
  min-height: 44px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: var(--ns-performance-row-bg, rgb(10 12 14 / 65%));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

.night-session-canvas .fixture-unit .context-left {
  flex-wrap: wrap;
  gap: var(--space-2);
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

.night-session-canvas .fixture-unit .context-separator {
  width: 3px;
  height: 3px;
  flex: 0 0 auto;
  background: var(--container-text-accent, var(--club-primary));
  opacity: 0.85;
}

.night-session-canvas .fixture-unit .context-venue {
  justify-content: flex-start;
  overflow: hidden;
  text-align: left;
  text-wrap: balance;
  font-size: var(--type-fixture-venue);
  line-clamp: 2;
  -webkit-line-clamp: 2;
  color: var(--container-text, var(--contrast-team));
}

.night-session-canvas .fixture-close {
  display: none;
}

/* Inter-fixture rhythm lives in fixtures-stack gap + module shell above */
.night-session-canvas .fixture-unit:not(:last-child) {
  margin-bottom: 0;
}

.night-session-canvas .fixtures-stack > .fixture-separator {
  display: none;
}

/* Overrides night-session-shared crease rhythm inside animated wrappers */
.night-session-canvas
  .fixtures-ledger
  :is(.match-separator, .fixture-separator) {
  flex: 0 0 auto;
  align-self: stretch;
  width: 100%;
  margin: 0;
  padding: 0;
}

.night-session-canvas .fixtures-crease-step {
  flex: 0 0 auto;
  margin-block: 0;
}

.night-session-canvas .mark-fallback {
  width: 42%;
  height: 42%;
  border: 2px solid currentColor;
  opacity: 0.14;
}

.night-session-canvas .team-mark[data-has-crest="true"] .mark-fallback,
.night-session-canvas .team-mark:has(img:not([hidden])) .mark-fallback {
  display: none;
}

/* \u2014\u2014 Footer \u2014\u2014 */
.night-session-canvas .asset-footer {
  flex: 0 0 var(--zone-footer);
  min-height: var(--zone-footer);
  max-height: var(--zone-footer);
  box-sizing: border-box;
  padding: 0 var(--zone-content-pad) var(--zone-pad);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  overflow: hidden;
}

.night-session-canvas .footer-rule {
  height: 1px;
  margin-bottom: 10px;
  background: rgb(255 255 255 / 10%);
}

.night-session-canvas .sponsor-strip {
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
}

.night-session-canvas .sponsor-slot {
  flex: 0 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: rgb(244 243 241 / 42%);
}

.night-session-canvas .sponsor-symbol {
  width: 56px;
  height: 40px;
  background: rgb(255 255 255 / 6%);
  opacity: 0.6;
}

.night-session-canvas[data-sponsor-state="absent"] .asset-footer {
  display: none;
}

.night-session-canvas .team-name {
  overflow-wrap: anywhere;
  text-wrap: balance;
}


/* src/templates/variants/nightSession/styles/night-session-ladder.css */
/* Night Session \u2014 Ladder */

.night-session-canvas {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header: 148px;
  --zone-content: 1080px;
  --zone-footer: 112px;
  --zone-content-pad: 24px;
  --content-inset: 24px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 20px;
  --space-8: 32px;
  --ladder-stack-gap: var(--space-2);
  --ladder-row-min-height: 68px;
  --ladder-grid-rank: 52px;
  --ladder-grid-mark: 72px;
  --ladder-grid-mark-col: var(--ladder-row-min-height);
  --ladder-mark-size: var(--ladder-row-min-height);
  --ladder-grid-stats: 252px;
  --ladder-stat-gap: 4px;
  --ladder-stat-columns: repeat(5, minmax(0, 1fr));
  --type-ladder-grade: 20px;
  --type-ladder-legend: 24px;
  --type-ladder-rank: 36px;
  --type-ladder-rank-hero: 44px;
  --type-ladder-team: 24px;
  --type-ladder-team-hero: 26px;
  --type-ladder-stat: calc(22px + 2pt);
  --type-ladder-column: 14px;
  --header-text: rgb(244 243 241 / 96%);
  --font-display: "Teko", "Arial Narrow", sans-serif;
  --font-body: "Source Sans 3", Arial, sans-serif;
  --ns-container-radius: 50px;

  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  color: var(--paper, #f4f3f1);
  font-family: var(--font-body);
}

.night-session-canvas,
.night-session-canvas * {
  box-sizing: border-box;
}

.night-session-canvas h1,
.night-session-canvas h2,
.night-session-canvas p {
  margin: 0;
}

.night-session-canvas .fixture-palette {
  display: none;
}

.night-session-canvas .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* \u2014\u2014 Header \u2014\u2014 */
.night-session-canvas .ns-header {
  flex: 0 0 var(--zone-header);
  min-height: var(--zone-header);
  max-height: var(--zone-header);
  padding: var(--zone-pad) var(--content-inset) 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  position: relative;
}

.night-session-canvas .ns-header__mark {
  position: absolute;
  top: calc(var(--zone-pad) + 4px);
  right: var(--content-inset);
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  z-index: 2;
}

.night-session-canvas .ns-header__mark img {
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: contain;
}

.night-session-canvas .ns-header__lockup {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 0;
  padding: 8px 88px 10px;
  text-align: center;
}

.night-session-canvas .header-eyebrow {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.2em;
  line-height: 1;
  text-transform: uppercase;
  color: rgb(244 243 241 / 52%);
}

.night-session-canvas .header-title {
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 0.92;
  text-transform: uppercase;
  color: var(--header-text, #fff);
}

.night-session-canvas .ns-header__accent {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.night-session-canvas .ns-accent-wedge {
  position: absolute;
  top: 18px;
  left: calc(50% - 120px);
  width: 240px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--club-primary) 45%,
    transparent
  );
  opacity: 0.75;
}

.night-session-canvas .ns-accent-lines {
  position: absolute;
  top: 22px;
  right: calc(var(--content-inset) + 84px);
  width: 36px;
  height: 18px;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 3px,
    rgb(255 255 255 / 14%) 3px,
    rgb(255 255 255 / 14%) 4px
  );
  opacity: 0.55;
}

/* \u2014\u2014 Ledger \u2014\u2014 */
.night-session-canvas .ladder-ledger {
  min-height: 0;
  flex: 1 1 var(--zone-content);
  max-height: var(--zone-content);
  padding: var(--space-3) var(--zone-content-pad) 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}

.night-session-canvas .ladder-stack {
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--ladder-stack-gap);
}

/* \u2014\u2014 Pill radius on inner blocks only (parent ladder unit stays square) \u2014\u2014 */
.night-session-canvas .ladder-table.ladder-unit,
.night-session-canvas .ladder-unit__frame {
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.night-session-canvas .ladder-unit__rail.ladder-grade,
.night-session-canvas .ladder-columns,
.night-session-canvas .ladder-row {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

/* Grade module \u2014 border + gradient rail */
.night-session-canvas .ladder-table.ladder-unit {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  max-height: 100%;
  gap: var(--space-2);
  padding: 4px;
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.night-session-canvas .ladder-unit__rail.ladder-grade {
  justify-content: center;
  text-align: center;
}

.night-session-canvas .ladder-unit__rail.ladder-grade::after {
  display: none;
}

.night-session-canvas .ladder-unit__rail {
  position: relative;
  flex: 0 0 auto;
  min-width: 0;
  padding: 9px 14px;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(
        --ns-grade-rail-gradient-mid,
        color-mix(in srgb, var(--club-primary) 10%, transparent)
      )
      58%,
    var(
        --ns-grade-rail-gradient-end,
        color-mix(in srgb, var(--club-primary) 32%, transparent)
      )
      100%
  );
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 3%);
}

.night-session-canvas .ladder-unit__rail::after {
  content: "";
  position: absolute;
  top: 8px;
  right: 12px;
  width: 28px;
  height: 12px;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 2px,
    rgb(255 255 255 / 12%) 2px,
    rgb(255 255 255 / 12%) 3px
  );
  opacity: 0.55;
  pointer-events: none;
}

.night-session-canvas .ladder-grade[data-empty="true"] {
  display: none;
}

.night-session-canvas .ladder-grade-name {
  display: -webkit-box;
  width: 100%;
  overflow: hidden;
  padding-right: 0;
  font-family: var(--font-body);
  font-size: var(--type-ladder-grade);
  font-weight: 400;
  line-height: 1.3;
  text-align: center;
  color: var(--container-text, var(--ns-band-team, rgb(255 255 255 / 92%)));
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.night-session-canvas .ladder-unit__frame {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 0 1 auto;
  min-height: 0;
  padding: var(--space-2);
  overflow: hidden;
}

.night-session-canvas .ladder-columns {
  flex: 0 0 auto;
  display: grid;
  grid-template-columns:
    var(--ladder-grid-mark-col)
    minmax(0, 1fr)
    var(--ladder-grid-stats);
  column-gap: var(--space-2);
  align-items: center;
  min-height: var(--ladder-row-min-height);
  padding: var(--space-3) var(--space-2) var(--space-3) 0;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: var(--ns-performance-row-bg, var(--container-surface));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

/* Light mode \u2014 same row tint family, slightly deeper than data rows (35% \u2192 52%) */
.night-session-canvas[data-night-session-mode="light"] .ladder-columns,
.night-session-canvas[data-night-session-mode="lightAlt"] .ladder-columns {
  background: rgb(243 240 234 / 52%);
}

.night-session-canvas .ladder-columns .ladder-columns__grade.ladder-grade-name {
  display: block;
  min-width: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  justify-self: start;
  align-self: center;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--font-body);
  text-transform: none;
  letter-spacing: 0.02em;
  font-size: var(--type-ladder-legend);
  font-weight: 400;
  line-height: 1.3;
  color: var(--container-text, var(--contrast-performance-lead));
  -webkit-box-orient: unset;
  -webkit-line-clamp: unset;
}

.night-session-canvas .ladder-columns__stats > span {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-size: var(--type-ladder-legend);
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.1;
  text-transform: uppercase;
  color: var(--container-text-muted, rgb(244 243 241 / 58%));
}

.night-session-canvas
  .ladder-columns[data-empty="true"]
  .ladder-columns__grade {
  display: none;
}

.night-session-canvas .ladder-columns__stats,
.night-session-canvas .ladder-stats {
  display: grid;
  grid-template-columns: var(--ladder-stat-columns);
  gap: var(--ladder-stat-gap);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.night-session-canvas .ladder-columns__stats {
  align-items: center;
  text-align: center;
  padding-right: 0;
}

.night-session-canvas .ladder-rows {
  flex: 0 1 auto;
  min-height: 0;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  overflow-y: auto;
  overflow-x: hidden;
}

.night-session-canvas .ladder-rows[data-density="compact"],
.night-session-canvas
  .ladder-unit__frame:has(.ladder-rows[data-density="compact"])
  .ladder-columns {
  --type-ladder-legend: 22px;
}

.night-session-canvas .ladder-rows[data-density="compact"] {
  --ladder-row-min-height: 58px;
  --type-ladder-rank: 32px;
  --type-ladder-rank-hero: 38px;
  --type-ladder-team: 22px;
  --type-ladder-team-hero: 24px;
  --type-ladder-stat: calc(20px + 2pt);
  --ladder-grid-mark: 64px;
  --ladder-grid-stats: 228px;
}

.night-session-canvas .ladder-rows[data-density="tight"],
.night-session-canvas
  .ladder-unit__frame:has(.ladder-rows[data-density="tight"])
  .ladder-columns {
  --type-ladder-legend: 20px;
}

.night-session-canvas .ladder-rows[data-density="tight"] {
  --ladder-row-min-height: 50px;
  --type-ladder-rank: 28px;
  --type-ladder-rank-hero: 34px;
  --type-ladder-team: 20px;
  --type-ladder-team-hero: 22px;
  --type-ladder-stat: calc(18px + 2pt);
  --ladder-grid-mark: 56px;
  --ladder-grid-stats: 210px;
}

.night-session-canvas .ladder-entry {
  flex: 0 0 auto;
  min-height: var(--ladder-row-min-height);
  display: flex;
  flex-direction: column;
}

.night-session-canvas .ladder-entry[data-empty="true"] {
  display: none;
}

.night-session-canvas .ladder-entry > .animated-container {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  min-height: var(--ladder-row-min-height);
}

.night-session-canvas .ladder-entry > .animated-container > .ladder-row {
  flex: 0 0 auto;
  min-height: var(--ladder-row-min-height);
  height: auto;
}

.night-session-canvas .ladder-row {
  position: relative;
  flex: 0 0 auto;
  min-height: var(--ladder-row-min-height);
  display: grid;
  grid-template-columns:
    var(--ladder-grid-mark-col)
    minmax(0, 1fr)
    var(--ladder-grid-stats);
  column-gap: var(--space-2);
  align-items: stretch;
  padding: 0;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: var(--ns-performance-row-bg, var(--container-surface)) !important;
  box-shadow: var(
    --container-inset,
    inset 0 1px 0 rgb(255 255 255 / 4%)
  ) !important;
}

/* Beat Scoreline / broadcast row neutralisation on ladder pill */
.night-session-canvas[data-ladder] .ladder-rows .ladder-entry .ladder-row {
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  border-radius: var(--ns-container-radius);
  background: var(--ns-performance-row-bg, var(--container-surface)) !important;
  box-shadow: var(
    --container-inset,
    inset 0 1px 0 rgb(255 255 255 / 4%)
  ) !important;
}

.night-session-canvas .ladder-row__cell--rank {
  display: none;
}

.night-session-canvas .ladder-rank.ladder-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  width: 100%;
  min-height: var(--ladder-row-min-height);
  padding: 8px 6px;
  font-family: var(--font-body);
  font-size: var(--type-ladder-rank);
  font-weight: 400;
  line-height: 1;
  font-variant-numeric: tabular-nums lining-nums;
}

.night-session-canvas
  .ladder-entry:first-of-type:not([data-empty="true"])
  .ladder-rank.ladder-cell {
  font-size: var(--type-ladder-rank-hero);
}

.night-session-canvas .ladder-row .ladder-cell {
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

/* Crest well \u2014 square cell, circular clip (match Top 5 leader-mark) */
.night-session-canvas .ladder-row__cell--mark.ladder-cell {
  position: relative;
  align-self: stretch;
  justify-self: stretch;
  width: 100%;
  min-height: 100%;
  height: 100%;
  padding: 0 !important;
  display: grid;
  place-items: stretch;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  overflow: hidden;
}

.night-session-canvas .ladder-mark {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  max-width: var(--ladder-mark-size);
  max-height: var(--ladder-mark-size);
  aspect-ratio: 1;
  justify-self: center;
  align-self: center;
  border-radius: 50%;
  overflow: hidden;
}

.night-session-canvas .ladder-mark .ladder-mark__surface {
  position: relative;
  display: grid;
  place-items: stretch;
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 50%;
  overflow: hidden;
}

.night-session-canvas .ladder-mark img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.night-session-canvas .ladder-mark[data-has-crest="true"] .mark-fallback,
.night-session-canvas
  .ladder-mark__surface[data-has-crest="true"]
  .mark-fallback,
.night-session-canvas .ladder-mark:has(img:not([hidden])) .mark-fallback {
  display: none;
}

.night-session-canvas .ladder-mark .mark-fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  opacity: 0.1;
}

.night-session-canvas .ladder-row__cell--team.ladder-cell {
  align-items: center;
  padding: var(--space-3) var(--space-2) var(--space-3) 0;
  min-height: var(--ladder-row-min-height);
}

.night-session-canvas .ladder-team {
  min-width: 0;
  flex: 1 1 auto;
  font-family: var(--font-body);
  font-size: var(--type-ladder-team);
  font-weight: 400;
  line-height: 1.05;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.night-session-canvas
  .ladder-entry:first-of-type:not([data-empty="true"])
  .ladder-team {
  font-size: var(--type-ladder-team-hero);
}

.night-session-canvas .ladder-row__cell--stats.ladder-cell {
  width: var(--ladder-grid-stats);
  min-width: var(--ladder-grid-stats);
  max-width: var(--ladder-grid-stats);
  padding: var(--space-3) var(--space-2) var(--space-3) 0;
  min-height: var(--ladder-row-min-height);
  justify-content: stretch;
  align-items: stretch;
  box-sizing: border-box;
}

/* Beat .ladder-row .ladder-cell { display: flex } \u2014 stats must mirror legend grid */
.night-session-canvas .ladder-row__cell--stats .ladder-stats {
  display: grid;
  grid-template-columns: var(--ladder-stat-columns);
  gap: var(--ladder-stat-gap);
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  height: 100%;
  align-content: center;
}

.night-session-canvas .ladder-stat {
  font-family: var(--font-body);
  font-size: var(--type-ladder-stat);
  font-weight: 400;
  line-height: 1;
  font-variant-numeric: tabular-nums lining-nums;
  text-align: center;
}

.night-session-canvas .ladder-stat--pts {
  font-weight: 400;
}

/* Interior row copy \u2014 single mode token (on-container copy, not title/muted tiers) */
.night-session-canvas
  .ladder-rows
  .ladder-row
  :is(
    .ladder-rank,
    .ladder-rank.ladder-cell,
    .ladder-team,
    .ladder-team.ladder-cell,
    .ladder-stat,
    .ladder-stat--pts
  ) {
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas .ladder-row[data-bias="true"] {
  border-color: color-mix(
    in srgb,
    var(--club-primary) 55%,
    var(--ns-performance-border, rgb(255 255 255 / 10%))
  );
  background: color-mix(
    in srgb,
    var(--club-primary) 12%,
    var(--ns-performance-row-bg, var(--container-surface))
  ) !important;
}

/* \u2014\u2014 Footer \u2014\u2014 */
.night-session-canvas .asset-footer {
  flex: 0 0 var(--zone-footer);
  min-height: var(--zone-footer);
  max-height: var(--zone-footer);
  padding: 0 var(--zone-content-pad) var(--zone-pad);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--space-3);
}

.night-session-canvas .footer-rule {
  width: 100%;
  height: 1px;
  background: rgb(255 255 255 / 10%);
}

.night-session-canvas .footer-crease {
  display: none;
}


/* src/templates/variants/nightSession/styles/night-session-top5.css */
/* Night Session \u2014 Top 5 (batting & bowling) */

.night-session-canvas {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header: 148px;
  --zone-content: 1080px;
  --zone-footer: 112px;
  --zone-content-pad: 12px;
  --content-inset: 12px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 20px;
  --space-5: 32px;
  --leader-stack-gap: var(--space-5);
  --leader-player-row-height: var(--type-leader-mark);
  --leader-rank-bridge-overlap: 12px;
  --leader-rank-one-opacity: 0.82;
  --header-text: rgb(244 243 241 / 96%);
  --font-display: "Teko", "Arial Narrow", sans-serif;
  --font-body: "Source Sans 3", Arial, sans-serif;
  --type-leaderboard-category: 22px;
  --type-leader-name: 57px;
  --type-leader-name-hero: 57px;
  --type-leader-mark: 100px;
  --type-leader-mark-hero: 108px;
  --type-leader-meta-label: 14px;
  --type-leader-team: 23px;
  --type-leader-rank: 42px;
  --type-leader-rank-hero: 52px;
  --type-leader-figure: 50px;
  --type-leader-figure-hero: 60px;
  --type-leader-suffix: 28px;
  --ns-container-radius: 50px;
  --leaderboard-grade-width: 60%;
  --leaderboard-players-width: 90%;

  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  color: var(--paper, #f4f3f1);
  font-family: var(--font-body);
}

.night-session-canvas,
.night-session-canvas * {
  box-sizing: border-box;
}

.night-session-canvas h1,
.night-session-canvas h2,
.night-session-canvas h3,
.night-session-canvas p {
  margin: 0;
}

.night-session-canvas .fixture-palette {
  display: none;
}

.night-session-canvas .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* \u2014\u2014 Header \u2014\u2014 */
.night-session-canvas .ns-header {
  flex: 0 0 var(--zone-header);
  min-height: var(--zone-header);
  max-height: var(--zone-header);
  padding: var(--zone-pad) var(--content-inset) 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  position: relative;
}

.night-session-canvas .ns-header__mark {
  position: absolute;
  top: calc(var(--zone-pad) + 4px);
  right: var(--content-inset);
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  z-index: 2;
}

.night-session-canvas .ns-header__mark img {
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: contain;
}

.night-session-canvas .ns-header__lockup {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 0;
  padding: 8px 88px 10px;
  text-align: center;
}

.night-session-canvas .header-eyebrow {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.2em;
  line-height: 1;
  text-transform: uppercase;
  color: rgb(244 243 241 / 52%);
}

.night-session-canvas .header-title {
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 0.92;
  text-transform: uppercase;
  color: var(--header-text, #fff);
}

.night-session-canvas .ns-header__accent {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.night-session-canvas .ns-accent-wedge {
  position: absolute;
  top: 18px;
  left: calc(50% - 120px);
  width: 240px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--club-primary) 45%,
    transparent
  );
  opacity: 0.75;
}

.night-session-canvas .ns-accent-lines {
  position: absolute;
  top: 22px;
  right: calc(var(--content-inset) + 84px);
  width: 36px;
  height: 18px;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 3px,
    rgb(255 255 255 / 14%) 3px,
    rgb(255 255 255 / 14%) 4px
  );
  opacity: 0.55;
}

/* \u2014\u2014 Ledger \u2014\u2014 */
.night-session-canvas .leaderboard-ledger {
  min-height: 0;
  flex: 1 1 var(--zone-content);
  max-height: var(--zone-content);
  padding: 0 var(--leaderboard-ledger-pad-x, var(--zone-content-pad));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
}

.night-session-canvas .leaderboard-stack {
  width: 100%;
  max-width: 100%;
  flex: 0 1 auto;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  overflow: hidden;
}

/* \u2014\u2014 Pill container radius (Results / Upcoming parity) \u2014\u2014 */
.night-session-canvas .leaderboard-category {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .leader-rank-tag.schedule-lockup {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .leader-row .leader-cell {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .leader-mark.leader-cell .leader-mark__surface {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas .leaderboard-category {
  position: relative;
  width: var(--leaderboard-grade-width);
  max-width: var(--leaderboard-grade-width);
  min-width: 0;
  padding: 9px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(
          --ns-grade-rail-gradient-mid,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 10%,
            transparent
          )
        )
        58%,
      var(
          --ns-grade-rail-gradient-end,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 32%,
            transparent
          )
        )
        100%
    ),
    var(--ns-performance-row-bg, rgb(10 12 14 / 65%));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

.night-session-canvas .leaderboard-category-label {
  display: none;
}

.night-session-canvas .leaderboard-category-value {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  font-family: var(--font-body);
  font-size: var(--type-leaderboard-category);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.3;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--container-text, var(--contrast-team));
}

.night-session-canvas .leaderboard-category[data-empty="true"] {
  display: none;
}

.night-session-canvas .leaderboard-rows {
  display: grid;
  grid-template-columns:
    var(--leader-player-row-height)
    minmax(0, 1fr)
    max-content;
  column-gap: var(--space-2);
  row-gap: var(--leader-stack-gap);
  align-items: stretch;
  min-width: 0;
  width: var(--leaderboard-players-width);
  max-width: var(--leaderboard-players-width);
}

.night-session-canvas .leader-entry.leader-unit {
  grid-column: 1 / -1;
  min-width: 0;
  position: relative;
  isolation: isolate;
  border: 0;
  background: transparent;
  box-shadow: none;
}

/* Remotion anim wrapper \u2014 rank bridge + player row (no subgrid; wrapper breaks subgrid) */
.night-session-canvas .leader-entry.leader-unit > .animated-container {
  display: grid;
  width: 100%;
  max-width: 100%;
  grid-template-columns:
    var(--leader-player-row-height)
    minmax(0, 1fr)
    max-content;
  grid-template-rows: auto;
  row-gap: 0;
  min-width: 0;
}

.night-session-canvas
  .leader-entry.leader-unit
  > .animated-container.container-full {
  width: 100%;
}

.night-session-canvas .leader-entry[data-empty="true"] {
  display: none;
}

/* Rank numbers \u2014 hidden on Night Session Top 5 */
.night-session-canvas .leader-rank-bridge-wrap {
  display: none;
}

.night-session-canvas .leader-rank-bridge.schedule-bridge {
  grid-column: 1 / -1;
  position: relative;
  z-index: 30;
  display: grid;
  place-items: center;
  min-height: 40px;
  margin: 0 0 calc(var(--leader-rank-bridge-overlap) * -1);
  padding: 0 12px;
  border: 0;
  background: transparent;
  box-shadow: none;
  pointer-events: none;
}

.night-session-canvas .leader-rank-bridge .schedule-bridge__rule {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: var(--ns-performance-row-rule, rgb(255 255 255 / 12%));
  z-index: 0;
}

.night-session-canvas .leader-rank-bridge .schedule-bridge__rule::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 48px;
  height: 2px;
  transform: translate(-50%, -50%);
  background: var(
    --on-container-copy-no-bg-accent,
    var(--container-text-accent, var(--club-primary))
  );
}

.night-session-canvas .leader-rank-tag.schedule-lockup {
  position: relative;
  z-index: 31;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  min-height: 40px;
  padding: 8px 36px;
  border: 1px solid var(--ns-performance-border, rgb(8 11 13 / 12%));
  background: var(--ns-leader-rank-bg, rgb(255 255 255 / 95%));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 55%));
  font-family: var(--font-body);
  font-size: var(--type-leader-rank);
  font-weight: 400;
  line-height: 1;
  font-variant-numeric: tabular-nums lining-nums;
  color: var(
    --ns-leader-rank-text,
    var(--container-text-accent, var(--container-text, rgb(8 11 13 / 96%)))
  );
}

.night-session-canvas .leader-row {
  grid-column: 1 / -1;
  width: 100%;
  max-width: 100%;
  position: relative;
  z-index: 0;
  display: grid;
  grid-template-columns:
    var(--leader-player-row-height)
    minmax(0, 1fr)
    max-content;
  align-items: stretch;
  column-gap: var(--space-2);
  min-width: 0;
  height: var(--leader-player-row-height);
  min-height: var(--leader-player-row-height);
  max-height: var(--leader-player-row-height);
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  border-radius: var(--ns-container-radius);
  background: var(--ns-performance-row-bg, rgb(10 12 14 / 65%)) !important;
  box-shadow: var(
    --container-inset,
    inset 0 1px 0 rgb(255 255 255 / 4%)
  ) !important;
}

/* Beat Scoreline / performances bleed (must match [data-leaderboard] row selectors) */
.night-session-canvas[data-leaderboard]
  .leaderboard-rows
  .leader-entry
  .leader-row {
  min-height: var(--leader-player-row-height);
  height: var(--leader-player-row-height);
  max-height: var(--leader-player-row-height);
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  border-radius: var(--ns-container-radius);
  background: var(--ns-performance-row-bg, rgb(10 12 14 / 65%)) !important;
  box-shadow: var(
    --container-inset,
    inset 0 1px 0 rgb(255 255 255 / 4%)
  ) !important;
}

.night-session-canvas[data-leaderboard]
  .leaderboard-rows
  .leader-entry
  .leader-name {
  font-size: var(--type-leader-name);
  font-style: normal;
  font-weight: 700;
}

.night-session-canvas[data-leaderboard]
  .leaderboard-rows
  .leader-entry
  .leader-rank {
  font-size: var(--type-leader-rank);
  font-weight: 400;
}

.night-session-canvas[data-leaderboard]
  .leaderboard-rows
  .leader-entry
  .leader-figure {
  font-size: var(--type-leader-figure);
  font-weight: 700;
}

.night-session-canvas .leader-row .leader-cell {
  position: relative;
  z-index: 0;
  min-height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.night-session-canvas .leader-mark.leader-cell {
  position: relative;
  width: 100%;
  min-height: 0;
  padding: 0 !important;
  display: grid;
  place-items: stretch;
  overflow: hidden;
  justify-self: stretch;
  align-self: stretch;
}

.night-session-canvas .leader-mark.leader-cell img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.night-session-canvas .leader-mark.leader-cell .mark-fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.night-session-canvas .leader-mark[data-has-crest="true"] .mark-fallback,
.night-session-canvas
  .leader-mark__surface[data-has-crest="true"]
  .mark-fallback,
.night-session-canvas .leader-mark:has(img:not([hidden])) .mark-fallback {
  display: none;
}

.night-session-canvas .leader-mark.leader-cell .leader-mark__surface {
  position: relative;
  display: grid;
  place-items: stretch;
  width: 100%;
  height: 100%;
  min-height: 0;
}

.night-session-canvas .leader-team-label {
  display: none;
}

.night-session-canvas .leader-copy.leader-cell {
  width: 100%;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  justify-self: stretch;
  text-align: center;
}

.night-session-canvas .leader-copy .leader-name {
  width: 100%;
  overflow: hidden;
  font-family: var(--font-body);
  font-size: var(--type-leader-name);
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.05;
  text-transform: none;
  text-align: center;
  color: var(--container-text, var(--contrast-team));
  text-wrap: balance;
  overflow-wrap: anywhere;
}

.night-session-canvas .leader-copy .leader-team {
  width: 100%;
  overflow: hidden;
  font-size: var(--type-leader-team);
  font-weight: 500;
  line-height: 1.05;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

.night-session-canvas .leader-row .leader-figure {
  align-self: stretch;
  justify-self: end;
  min-width: 0;
  min-height: 100%;
  height: 100%;
  padding: 0 16px 0 12px;
  border: 0;
  background: transparent;
  box-shadow: none;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0;
  text-align: right;
  font-family: var(--font-body);
  font-size: var(--type-leader-figure);
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  font-variant-numeric: tabular-nums lining-nums;
  color: var(--header-text, rgb(255 255 255 / 92%));
}

/* #1 \u2014 same dimensions as other rows; only opacity differs (see shared + token) */
.night-session-canvas[data-leaderboard]
  .leaderboard-rows
  > .leader-entry:first-of-type:not([data-empty="true"])
  > .animated-container,
.night-session-canvas[data-leaderboard]
  .leaderboard-rows
  > .leader-entry:first-of-type:not([data-empty="true"]):not(
    :has(> .animated-container)
  ) {
  opacity: var(--leader-rank-one-opacity);
}

.night-session-canvas[data-leaderboard]
  .leader-entry:first-of-type
  :is(.leader-rank, .leader-copy, .leader-stats) {
  opacity: 1;
}

.night-session-canvas .leader-row > * {
  align-self: stretch;
  min-height: 0;
}

.night-session-canvas .leader-balls,
.night-session-canvas .leader-overs {
  margin-left: 4px;
  font-family: var(--font-body);
  font-size: var(--type-leader-suffix);
  font-weight: 700;
  font-variant-numeric: tabular-nums lining-nums;
  color: var(--header-text, rgb(255 255 255 / 92%));
}

.night-session-canvas .leader-figure-label {
  display: none;
}

.night-session-canvas .leader-crease {
  display: none !important;
}

/* \u2014\u2014 Footer \u2014\u2014 */
.night-session-canvas .asset-footer {
  flex: 0 0 var(--zone-footer);
  min-height: var(--zone-footer);
  max-height: var(--zone-footer);
  box-sizing: border-box;
  padding: 0 var(--zone-content-pad) var(--zone-pad);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  overflow: hidden;
}

.night-session-canvas .footer-rule {
  height: 1px;
  margin-bottom: 10px;
  background: rgb(255 255 255 / 10%);
}

.night-session-canvas .sponsor-strip {
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
}

.night-session-canvas .sponsor-slot {
  flex: 0 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: rgb(244 243 241 / 42%);
}

.night-session-canvas .sponsor-symbol {
  width: 56px;
  height: 40px;
  background: rgb(255 255 255 / 6%);
  opacity: 0.6;
}

.night-session-canvas[data-sponsor-state="absent"] .asset-footer {
  display: none;
}


/* src/templates/variants/nightSession/styles/night-session-performances.css */
/* Night Session performances \u2014 density when a screen shows more than five rows */

.night-session-canvas[data-leaderboard] .leaderboard-rows[data-density] {
  row-gap: var(--leader-stack-gap) !important;
  column-gap: 0;
  gap: var(--leader-stack-gap) !important;
}

.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="compact"]
  .leader-row,
.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="tight"]
  .leader-row {
  column-gap: var(--space-2);
}

.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="compact"] {
  --leader-player-row-height: 88px;
  --type-leader-mark: 88px;
  --type-leader-name: 50px;
  --type-leader-figure: 44px;
  --type-leader-rank: 38px;
  --leader-stack-gap: var(--space-4);
  --leader-rank-bridge-overlap: 10px;
}

.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="tight"] {
  --leader-player-row-height: 76px;
  --type-leader-mark: 76px;
  --type-leader-name: 44px;
  --type-leader-figure: 38px;
  --type-leader-rank: 34px;
  --type-leader-team: 21px;
  --leader-stack-gap: var(--space-2);
  --leader-rank-bridge-overlap: 8px;
}

.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="compact"]
  .leader-rank-bridge.schedule-bridge,
.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="tight"]
  .leader-rank-bridge.schedule-bridge {
  min-height: 34px;
}

.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="compact"]
  .leader-rank-tag.schedule-lockup,
.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="tight"]
  .leader-rank-tag.schedule-lockup {
  min-width: 72px;
  min-height: 34px;
  padding: 6px 28px;
}

.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="tight"]
  .leader-row
  .leader-copy.leader-cell,
.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="tight"]
  .leader-row
  .leader-figure.leader-cell {
  padding: 0 12px;
}

.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="compact"]
  .leader-row
  .leader-copy.leader-cell,
.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="compact"]
  .leader-row
  .leader-figure.leader-cell {
  padding: 0 12px;
}

/* Performances density \u2014 crest stays flush to row pill (no cell inset on mark) */
.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="compact"]
  .leader-row
  .leader-mark.leader-cell,
.night-session-canvas[data-leaderboard]
  .leaderboard-rows[data-density="tight"]
  .leader-row
  .leader-mark.leader-cell {
  padding: 0;
}


/* src/templates/variants/nightSession/styles/night-session-team-roster.css */
/* Night Session \u2014 Team Roster */

.night-session-canvas[data-roster] {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header: 148px;
  --zone-content: 1080px;
  --zone-footer: 112px;
  --zone-content-pad: 24px;
  --content-inset: 24px;
  --space-2: 8px;
  --space-3: 12px;
  --roster-col-info: minmax(0, 2fr);
  --roster-col-lineup: minmax(0, 3fr);
  --roster-hero-mark-away: 148px;
  --roster-hero-mark-home: calc(var(--roster-hero-mark-away) * 1.25);
  --type-roster-team-hero: 32px;
  --type-roster-date: 28px;
  --type-roster-venue: 22px;
  --roster-row-min-height: 52px;
  --roster-grid-index: 48px;
  --type-roster-grade: 20px;
  --type-roster-player: 34px;
  --type-roster-index: 36px;
  --type-roster-squad: 22px;
  --type-fixture-grade: 20px;
  --ns-container-radius: 50px;
  --font-display: "Teko", "Arial Narrow", sans-serif;
  --font-body: "Source Sans 3", Arial, sans-serif;

  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  color: var(--paper, #f4f3f1);
  font-family: var(--font-body);
}

.night-session-canvas[data-roster],
.night-session-canvas[data-roster] * {
  box-sizing: border-box;
}

.night-session-canvas[data-roster] h1,
.night-session-canvas[data-roster] h2,
.night-session-canvas[data-roster] p {
  margin: 0;
}

.night-session-canvas[data-roster] .fixture-palette {
  display: none;
}

.night-session-canvas[data-roster] .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* \u2014\u2014 Header (shared ns-header tokens) \u2014\u2014 */
.night-session-canvas[data-roster] .ns-header {
  flex: 0 0 var(--zone-header);
  min-height: var(--zone-header);
  max-height: var(--zone-header);
  padding: var(--zone-pad) var(--content-inset) 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  position: relative;
}

.night-session-canvas[data-roster] .ns-header__mark {
  position: absolute;
  top: calc(var(--zone-pad) + 4px);
  right: var(--content-inset);
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  z-index: 2;
}

.night-session-canvas[data-roster] .ns-header__mark img {
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: contain;
}

.night-session-canvas[data-roster] .ns-header__lockup {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  max-width: calc(100% - 88px);
  min-height: 100%;
  padding-right: 8px;
}

/* Upcoming.css forces all-caps headers \u2014 roster uses natural casing */
.night-session-canvas[data-roster] .header-eyebrow {
  letter-spacing: 0.08em;
  text-transform: none;
}

.night-session-canvas[data-roster] .header-title {
  letter-spacing: 0.02em;
  text-transform: none;
}

.night-session-canvas[data-roster] .fixture-grade-name {
  width: 100%;
  padding-right: 0;
  text-align: center;
  text-transform: none;
}

.night-session-canvas[data-roster] .roster-grade.fixture-unit__rail {
  justify-content: center;
  text-align: center;
}

.night-session-canvas[data-roster] .roster-grade.fixture-unit__rail::after {
  display: none;
}

/* \u2014\u2014 Ledger \u2014\u2014 */
.night-session-canvas[data-roster] .roster-ledger {
  flex: 1 1 var(--zone-content);
  min-height: 0;
  max-height: var(--zone-content);
  padding: var(--zone-content-pad);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

.night-session-canvas[data-roster] .roster-columns {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: var(--roster-col-info) var(--roster-col-lineup);
  gap: var(--space-2);
  align-items: stretch;
}

.night-session-canvas[data-roster]
  .roster-columns
  > .fixture-card.fixture-unit {
  flex: 1 1 auto;
  width: auto;
  max-width: none;
  min-height: 0;
  height: 100%;
  align-self: stretch;
}

.night-session-canvas[data-roster] .roster-info,
.night-session-canvas[data-roster] .roster-lineup {
  min-height: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.night-session-canvas[data-roster] .roster-lineup {
  width: auto;
  max-width: none;
  margin-inline: 0;
  gap: 0;
}

/* \u2014\u2014 Pill radius on inner blocks only (parent fixture columns stay square) \u2014\u2014 */
.night-session-canvas[data-roster]
  .roster-columns
  > .fixture-card.fixture-unit {
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.night-session-canvas[data-roster] .roster-info__frame,
.night-session-canvas[data-roster] .roster-lineup__frame,
.night-session-canvas[data-roster] .fixture-unit__frame {
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.night-session-canvas[data-roster] .fixture-unit__rail.roster-grade,
.night-session-canvas[data-roster] .fixture-unit__rail.roster-lineup__rail,
.night-session-canvas[data-roster] .roster-cell,
.night-session-canvas[data-roster] .roster-row[data-empty-roster="true"] {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas[data-roster] .fixture-unit__rail.roster-grade,
.night-session-canvas[data-roster] .fixture-unit__rail.roster-lineup__rail {
  display: flex;
  align-items: center;
  grid-template-columns: unset;
  gap: 0;
  padding: 7px 12px;
  border-bottom: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(
          --ns-grade-rail-gradient-mid,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 10%,
            transparent
          )
        )
        58%,
      var(
          --ns-grade-rail-gradient-end,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 32%,
            transparent
          )
        )
        100%
    ),
    var(--ns-performance-row-bg, var(--container-surface));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

/* Beat Scoreline .roster-grade { match-context-surface } bleed on the same node */
.night-session-canvas[data-roster] .roster-grade.fixture-unit__rail {
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(
          --ns-grade-rail-gradient-mid,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 10%,
            transparent
          )
        )
        58%,
      var(
          --ns-grade-rail-gradient-end,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 32%,
            transparent
          )
        )
        100%
    ),
    var(--ns-performance-row-bg, var(--container-surface));
}

.night-session-canvas[data-roster] .roster-rows .roster-entry .roster-row {
  grid-template-columns: minmax(0, 1fr);
  column-gap: 0;
  padding: 0;
  align-items: stretch;
}

.night-session-canvas[data-roster] .roster-info__frame {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.night-session-canvas[data-roster] .roster-lineup__frame {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.night-session-canvas[data-roster] .roster-grade[data-empty="true"] {
  display: none;
}

/* Left column \u2014 fixture meta stack (format / round / demographics) */
.night-session-canvas[data-roster] .roster-meta-stack {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: var(--space-2);
}

.night-session-canvas[data-roster] .roster-meta-line {
  width: 100%;
  min-width: 0;
  margin: 0;
  justify-content: center;
  padding: 10px 14px;
  text-align: center;
}

.night-session-canvas[data-roster] .roster-meta-line--format {
  font-size: calc(16px + 3pt);
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas[data-roster] .roster-meta-line--round {
  font-size: calc(15px + 3pt);
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.35;
  color: var(--container-text, var(--contrast-team));
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-wrap: balance;
}

.night-session-canvas[data-roster] .roster-meta.roster-meta-line--demographics {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px 0;
}

.night-session-canvas[data-roster] .roster-meta-part {
  font-size: calc(15px + 3pt);
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.3;
  text-transform: none;
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

.night-session-canvas[data-roster] .meta-chip[data-empty="true"] {
  display: none;
}

.night-session-canvas[data-roster]
  .roster-meta-part.meta-chip:not([data-empty="true"])
  ~ .roster-meta-part.meta-chip:not([data-empty="true"])::before {
  content: "\xB7";
  margin-inline: 10px;
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
  opacity: 0.55;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
}

.night-session-canvas[data-roster] .roster-teams-stack--hero {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 0 0 auto;
  gap: var(--space-3);
  padding-bottom: 2px;
}

.night-session-canvas[data-roster] .roster-team-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}

.night-session-canvas[data-roster] .roster-team-mark--hero {
  position: relative;
  width: 100%;
  justify-content: center;
  padding: 0;
  overflow: hidden;
}

.night-session-canvas[data-roster]
  .roster-team-block--home
  .roster-team-mark--hero {
  min-height: var(--roster-hero-mark-home);
}

.night-session-canvas[data-roster]
  .roster-team-block--away
  .roster-team-mark--hero {
  min-height: var(--roster-hero-mark-away);
}

.night-session-canvas[data-roster] .roster-team-mark--hero img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.night-session-canvas[data-roster] .roster-team-mark--hero .mark-fallback {
  width: 48%;
  height: 48%;
  border-width: 3px;
  opacity: 0.1;
}

.night-session-canvas[data-roster] .roster-team-name--hero {
  width: 100%;
  min-height: 0;
  padding: 12px 14px;
  justify-content: center;
  text-align: center;
  font-family: var(--font-body);
  font-size: var(--type-roster-team-hero);
  font-weight: 400;
  line-height: 1.05;
  color: var(--container-text, var(--contrast-team));
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.night-session-canvas[data-roster]
  .roster-team-name--hero[data-club-team="true"] {
  border-color: color-mix(
    in srgb,
    var(--container-text-accent, var(--club-primary)) 42%,
    var(--ns-performance-border, rgb(255 255 255 / 10%))
  );
  background: color-mix(
    in srgb,
    var(--container-text-accent, var(--club-primary)) 14%,
    var(--ns-performance-row-bg, var(--container-surface))
  );
  color: var(--container-text, var(--contrast-team));
}

.night-session-canvas[data-roster]
  .roster-team-block--home[data-club-team="true"]
  .roster-team-mark--hero,
.night-session-canvas[data-roster]
  .roster-team-block--away[data-club-team="true"]
  .roster-team-mark--hero {
  border-color: color-mix(
    in srgb,
    var(--container-text-accent, var(--club-primary)) 38%,
    var(--ns-performance-border, rgb(255 255 255 / 10%))
  );
  background: color-mix(
    in srgb,
    var(--container-text-accent, var(--club-primary)) 10%,
    var(--ns-performance-row-bg, var(--container-surface))
  );
}

.night-session-canvas[data-roster] .roster-schedule-stack {
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-top: auto;
  gap: var(--space-2);
}

.night-session-canvas[data-roster] .roster-schedule-line {
  justify-content: center;
  padding: 14px 16px;
  text-align: center;
  font-size: var(--type-roster-venue);
  font-weight: 500;
  line-height: 1.25;
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
}

.night-session-canvas[data-roster] .roster-schedule-line:first-child {
  font-family: var(--font-body);
  font-size: var(--type-roster-date);
  font-weight: 400;
  line-height: 1.08;
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas[data-roster]
  .roster-schedule-line[data-hydrate="fixture-ground"] {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* Lineup rail \u2014 squad team only (no \u201CLine-up\u201D label) */
.night-session-canvas[data-roster] .roster-lineup__rail {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.night-session-canvas[data-roster] .roster-squad-label {
  display: none;
}

.night-session-canvas[data-roster] .roster-squad-team {
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  font-family: var(--font-body);
  font-size: var(--type-roster-squad);
  font-weight: 400;
  line-height: 1.1;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--container-text, var(--contrast-team));
}

/* Player rows */
.night-session-canvas[data-roster] .roster-rows {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  overflow-y: auto;
  overflow-x: hidden;
}

.night-session-canvas[data-roster] .roster-rows[data-density="compact"] {
  --roster-row-min-height: 46px;
  --type-roster-player: 30px;
  --type-roster-index: 32px;
}

.night-session-canvas[data-roster] .roster-rows[data-density="tight"] {
  --roster-row-min-height: 42px;
  --type-roster-player: 27px;
  --type-roster-index: 28px;
}

.night-session-canvas[data-roster] .roster-entry {
  flex: 0 0 auto;
  min-height: var(--roster-row-min-height);
}

.night-session-canvas[data-roster] .roster-entry[data-empty="true"] {
  display: none;
}

.night-session-canvas[data-roster] .roster-row {
  min-height: var(--roster-row-min-height);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  column-gap: 0;
  align-items: stretch;
  padding: 0;
  background: transparent !important;
  box-shadow: none !important;
}

.night-session-canvas[data-roster] .roster-row[data-empty-roster="true"] {
  grid-template-columns: minmax(0, 1fr);
  justify-items: center;
  padding: 12px;
  color: var(--container-text-muted, var(--contrast-meta-on-surface));
  font-size: 16px;
  font-weight: 500;
  font-style: italic;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: var(--ns-performance-row-bg, var(--container-surface)) !important;
}

.night-session-canvas[data-roster] .roster-cell {
  min-width: 0;
  display: flex;
  align-items: center;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: var(--ns-performance-row-bg, var(--container-surface));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

.night-session-canvas[data-roster] .roster-rows .roster-cell {
  min-height: var(--roster-row-min-height);
}

.night-session-canvas[data-roster] .roster-index.roster-cell {
  display: none;
}

.night-session-canvas[data-roster] .roster-player.roster-cell {
  gap: 8px;
  padding: 16px 28px;
  min-width: 0;
}

.night-session-canvas[data-roster] .roster-player__name {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  font-family: var(--font-body);
  font-size: var(--type-roster-player);
  font-weight: 400;
  line-height: 1.12;
  color: var(--container-text, var(--contrast-performance-lead));
  text-transform: none;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.night-session-canvas[data-roster] .roster-badges {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 6px;
}

.night-session-canvas[data-roster] .roster-badge {
  padding: var(--space-2);
  border-radius: var(--ns-container-radius);
  overflow: hidden;
  color: rgb(8 10 12 / 92%);
  font-family: var(--font-body);
  font-size: calc(11px + 2pt);
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1;
  text-transform: uppercase;
  background: var(--club-secondary);
}

.night-session-canvas[data-roster] .roster-badge--captain {
  color: rgb(244 243 241 / 96%);
  background: var(--club-primary);
}

.night-session-canvas[data-roster] .roster-crease,
.night-session-canvas[data-roster] .footer-crease {
  display: none;
}

/* \u2014\u2014 Footer \u2014\u2014 */
.night-session-canvas[data-roster] .asset-footer {
  flex: 0 0 var(--zone-footer);
  min-height: var(--zone-footer);
  max-height: var(--zone-footer);
  padding: 0 var(--zone-content-pad) var(--zone-pad);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--space-3);
}

.night-session-canvas[data-roster] .footer-rule {
  width: 100%;
  height: 1px;
  background: rgb(255 255 255 / 10%);
}


/* src/templates/variants/nightSession/styles/night-session-team-of-the-week.css */
/* Night Session \u2014 Team of the Week */

.night-session-canvas[data-totw] {
  --frame-height: 1350px;
  --zone-pad: 12px;
  --zone-header: 148px;
  --zone-content: 1080px;
  --zone-footer: 112px;
  --zone-content-pad: 24px;
  --content-inset: 24px;
  --space-2: 8px;
  --space-3: 12px;
  --space-8: 32px;
  --space-12: 48px;
  --totw-logo-size: 92px;
  --totw-row-min-height: 116px;
  --totw-role-rail-height: 40px;
  --type-totw-category: 24px;
  --type-totw-role: 19px;
  --type-totw-name: calc(34px + 3pt);
  --type-totw-name-hero: calc(42px + 3pt);
  --type-totw-team: calc(19px + 3pt);
  --type-totw-figure: calc(38px + 8pt);
  --type-totw-figure-hero: calc(46px + 8pt);
  --type-totw-subline: calc(17px + 5pt);
  --ns-container-radius: 50px;
  --header-text: rgb(244 243 241 / 96%);
  --font-display: "Teko", "Arial Narrow", sans-serif;
  --font-body: "Source Sans 3", Arial, sans-serif;

  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  color: var(--paper, #f4f3f1);
  font-family: var(--font-body);
}

.night-session-canvas[data-totw],
.night-session-canvas[data-totw] * {
  box-sizing: border-box;
}

.night-session-canvas[data-totw] h1,
.night-session-canvas[data-totw] h2,
.night-session-canvas[data-totw] p {
  margin: 0;
}

.night-session-canvas[data-totw] .fixture-palette {
  display: none;
}

.night-session-canvas[data-totw] .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* \u2014\u2014 Header \u2014\u2014 */
.night-session-canvas[data-totw] .ns-header {
  flex: 0 0 var(--zone-header);
  min-height: var(--zone-header);
  max-height: var(--zone-header);
  padding: var(--zone-pad) var(--content-inset) 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  position: relative;
}

.night-session-canvas[data-totw] .ns-header__mark {
  position: absolute;
  top: calc(var(--zone-pad) + 4px);
  right: var(--content-inset);
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  z-index: 2;
}

.night-session-canvas[data-totw] .ns-header__mark img {
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: contain;
}

.night-session-canvas[data-totw] .ns-header__lockup {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 0;
  padding: 8px 88px 10px;
  text-align: center;
}

.night-session-canvas[data-totw] .header-eyebrow {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1;
  text-transform: none;
  color: rgb(244 243 241 / 52%);
}

.night-session-canvas[data-totw] .header-title {
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 0.92;
  text-transform: none;
  color: var(--header-text, #fff);
}

.night-session-canvas[data-totw] .ns-header__accent {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.night-session-canvas[data-totw] .ns-accent-wedge {
  position: absolute;
  top: 18px;
  left: calc(50% - 120px);
  width: 240px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--club-primary) 45%,
    transparent
  );
  opacity: 0.75;
}

.night-session-canvas[data-totw] .ns-accent-lines {
  position: absolute;
  top: 22px;
  right: calc(var(--content-inset) + 84px);
  width: 36px;
  height: 18px;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 3px,
    rgb(255 255 255 / 14%) 3px,
    rgb(255 255 255 / 14%) 4px
  );
  opacity: 0.55;
}

/* \u2014\u2014 Ledger \u2014\u2014 */
.night-session-canvas[data-totw] .totw-ledger {
  flex: 1 1 var(--zone-content);
  min-height: 0;
  max-height: var(--zone-content);
  padding: 0 var(--zone-content-pad);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.night-session-canvas[data-totw] .totw-selection.totw-unit {
  width: 100%;
  max-width: none;
  margin-inline: 0;
  flex: 0 1 auto;
  min-height: 0;
  max-height: 100%;
}

.night-session-canvas[data-totw] .totw-stack {
  flex: 0 1 auto;
  min-height: 0;
  max-height: 100%;
}

.night-session-canvas[data-totw] .totw-rows .totw-entry:first-of-type .totw-row,
.night-session-canvas[data-totw] .totw-row {
  max-height: none;
}

.night-session-canvas[data-totw] .totw-stack {
  width: 100%;
  flex: 0 1 auto;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  overflow: hidden;
}

.night-session-canvas[data-totw] .totw-unit {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

/* Pill radius on inner blocks only (parent selection shell stays square) */
.night-session-canvas[data-totw] .totw-selection.totw-unit,
.night-session-canvas[data-totw] .totw-unit__frame {
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.night-session-canvas[data-totw] .totw-category.totw-unit__rail,
.night-session-canvas[data-totw] .totw-row {
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas[data-totw] .totw-unit__rail {
  position: relative;
  flex: 0 0 auto;
  min-width: 0;
  padding: 9px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(
          --ns-grade-rail-gradient-mid,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 10%,
            transparent
          )
        )
        58%,
      var(
          --ns-grade-rail-gradient-end,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 32%,
            transparent
          )
        )
        100%
    ),
    var(--ns-performance-row-bg, var(--container-surface));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

/* Beat Scoreline category band surface bleed on the same node */
.night-session-canvas[data-totw] .totw-category.totw-unit__rail {
  justify-content: center;
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(
          --ns-grade-rail-gradient-mid,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 10%,
            transparent
          )
        )
        58%,
      var(
          --ns-grade-rail-gradient-end,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 32%,
            transparent
          )
        )
        100%
    ),
    var(--ns-performance-row-bg, var(--container-surface));
}

.night-session-canvas[data-totw] .totw-unit__rail::after {
  content: "";
  position: absolute;
  top: 8px;
  right: 12px;
  width: 28px;
  height: 12px;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 2px,
    rgb(255 255 255 / 12%) 2px,
    rgb(255 255 255 / 12%) 3px
  );
  opacity: 0.55;
  pointer-events: none;
}

.night-session-canvas[data-totw] .totw-category[data-empty="true"] {
  display: none;
}

.night-session-canvas[data-totw] .totw-category-label {
  font-family: var(--font-body);
  font-size: var(--type-totw-category);
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.3;
  text-transform: none;
  color: var(
    --container-text-muted,
    var(--contrast-meta, rgb(244 243 241 / 58%))
  );
}

.night-session-canvas[data-totw] .totw-category-value {
  min-width: 0;
  flex: 0 1 auto;
  width: 100%;
  margin: 0;
  overflow: hidden;
  padding-right: 0;
  font-family: var(--font-body);
  font-size: var(--type-totw-category);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.3;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas[data-totw] .totw-unit__frame {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-2);
  overflow: hidden;
}

.night-session-canvas[data-totw] .totw-columns {
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: stretch;
  gap: var(--space-2);
  overflow: hidden;
}

.night-session-canvas[data-totw] .totw-col {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  overflow-y: auto;
  overflow-x: hidden;
}

.night-session-canvas[data-totw] .totw-columns[data-density="compact"],
.night-session-canvas[data-totw] .totw-col[data-density="compact"] {
  --totw-row-min-height: 108px;
  --type-totw-name: calc(30px + 3pt);
  --type-totw-team: calc(17px + 3pt);
  --type-totw-figure: calc(34px + 8pt);
  --type-totw-figure-hero: calc(40px + 8pt);
  --totw-logo-size: 84px;
}

.night-session-canvas[data-totw] .totw-columns[data-density="tight"],
.night-session-canvas[data-totw] .totw-col[data-density="tight"] {
  --totw-row-min-height: 100px;
  --type-totw-name: calc(28px + 3pt);
  --type-totw-team: calc(16px + 3pt);
  --type-totw-figure: calc(30px + 8pt);
  --type-totw-figure-hero: calc(36px + 8pt);
  --totw-logo-size: 76px;
}

.night-session-canvas[data-totw] .totw-entry {
  flex: 0 0 auto;
  min-height: calc(var(--totw-role-rail-height) + var(--totw-row-min-height));
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.night-session-canvas[data-totw] .totw-entry > .animated-container {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
}

.night-session-canvas[data-totw] .totw-entry[data-empty="true"] {
  display: none;
}

.night-session-canvas[data-totw] .totw-row {
  flex: 1 1 auto;
  min-height: calc(var(--totw-role-rail-height) + var(--totw-row-min-height));
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  padding: 0;
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  background: var(--ns-performance-row-bg, var(--container-surface)) !important;
  box-shadow: var(
    --container-inset,
    inset 0 1px 0 rgb(255 255 255 / 4%)
  ) !important;
}

.night-session-canvas[data-totw] .totw-row__main {
  flex: 1 1 auto;
  min-height: var(--totw-row-min-height);
  height: var(--totw-row-min-height);
  max-height: var(--totw-row-min-height);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: var(--space-2);
  align-items: stretch;
  min-width: 0;
}

.night-session-canvas[data-totw] .totw-row__main > * {
  align-self: stretch;
  min-height: 0;
  height: 100%;
}

/* AnimatedContainer uses size=auto (inline height:auto) \u2014 stretch for bottom-aligned copy */
.night-session-canvas[data-totw]
  .totw-row__main
  > .animated-container:is(.totw-copy, .totw-stats) {
  height: 100% !important;
  min-height: 0;
  align-self: stretch;
}

.night-session-canvas[data-totw]
  .totw-row__main
  > .animated-container.totw-copy {
  width: 100% !important;
  min-width: 0;
  max-width: 100%;
}

.night-session-canvas[data-totw] .totw-copy .totw-name,
.night-session-canvas[data-totw] .totw-copy .totw-team {
  margin: 0;
}

/* Beat Scoreline / broadcast row neutralisation on player pill */
.night-session-canvas[data-totw] .totw-col .totw-entry .totw-row,
.night-session-canvas[data-totw] .totw-rows .totw-entry .totw-row {
  border: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  border-radius: var(--ns-container-radius);
  background: var(--ns-performance-row-bg, var(--container-surface)) !important;
  box-shadow: var(
    --container-inset,
    inset 0 1px 0 rgb(255 255 255 / 4%)
  ) !important;
}

.night-session-canvas[data-totw] .totw-row .totw-cell {
  min-width: 0;
  min-height: 100%;
  height: 100%;
  display: flex;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.night-session-canvas[data-totw] .totw-mark {
  position: relative;
  width: var(--totw-logo-size);
  min-width: var(--totw-logo-size);
  max-width: var(--totw-logo-size);
  height: 100%;
  min-height: 100%;
  max-height: none;
  flex: 0 0 var(--totw-logo-size);
  align-self: stretch;
  overflow: hidden;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.night-session-canvas[data-totw] .totw-mark img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.night-session-canvas[data-totw] .totw-mark .mark-fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
  opacity: 0.1;
}

.night-session-canvas[data-totw]
  .totw-mark[data-has-crest="true"]
  .mark-fallback,
.night-session-canvas[data-totw]
  .totw-mark__surface[data-has-crest="true"]
  .mark-fallback,
.night-session-canvas[data-totw]
  .totw-mark:has(img:not([hidden]))
  .mark-fallback {
  display: none;
}

.night-session-canvas[data-totw] .totw-mark[data-has-crest="false"] img,
.night-session-canvas[data-totw]
  .totw-mark__surface[data-has-crest="false"]
  img {
  display: none;
}

.night-session-canvas[data-totw] .totw-mark .totw-mark__surface {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: var(--ns-container-radius);
  overflow: hidden;
}

.night-session-canvas[data-totw] .totw-role-rail.totw-cell {
  width: 100%;
  min-height: var(--totw-role-rail-height);
  max-height: var(--totw-role-rail-height);
  height: var(--totw-role-rail-height);
  flex: 0 0 var(--totw-role-rail-height);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  overflow: hidden;
  border: 0;
  border-top: 1px solid var(--ns-performance-border, rgb(255 255 255 / 10%));
  border-radius: 0;
  box-shadow: none;
  background: linear-gradient(
      90deg,
      transparent 0%,
      var(
          --ns-grade-rail-gradient-mid,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 10%,
            transparent
          )
        )
        58%,
      var(
          --ns-grade-rail-gradient-end,
          color-mix(
            in srgb,
            var(--container-text-accent, var(--club-primary)) 32%,
            transparent
          )
        )
        100%
    ),
    var(--ns-performance-row-bg, var(--container-surface));
  box-shadow: var(--container-inset, inset 0 1px 0 rgb(255 255 255 / 4%));
}

.night-session-canvas[data-totw] .totw-copy.totw-cell {
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  gap: var(--space-2);
  padding-block: var(--space-3);
  padding-inline: var(--space-8);
}

.night-session-canvas[data-totw] .totw-role {
  display: block;
  width: 100%;
  overflow: hidden;
  font-size: var(--type-totw-role);
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.2;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: none;
  color: var(
    --ns-performance-player,
    var(--container-text-support, var(--contrast-performance-support))
  );
}

.night-session-canvas[data-totw] .totw-name {
  width: 100%;
  overflow: hidden;
  font-family: var(--font-body);
  font-size: var(--type-totw-name);
  font-weight: 700;
  line-height: 1.12;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--container-text, var(--contrast-performance-lead));
}

.night-session-canvas[data-totw] .totw-team-block {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 6px;
  min-width: 0;
  width: 100%;
}

.night-session-canvas[data-totw] .totw-team-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.2;
  text-transform: none;
  color: var(
    --container-text-muted,
    var(--contrast-meta, rgb(244 243 241 / 48%))
  );
}

.night-session-canvas[data-totw] .totw-team {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  font-size: var(--type-totw-team);
  font-weight: 500;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(
    --ns-performance-player,
    var(--container-text-support, var(--contrast-performance-support))
  );
}

.night-session-canvas[data-totw] .totw-stats.totw-cell {
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: var(--space-2);
  padding-block: var(--space-3);
  padding-inline: var(--space-8);
  min-width: 116px;
}

.night-session-canvas[data-totw] .totw-figure {
  font-family: var(--font-body);
  font-size: var(--type-totw-figure);
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums lining-nums;
  color: var(--container-text, var(--contrast-performance-lead));
  text-align: right;
}

.night-session-canvas[data-totw] .totw-balls {
  font-size: 0.72em;
  font-weight: 600;
  color: var(
    --ns-performance-player,
    var(--container-text-support, var(--contrast-performance-support))
  );
  opacity: 0.85;
}

.night-session-canvas[data-totw] .totw-subline {
  font-size: var(--type-totw-subline);
  font-weight: 500;
  line-height: 1.2;
  text-align: right;
  color: var(
    --container-text-muted,
    var(--contrast-meta, rgb(244 243 241 / 58%))
  );
}

.night-session-canvas[data-totw] .totw-subline[data-empty="true"] {
  display: none;
}

.night-session-canvas[data-totw] .footer-crease {
  display: none;
}

/* \u2014\u2014 Footer \u2014\u2014 */
.night-session-canvas[data-totw] .asset-footer {
  flex: 0 0 var(--zone-footer);
  min-height: var(--zone-footer);
  max-height: var(--zone-footer);
  padding: 0 var(--zone-content-pad) var(--zone-pad);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--space-3);
}

.night-session-canvas[data-totw] .footer-rule {
  width: 100%;
  height: 1px;
  background: rgb(255 255 255 / 10%);
}
`;

// src/package/NightSessionBundledStyles.tsx
var _jsxruntime = require("react/jsx-runtime");
var STYLE_ELEMENT_ID = "fixtura-night-session-styles";
var NightSessionBundledStyles = () =>
  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "style", {
    id: STYLE_ELEMENT_ID,
    dangerouslySetInnerHTML: { __html: NIGHT_SESSION_BUNDLED_CSS },
  });

exports.NightSessionBundledStyles = NightSessionBundledStyles;
//# sourceMappingURL=chunk-KBS4BULM.js.map
