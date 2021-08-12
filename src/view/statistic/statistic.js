import AbstractView from '../abstract.js';
import {createStatisticTemplate} from './statistic-tpl.js';

export default class Statistic extends AbstractView {
  constructor(length) {
    super();
    this._length = length;
  }

  getTemplate() {
    return createStatisticTemplate(this._length);
  }
}
