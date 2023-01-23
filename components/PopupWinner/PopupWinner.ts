import { IWinnerData } from '../../interfaces';
import render from '../../utils/render';
import './PopupWinner.scss';

export class PopupWinner {
  popupContent: HTMLDivElement;
  constructor(parent: HTMLElement, carData: IWinnerData) {
    this.popupContent = render<HTMLDivElement>(parent, 'div', ['popup-winner']);

    const popupTitle = render<HTMLDivElement>(this.popupContent, 'div', [
      'popup-title',
    ]);

    popupTitle.style.color = `${carData.color}`;
    popupTitle.innerHTML = `
      Winner
      <span>${carData.name}</span>
      in
      <span>${carData.speed}</span>
      sec...
    `;
  }

  destroy(): void {
    this.popupContent.remove();
  }
}
