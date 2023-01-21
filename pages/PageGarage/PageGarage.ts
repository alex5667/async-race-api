import render from '../../utils/render';
import { getAllCarsApi } from '../../utils/api';
import { ICar } from '../../interfaces';
import { GarageContent } from '../../components/Garage/GarageContent/GarageContent';
import { GarageSettings } from '../../components/GarageSettings/GarageSettings';

export class PageGarage {
  parent: HTMLElement;
  page = 1;
  private garageContent: GarageContent;
  private garageSettings: GarageSettings;

  constructor(parent: HTMLElement) {
    this.parent = parent;

    const garageContainer = render<HTMLDivElement>(this.parent, 'div', [
      'garage__container',
    ]);
    this.getCars(this.page);

    this.garageSettings = new GarageSettings(garageContainer);

    this.garageContent = new GarageContent(garageContainer);

  }

  private async getCars(page: number): Promise<void> {
    const data = await getAllCarsApi(page);

    if (data) {
      const carsArr: Array<ICar> = data.cars;
      const carLength: string = data.count;

      this.garageContent.addItems(carsArr, carLength);

      this.garageContent.paginationPage.updateNextButton(
        this.page,
        +carLength,
        7,
      );
    }
  }
}
