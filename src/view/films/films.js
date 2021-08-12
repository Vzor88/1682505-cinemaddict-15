import AbstractView from '../abstract.js';
import {createFilmsTemplate} from './films-tpl.js';

export default class Films extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }
}
