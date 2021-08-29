import AbstractView from '../abstract.js';
import {createShowMoreButtonTemplate} from './show-more-button-tpl.js';

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();

    this._editClickMoreButtonHandler = this._editClickMoreButtonHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _editClickMoreButtonHandler(evt) {
    evt.preventDefault();
    this._callback.editClickMoreButton();
  }

  setEditClickMoreButtonHandler(callback) {
    this._callback.editClickMoreButton = callback;
    this.getElement().addEventListener('click', this._editClickMoreButtonHandler);
  }
}

