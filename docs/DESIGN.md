# LOOM — visual specification

> *Every film, a thread.*

Status: **M2 approved; M3 implemented (see §15 for what changed from this spec).**
Every selector, attribute and variable named here exists in this project's source
(`src/video/skin.css`, `src/video/skin.html`, `src/styles/**`) or in the installed
`@videojs/html` 10.4.0 reference docs. Values marked **derived** follow from the agreed
direction and were not asked about.

---

## 1. Principles

1. **The picture leads.** The video stays rectangular (`--media-video-border-radius: 0`),
   uncropped (`object-fit: contain`), and undimmed by default. Controls only appear when
   needed and leave it alone.
2. **Precision instrument.** Opaque ivory plates, square corners, hairline edges,
   tabular numerals, one icon set. Nothing glows, floats in glass, or wobbles.
3. **Editorial restraint.** Two neutrals and one accent. Vermilion is reserved for
   *progress* (the played thread) and *focus*. It is never decoration.
4. **The thread is the only metaphor.** The weaving idea lives in the timeline
   (thread, backing strand, shuttle). Everything else stays a conventional player.
5. **Behaviour is untouched.** The Scaffold markup, components, hotkeys, gestures,
   error dialog and status announcer stay as they are. LOOM is a token and CSS pass.

---

## 2. Source map (what exists today)

### Files

| Concern | File | Notes |
|---|---|---|
| Theme tokens (all skins) | `src/styles/themes/theme.css` | `@layer base.theme`; defines `--media-*` defaults, motion durations, `--media-spacing`, fullscreen `--media-scale` steps |
| Scaffold token overrides | `src/styles/themes/scaffold.css` | `@layer base.preset`; `[data-theme="scaffold"]` colours, radii 0, no shadows/blur; forced-colors and reduced-transparency remaps |
| Preference collapse | `src/styles/themes/preferences.css` | `@layer base.preferences`; reduced-motion zeroes every duration/offset token; forced-colors ring/border |
| Video preset tokens | `src/styles/video/theme.css` | scrims, `--media-caption-controls-y` (Scaffold: `spacing * -20`) |
| Captions placement | `src/styles/video/captions.css` | `video::-webkit-media-text-track-container` translate by `--media-caption-track-y` when `[data-controls-visible]` |
| Base reset / layers | `src/styles/base.css` | declares layer order, registers `--media-slider-fill` / `--media-slider-buffer` as `<percentage>` |
| All component rules | `src/video/skin.css` (2,052 lines) | `@layer components`, every block scoped `@scope (.media-skin[data-theme="scaffold"][data-preset="video"])` |
| Markup | `src/video/skin.html` | `<media-container class="media-skin media-container media-video" data-theme="scaffold" data-preset="video">` |
| Elements + icons | `src/video/skin.ts` | side-effect imports; `registerIcons('scaffold', …)` from `@videojs/html/icons/scaffold` |
| Preview-only globals | `src/skin.css` | empty, loaded only by the workbench |

### Component → selectors → state

