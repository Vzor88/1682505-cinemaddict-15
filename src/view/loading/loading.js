import AbstractView from '../abstract.js';
import {createNoFilmTemplate} from './loading-tpl.js';

export default class Loading extends AbstractView {
  getTemplate() {
    return createNoFilmTemplate();
  }
}
