import AbstractView from '../abstract.js';
import {createStatisticTemplate} from './statistic-tpl.js';

export default class Statistic extends AbstractView {
  getTemplate() {
    return createStatisticTemplate();
  }
}
