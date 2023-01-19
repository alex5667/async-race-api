import { Header } from './components/header/Header';
import { PageGarage } from './pages/PageGarage/PageGarage';
import { PageWinners } from './pages/PageWinners/PageWinners';

export class App {
  constructor(private root: HTMLElement) {
    const header = new Header(this.root);
    const garage = new PageGarage(this.root);
    const wiiners = new PageWinners(this.root);

  }
}
