import SmartView from '../smart.js';
import {createPopupTemplate} from './popup-tpl.js';
import {isCtrlEnterEvent} from '../../utils/render.js';
import {generateComment} from '../../mock/film.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';


dayjs.extend(relativeTime);

export default class Popup extends SmartView {
  constructor(film) {
    super();
    this._film = film;

    this._editClickPopupHandler = this._editClickPopupHandler.bind(this);

    this._favoriteClickPopupHandler = this._favoriteClickPopupHandler.bind(this);
    this._watchListClickPopupHandler = this._watchListClickPopupHandler.bind(this);
    this._alreadyWatchedClickPopupHandler = this._alreadyWatchedClickPopupHandler.bind(this);

    this._emojiListHandler = this._emojiListHandler.bind(this);
    this._textCommentInputHandler = this._textCommentInputHandler.bind(this);
    this._createCommentHandler = this._createCommentHandler.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);

    this.restoreHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  restoreHandlers(){
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._textCommentInputHandler);
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('click', this._emojiListHandler);
    this.getElement().addEventListener('keydown', this._createCommentHandler);
    this._buttonDelete = this.getElement().querySelectorAll('.film-details__comment-delete');
    this._buttonDelete.forEach((item) => item.addEventListener('click', this._deleteCommentClickHandler));

    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._editClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchListClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._alreadyWatchedClickPopupHandler);
  }

  reset() {
    if(this._containerEmodji){
      this._containerEmodji.innerHTML = ' ';
    }
    if(this._textComment){
      this._textComment = ' ';
    }
  }

  _editClickPopupHandler() {
    this._callback.editClickPopup();
  }

  setEditClickPopupHandler(callback) {
    this._callback.editClickPopup = callback;
  }

  _favoriteClickPopupHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClickPopup();
  }

  setFavoritePopupClickHandler(callback) {
    this._callback.favoriteClickPopup = callback;
  }

  _watchListClickPopupHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClickPopup();
  }

  setWatchListPopupClickHandler(callback) {
    this._callback.watchListClickPopup = callback;
  }

  _alreadyWatchedClickPopupHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClickPopup();
  }

  setAlreadyWatchedPopupClickHandler(callback) {
    this._callback.alreadyWatchedClickPopup = callback;
  }

  _textCommentInputHandler(evt){
    evt.preventDefault();
    this._textComment = evt.target.value;
  }

  _emojiListHandler(evt) {
    evt.preventDefault();
    if (evt.target.alt !== 'emoji') {
      return;
    }
    if(this._containerEmodji){
      this._containerEmodji.innerHTML = ' ';
    }

    this._containerEmodji = this.getElement().querySelector('.film-details__add-emoji-label');
    const emodjiElement = evt.target.cloneNode();
    emodjiElement.style.height = '55px';
    emodjiElement.style.width = '55px';
    this._containerEmodji.appendChild(emodjiElement);

    return emodjiElement.className;
  }

  _createCommentHandler(evt) {
    if(isCtrlEnterEvent(evt)){
      this._film.comments.push(this._createComment());
      evt.preventDefault();
      this.updateElement(true);
    }
  }

  _createComment() {
    const comment = generateComment();
    comment.emotion = this._containerEmodji.firstElementChild.id;
    comment.comment = this._textComment;
    comment.date = dayjs();
    return comment;
  }

  _deleteCommentClickHandler(evt){
    evt.preventDefault();
    this._film.comments.forEach((item, index) => {
      if(evt.target.parentElement.parentElement.textContent.includes(item.comment) && evt.target.parentElement.parentElement.textContent.includes(item.author)){
        this._film.comments.splice(index, 1);
      }
      // evt.target.parentElement.parentElement.parentElement.remove();
    });

    this.updateElement(true);
  }
}
