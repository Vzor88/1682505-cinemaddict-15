import {RANKS} from '../../consts.js';
import {ucFirstName} from '../../utils/card-film.js';

const isNameRank = (count) => {
  let nameRank = 'novice';
  if (count >= RANKS.FAN.MIN && count <= RANKS.FAN.MAX) {
    nameRank = 'fan';
  } else if (count >= RANKS.MOVIE_BUFF) {
    nameRank = 'movie buff';
  }
  return ucFirstName(nameRank);
};

const isGenerateProfile = (count) => (count === 0) ? ' ' : `<p class="profile__rating">${isNameRank(count)}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">`;

export const createRankUserTemplate = (filter) => (
  `<section class="header__profile profile">
      ${isGenerateProfile(filter.length)}
    </section>`
);
