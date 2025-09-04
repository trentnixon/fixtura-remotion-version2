# Development Roadmap – Texture Background

## ✅ Completed

- [x] Capture plan and scaffold roadmap

## ⏳ To Do (easy → hard)

1. Define `TextureBackgroundProps` and extend `BackgroundProps` union
2. Add `TEXTURE` type constant and defaults in `config/constants.ts`
3. Implement `TextureBackground` component (image + multiply color overlay)
4. Add asset resolution (public `textures/` by `name` or direct `src`)
5. Theme integration for default overlay color and sensible fallbacks
6. Integrate into registry: `BackgroundComponents.Texture` and `SelectTemplateBackground`
7. Create `variants/Textures/README.md` and update `backgrounds/README.md`
8. Add sample `templateVariation` in test data and verify visually

## 💡 Recommendations

- Support `repeat`, `scale` (maps to `backgroundSize`), `position`, and `size`
- Default `repeat: 'repeat'`, `blendMode: 'multiply'`, and overlay opacity ~0.35
- Accept `{ url?: string; name?: string }` for texture source; prefer explicit file extension
- Consider animation of texture offset/scale in future (parallax/ken-burns)
- Optionally expose alternative blend modes later (`overlay`, `soft-light`, etc.)
