import CardFilmView from '../view/card-film/card-film.js';
import PopupView from '../view/popup/popup.js';
import {siteBodyElement} from '../main.js';
import {remove, replace, isEscEvent, render} from '../utils/render.js';
import {UserAction, UpdateType, FilterType, EventType} from '../consts.js';

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
    console.log(this._film);
    this._container = container;
    this._filterType = filterType;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new CardFilmView(this._film);
    this._popupComponent = new PopupView(this._film);

    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);

    this._filmComponent.setEditClickCardFilmHandler(this._handleCardFilmClick);

    this._hangingEventPopup();

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this._container, this._filmComponent);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);
    replace(this._popupComponent, prevPopupComponent);

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  _hangingEventPopup(){
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

    this._handleAvailability(filmDetails);

    this._openedPopup();

    this._hangingEventPopup();
  }

  _handleAvailability(popup){
    if (popup) {
      popup.remove();
    }
  }

  _openedPopup(){
    render(siteBodyElement, this._popupComponent);
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _handleClosedPopupButtonClick(){
    remove(this._popupComponent);
    siteBodyElement.classList.remove('hide-overflow');
  }

  _handleWatchListClick() {
    this._changeEventButtons(EventType.WATCHLIST);
  }

  _handleAlreadyWatchedClick() {
    this._changeEventButtons(EventType.HISTORY);
  }

  _handleFavoriteClick() {
    this._changeEventButtons(EventType.FAVORITE);
  }

  _changeEventButtons(eventType) {
    const scrollY = this._saveScroll();
    const copyFilm = {...this._film};
    switch (eventType) {
      case 'Favorite':
        copyFilm.film.userDetails.favorite = !this._film.film.userDetails.favorite;
        break;
      case 'WatchList':
        copyFilm.film.userDetails.watchList = !this._film.film.userDetails.watchList;
        break;
      case 'History':
        copyFilm.film.userDetails.alreadyWatched = !this._film.film.userDetails.alreadyWatched;
        break;
      default:
        return;
    }
    this._isFilterType(copyFilm);
    this._loadScroll(scrollY);
  }

  _saveScroll(){
    if(document.querySelector('.film-details')){
      return document.querySelector('.film-details').scrollTop;
    }
  }

  _loadScroll(heigth){
    if(document.querySelector('.film-details')){
      return  document.querySelector('.film-details').scrollTo(0, heigth);
    }
  }

  _isFilterType(film){
    return  FilterType.ALL_MOVIES === this._filterType ? this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, film) : this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, film);

  }

  _handleDeleteCommentClick() {
    return this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, this._film);
  }

  _handleCreateCommentClick() {
    return this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, this._film);
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

