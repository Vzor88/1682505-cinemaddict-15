import AbstractView from '../abstract.js';
import {createStatsFooterTemplate} from './stats-footer-tpl.js';

export default class StatsFooter extends AbstractView {
  constructor(length) {
    super();
    this._length = length;
  }

  getTemplate() {
    return createStatsFooterTemplate(this._length);
  }
}
