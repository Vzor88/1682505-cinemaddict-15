import {render} from '../utils/render.js';
import CardFilmView from '../view/card-film/card-film.js';
import PopupView from '../view/popup/popup.js';
import {siteBodyElement} from '../main.js';
import {generateCommentsList} from '../view/popup/popup-tpl.js';
import {onEscKeyDown, remove} from '../utils/render.js';

export default class Film {
  constructor(container) {
    this._container = container;

    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
    this._handleClosedPopupButtonClick = this._handleClosedPopupButtonClick.bind(this);
  }

  init (film) {
    this._film = film;

    this._filmComponent = new CardFilmView(this._film);
    this._popupComponent = new PopupView(this._film);

    this._filmComponent.setEditClickPosterHandler(() => this._handlePosterClick(this._film));
    this._filmComponent.setEditClickTitleHandler(() => this._handleTitleClick(this._film));
    this._filmComponent.setEditClickCommentsHandler(() => this._handleCommentsClick(this._film));

    render(this._container, this._filmComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
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
}

