import AbstractView from '../abstract.js';
import {createRankUserTemplate} from './rank-user-tpl.js';

export default class RankUser extends AbstractView {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createRankUserTemplate(this._filter);
  }
}

