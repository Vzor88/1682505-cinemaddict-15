import AbstractView from '../abstract.js';
import {createStatsItemMenuTemplate} from './stats-item-menu-tpl.js';


export default class StatsItemMenu extends AbstractView {
  constructor() {
    super();
    this._statsItemMenuHandler = this._statsItemMenuHandler.bind(this);
  }

  getTemplate() {
    return createStatsItemMenuTemplate();
  }

  _statsItemMenuHandler(evt) {
    this._callback.statistic();
    evt.target.classList.add('main-navigation__additional--active');
  }

  setStatsItemMenuHandler(callback) {
    this._callback.statistic = callback;
    this.getElement().addEventListener('click', this._statsItemMenuHandler);
  }
}
