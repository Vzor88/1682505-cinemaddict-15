import {DateRangeTime, RadioButtonType, FilterType} from '../consts.js';
import {render, remove} from '../utils/render.js';
import {filter} from '../utils/filters.js';
import StatsView from '../view/statistic/stats.js';
import dayjs from 'dayjs';

export default class Stats {
  constructor(container, films) {
    this._films = films;
    this._container = container;
    this._currentInDateRangeType = RadioButtonType.ALL_TIME;

    this._handleRadioButtonClick = this._handleRadioButtonClick.bind(this);
  }

  init(dateTo) {
    this._dateTo = dateTo;

    this._statsComponent = new StatsView(filter[FilterType.HISTORY](this._films), dayjs(), dateTo, this._currentInDateRangeType);
    this._statsComponent.getTemplateChart(filter[FilterType.HISTORY](this._films), dayjs(), dateTo);
    this._statsComponent.setStatsClickRadioButtonHandler(this._handleRadioButtonClick);

    render(this._container, this._statsComponent);
  }

  destroy() {
    remove(this._statsComponent);
  }

  _handleRadioButtonClick(radioButton) {
    this._currentInDateRangeType = radioButton;
    remove(this._statsComponent);
    switch(this._currentInDateRangeType) {
      case RadioButtonType.TODAY:
        this.init(DateRangeTime.TODAY);
        break;
      case RadioButtonType.WEEK:
        this.init(DateRangeTime.WEEK);
        break;
      case RadioButtonType.MONTH:
        this.init(DateRangeTime.MONTH);
        break;
      case RadioButtonType.YEAR:
        this.init(DateRangeTime.YEAR);
        break;
      default:
        this.init(DateRangeTime.ALL_TIME);
    }
  }
}
