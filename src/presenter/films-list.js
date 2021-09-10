import {render, remove, isTopRatedFilms, isTopCommentedFilms, renderElement, getUpdateFilm} from '../utils/render.js';
import {COUNTS, SortType, UpdateType, FilterType, UserAction, DateRangeTime, RenderPosition} from '../consts.js';
import RankUserView from '../view/rank-user/rank-user.js';
import SortView from '../view/sort/sort.js';
import FilmContainersView from '../view/films/film-containers.js';
import ShowMoreButtonView from '../view/show-more-button/show-more-button.js';
import StatsFooterView from '../view/stats-footer/stats-footer.js';
import NoFilmsView from '../view/no-films/no-films.js';
import FilmPresenter from './film.js';
import LoadingView from '../view/loading/loading.js';
import StatsPresenter from './stats.js';
import {sortFilmDate, sortFilmRating} from '../utils/card-film.js';
import {filter} from '../utils/filters.js';
import {siteBodyElement} from '../main.js';

export default class FilmsList {
  constructor(filmListHeaderContainer, filmListMainContainer, filmListFooterContainer, filmsModel, filtersModel, api) {
    this._filmsModel = filmsModel;
    this._filtersModel = filtersModel;
    this._api = api;
    this._filmListHeaderContainer = filmListHeaderContainer;
    this._filmListMainContainer = filmListMainContainer;
    this._filmListFooterContainer = filmListFooterContainer;

    this._filmsComponent = null;
    this._showMoreButtonComponent = null;
    this._sortComponent = null;
    this._noFilmsComponent = null;

    this._isLoading = true;
    this._loadingComponent = new LoadingView();

    this._filmPresenter = new Map();
    this._filmPresenterTop = new Map();
    this._filmPresenterComment = new Map();

    this._filterType = FilterType.ALL_MOVIES;
    this._currentSortType = SortType.DEFAULT;
    this._currentInDateRangeTime = DateRangeTime.ALL_TIME;
    this._renderedFilmCount = 0;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init () {
    this._renderedFilmCount = COUNTS.FILMS_PER_STEP;

    this._renderPage();
  }

  _getFilms() {
    this._filterType = this._filtersModel.getFilter();
    const films = this._filmsModel.getFilms();
    this._filteredFilms = filter[this._filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filteredFilms.sort(sortFilmDate);
      case SortType.RATING:
        return this._filteredFilms.sort(sortFilmRating);
      default:
        return this._filteredFilms;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    const films = this._filmsModel.getFilms();
    if(actionType === UserAction.UPDATE_FILM){
      this._api.updateFilm(update).then((response) => {
        films.forEach((film) => {
          if (film.id === update.id) {
            response.comments = film.comments;
            this._filmsModel.updateFilm(updateType, response);
          }
        });
      });
    }
  }

  _handleModelEvent(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._filmPresenter.has(update.id)) {
          getUpdateFilm(this._filmPresenter, update, this._filmsContainer, this._filterType);
        }
        if (this._filmPresenterTop.has(update.id)) {
          getUpdateFilm(this._filmPresenterTop, update, this._filmsListExtraContainer, this._filterType);
        }
        if (this._filmPresenterComment.has(update.id)) {
          getUpdateFilm(this._filmPresenterComment, update, this._filmsListCommentContainer, this._filterType);
        }
        break;
      case UpdateType.PATCH_POPUP:
        if (this._filmPresenter.has(update.id)) {
          getUpdateFilm(this._filmPresenter, update, this._filmsContainer, this._filterType);
        }
        if (this._filmPresenterTop.has(update.id)) {
          getUpdateFilm(this._filmPresenterTop, update, this._filmsListExtraContainer, this._filterType);
        }
        if (this._filmPresenterComment.has(update.id)) {
          getUpdateFilm(this._filmPresenterComment, update, this._filmsListCommentContainer, this._filterType);
        }

        if(this._filmsListComment){
          this._filmsListComment.remove();
        }
        this._renderFilmsListTopCommented();

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
        this._filmsModel.removeObserver(this._handleModelEvent());
        this._renderRank();
        this._renderStats(this._currentInDateRangeTime);
        this._renderStatsFooter();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderPage();
        break;
    }
  }

  _renderLoading() {
    render(this._filmListMainContainer, this._loadingComponent);
  }

  _renderRank() {
    const watchListFilms = filter[FilterType.HISTORY](this._filmsModel.getFilms());

    this._rankComponent = new RankUserView(watchListFilms);
    render(this._filmListHeaderContainer, this._rankComponent);
  }

  _renderStats(dateTo){
    this._statsPresenter = new StatsPresenter(this._filmListMainContainer, this._filmsModel.getFilms());
    this._statsPresenter.init(dateTo);
  }

