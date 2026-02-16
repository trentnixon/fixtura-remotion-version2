# Folder Overview

Plays a video as the composition background with optional overlay. Supports OffthreadVideo and context-bound usage.

## Files

- **`VideoBackground.tsx`**: processVideoConfig merges props with templateVariation; selects Video vs OffthreadVideo; renders overlay when specified; VideoBackgroundWithContext binds templateVariation from VideoDataContext

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/VideoDataContext`, `core/context/ThemeContext`
- Consumed by: BackgroundComponents.Video, SelectTemplateBackground

## Dependencies

- Internal: `core/context`
- External: React, Remotion (Video, OffthreadVideo)
