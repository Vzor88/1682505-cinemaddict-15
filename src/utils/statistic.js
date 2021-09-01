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
    for (const item of film.film.filmInfo.genre){
      item in watchedFilmGenres ? watchedFilmGenres[item]++ :  watchedFilmGenres[item] = 1;
    }
  });
  return watchedFilmGenres;
};

export const isWatchedList = (films) => {
  if(films.length > 0){
    return films;
  } else {
    return ' ';
  }
};

export const getWatchedFilmList = (films) => {
  const genreList = [];
  const countList = [];

  Object.entries(isTopWatchingGenre(films))
    .sort((a, b) =>  b[1] - a[1])
    .forEach((item) => {
      genreList.push(item[0]);
      countList.push(item[1]);
    });
  return {genreList, countList};
};


export const countWatchedFilmsInDateRange = (films, dateFrom, dateTo) => {
  const array = [];
  films.slice().forEach((film) => {
    if(dayjs(film.film.userDetails.watchingDate).isSame(dateFrom, 'day') || dayjs(film.film.userDetails.watchingDate).isBetween(dateFrom, dateTo) || dayjs(film.film.userDetails.watchingDate).isSame(dateTo, 'day')){
      array.push(film);
    }
  });
  return array;
};

