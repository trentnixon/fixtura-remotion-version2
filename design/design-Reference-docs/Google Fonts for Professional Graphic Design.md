# Google Fonts for Professional Graphic Design

_A practical and LLM-operational guide to discovering, evaluating, pairing, loading and applying typefaces across interfaces, campaigns and data-driven sports graphics_

Typography is not a decorative decision made after layout. Font width changes whether a team name fits. Numeral design changes how quickly a score can be read. Weight, spacing and shape determine whether a graphic feels editorial, technical, premium, institutional or energetic.

This guide serves two audiences:

- Designers and developers selecting and implementing Google Fonts.
- Language models recommending type systems for generated templates.

The same standard applies to both: a font recommendation must be based on the information, composition and production constraints—not on popularity or a vague description such as “modern.”

> **Core principle.** Select type by role and constraint first, then by personality. The right font is one that makes the content work and strengthens the template's intended identity.

---

## What a professional font system must achieve

| Goal                    | Typographic response                                                             |
| ----------------------- | -------------------------------------------------------------------------------- |
| Immediate hierarchy     | Clear differences in size, width, weight, spacing and position                   |
| Dense information       | Efficient character width, strong small-size clarity and controlled wrapping     |
| Recognisable identity   | A repeatable display voice rather than a different fashionable font per template |
| Reliable data rendering | Tested numerals, punctuation, long names, abbreviations and missing-data states  |
| Brand flexibility       | Enough neutrality to work across changing organisation colours and crests        |
| Production reliability  | Deterministic loading, known weights, stable metrics and renderer compatibility  |
| Accessibility           | Legible essential information with sufficient size, spacing and contrast         |

A typeface can be beautifully drawn and still be wrong for a particular role. A wide geometric sans may be excellent for a campaign headline but fail when five long team names must align beside scores. A condensed display face may give a result graphic energy but become tiring in player-performance copy.

## Begin with typographic roles

Do not begin by searching for two fonts. Begin by listing what the template needs typography to do.

### Typical Fixtura roles

| Role                | Primary requirement                          | Secondary requirement                         |
| ------------------- | -------------------------------------------- | --------------------------------------------- |
| Scores              | Immediate recognition and excellent numerals | Compact width and stable alignment            |
| Team names          | Strong uppercase identity                    | Tolerance for long and short names            |
| Result or outcome   | Decisive emphasis                            | Clear distinction from the score              |
| Player performances | Dense legibility                             | Strong numbers, punctuation and abbreviations |
| Match metadata      | Quiet clarity                                | Compact width and readable small sizes        |
| Headline            | Template personality                         | Controlled line breaks                        |
| Sponsor information | Neutral clarity                              | Must not compete with the sporting result     |
| Editorial copy      | Comfortable reading                          | Broad character set and useful italics        |

One family may cover several roles. Two families are often enough for an entire template system. A third family should be introduced only when it performs a specialist role that the others cannot.

> **Default rule.** Start by trying to solve the hierarchy with one family or one superfamily. Add a second family only when the composition needs meaningful contrast or a different functional capability.

## Understand what makes a font suitable

### Width and economy

Condensed fonts fit more information into a fixed line and create vertical energy. They are useful for team names, scores and narrow panels. Wide fonts create presence and openness but consume space quickly.

Do not equate condensed with automatically sporty. The shapes, rhythm and treatment determine the tone. Condensed type can feel editorial, industrial, bureaucratic or theatrical.

Test width against real strings rather than judging the alphabet specimen alone.

```text
WARRINGAH VALLEY CRICKET CLUB
ST GEORGE DISTRICT CRICKET ASSOCIATION
UNIVERSITY OF NEW SOUTH WALES
189/7 (40.0 OVERS)
MATCH ABANDONED
```

### X-height and small-size clarity

X-height describes the apparent height of lowercase letters. A generous x-height often improves readability at small sizes, but very large x-heights can reduce word shape and make a font feel blunt.

For metadata and performance copy, inspect:

- Open counters in letters such as `a`, `e`, `g` and `s`.
- Clear distinction between `I`, `l`, `1`, `O` and `0`.
- Sufficient spacing at the intended output size.
- Punctuation that remains visible after compression.
- Lowercase quality even if the headline system is uppercase.

### Weight and colour

