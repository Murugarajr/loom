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

## M3.2 — Engineering verification pass (verified)
- Record: `docs/DESIGN.md` §17. Evidence: `docs/review/m3-2/`.
- Controls-keeper lifecycle: lock idempotency, microtask focus shift debouncing (no flicker), disconnect cleanup, and multi-instance isolation verified.
- `:has()` fallback: centre group suppression strictly relies on `:has()`; in browsers lacking `:has()`, centre controls persist (inherited Scaffold fallback), resulting in a known fallback caption collision defect at 240 px and 340 px.
- Aspect ratios: 16:9, 4:3, 21:9 verified across widths. At 340 px in 21:9 genuinely paused, centre play button is visible (340 px = 21.25rem ≥ 20rem) at 44×44 px with 12 px vertical clearance top and bottom; title is suppressed below 25rem.
- Core playback regressions pass in tested Chrome environment.
- No blocking defects found in tested Chrome scenarios. Manual fullscreen and physical-touch verification remain outstanding. Other browsers and platforms remain unverified unless explicitly listed.

## M4 — Public showcase and submission candidate (completed)
- Restrained public showcase page at `/` (`apps/preview/index.html`).
- Workbench preserved at `/workbench.html` with full frame communication and controls.
- Raw preview preserved at `/preview.html`.
- Reuses `createPlayer()` and skin bundle directly; zero skin duplication.
- Showcase includes identity, prominent player, three design notes, verification/limitations disclosure, and credits.
- Tested and verified in production preview (`dist/`); captures saved under `docs/review/m4/`.

## M4.1 — Showcase finalisation and production verification (completed)
- Resolved Mux playback ID discrepancy: confirmed `83EzHOvVzVN01AsrD01BCpiH02Pj3S8mfzBOu101w2nHC5s` is the actual and only media source across git history; earlier report of `x01bC...` was an assistant reporting error. Video, poster, title ("NASA Cosmic Dawn Trailer"), captions, and authored chapter cues all verified as belonging to this asset.
- Selected sharper poster: updated preview/showcase player mounting helper to request 1920px asset via `&width=1920`.
- Showcase-only initial controls hold: implemented `ShowcaseInitialHoldElement` using supported `requestControlsLock()` API. Reveals controls and timeline on initial arrival alongside poster and centre Play button, automatically releasing on media `playing` event while preserving focus-aware locks and normal idle auto-hide.
- Simplified public-facing copy: replaced developer phrases with "Built with Video.js 10." and interaction hint "Play the film. Drag the thread."; updated 3 design notes (Woven progress, Shuttle playhead, Focus-aware controls); updated verification disclosures.
- Complete production verification: verified direct loading of `/`, `/workbench.html`, `/preview.html`; playback advancement; seeking; caption cue display; chapter data integrity; workbench postMessage frame communication; keyboard focus retention; idle auto-hide; responsive layout (no overflow at 1440px and 375px); 0 console errors; 0 uncanceled network failures.
- Captured refreshed review evidence in `docs/review/m4-1/`.

## M5 — Final review and submission polish
- Final review across all entry points.
- Confirm media attribution and licensing before publication.

## M6 — Publish (only when asked)
- `npm run deploy <host>`; challenge submission materials.
