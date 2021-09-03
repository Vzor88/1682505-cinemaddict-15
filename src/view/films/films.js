import AbstractView from '../abstract.js';
import {createFilmsTemplate} from './films-tpl.js';

export default class Films extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilmsTemplate(this._films);
  }
}
