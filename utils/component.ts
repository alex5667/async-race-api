export class Component {
  element: HTMLElement;
  constructor(
    parent: HTMLElement,
    tag: keyof HTMLElementTagNameMap = 'div',
    classNames: string[] = [],
    content?: string,
  ) {
    this.render(parent, tag, classNames, content);
  }

  render(
    parent: HTMLElement,
    tagtag: keyof HTMLElementTagNameMap,
    classNames: string[] = [],
    content?: string,
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...classNames);
    if (content) {
      this.element.textContent = content;
    } else {
      this.element.textContent = '';
    }
    if (parent) {
      parent.append(this.element);
    }
  }
}
