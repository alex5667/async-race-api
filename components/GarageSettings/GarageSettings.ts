import render from '../../utils/render';
import { SettingsInputs } from './SettingsInputs';

export class GarageSettings {
  settingsContainer: HTMLDivElement;

  constructor(parent: HTMLElement) {
    this.settingsContainer = render<HTMLDivElement>(parent, 'div', [
      'garage-settings',
    ]);
    const createInputs = new SettingsInputs(this.settingsContainer, 'create', [
      'garage-create-inputs',
    ]);
    // createInputs.createCar = (state) => this.createCar(state);


  }
}
