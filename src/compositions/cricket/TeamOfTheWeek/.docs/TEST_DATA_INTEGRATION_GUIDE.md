# Test Data Integration Guide

This guide explains how to add and hook test data samples into the Fixtura Remotion system, using the TeamOfTheWeek asset as an example.

---

## Overview

Test data serves two purposes:
1. **Development**: Enables preview and testing in Remotion Studio
2. **Reference**: Defines the expected data structure for production renders

The system uses JSON files that follow a specific structure and must be registered in the test data index.

---

## Test Data File Structure

### Location

Test data files are stored in:
```
testData/samples/[Sport]/[Sport]_[AssetName].json
```

**Example:**
```
testData/samples/Cricket/Cricket_TeamOfTheWeek.json
```

### Required JSON Structure

Every test data file must include these top-level keys:

```json
{
  "data": [],              // Your asset-specific data
  "asset": {},             // Asset metadata
  "render": {},            // Render information
  "account": {},           // Account information
  "timings": {},           // Frame timing configuration
  "frames": [],            // Frame markers (optional)
  "videoMeta": {},         // Video metadata and configuration
  "errors": []             // Error tracking
}
```

---

## Detailed Field Breakdown

### 1. `data` (Array)

Your asset's main data. Structure varies by asset type.

**TeamOfTheWeek Example:**
```json
"data": [
  {
    "category": "Batter",
    "categoryDetail": {
      "type": "Batter",
      "position": "topscorer"
    },
    "rank": 1,
    "player": "christian leopard  (vc)",
    "primaryTeam": "Napier Tech Complete Flooring Prems",
    "club": {
      "name": "Napier Tech Complete Flooring Prems",
      "logo": {
        "url": "https://example.com/logo.png",
        "width": 1181,
        "height": 1181
      }
    },
    "batting": {
      "runs": 79,
      "balls": 39,
      "fours": 6,
      "sixes": 6,
      "strikeRate": 202.56,
      "notOut": true,
      "team": "Team Name"
    },
    "rankings": {
      "topRunScorer": 3,
      "highestStrikeRate": 11
    }
  }
  // ... more items
]
```

### 2. `asset` (Object)

Metadata about the asset itself:

```json
"asset": {
  "assetID": 69,
  "assetTypeID": 3,
  "assetCategoryID": 1,
  "assetsLinkID": "5fdca42e4bc60235b0d7617c1d66ffd6962fbec184919598dbee2be14e3ba0ae"
}
```

### 3. `render` (Object)

Information about the render:

```json
"render": {
  "schedulerId": 323,
  "renderId": 8661
}
```

### 4. `account` (Object)

Account information:

```json
"account": {
  "accountId": 436
}
```

### 5. `timings` (Object) ⚠️ CRITICAL

Defines frame durations for each section. These control the video timing.

```json
"timings": {
  "FPS_MAIN": 1005,        // Main content frames
  "FPS_INTRO": 90,         // Intro duration (3 seconds at 30fps)
  "FPS_OUTRO": 30,         // Outro duration (1 second at 30fps)
  "FPS_LADDER": 0,         // Asset-specific (if needed)
  "FPS_SCORECARD": 0,      // Asset-specific (if needed)
  "FPS_PREFORMANCECARD": 180  // Asset-specific (if needed)
}
```

**Key Points:**
- At 30 FPS: 30 frames = 1 second
- `FPS_MAIN` should accommodate all screens/items
- Total duration = FPS_INTRO + FPS_MAIN + (FPS_OUTRO if sponsors included)

### 6. `frames` (Array)

Frame markers for specific events (optional):

```json
"frames": [45, 180, 345, 510, 675, 840, 1005]
```

### 7. `videoMeta` (Object) ⚠️ CRITICAL

Contains all video configuration. This is the most complex and important section.

#### 7.1 `videoMeta.club`

Club/organization information:

```json
"club": {
  "logo": {
    "hasLogo": true,
    "url": "https://fixtura.s3.ap-southeast-2.amazonaws.com/logo.jpg",
    "width": 4167,
    "height": 4167
  },
  "name": "Hawke's Bay Cricket Association",
  "sport": "Cricket",
  "sponsors": {
    "primary": [],
    "default": {}
  },
  "IsAccountClub": false
}
```

#### 7.2 `videoMeta.video.metadata` ⚠️ CRITICAL

**THIS MUST INCLUDE `compositionId`** - the most critical field for routing:

```json
"metadata": {
  "title": "Team of the Week",
  "titleSplit": ["Team of the Week"],
  "videoTitle": "Team of the Week",
  "compositionId": "CricketTeamOfTheWeek",  // MUST MATCH EXPORT NAME
  "assetId": 69,
  "assetTypeId": 3,
  "frames": [],
  "includeSponsors": false
}
```