  _renderStatsFooter() {
    this._statsFooterComponent = new StatsFooterView(this._filmsModel.getFilms().length);
    render(this._filmListFooterContainer, this._statsFooterComponent);
  }

  _renderSort() {
    remove(this._sortComponent);

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmListMainContainer, this._sortComponent);
  }

  _renderFilm (films, film, container) {
    const filmPresenter = new FilmPresenter(this._handleViewAction);
    filmPresenter.init(film, container, this._filterType);

    switch (films) {
      case this._topRatingFilms:
        this._filmPresenterTop.set(film.id, filmPresenter);
        break;
      case this._topCommentFilms:
        this._filmPresenterComment.set(film.id, filmPresenter);
        break;
      default:
        this._filmPresenter.set(film.id, filmPresenter);
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

  _renderMarkupFilmLists() {
    this._filmsComponent = new FilmContainersView();
    render (this._filmListMainContainer, this._filmsComponent);

    this._filmsList = this._filmsComponent.getElement().querySelector('.films-list--all');
    this._filmsContainer = this._filmsList.querySelector('.films-list__container');

    this._allFilmsContainer = document.querySelector('.films');
  }

  _renderFilmsListExtra () {
    if(isTopRatedFilms(this._filteredFilms).length){
      renderElement(this._allFilmsContainer, this._filmsComponent.getTemplateFilmsListExtra(this._filteredFilms), RenderPosition.BEFOREEND);
      this._filmsListExtraContainer = this._filmsComponent.getElement().querySelector('.films-list--top-rated').querySelector('.films-list__container');
      this._topRatingFilms = this._filteredFilms.slice().sort((prev, next) => next.filmInfo.totalRating - prev.filmInfo.totalRating);

      this._topRatingFilms = this._topRatingFilms.slice(COUNTS.SORT_FILMS.MIN, COUNTS.SORT_FILMS.MAX);
      this._renderFilms(this._topRatingFilms, this._filmsListExtraContainer);
    } else {
      this._filmsComponent.getElement().querySelector('.films-list--most-commented').classList.remove('films-list--extra');
    }
  }

  _renderFilmsListTopCommented () {
    const filmsListTopRatedContainer = this._filmsComponent.getElement().querySelector('.films-list--top-rated');
    if(isTopCommentedFilms(this._filteredFilms).length){
      filmsListTopRatedContainer.classList.add('films-list--extra');
      renderElement(this._allFilmsContainer, this._filmsComponent.getTemplateFilmsTopCommented(this._filteredFilms), RenderPosition.BEFOREEND);
      this._filmsListComment = this._filmsComponent.getElement().querySelector('.films-list--most-commented');
      this._filmsListCommentContainer = this._filmsListComment.querySelector('.films-list__container');
      this._topCommentFilms = isTopCommentedFilms(this._filteredFilms).slice().sort((prev, next) => next.comments.length - prev.comments.length);

      this._topCommentFilms = this._topCommentFilms.slice(COUNTS.SORT_FILMS.MIN, COUNTS.SORT_FILMS.MAX);
      this._renderFilms(this._topCommentFilms, this._filmsListCommentContainer);
    } else {
      filmsListTopRatedContainer.classList.remove('films-list--extra');
    }
  }

  _renderNoFilms () {
    this._noFilmsComponent = new NoFilmsView(this._filterType);
    render(this._filmListMainContainer, this._noFilmsComponent);
  }

  _renderShowMoreButton () {
    remove(this._showMoreButtonComponent);

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setEditClickMoreButtonHandler(this._handleShowMoreButtonClick);

    render(this._filmsList, this._showMoreButtonComponent);
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
    if(this._rankComponent){
      remove(this._rankComponent);
    }
    remove(this._statsFooterComponent);
    remove(this._filmsComponent);
    remove(this._noFilmsComponent);
    remove(this._loadingComponent);

    if(this._statsPresenter) {
      this._statsPresenter.destroy();
    }

    resetRenderedFilmCount ? this._renderedFilmCount = COUNTS.FILMS_PER_STEP : this._renderedFilmCount = Math.min(this._getFilms().length, this._renderedFilmCount);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderPage () {
    siteBodyElement.classList.remove('hide-overflow');

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if(this._getFilms().length === 0) {
      this._renderNoFilms ();
      this._renderStatsFooter();
      return;
    }
    this._renderStatsFooter();
    this._renderRank ();
    this._renderSort ();
    this._renderMarkupFilmLists();
    this._renderAllFilmsList ();
    if(isTopRatedFilms(this._filteredFilms).length || isTopCommentedFilms(this._filteredFilms).length){
      this._renderFilmsListExtra();
      this._renderFilmsListTopCommented();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPage({resetRenderedFilmCount: true, resetSortType: false});
    this._renderPage();
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
}
