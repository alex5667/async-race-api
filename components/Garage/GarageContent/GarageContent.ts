import render from '../../../utils/render';
import { ICar } from '../../../interfaces';
import { GarageItem } from '../GarageItem/GarageItem';

import './GarageContent.scss';

export class GarageContent {
  content: HTMLDivElement;
  cars: Array<GarageItem>;

  constructor(parent: HTMLElement) {
    this.cars = [];
    this.content = render<HTMLDivElement>(parent, 'div', ['garage__content']);
  }

  addItems(cars: Array<ICar>, carsLength: string): void {
    console.log(carsLength);

    this.cars = cars.map((car) => {
      const item = new GarageItem(this.content, car);
      return item;
    });
  }
}
