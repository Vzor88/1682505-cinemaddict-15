import AbstractView from '../abstract.js';
import {createCardFilmTemplate} from './card-film-tpl';

export default class CardFilm extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._editClickPosterHandler = this._editClickPosterHandler.bind(this);
    this._editClickCommentsHandler = this._editClickCommentsHandler.bind(this);
    this._editClickTitleHandler = this._editClickTitleHandler.bind(this);
  }

  getTemplate() {
    return createCardFilmTemplate(this._film);
  }

  _editClickPosterHandler() {
    this._callback.editClickPoster();
  }

  setEditClickPosterHandler(callback) {
    this._callback.editClickPoster = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._editClickPosterHandler);
  }

  _editClickCommentsHandler() {
    this._callback.editClickComments();
  }

  setEditClickCommentsHandler(callback) {
    this._callback.editClickComments = callback;
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._editClickCommentsHandler);
  }


  _editClickTitleHandler() {
    this._callback.editClickTitle();
  }

  setEditClickTitleHandler(callback) {
    this._callback.editClickTitle = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._editClickTitleHandler);
  }
}