Weight is not the same as perceived strength. Two fonts at `700` can produce very different visual colour because of stroke thickness, width, counters and spacing.

Use heavy weights for short, dominant information. Use medium or semibold weights for small reversed text, where regular weight may appear too fragile. Avoid making every role bold; hierarchy disappears when everything carries equal typographic force.

### Proportion and rhythm

Letter shapes create an internal rhythm before CSS tracking is applied. Some display fonts are naturally tight and forceful; others are open and architectural. Excessive `letter-spacing` cannot turn one into the other without damaging the drawing.

Judge a font in words and lines, not isolated characters.

### Numeral quality

Sports templates depend heavily on numbers. Inspect the complete numeral set before approving a font:

```text
0123456789
8/142   189/7   3–2   99.4   12:30 PM
4/27 (8.0)   102*   5–0   +18.6%
```

Check:

- Whether `1`, `7` and `9` remain distinct at speed.
- Whether slash, colon, decimal point, en dash, parentheses and asterisk work visually.
- Whether numerals are unusually wide or narrow relative to the team-name type.
- Whether tabular numerals are available or supported through OpenType features.
- Whether a zero needs to remain distinct from uppercase `O`.

```css
.score,
.stat {
  font-variant-numeric: tabular-nums lining-nums;
  font-feature-settings:
    "tnum" 1,
    "lnum" 1;
}
```

`font-variant-numeric` requests supported OpenType features; it cannot create tabular figures when the font does not contain them. Validate the rendered result.

### Case, punctuation and language coverage

An uppercase display sample hides weaknesses that may appear in real content. Test lowercase, apostrophes, ampersands, accented names, ordinal indicators and punctuation.

Confirm that the selected subset covers every language the product must render. Do not assume a Latin-only family supports Greek, Cyrillic, Vietnamese or extended diacritics.

### Italics and secondary styles

Some families have true italics; others provide only a slanted or synthesised appearance. If the template uses quotes, editorial emphasis or award citations, inspect the italic as a separate design component.

Never select a family for an italic-dependent system without evaluating its italic.

## Choose the personality after the constraints

Personality should support the template concept without overpowering the organisation being represented.

| Intended character  | Look for                                                  | Avoid                                  |
| ------------------- | --------------------------------------------------------- | -------------------------------------- |
| Broadcast authority | Compact proportions, firm weight, clean numerals          | Novelty sports lettering               |
| Editorial prestige  | Controlled contrast, confident rhythm, useful text styles | Fragile hairlines over imagery         |
| Technical analysis  | Rational construction, clear figures, disciplined spacing | Decorative sci-fi clichés              |
| Community energy    | Approachable shapes with strong display weight            | Corporate neutrality with no warmth    |
| Premium restraint   | Refined proportions and limited weight contrast           | Excessive luxury serifs at small sizes |
| Youthful momentum   | Open shapes, assertive weight and active rhythm           | Forced italics and extreme distortion  |
| Heritage            | Humanist or slab qualities with authentic detail          | Artificial vintage distressing         |

Use personality words that describe visible properties. “Modern,” “clean” and “bold” are too broad on their own. Prefer descriptions such as:

- Narrow, upright and forceful.
- Wide, geometric and optimistic.
- Humanist, open and editorial.
- Mechanical, compact and analytical.
- Softly rounded but structurally disciplined.

## Font pairing strategies

Pairing is the controlled relationship between typographic roles. It is not the act of choosing two independently attractive fonts.

### Strategy 1: One family, multiple roles

Use size, weight, width, case and spacing within one capable family.

**Best for:** Cohesive product interfaces, dense graphics and systems that must remain neutral across many organisations.

```css
.headline {
  font-weight: 800;
  font-stretch: condensed;
}
.team {
  font-weight: 700;
  text-transform: uppercase;
}
.meta {
  font-weight: 500;
  letter-spacing: 0.06em;
}
```

This is the safest starting point because every role shares proportions and drawing logic.

### Strategy 2: Family or superfamily pairing

Pair related families designed to coexist, such as display and text cuts within the same broader system.

**Best for:** Strong coherence with more role-specific control.

The shared construction creates consistency while width or optical purpose provides contrast.

### Strategy 3: Condensed display plus neutral text

Use a compact, expressive face for scores, outcomes and team identity, then a highly readable neutral sans for metadata and performances.

**Best for:** Results, fixtures, ladders and Top 5 graphics.

