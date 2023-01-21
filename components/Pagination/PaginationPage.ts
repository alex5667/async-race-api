import { Button } from '../Button/Button';
import render from '../../utils/render';
import './PaginationPage.scss';

export class PaginationPage {
  updateView: (page: number) => void = () => {};
  private page = 1;
  private title: HTMLDivElement;
  private content: HTMLDivElement;
  nextButton: Button;
  prevButton: Button;

  constructor(parent: HTMLElement) {
    this.content = render<HTMLDivElement>(parent, 'div', [
      'pagination__content',
    ]);

    this.title = render<HTMLDivElement>(
      this.content,
      'div',
      ['pagination__title'],
      `Page #${this.page}`,
    );

    this.prevButton = new Button(this.content, ['btn-prev'], 'Prev', true);
    this.prevButton.onClick = () => this.handleChangePage('prev');

    this.nextButton = new Button(this.content, ['btn-next'], 'Next');
    this.nextButton.onClick = () => this.handleChangePage('next');
  }

  updateNextButton(page: number, totalCount: number, limit: number): void {
    if (page > totalCount / limit) {
      this.nextButton.setDisabled(true);
    } else {
      this.nextButton.setDisabled(false);
    }
  }

  private updatePrevButton(): void {
    if (this.page === 1) {
      this.prevButton.setDisabled(true);
    } else {
      this.prevButton.setDisabled(false);
    }
  }

  private handleChangePage(btn: string) {
    if (btn === 'prev') {
      if (this.page > 1) this.page--;
    }

    if (btn === 'next') this.page++;

    this.title.innerHTML = `Page #${this.page}`;
    this.updateView(this.page);
    this.updatePrevButton();
  }
}
