@AGENTS.md

# LOOM — project guidance

LOOM is a custom Video.js 10 skin for the Contra Video.js Skins Design Challenge.
The generated `AGENTS.md` (imported above) is authoritative for the scaffold; this
section adds LOOM's own constraints. Plan: `docs/PLAN.md`.

## Required skills

Load these before changing anything player-related (they are installed in this
environment as the `videojs` plugin):

- `/videojs:videojs` — always, for any Video.js API, install, or docs question.
- `videojs:videojs-skin` — when changing the skin (`src/`).
- `videojs:videojs-ui` — when styling, polishing, or reviewing controls.

## Stack (as installed)

- `@videojs/html` **10.4.0** (HTML custom elements), pinned exactly. Created with
  `npx @videojs/cli@10.4.0 skin create loom --name LOOM --framework html --styling css --base scaffold --preset video --package-manager npm`
  (recorded in `skin.json`).
- Skin: plain CSS + TypeScript, started from **Scaffold**, preset **video** (on-demand).
- Workbench only: Vite 8, TypeScript 7, React 19 + Tailwind 4 + Base UI (the shell UI),
  `@videojs/mux-video` 10.4.0 (plays the demo HLS stream). None of these may leak into `src/`.
- Package manager: **npm** (`package-lock.json`).

## Commands

```sh
npm run dev         # workbench at http://localhost:5173/ ; preview alone at /preview.html
npm run typecheck   # tsc --noEmit — must pass
npm run build       # vite build → dist/ — must pass
npm run preview     # serve dist/
npm run deploy      # ONLY when explicitly asked (publishes publicly)
```

## Boundary: skin source vs. preview

- `src/` is the reusable skin and nothing else. Entry: `src/video/skin.ts` (element
  imports + icon registration), `src/video/skin.html` (markup), `src/video/skin.css`,
  tokens in `src/styles/`. It must never import from `apps/preview/`.
- `src/video/skin.html` keeps the `<!-- Add a compatible media component here. -->`
  placeholder; the host app (or the workbench) injects the media element there.
- `apps/preview/` is the workbench. Don't change it unless asked, except
  `apps/preview/src/frame/player.ts` to change the media the preview plays.

## API authority

1. Installed docs: `node_modules/@videojs/html/docs/llms.txt` (v10.4.0, offline).
2. Installed types: `node_modules/@videojs/*/dist`.
3. Live docs `https://videojs.org/docs/framework/html/llms.txt` only if 1–2 lack it.

Never guess an API. Every import must match a reference page's Import section or a
key in the package `exports`.

## Hard constraints

- **No Video.js 8 patterns**: no `video.js` npm package, `videojs()`, `data-setup`,
  `class="video-js"`, `registerPlugin`, options objects, or `controls` on the media element.
- **No backend, authentication, database, or AI features.** Static front end only.
- **Preserve accessibility infrastructure** from Scaffold: `<media-hotkey>` set,
  `<media-gesture>` set, `<media-error-dialog>`, `<media-status-announcer>`, indicators,
  ARIA labels, focus order = visual order, visible focus. Replace only with equivalents.
- Style state via `data-*` attributes the components set; size with container queries;
  motion through tokens so reduced-motion still collapses it.
- Keep `id` / `trigger` / `commandfor` pairs unique and matched when editing markup.
- No fake progress or simulated playback; verify behaviour against the real media.
- `cli`: when a `@videojs/cli` command is needed, pin it to `@10.4.0` (matches `skin.json`).
