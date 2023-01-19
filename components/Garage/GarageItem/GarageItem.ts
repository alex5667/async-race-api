import render from '../../../utils/render';
import { ICar } from '../../../interfaces';

import './GarageItem.scss';

export class GarageItem {
  public car: ICar;

  constructor(parent: HTMLElement, car: ICar) {
    this.car = car;
    render<HTMLDivElement>(parent, 'div', ['garage-item'], 'garage-item');
  }
}
