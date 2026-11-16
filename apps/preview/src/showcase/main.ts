import '@videojs/html/i18n';
import './showcase.css';
import { PlayerController, playerContext, type PropertyValues, selectControls, UIElement } from '@videojs/html';
import { createPlayer } from '../frame/player';

/**
 * Showcase-only initial controls hold.
 * Keeps LOOM controls visible on first arrival so visitors immediately see
 * the woven timeline and shuttle affordance.
 *
 * When playback starts (media 'playing' event), releases this hold, returning
 * to normal idle auto-hide and keyboard-focus-aware controls.
 */
export class ShowcaseInitialHoldElement extends UIElement {
  static readonly tagName = 'showcase-initial-hold';

  readonly #controls = new PlayerController(this, playerContext, selectControls);
  #release: (() => void) | null = null;
  #media: HTMLMediaElement | null = null;
  #onPlaybackStart: (() => void) | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.#setupMediaListener();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#cleanup();
  }

  protected override update(changed: PropertyValues): void {
    super.update(changed);
    this.#applyHold();
  }

  #setupMediaListener(): void {
    const container = this.closest('media-container');
    if (!container) return;

    const attachMedia = () => {
      const media = (container.querySelector('mux-video') || container.querySelector('video')) as HTMLMediaElement | null;
      if (media && media !== this.#media) {
        this.#media = media;
        this.#onPlaybackStart = () => {
          this.#releaseHold();
        };
        // Release showcase-only hold as soon as actual playback starts
        media.addEventListener('playing', this.#onPlaybackStart, { once: true });
      }
    };

    attachMedia();
    if (!this.#media) {
      const observer = new MutationObserver(() => {
        attachMedia();
        if (this.#media) observer.disconnect();
      });
      observer.observe(container, { childList: true, subtree: true });
    }
  }

  #applyHold(): void {
    // If playback has already started, do not re-hold
    if (this.#media && !this.#media.paused && this.#media.currentTime > 0) return;
    const controls = this.#controls.value;
    if (controls && !this.#release) {
      this.#release = controls.requestControlsLock();
    }
  }

  #releaseHold(): void {
    if (this.#release) {
      this.#release();
      this.#release = null;
    }
    if (this.#media && this.#onPlaybackStart) {
      this.#media.removeEventListener('playing', this.#onPlaybackStart);
      this.#onPlaybackStart = null;
    }
  }

  #cleanup(): void {
    this.#releaseHold();
    this.#media = null;
  }
}

if (!customElements.get(ShowcaseInitialHoldElement.tagName)) {
  customElements.define(ShowcaseInitialHoldElement.tagName, ShowcaseInitialHoldElement);
}

const mount = document.getElementById('player-mount');
if (mount) {
  const i18n = document.createElement('media-i18n');
  const player = createPlayer();
  const container = player.querySelector('media-container');
  if (container) {
    container.append(document.createElement(ShowcaseInitialHoldElement.tagName));
  }
  i18n.append(player);
  mount.append(i18n);
}
