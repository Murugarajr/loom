import { UIElement } from '@videojs/html';

const CHAPTERS = [
  { start: 0, end: 20, num: 1, title: 'A NEVER-BEFORE-SEEN LOOK' },
  { start: 20, end: 52, num: 2, title: 'THE VOYAGE TO COSMIC DAWN' },
  { start: 52, end: 73, num: 3, title: 'BUILDING AND LAUNCHING WEBB' },
  { start: 73, end: 9999, num: 4, title: 'THE CHALLENGES AND PROMISE OF WEBB' }
];

export class LoomVfdTelemetryElement extends UIElement {
  static readonly tagName = 'loom-vfd-telemetry';

  #container: HTMLElement | null = null;
  #media: HTMLMediaElement | null = null;
  #metaChapterEl: HTMLElement | null = null;
  #vfdChapterEl: HTMLElement | null = null;
  #currentChapterNum = -1;

  readonly #onTimeUpdate = (): void => {
    if (!this.#media) return;
    const time = this.#media.currentTime;
    const ch = CHAPTERS.find(c => time >= c.start && time < c.end) || CHAPTERS[0];

    if (ch.num !== this.#currentChapterNum) {
      this.#currentChapterNum = ch.num;
      if (this.#metaChapterEl) {
        this.#metaChapterEl.textContent = `TITLE 01 / CHAPTER 0${ch.num}: ${ch.title}`;
      }
      if (this.#vfdChapterEl) {
        this.#vfdChapterEl.textContent = `TITLE 01 • CH 0${ch.num}`;
      }
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.#container = this.closest('media-container');
    if (!this.#container) return;

    this.#initElements();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.#media) {
      this.#media.removeEventListener('timeupdate', this.#onTimeUpdate);
      this.#media = null;
    }
    this.#container = null;
  }

  #initElements(): void {
    if (!this.#container) return;

    this.#metaChapterEl = this.#container.querySelector('#meta-track-chapter');
    this.#vfdChapterEl = this.#container.querySelector('#cyber-vfd-chapter-label');

    const attachMedia = () => {
      const media = (this.#container?.querySelector('mux-video') || this.#container?.querySelector('video')) as HTMLMediaElement | null;
      if (media && media !== this.#media) {
        this.#media = media;
        media.addEventListener('timeupdate', this.#onTimeUpdate);
        this.#onTimeUpdate();
      }
    };

    attachMedia();
    if (!this.#media) {
      const observer = new MutationObserver(() => {
        attachMedia();
        if (this.#media) observer.disconnect();
      });
      observer.observe(this.#container, { childList: true, subtree: true });
    }
  }
}

if (!customElements.get(LoomVfdTelemetryElement.tagName)) {
  customElements.define(LoomVfdTelemetryElement.tagName, LoomVfdTelemetryElement);
}
