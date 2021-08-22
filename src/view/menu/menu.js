// import AbstractView from '../abstract.js';
import {createFilterTemplate} from './menu-tpl.js';
import SmartView from '../smart.js';

export default class Menu extends SmartView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}


