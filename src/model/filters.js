import AbstractObserver from '../services/abstract-observer.js';
import {FilterType} from '../consts.js';

export default class Filters extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL_MOVIES;
  }

  setFilter(updateType, filter, films) {
    this._activeFilter = filter;
    this._notify(updateType, films);
  }

  getFilter() {
    return this._activeFilter;
  }
}
