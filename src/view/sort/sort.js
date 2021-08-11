import AbstractView from '../abstract.js';
import {createSortTemplate} from './sort-tpl.js';

export default class Sort extends AbstractView {
  getTemplate() {
    return createSortTemplate();
  }
}
