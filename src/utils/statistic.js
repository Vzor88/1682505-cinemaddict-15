import {RANKS} from '../consts.js';
import {ucFirstName} from './card-film.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';

dayjs.extend(isBetween);

export const isNameRank = (count) => {
  let nameRank = 'novice';
  if (count >= RANKS.FAN.MIN && count <= RANKS.FAN.MAX) {
    nameRank = 'fan';
  } else if (count >= RANKS.MOVIE_BUFF) {
    nameRank = 'movie buff';
  }
  return ucFirstName(nameRank);
};

export const isTopWatchingGenre = (films) => {
  const watchedFilmGenres = {};

  films.forEach((film) => {
    for (const item of film.filmInfo.genre){
      item in watchedFilmGenres ? watchedFilmGenres[item]++ :  watchedFilmGenres[item] = 1;
    }
  });
  return watchedFilmGenres;
};

export const isWatchedList = (films) => films.length > 0 ? films :  ' ';

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
    if(dayjs(film.userDetails.watchingDate).isSame(dateFrom, 'day') || dayjs(film.userDetails.watchingDate).isBetween(dateFrom, dateTo) || dayjs(film.userDetails.watchingDate).isSame(dateTo, 'day')){
      sortFilmsInDateRange.push(film);
    }
  });
  return sortFilmsInDateRange;
};

