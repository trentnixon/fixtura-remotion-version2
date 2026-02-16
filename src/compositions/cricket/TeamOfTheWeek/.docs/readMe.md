# Team of the Week Asset - CricketTeamOfTheWeek

Welcome to the TeamOfTheWeek asset documentation. This folder contains everything needed to create and integrate the "Team of the Week" composition type for cricket.

---

## 📋 Quick Overview

**Asset Name:** TeamOfTheWeek
**Composition ID:** `CricketTeamOfTheWeek`
**Status:** 🚧 In Development
**Test Data:** [testData/samples/Cricket/Cricket_TeamOfTheWeek.json](../../../../testData/samples/Cricket/Cricket_TeamOfTheWeek.json)

### What This Asset Does

Displays weekly cricket performance highlights featuring:
- **Multiple Player Categories:** Batters, Bowlers, All-Rounders, Twelfth Man
- **Comprehensive Stats:** Batting stats, bowling figures, all-rounder metrics
- **Ranking Information:** Multiple ranking indicators per player
- **Club Branding:** Team logos and club information
- **Multi-Screen Support:** Pagination for large player lists

---

## 📚 Documentation Files

This folder contains comprehensive documentation for creating and understanding this asset:

### 0. **Skill** (LLM-focused)
- `.skills/architecture/cricket-team-of-the-week-folder.md` – Implementation guidance for this composition

### 1. **[readMe.md](./readMe.md)** (LLM-focused)
- Technical overview of folder structure
- File descriptions and relationships
- Dependencies and integration points
- **Purpose:** Primary reference for AI assistants

### 2. **[DevelopmentRoadMap.md](./DevelopmentRoadMap.md)**
- Progress tracking (completed/to-do)
- Task prioritization (easy → hard)
- Recommendations and next steps
- **Purpose:** Project management and planning

### 3. **[Tickets.md](./Tickets.md)**
- Detailed tickets for each implementation phase
- Task breakdowns with checklists
- Constraints, risks, and assumptions
- **Purpose:** Granular execution planning

### 4. **[ASSET_CREATION_GUIDE.md](./ASSET_CREATION_GUIDE.md)** ⭐
- Complete step-by-step guide for creating new assets
- Code examples and templates
- Integration checklist
- **Purpose:** Tutorial for creating any new asset type

### 5. **[TEST_DATA_INTEGRATION_GUIDE.md](./TEST_DATA_INTEGRATION_GUIDE.md)** ⭐
- Detailed breakdown of test data JSON structure
- Registration process
- Troubleshooting common issues
- **Purpose:** Understanding and hooking in test data

### 6. **[README.md](./README.md)** (this file)
- High-level overview
- Navigation guide
- Quick-start information
- **Purpose:** Human-readable entry point

---

## 🚀 Quick Start

### For Developers

If you're implementing the TeamOfTheWeek asset, follow these steps:

1. **Understand the System**
   - Read [ASSET_CREATION_GUIDE.md](./ASSET_CREATION_GUIDE.md) first
   - Review [TEST_DATA_INTEGRATION_GUIDE.md](./TEST_DATA_INTEGRATION_GUIDE.md)
   - Examine the test data file: [Cricket_TeamOfTheWeek.json](../../../../testData/samples/Cricket/Cricket_TeamOfTheWeek.json)

2. **Review Current Progress**
   - Check [DevelopmentRoadMap.md](./DevelopmentRoadMap.md) for completed tasks
   - Review [Tickets.md](./Tickets.md) for next steps
   - Identify which ticket(s) to work on

3. **Start Building**
   - Follow the relevant ticket's task list
   - Reference existing assets (performances, results) for patterns
   - Update documentation as you progress

4. **Test Your Work**
   - Run `npm run dev` to start Remotion Studio
   - Look for compositions: `Basic-Solid-CricketTeamOfTheWeek`
   - Verify rendering and data display

### For AI Assistants

1. Start with [readMe.md](./readMe.md) for technical context
2. Check [DevelopmentRoadMap.md](./DevelopmentRoadMap.md) for current status
3. Reference [Tickets.md](./Tickets.md) for detailed task information
4. Use guides ([ASSET_CREATION_GUIDE.md](./ASSET_CREATION_GUIDE.md), [TEST_DATA_INTEGRATION_GUIDE.md](./TEST_DATA_INTEGRATION_GUIDE.md)) for implementation patterns

---

## 📊 Current Status

### ✅ Completed
- [x] Folder structure created
- [x] Documentation files created
- [x] Test data sample available
- [x] Documentation integrated with parent folder