The contrast should be visible but not theatrical. Match stroke colour, x-height or terminal character so the pair still feels intentional.

### Strategy 4: Serif display plus sans support

Use a serif for editorial authority, heritage or ceremony and a sans for functional information.

**Best for:** Awards, season reviews, milestone graphics and longer PressBox stories.

Avoid using a delicate serif directly over noisy photography or at small metadata sizes.

### Strategy 5: Character display plus restrained utility

Let one distinctive family carry a small number of high-impact words while a quiet family does the work everywhere else.

**Best for:** Campaign graphics and template titles.

The display face must not leak into scores, dense results or long descriptions unless it has been tested for those roles.

### What should relate and what should contrast

A strong pair normally shares some characteristics and contrasts in others.

| May relate           | May contrast                  |
| -------------------- | ----------------------------- |
| X-height             | Width                         |
| Stroke colour        | Serif versus sans             |
| General construction | Formal versus informal rhythm |
| Terminal style       | Display intensity             |
| Numeral quality      | Weight or scale               |

If the fonts differ in every characteristic, the pairing feels disconnected. If they differ in none, the second family may be unnecessary.

## A practical Google Fonts candidate library

Do not allow an LLM to select freely from the entire catalogue during every template generation. Maintain a reviewed allowlist with known files, supported weights, tested roles and approved licensing records.

The names below are useful starting candidates, not automatic recommendations. Confirm current catalogue availability, variants and project files before implementation.

### Condensed and display candidates

| Family           | Likely strengths                                           | Test carefully                                 |
| ---------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| Barlow Condensed | Flexible sports identity, good weight range, compact names | Small metadata and extreme compression         |
| Roboto Condensed | Reliable dense information and broad utility               | May feel generic without a strong composition  |
| Oswald           | Upright authority and efficient uppercase                  | Body copy and repeated small text              |
| Bebas Neue       | Tall campaign headlines and short labels                   | Limited role range and long mixed-case content |
| Archivo Narrow   | Controlled density with less theatrical character          | Whether it provides enough display distinction |
| Teko             | Very compact, emphatic scoreboard character                | Small sizes, punctuation and tonal fit         |
| Anton            | Heavy, direct headlines                                    | Long strings and multi-weight hierarchy        |

### Neutral support candidates

| Family        | Likely strengths                                    | Test carefully                                         |
| ------------- | --------------------------------------------------- | ------------------------------------------------------ |
| Inter         | Interface clarity, broad weights and strong utility | Can feel anonymous as the only identity layer          |
| Source Sans 3 | Open text rhythm and broad role coverage            | Pairing with overly humanist display faces             |
| IBM Plex Sans | Technical but human character                       | Strong personality may compete with some display faces |
| Manrope       | Geometric clarity with contemporary tone            | Wide uppercase names in narrow layouts                 |
| Noto Sans     | Coverage and dependable functional text             | Requires stronger surrounding identity                 |
| Archivo       | Robust display-to-text versatility                  | Check width in dense metadata                          |

### Editorial and specialist candidates

| Family         | Likely strengths                                     | Test carefully                                    |
| -------------- | ---------------------------------------------------- | ------------------------------------------------- |
| Roboto Slab    | Accessible editorial or heritage tone                | Dense tables and compact score roles              |
| Source Serif 4 | Long-form editorial quality and useful optical range | Small reversed text over colour fields            |
| Merriweather   | Readable editorial copy with familiar authority      | Whether it feels too traditional for the template |
| Space Grotesk  | Contemporary display and technical campaigns         | Small numerals and narrow panels                  |
| Chakra Petch   | Distinct technical or competitive personality        | Sci-fi associations and overuse                   |

### Pairing hypotheses worth testing

| Display role                    | Support role  | Possible use                                    |
| ------------------------------- | ------------- | ----------------------------------------------- |
| Barlow Condensed                | Source Sans 3 | Core results and fixture system                 |
| Oswald                          | Inter         | Direct broadcast-style graphics                 |
| Archivo Black or Archivo Narrow | Archivo       | Cohesive single-system hierarchy                |
| Bebas Neue                      | Manrope       | Short campaign statements with neutral support  |
| Roboto Slab                     | Source Sans 3 | Awards, milestones and editorial summaries      |
| Space Grotesk                   | Inter         | Contemporary product or analytical graphics     |
| Chakra Petch                    | IBM Plex Sans | Selective technical or data-led template family |

