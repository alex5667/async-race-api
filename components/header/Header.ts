import { Component } from '../../utils/component';
import './Header.scss';

export class Header extends Component {
  buttonGarage: Component;
  constructor(parent: HTMLElement) {
    super(parent, 'div', ['header']);
    const headerEl = document.querySelector('.header') as HTMLElement;
    super(headerEl, 'div', ['header__container']);
    const headerContainer = document.querySelector(
      '.header__container',
    ) as HTMLElement;

    this.buttonGarage = new Component(
      headerContainer,
      'a',
      ['garage', 'link-nav'],
      'Garage',
    );
  }
}
