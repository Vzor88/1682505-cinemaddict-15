import {render, remove, renderElement} from '../utils/render.js';
import {COUNT, RenderPosition, SortType} from '../mock/data.js';
import RankUserView from '../view/rank-user/rank-user.js';
import MenuView from '../view/menu/menu.js';
import SortView from '../view/sort/sort.js';
import FilmsView from '../view/films/films.js';
import ShowMoreButtonView from '../view/show-more-button/show-more-button.js';
import StatisticView from '../view/statistic/statistic.js';
import NoFilmsView from '../view/no-films/no-films.js';
import FilmPresenter from './film.js';
import {updateItem} from '../utils/common.js';
import {generateFilter} from '../mock/filters.js';
import {sortFilmDate} from '../utils/card-film.js';


export default class FilmsList {
  constructor(filmListHeaderContainer, filmListMainContainer, filmListFooterContainer) {
    this._filmListHeaderContainer = filmListHeaderContainer;
    this._filmListMainContainer = filmListMainContainer;
    this._filmListFooterContainer = filmListFooterContainer;
    this._sortComponent = new SortView();
    this._filmsComponent = new FilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noFilmsComponent = new NoFilmsView();

    this._filmPresenter = new Map();
    this._filmPresenterTop = new Map();
    this._filmPresenterComment = new Map();

    this._currentSortType = SortType.DEFAULT;

    this._filmsList = this._filmsComponent.getElement().querySelector('.films-list--all');
    this._filmsContainer = this._filmsList.querySelector('.films-list__container');

    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._renderedFilmCount = COUNT.FILMS_PER_STEP;
  }

  init (cardsFilm) {
    this._cardsFilm = cardsFilm.slice();
    this._sourcedCardsFilm = cardsFilm.slice();

    this._filmsListExtra = this._filmsComponent.getElement().querySelector('.films-list--extra').querySelector('.films-list__container');
    this._topRatingFilms = this._cardsFilm.slice().sort((prev, next) => next.film.filmInfo.totalRating - prev.film.filmInfo.totalRating);

    this._filmsListComment = this._filmsComponent.getElement().querySelector('.films-list--most-commented').querySelector('.films-list__container');
    this._topCommentFilms = this._cardsFilm.slice().sort((prev, next) => next.comments.length - prev.comments.length);

    this._filters = this._renderFilters(this._cardsFilm);

    this._renderMenu(this._filters);
    this._renderStatistic(cardsFilm.length);

    this._renderPage();
  }

  _handleTaskChange(updatedTask) {
    this._cardsFilm = updateItem(this._cardsFilm, updatedTask);
    this._sourcedCardsTasks = updateItem(this._sourcedCardsTasks, updatedTask);
    this._topRatingFilms = updateItem(this._topRatingFilms, updatedTask);
    this._topCommentFilms = updateItem(this._topCommentFilms, updatedTask);

    if (this._filmPresenter.has(updatedTask.film.id)) {
      this._filmPresenter.get(updatedTask.film.id).init(updatedTask, this._filmsContainer);
    }

    if (this._filmPresenterTop.has(updatedTask.film.id)) {
      this._filmPresenterTop.get(updatedTask.film.id).init(updatedTask, this._filmsListExtra);
    }

    if (this._filmPresenterComment.has(updatedTask.film.id)) {
      this._filmPresenterComment.get(updatedTask.film.id).init(updatedTask, this._filmsListComment);
    }

    this._filters = this._renderFilters(this._cardsFilm);
    this._renderMenu();
  }

  _renderFilters(cardsFilm){
    return generateFilter(cardsFilm.map((item) => (item.film)));
  }

  _renderRank() {
    render(this._filmListHeaderContainer, new RankUserView(this._filters));
  }

  _renderMenu() {
    if(document.querySelector('.main-navigation')){
      document.querySelector('.main-navigation').remove();
    }
    renderElement(this._filmListMainContainer, new MenuView(this._filters), RenderPosition.AFTERBEGIN);
  }

  _renderStatistic() {
    render(this._filmListFooterContainer, new StatisticView(this._cardsFilm.length));
  }

  _sortTasks(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DATE:
        this._cardsFilm.sort(sortFilmDate);
        break;
      // case SortType.DATE_DOWN:
      //   this._boardTasks.sort(sortTaskDown);
      //   break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this._cardsFilm = this._sourcedCardsFilm.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearTaskList();
    this._renderFilmsList();
    this._renderCategoryFilms();
  }

  _renderSort() {
    render(this._filmListMainContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm (array, film, container) {
    const filmPresenter = new FilmPresenter(this._handleTaskChange);
    filmPresenter.init(film, container);
    if(array === this._cardsFilm){
      this._filmPresenter.set(film.film.id, filmPresenter);
    }
    if(array === this._topRatingFilms){
      this._filmPresenterTop.set(film.film.id, filmPresenter);
    }
    if(array === this._topCommentFilms){
      this._filmPresenterComment.set(film.film.id, filmPresenter);
    }
  }

  _renderFilms (array, from, to, container) {
    array
      .slice(from, to)
      .forEach((cardFilm) => this._renderFilm(array, cardFilm, container));
  }

  _renderFilmsList () {
    this._renderFilms(this._cardsFilm,0, Math.min(this._cardsFilm.length, COUNT.FILMS_PER_STEP), this._filmsContainer);

    if (this._cardsFilm.length > COUNT.FILMS_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearTaskList () {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();

    this._filmPresenterTop.forEach((presenter) => presenter.destroy());
    this._filmPresenterTop.clear();

    this._filmPresenterComment.forEach((presenter) => presenter.destroy());
    this._filmPresenterComment.clear();

    this._renderedFilmCount = COUNT.FILMS_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderCategoryFilms () {
    this._renderFilmsListExtra();
    this._renderFilmsListTopCommented();
  }

  _renderFilmsListExtra () {
    this._renderFilms(this._topRatingFilms,COUNT.SORT_FILMS.MIN, COUNT.SORT_FILMS.MAX, this._filmsListExtra);
  }

  _renderFilmsListTopCommented () {
    this._renderFilms(this._topCommentFilms,COUNT.SORT_FILMS.MIN, COUNT.SORT_FILMS.MAX, this._filmsListComment);
  }

  _renderNoFilms () {
    render(this._filmListMainContainer, this._noFilmsComponent);
  }

  _handleShowMoreButtonClick () {
    this._renderFilms(this._cardsFilm, this._renderedFilmCount, this._renderedFilmCount + COUNT.FILMS_PER_STEP, this._filmsContainer);

    this._renderedFilmCount += COUNT.FILMS_PER_STEP;

    if (this._renderedFilmCount >= this._cardsFilm.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton () {
    render(this._filmsList, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setEditClickMoreButtonHandler(this._handleShowMoreButtonClick);
  }

  _renderPage () {
    if(this._cardsFilm.length === 0) {
      this._renderNoFilms ();
      return;
    }

    this._renderRank ();
    this._renderSort ();
    render (this._filmListMainContainer, this._filmsComponent);

    this._renderFilmsList ();
    this._renderCategoryFilms();
  }
}
