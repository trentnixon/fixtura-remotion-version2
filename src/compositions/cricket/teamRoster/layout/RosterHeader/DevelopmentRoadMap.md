# Development Roadmap – RosterHeader

This file tracks progress, priorities, and recommendations for the RosterHeader components.

---

## ✅ Completed

- [x] Basic header components for account and opponent teams
- [x] Animation integration with AnimationContext
- [x] Team logo and name display functionality

---

## ⏳ To Do (easy → hard)

1. [ ] **Easy**: Create missing documentation files (DevelopmentRoadMap.md, Tickets.md)
   - (see TKT-2025-001 for details)
2. [ ] **Easy**: Restructure folder into home/away subfolders
   - (see TKT-2025-002 for details)
3. [ ] **Moderate**: Consolidate duplicate AccountTeam components
   - (see TKT-2025-003 for details)
4. [ ] **Moderate**: Extract common utilities (truncateText, shared types)
   - (see TKT-2025-004 for details)
5. [ ] **Moderate**: Standardize props interface across all header components
   - (see TKT-2025-005 for details)
6. [ ] **Complex**: Refactor to support configurable logo sizes and delays
   - (see TKT-2025-006 for details)
7. [ ] **Complex**: Add comprehensive JSDoc documentation
   - (see TKT-2025-007 for details)

---

## 💡 Recommendations

- Split AccountTeam.tsx into separate home/away components for better organization
- Create shared utilities folder for common functions like truncateText
- Implement consistent prop interfaces across all header components
- Add proper TypeScript types for logo configurations
- Consider creating a shared HeaderProps interface
- Fix dynamic Tailwind class generation issues
- Add unit tests for header components (following project pattern of JSON-based testing)

---

### Current Issues

- Duplicate code between AccountLogoInSubtleWrapper and AccountLogoNoWrapper
- Inconsistent prop interfaces between components
- Hardcoded values for delays and logo sizes
- Missing comprehensive documentation
- Dynamic Tailwind classes may not work properly
