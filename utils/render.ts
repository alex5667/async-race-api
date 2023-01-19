export type Parent = string | HTMLElement;

const render = <T extends HTMLElement>(
  parent: string | HTMLElement,
  tag: keyof HTMLElementTagNameMap = 'div',
  classNames: string[] = [],
  content?: string,
): T => {
  const element = document.createElement(tag) as T;

  element.classList.add(...classNames);
  if (content) {
    element.textContent = content;
  } else {
    element.textContent = '';
  }
  if (parent) {
    let root: HTMLElement;

    if (typeof parent === 'string' && document.querySelector(parent)) {
      root = document.querySelector(parent) as HTMLElement;
      root.append(element);
    } else if (parent instanceof HTMLElement) {
      root = parent;
      root.append(element);
    }
  }

  return element;
};

export default render;
