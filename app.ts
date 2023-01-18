import { Header } from './components/header/Header';
// import { Component } from './utils/component';


export class App {
  constructor(private root: HTMLElement) {
    const header = new Header(this.root);
  }
}
