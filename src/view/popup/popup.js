import SmartView from '../smart.js';
import {createPopupTemplate} from './popup-tpl.js';
import {isCtrlEnterEvent} from '../../utils/render.js';
import {getRandomInteger} from '../../utils/common.js';
import {INDEX_COMMENT, SIZES} from '../../consts.js';
import {generateData} from '../../utils/card-film.js';
import dayjs from 'dayjs';
import he from 'he';
import relativeTime from 'dayjs/plugin/relativeTime.js';
dayjs.extend(relativeTime);

const AUTHORS_COMMENT = [
  ' Ванька',
  ' Петька',
  ' Илюха',
  ' Нагибатор666',
  ' Оленька',
  ' Алена',
  ' Злая девочка',
  ' Просто придурок',
  ' Альфонс',
  ' Задрот',
];

export default class Popup extends SmartView {
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;

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
    return createPopupTemplate(this._film, this._comments);
  }

  restoreHandlers(){
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('click', this._emojiListHandler);

    this._buttonsDeleteComment = this.getElement().querySelectorAll('.film-details__comment-delete');
    this._buttonsDeleteComment.forEach((item) => item.addEventListener('click', this._deleteCommentClickHandler));

    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._editClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchListClickPopupHandler);
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._alreadyWatchedClickPopupHandler);
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

  onCtrlEnterKeyDown(){
    window.addEventListener('keydown', this._createCommentHandler);
  }

  setDeleteCommentClickHandler(callback) {
    this._callback.deleteCommentClick = callback;
  }

  setCreateCommentClickHandler(callback) {
    this._callback.createCommentClick = callback;
  }

  _reset() {
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

  _textCommentInput(){
    return he.encode(document.querySelector('.film-details__comment-input').value);
  }

  _emojiListHandler(evt) {
    this._containerEmodji = document.querySelector('.film-details__add-emoji-label');
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
    if(isCtrlEnterEvent(evt) && document.querySelector('.film-details__add-emoji-label').firstChild && this._textCommentInput()){
      const scrollY = document.querySelector('.film-details').scrollTop;
      evt.preventDefault();
      const newComment = this._createComment();
      this._film.comments.push(newComment);
      this._film.comments.push(newComment.id);
      this._reset();
      this._callback.createCommentClick();
      document.querySelector('.film-details').scrollTo(0, scrollY);
    }
  }

  _createComment() {
    return {
      id: getRandomInteger(INDEX_COMMENT.MIN, INDEX_COMMENT.MAX),
      author: generateData(AUTHORS_COMMENT),
      comment: this._textCommentInput(),
      date: dayjs(),
      emotion: document.querySelector('.film-details__add-emoji-label').firstElementChild.id,
    };
  }

  _deleteCommentClickHandler(evt){
    evt.preventDefault();
    const scrollY = document.querySelector('.film-details').scrollTop;
    const parentElement = evt.target.parentElement.parentElement;

    this._film.comments.forEach((item, index) => {
      if(parentElement.textContent.includes(he.decode(item.comment)) && parentElement.textContent.includes(item.author)){
        this._film.comments.splice(index, 1);
        this._film.comments.splice(index, 1);
      }
    });

    this._reset();
    this._callback.deleteCommentClick();
    document.querySelector('.film-details').scrollTo(0, scrollY);
  }
}
