import AbstractView from '../abstract.js';
import {createNoFilmTemplate} from './no-films-tpl.js';

export default class NoFilms extends AbstractView {
  constructor(filterType) {
    super();
    this._filterType = filterType;
  }

  getTemplate() {
    return createNoFilmTemplate(this._filterType);
  }
}
