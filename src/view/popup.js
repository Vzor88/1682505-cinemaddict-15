import {createElement} from '../utils.js';
import {createPopupTemplate} from './template.js';

export default class Popup {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
