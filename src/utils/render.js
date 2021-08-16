import {siteBodyElement} from '../main.js';
import Abstract from '../view/abstract.js';

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const render = (container, element) => {
  renderElement(container, element.getElement(), RenderPosition.BEFOREEND);
};

export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template;
  return newElement.firstChild;
};


export const onEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    const popup = document.querySelector('.film-details');
    evt.preventDefault();
    popup.remove();
    siteBodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    component.remove();
  }

  component.getElement().remove();
  component.removeElement();
};
