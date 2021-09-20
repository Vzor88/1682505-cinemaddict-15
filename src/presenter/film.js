import CardFilmView from '../view/card-film/card-film.js';
import PopupView from '../view/popup/popup.js';
import {siteBodyElement} from './films-list.js';
import {remove, replace, escKeyDownHandler, render, isAvailability} from '../utils/render.js';
import {UserAction, UpdateType, EventType, FilterType, StateType, SHAKE_ANIMATION_TIMEOUT} from '../consts.js';

export default class Film {
  constructor(changeData) {
    this._changeData = changeData;

    this._filmComponent = null;
    this._popupComponent = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleCreateCommentClick = this._handleCreateCommentClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this.handleCardFilmClick = this.handleCardFilmClick.bind(this);
    this._handleClosedPopup = this._handleClosedPopup.bind(this);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  init(film, container, filterType) {
    this._film = film;
    this._container = container;
    this._filterType = filterType;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new CardFilmView(this._film);
    this._popupComponent = new PopupView(this._film);

    this._handingEventCardFilm();
    this._handingEventPopup();

    if(prevFilmComponent === null || prevPopupComponent === null) {
      render(this._container, this._filmComponent);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);
    replace(this._popupComponent, prevPopupComponent);

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  setViewState(state, update, commentId = {}) {
    const resetFormState = () => {
      this._popupComponent.updateFilm({
        isDisabled: false,
        isCreating: false,
        isDeleting: false,
      }, this._film, scroll);
    };
    switch(state) {
      case StateType.CREATING:
        this._popupComponent.updateFilm({
          isDisabled: true,
          isCreating: true,
        }, this._film, scroll);
        break;
      case StateType.DELETING:
        this._popupComponent.updateFilm({
          isDisabled: true,
          isDeleting: true,
          commentId,
        }, this._film, scroll);
        break;
      case StateType.ABORTING_UPDATE:
        this._filmComponent.shake();
        this._popupComponent.shake();
        break;
      case StateType.ABORTING_DELETING:
        this._shakeCommentsList(resetFormState);
        break;
      case StateType.ABORTING_CREATING:
        this._commentInput.removeAttribute('disabled');
        this._buttonsDeleteComment.forEach((button) => button.removeAttribute('disabled'));
        this._popupComponent.shake();
        break;
    }
  }

  handleCardFilmClick() {
    this._closedPopup();
    this._renderPopup();
  }

  _handingEventCardFilm() {
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmComponent.setEditClickCardFilmHandler(this.handleCardFilmClick);
  }

  _handingEventPopup() {
    this._popupComponent.setEditClickPopupHandler(this._handleClosedPopup);
    this._popupComponent.setFavoritePopupClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchListPopupClickHandler(this._handleWatchListClick);
    this._popupComponent.setAlreadyWatchedPopupClickHandler(this._handleAlreadyWatchedClick);
    this._popupComponent.setDeleteCommentClickHandler(this._handleDeleteCommentClick);
    this._popupComponent.setCreateCommentClickHandler(this._handleCreateCommentClick);
    this._popupComponent.restoreHandlers();
  }

  _renderPopup() {
    this._handingEventPopup();
    this._popupComponent.reset();
    this._openedPopup();
  }

  _openedPopup() {
    render(siteBodyElement, this._popupComponent);
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', escKeyDownHandler);
  }

  _closedPopup() {
    this._popupComponent.reset();
    const filmDetails = document.querySelector('.film-details');
    isAvailability(filmDetails);
    document.removeEventListener('keydown', escKeyDownHandler);
    siteBodyElement.classList.remove('hide-overflow');
  }

  _handleClosedPopup() {
    this._closedPopup();
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
    const copyFilm = {...this._film};
    this._popupComponent.getElement().querySelectorAll('.film-details__control-button').forEach((button) => button.disabled = true);
    switch(eventType) {
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
    this._filterType === eventType ? this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, copyFilm) : this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, copyFilm);
  }

  _handleDeleteCommentClick(commentary) {
    const commentId = commentary.querySelector('.film-details__comment-id').textContent;
    this._film.comments.forEach((comment) => {
      if(comment.id === commentId) {
        this._changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH_POPUP, this._film, commentId);
      }
    });
  }

  _handleCreateCommentClick() {
    this._buttonsDeleteComment = this._popupComponent.getElement().querySelectorAll('.film-details__comment-delete');
    this._commentInput = this._popupComponent.getElement().querySelector('.film-details__comment-input');
    this._commentInput.disabled = true;
    this._buttonsDeleteComment.forEach((button) => button.disabled = true);
    this._changeData(UserAction.ADD_COMMENT, UpdateType.PATCH_POPUP, this._film, this._popupComponent.createComment());
    this._popupComponent.reset();
  }

  _shakeCommentsList(callback) {
    const commentsList = this._popupComponent.getElement().querySelector('.film-details__comments-list');
    commentsList.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      commentsList.style.animation = '';
      if(callback) {
        callback();
      }
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

