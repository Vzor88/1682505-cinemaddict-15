import CardFilmView from '../view/card-film/card-film.js';
import PopupView from '../view/popup/popup.js';
import {siteBodyElement} from '../main.js';
import {remove, replace, isEscEvent, render, isAvailability} from '../utils/render.js';
import {UserAction, UpdateType, EventType, FilterType} from '../consts.js';

export default class Film {
  constructor(changeData) {
    this._changeData = changeData;

    this._filmComponent = null;
    this._popupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleCreateCommentClick = this._handleCreateCommentClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleCardFilmClick = this._handleCardFilmClick.bind(this);
    this._handleClosedPopupButtonClick = this._handleClosedPopupButtonClick.bind(this);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  init (film, container, filterType) {
    this._film = film;
    this._container = container;
    this._filterType = filterType;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new CardFilmView(this._film);
    this._popupComponent = new PopupView(this._film);

    this._handingEventCardFilm();
    this._handingEventPopup();

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this._container, this._filmComponent);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);
    replace(this._popupComponent, prevPopupComponent);

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  _handingEventCardFilm(){
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmComponent.setEditClickCardFilmHandler(this._handleCardFilmClick);
  }

  _handingEventPopup(){
    this._popupComponent.setEditClickPopupHandler(this._handleClosedPopupButtonClick);
    this._popupComponent.setFavoritePopupClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchListPopupClickHandler(this._handleWatchListClick);
    this._popupComponent.setAlreadyWatchedPopupClickHandler(this._handleAlreadyWatchedClick);
    this._popupComponent.setDeleteCommentClickHandler(this._handleDeleteCommentClick);
    this._popupComponent.setCreateCommentClickHandler(this._handleCreateCommentClick);

    this._popupComponent.restoreHandlers();
  }

  _handleCardFilmClick(){
    this._renderPopup();
  }

  _renderPopup() {
    const filmDetails = document.querySelector('.film-details');

    isAvailability(filmDetails);
    this._handingEventPopup();
    this._openedPopup();
  }

  _openedPopup(){
    render(siteBodyElement, this._popupComponent);
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);
    this._popupComponent.onCtrlEnterKeyDown();
  }

  _handleClosedPopupButtonClick(){
    remove(this._popupComponent);
    siteBodyElement.classList.remove('hide-overflow');
  }

  _handleWatchListClick() {
    this._handleChangeEventButtons(EventType.WATCHLIST);
  }

  _handleAlreadyWatchedClick() {
    this._handleChangeEventButtons(EventType.HISTORY);
  }

  _handleFavoriteClick() {
    this._handleChangeEventButtons(EventType.FAVORITE);
  }

  _handleChangeEventButtons(eventType) {
    const scrollY = this._saveScroll();
    const copyFilm = {...this._film};
    switch (eventType) {
      case FilterType.FAVORITES:
        copyFilm.userDetails.favorite = !this._film.userDetails.favorite;
        break;
      case FilterType.WATCHLIST:
        copyFilm.userDetails.watchList = !this._film.userDetails.watchList;
        break;
      case FilterType.HISTORY:
        copyFilm.userDetails.alreadyWatched = !this._film.userDetails.alreadyWatched;
        break;
      default:
        return;
    }
    this._filterType === eventType ? this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, copyFilm) : this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH,  copyFilm);
    this._loadScroll(scrollY);
  }

  _saveScroll(){
    if(document.querySelector('.film-details')){
      return document.querySelector('.film-details').scrollTop;
    }
  }

  _loadScroll(height){
    if(document.querySelector('.film-details')){
      return  document.querySelector('.film-details').scrollTo(0, height);
    }
  }

  _handleDeleteCommentClick(commentary) {
    const scrollY = this._saveScroll();
    const commentId = commentary.querySelector('.film-details__comment-id').textContent;
    this._film.comments.forEach((comment) => {
      if(comment.id === commentId){
        this._changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH_POPUP, this._film, commentId);
      }
    });
    this._popupComponent.reset();
    this._loadScroll(scrollY);
  }

  _handleCreateCommentClick() {
    const scrollY = this._saveScroll();
    const newComment = this._popupComponent.createComment();
    this._film.comments.push(newComment);
    this._popupComponent.reset();
    this._changeData(UserAction.ADD_COMMENT, UpdateType.PATCH_POPUP, this._film, newComment);
    this._loadScroll(scrollY);

  }

  _onEscKeyDown(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._popupComponent.reset();
      remove(this._popupComponent);
      siteBodyElement.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }
}

