import render from '../../utils/render';

export class PageGarage {
  constructor(parent: HTMLElement) {
    const garageEl = render<HTMLDivElement>(parent, 'section', ['garage']);
    const garageContainer = render<HTMLDivElement>(
      garageEl,
      'div',
      ['garage__container'],
      'Garage',
    );
  }
}
