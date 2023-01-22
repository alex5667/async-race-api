import { Button } from '../Button/Button';
import render from '../../utils/render';

export class SettingsButtons {
  btnRace: Button;
  btnReset: Button;
  btnGenerate: Button;
  settingsButtons: HTMLDivElement;

  constructor(parent: HTMLElement) {
    this.settingsButtons = render<HTMLDivElement>(parent, 'div', [
      'settings-buttons',
    ]);

    this.btnRace = new Button(
      this.settingsButtons,
      ['race-button'],
      'Race',
      false,
    );

    this.btnReset = new Button(
      this.settingsButtons,
      ['reset-button'],
      'Reset',
      true,
    );

    this.btnGenerate = new Button(
      this.settingsButtons,
      ['generate-button'],
      'Generate Cars',
    );
  }
}
