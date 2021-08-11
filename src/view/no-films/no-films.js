import AbstractView from '../abstract.js';
import {createNoFilmTemplate} from './no-films-tpl.js';

export default class NoFilms extends AbstractView {
  getTemplate() {
    return createNoFilmTemplate();
  }
}
