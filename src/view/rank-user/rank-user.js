import AbstractView from '../abstract.js';
import {createRankUserTemplate} from './rank-user-tpl.js';

export default class RankUser extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createRankUserTemplate(this._films);
  }
}

