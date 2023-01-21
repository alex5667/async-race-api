import render from '../../utils/render';
import { Input } from '../Input/Input';
import { ICreateCar } from '../../interfaces';

export class SettingsInputs {
  inputsContainer: HTMLDivElement;
  inputText: Input;
  inputColor: Input;
  state = {
    name: '',
    color: '#000000',
  };

  constructor(
    parent: HTMLElement,
    buttonText: string,
    classNames: string[] = [],
  ) {
    this.inputsContainer = render<HTMLDivElement>(parent, 'div', [
      'settings-inputs',
    ]);
    const inputContent = render<HTMLDivElement>(this.inputsContainer, 'div', [
      'setting-input',
    ]);

    this.inputText = new Input(inputContent, 'text', ['input-text']);
    this.inputText.getInputValue = (e) => this.updateState('name', e);

    this.inputColor = new Input(
      inputContent,
      'color',
      ['input-color'],
      '#000000',
    );
    this.inputColor.getInputValue = (e) => this.updateState('color', e);

  }

  updateState(key: keyof ICreateCar, e: Event): void {
    const input = e.target as HTMLInputElement;
    this.state[key] = input.value;

    // this.button.element.toggleAttribute('disabled', this.state.name === '');
  }
}
