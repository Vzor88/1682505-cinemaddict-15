import {RANKS} from '../consts.js';
import {ucFirstName} from './card-film.js';

export const isNameRank = (count) => {
  let nameRank = 'novice';
  if (count >= RANKS.FAN.MIN && count <= RANKS.FAN.MAX) {
    nameRank = 'fan';
  } else if (count >= RANKS.MOVIE_BUFF) {
    nameRank = 'movie buff';
  }
  return ucFirstName(nameRank);
};
