import {createElement} from '../../utils.js';
import {createCardFilmTemplate} from './card-film-tpl';

export default class CardFilm {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {

    return createCardFilmTemplate(this._film);
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