| Area | Elements / classes (from `skin.html`) | State hooks (documented) | Rules in `skin.css` |
|---|---|---|---|
| Player frame | `media-container.media-skin.media-container.media-video` | container sets `data-controls-visible`; `:fullscreen` on `.media-skin`; container query name `media-root` | L2008–2052 |
| Controls layer | `media-controls-content.video-controls-content`, `media-controls-backdrop.video-controls-backdrop` | `data-visible`, `data-started`, `data-user-active` (controls.md) | L1451–1722, L1930–1951 |
| Bottom bar | `div.video-controls-bottom.video-controls-video-bottom` → `.video-controls-slider-row` + `media-controls-group.video-controls-row` (`.video-controls-start`, `.video-controls-group`) | hidden via `.video-controls-content:not([data-visible])` | L1452–1483, L1632–1662 |
| Top bar | `media-controls-group.video-controls-top`: `media-title.media-title`, airplay, cast, pip, fullscreen buttons | `data-started`; title `data-visible` | L1664–1707, L1891–1928 |
| Centre | `.video-controls-center` inside `media-buffering-indicator.video-controls-buffering`: seek −10, `.video-controls-center-play`, seek +10 | centre hides when buffering `[data-visible]`; seek hidden before start, on coarse pointers, and `< 22.5rem` | L1485–1630, L1978–2006 |
| Time slider | `media-time-slider.media-time-slider` → `media-time-slider-chapters` › template `.media-time-slider-chapter` › `media-slider-track.media-time-slider-track` › `.media-time-slider-buffer`, `.media-time-slider-fill`; `media-slider-thumb.media-time-slider-thumb`; `media-slider-preview.media-time-slider-preview` | `data-dragging`, `data-pointing`, `data-interactive`, `data-seeking`, `data-disabled`; vars `--media-slider-fill`, `--media-slider-buffer`, `--media-slider-pointer`, `--media-slider-chapter-start/end`; **`role="slider"` is on the thumb** (verified in M1) | L950–1225 |
| Buttons | `.media-button` (+ `.media-play-button`, `.media-mute-button`, `.media-fullscreen-button`, …) | `aria-expanded`, `aria-disabled`, `data-hidden`, `data-paused`, `data-ended`, `data-started`, `data-muted`, `data-volume-level`, `data-fullscreen`, `data-active` (captions), `data-pip` | L3–99, L1286–1335, L1828–1889 |
| Icons | `media-icon family="scaffold"`, `.media-button-icon`, `.media-button-icon-base` (4.5 × spacing = 18 px) | swapped by `display` on parent `data-*` | L583–613, L1287–1313 |
| Tooltips | `media-tooltip.media-popup.media-popup-safe-area.media-tooltip-popup`, `.media-tooltip-shortcut` | `data-open`, `data-side`, `data-align`, `data-starting-style`, `data-ending-style`; vars `--media-tooltip-side-offset` | L456–580, L1841–1845 |
| Menus | `media-menu.media-menu-popup` › `media-menu-content.media-menu-content` › `media-menu-item.media-menu-item` / `media-menu-radio-item.media-menu-radio-item`, `.media-menu-hint`, `.media-menu-indicator`, `.media-menu-separator` | `data-highlighted`, `data-submenu`, `data-child-open`, `aria-checked`, `data-availability` | L615–919 |
| Volume | `media-volume-popover.media-volume-popover-popup` › `media-volume-slider.media-volume-slider` (vertical) | `data-disabled`; `--media-slider-fill` | L1337–1449 |
| Time | `media-time-group.media-time-group`: `.media-time-toggle`, `.media-time-current-value`, `.media-time-separator`, `.media-time-duration-value` | `data-unavailable`, `data-disabled`; layout switches at `media-root (width >= 20rem)` | L1724–1814 |
| Captions | native track rendering via `video::-webkit-media-text-track-container`; `media-captions-button` | `data-active`, `data-hidden` | `captions.css`; L1239–1256 |
| Loading | `media-buffering-indicator.media-buffering-indicator` + spinner icon | `data-visible` (after delay); `--media-spinner-animation` | L409–453 |
| Error | `media-error-dialog` › `.media-dialog-backdrop`, `.media-dialog-popup` (`role="alertdialog"`), `.media-dialog-title`, `.media-dialog-description`, `.media-dialog-close` | `data-open`, `data-scope`, `data-starting-style`, `data-ending-style` | L101–183 |
| Announcements | `media-status-announcer.media-status-announcer` (`role="status"`, visually hidden) | text content only | L348–357 |
| Visual HUD | `.media-indicator-group` (`aria-hidden="true"`): volume, status, seek indicators | `data-level`, `data-status`, `data-direction` | L185–346 |
| Responsive | `@container media-root` at `< 15rem`, `< 20rem / >= 20rem`, `< 22.5rem`; `(pointer: coarse)`; fullscreen scale steps at 1280/1536/1920 px viewport | | throughout |

---

## 3. Colour tokens

LOOM keeps the **public** `--media-*` contract working (including `--media-accent-color`,
`--media-accent-text-color`, `--media-font-family`, `--media-border-radius`) and adds a
small `--loom-*` palette that the semantic `--media-*` tokens point at.

### Palette (raw)

| Token | Value | Role |
|---|---|---|
| `--loom-ivory` | `#F4EFE6` | control plates, tooltips, menus, dialogs |
| `--loom-ivory-hover` | `#E8E1D4` | hover/highlight fill on ivory (**derived**) |
| `--loom-ivory-press` | `#DDD4C4` | pressed fill, shortcut chip `#E3DACB` (**derived**) |
| `--loom-graphite` | `#22201D` | text, icons, shuttle |
| `--loom-graphite-2` | `#5B554D` | secondary text (duration, separator, menu hints) |
| `--loom-track` | `#857C6E` | unplayed timeline band, volume track |
| `--loom-strand` | `#2E2B27` | buffered backing strand |
| `--loom-vermilion` | `#C4391A` | played thread, focus ring, checked indicator |
| `--loom-hairline` | `rgb(34 32 29 / 0.14)` | plate edge, menu separators (decorative) |

### Semantic mapping (edits to `src/styles/themes/scaffold.css`, `base.preset` layer)

| Existing token | Scaffold today | LOOM |
|---|---|---|
| `--media-foreground` | `white` | `var(--loom-ivory)`: text *over video* (seek labels, indicators) |
| `--media-background` | `transparent` | unchanged (buttons inside plates stay transparent) |
| `--media-popover` / `--media-popover-foreground` | `black` / `white` | `var(--loom-ivory)` / `var(--loom-graphite)` |
| `--media-accent` / `--media-primary` | `--media-accent-color` → white | `var(--media-accent-color, var(--loom-vermilion))` |
| `--media-accent-foreground` / `--media-primary-foreground` | black | `var(--media-accent-text-color, var(--loom-ivory))` |
| `--media-muted` | `#404040` | `var(--loom-track)` |
| `--media-ring` | `var(--media-accent)` | `var(--media-accent)` (vermilion), drawn with an ivory halo (§7) |
| `--media-button-highlight` | `rgb(255 255 255 / .2)` | `var(--loom-ivory-hover)` |
| `--media-default-accent-color` | `white` (theme.css) | not edited. LOOM sets its fallback through `--media-accent` instead |
| `--media-font-family` | inherit | system stack (§4) |

