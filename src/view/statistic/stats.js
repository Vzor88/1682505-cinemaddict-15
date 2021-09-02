import SmartView from '../smart.js';
import {createStatsTemplate, createChartTemplate} from './stats-tpl.js';


export default class Stats extends SmartView {
  constructor(films, dateFrom, dateTo, activeRadioButton) {
    super();
    this._films = films;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
    this._activeRadioButton = activeRadioButton;

    this._statsClickRadioButtonHandler = this._statsClickRadioButtonHandler.bind(this);
  }

  getTemplate() {
    return createStatsTemplate(this._films, this._dateFrom, this._dateTo, this._activeRadioButton);
  }

  getTemplateChart(films, dateFrom, dateTo) {
    return createChartTemplate(films, dateFrom, dateTo);
  }

  _statsClickRadioButtonHandler(evt){
    if(evt.target.type === 'radio'){
      this._callback.statistic(evt.target.value);
    }
  }

  setStatsClickRadioButtonHandler(callback) {
    this._callback.statistic = callback;
    this.getElement().addEventListener('change', this._statsClickRadioButtonHandler);
  }
}
