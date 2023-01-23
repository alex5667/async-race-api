import render from '../../utils/render';
import './Header.scss';

export class Header {
  navLinks: HTMLAnchorElement[];
  constructor(parent: HTMLElement) {
    const headerEl = render<HTMLDivElement>(parent, 'section', ['header']);
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

    render<HTMLParagraphElement>(
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

    this.navLinks = [linkToGarage, linkToWinners];
    window.addEventListener('hashchange', () =>
      this.updateActive(this.navLinks),
    );
    window.addEventListener('load', () => this.updateActive(this.navLinks));
  }

  private updateActive(navLinks: HTMLAnchorElement[]): void {
    this.navLinks = navLinks.map((link) => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === window.location.hash) {
        link.classList.add('nav__link--active');
      }

      return link;
    });
  }
}
