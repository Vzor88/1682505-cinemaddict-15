import {siteBodyElement} from '../main.js';
import Abstract from '../view/abstract.js';

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
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
