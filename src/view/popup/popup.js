import AbstractView from '../abstract.js';
import {createPopupTemplate} from './popup-tpl.js';

export default class Popup extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._editClickPopupHandler = this._editClickPopupHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  _editClickPopupHandler() {
    this._callback.editClickPopup();
  }

  setEditClickPopupHandler(callback) {
    this._callback.editClickPopup = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._editClickPopupHandler);
  }
}


// _editClickPosterHandler() {
//   this._callback.editClickPoster();
// }
//
// setEditClickPosterHandler(callback) {
//   this._callback.editClickPoster = callback;
//   this.getElement().querySelector('.film-card__poster').addEventListener('click', this._editClickPosterHandler);
// }