These are hypotheses because pairing quality depends on the actual layout, text and organisation identity. No pair should be approved from font names alone.

## Build a curated Fixtura font system

A controlled library produces more consistent results than unrestricted font choice.

### Suggested collection structure

| Collection   | Purpose                                                         |
| ------------ | --------------------------------------------------------------- |
| Core display | Scores, team names and outcomes across primary sports templates |
| Core utility | Metadata, performance copy, dates and venues                    |
| Editorial    | Season reviews, milestones, awards and PressBox features        |
| Campaign     | Short promotional headlines and product announcements           |
| Specialist   | Deliberately limited technical, heritage or youth treatments    |

Each approved family should have a manifest:

```json
{
  "family": "Barlow Condensed",
  "source": "google-fonts",
  "licenseFile": "OFL.txt",
  "availableWeights": [400, 500, 600, 700, 800, 900],
  "approvedRoles": ["score", "team-name", "result", "headline"],
  "discouragedRoles": ["long-body-copy"],
  "supportsTabularNumerals": true,
  "subsets": ["latin", "latin-ext"],
  "fallback": "Arial Narrow, sans-serif",
  "testedRenderers": ["remotion-chromium", "web-chromium"],
  "notes": "Core Fixtura display family; validate very long uppercase names."
}
```

Store verified facts in the manifest. Do not allow an LLM to infer supported features from a font's visual category.

## LLM font-selection protocol

An LLM should follow the process below whenever it selects typography for a template.

### Step 1: Read the template brief

Extract explicit facts before recommending anything:

```json
{
  "templateType": "results",
  "sport": "cricket",
  "format": "portrait-social",
  "canvas": { "width": 1080, "height": 1350 },
  "primaryRoles": ["score", "team-name", "result"],
  "secondaryRoles": ["performance", "match-meta", "sponsor"],
  "contentDensity": "high",
  "longestTeamName": "ST GEORGE DISTRICT CRICKET ASSOCIATION",
  "scoreSamples": ["189/7", "4/142", "MATCH ABANDONED"],
  "casePreference": "uppercase-display",
  "visualCharacter": ["authoritative", "energetic", "editorial"],
  "geometry": ["forward-angle", "large-team-surfaces"],
  "renderTarget": "remotion",
  "availableFonts": ["approved-manifest-reference"]
}
```

If important information is unavailable, the LLM should state assumptions. It should not invent team-name limits, required scripts, font features or installed files.

### Step 2: Rank functional constraints

Identify what can make the typography fail. A typical priority order is:

1. Essential content must fit and remain legible.
2. Scores and outcomes must be recognised immediately.
3. Long and missing-data states must preserve the layout.
4. The font must exist in the approved or available collection.
5. Required characters, weights and styles must be available.
6. Rendering must be deterministic in the target environment.
7. The type must support the intended visual personality.

Personality is important, but it cannot rescue a functionally unsuitable font.

### Step 3: Select a pairing strategy

The LLM must explicitly choose one:

- One family, multiple roles.
- Family or superfamily pairing.
- Condensed display plus neutral text.
- Serif display plus sans support.
- Character display plus restrained utility.

It should explain why a second family is necessary. If it cannot, use one family.

### Step 4: Generate a small candidate set

Produce two or three candidates from the approved collection. For each candidate, name:

- Intended role.
- Relevant widths and weights.
- Functional advantage.
- Identity contribution.
- Known risk.

Do not generate a long unranked list. More options do not equal better judgment.

### Step 5: Reject candidates against real content

Test candidates using the supplied strings and required styles. Reject a candidate when:

- The longest essential string cannot fit at an acceptable size.
- Scores or punctuation are ambiguous.
- Necessary weights, italics, scripts or figures are unavailable.
- The display voice conflicts with the template geometry or organisation tone.
- The pair has insufficient contrast or feels disconnected.
- The support font competes with the display face.
- The font is unavailable to the target renderer.

An LLM should be allowed to conclude that none of the candidates is suitable.

### Step 6: Score the remaining systems

Use a weighted rubric rather than intuition alone.

