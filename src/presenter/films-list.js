import {render, onEscKeyDown, remove} from '../utils/render.js';
import {COUNT} from '../mock/data.js';
import RankUserView from '../view/rank-user/rank-user.js';
import MenuView from '../view/menu/menu.js';
import SortView from '../view/sort/sort.js';
import FilmsView from '../view/films/films.js';
import CardFilmView from '../view/card-film/card-film.js';
import ShowMoreButtonView from '../view/show-more-button/show-more-button.js';
import StatisticView from '../view/statistic/statistic.js';
import PopupView  from '../view/popup/popup.js';
import {generateCommentsList} from '../view/popup/popup-tpl.js';
import NoFilmsView from '../view/no-films/no-films.js';
import {siteBodyElement} from '../main.js';


export default class FilmsList {
  constructor(filmListHeaderContainer, filmListMainContainer, filmListFooterContainer) {
    this._filmListHeaderContainer = filmListHeaderContainer;
    this._filmListMainContainer = filmListMainContainer;
    this._filmListFooterContainer = filmListFooterContainer;
    this._sortComponent = new SortView();
    this._filmsComponent = new FilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noFilmsComponent = new NoFilmsView();

    this._filmsList = this._filmsComponent.getElement().querySelector('.films-list');
    this._filmsContainer = this._filmsList.querySelector('.films-list__container');
  }

  init (cardsFilm, films, filters) {
    this._cardsFilm = cardsFilm.slice();
    this._films = films;
    this._filters = filters;

    this._renderMenu(this._filters);
    this._renderStatistic(cardsFilm.length);

    this._renderPage();
  }

  _renderRank() {
    render(this._filmListHeaderContainer, new RankUserView(this._filters));
  }

  _renderMenu() {
    render(this._filmListMainContainer, new MenuView(this._filters));
  }

  _renderStatistic() {
    render(this._filmListFooterContainer, new StatisticView(this._cardsFilm.length));
  }

  _renderSort() {
    render(this._filmListMainContainer, this._sortComponent);
  }

  _renderFilm(film, container) {
    const filmComponent = new CardFilmView(film);

    filmComponent.setEditClickPosterHandler(() => {
      this._renderPopup(film);
    });

    filmComponent.setEditClickCommentsHandler(() => {
      this._renderPopup(film);
    });

    filmComponent.setEditClickTitleHandler(() => {
      this._renderPopup(film);
    });

    render(container, filmComponent);
  }

  _renderFilms(array, from, to, container) {
    array
      .slice(from, to)
      .forEach((cardFilm) => this._renderFilm(cardFilm, container));
  }

  _renderFilmsList(){
    this._renderFilms(this._cardsFilm,0, Math.min(this._cardsFilm.length, COUNT.FILMS_PER_STEP), this._filmsContainer);

    if (this._cardsFilm.length > COUNT.FILMS_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderCategoryFilms(){
    this._renderFilmsListExtra();
    this._renderFilmsListTopCommented();
  }

  _renderFilmsListExtra(){
    const filmsListExtra = this._filmsComponent.getElement().querySelector('.films-list--extra').querySelector('.films-list__container');
    const topRatingFilms = this._cardsFilm.slice().sort((prev, next) => next.film.filmInfo.totalRating - prev.film.filmInfo.totalRating);

    this._renderFilms(topRatingFilms,COUNT.SORT_FILMS.MIN,COUNT.SORT_FILMS.MAX, filmsListExtra);
  }

  _renderFilmsListTopCommented(){
    const filmsListComment = this._filmsComponent.getElement().querySelector('.films-list--most-commented').querySelector('.films-list__container');
    const topCommentFilms = this._cardsFilm.slice().sort((prev, next) => next.comments.length - prev.comments.length);

    this._renderFilms(topCommentFilms,COUNT.SORT_FILMS.MIN,COUNT.SORT_FILMS.MAX, filmsListComment);
  }

  _renderNoFilms() {
    render(this._filmListMainContainer, this._noFilmsComponent);
  }

  _renderShowMoreButton() {
    let renderedTaskCount = COUNT.FILMS_PER_STEP;

    render(this._filmsList, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setEditClickMoreButtonHandler(() => {
      this._cardsFilm
        .slice(renderedTaskCount, renderedTaskCount + COUNT.FILMS_PER_STEP)
        .forEach((cardFilm) => {
          this._renderFilm(cardFilm, this._filmsContainer);
        });

      renderedTaskCount += COUNT.FILMS_PER_STEP;

      if (renderedTaskCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _renderPopup(film) {
    const popupComponent = new PopupView(film);
    const filmDetails = document.querySelector('.film-details');

    if (filmDetails) {
      filmDetails.remove();
    }

    render(siteBodyElement, popupComponent);
    generateCommentsList(film.comments);
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);


    popupComponent.setEditClickPopupHandler(() => {
      remove(popupComponent);
      siteBodyElement.classList.remove('hide-overflow');
    });
  }

  _renderPage() {
    if(this._cardsFilm.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderRank();
    this._renderSort();
    render(this._filmListMainContainer, this._filmsComponent);

    this._renderFilmsList();
    this._renderCategoryFilms();
  }
}
