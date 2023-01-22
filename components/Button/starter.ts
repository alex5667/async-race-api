import render from '../../utils/render';
import './Button.scss';

export type EventListener = [string, () => void];

export class ButtonR {
  // onClick: () => void = () => {};
  button: HTMLButtonElement;

  constructor(
    parent: HTMLElement,
    classNames: string[] = [],
    label: string,
    disabled = false,
  ) {
    this.button = render<HTMLButtonElement>(parent, 'button', ['btn'], label);

    this.button.classList.add(...classNames);

    // this.button.addEventListener(listener[0], listener[1]);

    if (disabled) {
      this.setDisabled(true);
    }

  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  addeventlistener(event: string, cb: () => {}): void {
    this.button.addEventListener(event, cb);
  }

  setDisabled(type = false): void {
    console.log(this.button)
    this.button.toggleAttribute('disabled', type);
  }

  removeDisabled(): void {
    this.button.removeAttribute('disabled');
  }
}
