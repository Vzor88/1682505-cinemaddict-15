import {RANK} from '../../mock/data.js';
import {ucFirstName} from '../../utils/card-film.js';

const isNameRank = (count) => {
  let nameRank = 'novice';
  if (count >= RANK.FAN.MIN && count <= RANK.FAN.MAX) {
    nameRank = 'fan';
  } else if (count >= RANK.MOVIE_BUFF) {
    nameRank = 'movie buff';
  }
  return ucFirstName(nameRank);
};

const isGenerateProfile = (count) => (count === 0) ? ' ' : `<p class="profile__rating">${isNameRank(count)}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">`;

export const createRankUserTemplate = (filter) => {
  const count = filter[0].count;
  return `<section class="header__profile profile">
      ${isGenerateProfile(count)}
    </section>`;
};
