import { PlayerController, playerContext, type PropertyValues, selectControls, UIElement } from '@videojs/html';

/** Popups whose use should keep the controls on screen. Tooltips are deliberately excluded. */
const OPEN_POPUP = 'media-menu[data-open], media-volume-popover[data-open]';

/**
 * Keeps the controls visible while a control inside them has keyboard-visible focus or a menu/volume popup is open,
 * using the controls feature's documented `requestControlsLock()` action. The player's own idle timer is untouched:
 * the lock is released as soon as focus leaves the controls (or stops being keyboard-visible) and every popup closes,
 * and normal auto-hide resumes.
 *
 * Focus on the player container itself, or mouse focus on a button, does not lock.
 */
export class LoomControlsKeeperElement extends UIElement {
  static readonly tagName = 'loom-controls-keeper';

  readonly #controls = new PlayerController(this, playerContext, selectControls);
  #container: HTMLElement | null = null;
  #observer: MutationObserver | null = null;
  #release: (() => void) | null = null;
  #queued = false;

  // Focus moves fire focusout then focusin synchronously; evaluate once both have settled.
  readonly #schedule = (): void => {
    if (this.#queued) return;
    this.#queued = true;
    queueMicrotask(() => {
      this.#queued = false;
      this.#sync();
    });
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.#container = this.closest('media-container');
    if (!this.#container) return;

    this.#container.addEventListener('focusin', this.#schedule);
    this.#container.addEventListener('focusout', this.#schedule);
    this.#observer = new MutationObserver(this.#schedule);
    this.#observer.observe(this.#container, { subtree: true, attributes: true, attributeFilter: ['data-open'] });
    this.#schedule();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#container?.removeEventListener('focusin', this.#schedule);
    this.#container?.removeEventListener('focusout', this.#schedule);
    this.#observer?.disconnect();
    this.#observer = null;
    this.#container = null;
    this.#unlock();
  }

  protected override update(changed: PropertyValues): void {
    super.update(changed);
    // The controller connects after the element does; re-evaluate once the controls state arrives.
    this.#schedule();
  }

  #sync(): void {
    const container = this.#container;
    const controls = this.#controls.value;

    if (!container || !controls) {
      this.#unlock();
      return;
    }

    if (this.#keyboardFocusInControls(container) || container.querySelector(OPEN_POPUP)) {
      this.#release ??= controls.requestControlsLock();
    } else {
      this.#unlock();
    }
  }

  #keyboardFocusInControls(container: HTMLElement): boolean {
    const active = document.activeElement;
    const controls = container.querySelector('media-controls');
    return !!active && !!controls?.contains(active) && active.matches(':focus-visible');
  }

  #unlock(): void {
    this.#release?.();
    this.#release = null;
  }
}

if (!customElements.get(LoomControlsKeeperElement.tagName)) {
  customElements.define(LoomControlsKeeperElement.tagName, LoomControlsKeeperElement);
}
