import AbstractView from '../abstract.js';
import {createFilterTemplate} from './filters-tpl.js';

export default class Filters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._filterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._filterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    if(evt.target.className === 'main-navigation__item'){
      this._callback.filterTypeChange(evt.target.id);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}


