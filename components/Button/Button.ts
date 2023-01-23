import render from '../../utils/render';
import './Button.scss';

export class Button {
  onClick: () => void = () => {};
  button: HTMLButtonElement;

  constructor(
    parent: HTMLElement,
    classNames: string[] = [],
    label: string,
    disabled = false,
  ) {
    this.button = render<HTMLButtonElement>(parent, 'button', ['btn'], label);

    this.button.classList.add(...classNames);
    this.button.addEventListener('click', () => this.onClick());

    if (disabled) {
      this.setDisabled(true);
    }
  }

  addeventlistener(event: string, cb: () => void): void {
    this.button.addEventListener(event, cb);
  }

  setDisabled(type = false): void {
    this.button.toggleAttribute('disabled', type);
  }

  removeDisabled(): void {
    this.button.removeAttribute('disabled');
  }
}
