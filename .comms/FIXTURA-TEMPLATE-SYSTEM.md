# Fixtura Template System

## Overview

Fixtura templates are **fixed-dimension design layouts used to automatically generate sports media assets** for clubs and associations. These assets communicate structured match data (fixtures, results, ladders, player performances, etc.) in a consistent visual format suitable for social media.

Templates are designed to be:

* **automatically rendered**
* **data-driven**
* **brand configurable**
* **consistent across clubs**
* **stable regardless of content variations**

Each template combines **structured sports data, club branding, and sponsor placements** into a single visual output.

Templates must follow **strict layout and design constraints** to ensure assets render reliably across thousands of generated graphics.

---

# Purpose of Templates

Templates exist to solve three problems:

### 1. Automated Content Creation

Fixtura generates assets automatically from competition data. Templates ensure that structured data can be converted into professional graphics without manual design work.

### 2. Consistent Club Branding

Each club can apply their **own colours and logos** while still using the same template system.

### 3. Sponsor Delivery

Templates provide **predictable sponsor placement zones** to ensure sponsor exposure across generated assets.

---

# Template Structure

Every Fixtura template follows the same high-level layout structure.

```
+-----------------------+
|        HEADER         |
+-----------------------+
|       CONTENT         |
|   (Template Layout)   |
|                       |
+-----------------------+
|        FOOTER         |
+-----------------------+
```

### Header

Used for:

* club logo
* template title
* background imagery
* competition context

### Content Area

The main template layout where match data is rendered.

Examples:

* result match blocks
* fixture listings
* player performance cards
* ladder tables

### Footer

Reserved for:

* sponsor logos
* sponsor messaging
* secondary branding

---

# Template Dimensions

Fixtura assets use a **fixed canvas size**.

```
Width: 1080px
Height: 1010px
Aspect Ratio: Fixed
```

Templates do **not support multiple aspect ratios**. All assets are generated using the same canvas dimensions to ensure consistency across distribution platforms.

---

# Layout Zones

The layout is divided into fixed vertical regions.

| Zone    | Height | Purpose                     |
| ------- | ------ | --------------------------- |
| Header  | 190px  | Title, branding, background |
| Content | 670px  | Main template layout        |
| Footer  | 150px  | Sponsor placement           |

### Content Height Calculation

```
contentHeight = assetHeight - headerHeight - footerHeight
```

```
contentHeight = 1010 - 190 - 150
contentHeight = 670px
```

The content zone must contain **all template-specific design elements**.

---

# Theme System

Fixtura templates use a **constrained theme system** to ensure consistency.

Templates use:

* **2 fonts only**
* **2 primary club colours**
* **black**
* **white**

No additional colours or font families are permitted.

---

## Typography

Templates use a **single font family with multiple weights**.

Font usage is restricted to predefined text styles.

Examples of text styles include:

* Title
* Subtitle
* Team Name
* Score
* Player Name
* Match Result
* Metadata
* Sponsor Text

Each style defines:

```
font size
font weight
line height
letter spacing
colour usage
```

These styles ensure **consistent readability and spacing across all templates**.

---

# Colour System

Templates support **club colour branding** while maintaining contrast and readability.

Allowed colours:

```
Primary Colour A (club selected)
Primary Colour B (club selected)
Black
White
```

Usage examples:

| Element           | Colour        |
| ----------------- | ------------- |
| Titles            | Primary A     |
| Score highlights  | Primary B     |
| Background panels | White / Black |
| Metadata          | Neutral text  |

Designs should maintain **high contrast between text and background**.

---

# Data Driven Design

Templates are **data-driven layouts**.

They do not contain static content. Instead, they render structured data fields provided by the Fixtura system.

Examples of data used:

### Match Metadata

```
competition name
grade
round
venue
match result
```

### Team Information

```
team name
team logo
team score
```

### Player Performance

```
player name
runs
balls faced
wickets
overs
runs conceded
```

### Sponsor Data

```
sponsor name
sponsor logo
sponsor messaging
```

Templates must be designed so that **all data fields can vary in length without breaking the layout**.

---

# Design Components

Templates are built from reusable components.

### Header Component

Contains:

```
club logo
template title
background image
```

---

### Match Card Component

Displays a single match result.

Contains:

```
team A
team B
score comparison
player highlights
```

---

### Player Highlight Component

Displays player performance.

Examples:

```
Top Batters
Best Bowling Figures
```

---

### Sponsor Bar Component

Displays sponsor logos.

Rules:

* fixed height
* controlled spacing
* consistent scaling

---

# Layout Behaviour

Templates must be **stable regardless of data variation**.

Designers must account for:

### Long Team Names

Layouts must support:

```
wrapping
font scaling
short name fallbacks
```

### Variable Scores

Examples:

```
167
8/145
145 all out
```

### Player Name Length

Layouts must support:

```
short names
long surnames
double-barrel names
```

---

# Design Constraints

Templates must follow strict design rules.

### Fixed Canvas

Templates must not change:

```
width
height
aspect ratio
```

---

### Restricted Colour Use

Only the following are allowed:

```
primary colour A
primary colour B
black
white
```

---

### Font Restrictions

Only the approved **two font families** may be used.

No additional fonts are permitted.

---

### Component Boundaries

Elements must remain inside the defined layout zones.

Content must **not overlap header or footer regions**.

---

# Sponsor Placement Rules

Sponsors are placed within predefined template areas.

Common placement zones:

```
footer sponsor strip
match sponsor
result sponsor
```

Sponsor logos must scale proportionally and maintain safe margins.

---

# Design Goals

All Fixtura templates aim to achieve:

### Readability

Scores and match outcomes must be clear at a glance.

### Automation Stability

Layouts must render correctly with **dynamic data**.

### Brand Flexibility

Templates must work with many club colour schemes.

### Sponsor Visibility

Sponsors must remain visible without overpowering match information.

---

# Example Template Types

Fixtura supports multiple asset types.

Examples include:

### Results

Displays match outcomes and player highlights.

### Fixtures

Displays upcoming matches and schedule information.

### Ladder

Displays league standings.

### Player Performance

Highlights top individual performances.

---

# Summary

Fixtura templates are **structured, automated design systems** that convert sports competition data into branded visual assets.

The template system ensures:

* consistent design
* reliable automated rendering
* scalable asset generation
* clear communication of sports data
* integrated sponsor exposure

By combining **fixed layout rules, constrained themes, and structured data**, Fixtura can generate thousands of professional sports graphics automatically.
