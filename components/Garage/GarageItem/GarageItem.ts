import render from '../../../utils/render';
import { ICar } from '../../../interfaces';

import './GarageItem.scss';

export class GarageItem {
  public car: ICar;

  constructor(parent: HTMLElement, car: ICar) {
    this.car = car;
    const itemContainer = render<HTMLDivElement>(parent, 'div', ['garage__item']);
    const carTop = render<HTMLDivElement>(itemContainer, 'div', ['item__top']);

  }
}
