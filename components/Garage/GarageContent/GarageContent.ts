import render from '../../../utils/render';
import { ICar } from '../../../interfaces';
import { GarageItem } from '../GarageItem/GarageItem';

import './GarageContent.scss';

export class GarageContent {
  private content: HTMLDivElement;
  private container: HTMLDivElement;

  cars: Array<GarageItem>;
  title: HTMLDivElement;
  removeCar: (carId: number) => void = () => {};
  updateCar: (carId: number) => void = () => {};

  constructor(parent: HTMLElement) {
    this.container = render<HTMLDivElement>(parent, 'div', [
      'garage-container',
    ]);

    this.cars = [];
    this.title = render<HTMLDivElement>(this.container, 'h2', [
      'content__title',
    ]);

    this.content = render<HTMLDivElement>(this.container, 'div', [
      'garage__content',
    ]);
  }

  addItems(cars: Array<ICar>, carsLength: string): void {
    this.clear();

    this.updateTitle(carsLength);

    this.cars = cars.map((car) => {
      const item = new GarageItem(this.content, car);
      item.removeCar = (carId) => this.removeCar(carId);
      item.updateCar = (carId) => this.updateCar(carId);
      return item;
    });
  }

  private updateTitle(carsLength: string) {
    this.title.innerHTML = `Garage - ${carsLength} cars`;
  }

  private clear() {
    this.content.innerHTML = '';
    this.cars = [];
  }
}
