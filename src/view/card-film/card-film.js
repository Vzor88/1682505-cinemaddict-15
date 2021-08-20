import AbstractView from '../abstract.js';
import {createCardFilmTemplate} from './card-film-tpl';

export default class CardFilm extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);

    this._editClickOpenPopupHandler = this._editClickOpenPopupHandler.bind(this);
  }

  getTemplate() {
    return createCardFilmTemplate(this._film);
  }

  _editClickOpenPopupHandler() {
    this._callback.editClickOpenPopup();
  }

  setEditClickCardFilmHandler(callback) {
    this._callback.editClickOpenPopup = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._editClickOpenPopupHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._editClickOpenPopupHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._editClickOpenPopupHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchListClickHandler);
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._alreadyWatchedClickHandler);
  }
}