**Critical Rule:**
`compositionId` MUST EXACTLY MATCH the export name in `src/compositions/cricket/index.tsx`

Example:
- JSON: `"compositionId": "CricketTeamOfTheWeek"`
- Export: `export const CricketTeamOfTheWeek = { ... }`

#### 7.3 `videoMeta.video.appearance`

Visual theme configuration:

```json
"appearance": {
  "theme": {
    "dark": "#111",
    "white": "#FFF",
    "primary": "#000000",
    "secondary": "#ffffff"
  },
  "template": "Basic"  // Template variant name
}
```

#### 7.4 `videoMeta.video.media`

Media assets (images, audio):

```json
"media": {
  "HeroImage": {
    "url": "",
    "ratio": "",
    "width": 0,
    "height": 0,
    "AgeGroup": "",
    "AssetType": "",
    "markerPosition": ""
  },
  "audio": {
    "url": "https://fixtura.s3.ap-southeast-2.amazonaws.com/audio.mp3",
    "audioOption": null
  }
}
```

#### 7.5 `videoMeta.video.contentLayout` ⚠️ IMPORTANT

Controls pagination and items per screen:

```json
"contentLayout": {
  "divideFixturesBy": {
    "CricketLadder": 1,
    "CricketRoster": 1,
    "CricketResults": 2,
    "CricketUpcoming": 3,
    "CricketResultSingle": 1,
    "CricketBattingPerformances": 5,
    "CricketBowlingPerformances": 5,
    "CricketTeamOfTheWeek": 2  // YOUR ASSET: items per screen
  }
}
```

**Key Point:**
Your composition should read this value to determine how many items to show per screen.

#### 7.6 `videoMeta.video.templateVariation`

Advanced template configuration:

```json
"templateVariation": {
  "useBackground": "Texture",  // Background type
  "mode": "lightAlt",          // Color mode
  "category": {
    "slug": "Basic",
    "name": "Basic",
    "divideFixturesBy": { /* can override contentLayout */ },
    "bundleAudio": { /* audio bundle config */ }
  },
  "video": {
    "url": null,
    "fallbackUrl": null,
    "position": "left",
    "size": "cover",
    "loop": null,
    "muted": true,
    "overlay": {
      "color": "rgba(0,0,0,0.5)",
      "opacity": 0.7
    },
    "useOffthreadVideo": null,
    "volume": 0.8,
    "playbackRate": null
  },
  "image": {
    "url": null,
    "ratio": null,
    "width": null,
    "height": null,
    "type": "pan",
    "direction": "left",
    "overlayStyle": "vignette",
    "gradientType": "linear",
    "overlayOpacity": 0.3
  },
  "palette": "primaryOnWhite",
  "gradient": {
    "type": "primary",
    "direction": "VERTICAL"
  },
  "noise": {
    "type": "floatingParticles"
  },
  "pattern": {
    "type": "dots",
    "animation": "none",
    "scale": 0.75,
    "rotation": null,
    "opacity": 0.35,
    "animationDuration": null,
    "animationSpeed": 0.8
  },
  "particle": {
    "type": "lines",
    "particleCount": "300",
    "speed": 0.8,
    "direction": "up",
    "animation": "scale"
  },
  "texture": {
    "name": "Grass",
    "url": "https://fixtura.s3.ap-southeast-2.amazonaws.com/texture.png",
    "repeat": "cover",
    "scale": "100%",
    "overlay": {
      "opacity": 0.8,
      "blendMode": "multiply"
    }
  }
}
```

### 8. `errors` (Array)

Track any errors (usually empty for test data):

```json
"errors": []
```

---

## Registration in System

### Step 1: Import the JSON File

**File:** `testData/index.ts`

Add your import at the top with other Cricket imports:

```typescript
// Cricket
import CricketLadder from "./samples/Cricket/Cricket_Ladder.json";
import CricketResults from "./samples/Cricket/Cricket_Results.json";
// ... other imports
import CricketTeamOfTheWeek from "./samples/Cricket/Cricket_TeamOfTheWeek.json";
```

### Step 2: Add to testDatasets Object

Add your dataset to the `testDatasets` record:

