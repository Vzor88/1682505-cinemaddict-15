import {render, remove} from '../utils/render.js';
import {COUNT} from '../mock/data.js';
import RankUserView from '../view/rank-user/rank-user.js';
import MenuView from '../view/menu/menu.js';
import SortView from '../view/sort/sort.js';
import FilmsView from '../view/films/films.js';
import ShowMoreButtonView from '../view/show-more-button/show-more-button.js';
import StatisticView from '../view/statistic/statistic.js';
import NoFilmsView from '../view/no-films/no-films.js';
import FilmPresenter from './film.js';

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

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._renderedTaskCount = COUNT.FILMS_PER_STEP;
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
    const filmPresenter = new FilmPresenter(container);
    filmPresenter.init(film);
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

  _handleShowMoreButtonClick() {
    this._renderFilms(this._cardsFilm, this._renderedTaskCount, this._renderedTaskCount + COUNT.FILMS_PER_STEP, this._filmsContainer);

    this._renderedTaskCount += COUNT.FILMS_PER_STEP;

    if (this._renderedTaskCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsList, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setEditClickMoreButtonHandler(this._handleShowMoreButtonClick);
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
