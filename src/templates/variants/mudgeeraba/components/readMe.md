# Folder Overview

Mudgeeraba components: Intro, Outro, Main, MainHeader, and Background components that extend BaseTemplate.

## Files

- `MudgeerabaIntro.tsx`: Intro sequence component
- `MudgeerabaOutro.tsx`: Outro sequence component
- `MudgeerabaMain.tsx`: Main content layout wrapper
- `MudgeerabaMainHeader.tsx`: Header component for main content
- `MudgeerabaBackground.tsx`: Background component wrapper (typically uses SelectTemplateBackground)

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses contexts from `../../../../core/context`
- Consumed by: `../index.tsx`

## Dependencies

- Internal: `../../../../core/context`, `../../../../components`
- External: Remotion, React
