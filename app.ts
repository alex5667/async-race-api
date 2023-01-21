import { Header } from './components/HeaderComponent/Header';

import render from './utils/render';
import { Router } from './utils/router';

export class App {
  router: Router;
  mainSection: HTMLElement;
  constructor(private root: HTMLElement) {
    const header = new Header(this.root);
    this.mainSection = render<HTMLDivElement>(this.root, 'section', ['main']);

    this.router = new Router(this.mainSection);
  }

  init(): void {
    this.router.init();
  }
}
