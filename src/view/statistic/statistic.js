import AbstractView from '../abstract.js';
import {createStatisticTemplate} from './statistic-tpl.js';


export default class Statistic extends AbstractView {
  constructor() {
    super();
    this._statisticHandler = this._statisticHandler.bind(this);
  }

  getTemplate() {
    return createStatisticTemplate();
  }

  _statisticHandler(evt){
    this._callback.statistic();
    evt.target.classList.add('main-navigation__additional--active');
  }

  setStatisticHandler(callback) {
    this._callback.statistic = callback;
    this.getElement().addEventListener('click', this._statisticHandler);
  }
}
