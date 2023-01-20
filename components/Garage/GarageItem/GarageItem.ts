import render from '../../../utils/render';
import { ICar, IEngine } from '../../../interfaces';
import { Button } from '../../Button/Button';
import { CarImage } from '../../CarImage/CarImage';
import {
  startEngineApi,
  switchToDriveModeApi,
  stopEngineApi,
} from '../../../utils/api';

import './GarageItem.scss';

const carImageWidth = 100;

export class GarageItem {
  public car: ICar;
  private itemContainer: HTMLDivElement;
  private startEngineButton: Button;
  private stopEngineButton: Button;
  private imageCar: HTMLDivElement;
  private carAnimation: Animation | undefined;
  public speed = 0;

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

    this.startEngineButton = new Button(bottomButtons, ['btn-bottom'], 'A');
    this.startEngineButton.onClick = () => {
      if (car.id) this.startCarEngine(car.id);
    };

    this.stopEngineButton = new Button(
      bottomButtons,
      ['btn-bottom'],
      'B',
      true,
    );
    this.stopEngineButton.onClick = () => {
      if (car.id) this.stopCarEngine(car.id);
    };

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
      await this.switchToDriveMode(result);
    }
  }

  updateButtons(type = false): void {
    this.startEngineButton.setDisabled(type);
    this.stopEngineButton.setDisabled(!type);
  }

  private animationCar(time: number): void {
    this.carAnimation = this.imageCar.animate(
      [{ left: '100px' }, { left: `calc(100% - ${carImageWidth}px)` }],
      {
        duration: time,
        easing: 'ease-in-out',
      },
    );
    this.carAnimation.play();
    this.carAnimation.onfinish = () => {
      this.imageCar.style.left = `calc(100% - ${carImageWidth}px)`;
    };
  }

  private async switchToDriveMode(car: IEngine): Promise<void> {
    const driveMode = await switchToDriveModeApi(this.car.id);
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
      this.imageCar.style.left = `${carImageWidth}px`;
    }
  }

  disableAllButtons(): void {
    this.startEngineButton.setDisabled(true);
    this.stopEngineButton.setDisabled(false);
  }
}
