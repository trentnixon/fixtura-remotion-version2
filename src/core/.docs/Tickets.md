# Completed Tickets Index

- TKT-2025-015
- TKT-2025-016

---

## Active Tickets

---

## TKT-2025-015: Core readMe Migration — .docs Layout

---
ID: TKT-2025-015
Status: Completed
Priority: Medium
Owner: Development Team
Created: 2025-02-16
Updated: 2025-02-16
Related: Feature Documentation System, TKT-2025-013 (components migration)
---

### Overview

Migrate core folder readMe files to .docs layout and ensure every folder has a readMe. Aligns with repo documentation rules: all markdown planning files in `.docs/`.

### What We Need to Do

1. Move readMe.md files into .docs in their directory (do not move if already in .docs).
2. Create a new readMe for any folder that has no readMe.

### Completion Summary

Moved hooks, components, and components/dev readMes into .docs; created readMe for context/types; updated parent links. All core folders now have readMe in .docs.

---

## TKT-2025-016: Core Skill Tree — .skills/architecture

---
ID: TKT-2025-016
Status: Completed
Priority: Medium
Owner: Development Team
Created: 2025-02-16
Updated: 2025-02-16
Related: TKT-2025-015, TKT-2025-014 (components skill pattern), Feature Documentation System
---

### Overview

Create architecture skills for core folders that lack them. Add Skill section to each folder readMe; ensure skills are discoverable via `.skills/architecture/index.md`.

### What We Need to Do

Create skills for core root, utils, components, and hooks; add Skill refs to readMes; update architecture index.

### Completion Summary

Created core-folder-structure, core-utils-folder, core-components-folder, core-hooks-folder; added Skill sections to core, utils, components, hooks readMes; updated architecture index. Core skill tree complete.
