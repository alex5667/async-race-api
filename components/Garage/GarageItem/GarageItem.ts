import render from '../../../utils/render';
import { ICar } from '../../../interfaces';
import { Button } from '../../Button/Button';
import { CarImage } from '../../CarImage/CarImage';

import './GarageItem.scss';

export class GarageItem {
  public car: ICar;
  private itemContainer: HTMLDivElement;
  private startEngineCar: Button;
  private stopEngineCar: Button;
  private imageCar: HTMLDivElement;
  removeCar: (carId: number) => void = () => {};
  updateCar: (carId: number) => void = () => {};
  startEngine: (carId: number) => void = () => {};
  stopEngine: () => void = () => {};

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

    this.startEngineCar = new Button(bottomButtons, ['btn-bottom'], 'A');
    this.startEngineCar.onClick = () => {};
    this.stopEngineCar = new Button(bottomButtons, ['btn-bottom'], 'B', true);
    this.stopEngineCar.onClick = () => {};

    this.imageCar = render<HTMLDivElement>(containerBottom, 'div', [
      'image-car',
    ]);
    this.imageCar.innerHTML = CarImage(car.color);

    const finishFlag = render<HTMLImageElement>(containerBottom, 'img', [
      'finish-flag',
    ]);
    finishFlag.setAttribute('src', '../../../assets/flag-svgrepo-com.svg');
  }
}