### ⏳ In Progress
- [ ] TypeScript type definitions
- [ ] Test data registration
- [ ] Basic template implementation
- [ ] Composition registration
- [ ] Controller components

### 🔜 Upcoming
- [ ] Layout components
- [ ] Additional template variants
- [ ] Screen pagination
- [ ] NoData module

For detailed task breakdown, see [DevelopmentRoadMap.md](./DevelopmentRoadMap.md).

---

## 🗂️ Expected Folder Structure

Once complete, the folder structure will look like:

```
TeamOfTheWeek/
├── README.md                          # This file
├── readMe.md                          # LLM-focused documentation
├── DevelopmentRoadMap.md              # Progress tracking
├── Tickets.md                         # Detailed task planning
├── ASSET_CREATION_GUIDE.md            # How to create assets
├── TEST_DATA_INTEGRATION_GUIDE.md     # Test data guide
├── index.tsx                          # Export all template variants
├── types.ts                           # TypeScript type definitions
├── basic.tsx                          # Basic template
├── brickWork.tsx                      # BrickWork template
├── classic.tsx                        # Classic template
├── classicTwoColumn.tsx               # Classic Two Column template
├── cnsw.tsx                           # CNSW template
├── cnswPrivate.tsx                    # CNSW Private template
├── sixersThunder.tsx                  # Sixers/Thunder template
├── controller/
│   ├── TeamOfTheWeekDisplay/
│   │   ├── readMe.md
│   │   ├── display-Basic.tsx
│   │   ├── display-BrickWork.tsx
│   │   └── [other variants]
│   └── PlayerRow/
│       ├── readMe.md
│       ├── row-Basic.tsx
│       ├── row-BrickWork.tsx
│       └── [other variants]
├── layout/
│   ├── readMe.md
│   ├── PlayerCard/
│   └── Sections/
├── modules/
│   └── NoData/
│       ├── readMe.md
│       └── NoTeamOfTheWeekData.tsx
└── utils/
    ├── readMe.md
    └── screenCalculator.ts
```

---

## 🔗 Integration Points

### Where This Asset Hooks Into The System

1. **Test Data Registration**
   - File: `testData/index.ts`
   - Imported and added to `testDatasets` and `datasetsByCategory`

2. **Composition Registration**
   - File: `src/compositions/cricket/index.tsx`
   - Exported as `CricketTeamOfTheWeek` with all template variants

3. **Template System**
   - Uses: `src/templates/base/BaseTemplateLayout.tsx`
   - Integrates with template variants (Basic, BrickWork, Classic, etc.)

4. **Contexts**
   - `ThemeContext`: Colors, layout dimensions
   - `AnimationContext`: Animation configurations
   - `FontContext`: Font settings

5. **Routing**
   - Development: `src/DevelopmentRoot.tsx` (auto-registers)
   - Production: `src/ProductionRoot.tsx` (uses compositionId)

---

## 📖 Data Structure Overview

### Player Categories

1. **Batter** - Top scorers and strike rate leaders
2. **Bowler** - Most wickets and best economy
3. **All-Rounder** - Combined batting and bowling
4. **Twelfth Man** - Best of the rest

### Key Data Fields

Each player in the test data includes:
- `rank`: Position in team
- `player`: Player name (with captain/VC indicators)
- `category`: Player role type
- `categoryDetail`: Specific position/achievement
- `primaryTeam`: Team name
- `club`: Club info with logo
- `batting`: Runs, balls, strike rate, etc. (if applicable)
- `bowling`: Wickets, overs, economy, etc. (if applicable)
- `allRounder`: Combined metrics (if applicable)
- `rankings`: Multiple ranking indicators

For complete data structure details, see [TEST_DATA_INTEGRATION_GUIDE.md](./TEST_DATA_INTEGRATION_GUIDE.md).

---

## 🎨 Template Variants

The asset will support 7 template variants:

1. **Basic** - Clean, minimal design
2. **BrickWork** - Textured, modern aesthetic
3. **Classic** - Traditional single-column layout
4. **ClassicTwoColumn** - Traditional two-column layout
5. **CNSW** - Cricket NSW branded
6. **CNSW Private** - Cricket NSW private variant
7. **Sixers/Thunder** - BBL team branded

Each variant will have:
- Display component (overall layout)
- Row component (individual player cards)
- Consistent data handling
- Variant-specific styling

---

## 🧪 Testing

### Test Data Location
```
testData/samples/Cricket/Cricket_TeamOfTheWeek.json
```

### Key Test Data Properties
- **Total Players:** 10
- **Items Per Screen:** 2 (configurable via `divideFixturesBy`)
- **Expected Screens:** 5
- **Categories:** 4 (Batter, Bowler, All-Rounder, Twelfth Man)

