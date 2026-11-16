# LOOM — Design Improvisation & Competitive Evolution Plan

> **Status**: **Option 1 ("Atelier Precision Instrument") Implemented, Verified, and Deployed to Production.**  
> **Live Site**: [https://loom-skin.vercel.app](https://loom-skin.vercel.app) (Verified HTTP 200 OK)  
> **Review Evidence**: [docs/review/m6-atelier/](file:///Users/ohm/Documents/projects/sbox/loom/docs/review/m6-atelier/)

---

## 1. Executive Diagnosis: Why Current LOOM Feels "Too Simple"

Comparing the live deployment ([loom-skin.vercel.app](https://loom-skin.vercel.app)) to winning digital design work reveals several concrete reasons the current player feels underwhelming:

| Element | Current Deployed State | Why It Fails to Impress |
| :--- | :--- | :--- |
| **Controls Bar** | Solid, opaque `#F4EFE6` rectangle attached below the video frame. | Looks like an unstyled HTML wireframe dock or an old 1970s chassis slapped underneath the footage rather than an integrated modern video player. |
| **Center Play Group** | Three sharp rectangular white boxes (`[ ↺10 ] [ ▷ ] [ ↻10 ]`) floating mid-screen. | Resembles raw development scaffold buttons without depth, optical balance, or micro-haptics. High contrast against dark video feels jarring. |
| **Timeline ("The Thread")** | A flat 3px red stripe with diagonal dashes and a rudimentary polygon diamond shuttle. | LOOM's stated metaphor is *"Every film, a thread"*, but the actual graphic execution looks like a basic progress bar rather than a luxurious physical thread or precision instrument. |
| **Atmosphere & Depth** | Zero backdrop blur, zero elevation, flat 1px solid borders, no cinematic scrim. | The video cuts abruptly into the controls bar; there is no optical lighting, glass refraction, or dynamic vignetting. |
| **Typography & Hierarchy** | Basic serif text on white cards. | Lacks bespoke typographic scale, monospaced timecode telemetry, or refined tracking. |

---

## 2. Three Strong Design Directions on Top of LOOM

All three options build directly on LOOM's foundational architecture (`@videojs/html` 10.4.0 custom elements, `controls-keeper.ts` keyboard locking, ARIA semantics, container queries) without introducing heavy external UI frameworks into `src/`.

```
                        ┌─────────────────────────────────────────────────────────┐
                        │              LOOM DESIGN EVOLUTION PATHWAYS             │
                        └───────────────────────────┬─────────────────────────────┘
                                                    │
         ┌──────────────────────────────────────────┼──────────────────────────────────────────┐
         │                                          │                                          │
         ▼                                          ▼                                          ▼
┌─────────────────────────────────┐   ┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│     OPTION 1 (RECOMMENDED)      │   │            OPTION 2             │   │            OPTION 3             │
│   "ATELIER PRECISION INSTRUMENT"│   │       "CINEMATIC MUBI"          │   │      "SPATIAL GLASS STUDIO"     │
├─────────────────────────────────┤   ├─────────────────────────────────┤   ├─────────────────────────────────┤
│ • Teenage Engineering / Leica   │   │ • Criterion / A24 / Kinfolk     │   │ • Apple VisionOS / Raycast      │
│ • Brushed anodized titanium     │   │ • 35mm film perforation weave   │   │ • Segmented floating bento glass│
│ • Knurled tactile thread        │   │ • Editorial serif italics       │   │ • Specular rim lighting         │
│ • Milled circular puck center   │   │ • Continuous atmospheric scrim  │   │ • Luminous neon fiber timeline  │
│ • Monospace telemetry badges    │   │ • Polaroid chapter cards        │   │ • Spring physics hover states   │
└─────────────────────────────────┘   └─────────────────────────────────┘   └─────────────────────────────────┘
```

---

### Option 1 (Recommended): "Atelier Precision Instrument"
**Inspiration:** Teenage Engineering (OB-4, TP-7), Leica M-series, Dieter Rams (Braun), Swiss Horology.

- **The Core Idea:** Takes LOOM's original *"precision instrument"* philosophy and actually delivers it with museum-grade physical craftsmanship. The player feels like a \$1,500 machined audio/video monitor that a creative professional wants to reach out and touch.
- **Visual Signatures:**
  - **Floating Anodized Chassis:** The bottom controls bar transforms into a floating island with 12px rounded chamfers, dark brushed obsidian/warm champagne titanium gradient (`linear-gradient(180deg, #2A2825 0%, #1C1B18 100%)`), and a 0.5px sub-pixel highlight rim (`inset 0 1px 0 rgba(255,255,255,0.2)`).
  - **The Knurled "Thread" Scrubber:** The timeline becomes a tactile knurled track with an illuminated vermilion fiber-optic core (`box-shadow: 0 0 12px rgba(229,62,33,0.65)`). The playhead is a milled circular brass/titanium jewel shuttle with an illuminated center dot.
  - **Center Monolith:** The three wireframe boxes are replaced by a single, gorgeous circular milled dial with concentric tactile grooves, smooth breathing ambient halo, and micro-press spring dynamics. Skip buttons flank as refined circular satellite dials.
  - **Telemetry Typography:** Tabular monospaced timecodes (`00:24 / 01:51`) paired with DIN-style uppercase chapter telemetry (`CH 01 · DEEP FIELD · 4K HDR`).
- **Why It Wins:** Contra design judges love tactile physical hardware metaphors. It looks completely unlike any cookie-cutter web player on the internet.

---

### Option 2: "Cinematic MUBI / Editorial Film Journal"
**Inspiration:** MUBI GO, Criterion Channel, A24, Kinfolk, The Gentlewoman.

- **The Core Idea:** A celebration of cinema culture and film preservation. It positions LOOM as the premier player for film festivals, arthouse streaming platforms, and independent cinema archives.
- **Visual Signatures:**
  - **Atmospheric Scrim:** The controls do not sit in a box at all; instead, an ultra-smooth cinematic gradient scrim melts upward from `#0D0C0B` into the footage.
  - **Floating Smoked Ribbon:** Controls float inside an ethereal smoked-glass pill with 24px backdrop blur and delicate ivory hairline edges.
  - **35mm Film Perforation Timeline:** The timeline track features subtle film sprocket notches at chapter boundaries, with the vermilion thread unfurling like exposed 35mm film stock.
  - **Editorial Typography:** High-contrast serif italic titles (*"Cosmic Dawn"*, *"Chapter 01: The Beginning of Time"*) paired with tracked uppercase metadata.
  - **Center Glass Monolith:** A translucent circular frosted lens that gently scales and dissolves into the footage on playback.
- **Why It Wins:** High artistic prestige and emotional resonance. It proves exceptional art direction and typography that stands out immediately from tech-heavy entries.

---

### Option 3: "Spatial Glass Studio"
**Inspiration:** Apple VisionOS, Raycast, Linear, Craft.

- **The Core Idea:** Hyper-modern digital spatial craftsmanship. Fluid glassmorphic surfaces, specular rim lighting, vibrant neon energy, and micro-interactions.
- **Visual Signatures:**
  - **Segmented Bento Islands:** Instead of a single wide bar, controls are grouped into floating liquid glass capsules: Left (Play/Volume), Center (Glowing Timeline Pill), Right (Settings/Captions/Fullscreen).
  - **Luminous Neon Fiber:** The scrubber thread glows with a vivid orange-to-vermilion gradient that casts a subtle ambient reflection onto the bottom of the video frame.
  - **Specular Glass Reflections:** Dynamic double-layer borders with corner highlights that react to pointer movement.
  - **Convex Lens Center Play:** Frosted optical crystal puck with refractive edge highlights.
- **Why It Wins:** Extremely slick, visually captivating in screenshots and video demos, and showcases advanced modern CSS capabilities.

---

## 3. Detailed Component Elevation Specification (Option 1 Focus)

To execute Option 1 cleanly, here is the exact architectural transformation:

### A. Bottom Controls Chassis & Floating Geometry
- **Geometry:** Change bottom bar from full-width pinned dock to a floating capsule:
  ```css
  /* Position as floating island over video bottom */
  .video-controls-bottom {
    position: absolute;
    bottom: 1.25rem;
    left: 1.25rem;
    right: 1.25rem;
    max-width: 56rem;
    margin: 0 auto;
    border-radius: 14px;
    background: linear-gradient(180deg, rgba(42, 40, 37, 0.94) 0%, rgba(26, 25, 23, 0.98) 100%);
    backdrop-filter: blur(24px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 48px -8px rgba(0, 0, 0, 0.75),
                inset 0 1px 0 rgba(255, 255, 255, 0.18),
                inset 0 -1px 0 rgba(0, 0, 0, 0.5);
    padding: 0.85rem 1.15rem;
  }
  ```

### B. "The Thread" (Timeline & Shuttle)
- **Track:** 6px tall precision track with inset dark groove (`background: #141312; border: 1px solid rgba(255,255,255,0.08)`).
- **Played Thread:** Vivid Vermilion (`#E53E21`) with animated high-density diagonal weave pattern and a multi-stage outer glow:
  ```css
  .media-time-slider-fill {
    background: linear-gradient(90deg, #C4391A, #FF4D2D);
    box-shadow: 0 0 10px rgba(229, 62, 33, 0.6), 0 0 20px rgba(229, 62, 33, 0.25);
  }
  ```
- **Shuttle Thumb:** A machined titanium/brass coin with an illuminated center dot:
  ```css
  .media-time-slider-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #F4EFE6 0%, #C8BFB0 70%, #857C6E 100%);
    border: 1.5px solid #1C1B18;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6), 0 0 8px rgba(255, 77, 45, 0.5);
  }
  ```

### C. Center Controls Monolith
- **Play Button:** 64px circular brushed metal lens with concentric machined micro-rings and a subtle warm gold/amber outer halo.
- **Skip -10 / +10:** Circular 38px satellite buttons that tuck gracefully beside the center play dial on hover/pause, dissolving cleanly when video plays.

### D. Top Bar & Chapter Telemetry
- **Top Left Badge:** Precision telemetry pill:
  - Live pulse dot + `COSMIC DAWN` (Monospace 11px) + `STScI · 4K HDR` divider.
- **Chapter Display:** Bottom bar middle section prominently displays the active chapter: `CH 01 · DEEP FIELD` in glowing amber monospace text.

---

## 4. Implementation Steps & Verification

1. **Step 1: Token & Scrim Overhauls** (`src/styles/`):
   - Enhance `--loom-*` token definitions to support titanium chassis gradients, glow filters, and floating island geometries.
   - Add rich radial and vertical gradient scrims to `src/styles/video/theme.css` so video visuals blend seamlessly into controls.
2. **Step 2: Component Styling Refinement** (`src/video/skin.css`):
   - Refactor `.video-controls-bottom` into the floating chassis with chamfers and sub-pixel lighting.
   - Refactor `.media-time-slider` into the illuminated knurled thread and machined thumb.
   - Replace square wireframe center buttons with circular milled metal dials.
3. **Step 3: Verification on Workbench & Showcase**:
   - Verify all 3 entry points (`/`, `/workbench.html`, `/preview.html`).
   - Run responsive container query checks across 240px, 340px, 400px, 672px, and 960px widths.
   - Ensure `controls-keeper.ts` keyboard lock and full accessibility tree remain 100% compliant.
4. **Step 4: Production Release to Vercel**:
   - Deploy updated skin to `https://loom-skin.vercel.app`.
   - Perform unauthenticated live verification pass.
