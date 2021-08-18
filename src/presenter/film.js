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

    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
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

    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmComponent.setEditClickPosterHandler(() => this._handlePosterClick(this._film));
    this._filmComponent.setEditClickTitleHandler(() => this._handleTitleClick(this._film));
    this._filmComponent.setEditClickCommentsHandler(() => this._handleCommentsClick(this._film));


    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this._container, this._filmComponent);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);


    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  _handlePosterClick(film){
    this._renderPopup(film);
  }

  _handleTitleClick(film){
    this._renderPopup(film);
  }

  _handleCommentsClick(film){
    this._renderPopup(film);
  }

  _renderPopup(film) {
    const filmDetails = document.querySelector('.film-details');

    this._handleAvailability(filmDetails);

    this._openedPopup(film);

    this._closedPopup();
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

  _closedPopup(){
    this._popupComponent.setEditClickPopupHandler(this._handleClosedPopupButtonClick);
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
}