New, LOOM-owned semantic tokens: `--loom-plate` (= ivory), `--loom-plate-foreground`
(= graphite), `--loom-plate-muted-foreground` (= graphite-2), `--loom-plate-edge`
(= hairline), `--loom-thread-played` (= `--media-accent`), `--loom-thread-track`,
`--loom-thread-strand`, `--loom-shuttle` (= graphite).

**Both colour schemes use the same ivory controls.** The `videojs-ui` skill defaults to
dark controls because translucent controls depend on the picture behind them. LOOM's
plates are **opaque**, so their text and icon contrast doesn't depend on the frame.
The workbench's light/dark toggle changes the page, not the player.

### Contrast checks performed (WCAG 2.x relative-luminance formula)

| Pair | Ratio | Requirement | Result |
|---|---|---|---|
| graphite text on ivory | 14.19 | 4.5 (text) | pass |
| graphite text on ivory-hover | 12.50 | 4.5 | pass |
| graphite-2 (duration, hints) on ivory | 6.43 | 4.5 | pass |
| graphite-2 on ivory-hover | 5.66 | 4.5 | pass |
| graphite on shortcut chip `#E3DACB` | 11.73 | 4.5 | pass |
| vermilion played thread on ivory | 4.65 | 3 (non-text) | pass |
| unplayed track `#857C6E` on ivory | 3.59 | 3 | pass (`#A39A8B` was tried first: 2.43, rejected) |
| buffered strand `#2E2B27` on track | 3.42 | 3 | pass |
| graphite shuttle on ivory / track / vermilion | 14.19 / 3.95 / 3.05 | 3 | pass |
| vermilion focus ring on ivory (plate or halo) | 4.65 | 3 | pass |
| vermilion checked indicator on ivory / ivory-hover | 4.65 / 4.09 | 3 | pass |
| ivory text on vermilion (only if `--media-primary-foreground` is ever shown) | 4.65 | 4.5 | pass (narrow) |
| vermilion played vs unplayed track | 1.29 | n/a | **colour alone does not separate these.** Separation comes from shape (§6) |
| ivory plate edge vs white video frame | 1.15 | n/a | plate edge vanishes on bright frames; the edge is decorative, so this doesn't block |
| ivory text over existing 55% top scrim, white frame | 4.14 | 4.5 | **fail**. Hence title on a plate (§5) |
| disabled graphite at 40% opacity on ivory | 2.38 | exempt | informational |

These are colour-pair calculations only, **not an accessibility audit**. Focus order,
target sizes in situ, forced-colors rendering, screen-reader output and contrast
over real frames are still to verify in M3–M5.

---

## 4. Typography and spacing

- **Controls font:** `--media-font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
  System fonts, no web font, no new dependency.
- **Title and dialog title (editorial accent):** `ui-serif, "Iowan Old Style", "Palatino Linotype", Georgia, serif`. *(Decision D3.)*
- **Sizes** (all in `--media-spacing` = 4 px at scale 1, so they scale in fullscreen):
  base control text `3.25` (13 px, existing); time `3.25`, weight 500, `tabular-nums`
  (existing on `.media-time-group`); tooltip `3` (12 px); menu items `3.25`; title `3.75`
  (15 px); dialog title `4.5` (18 px, existing); dialog body `3.5` (existing).
- **Letter-spacing** normal; tooltip shortcut keys keep `.media-tooltip-shortcut`.
- **Spacing grid:** 4 px (`--media-spacing`). Plate padding `3` (12 px) wide, `2` (8 px)
  narrow; gap between control groups `2` (existing); button `8` (32 px, existing);
  icon `4.5` (18 px, existing Scaffold set).
- **Corners:** 0 everywhere (Scaffold already sets radius tokens to 0px).

---

## 5. Compositions

### Wide (container ≥ 42rem / 672 px)

```
┌────────────────────────────────────────────────────────────────────────┐
│ ┌──────────────────────┐                                ┌──┐┌──┐       │  top row: title tab (ivory),
│ │ Cosmic Dawn          │                                │⌁ ││▭ │       │  cast/airplay chips (if available)
│ └──────────────────────┘                                └──┘└──┘       │
│                                                                        │
│                        ┌──┐   ┌─────┐   ┌──┐                           │  centre: ivory plates
│                        │↺ │   │  ▶  │   │↻ │                           │  (seek only: started +
│                        └──┘   └─────┘   └──┘                           │   fine pointer + ≥22.5rem)
│                                                                        │
│                                                                        │
╞════════════════════════════════════════════════════════════════════════╡  plate top edge: hairline
│ ━━━━━━━━━━━━━━━━━━━◆┄┄┄┄┄┄┄┄┄┄┄┄┄────────────────────────────────────  │  thread row: 24 px hit area
│ ▶   🔊  0:42 / 1:51                                    CC   ⚙   ⧉   ⛶ │  control row: 32 px buttons
└────────────────────────────────────────────────────────────────────────┘
  ━ played (vermilion)   ◆ shuttle   ┄ buffered strand on track   ─ unplayed track
