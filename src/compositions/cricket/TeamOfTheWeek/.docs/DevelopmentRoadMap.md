# Development Roadmap – Team of the Week

This roadmap tracks the creation and integration of the CricketTeamOfTheWeek asset type.

---

## ✅ Completed

- [x] Created folder structure for TeamOfTheWeek
- [x] Created documentation files (readMe.md, DevelopmentRoadMap.md, Tickets.md)
- [x] Test data sample available (Cricket_TeamOfTheWeek.json)
- [x] Created TypeScript types for TeamOfTheWeek data structure (types.ts)
- [x] Registered test data into system (testData/index.ts)
- [x] Created utility functions for screen pagination (utils/screenCalculator.ts)
- [x] Created Display component - Basic variant (controller/TeamOfTheWeekDisplay/display-Basic.tsx)
- [x] Created PlayerRow component - Basic variant (controller/PlayerRow/row-Basic.tsx)
- [x] Created basic template implementation (basic.tsx)
- [x] Registered composition in cricket/index.tsx as CricketTeamOfTheWeek
- [x] Composition available in Remotion Studio
- [x] **Basic Template Complete:**
  - [x] Single-row layout: `[Logo] [Type, Player, Team] [Stats]`
  - [x] Typography components created (PlayerName, Team, Type, Stat)
  - [x] Theme integration for basic template
  - [x] Stats display with smaller secondary values (balls, overs)
  - [x] Position-based stat display logic
  - [x] Two-row stats for Top All-Rounder and 12th Man
- [x] Created comprehensive template implementation plan (TEMPLATE_IMPLEMENTATION_PLAN.md)

---

## ⏳ To Do (easy → hard)

### Template Implementation (Priority Order)
**See [TEMPLATE_IMPLEMENTATION_PLAN.md](./TEMPLATE_IMPLEMENTATION_PLAN.md) for detailed steps**

1. [ ] Implement Classic template variant
   - Theme updates
   - Component creation
   - Integration
   - Testing

2. [ ] Implement Thunder template variant
   - Theme updates
   - Component creation
   - Integration
   - Testing

3. [ ] Implement Brickwork template variant
   - Theme updates
   - Component creation
   - Integration
   - Testing

4. [ ] Implement Sixers template variant
   - Theme updates
   - Component creation
   - Integration
   - Testing

5. [ ] Implement Two Column Classic template variant
   - Theme updates
   - Component creation
   - Integration (consider two-column layout)
   - Testing

6. [ ] Implement CNSW template variant
   - Theme updates
   - Component creation
   - Integration
   - Testing

7. [ ] Implement CNSW Private template variant
   - Theme updates
   - Component creation
   - Integration
   - Testing

### Additional Tasks
8. [ ] Create NoData module for empty state handling
   - (see TKT-2025-010 for details)

---

## 💡 Recommendations

- **Template Implementation**: Follow the comprehensive guide in [TEMPLATE_IMPLEMENTATION_PLAN.md](./TEMPLATE_IMPLEMENTATION_PLAN.md) for implementing remaining templates. The plan includes step-by-step checklists, theme requirements, and template-specific considerations.

- **Reuse Patterns**: All templates use the same typography components (TeamOfTheWeekPlayerName, TeamOfTheWeekTeam, TeamOfTheWeekType, TeamOfTheWeekStat). Only theme styling differs between templates.

- **Layout Consistency**: Maintain the single-row layout `[Logo] [Type, Player, Team] [Stats]` across all templates for consistency.

- **Stats Display**: The position-based stat display logic is shared and works correctly:
  - Batting positions → batting stats
  - Bowling positions → bowling stats
  - Top All-Rounder & 12th Man → both stats (two rows)

- **Theme Updates**: Each template needs the four TeamOfTheWeek typography styles added to its theme file. Adjust sizing, tracking, and weights to match template aesthetic.

- **Testing**: Use the testing checklist in TEMPLATE_IMPLEMENTATION_PLAN.md for each template implementation.

---

### Usage Notes

- Update this roadmap as tasks are completed
- Cross-reference tickets for detailed implementation plans
- Mark completed items and move complex discoveries into new tickets
