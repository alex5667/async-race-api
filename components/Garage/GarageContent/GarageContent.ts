import render from '../../../utils/render';
import { ICar } from '../../../interfaces';
import { GarageItem } from '../GarageItem/GarageItem';
import { PaginationPage } from '../../Pagination/PaginationPage';

import './GarageContent.scss';

export class GarageContent {
  private content: HTMLDivElement;
  private container: HTMLDivElement;
  paginationPage: PaginationPage;

  cars: Array<GarageItem>;
  title: HTMLDivElement;
  removeCar: (carId: number) => void = () => {};
  updateCar: (carId: number) => void = () => {};
  updateView: (page: number) => void = () => {};

  constructor(parent: HTMLElement) {
    this.container = render<HTMLDivElement>(parent, 'div', [
      'garage-container',
    ]);

    this.cars = [];
    this.title = render<HTMLDivElement>(this.container, 'h2', [
      'content__title',
    ]);

    this.paginationPage = new PaginationPage(this.container);

    this.content = render<HTMLDivElement>(this.container, 'div', [
      'garage__content',
    ]);
    this.paginationPage.updateView = (page) => this.updateView(page);
  }

  addItems(cars: Array<ICar>, carsLength: string): void {
    this.content.innerHTML = '';
    this.cars = [];

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
}
