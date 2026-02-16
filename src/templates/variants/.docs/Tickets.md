# Completed Tickets Index

- (none yet)

---

## Active Tickets

---

## TKT-2025-017: Variants readMe Migration — .docs Layout

---
ID: TKT-2025-017
Status: Draft
Priority: Medium
Owner: Development Team
Created: 2025-02-16
Updated: 2025-02-16
Related: Feature Documentation System, TKT-2025-015 (core migration), templates/base audit
---

### Overview

Migrate template variant readMe files to .docs layout and ensure every variant folder has a readMe. Same process as core and templates/base: (1) move readMe into .docs, (2) add readMe for folders missing one.

### What We Need to Do

1. Check for readMe files in .docs folder — move any readMe/README at folder root into `.docs/readMe.md`.
2. Add readMe to any folder that has none.

### Current State (src/templates/variants)

| Location | Has readMe | In .docs? | Action |
|----------|-------------|-----------|--------|
| `variants/` (root) | ✓ | ✓ | None |
| `basic/` | ✓ | ✗ | Move |
| `basic/components/` | ✓ | ✗ | Move |
| `brickwork/` | ✓ | ✓ | None |
| `brickwork/components/` | ✓ | ✓ | None |
| `classic/` | ✓ | ✗ | Move |
| `classic/components/` | ✓ | ✗ | Move |
| `cnsw/` | ✓ | ✗ | Move |
| `cnsw/components/` | ✓ | ✗ | Move |
| `cnsw/utils/` | README.md | ✗ | Move → .docs/readMe.md |
| `cnsw-private/` | ✓ | ✗ | Move |
| `cnsw-private/components/` | ✓ | ✗ | Move |
| `cnsw-private/utils/` | README.md | ✗ | Move → .docs/readMe.md |
| `mudgeeraba/` | ✓ | ✓ | None |
| `mudgeeraba/components/` | ✓ | ✗ | Move |
| `sixers/` | ✓ | ✗ | Move |
| `sixers/components/` | ✓ | ✗ | Move |
| `thunder/` | ✓ | ✗ | Move |
| `thunder/components/` | ✓ | ✗ | Move |
| `thunder/utils/` | ✗ | — | Create |
| `twoColumnClassic/` | ✓ | ✗ | Move |
| `twoColumnClassic/components/` | ✓ | ✗ | Move |
| `twoColumnClassic/utils/` | ✗ | — | Create |

### Phases & Tasks

#### Phase 1: Move readMe into .docs

##### Tasks

- [x] Move `basic/readMe.md` → `basic/.docs/readMe.md`
- [x] Move `basic/components/readMe.md` → `basic/components/.docs/readMe.md`
- [x] Move `classic/readMe.md` → `classic/.docs/readMe.md`
- [x] Move `classic/components/readMe.md` → `classic/components/.docs/readMe.md`
- [x] Move `cnsw/readMe.md` → `cnsw/.docs/readMe.md`
- [x] Move `cnsw/components/readMe.md` → `cnsw/components/.docs/readMe.md`
- [x] Move `cnsw/utils/README.md` → `cnsw/utils/.docs/readMe.md` (rename to readMe)
- [x] Move `cnsw-private/readMe.md` → `cnsw-private/.docs/readMe.md`
- [x] Move `cnsw-private/components/readMe.md` → `cnsw-private/components/.docs/readMe.md`
- [x] Move `cnsw-private/utils/README.md` → `cnsw-private/utils/.docs/readMe.md` (rename to readMe)
- [x] Move `mudgeeraba/components/readMe.md` → `mudgeeraba/components/.docs/readMe.md`
- [x] Move `sixers/readMe.md` → `sixers/.docs/readMe.md`
- [x] Move `sixers/components/readMe.md` → `sixers/components/.docs/readMe.md`
- [x] Move `thunder/readMe.md` → `thunder/.docs/readMe.md`
- [x] Move `thunder/components/readMe.md` → `thunder/components/.docs/readMe.md`
- [x] Move `twoColumnClassic/readMe.md` → `twoColumnClassic/.docs/readMe.md`
- [x] Move `twoColumnClassic/components/readMe.md` → `twoColumnClassic/components/.docs/readMe.md`
- [x] Update parent/child cross-references in moved readMes (Relations, Child Module links)

#### Phase 2: Create readMe for folders without one

##### Tasks

- [x] Create `thunder/utils/.docs/readMe.md` (titleLookup.ts)
- [x] Create `twoColumnClassic/utils/.docs/readMe.md` (titleLookup.ts)
- [x] Update parent variant readMes to reference new utils folders in Child Modules

### Constraints, Risks, Assumptions

- Do not move or change readMe files already inside `.docs/`
- README.md → readMe.md when moving (normalize casing)
- Parent links: use correct relative path to parent `.docs/readMe.md`
- Follow standard folder contract: Folder Overview, Files, Child Modules, Relations, Dependencies
- mudgeeraba `.docs/` has extra files (ticket.md, design-patterns, etc.); leave as-is
