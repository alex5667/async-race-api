import render from '../../utils/render';
import { getAllCars } from '../../utils/api';
import { ICar } from '../../interfaces';
import { GarageContent } from '../../components/Garage/GarageContent/GarageContent';

export class PageGarage {
  parent: HTMLElement;
  page = 1;
  private garageContent: GarageContent;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    const garageContainer = render<HTMLDivElement>(
      this.parent,
      'div',
      ['garage__container'],
      'Garage',
    );
    this.getCars(this.page);

    this.garageContent = new GarageContent(garageContainer);


  }

  private async getCars(page: number): Promise<void> {
    const data = await getAllCars(page);

    if (data) {
      const carsArr: Array<ICar> = data.cars;
      const carLength: string = data.count;
      console.log(carsArr);
      console.log(carLength);

      this.garageContent.addItems(carsArr, carLength);
    }
  }
}
