import render from '../../utils/render';

export class PageGarage {
  parent: HTMLElement;
  constructor(parent: HTMLElement) {
    this.parent = parent;
  }

  init(): void {
    render<HTMLDivElement>(this.parent, 'div', ['garage__container'], 'Garage');
  }
}
