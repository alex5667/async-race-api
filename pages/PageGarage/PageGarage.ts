import render from '../../utils/render';
import {
  getAllCarsApi,
  createCarApi,
  updateCarApi,
  deleteCarApi,
  deleteWinnerApi,
  getCar,
} from '../../utils/api';
import { ICar, ICreateCar, IUpdateCar } from '../../interfaces';
import { GarageContent } from '../../components/Garage/GarageContent/GarageContent';
import { GarageSettings } from '../../components/GarageSettings/GarageSettings';
import { cars } from '../../model/Cars';
import { randomColor } from '../../utils/randomColor';
import { GarageItem } from '../../components/Garage/GarageItem/GarageItem';

export class PageGarage {
  parent: HTMLElement;
  page = 1;
  private garageContent: GarageContent;
  private garageSettings: GarageSettings;

  resetCars: () => void = () => {};
  generateCars: () => void = () => {};
  updatePage: (page: number) => void = () => {};

  constructor(parent: HTMLElement) {
    this.parent = parent;

    const garageContainer = render<HTMLDivElement>(this.parent, 'div', [
      'garage__container',
    ]);
    this.getCars(this.page);

    this.garageSettings = new GarageSettings(garageContainer);
    this.garageSettings.createCar = async (state) => {
      await this.createCar(state);
      await this.getCars(this.page);
    };

    this.garageSettings.updateCar = (state) => this.updateCar(state);
    this.garageSettings.startRace = () => this.startRace();
    this.garageSettings.resetCars = () => this.resetCars();
    this.garageSettings.generateCars = () => this.generateRandomCars();

    this.garageContent = new GarageContent(garageContainer);
    this.garageContent.removeCar = (carId) => this.removeCar(carId);
    this.garageContent.updateCar = (carId) => this.getCar(carId);
    this.garageContent.updateView = (page) => {
      this.page = page;
      this.getCars(page);
    };
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

  private async createCar(car: ICreateCar): Promise<void> {
    await createCarApi(car);
  }

  private async updateCar(car: IUpdateCar): Promise<void> {
    await updateCarApi(car);
    await this.getCars(this.page);
  }

  private async generateRandomCars(): Promise<void> {
    this.garageSettingsBtn(true);
    const { mark, model } = cars;
    for (let i = 0; i <= 100; i -= -1) {
      const generateName = `${mark[Math.floor(Math.random() * mark.length)]} ${
        model[Math.floor(Math.random() * model.length)]
      }`;

      // eslint-disable-next-line no-await-in-loop
      await this.createCar({
        name: generateName,
        color: randomColor(),
      });
    }

    await this.getCars(this.page);
    this.garageSettingsBtn(false);
  }

  private async removeCar(carId: number): Promise<void> {
    await deleteCarApi(carId);
    await deleteWinnerApi(carId);
    await this.getCars(this.page);
  }

  private async getCar(carId: number): Promise<void> {
    const car = await getCar(carId);

    if (car) this.garageSettings.updateState(car);
  }

  private async startRace(): Promise<void> {
    this.garageSettingsBtn(true);

    this.garageContent.cars.map(async (car) => {
      await car.startCarEngine(car.car.id);
      car.disableAllButtons();
      return car;
    });
  }

  private garageSettingsBtn(set: boolean) {
    this.garageSettings.settingsButtons.btnRace.setDisabled(set);
    this.garageSettings.settingsButtons.btnGenerate.setDisabled(set);
  }
}
