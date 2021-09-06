import AbstractObserver from '../services/abstract-observer.js';
import {FilterType} from '../consts.js';

export default class Filters extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL_MOVIES;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
