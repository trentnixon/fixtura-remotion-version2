# Club-Only Support Documentation Index

**Purpose:** Central index for all club-only implementation documentation

---

## 📚 Documentation Files

### 1. **How-To Guide** 📖

**File:** `how-to-add-club-only-support.md`

**Purpose:** Comprehensive guide explaining the pattern used for Basic template

**Contents:**

- Step-by-step implementation process
- Code examples and patterns
- Component mapping
- Key differences from weekend results
- Utilities reference

**Use When:** Learning the pattern or implementing a new template

---

### 2. **Extrapolation Plan** 🗺️

**File:** `club-only-extrapolation-plan.md`

**Purpose:** Detailed plan for implementing club-only support in remaining templates

**Contents:**

- Current status table
- Implementation order (priority)
- Detailed plans for each template
- Component replication checklist
- Estimated timeline
- Success criteria

**Use When:** Planning implementation across all templates

---

### 3. **Implementation Checklist** ✅

**File:** `club-only-implementation-checklist.md`

**Purpose:** Quick reference checklist for implementing each template

**Contents:**

- Per-template checklist
- Component mapping reference
- Code templates
- Verification steps
- Common issues & solutions

**Use When:** Actively implementing a template (keep open while coding)

---

### 4. **How-To Create Template** 📖

**File:** `how-to-create-single-result-template.md`

**Purpose:** Complete guide for creating single result templates with club-only support

**Contents:**

- Step-by-step implementation process
- Architecture overview
- Code examples and patterns
- Design decisions and rationale
- Common pitfalls and solutions
- Complete implementation checklist

**Use When:** Creating a new single result template from scratch

### 5. **Review Documentation** 🔍

**Files:**

- `club-only-review.md` - Detailed analysis of Basic implementation
- `club-only-improvements.md` - Summary of improvements made

**Purpose:** Understanding what was done and why

**Use When:** Reviewing the Basic implementation or understanding decisions

---

## 🎯 Quick Start Guide

### For New Implementations

1. **Start Here:** Read `how-to-create-single-result-template.md` ⭐ **NEW**

   - Complete guide for creating templates
   - Step-by-step process
   - Architecture overview
   - Code examples

2. **Understand Patterns:** Read `how-to-add-club-only-support.md`

   - Understand the pattern
   - Learn the key concepts
   - See code examples

3. **Plan Your Work:** Review `club-only-extrapolation-plan.md`

   - Check current status
   - See detailed plan for your template
   - Understand dependencies

4. **Implement:** Use `club-only-implementation-checklist.md`

   - Follow the checklist step-by-step
   - Use code templates
   - Verify as you go

5. **Reference:** Check `club-only-review.md` if needed
   - See how Basic was implemented
   - Understand design decisions
   - Learn from examples

---

## 📊 Template Status

| Template                | Status      | Documentation                             | Next Steps                  |
| ----------------------- | ----------- | ----------------------------------------- | --------------------------- |
| **Basic**               | ✅ Complete | `club-only-review.md`                     | N/A                         |
| **Classic**             | ✅ Complete | `how-to-create-single-result-template.md` | N/A                         |
| **Classic Two Columns** | ⏳ Pending  | `extrapolation-plan.md`                   | Follow checklist            |
| **CNSW**                | ⏳ Pending  | `extrapolation-plan.md`                   | Replicate PlayerStats first |
| **CNSW Private**        | ⏳ Pending  | `extrapolation-plan.md`                   | Check if can reuse CNSW     |
| **Sixers**              | ✅ Complete | Can reuse Classic component               | N/A                         |

---

## 🔗 Related Files

### Implementation Files

- `layout/MatchCard/card-Basic-ClubOnly.tsx` - Basic example ✅
- `controller/ResultSingleDisplay/display.tsx` - Display example ✅
- `layout/MatchCard/_utils/calculations.ts` - Utilities
- `types.tsx` - Type definitions

### Reference Files (Weekend Results)

- `../results/layout/MatchCard/card-*-clubOnly.tsx` - Reference implementations
- `../results/layout/Sections/PlayerStats/PlayerStats-clubOnly-*.tsx` - PlayerStats examples

---

## 📝 Documentation Updates

When implementing a new template:

1. ✅ Update status in `extrapolation-plan.md`
2. ✅ Add any special notes or deviations
3. ✅ Update this index if new docs created
4. ✅ Update component mapping in checklist

---

## 🎓 Learning Path

### Beginner

1. Read `how-to-add-club-only-support.md` (Overview section)
2. Review `club-only-review.md` (See what was done)
3. Look at `card-Basic-ClubOnly.tsx` (Code example)

### Intermediate

1. Read full `how-to-add-club-only-support.md`
2. Review `club-only-extrapolation-plan.md` for your template
3. Use `club-only-implementation-checklist.md` while coding

### Advanced

1. Review all documentation
2. Understand pattern variations
3. Implement template following checklist
4. Document any deviations or special cases

---

## ✅ Success Checklist

You're ready to implement when you:

- [ ] Understand the Basic template implementation
- [ ] Know which template you're implementing
- [ ] Have reviewed the extrapolation plan for that template
- [ ] Have the implementation checklist open
- [ ] Know which components need to be created/replicated
- [ ] Understand the utilities available

---

## 🚀 Next Steps

1. **Choose a template** from the extrapolation plan
2. **Review the detailed plan** for that template
3. **Open the checklist** for reference
4. **Start implementing** following the pattern
5. **Test thoroughly** before moving to next template

---

## 📞 Quick Reference

### Key Concepts

- **Club-Only:** Shows only club team's performance
- **Conditional Rendering:** Based on `isAccountClub` flag
- **Height Calculation:** Use `heights.asset` for single results
- **Delay Calculation:** Use `calculateDelays(0)` for single results

### Key Utilities

- `calculateSectionHeights(rowHeight)` - Calculate section heights
- `calculateDelays(delay)` - Calculate animation delays
- `getClubTeamPlayers(match)` - Extract club team players

### Key Components

- `PlayerStatsClubOnlyBasic` - Basic club-only stats
- `PlayerStatsClubOnlyCNSW` - CNSW club-only stats (needs replication)
- `PlayerStatsSingleTeamOnly` - Single team stats (can filter)

---

**Last Updated:** 2026-02-02
**Status:** Documentation Complete ✅
