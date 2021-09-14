import {RenderPosition} from '../consts.js';
import Abstract from '../view/abstract.js';
import {siteBodyElement} from '../presenter/films-list.js';

export const isCtrlEnterEvent = (evt) => evt.ctrlKey && 'Enter'.includes(evt.key);
export const isTopRatedFilms = (films) => films.filter((film) => film.filmInfo.totalRating > 0);
export const isTopCommentedFilms = (films) => films.filter((film) => film.comments.length > 0);

export const isAvailability = (element) => {
  if(element && !(element instanceof Abstract)) {
    element.remove();
  }
};

export const escKeyDownHandler = (evt) => {
  if(evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    siteBodyElement.classList.remove('hide-overflow');
    const filmDetails = document.querySelector('.film-details');
    filmDetails.querySelector('.film-details__add-emoji-label').innerHTML = ' ';
    const textCommentContainer = filmDetails.querySelector('.film-details__comment-input');
    textCommentContainer.value = '';
    isAvailability(filmDetails);
  }
};

export const renderElement = (container, child, place) => {
  if(container instanceof Abstract) {
    container = container.getElement();
  }

  if(child instanceof Abstract) {
    child = child.getElement();
  }

  switch(place) {
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
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const remove = (component) => {
  if(component === null) {
    return;
  }

  if(!(component instanceof Abstract)) {
    component.remove();
  }

  component.getElement().remove();
  component.removeElement();
};

export const getUpdateFilm = (presenter, update, container, filter) => {
  presenter.get(update.id).init(update, container, filter);
};

export const replace = (newChild, oldChild) => {
  if(oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if(newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;
  if(parent) {
    parent.replaceChild(newChild, oldChild);
  }
};
