<div align="center">

  <img src="apps/preview/public/loom-chrome-logo-perspective.jpg" alt="LOOM — Hi-Fi CyberDeck Video.js Skin" width="760" style="border-radius: 12px; box-shadow: 0 16px 36px rgba(0,0,0,0.85);" />

  # LOOM

  **Hi-Fi CyberDeck Video.js 10 Skin &bull; Inspired by PowerDVD**

  <p>
    A skeuomorphic Video.js 10 skin inspired by PowerDVD and Y2K hi-fi hardware. Features an authentic brushed platinum & chrome chassis, illuminated cyan VFD telemetry screen, optical laser seek rail, concentric machined jog wheel, visible focus outlines, and complete keyboard shortcuts.
  </p>

  <p>
    <a href="https://videojs.org/"><img src="https://img.shields.io/badge/Video.js-10.4.0-black?style=flat&logo=video.js&logoColor=white" alt="Video.js 10.4.0" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-7.0-blue?style=flat&logo=typescript&logoColor=white" alt="TypeScript 7.0" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.3-20232a?style=flat&logo=react&logoColor=61dafb" alt="React 19.3" /></a>
    <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8.3-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite 8.3" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS 4.3" /></a>
    <a href="https://www.mux.com/"><img src="https://img.shields.io/badge/Mux-HLS_10.4-ff0055?style=flat&logo=mux&logoColor=white" alt="Mux HLS" /></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Architecture-Web_Components-ff6f00?style=flat" alt="Web Components" />
    <img src="https://img.shields.io/badge/Theme-Hi--Fi_CyberDeck-00f0ff?style=flat" alt="Hi-Fi CyberDeck" />
    <img src="https://img.shields.io/badge/A11y-WCAG_2.1_AA-success?style=flat" alt="WCAG AA" />
    <img src="https://img.shields.io/badge/Controls-100%25_Keyboard_Accessible-9d4edd?style=flat" alt="Keyboard Accessible" />
    <a href="https://loom-skin.vercel.app"><img src="https://img.shields.io/badge/hosted_on-Vercel-000000?style=flat&logo=vercel&logoColor=white" alt="Hosted on Vercel" /></a>
  </p>

  <p>
    <a href="https://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat" alt="Apache License 2.0" /></a>
    <a href="https://loom-skin.vercel.app"><img src="https://img.shields.io/badge/demo-online-brightgreen?style=flat" alt="Demo Online" /></a>
    <a href="https://loom-skin.vercel.app"><img src="https://img.shields.io/badge/status-production_ready-00f0ff?style=flat" alt="Production Ready" /></a>
    <img src="https://img.shields.io/badge/typecheck-passing-brightgreen?style=flat" alt="Typecheck" />
    <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat" alt="Build Passing" />
    <a href="https://contra.com/community/topic/videojsskinschallenge/guidelines"><img src="https://img.shields.io/badge/Challenge-Contra_Video.js_v10-black?style=flat" alt="Contra Challenge" /></a>
  </p>

  <p>
    <a href="https://loom-skin.vercel.app"><strong>Launch Live Demo &rarr;</strong></a>
  </p>

  <p align="center">
    <img src="apps/preview/public/showcase-preview.png" alt="LOOM Interface Showcase" width="840" style="border-radius: 12px; border: 1px solid #1a2736; box-shadow: 0 20px 48px rgba(0,0,0,0.85);" />
  </p>

</div>

---

## Key Features

- **Skeuomorphic Platinum Deck:** Heavy brushed metallic console chassis with chamfered specular highlights and 3D Billet Machined Chrome push buttons.
- **Backlit Cyan VFD Telemetry Console:** Full-width rackmount digital display (`flex: 1`) showing track title, chapter readout, audio bitstream, glowing timecode, and `16:9 LB`, `DTS`, `4K` hardware badges.
- **Optical Laser Seek Rail & Jog Wheel:** Electric cyan cyber-thread seek rail with polished chrome shuttle bead and concentric machined jog dial.
- **Vintage 90s VHS Settings OSD:** Scoped retro VCR/VHS on-screen display typography exclusively inside the Settings menu.
- **Bilateral Top HUD:** Synchronized dark cyan cockpit telemetry badges (`[• NASA COSMIC DAWN TRAILER | DOLBY DIGITAL • 4K]` and `[DISC: COSMIC_DAWN.VOB]`).
- **Complete Keyboard Navigation:** Unmissable `#00f0ff` focus rings, full keyboard shortcuts (<kbd>Space</kbd>/<kbd>K</kbd>, <kbd>M</kbd>, <kbd>F</kbd>, <kbd>C</kbd>, <kbd>I</kbd>, arrow keys), and reduced-motion compliance.

---

## Develop

```sh
npm run dev
```

- **Public Showcase** (`/`): The public-facing presentation of LOOM featuring the working player, design notes, and keyboard shortcuts deck.
- **Development Workbench** (`/workbench.html`): The interactive development workbench with the sidebar options panel (setting player width, aspect ratio, colour scheme, text direction, language, and playback options).
- **Player Preview** (`/preview.html`): The isolated player frame alone (e.g. `/preview.html#width=384&ratio=9:16`).

The preview plays NASA's Cosmic Dawn trailer from Mux with chapters; change the media in `apps/preview/src/frame/player`.

---

## Deploy

```sh
npm run deploy
```

It asks where to deploy the workbench: Vercel, Netlify, or Cloudflare Pages. Name one to skip the question, such as `npm run deploy vercel`.

To deploy on every push instead, put the project on GitHub and import it on Vercel or Netlify; `vercel.json` and `netlify.toml` already describe the build. The build uses relative URLs, so `dist/` also works on any static host, including in a subfolder.

---

## Project Structure

- `src/`: The core skin implementation.
  - `src/video/`: Video.js HTML components, skins, and dynamic VFD telemetry.
  - `src/styles/`: Theme tokens and shared styles (`scaffold.css`).
  - `src/video/skin.css`: Primary stylesheet for the skeuomorphic hardware deck.
- `apps/preview/`: The workbench and showcase applications.
  - `apps/preview/index.html`: Public showcase page.
  - `apps/preview/workbench.html`: Interactive developer workbench.
  - `apps/preview/public/`: Static assets including fonts, chapters, and the 3D metallic chrome logo suite.
- `vercel.json`: Deployment build and output configuration.
- `skin.json`: Video.js HTML skin metadata.

---

## Learn More

- [Video.js Documentation](https://videojs.org/docs/framework/html/guides/build-your-own-skin)
- [Video.js HTML Components](https://videojs.org/docs/framework/html/guides/ui-components)

---

## License

This project is licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

