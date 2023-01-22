import render from '../../utils/render';
import { Input } from '../Input/Input';
import { ICreateCar } from '../../interfaces';
import { Button } from '../Button/Button';

export class SettingsInputs {
  createCar: (state: ICreateCar) => void = () => {};
  buttonEl: HTMLButtonElement;
  inputsContainer: HTMLDivElement;
  inputText: Input;
  inputColor: Input;
  button: Button;
  state = {
    name: '',
    color: '#000000',
  };

  constructor(
    parent: HTMLElement,
    btnLabel: string,
    classNames: string[] = [],
  ) {
    this.inputsContainer = render<HTMLDivElement>(parent, 'div', [
      'settings-inputs',
    ]);

    const inputContent = render<HTMLDivElement>(this.inputsContainer, 'div', [
      'setting-input',
    ]);
    this.inputsContainer.classList.add(...classNames);
    this.inputText = new Input(inputContent, 'text', ['input-text']);
    this.inputText.getInputValue = (e) => this.updateState('name', e);

    this.inputColor = new Input(
      inputContent,
      'color',
      ['input-color'],
      '#808080',
    );
    this.inputColor.getInputValue = (e) => this.updateState('color', e);

    this.button = new Button(inputContent, ['create-button'], btnLabel);
    this.buttonEl = document.querySelector(
      '.create-button',
    ) as HTMLButtonElement;
    this.buttonEl.setAttribute('disabled', '');

    this.button.onClick = () => {
      this.createCar(this.state);
      this.resetSettings();
    };
  }

  updateState(key: keyof ICreateCar, e: Event): void {
    const input = e.target as HTMLInputElement;
    this.state[key] = input.value;
    this.buttonEl.toggleAttribute('disabled', this.state.name === '');
  }

  resetSettings(): void {
    this.state = {
      name: '',
      color: '#808080',
    };

    this.updateInputs();
  }

  updateInputs(): void {
    this.button.setDisabled(true);
    const inputTextEl = document.querySelector(
      '.input-text',
    ) as HTMLInputElement;
    inputTextEl.value = this.state.name;
    const inputColor = document.querySelector(
      '.input-color',
    ) as HTMLInputElement;
    inputColor.value = this.state.color;

    this.buttonEl.setAttribute('disabled', '');
  }
}