```

- **Bottom plate** = `.video-controls-bottom`: ivory, full-bleed, flush with the bottom
  and sides, square, 1 px `--loom-plate-edge` top hairline. Height at scale 1 is
  12 + 24 + 4 + 32 + 12 = **84 px** (padding, thread row, gap, control row, padding).
  It shows and hides with the existing `data-visible` logic.
- **Top row** = `.video-controls-top`: no full-width bar. The title becomes a small ivory
  tab. AirPlay/cast are ivory 32 px chips that appear only when available
  (`data-hidden` / `data-availability` already handled).
- **Centre** = `.video-controls-center-button`: 56 px (`14.5` spacing, existing) ivory
  square for play/restart and 32 px squares for seek, graphite icons.
- **Scrim** `.video-controls-backdrop`: the gradient is removed, because every control
  now sits on an opaque plate. The element stays (it carries `data-started` /
  `data-visible` logic).
- **Fullscreen and PiP placement (Decision D1):** recommended to **move** both
  buttons from the top row to the end of the bottom row (after settings). This is a
  source reorder in `skin.html`, so focus order follows. Nothing is removed. If
  declined, they stay as top-right ivory chips beside cast/AirPlay.

### Narrow (container < 22.5rem / 360 px)

```
┌────────────────────────────────────┐
│                              ┌──┐  │
│                              │⌁ │  │  title tab hidden < 15rem (existing)
│                              └──┘  │
│               ┌────┐               │  centre play 44 px (existing 11 spacing);
│               │ ▶  │               │  centre seek hidden (existing)
│               └────┘               │
╞════════════════════════════════════╡
│ ━━━━━━━━━━◆┄┄┄┄┄───────────────────│  plate padding 8 px
│ ▶  🔊  0:42             CC  ⚙  ⛶  │  < 20rem: single toggle time (existing)
└────────────────────────────────────┘
```

- Plate padding drops to `2`; height **76 px** (8 + 24 + 4 + 32 + 8).
- Coarse pointers: thread row hit area grows to `8` (32 px). Buttons keep the existing
  `(pointer: coarse) .media-button::before { inset: -3px }`, giving 38 px targets.
- `< 15rem`: existing rules hide title, captions and settings buttons. LOOM keeps them.
- Volume: on touch the popover is unchanged in behaviour. Mute stays a direct button.

### Fullscreen (`.media-skin:fullscreen`)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ┌────────────────────────┐                                                       │
│ │ Cosmic Dawn            │                                                       │
│ └────────────────────────┘                                                       │
│                                                                                  │
│                          video, letterboxed on black                             │
│                                                                                  │
╞══════════════════════════════════════════════════════════════════════════════════╡
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄────────────────────────────  │
│  ▶   🔊  12:42 / 1:51:09                                         CC   ⚙   ⧉   ⛶ │
└──────────────────────────────────────────────────────────────────────────────────┘
```

- Same composition as wide. The existing `--media-scale` steps (1.25 / 1.5 / 1.75 at
  1280 / 1536 / 1920 px viewport) scale everything defined in `--media-spacing`,
  including plate, thread and shuttle.
- Plate bottom padding: `max(calc(var(--media-spacing) * 3), env(safe-area-inset-bottom))`
  (**derived**), so iOS/notched screens don't clip the control row.
- The time group must allow `H:MM:SS` widths. `tabular-nums` is already set.

---

## 6. Timeline: geometry and layering

The working slider is **not replaced**. Same elements, same template, same
`--media-slider-*` variables, same keyboard and pointer behaviour (thumb is the
`role="slider"` element). Only `skin.css` rules L950–1225 are edited in place.

### Geometry (scale 1)

