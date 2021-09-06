import FilterView from '../view/filters.js/filters.js';
import {render, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filters.js';
import {FilterType, UpdateType} from '../consts.js';
import StatisticView from '../view/statistic/stats-item-menu.js';

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._statisticComponent = new StatisticView();

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatistic = this._handleStatistic.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());

    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._statisticComponent.setStatsItemMenuHandler(this._handleStatistic);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      this._navContainer = document.querySelector('.main-navigation');
      render(this._navContainer, this._statisticComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    this._navContainer = document.querySelector('.main-navigation');
    render(this._navContainer, this._statisticComponent);

    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    const statsMenuItem = document.querySelector('.main-navigation__additional--active');

    if (statsMenuItem) {
      statsMenuItem.classList.remove('main-navigation__additional--active');
    }

    if (this._filterModel.getFilter() === filterType || 'Stats' === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleStatistic() {
    const filterMenuItems = document.querySelectorAll('.main-navigation__item');
    filterMenuItems.forEach((item)=> item.classList.remove('main-navigation__item--active'));
    this._filterModel.setFilter(UpdateType.STATS);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL_MOVIES,
        name: 'All movies',
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
