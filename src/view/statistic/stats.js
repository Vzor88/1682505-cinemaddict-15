import SmartView from '../smart.js';
import {createStatsTemplate, createChartTemplate} from './stats-tpl.js';
import {RadioButtonType} from '../../consts.js';
// import dayjs from "dayjs";

export default class Stats extends SmartView {
  constructor(films) {
    super();
    this._films = films;

    this._statsClickRadioButtonHandler = this._statsClickRadioButtonHandler.bind(this);
  }

  getTemplate() {
    return createStatsTemplate(this._films);
  }

  getTemplateChart(films, dateFrom, dateTo) {
    return createChartTemplate(films, dateFrom, dateTo);
  }

  _statsClickRadioButtonHandler(evt){
    this._callback.statistic(evt.target.value);
    if(evt.target.value === RadioButtonType.WEEK){
      // this.getTemplateChart(this._films, dayjs(), dayjs().subtract(200, 'day'));
    }
  }

  setStatsClickRadioButtonHandler(callback) {
    this._callback.statistic = callback;
    this.getElement().addEventListener('change', this._statsClickRadioButtonHandler);
  }
}