| Criterion                      |  Weight |
| ------------------------------ | ------: |
| Essential-content fit          |      20 |
| Score and numeral clarity      |      15 |
| Small-text legibility          |      15 |
| Hierarchy across roles         |      15 |
| Match to template character    |      15 |
| Pairing coherence              |      10 |
| Renderer and asset reliability |      10 |
| **Total**                      | **100** |

Scores should be supported by observations. “Feels modern: 9/10” is not adequate evidence.

### Step 7: Return a decisive recommendation

The LLM output should follow a stable structure:

```json
{
  "strategy": "condensed-display-plus-neutral-text",
  "recommended": {
    "displayFamily": "Barlow Condensed",
    "supportFamily": "Source Sans 3",
    "roles": {
      "score": { "family": "Barlow Condensed", "weight": 800 },
      "teamName": { "family": "Barlow Condensed", "weight": 700 },
      "result": { "family": "Barlow Condensed", "weight": 700 },
      "performance": { "family": "Source Sans 3", "weight": 600 },
      "metadata": { "family": "Source Sans 3", "weight": 500 }
    }
  },
  "reasoning": [
    "The condensed display family preserves scale with long uppercase team names.",
    "The support family remains open and readable in dense performance rows.",
    "The contrast comes from width and role while stroke character remains compatible."
  ],
  "risks": [
    "Test the longest association names before locking the team-name size.",
    "Confirm tabular numeral support in the supplied font files."
  ],
  "rejected": [
    {
      "pair": "Bebas Neue + Manrope",
      "reason": "The display family is too limited for variable result phrases in this template."
    }
  ],
  "requiredTests": [
    "longest-team-name",
    "all-numerals-and-punctuation",
    "abandoned-result-state",
    "final-remotion-frame"
  ],
  "confidence": "high"
}
```

The family names above illustrate the decision structure; they are not a default answer for every results template.

## LLM selection rules

An LLM recommending fonts must:

- Use only fonts confirmed in the available catalogue or project manifest.
- Distinguish verified font features from visual inference.
- Evaluate the actual template content rather than generic specimen text.
- Prefer a single family until a second family has a defined role.
- Recommend exact roles and weights, not only family names.
- Explain why the pair works structurally and stylistically.
- State risks, assumptions and required rendering tests.
- Reject unsuitable candidates explicitly.
- Preserve the template's information hierarchy above personal taste.
- Treat the current Fixtura type system as a constraint unless the brief requests a new direction.

An LLM must not:

- Select a font because it is popular, trending or frequently paired online.
- Invent weights, axes, italics, subsets or OpenType features.
- Describe every geometric sans as modern or every condensed face as sporty.
- Use more families as a substitute for hierarchy.
- Recommend a novelty display face for variable data without testing it.
- Assume a Google Fonts name means the font files are already installed.
- Rely on synthetic bold, synthetic italics or browser fallback in final renders.
- Change the primary font merely to make each new template look different.

## Prompt template for an LLM

Use this prompt when asking an LLM to select typography for a template:

```text
Act as a senior typographic designer working on a data-driven Fixtura sports template.

Select a font system from the supplied approved-font manifest. Do not recommend fonts outside that manifest unless the brief explicitly requests exploration.

Analyse the template in this order:
1. Information roles and hierarchy.
2. Canvas, layout and content density.
3. Longest and most difficult real content.
4. Score, numeral and punctuation requirements.
5. Required weights, styles, scripts and font features.
6. Relationship to the template geometry and intended character.
7. Renderer and font-loading constraints.

Start by deciding whether one family is sufficient. Add a second family only if it creates a useful functional or expressive contrast.

Generate no more than three candidate systems. Test each against the supplied content cases and reject unsuitable options. Do not infer unverified font capabilities.

Return:
- the selected pairing strategy;
- one recommended system;
- exact font family, weight and role assignments;
- three concise reasons grounded in the template;
- risks and assumptions;
- rejected alternatives with reasons;
- required visual tests;
- confidence level.

The recommendation must prioritise legibility, content fit, hierarchy and production reliability before visual novelty.
```

## Data-resilient typography

### Test the content extremes

Every selected system should be evaluated with:

- The shortest and longest team names.
- Narrow and wide uppercase character combinations.
- Single-digit and multi-part scores.
- Text outcomes such as `NO RESULT` and `MATCH ABANDONED`.
- Maximum player-performance rows.
- Missing performances and missing crests.
- Long venues, rounds and competition names.
- Sponsor names with different word lengths.