### How to Test

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Find Compositions:**
   Look for patterns like:
   - `Basic-Solid-CricketTeamOfTheWeek`
   - `Basic-Texture-CricketTeamOfTheWeek`
   - `BrickWork-Solid-CricketTeamOfTheWeek`

3. **Verify:**
   - All 10 players render correctly
   - Categories display properly
   - Stats show for appropriate roles
   - Screen transitions work
   - Animations are smooth

---

## 🔍 Reference Assets

When implementing, reference these similar assets:

### Most Similar: Performances
- **Path:** `src/compositions/cricket/performances/`
- **Similarity:** Multi-stat display, batting/bowling data
- **Learn From:** Data transformation, stat display patterns

### Also Useful: Results
- **Path:** `src/compositions/cricket/results/`
- **Similarity:** Card-based layout, multi-screen pagination
- **Learn From:** Screen calculations, card layouts

### For Patterns: Ladder
- **Path:** `src/compositions/cricket/ladder/`
- **Similarity:** Tabular data, rankings
- **Learn From:** Row structure, ranking displays

---

## 🛠️ Common Tasks

### Update Documentation
- **When:** After creating/modifying files
- **Files:** `readMe.md`, `DevelopmentRoadMap.md`, `Tickets.md`
- **Rule:** Keep documentation in sync with code

### Add New Template Variant
1. Create template file (e.g., `classic.tsx`)
2. Create display component (e.g., `display-Classic.tsx`)
3. Create row component (e.g., `row-Classic.tsx`)
4. Export in `index.tsx`
5. Add to cricket index export object
6. Update documentation

### Modify Data Structure
1. Update TypeScript types in `types.ts`
2. Update test data JSON
3. Update components to handle new structure
4. Test all template variants
5. Update documentation

---

## 📝 Documentation Standards

This asset follows the documentation structure defined in `.cursorrules`:

- **readMe.md**: LLM-oriented, concise, folder-specific
- **DevelopmentRoadMap.md**: Progress tracking, easy→hard ordering
- **Tickets.md**: Detailed planning with phases and tasks
- **README.md**: Human-readable overview and navigation

All documentation must be kept up-to-date as development progresses.

---

## 🤝 Contributing

When working on this asset:

1. **Check Documentation First**
   - Read relevant guides
   - Review current roadmap
   - Identify next ticket to implement

2. **Follow Established Patterns**
   - Maintain consistency with other cricket assets
   - Use existing utilities and contexts
   - Follow TypeScript best practices

3. **Update Documentation**
   - Mark completed tasks in roadmap
   - Update ticket status
   - Add notes for future developers

4. **Test Thoroughly**
   - Test in Development Studio
   - Verify all template variants
   - Check edge cases (empty data, single item, etc.)

---

## 📞 Getting Help

### Where to Look

1. **Understanding Asset Creation:**
   - Read [ASSET_CREATION_GUIDE.md](./ASSET_CREATION_GUIDE.md)

2. **Test Data Issues:**
   - Read [TEST_DATA_INTEGRATION_GUIDE.md](./TEST_DATA_INTEGRATION_GUIDE.md)

3. **Current Progress/Next Steps:**
   - Check [DevelopmentRoadMap.md](./DevelopmentRoadMap.md)
   - Review [Tickets.md](./Tickets.md)

4. **Similar Implementations:**
   - Study `performances` asset
   - Study `results` asset
   - Study `ladder` asset

5. **System Architecture:**
   - Read [WARP.md](../../../../WARP.md) (project root)
   - Review [.cursorrules](../../../../.cursorrules)

---

## 📌 Key Takeaways

### For Humans
- Start with [ASSET_CREATION_GUIDE.md](./ASSET_CREATION_GUIDE.md) for a complete tutorial
- Check [DevelopmentRoadMap.md](./DevelopmentRoadMap.md) for current status
- Follow [Tickets.md](./Tickets.md) for step-by-step tasks

### For AI Assistants
- Reference [readMe.md](./readMe.md) for technical context
- Use guides for implementation patterns
- Update documentation as you make changes

### For Everyone
- **Critical Rule:** `compositionId` in JSON must match export name in cricket/index.tsx
- **Pattern:** Follow existing assets for consistency
- **Documentation:** Keep all docs up-to-date

---

**Created:** 2025-12-17
**Last Updated:** 2025-12-17
**Status:** 🚧 Ready for Implementation

---

**Need to create a new asset?** Use this folder as a template and follow the [ASSET_CREATION_GUIDE.md](./ASSET_CREATION_GUIDE.md)!
