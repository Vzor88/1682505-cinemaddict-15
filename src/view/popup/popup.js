import {SIZES} from '../../consts.js';
import {isCtrlEnterEvent} from '../../utils/render.js';
import {createPopupTemplate} from './popup-tpl.js';
import SmartView from '../smart.js';
import he from 'he';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
dayjs.extend(relativeTime);

export default class Popup extends SmartView {
  constructor(film) {
    super();
    this._film = film;

    this._containerEmodji = this.getElement().querySelector('.film-details__add-emoji-label');

    this._editClickPopupHandler = this._editClickPopupHandler.bind(this);
    this._favoriteClickPopupHandler = this._favoriteClickPopupHandler.bind(this);
    this._watchListClickPopupHandler = this._watchListClickPopupHandler.bind(this);
    this._alreadyWatchedClickPopupHandler = this._alreadyWatchedClickPopupHandler.bind(this);
    this._emojiListHandler = this._emojiListHandler.bind(this);
    this._createCommentHandler = this._createCommentHandler.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);

    this.restoreHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  restoreHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('click', this._emojiListHandler);

    const buttonsDeleteComment = this.getElement().querySelectorAll('.film-details__comment-delete');
    buttonsDeleteComment.forEach((item) => item.addEventListener('click', this._deleteCommentClickHandler));

    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._editClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchListClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._alreadyWatchedClickPopupHandler);
    this.getElement().querySelector('.film-details__new-comment').addEventListener('keydown', this._createCommentHandler);
  }

  setEditClickPopupHandler(callback) {
    this._callback.editClickPopup = callback;
  }

  setFavoritePopupClickHandler(callback) {
    this._callback.favoriteClickPopup = callback;
  }

  setWatchListPopupClickHandler(callback) {
    this._callback.watchListClickPopup = callback;
  }

  setAlreadyWatchedPopupClickHandler(callback) {
    this._callback.alreadyWatchedClickPopup = callback;
  }

  setDeleteCommentClickHandler(callback) {
    this._callback.deleteCommentClick = callback;
  }

  setCreateCommentClickHandler(callback) {
    this._callback.createCommentClick = callback;
  }

  updateFilm(update, film, scroll = true) {
    if(!update) {
      return;
    }

    this._film = Object.assign(
      {},
      film,
      update,
    );

    this.updateElement(scroll);
  }

  reset() {
    const textCommentContainer = document.querySelector('.film-details__comment-input');
    if(this._containerEmodji) {
      this._containerEmodji.innerHTML = ' ';
    }
    if(textCommentContainer) {
      textCommentContainer.value = '';
    }
  }

  _editClickPopupHandler() {
    this._callback.editClickPopup();
  }

  _favoriteClickPopupHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClickPopup();
  }

  _watchListClickPopupHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClickPopup();
  }

  _alreadyWatchedClickPopupHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClickPopup();
  }

  _textCommentInput() {
    return he.encode(document.querySelector('.film-details__comment-input').value);
  }

  _emojiListHandler(evt) {
    evt.preventDefault();
    if(evt.target.alt !== 'emoji') {
      return;
    }
    if(this._containerEmodji) {
      this._containerEmodji.innerHTML = '';
    }

    const emodjiElement = evt.target.cloneNode();
    emodjiElement.style.height = SIZES.EMODJI.HEIGHT;
    emodjiElement.style.width = SIZES.EMODJI.WIDTH;
    this._containerEmodji.appendChild(emodjiElement);
    return emodjiElement.id;
  }

  _createCommentHandler(evt) {
    if(isCtrlEnterEvent(evt) && this._containerEmodji.firstChild && this._textCommentInput()) {
      evt.preventDefault();
      this._callback.createCommentClick();
    }
  }

  createComment() {
    return {
      comment: this._textCommentInput(),
      emotion: this._containerEmodji.firstElementChild.id,
    };
  }

  _deleteCommentClickHandler(evt) {
    evt.preventDefault();
    const parentElement = evt.target.parentElement.parentElement;
    this._callback.deleteCommentClick(parentElement);
  }
}
