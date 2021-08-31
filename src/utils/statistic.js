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


// export const countWatchedFilmsInDateRange = (films, dateFrom, dateTo) => {
//   console.log(dayjs(films[1].film.userDetails.watchingDate).isBetween(dateTo, dateFrom));
//   const rr = films.filter((film) => dayjs(film.film.userDetails.watchingDate).isSame(dateFrom) || dayjs(film.film.userDetails.watchingDate).isBetween(dateTo, dateFrom) || dayjs(film.film.userDetails.watchingDate).isSame(dateTo));
//   console.log(rr);
// };

