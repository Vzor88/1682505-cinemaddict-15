import AbstractView from '../abstract.js';
import {createPopupTemplate} from './popup-tpl.js';

export default class Popup extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._editClickPopupHandler = this._editClickPopupHandler.bind(this);

    this._favoriteClickPopupHandler = this._favoriteClickPopupHandler.bind(this);
    this._watchListClickPopupHandler = this._watchListClickPopupHandler.bind(this);
    this._alreadyWatchedClickPopupHandler = this._alreadyWatchedClickPopupHandler.bind(this);
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

  _favoriteClickPopupHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClickPopup();
  }

  setFavoritePopupClickHandler(callback) {
    this._callback.favoriteClickPopup = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickPopupHandler);
  }

  _watchListClickPopupHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClickPopup();
  }

  setWatchListPopupClickHandler(callback) {
    this._callback.watchListClickPopup = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchListClickPopupHandler);
  }

  _alreadyWatchedClickPopupHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClickPopup();
  }

  setAlreadyWatchedPopupClickHandler(callback) {
    this._callback.alreadyWatchedClickPopup = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._alreadyWatchedClickPopupHandler);
  }
}