| Part | Element | Size | Notes |
|---|---|---|---|
| Hit area | `.media-time-slider` | full width × **24 px** (`6` spacing); **32 px** (`8`) under `(pointer: coarse)` | today 16 px. This element owns pointer input, so the target no longer depends on the 4 px visible band |
| Track band (unplayed) | `.media-time-slider-track::before` | 4 px (`1`) tall, vertically centred | `--loom-thread-track`; today 6 px at 10% white |
| Buffered strand | `.media-time-slider-buffer` | **1.5 px** tall line, centred in the band | `--loom-thread-strand`; a thin dark line inside the grey band, so buffered vs unplayed differs by shape |
| Played thread | `.media-time-slider-fill` | 4 px, full band height, covers band and strand | `--loom-thread-played` (vermilion) |
| Shuttle (playhead) | `.media-time-slider-thumb` box 16 × 16 px (`4`), transparent; **`::after`** draws the shuttle | shuttle: 16 × 8 px elongated hexagon, `clip-path: polygon(0 50%, 25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%)`, `--loom-shuttle`; `::before` same polygon 18 × 10 px in ivory as a halo | the shape is on a pseudo-element so the thumb's own `outline` (focus ring) is **not clipped** by `clip-path` |
| Hover affordance | `.media-time-slider[data-pointing]` / `[data-interactive]` | band 4 → 6 px | transition `height` on `--media-duration-slider`, which is 0 ms under reduced motion |
| Preview | `.media-time-slider-preview` | existing thumbnail and `.media-time-slider-preview-meta` on an ivory chip | already `pointer-events: none` |

**Why shape and not colour:** played (vermilion) vs unplayed band is 1.29:1, so
luminance alone can't separate them. In practice the played range is almost always
inside the buffered range. The visible boundary at the playhead is then *solid
vermilion → grey band with a dark centre strand*, which is a pattern change, plus the
14:1 graphite shuttle. Position is also exposed by `aria-valuetext` and the time display.

### Layer order (inside `.media-time-slider-track`, which has `isolation: isolate`)

| z | Layer | Interactive? |
|---|---|---|
| 0 | `::before` unplayed band | decorative, `pointer-events: none` |
| 1 | `.media-time-slider-buffer` strand | decorative, `pointer-events: none` |
| 2 | `.media-time-slider-fill` played thread | decorative, `pointer-events: none` |
| 3 | `.media-time-slider-thumb` (shuttle via `::before`/`::after`) | **focus target** (`role="slider"`). Pseudo-elements `pointer-events: none` |
| — | `.media-time-slider-preview` | decorative, already `pointer-events: none` |

Pointer handling stays on `media-time-slider`. None of the decorative layers may set
`pointer-events: auto`.

### Existing chapter rendering

The workbench feeds a chapters track (`cosmic-dawn-chapters.vtt`), and Scaffold already
renders chapter segments with 2 px gaps (`--media-chapter-inset-start/end: 0.5`).
**LOOM does not add or design chapters in M3.** The thread styles apply per segment
through the existing template, and the gaps stay as they are. *(Decision D4.)*

---

## 7. Controls: buttons, tooltips, menus

### Buttons (`.media-button`, L3–99)

| State | Selector (existing) | LOOM treatment |
|---|---|---|
| Rest | `.media-button` | transparent on plate, graphite icon 18 px; 32 × 32 px |
| Hover | `@media (hover: hover) .media-button:hover` | `--loom-ivory-hover` fill. Instant, no transition |
| Active / pressed | `.media-button:active` (**new rule, derived**) | `--loom-ivory-press` fill. No scale or motion (frequent control) |
| Expanded | `.media-button[aria-expanded="true"]` | `--loom-ivory-hover` fill (existing hook) |
| Focus-visible | `.media-button:focus-visible` | 2 px `--media-ring` (vermilion) outline, 2 px offset. On plates the offset area is ivory. For chips over video, add `box-shadow: 0 0 0 4px var(--loom-ivory)` so the ring always sits on ivory (4.65:1) |
| Disabled | `:disabled`, `[aria-disabled="true"]` | existing `opacity: 0.4`, `cursor: not-allowed` |
| Hidden | `[data-hidden]` | existing `display: none` |
| Paused / playing / ended | `.media-play-button` `[data-paused]`, `[data-started]`, `[data-ended]` | existing icon swap (play / pause / restart). No colour change |
| Muted | `.media-mute-button[data-muted]` | existing icon swap |
| Captions on | `.media-captions-button[data-active]` | existing icon swap, plus a 2 px vermilion underline bar (`::after`, **derived**) so state isn't conveyed by icon alone |

Icons: keep the **Scaffold icon family** (conventional play/pause/volume/fullscreen
glyphs, one set). No redraw in M3.

### Tooltips (`.media-tooltip-popup`, L532–580)

Ivory chip, graphite 12 px text, padding `0.5 / 1.5` spacing (existing), 1 px
`--loom-plate-edge` outline (**derived**). The shortcut key sits on a `#E3DACB`
chip. The side offset stays the existing `--media-tooltip-side-offset` (`9` spacing),
so it clears the plate. Entry uses the existing popup transition tokens. The centre
buttons' tooltips stay `disabled` as in Scaffold.

### Menus (`.media-menu-popup`, L615–919)

Ivory popover, graphite text. 1 px `--loom-plate-edge` outline and one soft shadow
`0 8px 24px rgb(0 0 0 / 0.25)` (**derived**) so it separates from bright frames.
Items are 32 px (`8`, existing). `[data-highlighted]` gets the ivory-hover fill.
`.media-menu-hint` and `.media-menu-tier` use graphite-2. The checked
`.media-menu-indicator` is a vermilion check (4.65:1). `.media-menu-separator` uses the
1 px hairline. Submenu slide uses the existing `--media-duration-menu`, which is
0 ms under reduced motion.

