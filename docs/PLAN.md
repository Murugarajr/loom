# LOOM — implementation plan

Custom Video.js 10 (HTML, `@videojs/html` 10.4.0) skin, plain CSS + TypeScript,
started from Scaffold. See `CLAUDE.md` for constraints.

## M1 — Foundation (accepted)
- Scaffold via `@videojs/cli@10.4.0 skin create` (HTML / CSS / Scaffold / video / npm).
- Verify typecheck + build; verify real playback and core controls in the workbench.
- Add `CLAUDE.md` guidance and this plan. No styling changes.

## M2 — Design spec (approved)
- `docs/DESIGN.md`: source map, tokens + contrast checks, compositions (wide / narrow /
  fullscreen), timeline geometry and layering, control states, captions, reduced-motion
  and forced-colors, decorative vs interactive, M3 file map, decisions D1–D5, risks R1–R7.
- No changes to `src/` or `apps/preview/`.

## M3 — Tokens, plate and thread (implemented; awaiting visual review)
- Record: `docs/DESIGN.md` §15. Screenshots: `docs/review/m3/`.
- Follow `docs/DESIGN.md` §12 step order: tokens first (`themes/scaffold.css`,
  `video/theme.css`, `video/captions.css`), then rules in `src/video/skin.css` in place.
- Timeline: same slider elements/variables; 24 px hit area (32 px coarse); shuttle on
  pseudo-elements; forced-colors shuttle.
- Empty generated blocks kept (hook purpose unconfirmed); no appended override stylesheet.
- `skin.html`: PiP + fullscreen moved to the bottom-right group (D1 approved).
- Verified: typecheck, build, widths 240–960, captions (real source), menus, focus,
  forced colors and reduced motion (emulated). Not yet tested: RTL, fullscreen,
  real Windows High Contrast, touch devices, screen readers.

## M3.1 — Visual refinement and interaction stabilisation (implemented; awaiting review)
- Record: `docs/DESIGN.md` §16. Screenshots: `docs/review/m3-1/`.
- Centre group only before playback / paused / ended; controls lock during keyboard focus and open popups
  (`requestControlsLock()`); paired-thread timeline; thinner buffer; intentional disabled cast; quieter title.
- Not yet tested: fullscreen, physical touch, RTL, real Windows High Contrast, screen-reader output.

## M4 — Controls, motion, and icons
- Style each control via `data-*` state; keep the Scaffold icon family unless a redraw is approved.
- Motion via tokens; confirm reduced-motion collapse.
- Any custom behaviour in TypeScript must use documented APIs (`PlayerController`).

## M5 — Verification and polish
- `typecheck` + `build`; workbench pass across width, aspect ratio, light/dark,
  RTL, languages, autoplay/muted/loop.
- Keyboard-only pass, focus visibility, contrast over video, error dialog,
  announcer text; a manual screen-reader check (VoiceOver) recorded honestly.
- Compare against `docs/DESIGN.md`; screenshots.

## M6 — Publish (only when asked)
- `npm run deploy <host>`; challenge submission materials.
