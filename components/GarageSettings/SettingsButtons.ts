import { Button } from '../Button/Button';
import render from '../../utils/render';

export class SettingsButtons {
  startRace: () => void = () => {};
  resetCars: () => void = () => {};
  generateCars: () => void = () => {};
  btnRace: Button;
  btnReset: Button;
  btnGenerate: Button;
  settingsButtons: HTMLDivElement;

  constructor(parent: HTMLElement) {
    this.settingsButtons = render<HTMLDivElement>(parent, 'div', [
      'settings-buttons',
    ]);

    this.btnRace = new Button(this.settingsButtons, ['race-button'], 'Race');
    this.btnRace.onClick = () => this.startRace();

    this.btnReset = new Button(
      this.settingsButtons,
      ['reset-button'],
      'Reset',
      true,
    );
    this.btnReset.onClick = () => this.resetCars();

    this.btnGenerate = new Button(
      this.settingsButtons,
      ['generate-button'],
      'Generate Cars',
    );
    this.btnGenerate.onClick = () => this.generateCars();
  }
}