### Volume popover (L1337–1449)

Ivory popover. Track 4 px `--loom-track`, fill **graphite** (not vermilion: the accent
stays reserved for progress and focus), 12 px graphite square thumb with the same
focus ring.

---

## 8. Loading, paused, ended, error, announcements

| State | Source hook | LOOM |
|---|---|---|
| Before start | `.video-controls-top:not([data-started])`, `.video-controls-content:not([data-started])` | poster + centre play plate only (existing visibility rules) |
| Playing, idle | `.video-controls-content:not([data-visible])` | everything hidden. Controls exit uses `--media-duration-controls` (existing 300 ms fine / 150 ms coarse, instant under reduced motion) |
| Paused | play button `[data-paused]` | controls stay visible (existing). Centre plate shows play |
| Ended | play button `[data-ended]` | restart icon (existing swap). Thread fully vermilion |
| Buffering | `media-buffering-indicator[data-visible]` | spinner graphite on a 56 px ivory plate at centre. The existing `.media-buffering-indicator-backdrop` dim (`#0006`) stays. Spinner animation is functional, and `--media-spinner-animation: none` under reduced motion (existing) |
| Seeking | `media-time-slider[data-seeking]` | no extra treatment (a spinner appears via buffering if needed) |
| Error | `.media-dialog-popup[data-open]` (`role="alertdialog"`) | ivory panel, graphite text, serif title, `.media-dialog-close` as a graphite-outline 32 px button with vermilion focus ring. Backdrop stays the existing opaque black. Copy comes from Video.js i18n (unchanged) |
| Announcements | `.media-status-announcer` (`role="status"`) | **no visual change**. Stays visually hidden. Not restyled, moved or replaced |
| HUD indicators | `.media-indicator-group` (`aria-hidden`) | ivory chips, graphite icon/value. Existing timing tokens |

---

## 9. Captions placement and collisions

- Existing mechanism: `captions.css` shifts `video::-webkit-media-text-track-container`
  by `--media-caption-controls-y` while the container has `data-controls-visible`.
- LOOM sets `--media-caption-controls-y` for the Scaffold/video preset to clear the
  plate: `calc(var(--media-spacing) * -23)` wide (84 px plate + 8 px) and
  `calc(var(--media-spacing) * -21)` narrow (76 + 8), in `src/styles/video/theme.css`.
  The narrow value goes in the existing `@container media-root (width < 42rem)` block in
  `captions.css`, using the `data-theme="scaffold"` variant of the pattern used for
  default/neutral.
- **Risk R1:** the selector is WebKit/Blink-only, and the demo media is `<mux-video>`,
  whose native `<video>` may sit inside a shadow root that `@scope (.media-skin) video::…`
  cannot reach. Verify with a captioned source in M3 before relying on it.

---

## 10. Reduced motion and forced colors

**Reduced motion:** all LOOM motion uses existing tokens (`--media-duration-*`,
`--media-hidden-*`, `--media-popup-translate-distance`), which `preferences.css`
already collapses. New transitions (thread hover height, button fills) must reference
those tokens. There are no decorative loops. The only looping animation is the
functional buffering spinner, already disabled under reduced motion.

**Forced colors:** keep every existing `@media (forced-colors: active)` block. LOOM
additions must:

- Map plates to `Canvas` / `CanvasText` (Scaffold already remaps `--media-popover*`).
- **Shuttle pseudo-elements must declare `forced-color-adjust: none`** with
  `background: Highlight` and a `CanvasText` halo. Otherwise forced colors replace their
  backgrounds and the shuttle disappears. *(Risk R2.)*
- Keep the existing buffer pattern (`repeating-linear-gradient(135deg, canvastext …)`)
  and `Highlight` fill.
- The focus ring falls back to the existing `--media-ring: CanvasText / Highlight` remaps.

`prefers-contrast: more` / `prefers-reduced-transparency`: plates are already opaque.
Add a 1 px `CanvasText`-equivalent graphite border to plates and popovers (the existing
blocks already add `outline: 1px solid` to tooltips and menus).

---

## 11. Decorative vs interactive

| Interactive (owns focus/pointer) | Decorative (`pointer-events: none` or `aria-hidden`) |
|---|---|
| all `.media-button` elements, `.media-time-toggle` | plate hairlines, plate shadow |
| `media-time-slider` (pointer) and its thumb (`role="slider"`, focus) | track band, buffered strand, played thread, shuttle pseudo-elements |
| `media-volume-slider` and its thumb | `.media-time-slider-preview`, thumbnail |
| menu items / radio items, dialog close | `.media-indicator-group` HUD, buffering spinner |
| tooltips' triggers (tooltips themselves are `pointer-events: none`) | `.video-controls-backdrop` |