```typescript
export const testDatasets: DatasetRecord = {
  // Cricket
  CricketLadder: CricketLadder,
  CricketUpcoming: CricketUpcoming,
  CricketResults: CricketResults,
  CricketResultSingle: CricketResultSingle,
  CricketTop5Batting: CricketTop5Batting,
  CricketTop5Bowling: CricketTop5Bowling,
  CricketBattingPerformances: CricketBattingPerformances,
  CricketBowlingPerformances: CricketBowlingPerformances,
  CricketRoster: CricketRoster,
  CricketTeamOfTheWeek: CricketTeamOfTheWeek,  // ADD THIS

  // AFL
  AFLLadder: AFLLadder,
  // ... etc
};
```

### Step 3: Add to datasetsByCategory

Add your dataset to the category organization:

```typescript
export const datasetsByCategory: DatasetCategories = {
  Cricket: [
    { id: "CricketLadder", name: "Ladder" },
    { id: "CricketUpcoming", name: "Upcoming Fixtures" },
    { id: "CricketResults", name: "Weekend Results" },
    { id: "CricketResultSingle", name: "Single Game Result" },
    { id: "CricketTop5Batting", name: "Top 5 Batting" },
    { id: "CricketTop5Bowling", name: "Top 5 Bowling" },
    { id: "CricketBattingPerformances", name: "Batting Performances" },
    { id: "CricketBowlingPerformances", name: "Bowling Performances" },
    { id: "CricketRoster", name: "Team Roster" },
    { id: "CricketTeamOfTheWeek", name: "Team of the Week" },  // ADD THIS
  ],
  AFL: [
    // ... AFL datasets
  ],
  // ... other sports
};
```

---

## How Test Data is Used

### Development Mode (DevelopmentRoot.tsx)

1. Reads all datasets from `testDatasets`
2. Reads sport categories from `datasetsByCategory`
3. For each template variant and dataset:
   - Processes the dataset with `processDatasetForTemplate()`
   - Calculates duration with `calculateDuration()`
   - Registers a Remotion composition with ID: `${templateId}-${variant}-${datasetID}`

**Example Generated Composition IDs:**
- `Basic-Solid-CricketTeamOfTheWeek`
- `Basic-Texture-CricketTeamOfTheWeek`
- `BrickWork-Solid-CricketTeamOfTheWeek`

### Production Mode (ProductionRoot.tsx)

1. Receives complete dataset via `getInputProps()`
2. Extracts `compositionId` from `data.videoMeta.video.metadata.compositionId`
3. Uses compositionId to look up the correct composition export
4. Renders with provided data

**Flow:**
```
JSON data.videoMeta.video.metadata.compositionId: "CricketTeamOfTheWeek"
        ↓
Routing finds: cricket/index.tsx → export const CricketTeamOfTheWeek
        ↓
Selects template variant based on: data.videoMeta.video.appearance.template
        ↓
Renders: CricketTeamOfTheWeek.basic (or other variant)
```

---

## Common Test Data Issues

### Issue 1: Composition Not Found

**Symptom:** Composition doesn't appear in Studio or fails to render

**Causes:**
1. `compositionId` in JSON doesn't match export name
2. Export not added to cricket/index.tsx
3. Test data not imported/registered in testData/index.ts

**Solution:**
- Verify: JSON `compositionId` === Export name (case-sensitive)
- Check both testData/index.ts and cricket/index.tsx

### Issue 2: Incorrect Timing

**Symptom:** Video is too short/long, cuts off, or has awkward pauses

**Causes:**
1. `FPS_MAIN` doesn't account for all screens
2. Missing calculation for multi-screen content
3. Incorrect frame calculations in template

**Solution:**
- Calculate: `FPS_MAIN = totalScreens × framesPerScreen`
- Ensure template Sequence durations add up correctly
- At 30 FPS: 30 frames = 1 second

### Issue 3: Wrong Items Per Screen

**Symptom:** Too many or too few items displayed at once

**Causes:**
1. Not reading `contentLayout.divideFixturesBy` correctly
2. Hardcoded item counts in components

**Solution:**
```typescript
const itemsPerScreen =
  videoMeta.video.contentLayout.divideFixturesBy.CricketTeamOfTheWeek || 5;
```

### Issue 4: Data Type Errors

**Symptom:** Runtime errors when accessing data properties

**Causes:**
1. JSON structure doesn't match TypeScript types
2. Missing optional chaining for nullable fields
3. Incorrect type assertions

**Solution:**
- Use type guards: `if (player.batting) { ... }`
- Add optional chaining: `player.club?.logo?.url`
- Validate JSON against types

### Issue 5: Missing Assets (Images, Audio)

**Symptom:** Broken images, no audio, console errors

**Causes:**
1. Invalid or missing URLs in JSON
2. CORS issues with external URLs
3. Network connectivity problems

**Solution:**
- Use valid, accessible URLs
- Test URLs in browser first
- Provide fallback/placeholder assets

---

