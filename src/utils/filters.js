import {FilterType} from '../consts.js';

export const filter = {
  [FilterType.ALL_MOVIES]:(films) => films.filter((film) => film),
  [FilterType.WATCHLIST]:(films) => films.filter((film) => film.userDetails.watchList),
  [FilterType.HISTORY]:(films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]:(films) => films.filter((film) => film.userDetails.favorite),
};
