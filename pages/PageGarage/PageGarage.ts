import render from '../../utils/render';
import {
  getAllCarsApi,
  createCarApi,
  updateCarApi,
  deleteCarApi,
  getCarApi,
  getWinnerApi,
  setWinnerApi,
} from '../../utils/api';
import {
  ICar,
  ICreateCar,
  IUpdateCar,
  IWinnerData,
  IWinner,
} from '../../interfaces';
import { GarageContent } from '../../components/Garage/GarageContent/GarageContent';
import { GarageSettings } from '../../components/GarageSettings/GarageSettings';
import { cars } from '../../model/Cars';
import { randomColor } from '../../utils/randomColor';
import { GarageItem } from '../../components/Garage/GarageItem/GarageItem';
import { PopupWinner } from '../../components/PopupWinner/PopupWinner';

export class PageGarage {
  parent: HTMLElement;
  page = 1;
  private garageContent: GarageContent;
  private garageSettings: GarageSettings;
  garageContainer: HTMLDivElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;

    this.garageContainer = render<HTMLDivElement>(this.parent, 'div', [
      'garage__container',
    ]);
    this.getCars(this.page);

    this.garageSettings = new GarageSettings(this.garageContainer);
    this.garageSettings.updateCar = (state) => this.updateCar(state);
    this.garageContent = new GarageContent(this.garageContainer);
    this.garageContent.removeCar = (carId) => this.removeCar(carId);
    this.garageContent.updateCar = (carId) => this.getCar(carId);
    this.garageContent.updateView = (page) => {
      this.page = page;
      this.getCars(page);
    };
    this.btnGarageSettingsAddListener();
    this.garageSettings.createCar = async (state) => {
      await this.createCar(state);
      await this.getCars(this.page);
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
    await deleteCarApi(carId, 'garage');
    await deleteCarApi(carId, 'winners');
    await this.getCars(this.page);
  }

  private async getCar(carId: number): Promise<void> {
    const car = await getCarApi(carId);

    if (car) this.garageSettings.updateState(car);
  }

  private resetCars(): void {
    this.garageSettings.settingsButtons.btnReset.setDisabled(true);

    const allCarsToReset = this.garageContent.cars?.map(async (car) => {
      await car.stopCarEngine(car.car.id);
    });

    Promise.all(allCarsToReset).then(() => {
      this.garageSettings.settingsButtons.btnRace.removeDisabled();
      this.garageSettings.settingsButtons.btnGenerate.removeDisabled();
    });
  }

  async startRace(): Promise<void> {
    this.garageSettingsBtn(true);
    const res: Promise<GarageItem>[] = this.garageContent.cars.map(
      async (car) => {
        await car.startCarEngine(car.car.id);
        car.disableAllButtons();
        return car;
      },
    );

    const winnerCar = await Promise.race(res);

    const winnerData: IWinnerData = {
      id: winnerCar.car.id,
      name: winnerCar.car.name,
      color: winnerCar.car.color,
      speed: +(winnerCar.speed / 1000).toFixed(2),
      wins: 1,
    };

    const popupWinner = new PopupWinner(this.garageContainer, winnerData);
    this.garageSettings.settingsButtons.btnReset.removeDisabled();
    setTimeout(() => popupWinner?.destroy(), 5000);

    await this.setWinner(winnerData);
  }

  private async setWinner(winnerCar: IWinnerData): Promise<void> {
    const winnerData = await getWinnerApi(winnerCar.id);

    if (winnerData.status === 200) {
      winnerData.result.wins++;
      winnerCar.wins = winnerData.result.wins;

      await this.updateWinner(winnerCar);
    } else {
      await this.createWinner(winnerCar);
    }
  }

  private garageSettingsBtn(set: boolean) {
    this.garageSettings.settingsButtons.btnRace.setDisabled(set);
    this.garageSettings.settingsButtons.btnGenerate.setDisabled(set);
  }

  private btnGarageSettingsAddListener() {
    this.garageSettings.settingsButtons.btnRace.addeventlistener(
      'click',
      this.startRace.bind(this),
    );
    this.garageSettings.settingsButtons.btnReset.addeventlistener(
      'click',
      this.resetCars.bind(this),
    );

    this.garageSettings.settingsButtons.btnGenerate.addeventlistener(
      'click',
      this.generateRandomCars.bind(this),
    );
  }

  private async updateWinner(winnerData: IWinnerData): Promise<void> {
    const carObj: IWinner = {
      id: winnerData.id,
      wins: winnerData.wins,
      time: winnerData.speed,
    };

    await setWinnerApi(carObj, 'PUT');
  }

  private async createWinner(winnerData: IWinnerData): Promise<void> {
    const carObj = {
      id: winnerData.id,
      wins: 1,
      time: winnerData.speed,
    };

    await setWinnerApi(carObj, 'POST');
  }
}
