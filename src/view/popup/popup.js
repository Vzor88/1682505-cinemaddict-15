import SmartView from '../smart.js';
import {createPopupTemplate} from './popup-tpl.js';
import {isCtrlEnterEvent} from '../../utils/render.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import {AUTHORS_COMMENT} from '../../mock/data.js';
import {getRandomInteger} from '../../utils/common.js';
import {INDEX_COMMENT, SIZES} from '../../consts.js';
import {generateData} from '../../mock/film.js';


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

    this._buttonsDeleteComment = this.getElement().querySelectorAll('.film-details__comment-delete');
    this._buttonsDeleteComment.forEach((item) => item.addEventListener('click', this._deleteCommentClickHandler));

    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._editClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchListClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._alreadyWatchedClickPopupHandler);
  }

  reset() {
    this.updateElement(true);
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
      this._containerEmodji.innerHTML = '';
    }

    const emodjiElement = evt.target.cloneNode();
    emodjiElement.style.height = SIZES.EMODJI.HEIGHT;
    emodjiElement.style.width = SIZES.EMODJI.WIDTH;
    this._containerEmodji.appendChild(emodjiElement);
    return emodjiElement.id;
  }

  _createCommentHandler(evt) {
    this._containerEmodji = this.getElement().querySelector('.film-details__add-emoji-label');
    if(isCtrlEnterEvent(evt) && this._containerEmodji.firstChild && this._textComment){
      evt.preventDefault();
      this._film.comments.push(this._createComment());

      this.reset();
    }
  }

  _createComment() {
    return {
      id: getRandomInteger(INDEX_COMMENT.MIN, INDEX_COMMENT.MAX),
      author: generateData(AUTHORS_COMMENT),
      comment: this._textComment,
      date: dayjs(),
      emotion: this._containerEmodji.firstElementChild.id,
    };
  }

  _deleteCommentClickHandler(evt){
    evt.preventDefault();
    const parentElement = evt.target.parentElement.parentElement;
    this._film.comments.forEach((item, index) => {
      if(parentElement.textContent.includes(item.comment) && parentElement.textContent.includes(item.author)){
        this._film.comments.splice(index, 1);
      }
    });

    this.reset();
  }
}
