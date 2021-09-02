import {RenderPosition} from '../consts.js';
import Abstract from '../view/abstract.js';

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
export const isCtrlEnterEvent = (evt) => evt.ctrlKey && 'Enter'.includes(evt.key);

export const isAvailability = (element) => {
  if (element && !(element instanceof Abstract)) {
    element.remove();
  }
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
    default:
      container.append(child);
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

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    component.remove();
  }

  component.getElement().remove();
  component.removeElement();
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  parent.replaceChild(newChild, oldChild);
};