### Use a controlled fit strategy

Do not continuously shrink all text until it fits. Establish an ordered response:

1. Use the intended font size.
2. Allow a defined wrap where the role permits it.
3. Use a reviewed condensed width or variable `wdth` value.
4. Reduce tracking within a safe range.
5. Move to a documented smaller size variant.
6. Truncate only non-essential metadata.
7. Reject or redesign the layout if essential identity remains unreadable.

```css
.team-name {
  font-family: var(--font-display);
  font-size: var(--team-size, 2.4rem);
  font-weight: 750;
  line-height: 0.9;
  letter-spacing: -0.015em;
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.team-name[data-fit="compact"] {
  font-size: var(--team-size-compact, 2rem);
  letter-spacing: -0.025em;
}
```

Avoid CSS transform scaling as the default fit mechanism. It can distort stroke weight, break alignment and conceal a layout problem.

### Match line-height to the role

Display type can use tight line-height because its lines are short and large. Metadata needs more breathing room.

```css
.score {
  line-height: 0.78;
}
.team {
  line-height: 0.9;
}
.headline {
  line-height: 0.92;
}
.meta {
  line-height: 1.2;
}
.body {
  line-height: 1.5;
}
```

These are starting relationships, not universal values. Inspect accents and descenders before approving tight settings.

## Variable fonts

Variable fonts can provide continuous control over registered axes such as weight (`wght`), width (`wdth`), optical size (`opsz`) and slant (`slnt`). Available axes differ by family.

**Useful when:**

- A responsive template benefits from controlled width changes.
- Several weights can be delivered in one variable file.
- Optical sizing improves display and text roles.
- Motion deliberately interpolates a typographic property.

**Not automatically useful when:**

- The design needs only one or two static instances.
- The renderer or pipeline does not reliably support the required axis.
- The chosen family has no axis that solves the actual layout problem.
- Variation becomes a substitute for selecting the right base family.

```css
.variable-team-name {
  font-family: var(--font-variable-display);
  font-variation-settings:
    "wght" 760,
    "wdth" 82;
}
```

Use conventional properties such as `font-weight` and `font-stretch` where they map correctly. Use `font-variation-settings` for precise or custom-axis control. Never request an axis value outside the font's declared range.

## Loading Google Fonts on the web

The Google Fonts CSS API supports requesting specific families, weights, styles and variable-font ranges. Request only what the design actually uses.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Always include a generic fallback:

```css
:root {
  --font-display: "Barlow Condensed", "Arial Narrow", sans-serif;
  --font-support: "Source Sans 3", Arial, sans-serif;
}
```

Use `text=` subsetting only when the exact characters are fixed. It is inappropriate for dynamic team names, scores or metadata because unseen characters will be missing.

## Loading fonts in Next.js

For a Next.js application, `next/font/google` downloads and self-hosts the selected Google Font as a build asset. This removes client requests to Google and reduces layout shift.

```tsx
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";

export const displayFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const supportFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-support",
  display: "swap",
});
```

```tsx
<html className={`${displayFont.variable} ${supportFont.variable}`}>
  <body>{children}</body>
</html>
```

Keep font declarations in a shared module so instances are not unintentionally duplicated.

## Loading fonts in Remotion

Remotion supports Google Fonts through `@remotion/google-fonts` and local files through `@remotion/fonts`. Load shared fonts in one module and ensure they are ready before text measurement or rendering.

```tsx
import { loadFont as loadBarlowCondensed } from "@remotion/google-fonts/BarlowCondensed";

const { fontFamily: displayFontFamily } = loadBarlowCondensed("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

export { displayFontFamily };
```

For deterministic production rendering, local versioned font assets are often preferable because availability does not depend on a remote request during capture.

```tsx
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const displayFontFamily = "Fixtura Barlow Condensed";

loadFont({
  family: displayFontFamily,
  url: staticFile("fonts/barlow-condensed/BarlowCondensed-Bold.woff2"),
  weight: "700",
});
```

Load every weight the template requests. Do not rely on the browser to synthesise an unavailable weight.

## Font assets, licensing and version control

Google Fonts are distributed under open-source licences, but the specific licence and copyright files belong with the font assets and should be reviewed for each family.

For production projects:

