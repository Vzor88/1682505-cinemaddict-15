import SmartView from '../smart.js';
import {createStatsTemplate} from './stats-tpl.js';


export default class Stats extends SmartView {
  constructor(films) {
    super();
    this._films = films;

  }

  getTemplate() {
    return createStatsTemplate(this._films);
  }
}
