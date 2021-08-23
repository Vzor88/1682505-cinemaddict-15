import AbstractView from '../abstract.js';
import {createFilterTemplate} from './menu-tpl.js';

export default class Menu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}


