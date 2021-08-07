import {createElement} from '../utils.js';

const createStatisticTemplate = (length) => (
  `<section class="footer__statistics">
    <p>${length} movies inside</p>
   </section>`
);

export default class Statistic {
  constructor(length) {
    this._length = length;
    this._element = null;
  }

  getTemplate() {

    return createStatisticTemplate(this._length);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
