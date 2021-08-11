import {createElement} from '../../utils.js';
import {createNoFilmTemplate} from './no-films-tpl.js';

export default class NoFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilmTemplate();
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