---

## 12. Implementation plan (M3)

**Strategy: edit in place, don't append overrides.** Scaffold's source is ours ("you own
this source now"). Every LOOM change replaces the value in the rule that already owns it,
so the cascade keeps one definition per property. No `!important` beyond what Scaffold
already uses, and no second stylesheet that re-declares the same selectors.

| Step | File | Change | Reuse vs edit |
|---|---|---|---|
| 1 | `src/styles/themes/scaffold.css` | add `--loom-*` palette, repoint the semantic `--media-*` tokens (§3) | **edit**. Same file, same layer, same selector. Forced-colors and contrast blocks reused |
| 2 | `src/styles/video/theme.css` | `--media-caption-controls-y` for scaffold → `-23` spacing | edit one value |
| 3 | `src/styles/video/captions.css` | narrow-container caption offset for `data-theme="scaffold"` | add one rule to the existing container block |
| 4 | `src/video/skin.css` L2008–2052 | font family token; frame stays radius 0 | edit |
| 5 | `src/video/skin.css` L1451–1722, L1930–1951 | plate background/edge/padding on `.video-controls-bottom`; remove backdrop gradient; top-row chips; centre plates | edit in place |
| 6 | `src/video/skin.css` L950–1225 | slider hit height, band, strand, thread, shuttle pseudo-elements, forced-colors shuttle | edit in place. **Structure and variables reused** |
| 7 | `src/video/skin.css` L3–99, L532–580, L615–919, L1337–1449 | buttons (`:active`), tooltip, menu, volume treatments | edit in place |
| 8 | `src/video/skin.css` L101–183, L409–453, L185–346 | dialog, buffering plate, HUD chips | edit in place |
| 9 | `src/video/skin.css` L941–942, L1953–1976 | ~~delete the empty generated blocks~~ **not done in M3**: their purpose as hooks could not be confirmed, so they stay | — |
| 10 | `src/video/skin.html` | **only if D1 approved:** move `media-pip-button` + `media-fullscreen-button` (and their `media-tooltip`s, ids unchanged) to the end of the bottom `.video-controls-group` | source reorder; ids/`trigger` pairs untouched |
| — | `src/video/skin.ts` | no change (Scaffold icons kept) | reuse |
| — | `apps/preview/**`, `src/skin.css` | no change | workbench untouched |

Each step is followed by `npm run typecheck && npm run build` and a workbench check.
Steps 1–3 are token-only, so the player should already read as LOOM (ivory, vermilion)
before any rule edits.

---

## 13. Outstanding decisions

| # | Decision | Recommended default |
|---|---|---|
| D1 | Move PiP + fullscreen from the top row to the bottom-right of the plate? | **Yes.** Conventional position, fewer chips over the picture, one source reorder |
| D2 | Bottom plate full-bleed flush (84 px) vs inset floating plate with margin | **Full-bleed flush.** Rectangular, instrument-like, no rounded "floating card" |
| D3 | Serif for title and dialog title vs system sans everywhere | **Serif for those two only.** The editorial note. All controls stay sans |
| D4 | Chapter gaps on the thread (already rendered by Scaffold from the demo VTT) | **Leave as-is in M3**, design later or remove the demo chapters track |
| D5 | Keep `data-theme="scaffold"` vs rename to `loom` (36 selectors in `skin.css`, 1 in `video/theme.css`, 5 in `themes/scaffold.css`, 1 in `skin.html`; no Video.js component reads it) | **Keep `scaffold` for M3.** Rename later as a single mechanical commit if wanted |

## 14. Technical risks

| # | Risk | Mitigation |
|---|---|---|
| R1 | Caption lift may not reach `<mux-video>`'s internal `<video>` (shadow DOM), and is WebKit/Blink-only | test with a captioned source in M3; if unreachable, document the limitation, don't hack |
| R2 | Forced colors erase pseudo-element backgrounds, so the shuttle could vanish | `forced-color-adjust: none` + system colours on the shuttle pseudos |
| R3 | `clip-path` would clip a focus outline | shuttle drawn on `::before`/`::after`. Outline stays on the unclipped thumb box |
| R4 | Ivory plate edge disappears on bright frames (1.15:1) | decorative only. Hairline + soft shadow. Controls inside keep their contrast |
| R5 | An 84 px plate covers ~21% of a 405 px-tall 16:9 player | plate autohides during playback; narrow variant 76 px; D2 inset alternative exists |
| R6 | Fullscreen behaviour unverified under automation (M1) | user tests manually; LOOM does not change fullscreen logic |
| R7 | Played vs unplayed colour contrast is 1.29:1 | separation by shape (strand), shuttle and `aria-valuetext`. Revisit if review disagrees |

---

## 15. M3 implementation record

Implemented as specified unless listed here. Evidence: `docs/review/m3/*.png` (headed Chrome, 2× DPR).

| Area | As built | Why it differs from §5–§12 |
|---|---|---|
| Control surfaces | `--media-background` → ivory plate (not just the bottom bar) | Scaffold paints buttons, menu items, indicators, title and thumbnail with `--media-background`; one token change backs every control |
| Captions | offset via the documented `--media-caption-track-y` custom property; it inherits into `<mux-video>`'s shadow `<video>` (verified on the computed style inside the shadow root) | no shadow-DOM selectors needed |
| Caption offsets | `-23` sp wide / `-25` coarse (`video/theme.css`); `-21` / `-23` below 22.5rem, set on the container's direct children (`captions.css`) | a container query cannot style its own container |
| Centre group | centred in the area above the plate (`--loom-plate-height`) | opaque centre plates hid lifted captions at 512 px and 340 px |
| Title tab | hidden below **22.5rem** (Scaffold: 15rem) | collided with the centre plate and captions at 340 px |
| Bottom row, narrow | group gap 4 px below 20rem; PiP hidden below 17.5rem (`i` hotkey still works); time toggle target 24 px | overlapping targets at 240 px; 29×13 px toggle |
| Popup clearance | `--loom-popup-offset` 11 sp (13 sp coarse) for tooltips, menus, volume | the 85 px plate is taller than Scaffold's bar |
| Played thread | static two-strand weave: 1 px `--loom-thread-seam` centre line with 2 px ties every 16 px; plain thread below 22.5rem; forced colors replace it | §6 prototype request |
| Centre play size | Scaffold's existing 58 px (`14.5` sp) kept | spec said 56 px; no reason to change |
| Menu separator | stays `display: none` (Scaffold) | spec mentioned a hairline; left unchanged |
| Empty generated blocks | kept | see §12 step 9 |

**Known residuals:** captions touch or run under the centre play plate at the 240 px minimum width while controls show (they clear when controls hide); a focused button's tooltip and the volume popover can be open together and overlap (Scaffold behaviour); the buffered strand reads heavier than "quieter backing strand" intended (3.42:1 vs track; a lighter value would trade contrast for hierarchy). Fullscreen and real Windows High Contrast remain untested.

---

## 16. M3.1 refinement record

Evidence: `docs/review/m3-1/` (headed Chrome, 2× DPR; controls revealed with the documented
`player.store.requestControlsLock()`; focus states captured from real Tab presses). Matrix:
`docs/review/m3-1/matrix/` (13 widths × playing-visible / playing-hidden / paused).

| Area | Change | Mechanism |
|---|---|---|
| Centre group | shown before first playback (58 px play), when paused/ended (48 px play + ±10 s on fine pointers ≥ 22.5rem), and while one of its buttons holds keyboard focus; hidden while playing; hidden after first playback below 20rem | `visibility: hidden` via `:has()` on the play button's `data-started` / `data-paused` / `data-ended` — out of the tab order and pointer input. Without `:has()` support the Scaffold behaviour (always shown) remains |
| Function access while centre is hidden | play/pause: bottom bar, `k`/Space, tap-to-pause is not provided on touch (touch tap toggles controls; use the bar button). ±10 s: when paused (centre), `j`/`l`/`←`/`→`, Page Up/Down on the timeline, double-tap left/right on touch, timeline click/drag | existing components |
| Controls lock | new `<loom-controls-keeper>` (`src/video/controls-keeper.ts`) holds a lock while a control inside `media-controls` has `:focus-visible` or a menu/volume popover is `[data-open]`; released immediately afterwards | documented `requestControlsLock()` from `selectControls`; no extra timer |
| Played thread | two strands with a 1 px pale parting line (`--loom-thread-gap` #e6b8a9), 1.5 px ties every 24 px; plain below 22.5rem | static `background-image` |
| Buffered strand | 1.5 px → 1 px | thickness only; colour unchanged |
| Disabled controls (e.g. cast, unavailable) | plate stays opaque; icon `--loom-disabled` #9b958c; semantics (`aria-disabled`, focusable) unchanged | replaces Scaffold's `opacity: 0.4` |
| Title tab | padding 2.5 sp, 14 px serif, 28 px tall; hidden below **25rem** (was 22.5rem) | paused centre plates met the title at 368–392 px; width-only container query, tuned for 16:9 |
| Menu values | value label max 160 px (was 96 px); "English (Generated)" no longer truncated at 960 or 340 px | `.media-menu-hint-label` |
| Tooltips vs popovers | no change needed: the settings tooltip already closes while its menu is open, and the mute tooltip is `disabled` in Scaffold markup (verified in browser) | component behaviour |

Contrast (pairs from rendered pixels): played strand vs halo/plate 4.65; parting line vs strand 2.99 (decorative);
shuttle vs halo 14.19; halo vs buffered strand 12.30, vs track 3.59; buffered strand vs track 3.42; disabled icon vs
chip 2.59 (disabled, exempt); focus ring vs disabled chip 4.65. Colour checks only — not an accessibility audit.