## Testing Your Test Data

### Validation Checklist

- [ ] JSON is valid (no syntax errors)
- [ ] All required top-level keys present
- [ ] `compositionId` matches export name exactly
- [ ] `timings.FPS_MAIN` accommodates all content
- [ ] `contentLayout.divideFixturesBy` set for your asset
- [ ] URLs are valid and accessible
- [ ] Data structure matches TypeScript types
- [ ] Imported in testData/index.ts
- [ ] Added to testDatasets object
- [ ] Added to datasetsByCategory
- [ ] Composition appears in Studio
- [ ] Composition renders without errors

### Manual Testing Steps

1. **Validate JSON:**
   ```bash
   # Use a JSON validator or:
   node -e "JSON.parse(require('fs').readFileSync('path/to/file.json'))"
   ```

2. **Start Studio:**
   ```bash
   npm run dev
   ```

3. **Find Your Composition:**
   - Look for: `Basic-Solid-Cricket[AssetName]`
   - Should appear in composition list

4. **Test Rendering:**
   - Click composition
   - Check console for errors
   - Verify data displays correctly
   - Check timing is appropriate

5. **Test Edge Cases:**
   - Modify JSON to have 0 items
   - Modify JSON to have 1 item
   - Modify JSON to have many items
   - Remove optional fields

---

## Best Practices

### 1. Consistent Naming

- File: `Cricket_[AssetName].json` (PascalCase with underscores)
- Import: `Cricket[AssetName]` (no underscores)
- Key: `"Cricket[AssetName]"` (matches import)
- Display: `"[Human Readable Name]"`

### 2. Real-ish Data

Use realistic data in test files:
- Actual player/team names
- Reasonable stats/numbers
- Valid image URLs
- Proper formatting

### 3. Comments in JSON

While JSON doesn't support comments, you can use a `_comments` field:
```json
{
  "_comments": "TeamOfTheWeek test data - 10 players across 4 categories",
  "data": [ ... ]
}
```

### 4. Version Control

- Commit test data files
- Document changes in commit messages
- Keep test data in sync with type changes

### 5. Multiple Test Files (Optional)

For complex assets, create multiple test files:
```
Cricket_TeamOfTheWeek.json          // Standard case
Cricket_TeamOfTheWeek_Empty.json    // Edge case: no data
Cricket_TeamOfTheWeek_Single.json   // Edge case: 1 player
Cricket_TeamOfTheWeek_Max.json      // Edge case: maximum data
```

Register each separately for comprehensive testing.

---

## Quick Reference

### Minimal Required JSON Structure

```json
{
  "data": [ /* your data */ ],
  "asset": {
    "assetID": 1,
    "assetTypeID": 1,
    "assetCategoryID": 1,
    "assetsLinkID": "hash"
  },
  "render": {
    "schedulerId": 1,
    "renderId": 1
  },
  "account": {
    "accountId": 1
  },
  "timings": {
    "FPS_MAIN": 300,
    "FPS_INTRO": 90,
    "FPS_OUTRO": 30
  },
  "frames": [],
  "videoMeta": {
    "club": {
      "name": "Club Name",
      "sport": "Cricket",
      "logo": { "hasLogo": false, "url": "", "width": 0, "height": 0 }
    },
    "video": {
      "metadata": {
        "title": "Title",
        "compositionId": "CricketAssetName",
        "assetId": 1,
        "assetTypeId": 1
      },
      "appearance": {
        "theme": {
          "primary": "#000",
          "secondary": "#fff"
        },
        "template": "Basic"
      },
      "contentLayout": {
        "divideFixturesBy": {
          "CricketAssetName": 5
        }
      },
      "templateVariation": {
        "useBackground": "Solid",
        "mode": "light"
      }
    }
  },
  "errors": []
}
```

---

## Summary

**Key Takeaways:**

1. **Three-Step Registration:**
   - Create JSON file in `testData/samples/[Sport]/`
   - Import in `testData/index.ts`
   - Add to both `testDatasets` and `datasetsByCategory`

2. **Critical Fields:**
   - `videoMeta.video.metadata.compositionId` (must match export)
   - `timings.FPS_MAIN` (must accommodate all content)
   - `contentLayout.divideFixturesBy.[AssetName]` (items per screen)

3. **Naming Convention:**
   - `compositionId` must EXACTLY match export name
   - Case-sensitive, no typos allowed

4. **Testing:**
   - Validate JSON syntax
   - Verify in Studio
   - Test edge cases

---

**Created:** 2025-12-17
**Last Updated:** 2025-12-17
**Example Asset:** TeamOfTheWeek (CricketTeamOfTheWeek)

