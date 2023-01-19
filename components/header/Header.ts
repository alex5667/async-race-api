import render from '../../utils/render';
import './Header.scss';

export class Header {
  constructor(parent: HTMLElement) {
    const headerEl = render<HTMLDivElement>(parent, 'div', ['header']);
    const headerContainer = render<HTMLDivElement>(headerEl, 'div', [
      'header__container',
    ]);
    const linkToGarage = render<HTMLAnchorElement>(
      headerContainer,
      'a',
      ['link-garage', 'link-nav'],
      'Garage',
    );
    linkToGarage.setAttribute('href', '#/');

    const logoTitle = render<HTMLParagraphElement>(
      headerContainer,
      'p',
      ['header__title'],
      'Async Race',
    );

    const linkToWinners = render<HTMLAnchorElement>(
      headerContainer,
      'a',
      ['link-winners', 'link-nav'],
      'Winners',
    );
    linkToWinners.setAttribute('href', '#/winners');

  }
}
