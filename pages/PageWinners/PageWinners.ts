import render from '../../utils/render';

export class PageWinners {
  constructor(parent: HTMLElement) {
    const winnersEl = render<HTMLDivElement>(parent, 'section', ['garage']);
    const winnersContainer = render<HTMLDivElement>(
      winnersEl,
      'div',
      ['winners__container'],
      'Winners',
    );
  }
}

