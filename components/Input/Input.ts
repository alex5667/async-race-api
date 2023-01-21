import render from '../../utils/render';

import './Input.scss';

export class Input {
  getInputValue: (e: Event) => void = () => {};

  constructor(
    parent: HTMLElement,
    type: string,
    classNames: string[] = [],
    initValue?: string,
  ) {
    const input = render<HTMLInputElement>(parent, 'input', ['ui-input']);

    input.setAttribute('type', type);
    input.classList.add(...classNames);

    if (initValue) {
      input.setAttribute('value', initValue);
    }

    input.addEventListener('input', (e) => this.getInputValue(e));
  }
}
