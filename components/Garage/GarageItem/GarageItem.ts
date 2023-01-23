import render from '../../../utils/render';
import { ICar, IEngine } from '../../../interfaces';
import { Button } from '../../Button/Button';
import { CarImage } from '../../CarImage/CarImage';
import {
  startEngineApi,
  switchToDriveApi,
  stopEngineApi,
} from '../../../utils/api';

import './GarageItem.scss';

export class GarageItem {
  public car: ICar;
  private itemContainer: HTMLDivElement;
  private startEngine: Button;
  private stopEngine: Button;
  private imageCar: HTMLDivElement;
  private carAnimation: Animation | undefined;
  public speed = 0;
  private carImageWidth = 100;

  removeCar: (carId: number) => void = () => {};
  updateCar: (carId: number) => void = () => {};

  constructor(parent: HTMLElement, car: ICar) {
    this.car = car;
    this.itemContainer = render<HTMLDivElement>(parent, 'div', [
      'garage__item',
    ]);
    const containerTop = render<HTMLDivElement>(this.itemContainer, 'div', [
      'item__top',
    ]);

    const selectBtn = new Button(containerTop, ['btn-top'], 'Select');
    selectBtn.onClick = () => {
      if (car.id) this.updateCar(car.id);
    };

    const removeBtn = new Button(containerTop, ['btn-top'], 'Remove');
    removeBtn.onClick = () => {
      if (car.id) this.removeCar(car.id);
      this.itemContainer.remove();
    };

    render<HTMLDivElement>(containerTop, 'span', ['span__top'], car.name);

    const containerBottom = render<HTMLDivElement>(this.itemContainer, 'div', [
      'item__bottom',
    ]);

    const bottomButtons = render<HTMLDivElement>(containerBottom, 'div', [
      'bottom__buttons',
    ]);

    this.startEngine = new Button(bottomButtons, ['btn-bottom'], 'A');
    this.startEngine.addeventlistener('click', () =>
      this.startCarEngine(car.id),
    );

    this.stopEngine = new Button(bottomButtons, ['btn-bottom'], 'B', true);
    this.stopEngine.addeventlistener('click', () => this.stopCarEngine(car.id));

    this.imageCar = render<HTMLDivElement>(containerBottom, 'div', [
      'image-car',
    ]);
    this.imageCar.innerHTML = CarImage(car.color);

    const finishFlag = render<HTMLImageElement>(containerBottom, 'img', [
      'finish-flag',
    ]);
    finishFlag.setAttribute('src', '../../../assets/flag-svgrepo-com.svg');
  }

  async startCarEngine(carId: number): Promise<void> {
    const data = await startEngineApi(carId);
    if (data.status === 200) {
      this.updateButtons(true);

      const { result } = data;
      const time = result.distance / result.velocity;

      this.animationCar(time);
      await this.switchToDrive(result);
    }
  }

  updateButtons(type = false): void {
    this.startEngine.setDisabled(type);
    this.stopEngine.setDisabled(!type);
  }

  private animationCar(time: number): void {
    this.carAnimation = this.imageCar.animate(
      [{ left: '100px' }, { left: `calc(100% - ${this.carImageWidth}px)` }],
      {
        duration: time,
        easing: 'ease-in-out',
      },
    );
    this.carAnimation.play();
    this.carAnimation.onfinish = () => {
      this.imageCar.style.left = `calc(100% - ${this.carImageWidth}px)`;
    };
  }

  private async switchToDrive(car: IEngine): Promise<void> {
    const driveMode = await switchToDriveApi(this.car.id);
    return new Promise((resolve) => {
      if (driveMode === 500) {
        this.carAnimation?.pause();
      }
      if (driveMode === 200) {
        this.speed = Math.floor(car.distance / car.velocity);
        resolve();
      }
    });
  }

  async stopCarEngine(carId: number): Promise<void> {
    const res = await stopEngineApi(carId);

    if (res.status === 200) {
      this.updateButtons();
      this.speed = 0;
      this.carAnimation?.pause();
      this.imageCar.style.left = `${this.carImageWidth}px`;
    }
  }

  disableAllButtons(): void {
    this.startEngine.setDisabled(true);
    this.stopEngine.setDisabled(false);
  }
}
