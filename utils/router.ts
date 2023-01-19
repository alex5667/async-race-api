// import render from './render';
import { PageGarage } from '../pages/PageGarage/PageGarage';
import { PageWinners } from '../pages/PageWinners/PageWinners';
import { IRoute } from '../interfaces';

export class Router {
  pageGarage: PageGarage;
  pageWinners: PageWinners;
  rootEl: HTMLElement;

  private routes: Array<IRoute>;
  private defaultRoute: IRoute;

  constructor(root: HTMLElement) {
    this.rootEl = root;
    this.pageGarage = new PageGarage(this.rootEl);
    this.pageWinners = new PageWinners(this.rootEl);

    this.routes = [
      {
        path: '/',
        page: () => {
          this.pageGarage = new PageGarage(this.rootEl);
        },
      },
      {
        path: '/winners',
        page: () => {
          this.pageWinners = new PageWinners(this.rootEl);
        },
      },
    ];
    this.defaultRoute = {
      path: 'Default router',
      page: () => {
        this.rootEl.innerHTML = 'Default Page';
      },
    };
  }

  update(): void {
    this.rootEl.innerHTML = '';
    const hash = window.location.hash.slice(1);
    const currentRoute = this.routes.find((page) => page.path === hash);
    (currentRoute || this.defaultRoute).page();
  }

  init(): void {
    if (window.location.hash === '') {
      window.location.hash = '#/';
    }

    window.onpopstate = () => this.update();
    this.update();
  }
}
