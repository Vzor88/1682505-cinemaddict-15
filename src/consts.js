import dayjs from 'dayjs';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const StateType = {
  CREATING: 'CREATING',
  DELETING: 'DELETING',
  ABORTING_UPDATE: 'ABORTING_UPDATE',
  ABORTING_DELETING: 'ABORTING_DELETING',
  ABORTING_CREATING: 'ABORTING_CREATING',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const EventType = {
  FAVORITE: 'Favorites',
  HISTORY: 'History',
  WATCHLIST: 'Watchlist',
};

export const RadioButtonType = {
  ALL_TIME: 'All time',
  TODAY: 'Today',
  WEEK: 'Week',
  MONTH: 'Month',
  YEAR: 'Year',
};

export const DateRangeTime = {
  ALL_TIME: dayjs().subtract(200, 'year'),
  TODAY: dayjs(),
  WEEK: dayjs().subtract(7, 'day'),
  MONTH: dayjs().subtract(1, 'month'),
  YEAR: dayjs().subtract(1, 'year'),
};

export const UpdateType = {
  PATCH: 'PATCH',
  PATCH_POPUP: 'PATCH POPUP',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  STATS: 'STATS',
  INIT: 'INIT',
};

export const FilterType = {
  ALL_MOVIES: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

export const COUNTS = {
  SORT_FILMS: {
    MIN: 0,
    MAX: 2,
  },
  FILMS_PER_STEP: 5,
};

export const SIZES = {
  EMODJI: {
    WIDTH: '55px',
    HEIGHT: '55px',
  },
  BAR: {
    HEIGHT: 50,
  },
};

export const SHAKE_ANIMATION_TIMEOUT = 600;

