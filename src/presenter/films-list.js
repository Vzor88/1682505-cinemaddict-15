import {render, remove} from '../utils/render.js';
import {COUNTS,  SortType, UpdateType, FilterType, UserAction} from '../consts.js';
import RankUserView from '../view/rank-user/rank-user.js';
import SortView from '../view/sort/sort.js';
import FilmsView from '../view/films/films.js';
import ShowMoreButtonView from '../view/show-more-button/show-more-button.js';
import StatsFooterView from '../view/stats-footer/stats-footer.js';
import NoFilmsView from '../view/no-films/no-films.js';
import FilmPresenter from './film.js';
import {sortFilmDate, sortFilmRating} from '../utils/card-film.js';
import {filter} from '../utils/filters.js';
import {siteBodyElement} from '../main.js';

export default class FilmsList {
  constructor(filmListHeaderContainer, filmListMainContainer, filmListFooterContainer, filmsModel, filtersModel) {
    this._filmsModel = filmsModel;
    this._filtersModel = filtersModel;
    this._filmListHeaderContainer = filmListHeaderContainer;
    this._filmListMainContainer = filmListMainContainer;
    this._filmListFooterContainer = filmListFooterContainer;

    this._filmsComponent = null;
    this._showMoreButtonComponent = null;
    this._sortComponent = null;
    this._noFilmsComponent = null;

    this._filmPresenter = new Map();
    this._filmPresenterTop = new Map();
    this._filmPresenterComment = new Map();

    this._filterType = FilterType.ALL_MOVIES;
    this._currentSortType = SortType.DEFAULT;
    this._renderedFilmCount = 0;


    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init () {
    this._renderStatistic(this._getFilms().length);
    this._renderedFilmCount = COUNTS.FILMS_PER_STEP;
    this._renderPage();
  }

  _getFilms() {
    this._filterType = this._filtersModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[this._filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortFilmDate);
      case SortType.RATING:
        return filteredFilms.sort(sortFilmRating);
      default:
        return filteredFilms;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    if(actionType === UserAction.UPDATE_FILM){
      this._filmsModel.updateFilm(updateType, update);
    }
  }

  _handleModelEvent(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._filmPresenter.has(update.film.id)) {
          this._filmPresenter.get(update.film.id).init(update, this._filmsContainer, this._filterType);
        }

        if (this._filmPresenterTop.has(update.film.id)) {
          this._filmPresenterTop.get(update.film.id).init(update, this._filmsListExtra, this._filterType);
        }

        if (this._filmPresenterComment.has(update.film.id)) {
          this._filmPresenterComment.get(update.film.id).init(update, this._filmsListComment, this._filterType);
        }
        break;
      case UpdateType.MINOR:
        this._clearPage();
        this._renderPage();
        break;
      case UpdateType.MAJOR:
        this._clearPage({resetRenderedFilmCount: true, resetSortType: true});
        this._renderPage();
        break;
      case UpdateType.STATS:
        this._clearPage({resetRenderedFilmCount: true, resetSortType: true});
        this._renderRank();
        break;
    }
  }

  _renderRank() {
    const watchListFilms = filter[FilterType.HISTORY](this._filmsModel.getFilms());

    this._rankComponent = new RankUserView(watchListFilms);
    render(this._filmListHeaderContainer, this._rankComponent);
  }

  _renderStatistic() {
    render(this._filmListFooterContainer, new StatsFooterView(this._getFilms().length));
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPage({resetRenderedFilmCount: true, resetSortType: false});
    this._renderPage();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmListMainContainer, this._sortComponent);
  }

  _renderFilm (films, film, container) {
    const filmPresenter = new FilmPresenter(this._handleViewAction);
    filmPresenter.init(film, container, this._filterType);

    switch (films) {
      case this._topRatingFilms:
        this._filmPresenterTop.set(film.film.id, filmPresenter);
        break;
      case this._topCommentFilms:
        this._filmPresenterComment.set(film.film.id, filmPresenter);
        break;
      default:
        this._filmPresenter.set(film.film.id, filmPresenter);
    }
  }

  _renderFilms (films, container) {
    films.forEach((film) => this._renderFilm(films, film, container));
  }

  _renderAllFilmsList () {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, Math.max(COUNTS.FILMS_PER_STEP, this._renderedFilmCount)));

    this._renderFilms(films, this._filmsContainer);

    if (filmCount > Math.max(COUNTS.FILMS_PER_STEP, this._renderedFilmCount)) {
      this._renderShowMoreButton();
    }
  }

  _clearPage ({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();

    this._filmPresenterTop.forEach((presenter) => presenter.destroy());
    this._filmPresenterTop.clear();

    this._filmPresenterComment.forEach((presenter) => presenter.destroy());
    this._filmPresenterComment.clear();

    remove(this._showMoreButtonComponent);
    remove(this._sortComponent);
    remove(this._rankComponent);
    remove(this._filmsComponent);


    resetRenderedFilmCount ? this._renderedFilmCount = COUNTS.FILMS_PER_STEP : this._renderedFilmCount = Math.min(this._getFilms().length, this._renderedFilmCount);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }

    if (this._noFilmsComponent) {
      remove(this._noFilmsComponent);
    }
  }

  _renderMarkupFilmLists() {
    this._filmsComponent = new FilmsView();

    render (this._filmListMainContainer, this._filmsComponent);

    this._filmsList = this._filmsComponent.getElement().querySelector('.films-list--all');
    this._filmsContainer = this._filmsList.querySelector('.films-list__container');
  }

  _renderCategoryFilms () {
    this._renderFilmsListExtra();
    this._renderFilmsListTopCommented();
  }

  _renderFilmsListExtra () {
    this._filmsListExtra = this._filmsComponent.getElement().querySelector('.films-list--extra').querySelector('.films-list__container');
    this._topRatingFilms = this._getFilms().slice().sort((prev, next) => next.film.filmInfo.totalRating - prev.film.filmInfo.totalRating);

    this._topRatingFilms = this._topRatingFilms.slice(COUNTS.SORT_FILMS.MIN, COUNTS.SORT_FILMS.MAX);
    this._renderFilms(this._topRatingFilms, this._filmsListExtra);
  }

  _renderFilmsListTopCommented () {
    this._filmsListComment = this._filmsComponent.getElement().querySelector('.films-list--most-commented').querySelector('.films-list__container');
    this._topCommentFilms = this._getFilms().slice().sort((prev, next) => next.comments.length - prev.comments.length);

    this._topCommentFilms = this._topCommentFilms.slice(COUNTS.SORT_FILMS.MIN, COUNTS.SORT_FILMS.MAX);
    this._renderFilms(this._topCommentFilms, this._filmsListComment);
  }

  _renderNoFilms () {
    this._noFilmsComponent = new NoFilmsView(this._filterType);
    render(this._filmListMainContainer, this._noFilmsComponent);
  }

  _handleShowMoreButtonClick () {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + COUNTS.FILMS_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films, this._filmsContainer);

    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton () {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setEditClickMoreButtonHandler(this._handleShowMoreButtonClick);

    render(this._filmsList, this._showMoreButtonComponent);
  }

  _renderPage () {
    siteBodyElement.classList.remove('hide-overflow');
    if(this._getFilms().length === 0) {
      this._renderNoFilms ();
      return;
    }

    this._renderRank ();
    this._renderSort ();
    this._renderMarkupFilmLists();
    this._renderAllFilmsList ();
    this._renderCategoryFilms();
  }
}
