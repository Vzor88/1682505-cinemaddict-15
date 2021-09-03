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

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
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
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  STATS: 'STATS',
};

export const FilterType = {
  ALL_MOVIES: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

export const NoFilmsTextType = {
  [FilterType.ALL_MOVIES]: 'There are no movies in our database',
  [FilterType.WATCHLIST]:'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

export const INDEX_COMMENT = {
  MIN: 0,
  MAX: 10000,
};

export const RANKS = {
  FAN: {
    MIN: 11,
    MAX: 20,
  },
  MOVIE_BUFF: 21,
};

export const COUNTS = {
  SORT_FILMS: {
    MIN: 0,
    MAX: 2,
  },
  FILMS: 5,
  MAX_COMMENTS_FILMS: 0,
  GENERATE_FILMS: 1,
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

export const LENGTH_STRING_DESCRIPTION = 139;
