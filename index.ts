import { App } from './app';
import './index.scss';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.body;
  const app = new App(root);

  app.init();
});
