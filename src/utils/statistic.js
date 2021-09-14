// import {RANKS} from '../consts.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';

dayjs.extend(isBetween);

const RankType = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie buff',
};

export const RANKS = {
  FAN: {
    MIN: 11,
    MAX: 20,
  },
  MOVIE_BUFF: 21,
};

export const isNameRank = (count) => {
  let nameRank = RankType.NOVICE;
  if (count >= RANKS.FAN.MIN && count <= RANKS.FAN.MAX) {
    nameRank = RankType.FAN;
  } else if (count >= RANKS.MOVIE_BUFF) {
    nameRank = RankType.MOVIE_BUFF;
  }
  return nameRank;
};

export const isTopWatchingGenre = (films) => {
  const watchedFilmGenres = {};

  films.forEach((film) => {
    for(const item of film.filmInfo.genre) {
      item in watchedFilmGenres ? watchedFilmGenres[item]++ :  watchedFilmGenres[item] = 1;
    }
  });
  return watchedFilmGenres;
};

export const isWatchedList = (films) => films.length ? films :  ' ';

export const getWatchedFilmList = (films) => {
  const genresList = [];
  const countsList = [];

  Object.entries(isTopWatchingGenre(films))
    .sort((a, b) =>  b[1] - a[1])
    .forEach((item) => {
      genresList.push(item[0]);
      countsList.push(item[1]);
    });
  return {genresList, countsList};
};

export const countWatchedFilmsInDateRange = (films, dateFrom, dateTo) => {
  const sortFilmsInDateRange = [];
  films.forEach((film) => {
    if(dayjs(film.userDetails.watchingDate).isSame(dateFrom, 'day') ||
      dayjs(film.userDetails.watchingDate).isBetween(dateFrom, dateTo) ||
      dayjs(film.userDetails.watchingDate).isSame(dateTo, 'day')) {
      sortFilmsInDateRange.push(film);
    }
  });
  return sortFilmsInDateRange;
};

