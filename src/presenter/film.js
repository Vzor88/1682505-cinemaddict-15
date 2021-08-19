import {render} from '../utils/render.js';
import CardFilmView from '../view/card-film/card-film.js';
import PopupView from '../view/popup/popup.js';
import {siteBodyElement} from '../main.js';
import {generateCommentsList} from '../view/popup/popup-tpl.js';
import {onEscKeyDown, remove, replace} from '../utils/render.js';

export default class Film {
  constructor(changeData) {
    this._changeData = changeData;

    this._filmComponent = null;
    this._popupComponent = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);

    this._handleCardFilmClick = this._handleCardFilmClick.bind(this);

    this._handleClosedPopupButtonClick = this._handleClosedPopupButtonClick.bind(this);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  init (film, container) {
    this._film = film;
    this._container = container;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new CardFilmView(this._film);
    this._popupComponent = new PopupView(this._film);

    this.filmDetails = document.querySelector('.film-details');

    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);

    this._filmComponent.setEditClickCardFilmHandler(() => this._handleCardFilmClick(this._film));

    this._hangingEventPopup();

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this._container, this._filmComponent);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);
    replace(this._popupComponent, prevPopupComponent);

    if (this.filmDetails){
      generateCommentsList(this._film.comments);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  _handleCardFilmClick(film){
    this._renderPopup(film);
  }

  _renderPopup(film) {
    const filmDetails = document.querySelector('.film-details');

    this._handleAvailability(filmDetails);

    this._openedPopup(film);

    this._hangingEventPopup();
  }

  _handleAvailability(popup){
    if (popup) {
      popup.remove();
    }
  }

  _openedPopup(film){
    render(siteBodyElement, this._popupComponent);
    generateCommentsList(film.comments);
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  }

  _hangingEventPopup(){
    this._popupComponent.setEditClickPopupHandler(this._handleClosedPopupButtonClick);
    this._popupComponent.setFavoritePopupClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchListPopupClickHandler(this._handleWatchListClick);
    this._popupComponent.setAlreadyWatchedPopupClickHandler(this._handleAlreadyWatchedClick);
  }

  _handleClosedPopupButtonClick(){
    remove(this._popupComponent);
    siteBodyElement.classList.remove('hide-overflow');
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._film, {
      film: Object.assign( {}, this._film.film, {
        userDetails: Object.assign({}, this._film.film.userDetails, {
          favorite: !this._film.film.userDetails.favorite,
        }),
      }),
    }));
  }

  _handleWatchListClick() {
    this._changeData(Object.assign({}, this._film, {
      film: Object.assign( {}, this._film.film, {
        userDetails: Object.assign({}, this._film.film.userDetails, {
          watchList: !this._film.film.userDetails.watchList,
        }),
      }),
    }));
  }

  _handleAlreadyWatchedClick() {
    this._changeData(Object.assign({}, this._film, {
      film: Object.assign( {}, this._film.film, {
        userDetails: Object.assign({}, this._film.film.userDetails, {
          alreadyWatched: !this._film.film.userDetails.alreadyWatched,
        }),
      }),
    }));
  }
}