- Download fonts from an authoritative source.
- Retain the supplied licence and copyright files.
- Record the family version or commit used.
- Store only the weights and subsets required by the product where licence terms permit.
- Do not rename or modify font files in ways prohibited by their licence.
- Review the licence again before modifying or redistributing a font.
- Treat an updated font file as a production dependency change because metrics may change.

Generated client graphics and web embedding are distinct from modifying or redistributing a font itself. Keep a record of the source and applicable licence rather than assuming all open-font licences have identical terms.

## Production rendering checks

### Prevent fallback capture

A frame rendered before the font loads may permanently capture fallback metrics. That can change:

- Line breaks.
- Score width.
- Alignment with angled panels.
- Vertical centring.
- Text measurement used by responsive fit logic.

Wait for the loader used by the rendering framework. When using browser-native loading, `document.fonts.ready` can be part of the readiness check.

### Avoid synthetic styles

If a requested bold or italic file is missing, a browser may synthesise it. Prevent unexpected substitutions in controlled graphics:

```css
.graphic {
  font-synthesis: none;
}
```

Then ensure every requested style has a real loaded asset.

### Inspect the final rasterised output

Check typography at the delivered resolution and compression, not only in a large browser preview. Thin strokes, tight counters, punctuation and negative tracking can degrade after resizing or video compression.

Validate representative still frames for every approved font system.

## Common pairing failures

- Selecting two expressive fonts that compete for attention.
- Choosing a support font that is wider than the display font can accommodate.
- Using a novelty display face for variable team names or outcomes.
- Treating different weights of unrelated fonts as sufficient hierarchy.
- Pairing solely because an online article recommends the combination.
- Ignoring numeral design in a score-led template.
- Using uppercase specimens to judge lowercase metadata.
- Introducing a new family for each template instead of building recognition.
- Allowing fallback fonts to appear during automated rendering.
- Claiming a font supports a feature without checking its files or manifest.
- Shrinking essential text until it technically fits but no longer reads.
- Applying extreme tracking, skew or horizontal scaling to force personality.

## Quality checklist

| Check      | Question                                                                          |
| ---------- | --------------------------------------------------------------------------------- |
| Roles      | Does every family have a defined job?                                             |
| Necessity  | Could the same hierarchy work with one family instead of two?                     |
| Fit        | Have the longest essential strings been tested at final size?                     |
| Numerals   | Are scores, punctuation and related figures immediately clear?                    |
| Hierarchy  | Can the score, team, result and metadata roles be identified in under one second? |
| Pairing    | Do the families share enough structure and provide useful contrast?               |
| Identity   | Does the display voice belong to the template and broader Fixtura system?         |
| Resilience | Do wraps, compact states and missing content remain intentional?                  |
| Features   | Are weights, styles, axes, subsets and numeral features verified?                 |
| Loading    | Are all font assets ready before measurement and capture?                         |
| Output     | Has the pair been inspected in the production renderer at delivery resolution?    |
| Licensing  | Are source, version and licence files recorded?                                   |

## A practical order of operations

1. List the template's information roles.
2. Collect real content extremes and exceptional states.
3. Rank spatial, legibility and rendering constraints.
4. Define the intended visual character in specific terms.
5. Decide whether one family can perform every role.
6. Select no more than three candidate systems from the approved collection.
7. Test names, scores, punctuation, metadata and language coverage.
8. Reject candidates that fail functional requirements.
9. Score the remaining systems with the weighted rubric.
10. Assign exact roles, weights, sizes and fallbacks.
11. Load the real font assets and render representative frames.
12. Approve the system only after reviewing final output.

> **Final rule.** A professional font pairing should appear inevitable once the content and design system are understood. It should give the template a voice, make every information role clearer and survive the least convenient real data without calling attention to the pairing itself.

## Official references

- [Google Fonts: Pairing typefaces](https://fonts.google.com/knowledge/choosing_type/pairing_typefaces)
- [Google Fonts CSS API](https://developers.google.com/fonts/docs/css2)
- [Google Fonts Developer API](https://developers.google.com/fonts/docs/developer_api)
- [Google Fonts FAQ and licensing](https://fonts.google.com/faq)
- [Next.js font optimisation](https://nextjs.org/docs/app/getting-started/fonts)
- [Remotion: Using fonts](https://www.remotion.dev/docs/fonts)
- Companion guide: `CSS Professional Design Techniques.md`
